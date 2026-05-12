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

let dogFrameInterval = null

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

  if (reset) {
    isDogEntering.value = false
    currentDogFrame.value = 0
  }
}

function startDogAnimation() {
  stopDogAnimation(false)

  isDogEntering.value = true
  currentDogFrame.value = 0

  dogFrameInterval = window.setInterval(() => {
    currentDogFrame.value = (currentDogFrame.value + 1) % dogFrames.length
  }, 90)
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
  <main class="login-page min-h-screen overflow-hidden bg-[#F6F0FF] text-[#24113F]">
    <section class="relative flex min-h-screen items-center justify-center px-4 py-3 sm:px-6 lg:px-8">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <span class="blob blob-1"></span>
        <span class="blob blob-2"></span>
        <span class="blob blob-3"></span>

        <img src="/images/paws-icon.png" alt="" class="floating-paw floating-paw-1" aria-hidden="true" />
        <img src="/images/paws-icon.png" alt="" class="floating-paw floating-paw-2" aria-hidden="true" />
        <img src="/images/paws-icon.png" alt="" class="floating-paw floating-paw-3" aria-hidden="true" />
        <img src="/images/paws-icon.png" alt="" class="floating-paw floating-paw-4" aria-hidden="true" />

        <img src="/images/paws-icon.png" alt="" class="floating-paw floating-paw-5" aria-hidden="true" />
        <img src="/images/paws-icon.png" alt="" class="floating-paw floating-paw-6" aria-hidden="true" />
        <img src="/images/paws-icon.png" alt="" class="floating-paw floating-paw-7" aria-hidden="true" />
        <img src="/images/paws-icon.png" alt="" class="floating-paw floating-paw-8" aria-hidden="true" />
      </div>

      <div class="relative w-full max-w-[1280px]">
        <div
          class="grid overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_22px_70px_rgba(86,45,126,0.16)] lg:min-h-[620px] lg:grid-cols-[0.95fr_1.05fr]"
        >
          <section
            class="brand-panel relative hidden overflow-hidden bg-gradient-to-br from-white via-[#FCF8FF] to-[#F1E7FF] px-8 py-5 lg:block xl:px-10"
          >
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

                <h1 class="text-[2.05rem] font-black leading-tight text-[#24113F] xl:text-[2.45rem] mt-3 max-w-[480px]">
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

                  <div class="input-shell" :class="errors.email ? 'input-shell--error' : ''">
                    <span class="input-icon" aria-hidden="true">
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
                      class="input-field"
                    />
                  </div>

                  <span v-if="errors.email" class="error-text">
                    {{ errors.email }}
                  </span>
                </label>

                <label class="block">
                  <span class="mb-1.5 block text-sm font-bold text-[#504764]">
                    Contraseña
                  </span>

                  <div class="input-shell" :class="errors.password ? 'input-shell--error' : ''">
                    <span class="input-icon" aria-hidden="true">
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
                      class="input-field pr-16"
                    />

                    <button
                      type="button"
                      class="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl px-3 py-2 text-xs font-black text-[#7E35B7] transition hover:bg-[#F5ECFF]"
                      @click="showPassword = !showPassword"
                    >
                      {{ showPassword ? 'Ocultar' : 'Ver' }}
                    </button>
                  </div>

                  <span v-if="errors.password" class="error-text">
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

                <!-- Perrito encima del botón -->
                <div class="dog-strip" aria-hidden="true">
                  <div class="dog-scene">
                    <span class="dog-track"></span>

                    <img
                      :src="currentDogSrc"
                      alt=""
                      class="running-dog"
                      :class="{ 'running-dog--entering': isDogEntering }"
                    />

                    <div class="dog-door">
                      <div
                        class="dog-door-inner"
                        :class="{ 'dog-door-inner--active': isDogEntering }"
                      ></div>

                      <div
                        class="dog-door-panel"
                        :class="{ 'dog-door-panel--open': isDogEntering }"
                      >
                        <span class="dog-door-knob"></span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="group flex h-[3.05rem] w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#E83C9D] to-[#7430D0] px-5 text-base font-black text-white shadow-[0_16px_32px_rgba(132,56,194,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_38px_rgba(132,56,194,0.3)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <img src="/images/paws-icon.png" alt="" class="button-paw" aria-hidden="true" />
                  {{ isSubmitting ? 'Entrando...' : 'Entrar a LadraLab' }}
                </button>
              </form>

              <div class="my-3 flex items-center gap-4 text-[#D8C8EC]">
                <span class="h-px flex-1 bg-current"></span>

                <img
                  src="/images/paws-icon.png"
                  alt=""
                  class="separator-paw"
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
            class="feature-card group rounded-[1.45rem] border border-white/80 bg-white/90 p-3 shadow-[0_14px_34px_rgba(86,45,126,0.12)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(86,45,126,0.16)]"
          >
            <div class="flex items-center gap-3.5">
              <div class="feature-icon">
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

<style scoped>
.login-page {
  isolation: isolate;
}

.blob {
  position: absolute;
  border-radius: 999px;
  opacity: 0.72;
  filter: blur(1px);
}

.blob-1 {
  left: -8rem;
  top: 6rem;
  width: 22rem;
  height: 22rem;
  background: radial-gradient(circle, rgba(232, 60, 157, 0.16), rgba(232, 60, 157, 0));
}

.blob-2 {
  right: -9rem;
  bottom: 2rem;
  width: 26rem;
  height: 26rem;
  background: radial-gradient(circle, rgba(116, 48, 208, 0.16), rgba(116, 48, 208, 0));
}

.blob-3 {
  left: 52%;
  bottom: -15rem;
  width: 34rem;
  height: 34rem;
  background: radial-gradient(circle, rgba(196, 153, 255, 0.2), rgba(196, 153, 255, 0));
}

.floating-paw {
  position: absolute;
  width: 1.6rem;
  opacity: 0.16;
  filter: saturate(0.9);
}

.floating-paw-1 {
  top: 8%;
  left: 3.4%;
  transform: rotate(-18deg);
}

.floating-paw-2 {
  top: 11%;
  left: 5.5%;
  width: 1.25rem;
  transform: rotate(10deg);
}

.floating-paw-3 {
  top: 15.2%;
  left: 3.9%;
  width: 1.2rem;
  transform: rotate(-8deg);
}

.floating-paw-4 {
  top: 18%;
  left: 6.2%;
  width: 1rem;
  transform: rotate(14deg);
}

.floating-paw-5 {
  right: 3.4%;
  bottom: 8%;
  transform: rotate(16deg);
}

.floating-paw-6 {
  right: 5.6%;
  bottom: 11.2%;
  width: 1.25rem;
  transform: rotate(-10deg);
}

.floating-paw-7 {
  right: 3.8%;
  bottom: 15.5%;
  width: 1.2rem;
  transform: rotate(8deg);
}

.floating-paw-8 {
  right: 6.4%;
  bottom: 18.2%;
  width: 1rem;
  transform: rotate(-14deg);
}

.brand-panel::after {
  position: absolute;
  inset: 0 -6rem 0 auto;
  width: 12rem;
  content: '';
  background: white;
  border-radius: 50% 0 0 50%;
  opacity: 0.86;
}

.illustration-shell {
  position: relative;
  display: flex;
  min-height: 160px;
  align-items: flex-start;
  justify-content: center;
  margin-top: 0.2rem;
  padding: 0.1rem 0.5rem 0;
  overflow: hidden;
  transform: translateX(-30px);
}

.illustration-shell::before {
  position: absolute;
  left: 10%;
  right: 14%;
  bottom: 0;
  height: 84%;
  content: '';
  border-radius: 999px;
  background: radial-gradient(circle, rgba(236, 221, 255, 0.98), rgba(236, 221, 255, 0));
}

.login-illustration {
  position: relative;
  z-index: 1;
  display: block;
  width: min(100%, 560px);
  max-height: 215px;
  margin: 0 auto;
  object-fit: contain;
  object-position: center top;
  transform: translateX(-1.6rem);
  filter: drop-shadow(0 16px 28px rgba(109, 80, 165, 0.14));
}

.input-shell {
  position: relative;
  display: flex;
  min-height: 2.85rem;
  align-items: center;
  overflow: hidden;
  border: 1px solid #d9c7ea;
  border-radius: 1rem;
  background: #fff;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.input-shell:focus-within {
  border-color: #8d55c7;
  box-shadow: 0 0 0 4px rgba(141, 85, 199, 0.12);
}

.input-shell--error {
  border-color: #f5a1b4;
}

.input-shell--error:focus-within {
  border-color: #ef5f80;
  box-shadow: 0 0 0 4px rgba(239, 95, 128, 0.12);
}

.input-icon {
  display: grid;
  min-height: 2.85rem;
  width: 2.85rem;
  place-items: center;
  background: #f2e9ff;
  color: #7d45c5;
}

.input-field {
  min-width: 0;
  flex: 1;
  background: transparent;
  padding: 0 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #24113f;
  outline: none;
}

.input-field::placeholder {
  color: #a79ab8;
}

.error-text {
  margin-top: 0.35rem;
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  color: #ef4444;
}

.button-paw {
  width: 1.15rem;
  height: 1.15rem;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

/* Perrito encima del botón */
.dog-strip {
  display: flex;
  height: 3.9rem;
  align-items: center;
  margin-top: 0.35rem;
}

.dog-scene {
  position: relative;
  width: 100%;
  height: 3.45rem;
  overflow: hidden;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(248, 242, 255, 0.96), rgba(255, 255, 255, 0.5));
  box-shadow: inset 0 0 0 1px rgba(222, 206, 244, 0.65);
}

.dog-track {
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 0.55rem;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    rgba(214, 191, 241, 0.08),
    rgba(193, 159, 236, 0.58),
    rgba(214, 191, 241, 0.08)
  );
}

.running-dog {
  position: absolute;
  left: 0.95rem;
  bottom: 0.28rem;
  z-index: 5;
  width: 3.25rem;
  height: auto;
  opacity: 1;
  transform: scale(1);
  filter: drop-shadow(0 6px 10px rgba(79, 36, 133, 0.16));
  pointer-events: none;
}

.running-dog--entering {
  animation: dog-enter 1.25s ease-in-out forwards;
}

.dog-door {
  position: absolute;
  right: 0.85rem;
  bottom: 0.18rem;
  z-index: 3;
  width: 2.9rem;
  height: 2.55rem;
  overflow: visible;
  border: 2px solid #b48ae4;
  border-radius: 1rem 1rem 0.35rem 0.35rem;
  background: linear-gradient(180deg, #e7d3ff, #d7bbf6);
  box-shadow: 0 8px 18px rgba(125, 69, 197, 0.08);
}

.dog-door-inner {
  position: absolute;
  inset: 0.22rem;
  overflow: hidden;
  border-radius: 0.75rem 0.75rem 0.2rem 0.2rem;
  background: linear-gradient(180deg, rgba(124, 66, 195, 0.22), rgba(81, 33, 139, 0.45));
}

.dog-door-inner::after {
  position: absolute;
  inset: -40%;
  content: '';
  background: radial-gradient(circle, rgba(255, 255, 255, 0.95), rgba(232, 198, 255, 0.4), rgba(232, 198, 255, 0));
  opacity: 0;
  transform: scale(0.5);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.dog-door-inner--active::after {
  opacity: 1;
  transform: scale(1);
  animation: door-glow 1.25s ease-in-out forwards;
}

.dog-door-panel {
  position: absolute;
  inset: 0.08rem;
  border: 1px solid rgba(141, 85, 199, 0.55);
  border-radius: 0.82rem 0.82rem 0.24rem 0.24rem;
  background: linear-gradient(180deg, #f4ebff, #dfc8f9);
  transform-origin: right center;
  transition: transform 0.42s ease;
  box-shadow: inset -6px 0 0 rgba(141, 85, 199, 0.08);
}

.dog-door-panel--open {
  transform: perspective(240px) rotateY(74deg);
}

.dog-door-knob {
  position: absolute;
  left: 0.36rem;
  top: 1rem;
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 999px;
  background: #7d45c5;
}

.separator-paw {
  width: 0.9rem;
  height: 0.9rem;
  object-fit: contain;
  opacity: 0.36;
}


.feature-icon {
  display: grid;
  min-width: 3.95rem;
  width: 3.95rem;
  height: 3.95rem;
  place-items: center;
  border-radius: 1.2rem;
  background: linear-gradient(135deg, #f6efff, #fff5fb);
  box-shadow: inset 0 0 0 1px rgba(141, 85, 199, 0.08);
  transition: transform 0.2s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.04) rotate(-2deg);
}

@keyframes dog-enter {
  0% {
    left: 0.95rem;
    transform: scale(1);
    opacity: 1;
  }

  58% {
    left: calc(100% - 8.7rem);
    transform: scale(1);
    opacity: 1;
  }

  78% {
    left: calc(100% - 6.55rem);
    transform: scale(0.92);
    opacity: 1;
  }

  92% {
    left: calc(100% - 5.35rem);
    transform: scale(0.55);
    opacity: 1;
  }

  100% {
    left: calc(100% - 4.75rem);
    transform: scale(0.18);
    opacity: 0;
  }
}

@keyframes door-glow {
  0% {
    opacity: 0;
    transform: scale(0.45);
  }

  28% {
    opacity: 1;
    transform: scale(1);
  }

  72% {
    opacity: 0.75;
    transform: scale(1.08);
  }

  100% {
    opacity: 0;
    transform: scale(1.25);
  }
}

@media (max-width: 1023px) {
  .brand-panel {
    display: none;
  }

  .floating-paw-1,
  .floating-paw-2,
  .floating-paw-3,
  .floating-paw-4 {
    left: 2%;
  }

  .floating-paw-5,
  .floating-paw-6,
  .floating-paw-7,
  .floating-paw-8 {
    right: 2%;
  }

  .login-illustration {
    transform: translateX(-0.8rem);
  }
}

@media (max-width: 640px) {
  .feature-card .flex {
    align-items: flex-start;
  }

  .feature-icon {
    min-width: 3.8rem;
    width: 3.8rem;
    height: 3.8rem;
  }

  .running-dog {
    width: 3rem;
  }

  @keyframes dog-enter {
    0% {
      left: 0.8rem;
      transform: scale(1);
      opacity: 1;
    }

    58% {
      left: calc(100% - 8rem);
      transform: scale(1);
      opacity: 1;
    }

    78% {
      left: calc(100% - 6.4rem);
      transform: scale(0.92);
      opacity: 1;
    }

    92% {
      left: calc(100% - 5.3rem);
      transform: scale(0.55);
      opacity: 1;
    }

    100% {
      left: calc(100% - 4.7rem);
      transform: scale(0.18);
      opacity: 0;
    }
  }
}
</style>