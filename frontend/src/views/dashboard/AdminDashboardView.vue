<template>
  <section class="relative">
    <div class="mx-auto max-w-7xl space-y-6">
      <header
        class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#4B167D] via-[#7426A8] to-[#E02890] text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
      >
        <div class="flex min-h-[382px] flex-col p-5 sm:p-6 lg:p-7">
          <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div class="min-w-0 max-w-4xl">
              <h1 class="font-ladralab-brush text-5xl leading-none tracking-tight sm:text-6xl">
                Hola, admin
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

            <div class="mt-6 space-y-3">
              <article
                v-for="reservation in latestReservations"
                :key="reservation.id"
                class="rounded-[22px] border border-[#E8E1F1] bg-white p-4 transition hover:border-[#D7C6EA] hover:bg-[#FCFBFE]"
              >
                <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div class="flex min-w-0 items-start gap-4">
                    <div class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#F2E9FA] text-lg font-bold text-[#6627A3]">
                      <img
                        v-if="reservation.pet?.photo_path"
                        :src="reservation.pet.photo_path"
                        :alt="reservation.pet.name"
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
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { reservationsMock } from '@/mocks/reservationsMock'
import { petsMock } from '@/mocks/petsMock'
import { resourcesMock } from '@/mocks/resourcesMock'

const today = new Date()
const todayKey = toInputDate(today)
const todayLabel = formatDate(today, {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

const adminUsersMock = [
  { id: 1, name: 'Yana Chenko', email: 'yana@ladralab.test', role: 'admin', status: 'active' },
  { id: 2, name: 'Victoria Martín', email: 'victoria@ladralab.test', role: 'admin', status: 'active' },
  { id: 3, name: 'Nora Pérez', email: 'nora@ladralab.test', role: 'staff', status: 'active' },
  { id: 4, name: 'Diego Ramos', email: 'diego@ladralab.test', role: 'staff', status: 'active' },
  { id: 5, name: 'Marta Suárez', email: 'marta@ladralab.test', role: 'staff', status: 'inactive' },
  { id: 6, name: 'Claudia Vega', email: 'claudia@example.com', role: 'cliente', status: 'active' },
  { id: 7, name: 'Sergio Medina', email: 'sergio@example.com', role: 'cliente', status: 'active' },
  { id: 8, name: 'Lucía Castro', email: 'lucia@example.com', role: 'cliente', status: 'active' },
]

const reservations = computed(() => reservationsMock || [])
const pets = computed(() => petsMock || [])
const resources = computed(() => resourcesMock || [])

const todayReservations = computed(() =>
  reservations.value.filter((reservation) => normalizeDateKey(reservation.start_at) === todayKey),
)

const activeReservations = computed(() =>
  reservations.value.filter((reservation) => ['pending', 'confirmed'].includes(reservation.status)),
)

const unconfirmedReservations = computed(() =>
  reservations.value.filter((reservation) => reservation.status === 'pending'),
)

const unassignedResources = computed(() =>
  reservations.value.filter((reservation) => ['pending', 'confirmed'].includes(reservation.status) && !reservation.resource_id && !reservation.resource_name),
)

const followUpReservations = computed(() =>
  reservations.value.filter((reservation) => isFollowUpService(reservation)),
)

const pendingFollowUps = computed(() =>
  followUpReservations.value.filter((reservation) => getReportStatus(reservation) !== 'published'),
)

const latestReservations = computed(() =>
  [...reservations.value]
    .sort((a, b) => new Date(b.start_at) - new Date(a.start_at))
    .slice(0, 5),
)

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
    help: 'Informes diarios sin publicar o aún en revisión.',
    icon: '✓',
    iconClass: 'bg-[#FFF3D7] text-[#9A6200]',
    to: { name: 'staff-followups', query: { status: 'pending' } },
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
    to: { name: 'staff-followups', query: { status: 'pending' } },
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

const activePetsCount = computed(() => {
  const ids = new Set(activeReservations.value.map((reservation) => reservation.pet_id || reservation.pet?.id))
  return ids.size || pets.value.length
})

const activeUsersCount = computed(() => adminUsersMock.filter((user) => user.status === 'active').length)
const inactiveUsersCount = computed(() => adminUsersMock.filter((user) => user.status !== 'active').length)

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
    value: followUpReservations.value.filter((item) => getReportStatus(item) === 'published').length,
    help: 'Visibles para tutores.',
    icon: '✓',
    borderClass: 'border-emerald-200',
    badgeClass: 'bg-emerald-50 text-emerald-700',
  },
  {
    key: 'draft',
    label: 'Borradores',
    value: followUpReservations.value.filter((item) => getReportStatus(item) === 'draft').length,
    help: 'Guardados sin publicar.',
    icon: '✎',
    borderClass: 'border-amber-200',
    badgeClass: 'bg-amber-50 text-amber-700',
  },
  {
    key: 'pending',
    label: 'Sin iniciar',
    value: followUpReservations.value.filter((item) => getReportStatus(item) === 'pending').length,
    help: 'Todavía sin resumen.',
    icon: '…',
    borderClass: 'border-purple-200',
    badgeClass: 'bg-[#F1E9FB] text-[#6627A3]',
  },
])

const roleCards = computed(() => {
  const roles = ['admin', 'staff', 'cliente']

  return roles.map((role) => ({
    key: role,
    label: getRoleLabel(role),
    note: role === 'admin' ? 'Gestión total' : role === 'staff' ? 'Operativa diaria' : 'Tutores',
    value: adminUsersMock.filter((user) => user.role === role).length,
  }))
})

const resourceStatusCards = computed(() => {
  const total = resources.value.length || 1
  const active = resources.value.filter((item) => ['available', 'active'].includes(item.status)).length
  const cleaning = resources.value.filter((item) => item.status === 'cleaning').length
  const unavailable = resources.value.filter((item) => ['unavailable', 'maintenance'].includes(item.status)).length

  return [
    {
      key: 'active',
      label: 'Disponibles',
      value: active,
      width: `${Math.max(8, (active / total) * 100)}%`,
      badgeClass: 'bg-emerald-50 text-emerald-700',
      barClass: 'bg-emerald-400',
    },
    {
      key: 'cleaning',
      label: 'En limpieza',
      value: cleaning,
      width: `${Math.max(8, (cleaning / total) * 100)}%`,
      badgeClass: 'bg-amber-50 text-amber-700',
      barClass: 'bg-amber-400',
    },
    {
      key: 'unavailable',
      label: 'No disponibles',
      value: unavailable,
      width: `${Math.max(8, (unavailable / total) * 100)}%`,
      badgeClass: 'bg-red-50 text-red-600',
      barClass: 'bg-red-400',
    },
  ]
})

function isFollowUpService(reservation) {
  const serviceName = String(reservation.service_name || reservation.service?.name || '').toLowerCase()
  return serviceName.includes('hotel') || serviceName.includes('guardería') || serviceName.includes('guarderia') || serviceName.includes('estancia')
}

function getReportStatus(reservation) {
  const report = reservation.daily_report || reservation.dailyReport || reservation.follow_up || reservation.followUp
  const status = report?.status || reservation.follow_up_status || reservation.followUpStatus

  if (['published', 'completed'].includes(status)) return 'published'
  if (status === 'draft') return 'draft'
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
    name: 'staff-followups',
    query: {
      reservation: reservation.id,
      date: normalizeDateKey(reservation.start_at),
    },
  }
}

function getRoleLabel(role) {
  const labels = {
    admin: 'Administración',
    staff: 'Staff',
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
  return String(value).slice(0, 10)
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
</script>

<style scoped>
.font-ladralab-brush {
  font-family: 'Caveat Brush', 'Brush Script MT', 'Segoe Script', cursive;
  font-weight: 700;
}
</style>
