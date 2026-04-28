<template>
  <section class="relative">
    <div class="pointer-events-none fixed right-6 top-6 z-[70] flex w-full max-w-md flex-col gap-3">
      <div
        v-if="successMessage"
        class="pointer-events-auto flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 shadow-lg"
      >
        <span class="mt-0.5 text-base">🐾</span>
        <p>{{ successMessage }}</p>
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
      <template v-if="!selectedUser">
        <section class="rounded-[30px] border border-[#E8E1F1] bg-white p-8 text-center shadow-sm">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-[#9A88B5]">Usuario no encontrado</p>
          <h1 class="mt-3 text-3xl font-bold tracking-tight text-slate-900">No hemos encontrado esta cuenta</h1>
          <p class="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
            Puede que el usuario no exista en los datos actuales o que todavía no se haya cargado correctamente.
          </p>

          <RouterLink
            :to="{ name: 'admin-users' }"
            class="mt-6 inline-flex h-11 items-center justify-center rounded-2xl bg-[#5A208E] px-5 text-sm font-semibold text-white transition hover:bg-[#4B1A77]"
          >
            Volver a usuarios
          </RouterLink>
        </section>
      </template>

      <template v-else>
        <header
          class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#5A208E] via-[#7A2EA6] to-[#E02890] text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
        >
          <div class="flex min-h-[386px] flex-col justify-between p-5 sm:p-6 lg:p-7">
            <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <RouterLink
                :to="{ name: 'admin-users' }"
                class="inline-flex h-11 w-fit items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
              >
                ← Volver a usuarios
              </RouterLink>

              <div class="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
                <RouterLink
                  :to="{ name: 'admin-dashboard' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Dashboard
                </RouterLink>

                <RouterLink
                  :to="{ name: 'admin-users' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:bg-[#F8F2FF]"
                >
                  Usuarios
                </RouterLink>
              </div>
            </div>

            <div class="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)] lg:items-end">
              <div class="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center">
                <div
                  class="flex h-28 w-28 shrink-0 items-center justify-center rounded-[32px] border border-white/20 bg-white/20 text-5xl font-bold shadow-lg backdrop-blur-sm"
                >
                  {{ avatarInitial }}
                </div>

                <div class="min-w-0">
                  <h1 class="font-ladralab-brush text-5xl leading-none tracking-tight sm:text-6xl">
                    {{ selectedUser.name }}
                  </h1>
                  <p class="mt-3 break-all text-base font-semibold text-white/90">
                    {{ selectedUser.email }}
                  </p>
                  <div class="mt-4 flex flex-wrap gap-2">
                    <span
                      class="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold"
                      :class="roleBadgeClass(selectedUser.role)"
                    >
                      {{ formatRole(selectedUser.role) }}
                    </span>
                    <span
                      class="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold"
                      :class="selectedUser.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'"
                    >
                      {{ selectedUser.is_active ? 'Activo' : 'Desactivado' }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <article
                  v-for="card in heroCards"
                  :key="card.label"
                  class="flex min-h-[132px] flex-col rounded-[24px] border border-white/16 bg-white/12 p-4 backdrop-blur-sm"
                >
                  <div class="flex items-start justify-between gap-4">
                    <p class="text-sm font-semibold text-white/82">{{ card.label }}</p>
                    <div
                      class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-bold shadow-sm"
                      :class="card.iconClass"
                    >
                      {{ card.icon }}
                    </div>
                  </div>
                  <p class="mt-3 text-[1.8rem] font-bold leading-none text-white">
                    {{ card.value }}
                  </p>
                  <p class="mt-3 text-sm leading-5 text-white/80">
                    {{ card.help }}
                  </p>
                </article>
              </div>
            </div>
          </div>
        </header>

        <section class="space-y-6">
          <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-stretch">
            <article class="flex h-full flex-col rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 class="text-xl font-bold tracking-tight text-slate-900">Datos de la cuenta</h2>
                  <p class="mt-1 text-sm leading-6 text-slate-500">
                    Edita la información principal del usuario y define su acceso al sistema.
                  </p>
                </div>
                <span class="inline-flex w-fit items-center rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#5A208E]">
                  Gestión interna
                </span>
              </div>

              <form class="mt-6 flex flex-1 flex-col" @submit.prevent="saveUser">
                <div class="grid gap-4 md:grid-cols-2">
                  <label class="block">
                    <span class="mb-2 block text-sm font-semibold text-slate-700">Nombre</span>
                    <input
                      v-model.trim="form.name"
                      type="text"
                      class="h-12 w-full rounded-2xl border border-[#DCCFEA] bg-[#FCFBFE] px-4 text-sm text-slate-900 outline-none transition focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
                      placeholder="Nombre completo"
                    />
                    <p v-if="formErrors.name" class="mt-2 text-xs font-medium text-red-600">
                      {{ formErrors.name }}
                    </p>
                  </label>

                  <label class="block">
                    <span class="mb-2 block text-sm font-semibold text-slate-700">Email</span>
                    <input
                      v-model.trim="form.email"
                      type="email"
                      class="h-12 w-full rounded-2xl border border-[#DCCFEA] bg-[#FCFBFE] px-4 text-sm text-slate-900 outline-none transition focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
                      placeholder="email@ladralab.test"
                    />
                    <p v-if="formErrors.email" class="mt-2 text-xs font-medium text-red-600">
                      {{ formErrors.email }}
                    </p>
                  </label>

                  <label class="block">
                    <span class="mb-2 block text-sm font-semibold text-slate-700">Teléfono</span>
                    <input
                      v-model.trim="form.phone"
                      type="text"
                      class="h-12 w-full rounded-2xl border border-[#DCCFEA] bg-[#FCFBFE] px-4 text-sm text-slate-900 outline-none transition focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
                      placeholder="Teléfono de contacto"
                    />
                  </label>

                  <label class="block">
                    <span class="mb-2 block text-sm font-semibold text-slate-700">Rol</span>
                    <select
                      v-model="form.role"
                      class="h-12 w-full rounded-2xl border border-[#DCCFEA] bg-[#FCFBFE] px-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
                    >
                      <option v-for="role in roleOptions" :key="role.value" :value="role.value">
                        {{ role.label }}
                      </option>
                    </select>
                  </label>
                </div>

                <div class="mt-5 rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4">
                  <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p class="text-sm font-bold text-slate-900">Estado de acceso</p>
                      <p class="mt-1 text-sm leading-6 text-slate-500">
                        Una cuenta desactivada conserva su histórico, pero no podrá iniciar sesión.
                      </p>
                    </div>

                    <label class="inline-flex cursor-pointer items-center gap-3 rounded-2xl border border-[#DCCFEA] bg-white px-4 py-3">
                      <input
                        v-model="form.is_active"
                        type="checkbox"
                        class="h-5 w-5 rounded border-[#CDBBE4] text-[#5A208E] focus:ring-[#5A208E]"
                        :disabled="isCurrentAdmin"
                      />
                      <span class="text-sm font-semibold text-slate-800">
                        {{ form.is_active ? 'Cuenta activa' : 'Cuenta desactivada' }}
                      </span>
                    </label>
                  </div>

                  <p v-if="isCurrentAdmin" class="mt-3 rounded-2xl bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">
                    Esta cuenta corresponde al administrador actual. No puede desactivarse desde aquí.
                  </p>
                </div>

                <div class="mt-5 rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4">
                  <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 class="text-sm font-bold text-slate-900">Actividad de la cuenta</h3>
                      <p class="mt-1 text-sm leading-6 text-slate-500">
                        Información útil para revisar el estado del usuario sin salir de esta pantalla.
                      </p>
                    </div>
                    <span class="inline-flex w-fit items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#5A208E] ring-1 ring-[#EEE7F6]">
                      Solo lectura
                    </span>
                  </div>

                  <div class="mt-4 grid gap-3 md:grid-cols-3">
                    <div
                      v-for="item in accountActivityCards"
                      :key="item.label"
                      class="rounded-2xl border border-[#EEE7F6] bg-white p-4"
                    >
                      <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#9A88B5]">
                        {{ item.label }}
                      </p>
                      <p class="mt-2 text-sm font-bold text-slate-900">
                        {{ item.value }}
                      </p>
                      <p class="mt-1 text-xs leading-5 text-slate-500">
                        {{ item.help }}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="mt-auto flex flex-col-reverse gap-3 pt-6 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    @click="resetForm"
                    class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB] disabled:cursor-not-allowed disabled:opacity-60"
                    :disabled="isSaving"
                  >
                    Restaurar datos
                  </button>

                  <button
                    type="button"
                    @click="toggleActive"
                    class="inline-flex h-11 items-center justify-center rounded-2xl px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
                    :class="form.is_active ? 'bg-red-50 text-red-700 hover:bg-red-100' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'"
                    :disabled="isSaving || isCurrentAdmin"
                  >
                    {{ form.is_active ? 'Desactivar cuenta' : 'Activar cuenta' }}
                  </button>

                  <button
                    type="submit"
                    class="inline-flex h-11 items-center justify-center rounded-2xl bg-[#5A208E] px-5 text-sm font-semibold text-white transition hover:bg-[#4B1A77] disabled:cursor-not-allowed disabled:opacity-60"
                    :disabled="isSaving"
                  >
                    {{ isSaving ? 'Guardando...' : 'Guardar cambios' }}
                  </button>
                </div>
              </form>
            </article>

            <aside class="grid gap-6 xl:h-full xl:grid-rows-2">
              <article class="flex h-full flex-col rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
                <h2 class="text-lg font-bold tracking-tight text-slate-900">Resumen</h2>
                <p class="mt-1 text-sm text-slate-500">Estado actual de la cuenta.</p>

                <div class="mt-5 grid flex-1 gap-3">
                  <div class="rounded-2xl bg-[#FCFBFE] p-4 ring-1 ring-[#F0E8F7]">
                    <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Usuario</p>
                    <p class="mt-1 break-all text-sm font-semibold text-slate-800">{{ selectedUser.email }}</p>
                  </div>

                  <div class="rounded-2xl bg-[#FCFBFE] p-4 ring-1 ring-[#F0E8F7]">
                    <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Rol</p>
                    <p class="mt-1 text-sm font-semibold text-slate-800">{{ formatRole(form.role) }}</p>
                  </div>

                  <div class="rounded-2xl bg-[#FCFBFE] p-4 ring-1 ring-[#F0E8F7]">
                    <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Estado</p>
                    <p class="mt-1 text-sm font-semibold text-slate-800">
                      {{ form.is_active ? 'Puede acceder al sistema' : 'No puede iniciar sesión' }}
                    </p>
                  </div>
                </div>
              </article>

              <article class="flex h-full flex-col rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
                <h2 class="text-lg font-bold tracking-tight text-slate-900">Permisos del rol</h2>
                <p class="mt-1 text-sm leading-6 text-slate-500">
                  {{ roleDescription }}
                </p>

                <ul class="mt-5 grid flex-1 content-start gap-3">
                  <li
                    v-for="permission in rolePermissions"
                    :key="permission"
                    class="flex items-start gap-3 rounded-2xl bg-[#FCFBFE] px-4 py-3 text-sm text-slate-600 ring-1 ring-[#F0E8F7]"
                  >
                    <span class="mt-0.5 text-[#5A208E]">✓</span>
                    <span>{{ permission }}</span>
                  </li>
                </ul>
              </article>
            </aside>
          </div>

          <div class="grid gap-6 xl:grid-cols-2 xl:items-stretch">
            <article class="flex h-full flex-col rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 class="text-xl font-bold tracking-tight text-slate-900">Seguridad</h2>
                  <p class="mt-1 text-sm leading-6 text-slate-500">
                    Acciones útiles para recuperar o proteger el acceso del usuario.
                  </p>
                </div>
                <span class="inline-flex w-fit items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  Acceso
                </span>
              </div>

              <div class="mt-5 grid flex-1 gap-4 lg:grid-cols-2">
                <div class="rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4">
                  <p class="text-sm font-bold text-slate-900">Reinicio de contraseña</p>
                  <p class="mt-2 text-sm leading-6 text-slate-500">
                    Envía al usuario un enlace para recuperar el acceso a su cuenta.
                  </p>
                  <button
                    type="button"
                    @click="sendPasswordReset"
                    class="mt-4 inline-flex h-10 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:bg-[#F6F1FB]"
                  >
                    Enviar recuperación
                  </button>
                </div>

                <div class="rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4">
                  <p class="text-sm font-bold text-slate-900">Último acceso</p>
                  <p class="mt-2 text-sm leading-6 text-slate-500">
                    {{ selectedUser.last_login_at ? `Última entrada registrada el ${selectedUser.last_login_at}.` : 'Todavía no hay accesos registrados.' }}
                  </p>
                  <p class="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Solo lectura
                  </p>
                </div>
              </div>
            </article>

            <article class="flex h-full flex-col rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <h2 class="text-xl font-bold tracking-tight text-slate-900">Información vinculada</h2>
              <p class="mt-1 text-sm leading-6 text-slate-500">
                Resumen rápido de actividad relacionada con esta cuenta.
              </p>

              <div class="mt-5 grid flex-1 gap-4 sm:grid-cols-2">
                <div
                  v-for="item in relatedCards"
                  :key="item.label"
                  class="rounded-[22px] border border-[#EEE7F6] bg-[#FCFBFE] p-4"
                >
                  <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#9A88B5]">
                    {{ item.label }}
                  </p>
                  <p class="mt-3 text-3xl font-bold text-[#5A208E]">{{ item.value }}</p>
                  <p class="mt-2 text-sm leading-5 text-slate-500">{{ item.help }}</p>
                </div>
              </div>
            </article>
          </div>
        </section>
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const currentAdminId = 1
const isSaving = ref(false)
const successMessage = ref('')
const actionError = ref('')

const users = ref([
  {
    id: 1,
    name: 'Sergio Ramos',
    email: 'admin@ladralab.test',
    phone: '600 100 200',
    role: 'admin',
    is_active: true,
    last_login_at: '28 abr, 09:10',
    created_at: '10 abr, 10:00',
    pets_count: 0,
    reservations_count: 18,
    followups_count: 12,
    reports_count: 5,
  },
  {
    id: 2,
    name: 'Marta Suárez',
    email: 'marta.staff@ladralab.test',
    phone: '600 222 333',
    role: 'staff',
    is_active: true,
    last_login_at: '27 abr, 08:20',
    created_at: '12 abr, 11:30',
    pets_count: 0,
    reservations_count: 9,
    followups_count: 18,
    reports_count: 18,
  },
  {
    id: 3,
    name: 'Sara León',
    email: 'sara@ladralab.test',
    phone: '600 333 444',
    role: 'cliente',
    is_active: true,
    last_login_at: '27 abr, 13:08',
    created_at: '16 abr, 09:15',
    pets_count: 2,
    reservations_count: 5,
    followups_count: 3,
    reports_count: 0,
  },
  {
    id: 4,
    name: 'Ana Martín',
    email: 'ana@ladralab.test',
    phone: '600 444 555',
    role: 'cliente',
    is_active: true,
    last_login_at: '28 abr, 09:45',
    created_at: '18 abr, 17:20',
    pets_count: 4,
    reservations_count: 5,
    followups_count: 2,
    reports_count: 0,
  },
  {
    id: 5,
    name: 'Luis Peña',
    email: 'luis.staff@ladralab.test',
    phone: '600 555 666',
    role: 'staff',
    is_active: false,
    last_login_at: '14 mar, 11:30',
    created_at: '01 mar, 08:40',
    pets_count: 0,
    reservations_count: 2,
    followups_count: 8,
    reports_count: 8,
  },
])

const form = reactive({
  name: '',
  email: '',
  phone: '',
  role: 'cliente',
  is_active: true,
})

const formErrors = reactive({
  name: '',
  email: '',
})

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'staff', label: 'Staff' },
  { value: 'cliente', label: 'Cliente' },
]

const selectedUser = computed(() => {
  const id = Number(route.params.id)
  return users.value.find((user) => Number(user.id) === id) || null
})

const isCurrentAdmin = computed(() => Number(selectedUser.value?.id) === currentAdminId)

const avatarInitial = computed(() => (selectedUser.value?.name || 'U').charAt(0).toUpperCase())

const heroCards = computed(() => [
  {
    label: 'Rol actual',
    value: formatRole(selectedUser.value?.role),
    help: 'Nivel de acceso asignado.',
    icon: '01',
    iconClass: 'bg-white/25 text-white',
  },
  {
    label: 'Estado',
    value: selectedUser.value?.is_active ? 'Activo' : 'Inactivo',
    help: selectedUser.value?.is_active ? 'Puede iniciar sesión.' : 'Acceso bloqueado.',
    icon: '02',
    iconClass: 'bg-emerald-100 text-emerald-700',
  },
  {
    label: 'Último acceso',
    value: selectedUser.value?.last_login_at ? 'Registrado' : 'Sin acceso',
    help: selectedUser.value?.last_login_at || 'Sin entradas todavía.',
    icon: '03',
    iconClass: 'bg-amber-50 text-amber-700',
  },
])

const accountActivityCards = computed(() => {
  const user = selectedUser.value

  if (!user) return []

  return [
    {
      label: 'Alta',
      value: user.created_at || 'Sin fecha',
      help: 'Fecha de creación de la cuenta.',
    },
    {
      label: 'Último acceso',
      value: user.last_login_at || 'Sin acceso',
      help: user.last_login_at ? 'Entrada registrada en el sistema.' : 'Todavía no ha iniciado sesión.',
    },
    {
      label: 'Histórico',
      value: user.is_active ? 'Conservado' : 'Bloqueado',
      help: 'Sus datos se mantienen aunque se desactive la cuenta.',
    },
  ]
})

const relatedCards = computed(() => {
  const user = selectedUser.value

  if (!user) return []

  if (form.role === 'cliente') {
    return [
      { label: 'Mascotas', value: user.pets_count ?? 0, help: 'Fichas asociadas.' },
      { label: 'Reservas', value: user.reservations_count ?? 0, help: 'Historial y próximas.' },
      { label: 'Seguimientos', value: user.followups_count ?? 0, help: 'Informes visibles.' },
      { label: 'Accesos', value: user.last_login_at ? 'Sí' : 'No', help: 'Actividad registrada.' },
    ]
  }

  return [
    { label: 'Reservas', value: user.reservations_count ?? 0, help: 'Gestiones vinculadas.' },
    { label: 'Seguimientos', value: user.followups_count ?? 0, help: 'Informes revisados.' },
    { label: 'Informes', value: user.reports_count ?? 0, help: 'Actividad del equipo.' },
    { label: 'Accesos', value: user.last_login_at ? 'Sí' : 'No', help: 'Actividad registrada.' },
  ]
})

const roleDescription = computed(() => {
  const descriptions = {
    admin: 'Puede gestionar usuarios, reservas, mascotas, recursos y revisar la actividad general del centro.',
    staff: 'Puede trabajar con reservas, mascotas, recursos y seguimientos diarios del centro.',
    cliente: 'Puede consultar sus mascotas, reservas y seguimientos publicados por el centro.',
  }

  return descriptions[form.role] || 'Rol pendiente de definir.'
})

const rolePermissions = computed(() => {
  const permissions = {
    admin: ['Gestionar usuarios', 'Revisar reservas del centro', 'Gestionar recursos', 'Consultar seguimientos'],
    staff: ['Consultar reservas asignadas', 'Registrar seguimientos diarios', 'Revisar fichas de mascotas', 'Actualizar recursos operativos'],
    cliente: ['Consultar sus mascotas', 'Crear y revisar reservas', 'Ver seguimientos publicados', 'Actualizar sus datos básicos'],
  }

  return permissions[form.role] || []
})

watch(
  selectedUser,
  (user) => {
    if (!user) return
    applyUserToForm(user)
  },
  { immediate: true },
)

function applyUserToForm(user) {
  form.name = user.name || ''
  form.email = user.email || ''
  form.phone = user.phone || ''
  form.role = user.role || 'cliente'
  form.is_active = user.is_active ?? true
}

function clearMessages() {
  successMessage.value = ''
  actionError.value = ''
}

function resetErrors() {
  formErrors.name = ''
  formErrors.email = ''
}

function validateForm() {
  resetErrors()

  let isValid = true

  if (!form.name.trim()) {
    formErrors.name = 'Indica el nombre del usuario.'
    isValid = false
  }

  if (!form.email.trim()) {
    formErrors.email = 'Indica el email del usuario.'
    isValid = false
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email.trim())) {
      formErrors.email = 'Introduce un email válido.'
      isValid = false
    }
  }

  return isValid
}

function resetForm() {
  clearMessages()
  resetErrors()

  if (selectedUser.value) {
    applyUserToForm(selectedUser.value)
  }
}

async function saveUser() {
  if (!selectedUser.value || !validateForm()) return

  isSaving.value = true
  clearMessages()

  try {
    if (isCurrentAdmin.value && form.is_active === false) {
      throw new Error('No puedes desactivar tu propia cuenta.')
    }

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      role: form.role,
      is_active: form.is_active,
    }

    // TODO backend:
    // await adminUsersService.updateUser(selectedUser.value.id, payload)
    // PATCH /api/admin/users/{user}

    users.value = users.value.map((user) =>
      Number(user.id) === Number(selectedUser.value.id)
        ? { ...user, ...payload }
        : user,
    )

    successMessage.value = 'Los datos del usuario se han guardado correctamente.'
  } catch (error) {
    actionError.value = error?.message || 'No se pudieron guardar los cambios.'
  } finally {
    isSaving.value = false
  }
}

function toggleActive() {
  clearMessages()

  if (isCurrentAdmin.value) {
    actionError.value = 'No puedes desactivar tu propia cuenta.'
    return
  }

  form.is_active = !form.is_active
}

function sendPasswordReset() {
  clearMessages()

  // TODO backend:
  // await adminUsersService.sendPasswordReset(selectedUser.value.id)
  successMessage.value = 'Se ha preparado el envío del enlace de recuperación al usuario.'
}

function formatRole(role) {
  const labels = {
    admin: 'Admin',
    staff: 'Staff',
    cliente: 'Cliente',
    client: 'Cliente',
  }

  return labels[role] || 'Sin rol'
}

function roleBadgeClass(role) {
  const classes = {
    admin: 'bg-purple-100 text-purple-700',
    staff: 'bg-pink-100 text-pink-700',
    cliente: 'bg-sky-100 text-sky-700',
    client: 'bg-sky-100 text-sky-700',
  }

  return classes[role] || 'bg-white/20 text-white'
}
</script>

<style scoped>
.font-ladralab-brush {
  font-family: 'Caveat Brush', 'Brush Script MT', 'Segoe Script', cursive;
  font-weight: 700;
}
</style>
