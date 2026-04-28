<template>
  <section>
    <!-- Toasts fijos -->
    <div class="pointer-events-none fixed right-6 top-6 z-[70] flex w-full max-w-md flex-col gap-3">
      <div
        v-if="loadError"
        class="pointer-events-auto flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-lg"
      >
        <span class="mt-0.5 text-base">⚠️</span>
        <p>{{ loadError }}</p>
      </div>
    </div>

    <div class="mx-auto max-w-7xl space-y-6">
      <template v-if="isLoading">
        <section
          class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#5A208E] via-[#7A2EA6] to-[#E02890] text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
        >
          <div class="flex min-h-[386px] flex-col justify-between p-5 sm:p-6 lg:p-7">
            <div class="animate-pulse">
              <div class="h-12 w-72 rounded bg-white/20"></div>
              <div class="mt-4 h-5 w-full max-w-2xl rounded bg-white/15"></div>
            </div>

            <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div class="h-[168px] rounded-[24px] bg-white/15"></div>
              <div class="h-[168px] rounded-[24px] bg-white/15"></div>
              <div class="h-[168px] rounded-[24px] bg-white/15"></div>
              <div class="h-[168px] rounded-[24px] bg-white/15"></div>
            </div>
          </div>
        </section>

        <section class="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_360px]">
          <div class="h-[310px] rounded-[28px] border border-[#E8E1F1] bg-white shadow-sm"></div>
          <div class="h-[310px] rounded-[28px] border border-[#E8E1F1] bg-white shadow-sm"></div>
        </section>

        <section class="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_360px]">
          <div class="h-[320px] rounded-[28px] border border-[#E8E1F1] bg-white shadow-sm"></div>
          <div class="h-[320px] rounded-[28px] border border-[#E8E1F1] bg-white shadow-sm"></div>
        </section>
      </template>

      <template v-else>
        <!-- CABECERA -->
        <header
          class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#5A208E] via-[#7A2EA6] to-[#E02890] text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
        >
          <div class="flex min-h-[386px] flex-col justify-between p-5 sm:p-6 lg:p-7">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div class="min-w-0 max-w-4xl">
                <h1 class="mt-2 font-ladralab-brush text-5xl leading-none tracking-tight sm:text-6xl">
                  Hola, {{ firstName }}
                </h1>

                <p class="mt-4 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                  Consulta de un vistazo tus mascotas, tu próxima reserva y los accesos más útiles de tu cuenta.
                </p>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
                <RouterLink
                  :to="{ name: 'my-pets' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Mis mascotas
                </RouterLink>

                <RouterLink
                  :to="{ name: 'my-reservations' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Mis reservas
                </RouterLink>

                <RouterLink
                  :to="{ name: 'my-reservations-new' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:bg-[#F8F2FF]"
                >
                  Nueva reserva
                </RouterLink>

                <RouterLink
                  :to="{ name: 'my-followups' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Mis seguimientos
                </RouterLink>
              </div>
            </div>

            <div class="mt-6 grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <article
                v-for="card in heroCards"
                :key="card.label"
                class="flex h-full min-h-[168px] flex-col rounded-[24px] border border-white/16 bg-white/12 p-4 backdrop-blur-sm"
              >
                <div class="flex items-start justify-between gap-4">
                  <div class="min-w-0">
                    <p class="text-sm font-medium text-white/85">{{ card.label }}</p>
                    <p class="mt-2 text-4xl font-bold leading-none text-white">{{ card.value }}</p>
                  </div>

                  <div
                    class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-bold shadow-sm"
                    :class="card.iconClass"
                  >
                    {{ card.icon }}
                  </div>
                </div>

                <p class="mt-4 text-sm leading-7 text-white/82">
                  {{ card.help }}
                </p>
              </article>
            </div>
          </div>
        </header>

        <!-- BLOQUE 1 -->
        <section class="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_360px] xl:items-stretch">
          <article class="flex h-full flex-col rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h2 class="text-lg font-bold tracking-tight text-slate-900">Tu próxima estancia</h2>
                <p class="mt-1 text-sm text-slate-500">
                  Aquí tienes lo siguiente previsto para una de tus mascotas.
                </p>
              </div>

              <span class="inline-flex rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#5A208E]">
                Resumen rápido
              </span>
            </div>

            <div
              v-if="nextReservation"
              class="mt-5 rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-5"
            >
              <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div class="flex min-w-0 items-start gap-4">
                  <div
                    class="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#EAE9EF] to-[#D7CBE7] text-lg font-bold text-[#514980]"
                  >
                    <img
                      v-if="nextReservation.pet?.photo_path"
                      :src="nextReservation.pet.photo_path"
                      :alt="nextReservation.pet.name"
                      class="h-full w-full object-cover"
                    />
                    <span v-else>{{ (nextReservation.pet?.name || 'M').charAt(0) }}</span>
                  </div>

                  <div class="min-w-0">
                    <div class="flex flex-wrap items-center gap-2">
                      <h3 class="truncate text-lg font-bold text-slate-900">
                        {{ nextReservation.pet?.name || 'Mascota' }}
                      </h3>
                      <span
                        class="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100"
                      >
                        {{ reservationStatusLabel(nextReservation.status) }}
                      </span>
                    </div>

                    <p class="mt-1 text-sm text-slate-500">
                      {{ nextReservation.service_name || 'Servicio' }}
                    </p>
                  </div>
                </div>

                <div class="flex flex-wrap gap-3">
                  <RouterLink
                    v-if="nextReservation.pet?.id"
                    :to="{ name: 'my-pet-detail', params: { id: nextReservation.pet.id } }"
                    class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#E4D6F3] bg-white px-5 text-sm font-semibold text-[#5A208E] transition hover:bg-[#FAF5FF]"
                  >
                    Ver ficha
                  </RouterLink>

                  <RouterLink
                    :to="{ name: 'my-reservations' }"
                    class="inline-flex h-11 items-center justify-center rounded-2xl bg-[#5A208E] px-5 text-sm font-semibold text-white transition hover:bg-[#4B1A77]"
                  >
                    Ver reservas
                  </RouterLink>
                </div>
              </div>

              <div class="mt-5 grid gap-3 sm:grid-cols-3">
                <div class="rounded-2xl bg-white p-4 ring-1 ring-[#F0E8F7]">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Fecha</p>
                  <p class="mt-1 text-sm font-semibold text-slate-800">
                    {{ formatDate(nextReservation.start_at) }}
                  </p>
                </div>

                <div class="rounded-2xl bg-white p-4 ring-1 ring-[#F0E8F7]">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Detalle</p>
                  <p class="mt-1 text-sm font-semibold text-slate-800">
                    {{ reservationDetailLabel(nextReservation) }}
                  </p>
                </div>

                <div class="rounded-2xl bg-white p-4 ring-1 ring-[#F0E8F7]">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Tipo</p>
                  <p class="mt-1 text-sm font-semibold text-slate-800">
                    {{ bookingModeLabel(getReservationBookingMode(nextReservation)) }}
                  </p>
                </div>
              </div>
            </div>

            <div
              v-else
              class="mt-5 flex flex-1 flex-col items-center justify-center rounded-[24px] border border-dashed border-[#DCCFEA] bg-[#FCFBFE] px-6 py-10 text-center"
            >
              <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5EFFB] text-xl font-bold text-[#5A208E]">
                🐾
              </div>
              <h3 class="mt-4 text-lg font-bold text-slate-900">Todavía no hay una próxima estancia</h3>
              <p class="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Cuando prepares una nueva reserva, la verás aquí para tenerla siempre a mano.
              </p>

              <RouterLink
                :to="{ name: 'my-reservations-new' }"
                class="mt-6 inline-flex h-11 items-center justify-center rounded-2xl bg-[#5A208E] px-5 text-sm font-semibold text-white transition hover:bg-[#4B1A77]"
              >
                Crear una reserva
              </RouterLink>
            </div>
          </article>

          <article class="flex h-full flex-col rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
            <h2 class="text-lg font-bold tracking-tight text-slate-900">Acciones útiles</h2>
            <p class="mt-1 text-sm text-slate-500">
              Lo más importante para seguir avanzando rápido.
            </p>

            <div class="mt-6 flex flex-1 flex-col gap-3">
              <RouterLink
                :to="{ name: 'my-followups' }"
                class="inline-flex h-12 items-center justify-center rounded-2xl bg-[#5A208E] px-4 text-sm font-semibold text-white transition hover:bg-[#4B1A77]"
              >
                Ver mis seguimientos
              </RouterLink>

              <RouterLink
                :to="{ name: 'my-pets' }"
                class="inline-flex h-12 items-center justify-center rounded-2xl border border-[#E4D6F3] bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:bg-[#FAF5FF]"
              >
                Gestionar mis mascotas
              </RouterLink>

              <RouterLink
                :to="{ name: 'my-reservations' }"
                class="inline-flex h-12 items-center justify-center rounded-2xl border border-[#E4D6F3] bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:bg-[#FAF5FF]"
              >
                Ver mis reservas
              </RouterLink>

              <RouterLink
                :to="{ name: 'my-reservations-new' }"
                class="inline-flex h-12 items-center justify-center rounded-2xl bg-[#5A208E] px-4 text-sm font-semibold text-white transition hover:bg-[#4B1A77]"
              >
                Hacer una reserva
              </RouterLink>
            </div>
          </article>
        </section>

        <!-- BLOQUE 2 -->
        <section class="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_360px] xl:items-stretch">
          <article class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h2 class="text-lg font-bold tracking-tight text-slate-900">Tus mascotas</h2>
                <p class="mt-1 text-sm text-slate-500">
                  Accede rápido a sus fichas y revisa si tienen una próxima estancia.
                </p>
              </div>

              <RouterLink
                :to="{ name: 'my-pets' }"
                class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#E4D6F3] bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:bg-[#FAF5FF]"
              >
                Ver todas
              </RouterLink>
            </div>

            <div class="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <article
                v-for="pet in petsPreview"
                :key="pet.id"
                class="rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4"
              >
                <div class="flex items-start gap-3">
                  <div
                    class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#EAE9EF] to-[#D7CBE7] text-base font-bold text-[#514980]"
                  >
                    <img
                      v-if="pet.photo_path"
                      :src="pet.photo_path"
                      :alt="pet.name"
                      class="h-full w-full object-cover"
                    />
                    <span v-else>{{ pet.name.charAt(0) }}</span>
                  </div>

                  <div class="min-w-0">
                    <h3 class="truncate text-base font-bold text-slate-900">{{ pet.name }}</h3>
                    <p class="mt-1 text-sm text-slate-500">
                      {{ pet.breed || 'Mascota registrada' }}
                    </p>
                  </div>
                </div>

                <div class="mt-4 rounded-2xl bg-white p-4 ring-1 ring-[#F0E8F7]">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Próxima estancia</p>
                  <p class="mt-1 text-sm font-semibold text-slate-800">
                    {{ pet.nextReservationLabel }}
                  </p>
                </div>

                <RouterLink
                  :to="{ name: 'my-pet-detail', params: { id: pet.id } }"
                  class="mt-4 inline-flex h-11 w-full items-center justify-center rounded-2xl border border-[#E4D6F3] bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:bg-[#FAF5FF]"
                >
                  Ver ficha
                </RouterLink>
              </article>
            </div>
          </article>

          <article class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h2 class="text-lg font-bold tracking-tight text-slate-900">Seguimientos recientes</h2>
                <p class="mt-1 text-sm text-slate-500">
                  Últimos informes publicados por el equipo para tus mascotas.
                </p>
              </div>

              <RouterLink
                :to="{ name: 'my-followups' }"
                class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#E4D6F3] bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:bg-[#FAF5FF]"
              >
                Ver todos
              </RouterLink>
            </div>

            <div v-if="recentReports.length" class="mt-5 space-y-3">
              <article
                v-for="report in recentReports"
                :key="report.id || `${report.reservation_id}-${report.report_date}`"
                class="rounded-2xl bg-[#FCFBFE] p-4 ring-1 ring-[#F0E8F7]"
              >
                <div class="flex items-start gap-3">
                  <div
                    class="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#EAE9EF] to-[#D7CBE7] text-sm font-bold text-[#514980]"
                  >
                    <img
                      v-if="report.pet?.photo_path || report.pet?.photo_preview"
                      :src="report.pet.photo_path || report.pet.photo_preview"
                      :alt="report.pet.name"
                      class="h-full w-full object-cover"
                    />
                    <span v-else>{{ (report.pet?.name || 'M').charAt(0) }}</span>
                  </div>

                  <div class="min-w-0 flex-1">
                    <div class="flex flex-wrap items-center gap-2">
                      <h3 class="truncate text-sm font-bold text-slate-900">
                        {{ report.pet?.name || 'Mascota' }}
                      </h3>
                      <span class="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                        Publicado
                      </span>
                    </div>

                    <p class="mt-1 text-sm font-semibold text-[#6A27A4]">
                      {{ report.service_name || 'Seguimiento diario' }}
                    </p>

                    <p class="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                      {{ formatCompactDate(report.report_date) }}
                    </p>
                  </div>
                </div>

                <p class="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                  {{ report.summary || 'Seguimiento publicado por el equipo.' }}
                </p>

                <div v-if="report.media?.length" class="mt-3 flex gap-2">
                  <img
                    v-for="image in report.media.slice(0, 2)"
                    :key="image.id || image.file_path || image.url"
                    :src="image.file_path || image.url"
                    :alt="image.name || 'Imagen del seguimiento'"
                    class="h-16 w-16 rounded-2xl object-cover"
                  />
                </div>

                <RouterLink
                  :to="buildReportLink(report)"
                  class="mt-4 inline-flex h-10 items-center justify-center rounded-2xl bg-[#5A208E] px-4 text-sm font-semibold text-white transition hover:bg-[#4B1A77]"
                >
                  Ver seguimiento
                </RouterLink>
              </article>
            </div>

            <div
              v-else
              class="mt-5 rounded-[24px] border border-dashed border-[#DCCFEA] bg-[#FCFBFE] px-6 py-10 text-center"
            >
              <p class="text-sm font-semibold text-slate-700">Aún no hay seguimientos publicados</p>
              <p class="mt-2 text-sm leading-6 text-slate-500">
                Cuando el equipo cierre un informe diario, aparecerá aquí para que puedas revisarlo.
              </p>
            </div>
          </article>
        </section>
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { getMyPets } from '@/services/petsService'
import { getMyReservations } from '@/services/reservationsService'
import { getReadableErrorMessage } from '@/utils/errorMessages'

const authStore = useAuthStore()

const dashboardMessages = {
  errors: {
    load: 'No hemos podido preparar tu panel por ahora.',
  },
}

const isLoading = ref(true)
const loadError = ref('')

const pets = ref([])
const reservations = ref([])

onMounted(() => {
  loadDashboard()
})

async function loadDashboard() {
  isLoading.value = true
  loadError.value = ''

  try {
    const [petsData, reservationsData] = await Promise.all([
      getMyPets(),
      getMyReservations(),
    ])

    pets.value = Array.isArray(petsData) ? petsData : []
    reservations.value = Array.isArray(reservationsData) ? reservationsData : []
  } catch (error) {
    console.error(error)
    loadError.value = getReadableErrorMessage(
      error,
      dashboardMessages.errors.load,
    )
  } finally {
    isLoading.value = false
  }
}

function getStoredUser() {
  try {
    const possibleKeys = ['ladralab_auth_user', 'auth_user', 'user']

    for (const key of possibleKeys) {
      const raw = localStorage.getItem(key)
      if (!raw) continue

      const parsed = JSON.parse(raw)
      if (parsed?.id) return parsed
    }
  } catch {
    return null
  }

  return null
}

const currentUser = computed(() => {
  return authStore?.user || authStore?.currentUser || getStoredUser() || {}
})

const firstName = computed(() => {
  const name = currentUser.value?.name || 'Cliente'
  return name.split(' ')[0]
})

const enrichedReservations = computed(() => {
  return reservations.value.map((reservation) => {
    const pet =
      reservation.pet ||
      pets.value.find((item) => item.id === reservation.pet_id) ||
      null

    return {
      ...reservation,
      pet,
    }
  })
})

function reservationTiming(reservation) {
  if (!reservation?.start_at) return 'idle'

  const now = Date.now()
  const start = new Date(reservation.start_at).getTime()
  const end = reservation.end_at ? new Date(reservation.end_at).getTime() : start

  if (start <= now && end >= now) return 'today'
  if (start > now) return 'upcoming'
  return 'past'
}

const upcomingReservations = computed(() => {
  return [...enrichedReservations.value]
    .filter((reservation) => {
      return ['pending', 'confirmed'].includes(reservation.status) && reservationTiming(reservation) !== 'past'
    })
    .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime())
})

const nextReservation = computed(() => {
  return upcomingReservations.value[0] || null
})

const heroCards = computed(() => [
  {
    label: 'Mascotas registradas',
    value: pets.value.length,
    help: 'Acceso rápido a sus fichas.',
    icon: '01',
    iconClass: 'bg-white/20 text-white',
  },
  {
    label: 'Próximas reservas',
    value: upcomingReservations.value.length,
    help: 'Servicios ya previstos.',
    icon: '02',
    iconClass: 'bg-sky-100 text-sky-700',
  },
  {
    label: 'Hoy en el centro',
    value: enrichedReservations.value.filter((reservation) => reservationTiming(reservation) === 'today').length,
    help: 'Estancias activas hoy.',
    icon: '03',
    iconClass: 'bg-emerald-100 text-emerald-700',
  },
  {
    label: 'Seguimientos publicados',
    value: visibleReports.value.length,
    help: 'Informes diarios disponibles.',
    icon: '04',
    iconClass: 'bg-pink-100 text-pink-700',
  },
])

const petsPreview = computed(() => {
  return pets.value
    .map((pet) => {
      const petUpcoming = [...enrichedReservations.value]
        .filter((reservation) => reservation.pet?.id === pet.id && reservationTiming(reservation) !== 'past')
        .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime())[0]

      return {
        ...pet,
        nextReservationLabel: petUpcoming
          ? `${formatDate(petUpcoming.start_at)}`
          : 'Sin estancia próxima',
      }
    })
    .slice(0, 3)
})

const recentReservations = computed(() => {
  return [...enrichedReservations.value]
    .sort((a, b) => new Date(b.created_at || b.start_at).getTime() - new Date(a.created_at || a.start_at).getTime())
    .slice(0, 3)
})

const visibleReports = computed(() => {
  return enrichedReservations.value
    .flatMap((reservation) => {
      return getReservationReports(reservation)
        .filter(isVisibleForClient)
        .map((report) => ({
          ...report,
          reservation,
          reservation_id: report.reservation_id || reservation.id,
          pet_id: report.pet_id || reservation.pet?.id || reservation.pet_id,
          pet: reservation.pet,
          service_name: report.service_name || reservation.service_name || reservation.service?.name || 'Seguimiento diario',
          report_date: normalizeDateKey(report.report_date || report.published_at || report.completed_at || reservation.start_at),
          media: normalizeReportMedia(report),
        }))
    })
    .sort((a, b) => dateTimeValue(b.report_date) - dateTimeValue(a.report_date))
})

const recentReports = computed(() => {
  return visibleReports.value.slice(0, 3)
})

function reservationStatusLabel(status) {
  const labels = {
    pending: 'Pendiente',
    confirmed: 'Confirmada',
    completed: 'Finalizada',
    cancelled: 'Cancelada',
  }

  return labels[status] || status || 'Reserva'
}

function reservationStatusBadge(status) {
  const classes = {
    pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
    confirmed: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
    completed: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
    cancelled: 'bg-rose-50 text-rose-700 ring-1 ring-rose-100',
  }

  return classes[status] || 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
}

function inferBookingMode(reservation) {
  if (!reservation?.start_at || !reservation?.end_at) return 'single_day'

  const start = new Date(reservation.start_at)
  const end = new Date(reservation.end_at)

  const sameDay =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate()

  const diffMinutes = Math.round((end.getTime() - start.getTime()) / (1000 * 60))

  if (!sameDay) return 'date_range'
  if (diffMinutes > 0 && diffMinutes <= 12 * 60) return 'time_slot'
  return 'single_day'
}

function getReservationBookingMode(reservation) {
  return reservation?.service?.booking_mode || inferBookingMode(reservation)
}

function bookingModeLabel(mode) {
  const labels = {
    date_range: 'Estancia',
    single_day: 'Día',
    time_slot: 'Cita',
  }

  return labels[mode] || 'Reserva'
}

function reservationDetailLabel(reservation) {
  const mode = getReservationBookingMode(reservation)

  if (mode === 'date_range') {
    return `Hasta ${formatDate(reservation.end_at)}`
  }

  if (mode === 'time_slot') {
    return `${formatOnlyTime(reservation.start_at)} - ${formatOnlyTime(reservation.end_at)}`
  }

  return reservation.end_at
    ? `${formatOnlyTime(reservation.start_at)} - ${formatOnlyTime(reservation.end_at)}`
    : 'Sin detalle horario'
}

function getReservationReports(reservation) {
  const possibleReports =
    reservation?.daily_reports ||
    reservation?.dailyReports ||
    reservation?.reports ||
    []

  return Array.isArray(possibleReports) ? possibleReports : []
}

function isVisibleForClient(report) {
  const status = String(report?.status || '').toLowerCase()

  if (status === 'draft') return false
  if (status === 'published' || status === 'completed') return true

  return Boolean(report?.published_at || report?.completed_at)
}

function normalizeReportMedia(report) {
  const media = report?.media || report?.images || report?.photos || []
  return Array.isArray(media) ? media : []
}

function buildReportLink(report) {
  return {
    name: 'my-followups',
    query: {
      report: report.id,
    },
  }
}

function normalizeDateKey(value) {
  if (!value) return ''
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  return date.toISOString().slice(0, 10)
}

function dateTimeValue(value) {
  if (!value) return 0

  const time = new Date(value).getTime()
  return Number.isNaN(time) ? 0 : time
}

function formatCompactDate(value) {
  if (!value) return 'Sin fecha'

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
    .format(new Date(value))
    .replace('.', '')
    .toUpperCase()
}

function formatDate(dateString) {
  if (!dateString) return 'Sin fecha'

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString))
}

function formatOnlyTime(dateString) {
  if (!dateString) return 'Sin hora'

  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString))
}
</script>

<style scoped>
.font-ladralab-brush {
  font-family: "Caveat Brush", "Brush Script MT", "Segoe Script", cursive;
  font-weight: 700;
}
</style>