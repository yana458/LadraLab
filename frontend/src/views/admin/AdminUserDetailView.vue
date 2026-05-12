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
        v-if="loadError || actionError"
        class="pointer-events-auto flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-lg"
      >
        <span class="mt-0.5 text-base">⚠️</span>
        <p>{{ loadError || actionError }}</p>
      </div>
    </div>

    <div class="mx-auto max-w-7xl space-y-6">
      <template v-if="isLoading">
        <section
          class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#5A208E] via-[#7A2EA6] to-[#E02890] p-6 text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
        >
          <div class="animate-pulse">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div class="flex min-w-0 max-w-4xl gap-5">
                <div class="h-28 w-28 rounded-[32px] bg-white/20"></div>
                <div class="min-w-0 flex-1">
                  <div class="h-12 w-72 rounded bg-white/20"></div>
                  <div class="mt-4 h-5 w-80 rounded bg-white/15"></div>
                  <div class="mt-4 h-5 w-full max-w-2xl rounded bg-white/15"></div>
                </div>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
                <div class="h-11 rounded-2xl bg-white/20"></div>
                <div class="h-11 rounded-2xl bg-white/20"></div>
              </div>
            </div>

            <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div v-for="n in 3" :key="n" class="h-[132px] rounded-[24px] bg-white/15"></div>
            </div>
          </div>
        </section>
      </template>

      <template v-else-if="!selectedUser">
        <section class="rounded-[30px] border border-[#E8E1F1] bg-white p-8 text-center shadow-sm">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-[#9A88B5]">Usuario no encontrado</p>
          <h1 class="mt-3 text-3xl font-bold tracking-tight text-slate-900">No hemos encontrado esta cuenta</h1>
          <p class="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
            Puede que el usuario no exista o que no esté disponible en este momento.
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
                    <p v-if="formErrors.phone" class="mt-2 text-xs font-medium text-red-600">
                      {{ formErrors.phone }}
                    </p>
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
                    <p v-if="formErrors.role" class="mt-2 text-xs font-medium text-red-600">
                      {{ formErrors.role }}
                    </p>
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

                  <p v-if="formErrors.is_active" class="mt-3 text-xs font-medium text-red-600">
                    {{ formErrors.is_active }}
                  </p>

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
                    Descartar cambios
                  </button>

                  <button
                    type="button"
                    @click="toggleActive"
                    class="inline-flex h-11 items-center justify-center rounded-2xl px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
                    :class="selectedUser.is_active ? 'bg-red-50 text-red-700 hover:bg-red-100' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'"
                    :disabled="isSaving || isCurrentAdmin"
                  >
                    {{ selectedUser.is_active ? 'Desactivar cuenta' : 'Activar cuenta' }}
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
                    Cambia la contraseña temporal del usuario o revisa su último acceso.
                  </p>
                </div>
                <span class="inline-flex w-fit items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  Acceso
                </span>
              </div>

              <div class="mt-5 grid flex-1 gap-4 lg:grid-cols-2">
                <form
                  class="rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4"
                  @submit.prevent="saveTemporaryPassword"
                >
                  <p class="text-sm font-bold text-slate-900">Cambiar contraseña temporal</p>
                  <p class="mt-2 text-sm leading-6 text-slate-500">
                    Define una contraseña nueva para que el usuario pueda volver a entrar. No se mostrará después de guardarla.
                  </p>

                  <label class="mt-4 block">
                    <span class="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Nueva contraseña</span>
                    <input
                      v-model="passwordForm.password"
                      type="password"
                      autocomplete="new-password"
                      class="h-11 w-full rounded-2xl border border-[#DCCFEA] bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
                      placeholder="Mínimo 8 caracteres"
                    />
                    <p v-if="passwordErrors.password" class="mt-2 text-xs font-medium text-red-600">
                      {{ passwordErrors.password }}
                    </p>
                  </label>

                  <label class="mt-3 block">
                    <span class="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Confirmar contraseña</span>
                    <input
                      v-model="passwordForm.password_confirmation"
                      type="password"
                      autocomplete="new-password"
                      class="h-11 w-full rounded-2xl border border-[#DCCFEA] bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
                      placeholder="Repite la contraseña"
                    />
                    <p v-if="passwordErrors.password_confirmation" class="mt-2 text-xs font-medium text-red-600">
                      {{ passwordErrors.password_confirmation }}
                    </p>
                  </label>

                  <button
                    type="submit"
                    :disabled="isPasswordSaving"
                    class="mt-4 inline-flex h-10 w-full items-center justify-center rounded-2xl bg-[#5A208E] px-4 text-sm font-semibold text-white transition hover:bg-[#4B1A77] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {{ isPasswordSaving ? 'Guardando...' : 'Guardar contraseña' }}
                  </button>
                </form>

                <div class="rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4">
                  <p class="text-sm font-bold text-slate-900">Último acceso</p>
                  <p class="mt-2 text-sm leading-6 text-slate-500">
                    {{ selectedUser.last_login_at ? `Última entrada registrada: ${formatDate(selectedUser.last_login_at)}` : 'Todavía no hay accesos registrados.' }}
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
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  apiRequest,
  normalizeCollectionResponse,
  normalizeSingleResponse,
} from '@/services/apiClient'
import { getStaffReservations } from '@/services/staffReservationsService'
import { getReservationDailyLogs } from '@/services/dailyLogsService'
import { getReadableErrorMessage, getValidationErrors } from '@/utils/errorMessages'

const route = useRoute()

const isLoading = ref(true)
const isSaving = ref(false)
const isPasswordSaving = ref(false)
const successMessage = ref('')
const actionError = ref('')
const loadError = ref('')

const selectedUser = ref(null)
const currentUser = ref(null)
const pets = ref([])
const reservations = ref([])
const reports = ref([])

const form = reactive({
  name: '',
  email: '',
  phone: '',
  role: 'client',
  is_active: true,
})

const passwordForm = reactive({
  password: '',
  password_confirmation: '',
})

const formErrors = reactive({})
const passwordErrors = reactive({})

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'staff', label: 'Staff' },
  { value: 'client', label: 'Cliente' },
]

const userId = computed(() => Number(route.params.id || 0))

onMounted(async () => {
  await loadUserDetail()
})

watch(
  selectedUser,
  (user) => {
    if (!user) return
    applyUserToForm(user)
  },
)

async function loadUserDetail() {
  isLoading.value = true
  loadError.value = ''
  actionError.value = ''
  successMessage.value = ''

  try {
    const [userData, petsData, reservationsData] = await Promise.all([
      getAdminUserById(userId.value),
      getStaffPets(),
      getStaffReservations(),
    ])

    selectedUser.value = userData
    pets.value = Array.isArray(petsData) ? petsData : []
    reservations.value = Array.isArray(reservationsData)
      ? reservationsData.map(normalizeReservationForView)
      : []

    try {
      currentUser.value = await getCurrentUser()
    } catch (error) {
      console.warn('No se pudo cargar el usuario autenticado.', error)
      currentUser.value = null
    }

    reports.value = await loadReportsForUser(userData)
  } catch (error) {
    console.error(error)
    selectedUser.value = null
    loadError.value = getReadableErrorMessage(
      error,
      'No hemos podido cargar el detalle del usuario por ahora.',
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

async function getAdminUserById(id) {
  const data = await apiRequest(`/api/admin/users/${id}`, {
    method: 'GET',
  })

  return normalizeUser(normalizeSingleResponse(data))
}

async function updateAdminUser(id, payload) {
  const data = await apiRequest(`/api/admin/users/${id}`, {
    method: 'PATCH',
    body: payload,
  })

  return normalizeUser(normalizeSingleResponse(data))
}

async function updateAdminUserPassword(id, payload) {
  return apiRequest(`/api/admin/users/${id}/password`, {
    method: 'PATCH',
    body: payload,
  })
}

async function getStaffPets() {
  const data = await apiRequest('/api/staff/pets', {
    method: 'GET',
  })

  return normalizeCollectionResponse(data).map(normalizeStaffPet)
}

async function loadReportsForUser(user) {
  if (!user || user.role !== 'client') return []

  const userReservations = reservations.value.filter((reservation) => {
    return Number(reservation.client_user_id) === Number(user.id)
  })

  const mapped = await Promise.all(
    userReservations.map(async (reservation) => {
      try {
        const reservationReports = await getReservationDailyLogs(reservation.id)

        return Array.isArray(reservationReports)
          ? reservationReports.map((report) => ({
              ...report,
              reservation_id: reservation.id,
              service_name: reservation.service_name,
            }))
          : []
      } catch (error) {
        console.warn(`No se pudieron cargar los seguimientos de la reserva ${reservation.id}`, error)
        return []
      }
    }),
  )

  return mapped.flat()
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
    is_active: isActive,
    status: isActive ? 'active' : 'inactive',
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
  }
}

function normalizeReservationForView(reservation = {}) {
  const pet = reservation.pet || null
  const service = reservation.service || null
  const resource = reservation.resource || null
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
  }
}

const isCurrentAdmin = computed(() => {
  return Boolean(currentUser.value?.id && selectedUser.value?.id && Number(currentUser.value.id) === Number(selectedUser.value.id))
})

const avatarInitial = computed(() => (selectedUser.value?.name || 'U').charAt(0).toUpperCase())

const userPets = computed(() => {
  if (!selectedUser.value) return []
  return pets.value.filter((pet) => Number(pet.owner_user_id) === Number(selectedUser.value.id))
})

const userReservations = computed(() => {
  if (!selectedUser.value) return []
  return reservations.value.filter((reservation) => Number(reservation.client_user_id) === Number(selectedUser.value.id))
})

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
    iconClass: selectedUser.value?.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600',
  },
  {
    label: 'Último acceso',
    value: selectedUser.value?.last_login_at ? 'Registrado' : 'Sin acceso',
    help: selectedUser.value?.last_login_at ? formatDate(selectedUser.value.last_login_at) : 'Sin entradas todavía.',
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
      value: formatDate(user.created_at),
      help: 'Fecha de creación de la cuenta.',
    },
    {
      label: 'Último acceso',
      value: user.last_login_at ? formatDate(user.last_login_at) : 'Sin acceso',
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

  if (user.role === 'client') {
    return [
      { label: 'Mascotas', value: userPets.value.length, help: 'Fichas asociadas como tutor.' },
      { label: 'Reservas', value: userReservations.value.length, help: 'Historial y próximas reservas.' },
      { label: 'Seguimientos', value: reports.value.length, help: 'Informes asociados a sus reservas.' },
      { label: 'Acceso', value: user.last_login_at ? 'Sí' : 'No', help: 'Actividad registrada en la cuenta.' },
    ]
  }

  return [
    { label: 'Rol', value: formatRole(user.role), help: 'Permisos según perfil asignado.' },
    { label: 'Estado', value: user.is_active ? 'Activo' : 'Inactivo', help: 'Disponibilidad de acceso al sistema.' },
    { label: 'Alta', value: user.created_at ? 'Sí' : '—', help: formatDate(user.created_at) },
    { label: 'Acceso', value: user.last_login_at ? 'Sí' : 'No', help: user.last_login_at ? formatDate(user.last_login_at) : 'Sin entrada registrada.' },
  ]
})

const roleDescription = computed(() => {
  const descriptions = {
    admin: 'Puede gestionar usuarios, reservas, mascotas, recursos y revisar la actividad general del centro.',
    staff: 'Puede trabajar con reservas, mascotas, recursos y seguimientos diarios del centro.',
    client: 'Puede consultar sus mascotas, reservas y seguimientos publicados por el centro.',
  }

  return descriptions[form.role] || 'Rol pendiente de definir.'
})

const rolePermissions = computed(() => {
  const permissions = {
    admin: ['Gestionar usuarios', 'Revisar reservas del centro', 'Gestionar recursos', 'Consultar seguimientos'],
    staff: ['Consultar reservas del centro', 'Registrar seguimientos diarios', 'Revisar fichas de mascotas', 'Actualizar recursos operativos'],
    client: ['Consultar sus mascotas', 'Crear y revisar reservas', 'Ver seguimientos publicados', 'Actualizar sus datos básicos'],
  }

  return permissions[form.role] || []
})

function applyUserToForm(user) {
  form.name = user.name || ''
  form.email = user.email || ''
  form.phone = user.phone || ''
  form.role = normalizeRole(user.role)
  form.is_active = Boolean(user.is_active)
}

function clearMessages() {
  successMessage.value = ''
  actionError.value = ''
  loadError.value = ''
}

function clearFormErrors() {
  Object.keys(formErrors).forEach((key) => {
    delete formErrors[key]
  })
}

function clearPasswordErrors() {
  Object.keys(passwordErrors).forEach((key) => {
    delete passwordErrors[key]
  })
}

function assignFormErrors(errors = {}) {
  clearFormErrors()

  Object.entries(errors).forEach(([key, value]) => {
    formErrors[key] = Array.isArray(value) ? value[0] : value
  })
}

function assignPasswordErrors(errors = {}) {
  clearPasswordErrors()

  Object.entries(errors).forEach(([key, value]) => {
    passwordErrors[key] = Array.isArray(value) ? value[0] : value
  })
}

function resetPasswordForm() {
  passwordForm.password = ''
  passwordForm.password_confirmation = ''
  clearPasswordErrors()
}

function resetForm() {
  clearMessages()
  clearFormErrors()

  if (selectedUser.value) {
    applyUserToForm(selectedUser.value)
  }
}

function buildUpdatePayload() {
  return {
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone?.trim() || null,
    role: form.role,
    is_active: Boolean(form.is_active),
  }
}

async function saveUser() {
  if (!selectedUser.value) return

  isSaving.value = true
  clearMessages()
  clearFormErrors()

  try {
    if (isCurrentAdmin.value && form.is_active === false) {
      throw new Error('No puedes desactivar tu propia cuenta.')
    }

    const updatedUser = await updateAdminUser(selectedUser.value.id, buildUpdatePayload())

    selectedUser.value = updatedUser
    successMessage.value = 'Los datos del usuario se han guardado correctamente.'
  } catch (error) {
    console.error(error)
    assignFormErrors(getValidationErrors(error))
    actionError.value = getReadableErrorMessage(error, 'No se pudieron guardar los cambios.')
  } finally {
    isSaving.value = false
  }
}

async function saveTemporaryPassword() {
  if (!selectedUser.value) return

  isPasswordSaving.value = true
  clearMessages()
  clearPasswordErrors()

  try {
    if (!passwordForm.password || passwordForm.password.length < 8) {
      passwordErrors.password = 'La contraseña debe tener al menos 8 caracteres.'
      return
    }

    if (passwordForm.password !== passwordForm.password_confirmation) {
      passwordErrors.password_confirmation = 'Las contraseñas no coinciden.'
      return
    }

    await updateAdminUserPassword(selectedUser.value.id, {
      password: passwordForm.password,
      password_confirmation: passwordForm.password_confirmation,
    })

    resetPasswordForm()
    successMessage.value = 'La contraseña temporal se ha actualizado correctamente.'
  } catch (error) {
    console.error(error)
    assignPasswordErrors(getValidationErrors(error))
    actionError.value = getReadableErrorMessage(error, 'No se pudo actualizar la contraseña temporal.')
  } finally {
    isPasswordSaving.value = false
  }
}

async function toggleActive() {
  if (!selectedUser.value) return

  clearMessages()
  clearFormErrors()

  if (isCurrentAdmin.value) {
    actionError.value = 'No puedes desactivar tu propia cuenta.'
    return
  }

  isSaving.value = true

  try {
    const updatedUser = await updateAdminUser(selectedUser.value.id, {
      is_active: !selectedUser.value.is_active,
    })

    selectedUser.value = updatedUser
    successMessage.value = updatedUser.is_active
      ? 'La cuenta se ha activado correctamente.'
      : 'La cuenta se ha desactivado correctamente.'
  } catch (error) {
    console.error(error)
    actionError.value = getReadableErrorMessage(error, 'No se pudo actualizar el estado de la cuenta.')
  } finally {
    isSaving.value = false
  }
}

function formatRole(role) {
  const labels = {
    admin: 'Admin',
    staff: 'Staff',
    client: 'Cliente',
    cliente: 'Cliente',
  }

  return labels[role] || 'Sin rol'
}

function roleBadgeClass(role) {
  const classes = {
    admin: 'bg-purple-100 text-purple-700',
    staff: 'bg-pink-100 text-pink-700',
    client: 'bg-sky-100 text-sky-700',
    cliente: 'bg-sky-100 text-sky-700',
  }

  return classes[role] || 'bg-white/20 text-white'
}

function formatDate(value) {
  if (!value) return 'Sin fecha'

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
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
