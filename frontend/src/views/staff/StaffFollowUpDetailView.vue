<template>
  <section class="space-y-6">
    <div class="pointer-events-none fixed right-6 top-6 z-[70] flex w-full max-w-md flex-col gap-3">
      <div
        v-if="successMessage"
        class="pointer-events-auto rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 shadow-lg"
      >
        <div class="flex items-start gap-3">
          <span class="mt-0.5 text-base">🐾</span>
          <p>{{ successMessage }}</p>
        </div>
      </div>

      <div
        v-if="loadError || actionError"
        class="pointer-events-auto rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-lg"
      >
        <div class="flex items-start gap-3">
          <span class="mt-0.5 text-base">⚠️</span>
          <p>{{ loadError || actionError }}</p>
        </div>
      </div>
    </div>

    <header
      class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#5A208E] via-[#7A2EA6] to-[#E02890] text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
    >
      <div class="p-5 sm:p-6 lg:p-7">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div class="min-w-0">
            <RouterLink
              :to="{ name: 'staff-followups', query: { date: selectedDate } }"
              class="inline-flex h-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
            >
              ← Volver a seguimientos
            </RouterLink>

            <div v-if="selectedRow" class="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center">
              <div
                class="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[28px] bg-white/15 text-3xl font-black text-white ring-1 ring-white/20"
              >
                <img
                  v-if="getPetImage(selectedRow.pet)"
                  :src="getPetImage(selectedRow.pet)"
                  :alt="selectedRow.pet.name"
                  class="h-full w-full object-cover"
                  @error="hideBrokenImage"
                />
                <span v-else>{{ getInitial(selectedRow.pet.name) }}</span>
              </div>

              <div class="min-w-0">
                <p class="text-xs font-bold uppercase tracking-[0.28em] text-white/65">
                  Seguimiento diario
                </p>
                <h1 class="mt-2 font-ladralab-brush text-5xl leading-none tracking-tight sm:text-6xl">
                  {{ selectedRow.pet.name }}
                </h1>
                <p class="mt-3 text-base font-semibold text-white/90">
                  {{ selectedRow.reservation.service_name }} · {{ selectedDateLabel }}
                </p>
              </div>
            </div>

            <div v-else class="mt-7">
              <h1 class="font-ladralab-brush text-5xl leading-none tracking-tight sm:text-6xl">
                Seguimiento
              </h1>
              <p class="mt-3 text-sm text-white/80">
                No hemos encontrado la reserva solicitada.
              </p>
            </div>
          </div>

          <div v-if="selectedRow" class="grid gap-3 sm:grid-cols-2 lg:w-[420px]">
            <RouterLink
              :to="{ name: 'staff-reservation-detail', params: { id: selectedRow.reservation.id } }"
              class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
            >
              Ver reserva
            </RouterLink>

            <RouterLink
              :to="{ name: 'staff-pet-detail', params: { id: selectedRow.pet.id } }"
              class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
            >
              Ver ficha
            </RouterLink>

            <button
              type="button"
              @click="resetFormFromSelection"
              class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
            >
              Restaurar
            </button>

            <button
              type="button"
              @click="saveFollowUp('published')"
              :disabled="isSaving"
              class="inline-flex h-11 items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:bg-[#F8F2FF] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Completar
            </button>
          </div>
        </div>

        <div v-if="selectedRow" class="mt-6 grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="card in headerCards"
            :key="card.label"
            class="rounded-[24px] border border-white/16 bg-white/12 p-4 backdrop-blur-sm"
          >
            <p class="text-sm font-medium text-white/80">{{ card.label }}</p>
            <p class="mt-2 text-2xl font-bold leading-tight text-white">{{ card.value }}</p>
            <p class="mt-3 text-sm leading-6 text-white/76">{{ card.help }}</p>
          </article>
        </div>
      </div>
    </header>

    <div v-if="isLoading" class="rounded-[28px] border border-[#E8E1F1] bg-white px-5 py-10 text-center text-sm text-slate-500 shadow-sm">
      Cargando seguimiento...
    </div>

    <div v-else-if="selectedRow" class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
      <form class="space-y-6" @submit.prevent="saveFollowUp('published')">
        <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 class="text-[24px] font-bold tracking-tight text-slate-900">
                Checklist rápido
              </h2>
              <p class="mt-1 text-sm text-slate-500">
                Marca solo lo que ya está revisado para este día.
              </p>
            </div>

            <span
              class="inline-flex self-start rounded-full px-3 py-1 text-xs font-semibold"
              :class="statusBadgeClass(currentState)"
            >
              {{ stateLabel(currentState) }}
            </span>
          </div>

          <div class="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <label
              v-for="item in checklistOptions"
              :key="item.key"
              class="flex items-center gap-3 rounded-2xl border border-[#EEE7F6] bg-[#FCFBFE] px-4 py-3 text-sm font-medium text-slate-700"
            >
              <input
                v-model="followUpForm[item.key]"
                type="checkbox"
                class="h-4 w-4 rounded border-[#CDBBE4] text-[#6627A3] focus:ring-[#D9C4F4]"
              />
              <span>{{ item.label }}</span>
            </label>
          </div>
        </section>

        <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
          <h2 class="text-[24px] font-bold tracking-tight text-slate-900">
            Resumen del día
          </h2>
          <p class="mt-1 text-sm text-slate-500">
            Texto visible para el tutor cuando el seguimiento quede completado.
          </p>

          <textarea
            v-model="followUpForm.summary"
            rows="5"
            class="mt-5 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
            placeholder="Ejemplo: Ha pasado un día tranquilo, ha comido bien y ha disfrutado del paseo."
          />
        </section>

        <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
          <h2 class="text-[24px] font-bold tracking-tight text-slate-900">
            Observaciones internas
          </h2>
          <p class="mt-1 text-sm text-slate-500">
            Notas útiles para el equipo. No se muestran al tutor.
          </p>

          <textarea
            v-model="followUpForm.observations"
            rows="4"
            class="mt-5 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
            placeholder="Comportamiento, medicación, incidencias, adaptación o cualquier detalle operativo."
          />
        </section>

        <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 class="text-[24px] font-bold tracking-tight text-slate-900">
                Imágenes
              </h2>
              <p class="mt-1 text-sm text-slate-500">
                Añade fotos del día si hay material disponible.
              </p>
            </div>

            <span class="inline-flex self-start rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]">
              {{ followUpForm.media.length }} fotos
            </span>
          </div>

          <label
            class="mt-5 flex min-h-[112px] cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-[#D8CBE8] bg-[#FCFBFE] px-4 py-5 text-center transition hover:border-[#B89AE3] hover:bg-[#FAF7FE]"
          >
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F3ECFB] text-lg text-[#6627A3]">
              📷
            </span>
            <span class="mt-3 text-sm font-semibold text-slate-900">
              Añadir imágenes
            </span>
            <span class="mt-1 text-xs text-slate-500">
              JPG, PNG o WEBP · selección múltiple
            </span>

            <input
              type="file"
              accept="image/*"
              multiple
              class="hidden"
              @change="handleMediaSelection"
            />
          </label>

          <div v-if="followUpForm.media.length" class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="(item, index) in followUpForm.media"
              :key="item.local_id || item.id || `${item.file_path}-${index}`"
              class="overflow-hidden rounded-[22px] border border-[#E8E1F1] bg-white shadow-sm"
            >
              <div class="aspect-[4/3] bg-[#F6F2FB]">
                <img
                  :src="getMediaPreviewUrl(item)"
                  alt="Foto del seguimiento"
                  class="h-full w-full object-cover"
                  @error="hideBrokenImage"
                />
              </div>

              <div class="flex items-center justify-between gap-3 px-3 py-3">
                <div class="min-w-0">
                  <p class="truncate text-xs font-semibold text-slate-900">
                    {{ item.name || `Imagen ${index + 1}` }}
                  </p>
                  <p class="mt-1 text-[11px] text-slate-500">
                    {{ item.uploaded_at ? formatDate(item.uploaded_at, { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Pendiente de guardar' }}
                  </p>
                </div>

                <button
                  type="button"
                  @click="removeMedia(index)"
                  class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-[#F0D7DD] bg-white text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </section>

        <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 class="text-[22px] font-bold tracking-tight text-slate-900">
                Acciones del seguimiento
              </h2>
              <p class="mt-1 text-sm text-slate-500">
                Guarda un borrador si falta información o publícalo cuando esté listo.
              </p>
            </div>

            <div class="flex flex-wrap justify-end gap-3">
              <button
                type="button"
                @click="resetFormFromSelection"
                class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
              >
                Restaurar
              </button>

              <button
                type="button"
                :disabled="isSaving"
                @click="saveFollowUp('draft')"
                class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#6627A3] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {{ isSaving ? 'Guardando...' : 'Guardar borrador' }}
              </button>

              <button
                type="submit"
                :disabled="isSaving"
                class="inline-flex h-11 items-center justify-center rounded-2xl bg-[#6627A3] px-5 text-sm font-semibold text-white transition hover:bg-[#57208D] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {{ isSaving ? 'Guardando...' : 'Publicar seguimiento' }}
              </button>
            </div>
          </div>
        </section>
      </form>

      <aside class="space-y-6 xl:sticky xl:top-6">
        <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
          <h2 class="text-[22px] font-bold tracking-tight text-slate-900">
            Mascota
          </h2>

          <div class="mt-5 space-y-3">
            <InfoRow label="Nombre" :value="selectedRow.pet.name" />
            <InfoRow label="Raza" :value="selectedRow.pet.breed || 'Pendiente'" />
            <InfoRow label="Recurso" :value="selectedRow.reservation.resource_name || 'Sin asignar'" />
          </div>
        </section>

        <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
          <h2 class="text-[22px] font-bold tracking-tight text-slate-900">
            Tutor / cliente
          </h2>

          <div class="mt-5 space-y-3">
            <InfoRow label="Nombre" :value="tutorName" />
            <InfoRow label="Teléfono" :value="tutorPhone" />
            <InfoRow label="ID usuario" :value="clientIdLabel" />
          </div>
        </section>

        <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
          <h2 class="text-[22px] font-bold tracking-tight text-slate-900">
            Accesos rápidos
          </h2>

          <div class="mt-5 grid gap-3">
            <RouterLink
              :to="{ name: 'staff-reservation-detail', params: { id: selectedRow.reservation.id } }"
              class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
            >
              Ver reserva
            </RouterLink>

            <RouterLink
              :to="{ name: 'staff-pet-detail', params: { id: selectedRow.pet.id } }"
              class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
            >
              Ver ficha de la mascota
            </RouterLink>
          </div>
        </section>
      </aside>
    </div>

    <section v-else class="rounded-[28px] border border-[#E8E1F1] bg-white px-5 py-12 text-center shadow-sm">
      <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5EFFB] text-xl text-[#5A208E]">
        📋
      </div>
      <h2 class="mt-4 text-xl font-bold text-slate-900">
        Seguimiento no encontrado
      </h2>
      <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Revisa el listado de seguimientos y vuelve a abrir la reserva correspondiente.
      </p>
      <RouterLink
        :to="{ name: 'staff-followups', query: { date: selectedDate } }"
        class="mt-5 inline-flex h-11 items-center justify-center rounded-2xl bg-[#6627A3] px-5 text-sm font-semibold text-white transition hover:bg-[#57208D]"
      >
        Volver al listado
      </RouterLink>
    </section>
  </section>
</template>

<script setup>
import { computed, defineComponent, h, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { apiRequest } from '@/services/apiClient'
import { getStaffReservationById } from '@/services/staffReservationsService'
import {
  createDailyLog,
  getReservationDailyLogs,
  updateDailyLog,
} from '@/services/dailyLogsService'
import { getReadableErrorMessage, getValidationErrors } from '@/utils/errorMessages'
import { uiMessages } from '@/utils/uiMessages'

const InfoRow = defineComponent({
  props: {
    label: { type: String, required: true },
    value: { type: [String, Number], default: '—' },
  },
  setup(props) {
    return () =>
      h('div', { class: 'rounded-2xl bg-[#FCFBFE] px-4 py-3' }, [
        h('p', { class: 'text-xs font-bold uppercase tracking-[0.14em] text-[#9A8BAF]' }, props.label),
        h('p', { class: 'mt-1 text-sm font-semibold text-slate-900' }, props.value || '—'),
      ])
  },
})

const route = useRoute()
const router = useRouter()
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

const messages = uiMessages.staffFollowUps || {
  success: {
    saved: 'El seguimiento se ha guardado correctamente.',
    draft: 'El borrador se ha guardado correctamente.',
    completed: 'El seguimiento se ha publicado correctamente.',
  },
  errors: {
    load: 'No hemos podido cargar el seguimiento por ahora.',
    save: 'No hemos podido guardar el seguimiento.',
  },
}

const checklistOptions = [
  { key: 'food_done', label: 'Comida registrada' },
  { key: 'walk_done', label: 'Paseo realizado' },
  { key: 'rest_done', label: 'Descanso correcto' },
  { key: 'hygiene_done', label: 'Higiene revisada' },
  { key: 'medication_done', label: 'Medicación administrada' },
  { key: 'play_done', label: 'Juego / actividad' },
]

const isLoading = ref(true)
const isSaving = ref(false)
const loadError = ref('')
const actionError = ref('')
const successMessage = ref('')

const reservation = ref(null)
const reports = ref([])
const selectedDate = ref(String(route.query.date || toInputDate(new Date())))
const followUpForm = ref(buildEmptyFollowUpForm())
const deletedMediaIds = ref([])

onMounted(async () => {
  await loadData()
  resetFormFromSelection()
})

watch(
  () => route.query.date,
  (value) => {
    selectedDate.value = String(value || toInputDate(new Date()))
    resetFormFromSelection()
  },
)

async function loadData() {
  isLoading.value = true
  loadError.value = ''
  actionError.value = ''
  successMessage.value = ''

  try {
    const reservationId = getReservationIdFromRoute()

    const [reservationData, reportsData] = await Promise.all([
      getStaffReservationById(reservationId),
      getReservationDailyLogs(reservationId),
    ])

    reservation.value = normalizeReservationForView(reservationData)
    reports.value = Array.isArray(reportsData) ? reportsData : []
  } catch (error) {
    console.error(error)
    loadError.value = getReadableErrorMessage(
      error,
      messages.errors?.load || 'No hemos podido cargar el seguimiento por ahora.',
    )
  } finally {
    isLoading.value = false
  }
}

function getReservationIdFromRoute() {
  return Number(route.params.reservationId || route.params.id || 0)
}

function normalizeReservationForView(item = {}) {
  const pet = item.pet || null
  const service = item.service || null
  const resource = item.resource || null
  const client = item.client || pet?.owner || null

  return {
    ...item,
    pet,
    service,
    resource,
    client,
    pet_id: item.pet_id ?? pet?.id ?? null,
    service_id: item.service_id ?? service?.id ?? null,
    resource_id: item.resource_id ?? resource?.id ?? null,
    pet_name: pet?.name || item.pet_name || 'Mascota',
    client_name: item.client_name || client?.name || 'Cliente',
    client_phone: item.client_phone || client?.phone || '',
    client_user_id: item.client_user_id ?? client?.id ?? pet?.owner_user_id ?? null,
    service_name: item.service_name || service?.name || 'Servicio',
    resource_name: item.resource_name || resource?.name || '',
  }
}

const selectedRow = computed(() => {
  if (!reservation.value || !shouldAppearInFollowUps(reservation.value, selectedDate.value)) return null

  const report = getReportForDate(selectedDate.value)
  const pet = reservation.value.pet || {
    id: reservation.value.pet_id,
    name: reservation.value.pet_name || 'Mascota',
    breed: '',
    photo_path: '',
    photo_url: '',
  }

  const serviceKey = getServiceKey(reservation.value)

  return {
    reservation: reservation.value,
    pet,
    report,
    serviceKey,
    timeLabel: buildTimeLabel(reservation.value),
    hotelDayLabel: serviceKey === 'hotel' ? getHotelDayLabel(reservation.value, selectedDate.value) : '',
  }
})

const currentState = computed(() => getReportState(selectedRow.value?.report))

const selectedDateLabel = computed(() => {
  return formatDate(`${selectedDate.value}T00:00:00`, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
})

const headerCards = computed(() => {
  if (!selectedRow.value) return []

  return [
    {
      label: 'Estado',
      value: stateLabel(currentState.value),
      help: currentState.value === 'completed' ? 'Listo para consulta.' : 'Pendiente de publicación.',
    },
    {
      label: 'Servicio',
      value: selectedRow.value.reservation.service_name,
      help: selectedRow.value.serviceKey === 'hotel' ? selectedRow.value.hotelDayLabel : 'Servicio de la jornada.',
    },
    {
      label: 'Horario',
      value: selectedRow.value.timeLabel,
      help: selectedDateLabel.value,
    },
    {
      label: 'Recurso',
      value: selectedRow.value.reservation.resource_name || 'Sin asignar',
      help: selectedRow.value.reservation.resource_name ? 'Espacio asignado.' : 'Pendiente o no necesario.',
    },
  ]
})

const tutorName = computed(() => {
  return selectedRow.value?.reservation?.client_name || selectedRow.value?.pet?.owner?.name || 'Pendiente'
})

const tutorPhone = computed(() => {
  return selectedRow.value?.reservation?.client_phone || selectedRow.value?.pet?.owner?.phone || 'Pendiente'
})

const clientIdLabel = computed(() => {
  const id = selectedRow.value?.reservation?.client_user_id || selectedRow.value?.pet?.owner_user_id
  return id ? `#${id}` : '—'
})

function buildEmptyFollowUpForm() {
  return {
    food_done: false,
    walk_done: false,
    rest_done: false,
    hygiene_done: false,
    medication_done: false,
    play_done: false,
    summary: '',
    observations: '',
    media: [],
  }
}

function resetFormFromSelection() {
  deletedMediaIds.value = []

  if (!selectedRow.value?.report) {
    followUpForm.value = buildEmptyFollowUpForm()
    return
  }

  const media = normalizeMediaCollection(selectedRow.value.report)

  followUpForm.value = {
    food_done: Boolean(selectedRow.value.report.food_done),
    walk_done: Boolean(selectedRow.value.report.walk_done),
    rest_done: Boolean(selectedRow.value.report.rest_done),
    hygiene_done: Boolean(selectedRow.value.report.hygiene_done),
    medication_done: Boolean(selectedRow.value.report.medication_done),
    play_done: Boolean(selectedRow.value.report.play_done),
    summary: selectedRow.value.report.summary || '',
    observations: selectedRow.value.report.observations || '',
    media: media.map((item) => ({
      ...item,
      local_id: item.local_id || `saved-${item.id || item.file_path || item.url}`,
      is_existing: Boolean(item.id),
    })),
  }
}

async function saveFollowUp(status = 'published') {
  if (!selectedRow.value) return

  isSaving.value = true
  actionError.value = ''
  successMessage.value = ''

  try {
    const reportPayload = buildDailyReportPayload(status)
    const savedReport = selectedRow.value.report?.id
      ? await updateDailyLog(selectedRow.value.report.id, reportPayload)
      : await createDailyLog({
          ...reportPayload,
          reservation_id: selectedRow.value.reservation.id,
          report_date: selectedDate.value,
        })

    await deleteRemovedMedia(savedReport.id)
    await uploadPendingMedia(savedReport.id)
    await refreshReports()

    successMessage.value =
      status === 'draft'
        ? messages.success?.draft || 'El borrador se ha guardado correctamente.'
        : messages.success?.completed || messages.success?.saved || 'El seguimiento se ha publicado correctamente.'

    await router.replace({
      name: route.name,
      params: route.params,
      query: { date: selectedDate.value },
    })
  } catch (error) {
    console.error(error)

    const validationErrors = getValidationErrors(error)
    const firstValidationError = Object.values(validationErrors).flat()[0]

    actionError.value = firstValidationError || getReadableErrorMessage(
      error,
      messages.errors?.save || 'No hemos podido guardar el seguimiento.',
    )
  } finally {
    isSaving.value = false
  }
}

function buildDailyReportPayload(status) {
  return {
    status,
    food_done: Boolean(followUpForm.value.food_done),
    walk_done: Boolean(followUpForm.value.walk_done),
    rest_done: Boolean(followUpForm.value.rest_done),
    hygiene_done: Boolean(followUpForm.value.hygiene_done),
    medication_done: Boolean(followUpForm.value.medication_done),
    play_done: Boolean(followUpForm.value.play_done),
    summary: followUpForm.value.summary?.trim() || '',
    observations: followUpForm.value.observations?.trim() || '',
  }
}

async function refreshReports() {
  const reportsData = await getReservationDailyLogs(selectedRow.value.reservation.id)
  reports.value = Array.isArray(reportsData) ? reportsData : []
  resetFormFromSelection()
}

async function uploadPendingMedia(reportId) {
  const pendingItems = followUpForm.value.media.filter((item) => item.file && !item.id)

  for (const item of pendingItems) {
    const formData = new FormData()
    formData.append('file', item.file)
    formData.append('file_type', 'image')

    await apiRequest(`/api/daily-reports/${reportId}/media`, {
      method: 'POST',
      body: formData,
    })
  }
}

async function deleteRemovedMedia(reportId) {
  const uniqueIds = [...new Set(deletedMediaIds.value.filter(Boolean))]

  for (const mediaId of uniqueIds) {
    await apiRequest(`/api/daily-reports/${reportId}/media/${mediaId}`, {
      method: 'DELETE',
    })
  }

  deletedMediaIds.value = []
}

async function handleMediaSelection(event) {
  const files = Array.from(event.target.files || [])
  if (!files.length) return

  try {
    const images = files.filter((file) => file.type.startsWith('image/'))
    const parsed = await Promise.all(images.map(readFileAsDataUrl))

    followUpForm.value.media.push(
      ...parsed.map((item) => ({
        local_id: crypto?.randomUUID?.() || `local-${Date.now()}-${Math.random()}`,
        id: null,
        daily_report_id: null,
        file: item.file,
        file_path: item.dataUrl,
        file_url: '',
        url: '',
        file_type: 'image',
        uploaded_at: null,
        name: item.name,
        is_existing: false,
      })),
    )
  } catch (error) {
    console.error(error)
    actionError.value = 'No hemos podido preparar las imágenes seleccionadas.'
  } finally {
    event.target.value = ''
  }
}

function removeMedia(index) {
  const item = followUpForm.value.media[index]

  if (item?.id) {
    deletedMediaIds.value.push(item.id)
  }

  followUpForm.value.media.splice(index, 1)
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve({ name: file.name, dataUrl: reader.result, file })
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function shouldAppearInFollowUps(item, dateKey) {
  if (!item) return false
  if (!['confirmed', 'completed'].includes(item.status)) return false

  const serviceKey = getServiceKey(item)
  if (serviceKey !== 'hotel' && serviceKey !== 'daycare') return false

  return reservationTouchesDate(item, dateKey)
}

function reservationTouchesDate(item, dateKey) {
  const dayStart = new Date(`${dateKey}T00:00:00`)
  const dayEnd = new Date(`${dateKey}T23:59:59`)
  const start = new Date(item.start_at)
  const end = new Date(item.end_at || item.start_at)

  return start <= dayEnd && end >= dayStart
}

function getReportForDate(dateKey) {
  return (
    reports.value.find((report) => normalizeDateKey(report.report_date) === dateKey) || null
  )
}

function getReportState(report) {
  const status = String(report?.status || '').toLowerCase()

  if (!report) return 'pending'
  if (status === 'draft' || report.is_draft) return 'draft'
  if (status === 'published' || status === 'completed' || report.published_at || report.completed_at) return 'completed'

  return 'draft'
}

function stateLabel(state) {
  const labels = {
    pending: 'Pendiente',
    draft: 'Borrador',
    completed: 'Completado',
  }

  return labels[state] || 'Pendiente'
}

function statusBadgeClass(state) {
  const classes = {
    pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
    draft: 'bg-orange-50 text-orange-700 ring-1 ring-orange-100',
    completed: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
  }

  return classes[state] || classes.pending
}

function getServiceKey(item) {
  const bookingMode = item.service?.booking_mode
  const category = item.service?.category
  const serviceName = String(item.service_name || item.service?.name || '').toLowerCase()

  if (category === 'boarding' || bookingMode === 'date_range') return 'hotel'
  if (category === 'daycare' || bookingMode === 'single_day') return 'daycare'

  if (serviceName.includes('hotel') || serviceName.includes('alojamiento')) return 'hotel'
  if (serviceName.includes('guardería') || serviceName.includes('adaptación')) return 'daycare'

  return 'other'
}

function getHotelDayLabel(item, dateKey) {
  const start = new Date(`${normalizeDateKey(item.start_at)}T00:00:00`)
  const current = new Date(`${dateKey}T00:00:00`)
  const diff = Math.round((current.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  return `Día ${diff + 1} de estancia`
}

function buildTimeLabel(item) {
  return `${formatDate(item.start_at, { hour: '2-digit', minute: '2-digit' })} → ${formatDate(item.end_at, { hour: '2-digit', minute: '2-digit' })}`
}

function normalizeMediaCollection(report) {
  const media = Array.isArray(report?.media) ? report.media : []
  const photos = Array.isArray(report?.photos) ? report.photos : []

  return [...media, ...photos].map((item) => ({
    id: item.id ?? null,
    daily_report_id: item.daily_report_id ?? null,
    file_path: item.file_path ?? item.path ?? '',
    file_url: item.file_url ?? item.url ?? '',
    url: item.url ?? item.file_url ?? '',
    file_type: item.file_type ?? item.type ?? 'image',
    uploaded_at: item.uploaded_at ?? null,
    name: item.name ?? '',
  }))
}

function getMediaPreviewUrl(item) {
  return getStorageUrl(item?.file_path || item?.file_url || item?.url || item?.path || '')
}

function getPetImage(pet) {
  return getStorageUrl(
    pet?.photo_preview ||
      pet?.photo_url ||
      pet?.photo_path ||
      '',
  )
}

function getStorageUrl(value) {
  if (!value) return ''

  if (
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('blob:') ||
    value.startsWith('data:')
  ) {
    return value
  }

  const cleanPath = value.replace(/^\/+/, '')

  if (cleanPath.startsWith('storage/')) {
    return `${API_BASE_URL}/${cleanPath}`
  }

  return `${API_BASE_URL}/storage/${cleanPath}`
}

function hideBrokenImage(event) {
  event.target.style.display = 'none'
}

function getInitial(value) {
  return String(value || 'M').charAt(0).toUpperCase()
}

function normalizeDateKey(value) {
  if (!value) return ''

  const rawValue = String(value)
  const match = rawValue.match(/^(\d{4}-\d{2}-\d{2})/)

  if (match) return match[1]

  const date = new Date(rawValue)

  if (Number.isNaN(date.getTime())) return ''

  return toInputDate(date)
}

function toInputDate(date) {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = `${d.getMonth() + 1}`.padStart(2, '0')
  const day = `${d.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatDate(dateValue, options = {}) {
  if (!dateValue) return 'No disponible'
  return new Intl.DateTimeFormat('es-ES', options).format(new Date(dateValue))
}
</script>

<style scoped>
.font-ladralab-brush {
  font-family: 'Caveat Brush', 'Brush Script MT', 'Segoe Script', cursive;
  font-weight: 700;
}
</style>
