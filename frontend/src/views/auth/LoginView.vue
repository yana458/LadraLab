<script setup>
import { computed, onBeforeUnmount, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { demoAccesses } from '@/mocks/authUsers'

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
const isButtonHovered = ref(false)
const isDogEntering = ref(false)
const isLoginRejected = ref(false)

const registerSuccessMessage = computed(() =>
  route.query.registered === '1'
    ? 'Tu cuenta ya está creada. Solo te queda entrar y empezar.'
    : '',
)

const dogFrames = Array.from({ length: 9 }, (_, index) => `/images/dog-step-${index + 1}.png`)
const currentDogFrame = ref(0)
let dogFrameInterval = null

const currentDogSrc = computed(() => dogFrames[currentDogFrame.value])

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function startDogWalk() {
  if (dogFrameInterval) return

  dogFrameInterval = setInterval(() => {
    currentDogFrame.value = (currentDogFrame.value + 1) % dogFrames.length
  }, 65)
}

function stopDogWalk(force = false) {
  if (isSubmitting.value && !force) return

  if (dogFrameInterval) {
    clearInterval(dogFrameInterval)
    dogFrameInterval = null
  }

  currentDogFrame.value = 0
}

function handleSceneEnter() {
  if (isSubmitting.value || isLoginRejected.value) return
  isButtonHovered.value = true
  isDogEntering.value = false
  startDogWalk()
}

function handleSceneLeave() {
  if (isSubmitting.value || isLoginRejected.value) return
  isButtonHovered.value = false
  isDogEntering.value = false
  stopDogWalk()
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
    errors.email = 'Introduce tu email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Introduce un email válido.'
  }

  if (!form.password) {
    errors.password = 'Introduce tu contraseña.'
  }

  return !errors.email && !errors.password
}

function fillDemoUser(user) {
  form.email = user.email
  form.password = user.password
  form.remember = true
  clearErrors()
}

async function handleSubmit() {
  if (!validateForm()) return

  isSubmitting.value = true
  isButtonHovered.value = true
  isDogEntering.value = false
  isLoginRejected.value = false
  startDogWalk()

  try {
    await wait(250)

    // Cuando se conecte el backend real, el store podrá llamar al endpoint:
    // POST /api/login
    await authStore.login({
      email: form.email,
      password: form.password,
      remember: form.remember,
    })

    isDogEntering.value = true

    await wait(820)

    const redirect =
      typeof route.query.redirect === 'string'
        ? route.query.redirect
        : authStore.getDefaultRouteByRole()

    await router.push(redirect)
  } catch (error) {
    feedback.type = 'error'
    feedback.message = error?.message || 'No se pudo iniciar sesión. Revisa los datos e inténtalo de nuevo.'

    isSubmitting.value = false
    isDogEntering.value = false
    isLoginRejected.value = true

    await wait(1000)

    isLoginRejected.value = false
    isButtonHovered.value = false
    stopDogWalk(true)
  }
}

onBeforeUnmount(() => {
  if (dogFrameInterval) clearInterval(dogFrameInterval)
})
</script>

<template>
  <main class="min-h-screen overflow-hidden bg-[#F4EFFA] text-[#15152E]">
    <section class="relative flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#E52C91]/20 blur-3xl"></div>
        <div class="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#6D28A8]/20 blur-3xl"></div>
        <div class="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-3xl"></div>
      </div>

      <div class="relative grid w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_80px_rgba(64,33,94,0.16)] lg:grid-cols-[1.05fr_0.95fr]">
        <section class="relative hidden min-h-[660px] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#5B1B8F] via-[#8A2BB0] to-[#E52C91] p-10 text-white lg:flex">
          <div class="absolute -left-20 top-20 h-72 w-72 rounded-full border border-white/15"></div>
          <div class="absolute -right-24 bottom-10 h-96 w-96 rounded-full border border-white/15"></div>
          <div class="absolute inset-x-10 bottom-28 h-px bg-white/10"></div>

          <RouterLink to="/" class="relative inline-flex items-center gap-3 text-white">
            <span class="grid h-14 w-14 place-items-center rounded-3xl bg-white/16 text-2xl font-black shadow-inner">L</span>
            <span>
              <span class="block text-xs font-bold uppercase tracking-[0.38em] text-white/70">Ladralab</span>
              <span class="block text-lg font-bold">Cuidado conectado</span>
            </span>
          </RouterLink>

          <div class="relative max-w-xl">
            <p class="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white/85 ring-1 ring-white/20">
              Gestión diaria para centros caninos
            </p>

            <h1 class="font-ladralab-brush text-6xl leading-none text-white drop-shadow-sm xl:text-7xl">
              Bienvenida de nuevo
            </h1>

            <p class="mt-6 max-w-lg text-lg leading-8 text-white/82">
              Accede a reservas, mascotas, recursos y seguimientos desde un panel claro y cómodo para cada tipo de usuario.
            </p>
          </div>

          <div class="relative grid grid-cols-3 gap-4">
            <article class="rounded-3xl bg-white/12 p-4 ring-1 ring-white/16 backdrop-blur">
              <p class="text-3xl font-black">12</p>
              <p class="mt-2 text-sm font-semibold text-white/75">reservas hoy</p>
            </article>
            <article class="rounded-3xl bg-white/12 p-4 ring-1 ring-white/16 backdrop-blur">
              <p class="text-3xl font-black">7</p>
              <p class="mt-2 text-sm font-semibold text-white/75">seguimientos</p>
            </article>
            <article class="rounded-3xl bg-white/12 p-4 ring-1 ring-white/16 backdrop-blur">
              <p class="text-3xl font-black">3</p>
              <p class="mt-2 text-sm font-semibold text-white/75">roles</p>
            </article>
          </div>
        </section>

        <section class="flex min-h-[660px] flex-col justify-center px-5 py-8 sm:px-8 lg:px-10">
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

            <div class="mb-8">
              <p class="text-xs font-bold uppercase tracking-[0.34em] text-[#9A6AC8]">Acceso</p>
              <h2 class="mt-2 text-3xl font-black text-[#15152E]">Iniciar sesión</h2>
              <p class="mt-3 leading-7 text-[#657491]">
                Entra con tu correo y contraseña para continuar en tu panel.
              </p>
            </div>

            <div
              v-if="registerSuccessMessage"
              class="mb-5 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
            >
              {{ registerSuccessMessage }}
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

              <label class="block">
                <span class="mb-2 block text-sm font-semibold text-[#33415F]">Contraseña</span>
                <div class="relative">
                  <input
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    autocomplete="current-password"
                    placeholder="Introduce tu contraseña"
                    class="h-12 w-full rounded-2xl border border-[#D8CBEA] bg-white px-4 pr-24 text-sm font-medium outline-none transition placeholder:text-[#A7B0C4] focus:border-[#7A2CB2] focus:ring-4 focus:ring-[#7A2CB2]/10"
                    :class="errors.password ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''"
                  />

                  <button
                    type="button"
                    class="absolute right-2 top-1/2 h-8 -translate-y-1/2 rounded-xl px-3 text-xs font-bold text-[#6C2AA6] transition hover:bg-[#F4EFFA]"
                    @click="showPassword = !showPassword"
                  >
                    {{ showPassword ? 'Ocultar' : 'Ver' }}
                  </button>
                </div>

                <span v-if="errors.password" class="mt-2 block text-xs font-semibold text-red-500">{{ errors.password }}</span>
              </label>

              <div class="flex flex-wrap items-center justify-between gap-3 text-sm">
                <label class="inline-flex cursor-pointer items-center gap-2 font-semibold text-[#596983]">
                  <input v-model="form.remember" type="checkbox" class="h-4 w-4 rounded border-[#CDBBDF] text-[#6B25A6] focus:ring-[#6B25A6]" />
                  Recordarme
                </label>

                <RouterLink
                  to="/recuperar-contrasena"
                  class="font-bold text-[#6B25A6] transition hover:text-[#E52C91]"
                >
                  ¿Has olvidado tu contraseña?
                </RouterLink>
              </div>

              <div
                class="space-y-3"
                @mouseenter="handleSceneEnter"
                @mouseleave="handleSceneLeave"
              >
                <button
                  type="submit"
                  :disabled="isSubmitting || isLoginRejected"
                  class="flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#6D28A8] to-[#E52C91] px-5 text-sm font-black text-white shadow-[0_14px_30px_rgba(109,40,168,0.24)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {{ isSubmitting ? 'Entrando...' : 'Entrar a LadraLab' }}
                </button>

                <div
                  class="rounded-[1.6rem] border border-[#E8DFF2] bg-[#FCFAFE] px-4 py-3 transition"
                  :class="{
                    'border-[#D8BDEB] shadow-[0_14px_34px_rgba(109,40,168,0.10)]': isButtonHovered || isSubmitting,
                    'border-red-100 bg-red-50/70': isLoginRejected,
                  }"
                >
                  <div class="mb-2">
                    <p class="text-sm font-black text-[#15152E]">
                      {{ isLoginRejected ? 'Acceso bloqueado' : isDogEntering ? 'Puerta abierta' : 'Entrada a tu espacio' }}
                    </p>
                  </div>

                  <div class="dog-scene">
                    <div class="dog-scene__track"></div>

                    <div
                      class="dog-runner"
                      :class="{
                        walking: isButtonHovered || isSubmitting || isLoginRejected,
                        entering: isDogEntering,
                        rejecting: isLoginRejected,
                      }"
                    >
                      <img
                        :key="currentDogFrame"
                        :src="currentDogSrc"
                        alt=""
                        class="dog-runner__image"
                      />
                    </div>

                    <div
                      class="dog-door"
                      :class="{
                        'dog-door--hover': isButtonHovered || isSubmitting || isLoginRejected,
                        'dog-door--active': isDogEntering,
                        'dog-door--reject': isLoginRejected,
                      }"
                    >
                      <div class="dog-door__opening"></div>
                      <div class="dog-door__panel">
                        <span class="dog-door__panel-line dog-door__panel-line--top"></span>
                        <span class="dog-door__panel-line dog-door__panel-line--mid"></span>
                        <span class="dog-door__knob"></span>
                      </div>
                      <div class="dog-door__frame"></div>
                      <div class="dog-door__light"></div>
                      <div class="dog-door__paw" aria-hidden="true">
                        <svg viewBox="0 0 64 64" class="dog-door__paw-icon">
                          <ellipse cx="32" cy="41" rx="14" ry="11" fill="currentColor" />
                          <circle cx="18" cy="22" r="6" fill="currentColor" />
                          <circle cx="28" cy="16" r="6" fill="currentColor" />
                          <circle cx="38" cy="16" r="6" fill="currentColor" />
                          <circle cx="48" cy="22" r="6" fill="currentColor" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <div class="mt-8 rounded-3xl border border-[#E8DFF2] bg-[#FCFAFE] p-4">
              <p class="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#9A89B4]">Accesos demo</p>

              <div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <button
                  v-for="demo in demoAccesses"
                  :key="demo.email"
                  type="button"
                  class="rounded-2xl border border-[#E0D2EE] bg-white px-3 py-3 text-left text-xs font-bold text-[#5A208E] transition hover:border-[#B991D6] hover:bg-[#F7F1FB]"
                  @click="fillDemoUser(demo)"
                >
                  <span class="block text-[#15152E]">{{ demo.label }}</span>
                  <span class="mt-1 block truncate font-semibold text-[#7B89A4]">{{ demo.email }}</span>
                </button>
              </div>
            </div>

            <p class="mt-7 text-center text-sm font-semibold text-[#657491]">
              ¿Todavía no tienes cuenta?
              <RouterLink to="/registro" class="text-[#6D28A8] hover:text-[#E52C91]">Crear cuenta</RouterLink>
            </p>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<style scoped>
.dog-scene {
  position: relative;
  height: 58px;
  overflow: hidden;
  --dog-start: 6px;
  --dog-near-door: calc(100% - 118px);
  --dog-door-front: calc(100% - 88px);
  --dog-inside-door: calc(100% - 66px);
}

.dog-scene__track {
  position: absolute;
  left: 8px;
  right: 38px;
  bottom: 9px;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(109, 40, 168, 0.12), rgba(109, 40, 168, 0.36), rgba(109, 40, 168, 0.04));
}

.dog-runner {
  position: absolute;
  bottom: 6px;
  left: var(--dog-start);
  z-index: 2;
  display: flex;
  width: 60px;
  height: 38px;
  transform-origin: center bottom;
  align-items: end;
  justify-content: center;
}

.dog-runner.walking {
  animation: dog-walk-position 0.72s ease-in-out infinite alternate;
}

.dog-runner.entering {
  animation: dog-enter-door 0.78s cubic-bezier(0.18, 0.9, 0.2, 1) forwards;
}

.dog-runner.rejecting {
  animation: dog-reject-door 0.74s cubic-bezier(0.28, 0.9, 0.24, 1) forwards;
}

.dog-runner__image {
  display: block;
  width: 100%;
  height: auto;
  filter: drop-shadow(0 5px 8px rgba(44, 11, 73, 0.2));
}

.dog-door {
  position: absolute;
  right: 4px;
  bottom: 4px;
  z-index: 3;
  width: 56px;
  height: 44px;
}

.dog-door__opening {
  position: absolute;
  right: 6px;
  bottom: 3px;
  z-index: 1;
  width: 34px;
  height: 36px;
  border-radius: 12px 12px 4px 4px;
  background: linear-gradient(180deg, rgba(28, 16, 40, 0.28), rgba(20, 12, 28, 0.82));
}

.dog-door__panel {
  position: absolute;
  right: 8px;
  bottom: 3px;
  z-index: 4;
  width: 28px;
  height: 36px;
  transform-origin: right center;
  border-radius: 12px 12px 4px 4px;
  background: linear-gradient(180deg, #f8f3ff 0%, #ede4f7 100%);
  box-shadow:
    inset 0 0 0 1px rgba(81, 73, 128, 0.12),
    inset -4px 0 10px rgba(81, 73, 128, 0.08);
}

.dog-door__panel::before {
  position: absolute;
  inset: 4px;
  content: '';
  border: 1px solid rgba(81, 73, 128, 0.1);
  border-radius: 9px 9px 3px 3px;
}

.dog-door__panel::after {
  position: absolute;
  left: -2px;
  top: 6px;
  width: 3px;
  height: 24px;
  content: '';
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(81, 73, 128, 0.75), rgba(81, 73, 128, 0.25));
}

.dog-door__panel-line {
  position: absolute;
  left: 8px;
  right: 8px;
  height: 1px;
  background: rgba(81, 73, 128, 0.14);
}

.dog-door__panel-line--top {
  top: 12px;
}

.dog-door__panel-line--mid {
  top: 20px;
}

.dog-door__frame {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  border-radius: 14px 14px 5px 5px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.08));
  box-shadow:
    inset 0 0 0 2px rgba(109, 40, 168, 0.1),
    0 6px 14px rgba(28, 16, 40, 0.12);
}

.dog-door__knob {
  position: absolute;
  left: 6px;
  top: 18px;
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: linear-gradient(135deg, #f6c46a, #a96e12);
  box-shadow: 0 0 0 1px rgba(120, 77, 12, 0.16);
}

.dog-door__light {
  position: absolute;
  left: -18px;
  top: 50%;
  z-index: 2;
  width: 18px;
  height: 24px;
  opacity: 0.45;
  filter: blur(1px);
  transform: translateY(-50%);
  background: radial-gradient(circle at left center, rgba(109, 40, 168, 0.18), rgba(255, 255, 255, 0));
}

.dog-door__paw {
  position: absolute;
  left: -3px;
  top: -8px;
  z-index: 6;
  width: 18px;
  height: 18px;
  color: rgba(229, 44, 145, 0.65);
  opacity: 0;
  pointer-events: none;
  transform: scale(0.6) rotate(-10deg);
}

.dog-door__paw-icon {
  display: block;
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.12));
}

.dog-door--hover .dog-door__panel {
  transform: perspective(140px) rotateY(-14deg);
}

.dog-door--active .dog-door__panel {
  animation: door-open 0.72s cubic-bezier(0.2, 0.9, 0.25, 1) forwards;
}

.dog-door--active .dog-door__light {
  width: 30px;
  opacity: 0.95;
}

.dog-door--reject .dog-door__panel {
  animation: door-reject 0.58s cubic-bezier(0.35, 0.85, 0.3, 1) 0.02s both;
}

.dog-door--reject .dog-door__opening {
  animation: opening-pulse 0.46s ease-out 0.04s both;
}

.dog-door--reject .dog-door__light {
  opacity: 0.18;
}

.dog-door--reject .dog-door__paw {
  animation: paw-stamp 0.56s cubic-bezier(0.2, 0.9, 0.22, 1) 0.08s both;
}

@keyframes dog-walk-position {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(8px);
  }
}

@keyframes dog-enter-door {
  0% {
    left: var(--dog-start);
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  62% {
    left: var(--dog-near-door);
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  82% {
    left: var(--dog-door-front);
    transform: translateY(0) scale(0.76);
    opacity: 1;
  }

  100% {
    left: var(--dog-inside-door);
    transform: translateY(0) scale(0.44);
    opacity: 0;
  }
}

@keyframes dog-reject-door {
  0% {
    left: var(--dog-start);
    transform: scaleX(1);
    opacity: 1;
  }

  38% {
    left: calc(100% - 145px);
    transform: scaleX(1);
    opacity: 1;
  }

  50% {
    left: calc(100% - 145px);
    transform: scaleX(-1);
    opacity: 1;
  }

  100% {
    left: var(--dog-start);
    transform: scaleX(-1);
    opacity: 1;
  }
}

@keyframes door-open {
  0% {
    transform: perspective(140px) rotateY(-14deg);
  }

  100% {
    transform: perspective(140px) rotateY(-72deg);
  }
}

@keyframes door-reject {
  0% {
    transform: perspective(140px) rotateY(-8deg);
  }

  30% {
    transform: perspective(140px) rotateY(-20deg);
  }

  55% {
    transform: perspective(140px) rotateY(-6deg);
  }

  80% {
    transform: perspective(140px) rotateY(-14deg);
  }

  100% {
    transform: perspective(140px) rotateY(-10deg);
  }
}

@keyframes opening-pulse {
  0% {
    filter: brightness(1);
  }

  50% {
    filter: brightness(0.75);
  }

  100% {
    filter: brightness(1);
  }
}

@keyframes paw-stamp {
  0% {
    opacity: 0;
    transform: translate(-2px, -4px) scale(0.45) rotate(-16deg);
  }

  55% {
    opacity: 1;
    transform: translate(0, 0) scale(1.02) rotate(0deg);
  }

  100% {
    opacity: 0;
    transform: translate(1px, 2px) scale(0.96) rotate(6deg);
  }
}

@media (max-width: 460px) {
  .dog-runner {
    width: 52px;
  }

  .dog-door {
    right: 0;
    transform: scale(0.92);
    transform-origin: right bottom;
  }

  .dog-scene {
    --dog-near-door: calc(100% - 105px);
    --dog-door-front: calc(100% - 78px);
    --dog-inside-door: calc(100% - 58px);
  }
}
</style>
