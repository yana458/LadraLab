<template>
  <section class="space-y-6">
    <div class="pointer-events-none fixed right-6 top-6 z-[70] flex w-full max-w-md flex-col gap-3">
      <div
        v-if="loadError"
        class="pointer-events-auto rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-lg"
      >
        <div class="flex items-start gap-3">
          <span class="mt-0.5 text-base">⚠️</span>
          <p>{{ loadError }}</p>
        </div>
      </div>
    </div>

    <!-- CABECERA -->
    <header
      class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#5A208E] via-[#7A2EA6] to-[#E02890] text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
    >
      <div class="flex min-h-[300px] flex-col p-5 sm:p-6 lg:p-7">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div class="min-w-0 max-w-3xl">
            <h1 class="font-ladralab-brush text-5xl leading-none tracking-tight sm:text-6xl">
              Seguimientos
            </h1>

            <p class="mt-4 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
              Revisa qué informes faltan, continúa borradores y abre cada seguimiento en una pantalla más cómoda.
            </p>
          </div>

          <div class="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
            <RouterLink
              :to="{ name: 'staff-dashboard' }"
              class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
            >
              Dashboard
            </RouterLink>

            <RouterLink
              :to="{ name: 'staff-reservations' }"
              class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
            >
              Reservas
            </RouterLink>

            <RouterLink
              :to="{ name: 'staff-pets' }"
              class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
            >
              Mascotas
            </RouterLink>

            <button
              type="button"
              @click="clearFilters"
              class="inline-flex h-11 items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:bg-[#F8F2FF]"
            >
              Limpiar vista
            </button>
          </div>
        </div>

        <div class="mt-6 grid items-stretch gap-4 sm:grid-cols-2 xl:mt-auto xl:grid-cols-4">
          <button
            v-for="card in summaryCards"
            :key="card.key"
            type="button"
            @click="applyQuickFilter(card.key)"
            class="flex min-h-[126px] flex-col rounded-[24px] border p-4 text-left backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            :class="
              quickFilter === card.key
                ? 'border-white/30 bg-white/20 ring-4 ring-white/15 shadow-[0_16px_40px_-20px_rgba(30,10,60,0.45)]'
                : 'border-white/16 bg-white/12'
            "
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-sm font-medium text-white/85">{{ card.label }}</p>
                <p class="mt-2 text-3xl font-bold leading-none text-white">{{ card.value }}</p>
              </div>

              <div
                class="flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold shadow-sm"
                :class="card.iconClass"
              >
                {{ card.icon }}
              </div>
            </div>

            <p class="mt-4 text-sm leading-6 text-white/82">
              {{ card.help }}
            </p>
          </button>
        </div>
      </div>
    </header>

    <!-- FILTROS -->
    <section class="rounded-[28px] border border-[#E8E1F1] bg-white px-5 py-5 shadow-sm sm:px-6">
      <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 class="text-[24px] font-bold tracking-tight text-slate-900">
            Buscar seguimiento
          </h2>
          <p class="mt-1 text-sm text-slate-500">
            Elige fecha y filtra por estado, servicio o reserva concreta.
          </p>
        </div>

        <button
          v-if="hasActiveFilters"
          type="button"
          @click="clearFilters"
          class="inline-flex h-10 items-center justify-center self-start rounded-2xl border border-[#DCCFEA] bg-white px-4 text-sm font-semibold text-[#6E4FA2] transition hover:bg-[#F8F4FD]"
        >
          Limpiar filtros
        </button>
      </div>

      <div class="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_280px_180px_180px]">
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">Buscar</label>
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Mascota, raza, tutor o servicio"
            class="h-10 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">Fecha</label>
          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="moveDate(-1)"
              class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
            >
              ←
            </button>

            <input
              v-model="selectedDate"
              type="date"
              class="h-10 min-w-0 flex-1 rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
            />

            <button
              type="button"
              @click="moveDate(1)"
              class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
            >
              →
            </button>

            <button
              type="button"
              @click="goToday"
              class="inline-flex h-10 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
            >
              Hoy
            </button>
          </div>
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">Estado</label>
          <select
            v-model="statusFilter"
            class="h-10 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
          >
            <option value="all">Todos</option>
            <option value="pending">Pendientes</option>
            <option value="draft">Borradores</option>
            <option value="completed">Completados</option>
          </select>
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">Servicio</label>
          <select
            v-model="serviceFilter"
            class="h-10 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
          >
            <option value="all">Todos</option>
            <option value="hotel">Hotel</option>
            <option value="daycare">Guardería</option>
          </select>
        </div>
      </div>

      <div class="mt-4 flex flex-wrap items-center gap-2">
        <span class="inline-flex items-center rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]">
          {{ filteredRows.length }} resultados
        </span>

        <span
          v-if="quickFilter !== 'all'"
          class="inline-flex items-center rounded-full bg-[#FCE8F4] px-3 py-1 text-xs font-semibold text-[#A22068]"
        >
          {{ quickFilterLabel }}
        </span>

        <span class="inline-flex items-center rounded-full bg-[#EEF8FF] px-3 py-1 text-xs font-semibold text-sky-700">
          {{ selectedDateLabel }}
        </span>
      </div>
    </section>

    <!-- LISTADO -->
    <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="text-[22px] font-bold tracking-tight text-slate-900">
            Reservas con seguimiento
          </h2>
          <p class="mt-1 text-sm text-slate-500">
            Abre una reserva para completar su informe diario en una pantalla separada.
          </p>
        </div>

        <span class="self-start rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]">
          {{ filteredRows.length }}
        </span>
      </div>

      <div v-if="isLoading" class="mt-5 rounded-[24px] border border-dashed border-[#E8E1F1] bg-[#FCFBFE] px-4 py-10 text-center text-sm text-slate-500">
        Cargando seguimientos...
      </div>

      <div v-else-if="filteredRows.length" class="mt-5 grid gap-4 2xl:grid-cols-2">
        <article
          v-for="row in filteredRows"
          :key="`${row.reservation.id}-${selectedDate}`"
          class="flex h-full flex-col rounded-[26px] border border-[#EEE7F6] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#DCC9F1] hover:shadow-md"
        >
          <div class="flex items-start gap-4">
            <div
              class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#EAE9EF] to-[#D7CBE7] text-base font-bold text-[#6B5B90]"
            >
              <img
                v-if="getPetImage(row.pet)"
                :src="getPetImage(row.pet)"
                :alt="row.pet.name"
                class="h-full w-full object-cover"
              />
              <span v-else>{{ getInitial(row.pet.name) }}</span>
            </div>

            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <h3 class="text-[18px] font-bold text-slate-900">
                  {{ row.pet.name }}
                </h3>

                <span
                  class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                  :class="statusBadgeClass(row.state)"
                >
                  {{ stateLabel(row.state) }}
                </span>

                <span
                  v-if="row.serviceKey === 'hotel'"
                  class="inline-flex items-center rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]"
                >
                  {{ row.hotelDayLabel }}
                </span>
              </div>

              <p class="mt-1 text-sm font-semibold text-[#6B2FA4]">
                {{ row.reservation.service_name }}
              </p>

              <p class="mt-1 text-sm text-slate-500">
                {{ row.pet.breed || 'Raza pendiente' }}
                <span v-if="row.reservation.client_name"> · {{ row.reservation.client_name }}</span>
                <span v-if="row.reservation.resource_name"> · {{ row.reservation.resource_name }}</span>
              </p>
            </div>
          </div>

          <div class="mt-4 grid gap-3 rounded-[22px] border border-[#F0E9F8] bg-[#FCFBFE] p-4 text-sm text-slate-600 sm:grid-cols-3">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.14em] text-[#9A8BAF]">Horario</p>
              <p class="mt-1 font-semibold text-slate-800">{{ row.timeLabel }}</p>
            </div>
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.14em] text-[#9A8BAF]">Fotos</p>
              <p class="mt-1 font-semibold text-slate-800">{{ row.mediaCount }}</p>
            </div>
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.14em] text-[#9A8BAF]">Fecha</p>
              <p class="mt-1 font-semibold text-slate-800">{{ row.shortDateHint }}</p>
            </div>
          </div>

          <div v-if="row.report?.summary" class="mt-4 rounded-[22px] border border-[#F0E9F8] bg-[#FCFBFE] p-4">
            <p class="text-xs font-bold uppercase tracking-[0.14em] text-[#9A8BAF]">Resumen</p>
            <p class="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
              {{ row.report.summary }}
            </p>
          </div>

          <div class="mt-auto flex flex-wrap justify-end gap-3 pt-4">
            <RouterLink
              :to="buildReservationLink(row)"
              class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-5 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
            >
              Ver reserva
            </RouterLink>

            <RouterLink
              :to="followUpDetailTo(row)"
              class="inline-flex h-11 items-center justify-center rounded-2xl bg-[#6627A3] px-5 text-sm font-semibold text-white transition hover:bg-[#57208D]"
            >
              {{ actionLabel(row.state) }}
            </RouterLink>
          </div>
        </article>
      </div>

      <div
        v-else
        class="mt-5 rounded-[24px] border border-dashed border-[#E8E1F1] bg-[#FCFBFE] px-4 py-10 text-center text-sm text-slate-500"
      >
        No hay seguimientos para los filtros actuales.
      </div>
    </section>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { getStaffReservations } from '@/services/staffReservationsService'
import { getReservationDailyLogs } from '@/services/dailyLogsService'
import { getReadableErrorMessage } from '@/utils/errorMessages'
import { uiMessages } from '@/utils/uiMessages'

const route = useRoute()
const router = useRouter()
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

const messages = uiMessages.staffFollowUps || {
  errors: {
    load: 'No hemos podido cargar los seguimientos por ahora.',
  },
}

const isLoading = ref(true)
const loadError = ref('')
const reservations = ref([])

const quickFilter = ref('all')
const selectedDate = ref(toInputDate(new Date()))
const searchTerm = ref('')
const statusFilter = ref('all')
const serviceFilter = ref('all')
const reservationFilterId = ref(null)

onMounted(async () => {
  hydrateFromRoute()
  await loadData()
})

watch(
  () => route.query,
  () => {
    hydrateFromRoute()
  },
)

async function loadData() {
  isLoading.value = true
  loadError.value = ''

  try {
    const reservationsData = await getStaffReservations()
    const normalizedReservations = Array.isArray(reservationsData) ? reservationsData : []

    reservations.value = await attachDailyReports(normalizedReservations)
  } catch (error) {
    console.error(error)
    loadError.value = getReadableErrorMessage(
      error,
      messages.errors?.load || 'No hemos podido cargar los seguimientos por ahora.',
    )
  } finally {
    isLoading.value = false
  }
}

async function attachDailyReports(list = []) {
  const mapped = await Promise.all(
    list.map(async (reservation) => {
      if (!isFollowUpService(reservation)) {
        return normalizeReservationForView(reservation)
      }

      if (Array.isArray(reservation.daily_reports) && reservation.daily_reports.length) {
        return normalizeReservationForView(reservation)
      }

      try {
        const reports = await getReservationDailyLogs(reservation.id)

        return normalizeReservationForView({
          ...reservation,
          daily_reports: Array.isArray(reports) ? reports : [],
        })
      } catch (error) {
        console.warn(`No se pudieron cargar los seguimientos de la reserva ${reservation.id}`, error)

        return normalizeReservationForView({
          ...reservation,
          daily_reports: [],
        })
      }
    }),
  )

  return mapped
}

function normalizeReservationForView(reservation = {}) {
  const pet = reservation.pet || null
  const service = reservation.service || null
  const resource = reservation.resource || null
  const client = reservation.client || pet?.owner || null

  return {
    ...reservation,
    pet_id: reservation.pet_id ?? pet?.id ?? null,
    service_id: reservation.service_id ?? service?.id ?? null,
    resource_id: reservation.resource_id ?? resource?.id ?? null,
    pet,
    service,
    resource,
    client,
    pet_name: reservation.pet_name || pet?.name || 'Mascota',
    client_name: reservation.client_name || client?.name || 'Cliente',
    service_name: reservation.service_name || service?.name || 'Servicio',
    resource_name: reservation.resource_name || resource?.name || '',
    daily_reports: Array.isArray(reservation.daily_reports)
      ? reservation.daily_reports
      : Array.isArray(reservation.dailyReports)
        ? reservation.dailyReports
        : [],
  }
}

const followUpRows = computed(() => {
  return reservations.value
    .filter((reservation) => shouldAppearInFollowUps(reservation, selectedDate.value))
    .map((reservation) => {
      const report = getReportForDate(reservation, selectedDate.value)
      const pet = reservation.pet || {
        id: reservation.pet_id,
        name: reservation.pet_name || 'Mascota',
        breed: '',
        photo_path: '',
        photo_url: '',
      }

      const serviceKey = getServiceKey(reservation)
      const mediaCount = getReportImages(report).length
      const state = getReportState(report)

      return {
        reservation,
        pet,
        report,
        state,
        serviceKey,
        mediaCount,
        hotelDayLabel: serviceKey === 'hotel' ? getHotelDayLabel(reservation, selectedDate.value) : '',
        timeLabel: buildTimeLabel(reservation),
        shortDateHint:
          serviceKey === 'hotel'
            ? `${formatDate(reservation.start_at, { day: '2-digit', month: 'short' })} → ${formatDate(reservation.end_at, { day: '2-digit', month: 'short' })}`
            : 'Servicio del día',
      }
    })
})

const filteredRows = computed(() => {
  let items = [...followUpRows.value]

  if (reservationFilterId.value) {
    items = items.filter((row) => Number(row.reservation.id) === Number(reservationFilterId.value))
  }

  if (quickFilter.value === 'pending') {
    items = items.filter((row) => row.state === 'pending')
  }

  if (quickFilter.value === 'draft') {
    items = items.filter((row) => row.state === 'draft')
  }

  if (quickFilter.value === 'completed') {
    items = items.filter((row) => row.state === 'completed')
  }

  if (statusFilter.value !== 'all') {
    items = items.filter((row) => row.state === statusFilter.value)
  }

  if (serviceFilter.value === 'hotel') {
    items = items.filter((row) => row.serviceKey === 'hotel')
  }

  if (serviceFilter.value === 'daycare') {
    items = items.filter((row) => row.serviceKey === 'daycare')
  }

  const query = searchTerm.value.trim().toLowerCase()
  if (query) {
    items = items.filter((row) => {
      return (
        row.pet.name?.toLowerCase().includes(query) ||
        row.pet.breed?.toLowerCase().includes(query) ||
        row.reservation.client_name?.toLowerCase().includes(query) ||
        row.reservation.service_name?.toLowerCase().includes(query)
      )
    })
  }

  items.sort((a, b) => {
    const order = { pending: 0, draft: 1, completed: 2 }
    if (order[a.state] !== order[b.state]) {
      return order[a.state] - order[b.state]
    }

    return new Date(a.reservation.start_at).getTime() - new Date(b.reservation.start_at).getTime()
  })

  return items
})

const summaryCards = computed(() => [
  {
    key: 'all',
    label: 'Activas en fecha',
    value: followUpRows.value.length,
    help: 'Reservas que admiten seguimiento ese día.',
    icon: '01',
    iconClass: 'bg-[#F3ECFB] text-[#5A208E]',
  },
  {
    key: 'pending',
    label: 'Pendientes',
    value: followUpRows.value.filter((row) => row.state === 'pending').length,
    help: 'Informes que aún no se han iniciado.',
    icon: '02',
    iconClass: 'bg-amber-50 text-amber-700',
  },
  {
    key: 'draft',
    label: 'Borradores',
    value: followUpRows.value.filter((row) => row.state === 'draft').length,
    help: 'Seguimientos guardados sin cerrar.',
    icon: '03',
    iconClass: 'bg-[#FFF7ED] text-orange-700',
  },
  {
    key: 'completed',
    label: 'Completados',
    value: followUpRows.value.filter((row) => row.state === 'completed').length,
    help: 'Informes listos para consultar.',
    icon: '04',
    iconClass: 'bg-emerald-50 text-emerald-700',
  },
])

const quickFilterLabel = computed(() => {
  const labels = {
    all: 'Todas activas',
    pending: 'Pendientes',
    draft: 'Borradores',
    completed: 'Completados',
  }

  return labels[quickFilter.value] || 'Vista'
})

const selectedDateLabel = computed(() => {
  return formatDate(`${selectedDate.value}T00:00:00`, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
})

const hasActiveFilters = computed(() => {
  return (
    quickFilter.value !== 'all' ||
    Boolean(reservationFilterId.value) ||
    searchTerm.value.trim() !== '' ||
    statusFilter.value !== 'all' ||
    serviceFilter.value !== 'all' ||
    selectedDate.value !== toInputDate(new Date())
  )
})

function hydrateFromRoute() {
  const queryDate = String(route.query.date || '')
  const queryReservation = route.query.reservation || ''
  const queryStatus = String(route.query.status || '')

  if (queryDate) {
    selectedDate.value = queryDate
  }

  reservationFilterId.value = queryReservation ? Number(queryReservation) : null

  if (queryStatus && ['pending', 'draft', 'completed'].includes(queryStatus)) {
    quickFilter.value = queryStatus
    statusFilter.value = queryStatus
  }
}

function followUpDetailTo(row) {
  return {
    path: `/staff/seguimientos/${row.reservation.id}`,
    query: { date: selectedDate.value },
  }
}

function buildReservationLink(row) {
  return {
    name: 'staff-reservation-detail',
    params: { id: row.reservation.id },
  }
}

function actionLabel(state) {
  if (state === 'completed') return 'Revisar seguimiento'
  if (state === 'draft') return 'Continuar borrador'
  return 'Completar seguimiento'
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

function applyQuickFilter(key) {
  quickFilter.value = key

  if (key !== 'all') {
    statusFilter.value = key
  }
}

function clearFilters() {
  quickFilter.value = 'all'
  selectedDate.value = toInputDate(new Date())
  searchTerm.value = ''
  statusFilter.value = 'all'
  serviceFilter.value = 'all'
  reservationFilterId.value = null

  if (Object.keys(route.query).length) {
    router.replace({ name: route.name, query: {} })
  }
}

function moveDate(days) {
  selectedDate.value = addDaysToInputDate(selectedDate.value, days)
}

function goToday() {
  selectedDate.value = toInputDate(new Date())
}

function shouldAppearInFollowUps(reservation, dateKey) {
  if (!reservation) return false
  if (!['confirmed', 'completed'].includes(reservation.status)) return false

  const serviceKey = getServiceKey(reservation)
  if (serviceKey !== 'hotel' && serviceKey !== 'daycare') return false

  return reservationTouchesDate(reservation, dateKey)
}

function reservationTouchesDate(reservation, dateKey) {
  const dayStart = new Date(`${dateKey}T00:00:00`)
  const dayEnd = new Date(`${dateKey}T23:59:59`)
  const start = new Date(reservation.start_at)
  const end = new Date(reservation.end_at || reservation.start_at)

  return start <= dayEnd && end >= dayStart
}

function getReportForDate(reservation, dateKey) {
  return (
    (reservation.daily_reports || []).find(
      (report) => normalizeDateKey(report.report_date) === dateKey,
    ) || null
  )
}

function getReportState(report) {
  const status = String(report?.status || '').toLowerCase()

  if (!report) return 'pending'
  if (status === 'draft' || report.is_draft) return 'draft'
  if (status === 'published' || status === 'completed' || report.published_at || report.completed_at) return 'completed'

  return 'draft'
}

function getServiceKey(reservation) {
  const bookingMode = reservation.service?.booking_mode
  const category = reservation.service?.category
  const serviceName = String(reservation.service_name || reservation.service?.name || '').toLowerCase()

  if (category === 'boarding' || bookingMode === 'date_range') return 'hotel'
  if (category === 'daycare' || bookingMode === 'single_day') return 'daycare'

  if (serviceName.includes('hotel') || serviceName.includes('alojamiento')) return 'hotel'
  if (serviceName.includes('guardería') || serviceName.includes('adaptación')) return 'daycare'

  return 'other'
}

function isFollowUpService(reservation) {
  const serviceKey = getServiceKey(reservation)
  return serviceKey === 'hotel' || serviceKey === 'daycare'
}

function getHotelDayLabel(reservation, dateKey) {
  const start = new Date(`${normalizeDateKey(reservation.start_at)}T00:00:00`)
  const current = new Date(`${dateKey}T00:00:00`)
  const diff = Math.round((current.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  return `Día ${diff + 1} de estancia`
}

function buildTimeLabel(reservation) {
  return `${formatDate(reservation.start_at, { hour: '2-digit', minute: '2-digit' })} → ${formatDate(reservation.end_at, { hour: '2-digit', minute: '2-digit' })}`
}

function getReportImages(report) {
  const media = Array.isArray(report?.media) ? report.media : []
  const photos = Array.isArray(report?.photos) ? report.photos : []

  return [...media, ...photos].filter((item) => {
    const type = String(item?.file_type || item?.type || '').toLowerCase()
    const path = item?.url || item?.file_url || item?.file_path || item?.path || ''

    if (!path) return false
    if (type && type !== 'image') return false

    return true
  })
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

function addDaysToInputDate(inputDate, days) {
  const date = new Date(`${inputDate}T00:00:00`)
  date.setDate(date.getDate() + days)
  return toInputDate(date)
}

function formatDate(dateValue, options = {}) {
  return new Intl.DateTimeFormat('es-ES', options).format(new Date(dateValue))
}
</script>

<style scoped>
.font-ladralab-brush {
  font-family: 'Caveat Brush', 'Brush Script MT', 'Segoe Script', cursive;
  font-weight: 700;
}
</style>
