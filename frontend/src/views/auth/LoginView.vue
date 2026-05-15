<script setup>
import { computed, onBeforeUnmount, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
  remember: true,
})

const errors = reactive({
  email: '',
  password: '',
})

const feedback = reactive({
  type: '',
  message: '',
})

const showPassword = ref(false)
const isSubmitting = ref(false)
const isDogEntering = ref(false)
const currentDogFrame = ref(0)
const dogAnimationProgress = ref(0)

let dogFrameInterval = null
let dogMovementFrame = null
let dogAnimationStart = null

const registerSuccessMessage = computed(() =>
  route.query.registered === '1'
    ? 'Tu cuenta ya está creada. Solo te queda entrar y empezar.'
    : '',
)

const features = [
  {
    title: 'Reservas organizadas',
    text: 'Consulta solicitudes, próximas estancias y citas desde un único lugar.',
    image: '/images/calendar-icon.png',
    alt: 'Icono de calendario con check',
  },
  {
    title: 'Seguimientos claros',
    text: 'Mantén el día a día de cada mascota bien registrado y fácil de consultar.',
    image: '/images/ladralab-check.png',
    alt: 'Icono de checklist con huella',
  },
  {
    title: 'Acceso para cada perfil',
    text: 'Equipo, clientes y familias acceden a su espacio de forma sencilla.',
    image: '/images/social-icon.png',
    alt: 'Icono de perfiles con huella',
  },
]

const dogFrames = Array.from(
  { length: 8 },
  (_, index) => `/images/dog-step-${index + 1}.png`,
)

const currentDogSrc = computed(() => dogFrames[currentDogFrame.value])

const runningDogStyle = computed(() => {
  const progress = dogAnimationProgress.value
  const left = isDogEntering.value ? 3 + progress * 82 : 3
  const scale = getDogScale(progress)
  const opacity = progress > 0.92 ? Math.max(0, 1 - (progress - 0.92) / 0.08) : 1

  return {
    left: `${left}%`,
    transform: `scale(${scale})`,
    opacity,
  }
})

const doorGlowStyle = computed(() => {
  const progress = dogAnimationProgress.value
  const isVisible = isDogEntering.value && progress > 0.35
  const opacity = isVisible ? Math.max(0, 1 - Math.max(progress - 0.72, 0) / 0.28) : 0
  const scale = isVisible ? 0.85 + progress * 0.45 : 0.5

  return {
    opacity,
    transform: `scale(${scale})`,
  }
})

const doorPanelStyle = computed(() => ({
  transform: isDogEntering.value ? 'perspective(240px) rotateY(74deg)' : 'perspective(240px) rotateY(0deg)',
}))

function getDogScale(progress) {
  if (!isDogEntering.value) return 1
  if (progress < 0.58) return 1
  if (progress < 0.78) return interpolate(1, 0.92, (progress - 0.58) / 0.2)
  if (progress < 0.92) return interpolate(0.92, 0.55, (progress - 0.78) / 0.14)
  return interpolate(0.55, 0.18, (progress - 0.92) / 0.08)
}

function interpolate(from, to, progress) {
  return from + (to - from) * Math.min(Math.max(progress, 0), 1)
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function clearErrors() {
  errors.email = ''
  errors.password = ''
  feedback.type = ''
  feedback.message = ''
}

function validateForm() {
  clearErrors()

  if (!form.email) {
    errors.email = 'Introduce tu correo electrónico.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Introduce un correo válido.'
  }

  if (!form.password) {
    errors.password = 'Introduce tu contraseña.'
  }

  return !errors.email && !errors.password
}

function stopDogAnimation(reset = true) {
  if (dogFrameInterval) {
    clearInterval(dogFrameInterval)
    dogFrameInterval = null
  }

  if (dogMovementFrame) {
    window.cancelAnimationFrame(dogMovementFrame)
    dogMovementFrame = null
  }

  dogAnimationStart = null

  if (reset) {
    isDogEntering.value = false
    currentDogFrame.value = 0
    dogAnimationProgress.value = 0
  }
}

function startDogAnimation() {
  stopDogAnimation(false)

  isDogEntering.value = true
  currentDogFrame.value = 0
  dogAnimationProgress.value = 0
  dogAnimationStart = null

  dogFrameInterval = window.setInterval(() => {
    currentDogFrame.value = (currentDogFrame.value + 1) % dogFrames.length
  }, 90)

  const animateMovement = (timestamp) => {
    if (!dogAnimationStart) {
      dogAnimationStart = timestamp
    }

    const elapsed = timestamp - dogAnimationStart
    dogAnimationProgress.value = Math.min(elapsed / 1250, 1)

    if (dogAnimationProgress.value < 1) {
      dogMovementFrame = window.requestAnimationFrame(animateMovement)
    }
  }

  dogMovementFrame = window.requestAnimationFrame(animateMovement)
}

async function handleSubmit() {
  if (isSubmitting.value) return
  if (!validateForm()) return

  isSubmitting.value = true
  feedback.type = ''
  feedback.message = ''

  let loginSucceeded = false

  try {
    startDogAnimation()

    await wait(1250)

    await authStore.login({
      email: form.email,
      password: form.password,
      remember: form.remember,
    })

    loginSucceeded = true

    const redirect =
      typeof route.query.redirect === 'string'
        ? route.query.redirect
        : authStore.getDefaultRouteByRole()

    await router.push(redirect)
  } catch (error) {
    feedback.type = 'error'
    feedback.message =
      error?.message || 'No se pudo iniciar sesión. Revisa los datos e inténtalo de nuevo.'

    await wait(250)
    stopDogAnimation(true)
  } finally {
    if (!loginSucceeded) {
      isSubmitting.value = false
    }
  }
}

onBeforeUnmount(() => {
  stopDogAnimation(false)
})
</script>

<template>
  <main class="isolate min-h-screen overflow-hidden bg-[#F6F0FF] text-[#24113F]">
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
                  Gestión sencilla y conectada
                </p>

                <h1 class="mt-3 max-w-[480px] text-[2.05rem] font-black leading-tight text-[#24113F] xl:text-[2.45rem]">
                  Tu centro y tus mascotas,
                  <span class="block text-[#E83C9D]">más claro y conectado</span>
                </h1>

                <p class="mt-10 max-w-sm text-[1rem] leading-8 text-[#635778]">
                  Organiza reservas, seguimientos e información diaria desde un único espacio pensado para el equipo del centro, las familias de las mascotas y la administración.
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

              <div class="mb-4">
                <p class="text-sm font-black text-[#E83C9D]">Acceso</p>
                <h2 class="mt-1.5 text-[2rem] font-black tracking-tight text-[#24113F] sm:text-[2.15rem]">
                  Iniciar sesión
                </h2>
                <p class="mt-2 leading-7 text-[#6F6780]">
                  Entra para acceder a tu espacio en LadraLab.
                </p>
              </div>

              <div
                v-if="registerSuccessMessage"
                class="mb-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
              >
                {{ registerSuccessMessage }}
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

                <label class="block">
                  <span class="mb-1.5 block text-sm font-bold text-[#504764]">
                    Contraseña
                  </span>

                  <div
                    class="relative flex min-h-[2.85rem] items-center overflow-hidden rounded-2xl border bg-white transition focus-within:border-[#8D55C7] focus-within:shadow-[0_0_0_4px_rgba(141,85,199,0.12)]"
                    :class="
                      errors.password
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
                          d="M7.75 10.25V8.5a4.25 4.25 0 0 1 8.5 0v1.75"
                          stroke="currentColor"
                          stroke-width="1.8"
                          stroke-linecap="round"
                        />
                        <path
                          d="M6.75 10.25h10.5a1.5 1.5 0 0 1 1.5 1.5v5.5a1.5 1.5 0 0 1-1.5 1.5H6.75a1.5 1.5 0 0 1-1.5-1.5v-5.5a1.5 1.5 0 0 1 1.5-1.5Z"
                          stroke="currentColor"
                          stroke-width="1.8"
                        />
                      </svg>
                    </span>

                    <input
                      v-model="form.password"
                      :type="showPassword ? 'text' : 'password'"
                      autocomplete="current-password"
                      placeholder="Introduce tu contraseña"
                      class="min-w-0 flex-1 bg-transparent px-4 pr-16 text-sm font-semibold text-[#24113F] outline-none placeholder:text-[#A79AB8]"
                    />

                    <button
                      type="button"
                      class="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl px-3 py-2 text-xs font-black text-[#7E35B7] transition hover:bg-[#F5ECFF]"
                      @click="showPassword = !showPassword"
                    >
                      {{ showPassword ? 'Ocultar' : 'Ver' }}
                    </button>
                  </div>

                  <span v-if="errors.password" class="mt-1.5 block text-xs font-bold text-red-500">
                    {{ errors.password }}
                  </span>
                </label>

                <div class="flex flex-wrap items-center justify-between gap-3 text-sm">
                  <label class="inline-flex cursor-pointer items-center gap-2 font-semibold text-[#6F6780]">
                    <input
                      v-model="form.remember"
                      type="checkbox"
                      class="h-4 w-4 rounded border-[#D7C8EA] text-[#7330AC] focus:ring-[#7330AC]"
                    />
                    Recordarme
                  </label>

                  <RouterLink
                    to="/recuperar-contrasena"
                    class="font-black text-[#7330AC] transition hover:text-[#E83C9D]"
                  >
                    ¿Olvidaste tu contraseña?
                  </RouterLink>
                </div>

                <div class="mt-1.5 flex h-[3.9rem] items-center" aria-hidden="true">
                  <div
                    class="relative h-[3.45rem] w-full overflow-hidden rounded-full bg-[linear-gradient(180deg,rgba(248,242,255,0.96),rgba(255,255,255,0.5))] shadow-[inset_0_0_0_1px_rgba(222,206,244,0.65)]"
                  >
                    <span
                      class="absolute bottom-[0.55rem] left-4 right-4 h-0.5 rounded-full bg-[linear-gradient(90deg,rgba(214,191,241,0.08),rgba(193,159,236,0.58),rgba(214,191,241,0.08))]"
                    ></span>

                    <img
                      :src="currentDogSrc"
                      alt=""
                      class="pointer-events-none absolute bottom-[0.28rem] z-[5] w-[3.25rem] drop-shadow-[0_6px_10px_rgba(79,36,133,0.16)] transition-[left,transform,opacity] duration-[80ms] max-sm:w-12"
                      :style="runningDogStyle"
                    />

                    <div
                      class="absolute bottom-[0.18rem] right-[0.85rem] z-[3] h-[2.55rem] w-[2.9rem] overflow-visible rounded-[1rem_1rem_0.35rem_0.35rem] border-2 border-[#B48AE4] bg-[linear-gradient(180deg,#E7D3FF,#D7BBF6)] shadow-[0_8px_18px_rgba(125,69,197,0.08)]"
                    >
                      <div
                        class="absolute inset-[0.22rem] overflow-hidden rounded-[0.75rem_0.75rem_0.2rem_0.2rem] bg-[linear-gradient(180deg,rgba(124,66,195,0.22),rgba(81,33,139,0.45))]"
                      >
                        <span
                          class="absolute -inset-[40%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95),rgba(232,198,255,0.4),rgba(232,198,255,0))] transition duration-300"
                          :style="doorGlowStyle"
                        ></span>
                      </div>

                      <div
                        class="absolute inset-[0.08rem] rounded-[0.82rem_0.82rem_0.24rem_0.24rem] border border-[rgba(141,85,199,0.55)] bg-[linear-gradient(180deg,#F4EBFF,#DFC8F9)] shadow-[inset_-6px_0_0_rgba(141,85,199,0.08)] transition-transform duration-500 [transform-origin:right_center]"
                        :style="doorPanelStyle"
                      >
                        <span class="absolute left-[0.36rem] top-4 h-[0.3rem] w-[0.3rem] rounded-full bg-[#7D45C5]"></span>
                      </div>
                    </div>
                  </div>
                </div>

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
                  {{ isSubmitting ? 'Entrando...' : 'Entrar a LadraLab' }}
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

              <p class="text-center text-sm font-semibold text-[#6F6780]">
                ¿Aún no tienes cuenta?
                <RouterLink
                  to="/registro"
                  class="font-black text-[#7330AC] transition hover:text-[#E83C9D]"
                >
                  Crear cuenta
                </RouterLink>
              </p>
            </div>
          </section>
        </div>

        <section class="mt-2 grid gap-3 md:grid-cols-3">
          <article
            v-for="feature in features"
            :key="feature.title"
            class="group rounded-[1.45rem] border border-white/80 bg-white/90 p-3 shadow-[0_14px_34px_rgba(86,45,126,0.12)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(86,45,126,0.16)]"
          >
            <div class="flex items-center gap-3.5 max-sm:items-start">
              <div
                class="grid h-[3.95rem] w-[3.95rem] min-w-[3.95rem] place-items-center rounded-[1.2rem] bg-gradient-to-br from-[#F6EFFF] to-[#FFF5FB] shadow-[inset_0_0_0_1px_rgba(141,85,199,0.08)] transition group-hover:scale-[1.04] group-hover:-rotate-2 max-sm:h-[3.8rem] max-sm:w-[3.8rem] max-sm:min-w-[3.8rem]"
              >
                <img :src="feature.image" :alt="feature.alt" class="h-full w-full object-contain" />
              </div>

              <div>
                <h3 class="text-[1rem] font-black leading-6 text-[#24113F]">
                  {{ feature.title }}
                </h3>
                <p class="mt-1 text-sm leading-6 text-[#6F6780]">
                  {{ feature.text }}
                </p>
              </div>
            </div>
          </article>
        </section>
      </div>
    </section>
  </main>
</template>
