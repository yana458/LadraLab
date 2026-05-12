<template>
  <section class="relative">
    <!-- Mensajes flotantes -->
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

    <div class="mx-auto max-w-7xl space-y-6">
      <template v-if="isLoading">
        <section
          class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#5A208E] via-[#7A2EA6] to-[#E02890] p-6 text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
        >
          <div class="animate-pulse">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div class="min-w-0 max-w-3xl">
                <div class="h-12 w-72 rounded bg-white/20"></div>
                <div class="mt-5 h-5 w-full max-w-2xl rounded bg-white/15"></div>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
                <div v-for="n in 4" :key="n" class="h-11 rounded-2xl bg-white/20"></div>
              </div>
            </div>

            <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div v-for="n in 4" :key="n" class="h-[152px] rounded-[24px] bg-white/15"></div>
            </div>
          </div>
        </section>
      </template>

      <template v-else>
        <!-- Cabecera -->
        <header
          class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#5A208E] via-[#7A2EA6] to-[#E02890] text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
        >
          <div class="flex min-h-[382px] flex-col p-5 sm:p-6 lg:p-7">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div class="min-w-0 max-w-4xl">
                <h1 class="font-ladralab-brush text-5xl leading-none tracking-tight sm:text-6xl">
                  Hola, equipo
                </h1>

                <p class="mt-4 max-w-2xl text-sm font-semibold leading-7 text-white/90 sm:text-base">
                  Resumen operativo de {{ todayLabel }}.
                </p>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
                <RouterLink
                  :to="{ name: 'staff-followups', query: { date: todayKey } }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Seguimientos
                </RouterLink>

                <RouterLink
                  :to="{ name: 'staff-pets' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Mascotas
                </RouterLink>

                <RouterLink
                  :to="{ name: 'staff-reservations' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:bg-[#F8F2FF]"
                >
                  Reservas
                </RouterLink>

                <RouterLink
                  :to="{ name: 'staff-resources' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Recursos
                </RouterLink>
              </div>
            </div>

            <div class="mt-6 grid items-stretch gap-4 sm:grid-cols-2 xl:mt-auto xl:grid-cols-4">
              <RouterLink
                v-for="card in summaryCards"
                :key="card.key"
                :to="card.to"
                class="flex h-full min-h-[152px] flex-col rounded-[24px] border border-white/16 bg-white/12 p-4 text-left backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-lg"
              >
                <div class="flex items-start justify-between gap-4">
                  <div class="min-w-0">
                    <p class="text-sm font-medium text-white/85">{{ card.label }}</p>
                    <p class="mt-2 text-3xl font-bold leading-none text-white">
                      {{ card.value }}
                    </p>
                  </div>

                  <div
                    class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-bold shadow-sm"
                    :class="card.iconClass"
                  >
                    {{ card.icon }}
                  </div>
                </div>

                <p class="mt-4 text-sm leading-6 text-white/82">
                  {{ card.help }}
                </p>
              </RouterLink>
            </div>
          </div>
        </header>

        <!-- Avisos principales -->
        <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="alert in priorityAlerts"
            :key="alert.key"
            class="flex h-full min-h-[230px] flex-col rounded-[26px] border bg-white p-5 shadow-sm"
            :class="alert.borderClass"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-xs font-bold uppercase tracking-[0.16em]" :class="alert.kickerClass">
                  {{ alert.kicker }}
                </p>
                <h2 class="mt-2 text-lg font-bold text-slate-950">{{ alert.title }}</h2>
              </div>
              <span
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-bold"
                :class="alert.badgeClass"
              >
                {{ alert.value }}
              </span>
            </div>

            <p class="mt-3 text-sm leading-6 text-slate-500">
              {{ alert.description }}
            </p>

            <div class="mt-auto pt-5">
              <RouterLink
                :to="alert.to"
                class="inline-flex h-10 items-center justify-center rounded-2xl px-4 text-sm font-semibold transition"
                :class="alert.buttonClass"
              >
                {{ alert.action }}
              </RouterLink>
            </div>
          </article>
        </section>

        <!-- Contenido principal -->
        <div class="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(340px,0.8fr)]">
          <main class="space-y-6">
            <!-- Agenda compacta -->
            <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 class="text-2xl font-bold text-slate-950">Agenda de hoy</h2>
                  <p class="mt-2 text-sm leading-6 text-slate-500">
                    Vista rápida de las reservas activas o previstas para la jornada.
                  </p>
                </div>

                <RouterLink
                  :to="{ name: 'staff-reservations', query: { date: todayKey, view: 'day' } }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                >
                  Ver agenda completa
                </RouterLink>
              </div>

              <div class="mt-6 space-y-3">
                <article
                  v-for="reservation in todayAgenda"
                  :key="reservation.id"
                  class="rounded-[22px] border border-[#E8E1F1] bg-[#FCFBFE] p-4 transition hover:border-[#D7C6EA] hover:bg-white"
                >
                  <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div class="flex min-w-0 items-start gap-4">
                      <div class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#F2E9FA] text-lg font-bold text-[#6627A3]">
                        <img
                          v-if="getPetImage(reservation.pet)"
                          :src="getPetImage(reservation.pet)"
                          :alt="reservation.pet?.name || 'Mascota'"
                          class="h-full w-full object-cover"
                        />
                        <span v-else>{{ getInitial(reservation.pet?.name) }}</span>
                      </div>

                      <div class="min-w-0">
                        <div class="flex flex-wrap items-center gap-2">
                          <h3 class="font-bold text-slate-950">{{ reservation.pet?.name || 'Mascota' }}</h3>
                          <span
                            class="rounded-full px-3 py-1 text-xs font-semibold"
                            :class="getStatusClass(reservation.status)"
                          >
                            {{ getStatusLabel(reservation.status) }}
                          </span>
                          <span
                            v-if="isFollowUpService(reservation)"
                            class="rounded-full bg-[#F1E9FB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]"
                          >
                            Seguimiento
                          </span>
                        </div>

                        <p class="mt-1 text-sm font-semibold text-[#6627A3]">
                          {{ getServiceName(reservation) }}
                        </p>
                        <p class="mt-1 text-sm text-slate-500">
                          {{ formatTime(reservation.start_at) }} → {{ formatTime(reservation.end_at) }}
                          <span v-if="reservation.resource_name"> · {{ reservation.resource_name }}</span>
                          <span v-else> · Recurso sin asignar</span>
                        </p>
                      </div>
                    </div>

                    <div class="flex flex-wrap gap-2 lg:justify-end">
                      <RouterLink
                        :to="buildReservationDetailLink(reservation)"
                        class="inline-flex h-10 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-xs font-semibold text-[#5A208E] transition hover:bg-[#F6F1FB]"
                      >
                        Ver reserva
                      </RouterLink>

                      <RouterLink
                        v-if="isFollowUpService(reservation)"
                        :to="buildFollowUpLink(reservation)"
                        class="inline-flex h-10 items-center justify-center rounded-2xl bg-[#6627A3] px-4 text-xs font-semibold text-white transition hover:bg-[#57208D]"
                      >
                        Seguimiento
                      </RouterLink>
                    </div>
                  </div>
                </article>

                <div
                  v-if="!todayAgenda.length"
                  class="rounded-[22px] border border-dashed border-[#D9CEE8] bg-[#FCFBFE] px-5 py-8 text-sm text-slate-500"
                >
                  No hay reservas previstas para hoy.
                </div>
              </div>
            </section>

            <!-- Seguimientos del día -->
            <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 class="text-2xl font-bold text-slate-950">Seguimientos de hoy</h2>
                  <p class="mt-2 text-sm leading-6 text-slate-500">
                    Informes diarios que el equipo debe completar o revisar antes de cerrar la jornada.
                  </p>
                </div>

                <RouterLink
                  :to="{ name: 'staff-followups', query: { date: todayKey } }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                >
                  Abrir seguimientos
                </RouterLink>
              </div>

              <div class="mt-6 grid gap-4 lg:grid-cols-3">
                <article
                  v-for="item in followUpCards"
                  :key="item.key"
                  class="rounded-[24px] border p-4"
                  :class="item.cardClass"
                >
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <p class="text-sm font-semibold" :class="item.labelClass">{{ item.label }}</p>
                      <p class="mt-2 text-3xl font-bold text-slate-950">{{ item.value }}</p>
                    </div>
                    <span class="rounded-2xl px-3 py-2 text-xs font-bold" :class="item.badgeClass">
                      {{ item.icon }}
                    </span>
                  </div>
                  <p class="mt-3 text-sm leading-6 text-slate-500">{{ item.help }}</p>
                </article>
              </div>

              <div class="mt-5 space-y-3">
                <article
                  v-for="reservation in pendingFollowUpsPreview"
                  :key="reservation.id"
                  class="flex flex-col gap-3 rounded-[22px] border border-[#F2D1E4] bg-[#FFF8FC] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div class="min-w-0">
                    <p class="font-bold text-slate-950">
                      {{ reservation.pet?.name || 'Mascota' }} · {{ getServiceName(reservation) }}
                    </p>
                    <p class="mt-1 text-sm text-slate-500">
                      {{ getFollowUpStateLabel(getTodayReport(reservation)) }} · {{ formatTime(reservation.start_at) }} → {{ formatTime(reservation.end_at) }}
                    </p>
                  </div>

                  <RouterLink
                    :to="buildFollowUpLink(reservation)"
                    class="inline-flex h-10 shrink-0 items-center justify-center rounded-2xl bg-[#6627A3] px-4 text-xs font-semibold text-white transition hover:bg-[#57208D]"
                  >
                    Completar
                  </RouterLink>
                </article>

                <div
                  v-if="!pendingFollowUpsPreview.length"
                  class="rounded-[22px] border border-dashed border-[#D9CEE8] bg-[#FCFBFE] px-5 py-6 text-sm text-slate-500"
                >
                  No hay seguimientos pendientes destacados. Puedes revisar todos desde la vista de seguimiento.
                </div>
              </div>
            </section>
          </main>

          <aside class="space-y-6">
            <!-- Mascotas en estancia -->
            <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h2 class="text-xl font-bold text-slate-950">En estancia</h2>
                  <p class="mt-2 text-sm leading-6 text-slate-500">
                    Mascotas alojadas o activas ahora mismo.
                  </p>
                </div>
                <span class="rounded-2xl bg-[#EDFDF7] px-3 py-2 text-sm font-bold text-emerald-700">
                  {{ activeStays.length }}
                </span>
              </div>

              <div class="mt-5 space-y-3">
                <article
                  v-for="reservation in activeStaysPreview"
                  :key="reservation.id"
                  class="flex items-center gap-3 rounded-[22px] border border-[#E8E1F1] bg-[#FCFBFE] p-3"
                >
                  <div class="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#F2E9FA] text-sm font-bold text-[#6627A3]">
                    <img
                      v-if="getPetImage(reservation.pet)"
                      :src="getPetImage(reservation.pet)"
                      :alt="reservation.pet?.name || 'Mascota'"
                      class="h-full w-full object-cover"
                    />
                    <span v-else>{{ getInitial(reservation.pet?.name) }}</span>
                  </div>

                  <div class="min-w-0 flex-1">
                    <p class="truncate font-bold text-slate-950">{{ reservation.pet?.name || 'Mascota' }}</p>
                    <p class="truncate text-sm text-slate-500">
                      {{ getServiceName(reservation) }} · {{ reservation.resource_name || 'Sin recurso' }}
                    </p>
                  </div>

                  <RouterLink
                    :to="buildReservationDetailLink(reservation)"
                    class="inline-flex h-9 shrink-0 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-3 text-xs font-semibold text-[#5A208E] transition hover:bg-[#F6F1FB]"
                  >
                    Ver
                  </RouterLink>
                </article>

                <div
                  v-if="!activeStaysPreview.length"
                  class="rounded-[22px] border border-dashed border-[#D9CEE8] bg-[#FCFBFE] px-5 py-6 text-sm text-slate-500"
                >
                  No hay estancias activas en este momento.
                </div>
              </div>
            </section>

            <!-- Recursos -->
            <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h2 class="text-xl font-bold text-slate-950">Estado de recursos</h2>
                  <p class="mt-2 text-sm leading-6 text-slate-500">
                    Resumen rápido de patios, suites y salas.
                  </p>
                </div>
                <RouterLink
                  :to="{ name: 'staff-resources' }"
                  class="inline-flex h-10 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-xs font-semibold text-[#5A208E] transition hover:bg-[#F6F1FB]"
                >
                  Ver
                </RouterLink>
              </div>

              <div class="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                <div class="rounded-[20px] bg-[#F4FEFA] px-4 py-3">
                  <p class="text-xs font-bold uppercase tracking-[0.12em] text-emerald-600">Activos</p>
                  <p class="mt-1 text-2xl font-bold text-slate-950">{{ resourceStats.active }}</p>
                </div>
                <div class="rounded-[20px] bg-[#FFFBEB] px-4 py-3">
                  <p class="text-xs font-bold uppercase tracking-[0.12em] text-amber-600">Limpieza</p>
                  <p class="mt-1 text-2xl font-bold text-slate-950">{{ resourceStats.cleaning }}</p>
                </div>
                <div class="rounded-[20px] bg-[#FEF2F2] px-4 py-3">
                  <p class="text-xs font-bold uppercase tracking-[0.12em] text-red-500">No disponibles</p>
                  <p class="mt-1 text-2xl font-bold text-slate-950">{{ resourceStats.disabled }}</p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getStaffReservations } from '@/services/staffReservationsService'
import { getResources } from '@/services/resourcesService'
import { getReservationDailyLogs } from '@/services/dailyLogsService'
import { getReadableErrorMessage } from '@/utils/errorMessages'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

const isLoading = ref(true)
const loadError = ref('')
const reservations = ref([])
const resources = ref([])

const todayKey = toInputDate(new Date())

onMounted(async () => {
  await loadDashboardData()
})

async function loadDashboardData() {
  isLoading.value = true
  loadError.value = ''

  try {
    const [reservationsData, resourcesData] = await Promise.all([
      getStaffReservations(),
      getResources(),
    ])

    const baseReservations = Array.isArray(reservationsData)
      ? reservationsData.map(normalizeReservationForDashboard)
      : []

    reservations.value = await attachDailyReportsToTodayReservations(baseReservations)
    resources.value = Array.isArray(resourcesData) ? resourcesData : []
  } catch (error) {
    console.error(error)
    loadError.value = getReadableErrorMessage(
      error,
      'No se ha podido cargar el dashboard de staff. Inténtalo de nuevo en unos minutos.',
    )
  } finally {
    isLoading.value = false
  }
}

async function attachDailyReportsToTodayReservations(list = []) {
  const mapped = await Promise.all(
    list.map(async (reservation) => {
      if (!isReservationVisibleToday(reservation) || !isFollowUpService(reservation)) {
        return reservation
      }

      if (Array.isArray(reservation.daily_reports) && reservation.daily_reports.length) {
        return reservation
      }

      try {
        const reports = await getReservationDailyLogs(reservation.id)

        return {
          ...reservation,
          daily_reports: Array.isArray(reports) ? reports : [],
        }
      } catch (error) {
        console.warn(`No se pudieron cargar los seguimientos de la reserva ${reservation.id}`, error)

        return {
          ...reservation,
          daily_reports: [],
        }
      }
    }),
  )

  return mapped
}

function normalizeReservationForDashboard(reservation = {}) {
  const pet = reservation.pet || null
  const service = reservation.service || null
  const resource = reservation.resource || null

  return {
    ...reservation,
    pet_id: reservation.pet_id ?? pet?.id ?? null,
    service_id: reservation.service_id ?? service?.id ?? null,
    resource_id: reservation.resource_id ?? resource?.id ?? null,
    service_name: reservation.service_name || service?.name || 'Servicio',
    resource_name: reservation.resource_name || resource?.name || '',
    pet,
    service,
    resource,
    daily_reports: Array.isArray(reservation.daily_reports)
      ? reservation.daily_reports
      : Array.isArray(reservation.dailyReports)
        ? reservation.dailyReports
        : [],
  }
}

const todayReservations = computed(() => {
  return reservations.value
    .filter((reservation) => isReservationVisibleToday(reservation))
    .sort((a, b) => new Date(a.start_at) - new Date(b.start_at))
})

const todayAgenda = computed(() => todayReservations.value.slice(0, 8))

const todayFollowUpReservations = computed(() => {
  return todayReservations.value.filter((reservation) => {
    return reservation.status !== 'cancelled' && isFollowUpService(reservation)
  })
})

const completedFollowUps = computed(() => {
  return todayFollowUpReservations.value.filter((reservation) => {
    const report = getTodayReport(reservation)
    return isReportCompleted(report)
  })
})

const draftFollowUps = computed(() => {
  return todayFollowUpReservations.value.filter((reservation) => {
    const report = getTodayReport(reservation)
    return report && !isReportCompleted(report)
  })
})

const missingFollowUps = computed(() => {
  return todayFollowUpReservations.value.filter((reservation) => !getTodayReport(reservation))
})

const pendingFollowUps = computed(() => {
  return todayFollowUpReservations.value.filter((reservation) => {
    const report = getTodayReport(reservation)
    return !report || !isReportCompleted(report)
  })
})

const pendingFollowUpsPreview = computed(() => pendingFollowUps.value.slice(0, 4))

const pendingReservations = computed(() => {
  return reservations.value.filter((reservation) => reservation.status === 'pending')
})

const missingResourceReservations = computed(() => {
  return reservations.value.filter((reservation) => {
    return (
      reservation.status !== 'cancelled' &&
      shouldRequireResource(reservation) &&
      !reservation.resource_id &&
      isTodayOrFuture(reservation.start_at)
    )
  })
})

const activeStays = computed(() => {
  return reservations.value.filter((reservation) => {
    return (
      reservation.status === 'confirmed' &&
      isFollowUpService(reservation) &&
      isDateBetween(todayKey, reservation.start_at, reservation.end_at)
    )
  })
})

const activeStaysPreview = computed(() => activeStays.value.slice(0, 5))

const checkoutToday = computed(() => {
  return reservations.value.filter((reservation) => {
    return reservation.status === 'confirmed' && normalizeDateKey(reservation.end_at) === todayKey
  })
})

const resourceStats = computed(() => {
  return resources.value.reduce(
    (acc, resource) => {
      if (resource.status === 'active') acc.active += 1
      if (resource.status === 'cleaning') acc.cleaning += 1
      if (resource.status === 'disabled') acc.disabled += 1
      return acc
    },
    { active: 0, cleaning: 0, disabled: 0 },
  )
})

const todayLabel = computed(() => {
  return formatDate(`${todayKey}T00:00:00`, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
})

const summaryCards = computed(() => [
  {
    key: 'today-reservations',
    label: 'Reservas de hoy',
    value: todayReservations.value.length,
    icon: '01',
    help: 'Entradas, salidas y servicios previstos para la jornada.',
    iconClass: 'bg-white text-[#8C207B]',
    to: { name: 'staff-reservations', query: { date: todayKey, view: 'day' } },
  },
  {
    key: 'active-stays',
    label: 'En estancia',
    value: activeStays.value.length,
    icon: '02',
    help: 'Mascotas con servicio activo o alojamiento en curso.',
    iconClass: 'bg-[#E8FFF6] text-emerald-700',
    to: { name: 'staff-reservations', query: { date: todayKey, status: 'confirmed' } },
  },
  {
    key: 'followups',
    label: 'Seguimientos pendientes',
    value: pendingFollowUps.value.length,
    icon: '03',
    help: 'Informes diarios que todavía necesitan revisión o cierre.',
    iconClass: 'bg-[#FFF8E8] text-amber-700',
    to: { name: 'staff-followups', query: { date: todayKey } },
  },
  {
    key: 'pending',
    label: 'Reservas sin confirmar',
    value: pendingReservations.value.length,
    icon: '04',
    help: 'Solicitudes que necesitan revisión antes de quedar confirmadas.',
    iconClass: 'bg-white text-[#E02890]',
    to: { name: 'staff-reservations', query: { status: 'pending' } },
  },
])

const priorityAlerts = computed(() => [
  {
    key: 'pending-confirmation',
    kicker: 'Reservas',
    title: 'Sin confirmar',
    value: pendingReservations.value.length,
    description: 'Revisa las solicitudes pendientes y confirma las que ya tengan todos los datos necesarios.',
    action: 'Revisar reservas',
    to: { name: 'staff-reservations', query: { status: 'pending' } },
    borderClass: 'border-[#F6D6E7]',
    kickerClass: 'text-[#C2257A]',
    badgeClass: 'bg-[#FCE7F3] text-[#BE185D]',
    buttonClass: 'bg-[#6627A3] text-white hover:bg-[#57208D]',
  },
  {
    key: 'missing-resource',
    kicker: 'Recursos',
    title: 'Pendientes de asignar',
    value: missingResourceReservations.value.length,
    description: 'Hay reservas próximas que necesitan patio, sala o suite antes de la llegada.',
    action: 'Asignar recurso',
    to: { name: 'staff-reservations', query: { resource: 'missing' } },
    borderClass: 'border-[#F7E0B8]',
    kickerClass: 'text-amber-600',
    badgeClass: 'bg-[#FEF3C7] text-amber-700',
    buttonClass: 'bg-[#FFF8E8] text-amber-700 hover:bg-[#FEF3C7]',
  },
  {
    key: 'pending-followups',
    kicker: 'Seguimientos',
    title: 'Pendientes de cerrar',
    value: pendingFollowUps.value.length,
    description: 'Informes diarios que todavía necesitan revisión antes de mostrarse al tutor.',
    action: 'Completar seguimiento',
    to: { name: 'staff-followups', query: { date: todayKey } },
    borderClass: 'border-[#E8D8F6]',
    kickerClass: 'text-[#7A2EA6]',
    badgeClass: 'bg-[#F1E9FB] text-[#7A2EA6]',
    buttonClass: 'bg-[#F6F1FB] text-[#6627A3] hover:bg-[#EEE2FA]',
  },
  {
    key: 'checkout',
    kicker: 'Salidas',
    title: 'Finalizan hoy',
    value: checkoutToday.value.length,
    description: 'Mascotas con salida prevista hoy. Conviene revisar notas, higiene y seguimiento final.',
    action: 'Ver salidas',
    to: { name: 'staff-reservations', query: { date: todayKey, ending: 'today' } },
    borderClass: 'border-[#D7F5E8]',
    kickerClass: 'text-emerald-600',
    badgeClass: 'bg-[#ECFDF5] text-emerald-700',
    buttonClass: 'bg-[#EDFDF7] text-emerald-700 hover:bg-[#DDF8EC]',
  },
])

const followUpCards = computed(() => [
  {
    key: 'completed',
    label: 'Completados',
    value: completedFollowUps.value.length,
    icon: '✓',
    help: 'Informes cerrados y listos para consulta.',
    cardClass: 'border-emerald-100 bg-[#F4FEFA]',
    labelClass: 'text-emerald-700',
    badgeClass: 'bg-emerald-100 text-emerald-700',
  },
  {
    key: 'drafts',
    label: 'Borradores',
    value: draftFollowUps.value.length,
    icon: '…',
    help: 'Seguimientos empezados pero pendientes de cerrar.',
    cardClass: 'border-[#E8D8F6] bg-[#FBF7FF]',
    labelClass: 'text-[#7A2EA6]',
    badgeClass: 'bg-[#F1E9FB] text-[#7A2EA6]',
  },
  {
    key: 'missing',
    label: 'Sin iniciar',
    value: missingFollowUps.value.length,
    icon: '!',
    help: 'Reservas activas que aún no tienen informe diario.',
    cardClass: 'border-[#F6D6E7] bg-[#FFF8FC]',
    labelClass: 'text-[#C2257A]',
    badgeClass: 'bg-[#FCE7F3] text-[#BE185D]',
  },
])

function buildReservationDetailLink(reservation) {
  return {
    name: 'staff-reservation-detail',
    params: {
      id: reservation.id,
    },
  }
}

function buildFollowUpLink(reservation) {
  return {
    name: 'staff-followups',
    query: {
      reservation: reservation.id,
      date: todayKey,
    },
  }
}

function isReservationVisibleToday(reservation) {
  if (!reservation || reservation.status === 'cancelled') return false
  return isDateBetween(todayKey, reservation.start_at, reservation.end_at)
}

function isFollowUpService(reservation) {
  const category = reservation.service?.category
  const bookingMode = reservation.service?.booking_mode
  const serviceName = String(reservation.service_name || reservation.service?.name || '').toLowerCase()

  return (
    category === 'daycare' ||
    category === 'boarding' ||
    bookingMode === 'date_range' ||
    serviceName.includes('guardería') ||
    serviceName.includes('hotel') ||
    serviceName.includes('alojamiento') ||
    serviceName.includes('adaptación')
  )
}

function shouldRequireResource(reservation) {
  return isFollowUpService(reservation)
}

function getTodayReport(reservation) {
  return getReportForDate(reservation, todayKey)
}

function getReportForDate(reservation, dateKey) {
  if (!Array.isArray(reservation.daily_reports)) return null
  return reservation.daily_reports.find((report) => normalizeDateKey(report.report_date) === dateKey) || null
}

function isReportCompleted(report) {
  return ['completed', 'published'].includes(String(report?.status || '').toLowerCase())
}

function getFollowUpStateLabel(report) {
  if (!report) return 'Sin iniciar'
  if (isReportCompleted(report)) return 'Completado'
  return 'Borrador pendiente'
}

function isDateBetween(dateKey, startValue, endValue) {
  const start = normalizeDateKey(startValue)
  const end = normalizeDateKey(endValue || startValue)

  if (!start) return false
  if (!end) return dateKey === start

  return dateKey >= start && dateKey <= end
}

function isTodayOrFuture(value) {
  return normalizeDateKey(value) >= todayKey
}

function getServiceName(reservation) {
  return reservation?.service_name || reservation?.service?.name || 'Servicio'
}

function getStatusLabel(status) {
  const labels = {
    pending: 'Pendiente',
    confirmed: 'Confirmada',
    completed: 'Finalizada',
    cancelled: 'Cancelada',
  }

  return labels[status] || 'Sin estado'
}

function getStatusClass(status) {
  const classes = {
    pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
    confirmed: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
    completed: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
    cancelled: 'bg-red-50 text-red-600 ring-1 ring-red-200',
  }

  return classes[status] || 'bg-slate-100 text-slate-600 ring-1 ring-slate-200'
}

function getInitial(value) {
  return String(value || 'M').charAt(0).toUpperCase()
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
  return new Intl.DateTimeFormat('es-ES', options).format(new Date(dateValue))
}

function formatTime(value) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}
</script>

<style scoped>
.font-ladralab-brush {
  font-family: 'Caveat Brush', 'Brush Script MT', cursive;
  font-weight: 700;
}
</style>