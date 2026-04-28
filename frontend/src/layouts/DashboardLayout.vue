<template>
  <div class="min-h-screen bg-[#F5F1FA]">
    <div class="mx-auto max-w-[1700px] px-5 py-6 sm:px-8">
      <div class="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)] xl:items-start">
        <aside class="space-y-5 xl:sticky xl:top-6">
          <!-- Tarjeta superior -->
          <section
            class="overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-b from-[#6A27A4] via-[#7A2EA6] to-[#E02890] p-5 text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
          >
            <div class="flex items-start gap-4">
              <div
                class="flex h-16 w-16 shrink-0 items-center justify-center rounded-[22px] bg-white/14 text-[2rem] font-bold text-white/95"
              >
                {{ userInitial }}
              </div>

              <div class="min-w-0">
                <p class="text-xs font-semibold uppercase tracking-[0.28em] text-white/75">
                  LadraLab
                </p>
                <h2 class="mt-1 truncate text-[1.05rem] font-bold leading-tight sm:text-[1.15rem]">
                  Hola, {{ userFirstName }}
                </h2>
                <p class="mt-2 truncate text-sm text-white/85">
                  {{ userEmail }}
                </p>
              </div>
            </div>

            <div class="mt-5 grid grid-cols-2 gap-3">
              <article
                v-for="metric in roleProfile.metrics"
                :key="metric.label"
                class="rounded-[22px] border border-white/12 bg-white/10 px-4 py-3 backdrop-blur-sm"
              >
                <p class="text-[11px] font-semibold uppercase tracking-wide text-white/70">
                  {{ metric.label }}
                </p>
                <p class="mt-2 text-[2rem] font-bold leading-none text-white">
                  {{ metric.value }}
                </p>
              </article>
            </div>

            <div class="mt-4 rounded-[24px] border border-white/12 bg-white/10 px-4 py-4 backdrop-blur-sm">
              <p class="text-[11px] font-semibold uppercase tracking-wide text-white/70">
                {{ roleProfile.bannerLabel }}
              </p>
              <p class="mt-2 text-[1.15rem] font-bold leading-tight text-white">
                {{ roleProfile.bannerTitle }}
              </p>
            </div>

            <RouterLink
              :to="roleProfile.primaryAction.to"
              class="mt-5 inline-flex h-12 w-full items-center justify-center rounded-[22px] bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:bg-[#FAF5FF]"
            >
              {{ roleProfile.primaryAction.label }}
            </RouterLink>
          </section>

          <!-- Navegación -->
          <section class="rounded-[28px] border border-[#E8E1F1] bg-white px-4 py-3.5 shadow-sm">
            <p class="px-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#9AA7C0]">
              Navegación
            </p>

            <div class="mt-3 space-y-2">
              <template v-for="item in navItems" :key="item.label">
                <RouterLink
                  v-if="!item.disabled"
                  :to="item.to"
                  class="group flex items-center justify-between gap-3 rounded-[22px] border px-3 py-2.5 transition"
                  :class="
                    isActiveItem(item)
                      ? 'border-[#F0BDD9] bg-[#FCEEF7]'
                      : 'border-transparent bg-white hover:border-[#EFE5F8] hover:bg-[#FCFAFE]'
                  "
                >
                  <div class="flex min-w-0 items-center gap-3">
                    <div
                      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                      :class="
                        isActiveItem(item)
                          ? 'bg-white text-[#C03A8C]'
                          : 'bg-[#F6F1FB] text-[#8F7AAF]'
                      "
                    >
                      {{ item.index }}
                    </div>

                    <div class="min-w-0">
                      <p
                        class="truncate text-[13px] font-semibold leading-tight"
                        :class="isActiveItem(item) ? 'text-[#C03A8C]' : 'text-[#49556F]'"
                      >
                        {{ item.label }}
                      </p>
                      <p class="truncate text-[11px] leading-tight text-[#8FA0BC]">
                        {{ item.description }}
                      </p>
                    </div>
                  </div>

                  <div
                    class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm transition"
                    :class="
                      isActiveItem(item)
                        ? 'bg-white text-[#E02890]'
                        : 'bg-[#F5F8FC] text-[#9AA7C0] group-hover:bg-[#F2ECFB] group-hover:text-[#7C56B2]'
                    "
                  >
                    →
                  </div>
                </RouterLink>

                <div
                  v-else
                  class="flex items-center justify-between gap-3 rounded-[22px] border border-dashed border-[#E8E1F1] bg-[#FCFBFE] px-3 py-2.5 opacity-70"
                >
                  <div class="flex min-w-0 items-center gap-3">
                    <div
                      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F6F1FB] text-xs font-bold text-[#8F7AAF]"
                    >
                      {{ item.index }}
                    </div>

                    <div class="min-w-0">
                      <p class="truncate text-[13px] font-semibold leading-tight text-[#49556F]">
                        {{ item.label }}
                      </p>
                      <p class="truncate text-[11px] leading-tight text-[#8FA0BC]">
                        {{ item.description }}
                      </p>
                    </div>
                  </div>

                  <span class="rounded-full bg-[#F3ECFB] px-2.5 py-0.5 text-[10px] font-semibold text-[#7A59B0]">
                    pronto
                  </span>
                </div>
              </template>
            </div>
          </section>

          <!-- Logout -->
          <button
            type="button"
            @click="handleLogout"
            class="inline-flex h-[52px] w-full cursor-pointer items-center justify-center rounded-[22px] bg-gradient-to-r from-[#6A27A4] to-[#E02890] px-4 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
          >
            Cerrar sesión
          </button>
        </aside>

        <main class="min-w-0">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const currentRole = computed(() => {
  return (
    authStore.user?.role ||
    authStore.role ||
    authStore.currentRole ||
    (Array.isArray(route.meta.roles) ? route.meta.roles[0] : null) ||
    'cliente'
  )
})

const userName = computed(() => {
  return authStore.user?.name || authStore.user?.full_name || 'Usuario'
})

const userFirstName = computed(() => {
  return userName.value.split(' ')[0] || 'Usuario'
})

const userEmail = computed(() => {
  return authStore.user?.email || 'usuario@ladralab.test'
})

const userInitial = computed(() => {
  return userFirstName.value?.charAt(0)?.toUpperCase() || 'U'
})

const roleProfiles = {
  cliente: {
    metrics: [
      { label: 'Mascotas', value: 4 },
      { label: 'Reservas', value: 5 },
    ],
    bannerLabel: 'Próxima estancia',
    bannerTitle: '22 abr · Guardería de día',
    primaryAction: {
      label: 'Ver seguimientos',
      to: { name: 'my-followups' },
    },
  },
  staff: {
    metrics: [
      { label: 'Pendientes', value: 6 },
      { label: 'Activas hoy', value: 3 },
    ],
    bannerLabel: 'Centro hoy',
    bannerTitle: '3 entradas previstas',
    primaryAction: {
      label: 'Ir a reservas',
      to: { name: 'staff-reservations' },
    },
  },
  admin: {
    metrics: [
      { label: 'Staff', value: 5 },
      { label: 'Pendientes', value: 6 },
    ],
    bannerLabel: 'Centro activo',
    bannerTitle: 'Supervisión general',
    primaryAction: {
      label: 'Gestionar usuarios',
      to: { name: 'admin-users' },
    },
  },
}

const roleProfile = computed(() => {
  return roleProfiles[currentRole.value] || roleProfiles.cliente
})

const navByRole = {
  cliente: [
    {
      index: '01',
      label: 'Dashboard',
      description: 'Resumen general',
      to: { name: 'client-dashboard' },
      matchNames: ['client-dashboard'],
    },
    {
      index: '02',
      label: 'Mi perfil',
      description: 'Datos de tu cuenta',
      to: { name: 'my-profile' },
      matchNames: ['my-profile'],
    },
    {
      index: '03',
      label: 'Mis mascotas',
      description: 'Fichas y estancias',
      to: { name: 'my-pets' },
      matchNames: ['my-pets', 'my-pet-detail', 'my-pet-edit'],
    },
    {
      index: '04',
      label: 'Mis reservas',
      description: 'Solicitudes y próximas',
      to: { name: 'my-reservations' },
      matchNames: ['my-reservations', 'my-reservations-new'],
    },
    {
      index: '05',
      label: 'Mis seguimientos',
      description: 'Informes publicados',
      to: { name: 'my-followups' },
      matchNames: ['my-followups'],
    },
  ],
  staff: [
    {
      index: '01',
      label: 'Dashboard',
      description: 'Centro hoy',
      to: { name: 'staff-dashboard' },
      matchNames: ['staff-dashboard'],
    },
    {
      index: '02',
      label: 'Reservas',
      description: 'Gestión interna',
      to: { name: 'staff-reservations' },
      matchNames: ['staff-reservations', 'staff-reservation-detail'],
    },
    {
      index: '03',
      label: 'Mascotas',
      description: 'Fichas internas',
      to: { name: 'staff-pets' },
      matchNames: ['staff-pets', 'staff-pet-detail'],
    },
    {
      index: '04',
      label: 'Recursos',
      description: 'Espacios y estado',
      to: { name: 'staff-resources' },
      matchNames: ['staff-resources'],
    },
    {
      index: '05',
      label: 'Seguimiento diario',
      description: 'Checklist, notas y fotos',
      to: { name: 'staff-followups' },
      matchNames: ['staff-followups'],
    },
  ],
  admin: [
    {
      index: '01',
      label: 'Dashboard',
      description: 'Resumen global',
      to: { name: 'admin-dashboard' },
      matchNames: ['admin-dashboard'],
    },
    {
      index: '02',
      label: 'Reservas',
      description: 'Gestión interna',
      to: { name: 'staff-reservations' },
      matchNames: ['staff-reservations', 'staff-reservation-detail'],
    },
    {
      index: '03',
      label: 'Mascotas',
      description: 'Fichas internas',
      to: { name: 'staff-pets' },
      matchNames: ['staff-pets', 'staff-pet-detail'],
    },
    {
      index: '04',
      label: 'Recursos',
      description: 'Espacios y estado',
      to: { name: 'staff-resources' },
      matchNames: ['staff-resources'],
    },
    {
      index: '05',
      label: 'Usuarios',
      description: 'Roles y acceso',
      to: { name: 'admin-users' },
      matchNames: ['admin-users'],
    },
    {
      index: '06',
      label: 'Seguimiento diario',
      description: 'Checklist, notas y fotos',
      to: { name: 'staff-followups' },
      matchNames: ['staff-followups'],
    },
  ],
}

const navItems = computed(() => {
  return navByRole[currentRole.value] || navByRole.cliente
})

function isActiveItem(item) {
  if (!item.matchNames) return false
  return item.matchNames.includes(route.name)
}

async function handleLogout() {
  try {
    if (typeof authStore.logout === 'function') {
      await authStore.logout()
    }
  } finally {
    router.push({ name: 'login' })
  }
}
</script>