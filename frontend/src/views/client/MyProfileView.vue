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
            <div class="h-12 w-64 rounded bg-white/20"></div>
            <div class="mt-4 h-5 w-full max-w-2xl rounded bg-white/15"></div>

            <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div class="h-[138px] rounded-[24px] bg-white/15"></div>
              <div class="h-[138px] rounded-[24px] bg-white/15"></div>
              <div class="h-[138px] rounded-[24px] bg-white/15"></div>
              <div class="h-[138px] rounded-[24px] bg-white/15"></div>
            </div>
          </div>
        </section>

        <div class="grid gap-6 xl:grid-cols-[minmax(0,1.12fr)_360px] xl:items-stretch">
          <div class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm">
            <div class="animate-pulse space-y-4">
              <div class="h-12 rounded-2xl bg-[#FAF8FC]"></div>
              <div class="h-12 rounded-2xl bg-[#FAF8FC]"></div>
              <div class="h-12 rounded-2xl bg-[#FAF8FC]"></div>
              <div class="h-24 rounded-2xl bg-[#FAF8FC]"></div>
              <div class="flex justify-end gap-3">
                <div class="h-11 w-36 rounded-2xl bg-[#FAF8FC]"></div>
                <div class="h-11 w-40 rounded-2xl bg-[#FAF8FC]"></div>
              </div>
            </div>
          </div>

          <div class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm">
            <div class="animate-pulse space-y-4">
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
          <div class="flex min-h-[370px] flex-col p-5 sm:p-6 lg:min-h-[382px] lg:p-7">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div class="min-w-0 max-w-4xl">
                <h1 class="font-ladralab-brush text-5xl leading-none tracking-tight sm:text-6xl">
                  Mi perfil
                </h1>

                <p class="mt-4 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                  Revisa tus datos principales y actualízalos cuando lo necesites.
                </p>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 lg:w-[320px]">
                <RouterLink
                  :to="{ name: 'client-dashboard' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Dashboard
                </RouterLink>

                <RouterLink
                  :to="{ name: 'my-pets' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Mis mascotas
                </RouterLink>

                <RouterLink
                  :to="{ name: 'my-reservations' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:bg-[#F8F2FF]"
                >
                  Mis reservas
                </RouterLink>

                <RouterLink
                  :to="{ name: 'my-reservations-new' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Nueva reserva
                </RouterLink>
              </div>
            </div>

            <div class="mt-6 grid items-stretch gap-4 sm:grid-cols-2 xl:mt-auto xl:grid-cols-4">
              <article
                v-for="card in heroCards"
                :key="card.label"
                class="flex h-full min-h-[138px] flex-col rounded-[24px] border border-white/16 bg-white/12 p-4 backdrop-blur-sm"
              >
                <div class="flex items-start justify-between gap-4">
                  <div class="min-w-0">
                    <p class="text-sm font-medium text-white/80">
                      {{ card.label }}
                    </p>
                  </div>

                  <div
                    class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-bold shadow-sm"
                    :class="card.iconClass"
                  >
                    {{ card.icon }}
                  </div>
                </div>

                <div class="mt-3 flex-1">
                  <p
                    class="font-bold text-white"
                    :class="card.valueClass || 'text-[1.9rem] leading-[1.08]'"
                    :title="card.value"
                  >
                    {{ card.value }}
                  </p>

                  <p class="mt-2 text-sm leading-5 text-white/82">
                    {{ card.help }}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </header>

        <section class="grid gap-6 xl:grid-cols-[minmax(0,1.12fr)_360px] xl:items-start">
          <div class="space-y-6">
            <article class="flex h-full flex-col rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 class="text-lg font-bold tracking-tight text-slate-900">Tus datos</h2>
                  <p class="mt-1 text-sm text-slate-500">
                    Modifica la información principal asociada a tu cuenta.
                  </p>
                </div>

                <span
                  class="inline-flex w-fit items-center rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#5A208E]"
                >
                  Cuenta
                </span>
              </div>

              <form class="mt-5 flex h-full flex-col" @submit.prevent="handleSubmit">
                <div class="space-y-4">
                  <label class="block">
                    <span class="mb-2 block text-sm font-semibold text-slate-700">Nombre</span>
                    <input
                      v-model.trim="form.name"
                      type="text"
                      class="h-12 w-full rounded-2xl border border-[#DCCFEA] bg-[#FCFBFE] px-4 text-sm text-slate-900 outline-none transition focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
                      placeholder="Tu nombre"
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
                      placeholder="Tu email"
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
                      placeholder="Tu teléfono"
                    />
                    <p v-if="formErrors.phone" class="mt-2 text-xs font-medium text-red-600">
                      {{ formErrors.phone }}
                    </p>
                  </label>

                  <div class="rounded-[22px] border border-[#EEE7F6] bg-[#FCFBFE] p-4">
                    <div class="flex items-start gap-3">
                      <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#F3ECFB] text-[#5A208E]">
                        🐾
                      </div>

                      <div>
                        <p class="text-sm font-semibold text-slate-900">{{ profileReminderTitle }}</p>
                        <p class="mt-1 text-sm leading-6 text-slate-500">
                          {{ profileReminderText }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-auto flex flex-wrap justify-end gap-3 pt-6">
                  <button
                    type="button"
                    @click="resetForm"
                    class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                    :disabled="isSaving"
                  >
                    Restaurar datos
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

            <article class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 class="text-lg font-bold tracking-tight text-slate-900">Cambiar contraseña</h2>
                  <p class="mt-1 text-sm text-slate-500">
                    Actualiza tu contraseña de acceso de forma segura.
                  </p>
                </div>

                <span
                  class="inline-flex w-fit items-center rounded-full bg-[#FFF4FB] px-3 py-1 text-xs font-semibold text-[#B32078]"
                >
                  Seguridad
                </span>
              </div>

              <form class="mt-5 space-y-4" @submit.prevent="handlePasswordSubmit">
                <label class="block">
                  <span class="mb-2 block text-sm font-semibold text-slate-700">Contraseña actual</span>
                  <input
                    v-model.trim="passwordForm.current_password"
                    type="password"
                    autocomplete="current-password"
                    class="h-12 w-full rounded-2xl border border-[#DCCFEA] bg-[#FCFBFE] px-4 text-sm text-slate-900 outline-none transition focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
                    placeholder="Introduce tu contraseña actual"
                  />
                  <p v-if="passwordErrors.current_password" class="mt-2 text-xs font-medium text-red-600">
                    {{ passwordErrors.current_password }}
                  </p>
                </label>

                <div class="grid gap-4 sm:grid-cols-2">
                  <label class="block">
                    <span class="mb-2 block text-sm font-semibold text-slate-700">Nueva contraseña</span>
                    <input
                      v-model.trim="passwordForm.password"
                      type="password"
                      autocomplete="new-password"
                      class="h-12 w-full rounded-2xl border border-[#DCCFEA] bg-[#FCFBFE] px-4 text-sm text-slate-900 outline-none transition focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
                      placeholder="Mínimo 6 caracteres"
                    />
                    <p v-if="passwordErrors.password" class="mt-2 text-xs font-medium text-red-600">
                      {{ passwordErrors.password }}
                    </p>
                  </label>

                  <label class="block">
                    <span class="mb-2 block text-sm font-semibold text-slate-700">Repetir contraseña</span>
                    <input
                      v-model.trim="passwordForm.password_confirmation"
                      type="password"
                      autocomplete="new-password"
                      class="h-12 w-full rounded-2xl border border-[#DCCFEA] bg-[#FCFBFE] px-4 text-sm text-slate-900 outline-none transition focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
                      placeholder="Confirma la nueva contraseña"
                    />
                    <p v-if="passwordErrors.password_confirmation" class="mt-2 text-xs font-medium text-red-600">
                      {{ passwordErrors.password_confirmation }}
                    </p>
                  </label>
                </div>

                <div class="rounded-[22px] border border-[#EEE7F6] bg-[#FCFBFE] p-4">
                  <div class="flex items-start gap-3">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#FFF4FB] text-[#B32078]">
                      🔐
                    </div>

                    <div>
                      <p class="text-sm font-semibold text-slate-900">Recomendación</p>
                      <p class="mt-1 text-sm leading-6 text-slate-500">
                        Usa una contraseña diferente a la anterior y evita datos fáciles de adivinar.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="flex flex-wrap justify-end gap-3 pt-2">
                  <button
                    type="button"
                    @click="clearPasswordForm"
                    class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB] disabled:cursor-not-allowed disabled:opacity-60"
                    :disabled="isChangingPassword"
                  >
                    Limpiar
                  </button>

                  <button
                    type="submit"
                    class="inline-flex h-11 items-center justify-center rounded-2xl bg-[#5A208E] px-5 text-sm font-semibold text-white transition hover:bg-[#4B1A77] disabled:cursor-not-allowed disabled:opacity-60"
                    :disabled="isChangingPassword"
                  >
                    {{ isChangingPassword ? 'Actualizando...' : 'Cambiar contraseña' }}
                  </button>
                </div>
              </form>
            </article>
          </div>

          <article class="flex h-full flex-col rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
            <h2 class="text-lg font-bold tracking-tight text-slate-900">Resumen de cuenta</h2>
            <p class="mt-1 text-sm text-slate-500">
              Información principal visible ahora mismo.
            </p>

            <div class="mt-5 flex-1 rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-5">
              <div class="flex items-center gap-4">
                <div
                  class="flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] bg-gradient-to-br from-[#EAE9EF] to-[#D7CBE7] text-2xl font-bold text-[#514980]"
                >
                  {{ avatarInitial }}
                </div>

                <div class="min-w-0">
                  <h3 class="truncate text-lg font-bold text-slate-900">
                    {{ form.name || 'Tu cuenta' }}
                  </h3>
                </div>
              </div>

              <div class="mt-5 space-y-3">
                <div class="rounded-2xl bg-white p-4 ring-1 ring-[#F0E8F7]">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Email</p>
                  <p class="mt-1 break-all text-sm font-semibold text-slate-800">
                    {{ form.email || 'Sin completar' }}
                  </p>
                </div>

                <div class="rounded-2xl bg-white p-4 ring-1 ring-[#F0E8F7]">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Teléfono</p>
                  <p class="mt-1 text-sm font-semibold text-slate-800">
                    {{ form.phone || 'Sin completar' }}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  getMyProfile,
  updateMyProfile,
  updateMyPassword,
} from '@/services/profileServices'
import { getReadableErrorMessage, getValidationErrors } from '@/utils/errorMessages'
import { uiMessages } from '@/utils/uiMessages'

const authStore = useAuthStore()

const profileMessages = uiMessages.profile || {
  loading: 'Estamos preparando tu perfil...',
  success: {
    updated: 'Tus datos se han guardado correctamente.',
    passwordUpdated: 'Tu contraseña se ha actualizado correctamente.',
  },
  errors: {
    load: 'No hemos podido cargar tu perfil.',
    save: 'No se pudieron guardar los cambios.',
    password: 'No se pudo cambiar la contraseña.',
  },
}

const isLoading = ref(true)
const isSaving = ref(false)
const isChangingPassword = ref(false)
const loadError = ref('')
const actionError = ref('')
const successMessage = ref('')

const originalUser = ref(null)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  role: 'client',
  is_active: true,
})

const formErrors = reactive({
  name: '',
  email: '',
  phone: '',
})

const passwordForm = reactive({
  current_password: '',
  password: '',
  password_confirmation: '',
})

const passwordErrors = reactive({
  current_password: '',
  password: '',
  password_confirmation: '',
})

onMounted(() => {
  loadProfile()
})

const avatarInitial = computed(() => {
  return (form.name || 'U').charAt(0).toUpperCase()
})

const heroCards = computed(() => [
  {
    label: 'Nombre',
    value: form.name || 'Sin completar',
    help: 'Así aparecerá en tu cuenta.',
    icon: '01',
    iconClass: 'bg-white/25 text-white',
    valueClass: 'text-[1.75rem] leading-[1.08]',
  },
  {
    label: 'Email',
    value: form.email || 'Sin completar',
    help: 'Tu acceso principal.',
    icon: '02',
    iconClass: 'bg-sky-100 text-sky-700',
    valueClass: 'break-words text-[1.05rem] leading-6',
  },
  {
    label: 'Teléfono',
    value: form.phone || 'Pendiente',
    help: form.phone ? 'Dato de contacto actualizado.' : 'Aún sin completar.',
    icon: '03',
    iconClass: 'bg-emerald-100 text-emerald-700',
    valueClass: 'text-[1.65rem] leading-[1.08]',
  },
  {
    label: 'Perfil',
    value: form.phone ? 'Listo' : 'Pendiente',
    help: form.phone
      ? 'Tus datos principales están completos.'
      : 'Te falta el teléfono.',
    icon: '04',
    iconClass: 'bg-pink-50 text-pink-700',
    valueClass: 'text-[1.65rem] leading-[1.08]',
  },
])

const profileReminderTitle = computed(() => {
  return form.phone ? 'Todo listo para guardar' : 'Añade tu teléfono'
})

const profileReminderText = computed(() => {
  return form.phone
    ? 'Revisa una última vez tus datos y guarda los cambios cuando quieras.'
    : 'Completar el teléfono puede ayudar al centro a localizarte si necesita confirmar algo.'
})

function applyUserToForm(user) {
  form.name = user?.name || ''
  form.email = user?.email || ''
  form.phone = user?.phone || ''
  form.role = user?.role || 'client'
  form.is_active = user?.is_active ?? true
}

function resetErrors() {
  formErrors.name = ''
  formErrors.email = ''
  formErrors.phone = ''
}

function resetPasswordErrors() {
  passwordErrors.current_password = ''
  passwordErrors.password = ''
  passwordErrors.password_confirmation = ''
}

function applyValidationErrors(target, validationErrors = {}) {
  Object.keys(target).forEach((key) => {
    const value = validationErrors[key]

    if (Array.isArray(value)) {
      target[key] = value[0] || ''
    } else {
      target[key] = value || ''
    }
  })
}

function clearPasswordForm() {
  resetPasswordErrors()
  actionError.value = ''
  successMessage.value = ''

  passwordForm.current_password = ''
  passwordForm.password = ''
  passwordForm.password_confirmation = ''
}

async function loadProfile() {
  isLoading.value = true
  loadError.value = ''
  actionError.value = ''
  successMessage.value = ''

  try {
    const user = await getMyProfile()

    if (!user?.id) {
      throw new Error('No hay usuario autenticado')
    }

    originalUser.value = { ...user }
    applyUserToForm(user)

    updateAuthStoreUser(user)
  } catch (error) {
    console.error(error)
    loadError.value = getReadableErrorMessage(error, profileMessages.errors.load)
  } finally {
    isLoading.value = false
  }
}

function resetForm() {
  resetErrors()
  actionError.value = ''
  successMessage.value = ''

  if (originalUser.value) {
    applyUserToForm(originalUser.value)
  }
}

function validateForm() {
  resetErrors()

  let isValid = true

  if (!form.name.trim()) {
    formErrors.name = 'Indica tu nombre.'
    isValid = false
  }

  if (!form.email.trim()) {
    formErrors.email = 'Indica tu email.'
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

function validatePasswordForm() {
  resetPasswordErrors()

  let isValid = true

  if (!passwordForm.current_password.trim()) {
    passwordErrors.current_password = 'Indica tu contraseña actual.'
    isValid = false
  }

  if (!passwordForm.password.trim()) {
    passwordErrors.password = 'Indica la nueva contraseña.'
    isValid = false
  } else if (passwordForm.password.trim().length < 6) {
    passwordErrors.password = 'La nueva contraseña debe tener al menos 6 caracteres.'
    isValid = false
  }

  if (!passwordForm.password_confirmation.trim()) {
    passwordErrors.password_confirmation = 'Repite la nueva contraseña.'
    isValid = false
  } else if (passwordForm.password.trim() !== passwordForm.password_confirmation.trim()) {
    passwordErrors.password_confirmation = 'Las contraseñas no coinciden.'
    isValid = false
  }

  if (
    passwordForm.current_password.trim() &&
    passwordForm.password.trim() &&
    passwordForm.current_password.trim() === passwordForm.password.trim()
  ) {
    passwordErrors.password = 'La nueva contraseña debe ser distinta a la actual.'
    isValid = false
  }

  return isValid
}

async function handlePasswordSubmit() {
  if (!validatePasswordForm()) return

  isChangingPassword.value = true
  actionError.value = ''
  successMessage.value = ''
  resetPasswordErrors()

  try {
    await updateMyPassword({
      current_password: passwordForm.current_password.trim(),
      password: passwordForm.password.trim(),
      password_confirmation: passwordForm.password_confirmation.trim(),
    })

    clearPasswordForm()

    successMessage.value =
      profileMessages.success?.passwordUpdated ||
      'Tu contraseña se ha actualizado correctamente.'
  } catch (error) {
    console.error(error)

    const validationErrors = getValidationErrors(error)
    applyValidationErrors(passwordErrors, validationErrors)

    actionError.value = getReadableErrorMessage(
      error,
      profileMessages.errors?.password || 'No se pudo cambiar la contraseña.',
    )
  } finally {
    isChangingPassword.value = false
  }
}

async function handleSubmit() {
  if (!validateForm()) return

  isSaving.value = true
  actionError.value = ''
  successMessage.value = ''
  resetErrors()

  try {
    const updatedUser = await updateMyProfile({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    })

    originalUser.value = { ...updatedUser }
    applyUserToForm(updatedUser)
    updateAuthStoreUser(updatedUser)

    successMessage.value =
      profileMessages.success?.updated ||
      'Tus datos se han guardado correctamente.'
  } catch (error) {
    console.error(error)

    const validationErrors = getValidationErrors(error)
    applyValidationErrors(formErrors, validationErrors)

    actionError.value = getReadableErrorMessage(
      error,
      profileMessages.errors?.save || 'No se pudieron guardar los cambios.',
    )
  } finally {
    isSaving.value = false
  }
}

function updateAuthStoreUser(user) {
  if (!user) return

  const currentUser = authStore.user || {}

  authStore.user = {
    ...currentUser,
    ...user,
  }

  localStorage.setItem(
    'ladralab_auth_session',
    JSON.stringify({
      token: authStore.token,
      user: authStore.user,
    }),
  )
}
</script>

<style scoped>
.font-ladralab-brush {
  font-family: 'Caveat Brush', 'Brush Script MT', 'Segoe Script', cursive;
  font-weight: 700;
}
</style>