<template>
  <section class="relative">
    <!-- Toasts fijos -->
    <div class="pointer-events-none fixed right-6 top-6 z-[70] flex w-full max-w-md flex-col gap-3">
      <div
        v-if="successMessage"
        class="pointer-events-auto flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 shadow-lg"
      >
        <span class="mt-0.5 text-base">🐾</span>
        <p>{{ successMessage }}</p>
      </div>

      <div
        v-if="loadError"
        class="pointer-events-auto flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-lg"
      >
        <span class="mt-0.5 text-base">⚠️</span>
        <p>{{ loadError }}</p>
      </div>

      <div
        v-if="actionError"
        class="pointer-events-auto flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-lg"
      >
        <span class="mt-0.5 text-base">⚠️</span>
        <p>{{ actionError }}</p>
      </div>
    </div>

    <div class="mx-auto max-w-7xl space-y-6">
      <template v-if="isLoading">
        <section
          class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#5A208E] via-[#7A2EA6] to-[#E02890] p-6 text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
        >
          <div class="animate-pulse">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div class="min-w-0 max-w-4xl">
                <div class="h-10 w-52 rounded bg-white/20"></div>
                <div class="mt-5 h-12 w-72 rounded bg-white/20"></div>
                <div class="mt-5 h-5 w-full max-w-2xl rounded bg-white/15"></div>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
                <div class="h-11 rounded-2xl bg-white/20"></div>
                <div class="h-11 rounded-2xl bg-white/20"></div>
              </div>
            </div>

            <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div class="h-[138px] rounded-[24px] bg-white/15"></div>
              <div class="h-[138px] rounded-[24px] bg-white/15"></div>
              <div class="h-[138px] rounded-[24px] bg-white/15"></div>
            </div>
          </div>
        </section>

        <div class="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_380px] xl:items-stretch">
          <div class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
            <div class="animate-pulse space-y-4">
              <div class="h-12 rounded-2xl bg-[#FAF8FC]"></div>
              <div class="h-12 rounded-2xl bg-[#FAF8FC]"></div>
              <div class="h-12 rounded-2xl bg-[#FAF8FC]"></div>
              <div class="h-28 rounded-2xl bg-[#FAF8FC]"></div>
              <div class="h-20 rounded-2xl bg-[#FAF8FC]"></div>
            </div>
          </div>

          <div class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
            <div class="animate-pulse space-y-4">
              <div class="h-24 rounded-2xl bg-[#FAF8FC]"></div>
              <div class="h-24 rounded-2xl bg-[#FAF8FC]"></div>
              <div class="h-24 rounded-2xl bg-[#FAF8FC]"></div>
              <div class="h-24 rounded-2xl bg-[#FAF8FC]"></div>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <header
          class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#5A208E] via-[#7A2EA6] to-[#E02890] text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
        >
          <div class="flex min-h-[382px] flex-col p-5 sm:p-6 lg:p-7">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div class="min-w-0 max-w-4xl">
                <RouterLink
                  :to="{ name: 'my-reservations' }"
                  class="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  ← Volver a mis reservas
                </RouterLink>

                <h1 class="mt-6 font-ladralab-brush text-5xl leading-none tracking-tight sm:text-6xl">
                  Nueva reserva
                </h1>

                <p class="mt-5 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                  Completa la solicitud de tu perro y revisa el resumen antes de enviarla al centro.
                </p>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
                <RouterLink
                  :to="{ name: 'my-pets' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Ver mis mascotas
                </RouterLink>

                <RouterLink
                  :to="{ name: 'my-reservations' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:bg-[#F8F2FF]"
                >
                  Ver mis reservas
                </RouterLink>
              </div>
            </div>

            <div class="mt-6 grid items-stretch gap-4 sm:grid-cols-2 xl:mt-auto xl:grid-cols-3">
              <article class="flex min-h-[138px] flex-col rounded-[24px] border border-white/16 bg-white/12 p-4 backdrop-blur-sm">
                <p class="text-sm font-medium text-white/80">Mascota</p>
                <p class="mt-3 text-[1.65rem] font-bold leading-[1.08] text-white">
                  {{ selectedPet ? selectedPet.name : 'Sin seleccionar' }}
                </p>
                <p class="mt-2 text-sm leading-6 text-white/82">
                  {{ selectedPet?.breed || 'Elige una mascota para continuar.' }}
                </p>
              </article>

              <article class="flex min-h-[138px] flex-col rounded-[24px] border border-white/16 bg-white/12 p-4 backdrop-blur-sm">
                <p class="text-sm font-medium text-white/80">Servicio</p>
                <p class="mt-3 text-[1.35rem] font-bold leading-6 text-white">
                  {{ selectedService ? selectedService.name : 'Sin seleccionar' }}
                </p>
                <p class="mt-2 text-sm leading-6 text-white/82">
                  {{ serviceSummaryText }}
                </p>
              </article>

              <article class="flex min-h-[138px] flex-col rounded-[24px] border border-white/16 bg-white/12 p-4 backdrop-blur-sm">
                <p class="text-sm font-medium text-white/80">{{ reservationDateLabel }}</p>
                <p class="mt-3 text-[1.35rem] font-bold leading-6 text-white">
                  {{ reservationDateTitle }}
                </p>
                <p class="mt-2 text-sm leading-6 text-white/82">
                  {{ reservationDateText }}
                </p>
              </article>
            </div>
          </div>
        </header>

        <section class="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_380px] xl:items-stretch">
          <article class="flex h-full flex-col rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
            <div>
              <h2 class="text-lg font-bold tracking-tight text-slate-900">Solicitar reserva</h2>
              <p class="mt-1 text-sm text-slate-500">
                Completa la solicitud y comprueba el resumen lateral antes de enviarla.
              </p>
            </div>

            <div class="mt-5 flex h-full flex-col">
              <ReservationForm
                mode="create"
                :pets="pets"
                :services="services"
                :initial-data="reservationInitialData"
                :external-errors="formErrors"
                :is-submitting="isSubmitting"
                :submit-text="'Enviar reserva'"
                :submitting-text="'Enviando...'"
                :cancel-text="'Cancelar'"
                :show-cancel="true"
                reminder-title="Antes de enviar"
                reminder-text="Revisa bien la fecha y añade cualquier indicación útil para que el centro pueda preparar mejor la estancia."
                @change="handleReservationDraftChange"
                @submit="submitReservation"
                @cancel="handleCancel"
              />
            </div>
          </article>

          <aside class="xl:self-stretch">
            <article class="flex h-full flex-col rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <div>
                <h2 class="text-lg font-bold tracking-tight text-slate-900">Resumen</h2>
                <p class="mt-1 text-sm text-slate-500">
                  Comprueba los datos antes de enviar la solicitud.
                </p>
              </div>

              <div class="mt-5 space-y-4">
                <div class="rounded-2xl bg-[#FAF8FC] p-4">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Mascota</p>
                  <p class="mt-1 text-sm font-semibold text-slate-900">
                    {{ selectedPet ? selectedPet.name : 'Sin seleccionar' }}
                  </p>
                  <p class="mt-1 text-sm text-slate-500">
                    {{ selectedPet?.breed || 'Elige una mascota para continuar' }}
                  </p>
                </div>

                <div class="rounded-2xl bg-[#FAF8FC] p-4">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Servicio</p>
                  <p class="mt-1 text-sm font-semibold text-slate-900">
                    {{ selectedService ? selectedService.name : 'Sin seleccionar' }}
                  </p>
                  <p class="mt-1 text-sm text-slate-500">
                    {{ serviceSummaryText }}
                  </p>
                </div>

                <div class="rounded-2xl bg-[#FAF8FC] p-4">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {{ reservationDateLabel }}
                  </p>
                  <p class="mt-1 text-sm font-semibold text-slate-900">
                    {{ reservationDateTitle }}
                  </p>
                  <p class="mt-1 text-sm text-slate-500">
                    {{ reservationDateText }}
                  </p>
                </div>

                <div class="rounded-2xl bg-[#FAF8FC] p-4">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Observaciones</p>
                  <p class="mt-2 text-sm leading-6 text-slate-600">
                    {{ notesSummary }}
                  </p>
                </div>
              </div>

              <div class="mt-auto pt-4">
                <div class="rounded-2xl border border-[#EEE7F6] bg-[#FCFBFE] p-4">
                  <p class="text-sm font-semibold text-slate-900">
                    {{ reservationMessages.summary?.pending || 'Pendiente de confirmación' }}
                  </p>
                  <p class="mt-2 text-sm leading-6 text-slate-500">
                    {{
                      reservationMessages.summary?.pendingDescription ||
                      'Cuando envíes la solicitud, el centro la revisará antes de confirmarla.'
                    }}
                  </p>
                </div>
              </div>
            </article>
          </aside>
        </section>
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import ReservationForm from '@/components/reservations/ReservationForm.vue'
import { getMyPets } from '@/services/petsService'
import { createReservation } from '@/services/reservationsService'
import { getServices } from '@/services/servicesService'
import { getReadableErrorMessage } from '@/utils/errorMessages'
import { uiMessages } from '@/utils/uiMessages'

const route = useRoute()
const router = useRouter()

const reservationMessages = uiMessages.reservations || {
  loading: 'Estamos preparando tu solicitud...',
  success: { created: 'La solicitud se ha enviado correctamente.' },
  errors: {
    load: 'No hemos podido cargar los datos de la reserva.',
    save: 'No se pudo enviar la solicitud.',
  },
  summary: {
    pending: 'Pendiente de confirmación',
    pendingDescription: 'Cuando envíes la solicitud, el centro la revisará antes de confirmarla.',
  },
}

const pets = ref([])
const services = ref([])

const isLoading = ref(false)
const isSubmitting = ref(false)

const loadError = ref('')
const actionError = ref('')
const successMessage = ref('')

const formErrors = ref({})
const reservationDraft = ref({})

let redirectTimeoutId = null

onMounted(() => {
  loadData()
})

onBeforeUnmount(() => {
  if (redirectTimeoutId) {
    clearTimeout(redirectTimeoutId)
  }
})

async function loadData() {
  isLoading.value = true
  loadError.value = ''
  actionError.value = ''
  successMessage.value = ''

  try {
    const [petsData, servicesData] = await Promise.all([
      getMyPets(),
      getServices(),
    ])

    pets.value = Array.isArray(petsData) ? petsData : []
    services.value = Array.isArray(servicesData)
      ? servicesData.filter((service) => service.is_active !== false)
      : []
  } catch (error) {
    console.error(error)
    loadError.value = getReadableErrorMessage(
      error,
      reservationMessages.errors?.load || 'No hemos podido cargar los datos de la reserva.',
    )
  } finally {
    isLoading.value = false
  }
}

const reservationInitialData = computed(() => ({
  pet_id: route.query.petId ? String(route.query.petId) : '',
  service_id: '',
  date: '',
  start_date: '',
  end_date: '',
  start_time: '',
  end_time: '',
  notes: '',
}))

const selectedPet = computed(() => {
  const petId = reservationDraft.value?.pet_id || reservationInitialData.value.pet_id
  return pets.value.find((pet) => String(pet.id) === String(petId)) || null
})

const selectedService = computed(() => {
  const serviceId = reservationDraft.value?.service_id || reservationInitialData.value.service_id
  return services.value.find((service) => String(service.id) === String(serviceId)) || null
})

const bookingMode = computed(() => {
  return reservationDraft.value?.booking_mode || selectedService.value?.booking_mode || ''
})

const serviceSummaryText = computed(() => {
  if (!selectedService.value) {
    return 'Selecciona el servicio que quieres reservar.'
  }

  if (bookingMode.value === 'date_range') {
    return 'Reserva por rango de fechas.'
  }

  if (bookingMode.value === 'single_day') {
    return 'Reserva de día completo.'
  }

  if (bookingMode.value === 'time_slot') {
    const duration = Number(selectedService.value?.duration_minutes || 60)
    return `Cita con duración de ${duration} minutos.`
  }

  return selectedService.value.description || 'Servicio listo para reservar.'
})

const reservationDateLabel = computed(() => {
  if (bookingMode.value === 'date_range') return 'Fechas'
  if (bookingMode.value === 'time_slot') return 'Cita'
  return 'Fecha'
})

const reservationDateTitle = computed(() => {
  if (bookingMode.value === 'date_range') {
    if (!reservationDraft.value.start_date || !reservationDraft.value.end_date) {
      return 'Pendiente'
    }

    return `${formatDisplayDate(reservationDraft.value.start_date)} · ${formatDisplayDate(reservationDraft.value.end_date)}`
  }

  if (bookingMode.value === 'single_day') {
    if (!reservationDraft.value.date) return 'Pendiente'
    return formatDisplayDate(reservationDraft.value.date)
  }

  if (bookingMode.value === 'time_slot') {
    if (!reservationDraft.value.date) return 'Pendiente'
    return formatDisplayDate(reservationDraft.value.date)
  }

  return 'Pendiente'
})

const reservationDateText = computed(() => {
  if (bookingMode.value === 'date_range') {
    const start = reservationDraft.value.start_time
    const end = reservationDraft.value.end_time

    if (!reservationDraft.value.start_date || !reservationDraft.value.end_date) {
      return 'Completa las fechas para ver el resumen.'
    }

    if (start || end) {
      return `${start || '--:--'} · ${end || '--:--'}`
    }

    return 'Rango de estancia pendiente de horario.'
  }

  if (bookingMode.value === 'single_day') {
    if (!reservationDraft.value.date) {
      return 'Completa los datos para ver el resumen.'
    }

    return `${reservationDraft.value.start_time || '09:00'} - ${reservationDraft.value.end_time || '18:00'}`
  }

  if (bookingMode.value === 'time_slot') {
    if (!reservationDraft.value.date || !reservationDraft.value.start_time) {
      return 'Selecciona una fecha y un horario disponible.'
    }

    return `${reservationDraft.value.start_time} - ${reservationDraft.value.end_time || '--:--'}`
  }

  return 'Completa los datos para ver el resumen.'
})

const notesSummary = computed(() => {
  const notes = reservationDraft.value?.notes?.trim()
  return notes || 'No has añadido ninguna observación para esta solicitud.'
})

function handleReservationDraftChange(payload) {
  reservationDraft.value = { ...payload }
}

function formatDisplayDate(dateString) {
  if (!dateString) return 'Pendiente'

  if (dateString.includes('T')) {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(dateString))
  }

  const [year, month, day] = dateString.split('-').map(Number)
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(year, month - 1, day))
}

function handleCancel() {
  router.push({ name: 'my-reservations' })
}

async function submitReservation(payload) {
  isSubmitting.value = true
  actionError.value = ''
  successMessage.value = ''
  formErrors.value = {}

  try {
    // TODO backend:
    // await createReservation(payload)

    await createReservation(payload)

    successMessage.value =
      reservationMessages.success?.created || 'La solicitud se ha enviado correctamente.'

    if (redirectTimeoutId) {
      clearTimeout(redirectTimeoutId)
    }

    redirectTimeoutId = setTimeout(() => {
      router.push({ name: 'my-reservations' })
    }, 1200)
  } catch (error) {
    console.error(error)
    actionError.value = getReadableErrorMessage(
      error,
      reservationMessages.errors?.save || 'No se pudo enviar la solicitud.',
    )
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.font-ladralab-brush {
  font-family: 'Caveat Brush', 'Brush Script MT', 'Segoe Script', cursive;
  font-weight: 700;
}
</style>