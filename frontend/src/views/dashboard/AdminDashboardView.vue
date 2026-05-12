<template>
  <section class="relative">
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
          class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#4B167D] via-[#7426A8] to-[#E02890] p-6 text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
        >
          <div class="animate-pulse">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div class="min-w-0 max-w-4xl">
                <div class="h-12 w-72 rounded bg-white/20"></div>
                <div class="mt-5 h-5 w-full max-w-2xl rounded bg-white/15"></div>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
                <div class="h-11 rounded-2xl bg-white/20"></div>
                <div class="h-11 rounded-2xl bg-white/20"></div>
                <div class="h-11 rounded-2xl bg-white/20"></div>
                <div class="h-11 rounded-2xl bg-white/20"></div>
              </div>
            </div>

            <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div v-for="n in 4" :key="n" class="h-[152px] rounded-[24px] bg-white/15"></div>
            </div>
          </div>
        </section>
      </template>

      <template v-else>
        <header
          class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#4B167D] via-[#7426A8] to-[#E02890] text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
        >
          <div class="flex min-h-[382px] flex-col p-5 sm:p-6 lg:p-7">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div class="min-w-0 max-w-4xl">
                <h1 class="font-ladralab-brush text-5xl leading-none tracking-tight sm:text-6xl">
                  Hola, {{ adminName }}
                </h1>

                <p class="mt-4 max-w-2xl text-sm font-semibold leading-7 text-white/90 sm:text-base">
                  Vista general del centro para {{ todayLabel }}.
                </p>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
                <RouterLink
                  :to="{ name: 'staff-reservations' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Reservas
                </RouterLink>

                <RouterLink
                  :to="{ name: 'staff-followups' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Seguimientos
                </RouterLink>

                <RouterLink
                  :to="{ name: 'admin-users' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:bg-[#F8F2FF]"
                >
                  Usuarios
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

        <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="alert in priorityCards"
            :key="alert.key"
            class="flex h-full min-h-[222px] flex-col rounded-[26px] border bg-white p-5 shadow-sm"
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

        <div class="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(340px,0.85fr)]">
          <main class="space-y-6">
            <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 class="text-2xl font-bold text-slate-950">Resumen de reservas</h2>
                  <p class="mt-2 text-sm leading-6 text-slate-500">
                    Estado general de las reservas activas y próximas.
                  </p>
                </div>

                <RouterLink
                  :to="{ name: 'staff-reservations' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                >
                  Ver reservas
                </RouterLink>
              </div>

              <div class="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <article
                  v-for="item in reservationStatusCards"
                  :key="item.key"
                  class="rounded-[22px] border border-[#E8E1F1] bg-[#FCFBFE] p-4"
                >
                  <p class="text-sm font-semibold text-slate-500">{{ item.label }}</p>
                  <p class="mt-2 text-3xl font-bold text-slate-950">{{ item.value }}</p>
                  <p class="mt-2 text-xs font-semibold" :class="item.className">{{ item.note }}</p>
                </article>
              </div>

              <div v-if="latestReservations.length" class="mt-6 space-y-3">
                <article
                  v-for="reservation in latestReservations"
                  :key="reservation.id"
                  class="rounded-[22px] border border-[#E8E1F1] bg-white p-4 transition hover:border-[#D7C6EA] hover:bg-[#FCFBFE]"
                >
                  <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div class="flex min-w-0 items-start gap-4">
                      <div class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#F2E9FA] text-lg font-bold text-[#6627A3]">
                        <img
                          v-if="getPetImage(reservation.pet)"
                          :src="getPetImage(reservation.pet)"
                          :alt="reservation.pet?.name || reservation.pet_name || 'Mascota'"
                          class="h-full w-full object-cover"
                          @error="hideBrokenImage"
                        />
                        <span v-else>{{ getInitial(reservation.pet?.name || reservation.pet_name) }}</span>
                      </div>

                      <div class="min-w-0">
                        <div class="flex flex-wrap items-center gap-2">
                          <h3 class="font-bold text-slate-950">
                            {{ reservation.pet?.name || reservation.pet_name || 'Mascota' }}
                          </h3>
                          <span
                            class="rounded-full px-3 py-1 text-xs font-semibold"
                            :class="getStatusClass(reservation.status)"
                          >
                            {{ getStatusLabel(reservation.status) }}
                          </span>
                        </div>

                        <p class="mt-1 text-sm font-semibold text-[#6627A3]">
                          {{ reservation.service_name || reservation.service?.name || 'Servicio' }}
                        </p>
                        <p class="mt-1 text-sm text-slate-500">
                          {{ formatShortDate(reservation.start_at) }} · {{ formatTime(reservation.start_at) }}
                          <span v-if="reservation.resource_name"> · {{ reservation.resource_name }}</span>
                          <span v-else> · Recurso pendiente</span>
                        </p>
                      </div>
                    </div>

                    <div class="flex flex-wrap gap-2 lg:justify-end">
                      <RouterLink
                        :to="buildReservationLink(reservation)"
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
              </div>

              <div v-else class="mt-6 rounded-[22px] border border-dashed border-[#D9CEE8] bg-[#FCFBFE] px-4 py-8 text-center text-sm text-slate-500">
                Todavía no hay reservas registradas.
              </div>
            </section>

            <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 class="text-2xl font-bold text-slate-950">Seguimientos recientes</h2>
                  <p class="mt-2 text-sm leading-6 text-slate-500">
                    Informes que conviene revisar antes de cerrar la jornada.
                  </p>
                </div>

                <RouterLink
                  :to="{ name: 'staff-followups' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl bg-[#6627A3] px-4 text-sm font-semibold text-white transition hover:bg-[#57208D]"
                >
                  Ir a seguimientos
                </RouterLink>
              </div>

              <div class="mt-6 grid gap-4 lg:grid-cols-3">
                <article
                  v-for="item in followUpSummaryCards"
                  :key="item.key"
                  class="rounded-[24px] border bg-[#FCFBFE] p-5"
                  :class="item.borderClass"
                >
                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <p class="text-sm font-semibold text-slate-500">{{ item.label }}</p>
                      <p class="mt-2 text-3xl font-bold text-slate-950">{{ item.value }}</p>
                    </div>
                    <span
                      class="flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-bold"
                      :class="item.badgeClass"
                    >
                      {{ item.icon }}
                    </span>
                  </div>
                  <p class="mt-4 text-sm leading-6 text-slate-500">{{ item.help }}</p>
                </article>
              </div>
            </section>
          </main>

          <aside class="space-y-6">
            <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h2 class="text-2xl font-bold text-slate-950">Usuarios</h2>
                  <p class="mt-2 text-sm leading-6 text-slate-500">
                    Accesos del equipo y clientes registrados.
                  </p>
                </div>
                <RouterLink
                  :to="{ name: 'admin-users' }"
                  class="inline-flex h-10 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-xs font-semibold text-[#5A208E] transition hover:bg-[#F6F1FB]"
                >
                  Gestionar
                </RouterLink>
              </div>

              <div class="mt-6 space-y-3">
                <article
                  v-for="role in roleCards"
                  :key="role.key"
                  class="flex items-center justify-between gap-4 rounded-[20px] border border-[#E8E1F1] bg-[#FCFBFE] p-4"
                >
                  <div>
                    <p class="font-bold text-slate-950">{{ role.label }}</p>
                    <p class="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                      {{ role.note }}
                    </p>
                  </div>
                  <span class="text-2xl font-bold text-[#6627A3]">{{ role.value }}</span>
                </article>
              </div>
            </section>

            <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h2 class="text-2xl font-bold text-slate-950">Recursos</h2>
                  <p class="mt-2 text-sm leading-6 text-slate-500">
                    Estado rápido de espacios y zonas del centro.
                  </p>
                </div>
                <RouterLink
                  :to="{ name: 'staff-resources' }"
                  class="inline-flex h-10 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-xs font-semibold text-[#5A208E] transition hover:bg-[#F6F1FB]"
                >
                  Ver
                </RouterLink>
              </div>

              <div class="mt-6 space-y-3">
                <div
                  v-for="item in resourceStatusCards"
                  :key="item.key"
                  class="rounded-[20px] border border-[#E8E1F1] bg-[#FCFBFE] p-4"
                >
                  <div class="flex items-center justify-between gap-4">
                    <p class="font-bold text-slate-950">{{ item.label }}</p>
                    <span class="rounded-full px-3 py-1 text-xs font-bold" :class="item.badgeClass">
                      {{ item.value }}
                    </span>
                  </div>
                  <div class="mt-3 h-2 overflow-hidden rounded-full bg-[#EDE7F5]">
                    <div class="h-full rounded-full" :class="item.barClass" :style="{ width: item.width }"></div>
                  </div>
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
import {
  apiRequest,
  normalizeCollectionResponse,
  normalizeSingleResponse,
} from '@/services/apiClient'
import { getStaffReservations } from '@/services/staffReservationsService'
import { getResources } from '@/services/resourcesService'
import { getReservationDailyLogs } from '@/services/dailyLogsService'
import { getReadableErrorMessage } from '@/utils/errorMessages'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

const today = new Date()
const todayKey = toInputDate(today)
const todayLabel = formatDate(today, {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

const isLoading = ref(true)
const loadError = ref('')

const currentUser = ref(null)
const users = ref([])
const reservations = ref([])
const pets = ref([])
const resources = ref([])

onMounted(() => {
  loadDashboard()
})

async function loadDashboard() {
  isLoading.value = true
  loadError.value = ''

  try {
    const [usersData, reservationsData, petsData, resourcesData] = await Promise.all([
      getAdminUsers(),
      getStaffReservations(),
      getStaffPets(),
      getResources(),
    ])

    users.value = Array.isArray(usersData) ? usersData.map(normalizeUser) : []
    pets.value = Array.isArray(petsData) ? petsData.map(normalizeStaffPet) : []
    resources.value = Array.isArray(resourcesData) ? resourcesData.map(normalizeResource) : []

    const normalizedReservations = Array.isArray(reservationsData)
      ? reservationsData.map(normalizeReservationForView)
      : []

    reservations.value = await attachDailyReportsToReservations(normalizedReservations)

    try {
      currentUser.value = await getCurrentUser()
    } catch (error) {
      console.warn('No se pudo cargar el usuario autenticado para el dashboard.', error)
      currentUser.value = null
    }
  } catch (error) {
    console.error(error)
    loadError.value = getReadableErrorMessage(
      error,
      'No hemos podido cargar el dashboard de administración por ahora.',
    )
  } finally {
    isLoading.value = false
  }
}

async function getCurrentUser() {
  const data = await apiRequest('/api/auth/me', {
    method: 'GET',
  })

  return normalizeUser(normalizeSingleResponse(data))
}

async function getAdminUsers() {
  const data = await apiRequest('/api/admin/users', {
    method: 'GET',
  })

  return normalizeCollectionResponse(data)
}

async function getStaffPets() {
  const data = await apiRequest('/api/staff/pets', {
    method: 'GET',
  })

  return normalizeCollectionResponse(data)
}

async function attachDailyReportsToReservations(list = []) {
  const mapped = await Promise.all(
    list.map(async (reservation) => {
      if (!isFollowUpService(reservation)) {
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

function normalizeUser(user = {}) {
  const role = normalizeRole(user.role)
  const isActive = Boolean(user.is_active ?? user.status === 'active')

  return {
    id: user.id,
    name: user.name ?? '',
    email: user.email ?? '',
    phone: user.phone ?? '',
    role,
    status: isActive ? 'active' : 'inactive',
    is_active: isActive,
    last_login_at: user.last_login_at ?? null,
    created_at: user.created_at ?? null,
    updated_at: user.updated_at ?? null,
  }
}

function normalizeRole(role) {
  if (role === 'cliente') return 'client'
  return role || 'client'
}

function normalizeStaffPet(pet = {}) {
  return {
    id: pet.id,
    owner_user_id: pet.owner_user_id ?? pet.owner?.id ?? null,
    owner: pet.owner ?? null,
    name: pet.name ?? '',
    breed: pet.breed ?? '',
    size: pet.size ?? '',
    care_notes: pet.care_notes ?? '',
    photo_path: pet.photo_path ?? '',
    photo_url: pet.photo_url ?? '',
    photo_preview: pet.photo_preview ?? '',
  }
}

function normalizeResource(resource = {}) {
  return {
    id: resource.id,
    name: resource.name ?? '',
    type: resource.type ?? 'other',
    zone: resource.zone ?? 'support',
    size_group: resource.size_group ?? 'all',
    capacity: Number(resource.capacity ?? 1),
    status: resource.status ?? 'active',
  }
}

function normalizeReservationForView(reservation = {}) {
  const pet = reservation.pet || pets.value.find((item) => Number(item.id) === Number(reservation.pet_id)) || null
  const service = reservation.service || null
  const resource = reservation.resource || resources.value.find((item) => Number(item.id) === Number(reservation.resource_id)) || null
  const client = reservation.client || pet?.owner || null

  return {
    ...reservation,
    id: reservation.id,
    client_user_id: reservation.client_user_id ?? client?.id ?? pet?.owner_user_id ?? null,
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
    status: reservation.status ?? 'pending',
    start_at: reservation.start_at ?? null,
    end_at: reservation.end_at ?? reservation.start_at ?? null,
    daily_reports: Array.isArray(reservation.daily_reports)
      ? reservation.daily_reports
      : Array.isArray(reservation.dailyReports)
        ? reservation.dailyReports
        : [],
  }
}

const adminName = computed(() => {
  const name = currentUser.value?.name || 'admin'
  return String(name).split(' ')[0] || 'admin'
})

const todayReservations = computed(() =>
  reservations.value.filter((reservation) => reservationTouchesDate(reservation, todayKey)),
)

const activeReservations = computed(() =>
  reservations.value.filter((reservation) => ['pending', 'confirmed'].includes(reservation.status)),
)

const unconfirmedReservations = computed(() =>
  reservations.value.filter((reservation) => reservation.status === 'pending'),
)

const unassignedResources = computed(() =>
  reservations.value.filter((reservation) => {
    return (
      ['pending', 'confirmed'].includes(reservation.status) &&
      reservationNeedsResource(reservation) &&
      !reservation.resource_id &&
      !reservation.resource_name
    )
  }),
)

const followUpReservations = computed(() =>
  reservations.value.filter((reservation) => isFollowUpService(reservation)),
)

const pendingFollowUps = computed(() =>
  followUpReservations.value.filter((reservation) => getTodayReportStatus(reservation) !== 'published'),
)

const latestReservations = computed(() =>
  [...reservations.value]
    .sort((a, b) => new Date(b.start_at).getTime() - new Date(a.start_at).getTime())
    .slice(0, 5),
)

const activePetsCount = computed(() => {
  const ids = new Set(activeReservations.value.map((reservation) => reservation.pet_id || reservation.pet?.id).filter(Boolean))
  return ids.size
})

const activeUsersCount = computed(() => users.value.filter((user) => user.status === 'active').length)
const inactiveUsersCount = computed(() => users.value.filter((user) => user.status !== 'active').length)

const summaryCards = computed(() => [
  {
    key: 'today',
    label: 'Reservas hoy',
    value: todayReservations.value.length,
    help: 'Entradas, salidas y estancias previstas para la jornada.',
    icon: '📅',
    iconClass: 'bg-white text-[#5A208E]',
    to: { name: 'staff-reservations', query: { date: todayKey, view: 'day' } },
  },
  {
    key: 'active-pets',
    label: 'Mascotas activas',
    value: activePetsCount.value,
    help: 'Mascotas con reserva activa o próxima en el centro.',
    icon: '🐾',
    iconClass: 'bg-[#FCE7F3] text-[#B31470]',
    to: { name: 'staff-pets' },
  },
  {
    key: 'users',
    label: 'Usuarios activos',
    value: activeUsersCount.value,
    help: 'Equipo y clientes con acceso habilitado.',
    icon: '👥',
    iconClass: 'bg-[#EDE7F6] text-[#5A208E]',
    to: { name: 'admin-users' },
  },
  {
    key: 'followups',
    label: 'Seguimientos pendientes',
    value: pendingFollowUps.value.length,
    help: 'Informes diarios sin publicar o aún sin iniciar.',
    icon: '✓',
    iconClass: 'bg-[#FFF3D7] text-[#9A6200]',
    to: { name: 'staff-followups', query: { status: 'pending', date: todayKey } },
  },
])

const priorityCards = computed(() => [
  {
    key: 'unconfirmed',
    kicker: 'Reservas',
    title: 'Sin confirmar',
    value: unconfirmedReservations.value.length,
    description: 'Solicitudes que todavía necesitan revisión del equipo.',
    action: 'Revisar',
    to: { name: 'staff-reservations', query: { status: 'pending' } },
    borderClass: 'border-amber-200',
    kickerClass: 'text-amber-600',
    badgeClass: 'bg-amber-50 text-amber-700',
    buttonClass: 'bg-amber-50 text-amber-700 hover:bg-amber-100',
  },
  {
    key: 'resources',
    kicker: 'Recursos',
    title: 'Pendientes de asignar',
    value: unassignedResources.value.length,
    description: 'Reservas activas que todavía no tienen espacio asignado.',
    action: 'Asignar',
    to: { name: 'staff-reservations', query: { resource: 'pending' } },
    borderClass: 'border-purple-200',
    kickerClass: 'text-[#6627A3]',
    badgeClass: 'bg-[#F1E9FB] text-[#6627A3]',
    buttonClass: 'bg-[#6627A3] text-white hover:bg-[#57208D]',
  },
  {
    key: 'followups',
    kicker: 'Seguimiento',
    title: 'Sin publicar',
    value: pendingFollowUps.value.length,
    description: 'Informes diarios que conviene completar antes de cerrar el día.',
    action: 'Abrir',
    to: { name: 'staff-followups', query: { status: 'pending', date: todayKey } },
    borderClass: 'border-pink-200',
    kickerClass: 'text-[#C21875]',
    badgeClass: 'bg-pink-50 text-[#C21875]',
    buttonClass: 'bg-pink-50 text-[#B31470] hover:bg-pink-100',
  },
  {
    key: 'inactive-users',
    kicker: 'Acceso',
    title: 'Usuarios desactivados',
    value: inactiveUsersCount.value,
    description: 'Cuentas bloqueadas o pendientes de revisar si vuelven a necesitar acceso.',
    action: 'Gestionar',
    to: { name: 'admin-users', query: { status: 'inactive' } },
    borderClass: 'border-slate-200',
    kickerClass: 'text-slate-500',
    badgeClass: 'bg-slate-100 text-slate-600',
    buttonClass: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
  },
])

const reservationStatusCards = computed(() => [
  {
    key: 'pending',
    label: 'Pendientes',
    value: reservations.value.filter((item) => item.status === 'pending').length,
    note: 'Por revisar',
    className: 'text-amber-600',
  },
  {
    key: 'confirmed',
    label: 'Confirmadas',
    value: reservations.value.filter((item) => item.status === 'confirmed').length,
    note: 'Planificadas',
    className: 'text-emerald-600',
  },
  {
    key: 'completed',
    label: 'Finalizadas',
    value: reservations.value.filter((item) => item.status === 'completed').length,
    note: 'Histórico',
    className: 'text-slate-500',
  },
  {
    key: 'cancelled',
    label: 'Canceladas',
    value: reservations.value.filter((item) => item.status === 'cancelled').length,
    note: 'Sin actividad',
    className: 'text-red-500',
  },
])

const followUpSummaryCards = computed(() => [
  {
    key: 'published',
    label: 'Publicados',
    value: followUpReservations.value.filter((item) => getTodayReportStatus(item) === 'published').length,
    help: 'Visibles para tutores.',
    icon: '✓',
    borderClass: 'border-emerald-200',
    badgeClass: 'bg-emerald-50 text-emerald-700',
  },
  {
    key: 'draft',
    label: 'Borradores',
    value: followUpReservations.value.filter((item) => getTodayReportStatus(item) === 'draft').length,
    help: 'Guardados sin publicar.',
    icon: '✎',
    borderClass: 'border-amber-200',
    badgeClass: 'bg-amber-50 text-amber-700',
  },
  {
    key: 'pending',
    label: 'Sin iniciar',
    value: followUpReservations.value.filter((item) => getTodayReportStatus(item) === 'pending').length,
    help: 'Todavía sin resumen.',
    icon: '…',
    borderClass: 'border-purple-200',
    badgeClass: 'bg-[#F1E9FB] text-[#6627A3]',
  },
])

const roleCards = computed(() => {
  const roles = ['admin', 'staff', 'client']

  return roles.map((role) => ({
    key: role,
    label: getRoleLabel(role),
    note: role === 'admin' ? 'Gestión total' : role === 'staff' ? 'Operativa diaria' : 'Tutores',
    value: users.value.filter((user) => user.role === role).length,
  }))
})

const resourceStatusCards = computed(() => {
  const total = resources.value.length || 1
  const active = resources.value.filter((item) => item.status === 'active').length
  const cleaning = resources.value.filter((item) => item.status === 'cleaning').length
  const disabled = resources.value.filter((item) => item.status === 'disabled').length

  return [
    {
      key: 'active',
      label: 'Disponibles',
      value: active,
      width: `${Math.max(active ? 8 : 0, (active / total) * 100)}%`,
      badgeClass: 'bg-emerald-50 text-emerald-700',
      barClass: 'bg-emerald-400',
    },
    {
      key: 'cleaning',
      label: 'En limpieza',
      value: cleaning,
      width: `${Math.max(cleaning ? 8 : 0, (cleaning / total) * 100)}%`,
      badgeClass: 'bg-amber-50 text-amber-700',
      barClass: 'bg-amber-400',
    },
    {
      key: 'disabled',
      label: 'Deshabilitados',
      value: disabled,
      width: `${Math.max(disabled ? 8 : 0, (disabled / total) * 100)}%`,
      badgeClass: 'bg-red-50 text-red-600',
      barClass: 'bg-red-400',
    },
  ]
})

function reservationTouchesDate(reservation, dateKey) {
  const dayStart = new Date(`${dateKey}T00:00:00`)
  const dayEnd = new Date(`${dateKey}T23:59:59`)
  const start = new Date(reservation.start_at)
  const end = new Date(reservation.end_at || reservation.start_at)

  return start <= dayEnd && end >= dayStart
}

function reservationNeedsResource(reservation) {
  const serviceKey = getServiceKey(reservation)
  return serviceKey === 'hotel' || serviceKey === 'daycare'
}

function isFollowUpService(reservation) {
  const serviceKey = getServiceKey(reservation)
  return serviceKey === 'hotel' || serviceKey === 'daycare'
}

function getServiceKey(reservation) {
  const bookingMode = reservation.service?.booking_mode
  const category = reservation.service?.category
  const serviceName = String(reservation.service_name || reservation.service?.name || '').toLowerCase()

  if (category === 'boarding' || bookingMode === 'date_range') return 'hotel'
  if (category === 'daycare' || bookingMode === 'single_day') return 'daycare'

  if (serviceName.includes('hotel') || serviceName.includes('alojamiento') || serviceName.includes('estancia')) return 'hotel'
  if (serviceName.includes('guardería') || serviceName.includes('guarderia') || serviceName.includes('adaptación')) return 'daycare'

  return 'other'
}

function getTodayReportStatus(reservation) {
  const report =
    (reservation.daily_reports || []).find((item) => normalizeDateKey(item.report_date) === todayKey) ||
    reservation.daily_report ||
    reservation.dailyReport ||
    reservation.follow_up ||
    reservation.followUp ||
    null

  const status = String(report?.status || reservation.follow_up_status || reservation.followUpStatus || '').toLowerCase()

  if (['published', 'completed'].includes(status) || report?.published_at || report?.completed_at) return 'published'
  if (status === 'draft' || report?.is_draft) return 'draft'
  return 'pending'
}

function buildReservationLink(reservation) {
  return {
    name: 'staff-reservation-detail',
    params: { id: reservation.id },
  }
}

function buildFollowUpLink(reservation) {
  return {
    path: `/staff/seguimientos/${reservation.id}`,
    query: {
      date: normalizeDateKey(reservation.start_at) || todayKey,
    },
  }
}

function getRoleLabel(role) {
  const labels = {
    admin: 'Administración',
    staff: 'Staff',
    client: 'Clientes',
    cliente: 'Clientes',
  }

  return labels[role] || role
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
  if (!dateValue) return 'Sin fecha'
  return new Intl.DateTimeFormat('es-ES', options).format(new Date(dateValue))
}

function formatShortDate(value) {
  if (!value) return 'Sin fecha'
  return formatDate(value, { day: 'numeric', month: 'short' })
}

function formatTime(value) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
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
</script>

<style scoped>
.font-ladralab-brush {
  font-family: 'Caveat Brush', 'Brush Script MT', 'Segoe Script', cursive;
  font-weight: 700;
}
</style>
