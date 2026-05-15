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

const recoveryBenefits = [
  {
    title: 'Acceso seguro',
    text: 'Recibe las instrucciones necesarias para recuperar tu cuenta de forma sencilla.',
    image: '/images/calendar-icon.png',
    alt: 'Icono de calendario',
  },
  {
    title: 'Cuenta protegida',
    text: 'Por privacidad, verificaremos la solicitud sin mostrar datos sensibles.',
    image: '/images/ladralab-check.png',
    alt: 'Icono de seguimiento',
  },
  {
    title: 'Vuelve a tu espacio',
    text: 'Accede de nuevo a reservas, mascotas y seguimientos cuando restablezcas tu contraseña.',
    image: '/images/social-icon.png',
    alt: 'Icono de perfiles',
  },
]

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
    errors.email = 'Introduce tu correo electrónico.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Introduce un correo válido.'
  }

  return !errors.email
}

async function handleSubmit() {
  if (isSubmitting.value) return
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    // Cuando se conecte backend:
    // await authService.forgotPassword({ email: form.email })
    // Endpoint sugerido Laravel/Sanctum:
    // POST /api/forgot-password

    await wait(650)

    feedback.type = 'success'
    feedback.message =
      'Si el correo está registrado, enviaremos las instrucciones para recuperar la contraseña.'
  } catch (error) {
    feedback.type = 'error'
    feedback.message = 'No se pudo enviar la solicitud. Inténtalo de nuevo en unos minutos.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="min-h-screen overflow-hidden bg-[#F6F0FF] text-[#24113F]">
    <section class="relative flex min-h-screen items-center justify-center px-4 py-3 sm:px-6 lg:px-8">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <span
          class="absolute -left-32 top-24 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(232,60,157,0.16),rgba(232,60,157,0))] opacity-[0.72] blur-[1px]"
        ></span>
        <span
          class="absolute -right-36 bottom-8 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(116,48,208,0.16),rgba(116,48,208,0))] opacity-[0.72] blur-[1px]"
        ></span>
        <span
          class="absolute -bottom-60 left-[52%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(196,153,255,0.2),rgba(196,153,255,0))] opacity-[0.72] blur-[1px]"
        ></span>

        <img
          src="/images/paws-icon.png"
          alt=""
          class="absolute left-[3.4%] top-[8%] w-[1.6rem] -rotate-[18deg] opacity-15 saturate-90 max-lg:left-[2%]"
          aria-hidden="true"
        />
        <img
          src="/images/paws-icon.png"
          alt=""
          class="absolute left-[5.5%] top-[11%] w-5 rotate-[10deg] opacity-15 saturate-90 max-lg:left-[2%]"
          aria-hidden="true"
        />
        <img
          src="/images/paws-icon.png"
          alt=""
          class="absolute left-[3.9%] top-[15.2%] w-[1.2rem] -rotate-[8deg] opacity-15 saturate-90 max-lg:left-[2%]"
          aria-hidden="true"
        />
        <img
          src="/images/paws-icon.png"
          alt=""
          class="absolute left-[6.2%] top-[18%] w-4 rotate-[14deg] opacity-15 saturate-90 max-lg:left-[2%]"
          aria-hidden="true"
        />
        <img
          src="/images/paws-icon.png"
          alt=""
          class="absolute bottom-[8%] right-[3.4%] w-[1.6rem] rotate-[16deg] opacity-15 saturate-90 max-lg:right-[2%]"
          aria-hidden="true"
        />
        <img
          src="/images/paws-icon.png"
          alt=""
          class="absolute bottom-[11.2%] right-[5.6%] w-5 -rotate-[10deg] opacity-15 saturate-90 max-lg:right-[2%]"
          aria-hidden="true"
        />
        <img
          src="/images/paws-icon.png"
          alt=""
          class="absolute bottom-[15.5%] right-[3.8%] w-[1.2rem] rotate-[8deg] opacity-15 saturate-90 max-lg:right-[2%]"
          aria-hidden="true"
        />
        <img
          src="/images/paws-icon.png"
          alt=""
          class="absolute bottom-[18.2%] right-[6.4%] w-4 -rotate-[14deg] opacity-15 saturate-90 max-lg:right-[2%]"
          aria-hidden="true"
        />
      </div>

      <div class="relative w-full max-w-[1280px]">
        <div
          class="grid overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_22px_70px_rgba(86,45,126,0.16)] lg:min-h-[620px] lg:grid-cols-[0.95fr_1.05fr]"
        >
          <section
            class="relative hidden overflow-hidden bg-gradient-to-br from-white via-[#FCF8FF] to-[#F1E7FF] px-8 py-5 lg:block xl:px-10"
          >
            <div class="pointer-events-none absolute inset-y-0 -right-24 w-48 rounded-l-full bg-white/85"></div>

            <div class="relative z-10 flex min-h-[620px] flex-col">
              <RouterLink to="/" class="inline-flex w-fit items-center">
                <img
                  src="/images/ladralab-logo.png"
                  alt="LadraLab"
                  class="w-52 drop-shadow-[0_12px_20px_rgba(74,24,122,0.14)] xl:w-60"
                />
              </RouterLink>

              <div class="mt-4 max-w-[540px]">
                <p
                  class="mb-3 inline-flex rounded-full border border-[#E7D8F6] bg-white/80 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#8B5DB8] shadow-sm"
                >
                  Recuperar acceso
                </p>

                <h1 class="text-[2.05rem] font-black leading-tight text-[#24113F] xl:text-[2.45rem]">
                  Vuelve a entrar,
                  <span class="block text-[#E83C9D]">sin complicaciones</span>
                </h1>

                <p class="mt-4 max-w-lg text-[1rem] leading-8 text-[#635778]">
                  Te enviaremos las instrucciones necesarias para restablecer tu contraseña y recuperar el acceso a tu espacio en LadraLab.
                </p>
              </div>
            </div>
          </section>

          <section class="relative flex min-h-[620px] items-center justify-center bg-white px-6 py-5 sm:px-10 lg:px-12">
            <div class="w-full max-w-2xl">
              <div class="mb-4 flex justify-center lg:hidden">
                <RouterLink to="/" class="inline-flex">
                  <img src="/images/ladralab-logo.png" alt="LadraLab" class="w-44" />
                </RouterLink>
              </div>

              <RouterLink
                to="/login"
                class="mb-5 inline-flex items-center rounded-2xl border border-[#E9DDF4] bg-[#FCFAFF] px-4 py-2.5 text-sm font-black text-[#7330AC] transition hover:border-[#D7C4EC] hover:bg-[#F7F1FF]"
              >
                ← Volver al login
              </RouterLink>

              <div class="mb-4">
                <p class="text-sm font-black text-[#E83C9D]">Acceso</p>
                <h2 class="mt-1.5 text-[2rem] font-black tracking-tight text-[#24113F] sm:text-[2.15rem]">
                  Restablecer contraseña
                </h2>
                <p class="mt-2 leading-7 text-[#6F6780]">
                  Introduce el correo de tu cuenta y te enviaremos las instrucciones para crear una nueva contraseña.
                </p>
              </div>

              <div
                v-if="feedback.message"
                class="mb-3 rounded-2xl border px-4 py-3 text-sm font-semibold"
                :class="
                  feedback.type === 'error'
                    ? 'border-red-100 bg-red-50 text-red-600'
                    : 'border-emerald-100 bg-emerald-50 text-emerald-700'
                "
              >
                {{ feedback.message }}
              </div>

              <form class="space-y-3" @submit.prevent="handleSubmit">
                <label class="block">
                  <span class="mb-1.5 block text-sm font-bold text-[#504764]">
                    Correo electrónico
                  </span>

                  <div
                    class="relative flex min-h-[2.85rem] items-center overflow-hidden rounded-2xl border bg-white transition focus-within:border-[#8D55C7] focus-within:shadow-[0_0_0_4px_rgba(141,85,199,0.12)]"
                    :class="
                      errors.email
                        ? 'border-[#F5A1B4] focus-within:border-[#EF5F80] focus-within:shadow-[0_0_0_4px_rgba(239,95,128,0.12)]'
                        : 'border-[#D9C7EA]'
                    "
                  >
                    <span
                      class="grid min-h-[2.85rem] w-[2.85rem] place-items-center bg-[#F2E9FF] text-[#7D45C5]"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24" fill="none" class="h-5 w-5">
                        <path
                          d="M4.75 6.75h14.5v10.5H4.75V6.75Z"
                          stroke="currentColor"
                          stroke-width="1.8"
                          stroke-linejoin="round"
                        />
                        <path
                          d="m5.25 7.25 6.75 5 6.75-5"
                          stroke="currentColor"
                          stroke-width="1.8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>

                    <input
                      v-model.trim="form.email"
                      type="email"
                      autocomplete="email"
                      placeholder="tu@correo.com"
                      class="min-w-0 flex-1 bg-transparent px-4 text-sm font-semibold text-[#24113F] outline-none placeholder:text-[#A79AB8]"
                    />
                  </div>

                  <span v-if="errors.email" class="mt-1.5 block text-xs font-bold text-red-500">
                    {{ errors.email }}
                  </span>
                </label>

                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="group flex h-[3.05rem] w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#E83C9D] to-[#7430D0] px-5 text-base font-black text-white shadow-[0_16px_32px_rgba(132,56,194,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_38px_rgba(132,56,194,0.3)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <img
                    src="/images/paws-icon.png"
                    alt=""
                    class="h-[1.15rem] w-[1.15rem] object-contain brightness-0 invert"
                    aria-hidden="true"
                  />
                  {{ isSubmitting ? 'Enviando...' : 'Enviar instrucciones' }}
                </button>
              </form>

              <div class="my-3 flex items-center gap-4 text-[#D8C8EC]">
                <span class="h-px flex-1 bg-current"></span>

                <img
                  src="/images/paws-icon.png"
                  alt=""
                  class="h-3.5 w-3.5 object-contain opacity-35"
                  aria-hidden="true"
                />

                <span class="h-px flex-1 bg-current"></span>
              </div>

              <div class="rounded-[1.45rem] border border-[#E9DDF4] bg-[#FCFAFF] p-4">
                <p class="text-sm font-black text-[#24113F]">
                  ¿Ya recuerdas la contraseña?
                </p>

                <RouterLink
                  to="/login"
                  class="mt-2 inline-flex text-sm font-black text-[#7330AC] transition hover:text-[#E83C9D]"
                >
                  Volver a iniciar sesión
                </RouterLink>
              </div>

              <p class="mt-4 text-sm leading-6 text-[#8A809D]">
                Por seguridad, mostraremos el mismo mensaje aunque el correo no exista en el sistema.
              </p>
            </div>
          </section>
        </div>

        <section class="mt-2 grid gap-3 md:grid-cols-3">
          <article
            v-for="benefit in recoveryBenefits"
            :key="benefit.title"
            class="group rounded-[1.45rem] border border-white/80 bg-white/90 p-3 shadow-[0_14px_34px_rgba(86,45,126,0.12)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(86,45,126,0.16)]"
          >
            <div class="flex items-center gap-3.5 max-sm:items-start">
              <div
                class="grid h-[3.95rem] w-[3.95rem] min-w-[3.95rem] place-items-center rounded-[1.2rem] bg-gradient-to-br from-[#F6EFFF] to-[#FFF5FB] shadow-[inset_0_0_0_1px_rgba(141,85,199,0.08)] transition group-hover:scale-[1.04] group-hover:-rotate-2 max-sm:h-[3.8rem] max-sm:w-[3.8rem] max-sm:min-w-[3.8rem]"
              >
                <img :src="benefit.image" :alt="benefit.alt" class="h-full w-full object-contain" />
              </div>

              <div>
                <h3 class="text-[1rem] font-black leading-6 text-[#24113F]">
                  {{ benefit.title }}
                </h3>
                <p class="mt-1 text-sm leading-6 text-[#6F6780]">
                  {{ benefit.text }}
                </p>
              </div>
            </div>
          </article>
        </section>
      </div>
    </section>
  </main>
</template>
