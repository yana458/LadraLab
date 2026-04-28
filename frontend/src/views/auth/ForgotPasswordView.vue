<script setup>
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'

const form = reactive({
  email: '',
})

const errors = reactive({
  email: '',
})

const feedback = reactive({
  type: '',
  message: '',
})

const isSubmitting = ref(false)

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function clearMessages() {
  errors.email = ''
  feedback.type = ''
  feedback.message = ''
}

function validateForm() {
  clearMessages()

  if (!form.email) {
    errors.email = 'Introduce tu email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Introduce un email válido.'
  }

  return !errors.email
}

async function handleSubmit() {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    // Cuando se conecte backend:
    // await authService.forgotPassword({ email: form.email })
    // Endpoint sugerido Laravel/Sanctum:
    // POST /api/forgot-password

    await wait(650)

    feedback.type = 'success'
    feedback.message = 'Si el email está registrado, enviaremos las instrucciones para recuperar la contraseña.'
  } catch (error) {
    feedback.type = 'error'
    feedback.message = 'No se pudo enviar la solicitud. Inténtalo de nuevo en unos minutos.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="min-h-screen overflow-hidden bg-[#F4EFFA] text-[#15152E]">
    <section class="relative flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#E52C91]/20 blur-3xl"></div>
        <div class="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#6D28A8]/20 blur-3xl"></div>
        <div class="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-3xl"></div>
      </div>

      <div class="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_80px_rgba(64,33,94,0.16)] lg:grid-cols-[0.95fr_1.05fr]">
        <section class="relative hidden min-h-[600px] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#5B1B8F] via-[#8A2BB0] to-[#E52C91] p-10 text-white lg:flex">
          <div class="absolute -left-20 top-20 h-72 w-72 rounded-full border border-white/15"></div>
          <div class="absolute -right-24 bottom-10 h-96 w-96 rounded-full border border-white/15"></div>

          <RouterLink to="/" class="relative inline-flex items-center gap-3 text-white">
            <span class="grid h-14 w-14 place-items-center rounded-3xl bg-white/16 text-2xl font-black shadow-inner">L</span>
            <span>
              <span class="block text-xs font-bold uppercase tracking-[0.38em] text-white/70">Ladralab</span>
              <span class="block text-lg font-bold">Cuidado conectado</span>
            </span>
          </RouterLink>

          <div class="relative max-w-xl">
            <p class="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white/85 ring-1 ring-white/20">
              Recuperación de acceso
            </p>

            <h1 class="font-ladralab-brush text-6xl leading-none text-white drop-shadow-sm xl:text-7xl">
              Volvemos en un momento
            </h1>

            <p class="mt-6 max-w-lg text-lg leading-8 text-white/82">
              Introduce tu correo y te enviaremos las instrucciones para crear una nueva contraseña de forma segura.
            </p>
          </div>

          <div class="relative grid gap-4 rounded-3xl bg-white/12 p-5 ring-1 ring-white/16 backdrop-blur">
            <p class="text-sm font-bold uppercase tracking-[0.24em] text-white/65">Seguridad</p>
            <p class="text-base font-semibold leading-7 text-white/85">
              Por privacidad, mostraremos el mismo mensaje aunque el correo no exista en el sistema.
            </p>
          </div>
        </section>

        <section class="flex min-h-[600px] flex-col justify-center px-5 py-8 sm:px-8 lg:px-10">
          <div class="mx-auto w-full max-w-md">
            <div class="mb-8 flex items-center justify-between lg:hidden">
              <RouterLink to="/" class="inline-flex items-center gap-3">
                <span class="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#6824A5] to-[#E52C91] text-xl font-black text-white">L</span>
                <span>
                  <span class="block text-xs font-bold uppercase tracking-[0.32em] text-[#9A89B4]">Ladralab</span>
                  <span class="block font-bold text-[#15152E]">Cuidado conectado</span>
                </span>
              </RouterLink>
            </div>

            <RouterLink
              to="/login"
              class="mb-7 inline-flex h-11 items-center rounded-2xl border border-[#D8CBEA] bg-white px-4 text-sm font-bold text-[#6D28A8] transition hover:bg-[#F7F1FB]"
            >
              ← Volver al login
            </RouterLink>

            <div class="mb-8">
              <p class="text-xs font-bold uppercase tracking-[0.34em] text-[#9A6AC8]">Recuperar acceso</p>
              <h2 class="mt-2 text-3xl font-black text-[#15152E]">Restablecer contraseña</h2>
              <p class="mt-3 leading-7 text-[#657491]">
                Escribe el email de tu cuenta y recibirás las instrucciones para crear una nueva contraseña.
              </p>
            </div>

            <div
              v-if="feedback.message"
              class="mb-5 rounded-2xl border px-4 py-3 text-sm font-semibold"
              :class="feedback.type === 'error' ? 'border-red-100 bg-red-50 text-red-600' : 'border-emerald-100 bg-emerald-50 text-emerald-700'"
            >
              {{ feedback.message }}
            </div>

            <form class="space-y-5" @submit.prevent="handleSubmit">
              <label class="block">
                <span class="mb-2 block text-sm font-semibold text-[#33415F]">Email</span>
                <input
                  v-model.trim="form.email"
                  type="email"
                  autocomplete="email"
                  placeholder="ana@ladralab.test"
                  class="h-12 w-full rounded-2xl border border-[#D8CBEA] bg-white px-4 text-sm font-medium outline-none transition placeholder:text-[#A7B0C4] focus:border-[#7A2CB2] focus:ring-4 focus:ring-[#7A2CB2]/10"
                  :class="errors.email ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''"
                />
                <span v-if="errors.email" class="mt-2 block text-xs font-semibold text-red-500">{{ errors.email }}</span>
              </label>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#6D28A8] to-[#E52C91] px-5 text-sm font-black text-white shadow-[0_14px_30px_rgba(109,40,168,0.24)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {{ isSubmitting ? 'Enviando...' : 'Enviar instrucciones' }}
              </button>
            </form>

            <div class="mt-8 rounded-3xl border border-[#E8DFF2] bg-[#FCFAFE] p-5">
              <p class="text-sm font-black text-[#15152E]">¿Ya recuerdas la contraseña?</p>
              <RouterLink to="/login" class="mt-2 inline-flex text-sm font-bold text-[#6D28A8] transition hover:text-[#E52C91]">
                Volver a iniciar sesión
              </RouterLink>
            </div>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>
