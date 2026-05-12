<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const dogFrames = [
  '/images/dog-step-1.png',
  '/images/dog-step-2.png',
  '/images/dog-step-3.png',
  '/images/dog-step-4.png',
  '/images/dog-step-5.png',
  '/images/dog-step-6.png',
  '/images/dog-step-7.png',
  '/images/dog-step-8.png',
]

const notFoundBenefits = [
  {
    title: 'Ruta no encontrada',
    text: 'La dirección puede haber cambiado o no estar disponible.',
    image: '/images/not-found-route-icon.png',
    alt: 'Icono de ruta no encontrada',
  },
  {
    title: 'Vuelve a un lugar seguro',
    text: 'Puedes regresar al inicio, al login o a la página anterior.',
    image: '/images/go-back-icon.png',
    alt: 'Icono de volver a un lugar seguro',
  },
  {
    title: 'Tu acceso sigue protegido',
    text: 'LadraLab mantiene cada zona organizada según el perfil de acceso.',
    image: '/images/safe-accsess-icon.png',
    alt: 'Icono de acceso protegido',
  },
]

const currentDogFrame = ref(0)
const dogPosition = ref(7)
const dogDirection = ref(1)

let frameTimer = null
let movementTimer = null

const currentDogSrc = computed(() => dogFrames[currentDogFrame.value])

const dogStyle = computed(() => ({
  left: `${dogPosition.value}%`,
  transform: dogDirection.value === 1 ? 'scaleX(1)' : 'scaleX(-1)',
}))

function startAnimation() {
  frameTimer = window.setInterval(() => {
    currentDogFrame.value = (currentDogFrame.value + 1) % dogFrames.length
  }, 85)

  movementTimer = window.setInterval(() => {
    dogPosition.value += dogDirection.value * 1.5

    if (dogPosition.value >= 47) {
      dogDirection.value = -1
    }

    if (dogPosition.value <= 7) {
      dogDirection.value = 1
    }
  }, 85)
}

function stopAnimation() {
  if (frameTimer) {
    window.clearInterval(frameTimer)
    frameTimer = null
  }

  if (movementTimer) {
    window.clearInterval(movementTimer)
    movementTimer = null
  }
}

function goBack() {
  if (window.history.length > 1) {
    router.back()
    return
  }

  router.push('/')
}

onMounted(startAnimation)
onBeforeUnmount(stopAnimation)
</script>

<template>
  <main class="not-found-page min-h-screen overflow-hidden bg-[#F6F0FF] text-[#24113F]">
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
                  Error 404
                </p>

                <h1 class="text-[2.05rem] font-black leading-tight text-[#24113F] xl:text-[2.45rem]">
                  Ups, esta ruta
                  <span class="block text-[#E83C9D]">se ha perdido</span>
                </h1>

                <p class="mt-4 max-w-sm text-[1rem] leading-8 text-[#635778]">
                 Pero no te preocupes, el perrito de LadraLab está aquí para ayudarte a encontrar el camino de regreso.
                </p>
              </div>

              <div class="not-found-illustration-shell">
                <img
                  src="/images/ladralab-not-found.png"
                  alt="Ilustración de LadraLab para página no encontrada"
                  class="not-found-illustration"
                />
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
                <p class="text-sm font-black text-[#E83C9D]">Página no encontrada</p>
                <h2 class="mt-1.5 text-[2rem] font-black tracking-tight text-[#24113F] sm:text-[2.15rem]">
                  El perrito no encuentra esta puerta
                </h2>
                <p class="mt-2 leading-7 text-[#6F6780]">
                  No hemos encontrado la ruta que intentabas abrir. Elige una de estas opciones para continuar sin perder el camino.
                </p>
              </div>

              <div class="scene relative mt-4 h-[245px] overflow-hidden rounded-[1.45rem] border border-[#E9DDF4] bg-[#FCFAFF] shadow-[0_10px_24px_rgba(86,45,126,0.08)]">
                <img src="/images/paws-icon.png" alt="" class="scene-paw scene-paw-1" aria-hidden="true" />
                <img src="/images/paws-icon.png" alt="" class="scene-paw scene-paw-2" aria-hidden="true" />
                <img src="/images/paws-icon.png" alt="" class="scene-paw scene-paw-3" aria-hidden="true" />

                <div class="plant plant-left">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div class="plant plant-right">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div class="ground-line"></div>

                <div class="dog-runner" :style="dogStyle">
                  <img :src="currentDogSrc" alt="" class="dog-runner-image" />
                </div>

                <div class="door">
                  <div class="door-arch"></div>

                  <div class="door-panel">
                    <span class="door-line door-line-1"></span>
                    <span class="door-line door-line-2"></span>
                    <span class="door-line door-line-3"></span>
                    <span class="door-knob"></span>

                    <div class="door-sign">
                      <img src="/images/paws-icon.png" alt="" class="h-5 w-5 object-contain" />
                    </div>
                  </div>
                </div>

                <div class="scene-caption">
                  <span></span>
                  <strong>Ruta no disponible</strong>
                  <span></span>
                </div>
              </div>

              <div class="mt-5 grid gap-3 sm:grid-cols-3">
                <RouterLink
                  to="/"
                  class="group flex h-[3.05rem] items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#E83C9D] to-[#7430D0] px-5 text-sm font-black text-white shadow-[0_16px_32px_rgba(132,56,194,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_38px_rgba(132,56,194,0.3)]"
                >
                  <img src="/images/paws-icon.png" alt="" class="button-paw" aria-hidden="true" />
                  Inicio
                </RouterLink>

                <RouterLink
                  to="/login"
                  class="flex h-[3.05rem] items-center justify-center rounded-2xl border border-[#E4D6F0] bg-[#FCFAFF] px-5 text-sm font-black text-[#7330AC] transition hover:-translate-y-0.5 hover:border-[#C8A8E2] hover:bg-[#F8F1FF]"
                >
                  Login
                </RouterLink>

                <button
                  type="button"
                  class="flex h-[3.05rem] items-center justify-center rounded-2xl border border-[#E4D6F0] bg-[#FCFAFF] px-5 text-sm font-black text-[#7330AC] transition hover:-translate-y-0.5 hover:border-[#C8A8E2] hover:bg-[#F8F1FF]"
                  @click="goBack"
                >
                  Volver
                </button>
              </div>

              <div class="my-4 flex items-center gap-4 text-[#D8C8EC]">
                <span class="h-px flex-1 bg-current"></span>

                <img
                  src="/images/paws-icon.png"
                  alt=""
                  class="separator-paw"
                  aria-hidden="true"
                />

                <span class="h-px flex-1 bg-current"></span>
              </div>

              <div class="rounded-[1.45rem] border border-[#E9DDF4] bg-[#FCFAFF] p-4">
                <p class="text-sm font-black text-[#24113F]">
                  Puede deberse a varias cosas
                </p>

                <p class="mt-2 text-sm leading-6 text-[#6F6780]">
                  La ruta puede estar mal escrita, haber cambiado de nombre o no existir dentro de LadraLab.
                </p>
              </div>
            </div>
          </section>
        </div>

        <section class="mt-2 grid gap-3 md:grid-cols-3">
          <article
            v-for="benefit in notFoundBenefits"
            :key="benefit.title"
            class="feature-card group rounded-[1.45rem] border border-white/80 bg-white/90 p-3 shadow-[0_14px_34px_rgba(86,45,126,0.12)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(86,45,126,0.16)]"
          >
            <div class="flex items-center gap-3.5">
              <div class="feature-icon">
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

<style scoped>
.not-found-page {
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

.not-found-illustration-shell {
  position: relative;
  display: flex;
  min-height: 155px;
  align-items: stretch;
  justify-content: flex-start;
  margin-top: 0.4rem;
  padding: 0.1rem 0.5rem 0;
  overflow: hidden;
  transform: translateX(-40px);
}

.not-found-illustration-shell::before {
  position: absolute;
  left: 12%;
  right: 12%;
  bottom: 0;
  height: 84%;
  content: '';
  border-radius: 999px;
  background: radial-gradient(circle, rgba(236, 221, 255, 0.98), rgba(236, 221, 255, 0));
}

.not-found-illustration {
  position: relative;
  z-index: 1;
  display: block;
  width: min(100%, 540px);
  max-height: 205px;
  margin: 0 auto;
  object-fit: contain;
  object-position: center top;
  filter: drop-shadow(0 16px 28px rgba(109, 80, 165, 0.14));
}

.scene {
  background:
    radial-gradient(circle at 22% 84%, rgba(141, 128, 169, 0.1), transparent 18%),
    radial-gradient(circle at 95% 78%, rgba(232, 60, 157, 0.08), transparent 22%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.65), rgba(246, 240, 250, 0.78));
}

.scene-paw {
  position: absolute;
  width: 1.4rem;
  height: 1.4rem;
  object-fit: contain;
  opacity: 0.13;
  pointer-events: none;
  animation: scene-paw-float 5s ease-in-out infinite;
}

.scene-paw-1 {
  right: 22%;
  top: 11%;
  transform: rotate(-12deg);
}

.scene-paw-2 {
  right: 12%;
  top: 25%;
  width: 1.7rem;
  height: 1.7rem;
  animation-delay: -1.2s;
}

.scene-paw-3 {
  left: 10%;
  top: 38%;
  width: 1.6rem;
  height: 1.6rem;
  animation-delay: -2s;
}

.ground-line {
  position: absolute;
  left: 6%;
  right: 6%;
  bottom: 4.15rem;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, rgba(141, 128, 169, 0.34), transparent);
}

.ground-line::after {
  position: absolute;
  left: 46%;
  top: 50%;
  width: 1rem;
  height: 1rem;
  content: '';
  border-radius: 999px;
  background: #dccfea;
  opacity: 0.9;
  transform: translateY(-50%) rotate(45deg);
  clip-path: polygon(50% 0%, 100% 35%, 82% 100%, 50% 78%, 18% 100%, 0% 35%);
}

.dog-runner {
  position: absolute;
  bottom: 4.35rem;
  z-index: 5;
  width: 5.8rem;
  transform-origin: center bottom;
  transition: left 0.08s linear;
}

.dog-runner::after {
  position: absolute;
  left: 50%;
  bottom: 0.2rem;
  width: 3rem;
  height: 0.55rem;
  content: '';
  border-radius: 999px;
  background: rgba(81, 73, 128, 0.16);
  filter: blur(4px);
  transform: translateX(-50%);
}

.dog-runner-image {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: auto;
  filter: drop-shadow(0 4px 8px rgba(81, 73, 128, 0.16));
}

.door {
  position: absolute;
  right: 8%;
  bottom: 4.15rem;
  z-index: 4;
  width: 6.6rem;
  height: 9.3rem;
}

.door-arch {
  position: absolute;
  inset: -0.9rem -0.9rem -0.3rem;
  border-radius: 999px 999px 1.4rem 1.4rem;
  background: linear-gradient(180deg, #ffffff 0%, #f2edf8 100%);
  box-shadow: 0 18px 30px rgba(81, 73, 128, 0.12);
}

.door-panel {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border: 3px solid rgba(90, 32, 142, 0.28);
  border-radius: 999px 999px 1rem 1rem;
  background: linear-gradient(180deg, #d9cce9 0%, #b8a6d0 100%);
  box-shadow:
    inset 0 0 0 8px rgba(255, 255, 255, 0.3),
    inset 0 -14px 24px rgba(81, 73, 128, 0.12);
}

.door-line {
  position: absolute;
  top: 2rem;
  bottom: 1rem;
  width: 2px;
  border-radius: 999px;
  background: rgba(90, 32, 142, 0.15);
}

.door-line-1 {
  left: 35%;
}

.door-line-2 {
  left: 50%;
}

.door-line-3 {
  left: 65%;
}

.door-knob {
  position: absolute;
  right: 1rem;
  top: 54%;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #ffffff, #bdafd1);
  box-shadow: 0 4px 8px rgba(81, 73, 128, 0.16);
}

.door-sign {
  position: absolute;
  left: 50%;
  top: 2.4rem;
  z-index: 4;
  display: grid;
  width: 2.8rem;
  height: 2.8rem;
  place-items: center;
  border: 4px solid #e83c9d;
  border-radius: 999px;
  background: #ffffff;
  box-shadow: 0 8px 18px rgba(232, 60, 157, 0.2);
  transform: translateX(-50%);
}

.door-sign::after {
  position: absolute;
  width: 3.4rem;
  height: 4px;
  content: '';
  border-radius: 999px;
  background: #e83c9d;
  transform: rotate(-38deg);
}

.plant {
  position: absolute;
  bottom: 4.25rem;
  display: flex;
  align-items: flex-end;
  gap: 0.25rem;
  opacity: 0.62;
}

.plant span {
  display: block;
  width: 0.8rem;
  height: 2.3rem;
  border-radius: 999px 999px 0 999px;
  background: #dccfea;
}

.plant span:nth-child(2) {
  height: 3.1rem;
  background: #cbb7e0;
  transform: rotate(12deg);
}

.plant span:nth-child(3) {
  height: 1.9rem;
  background: #f0b5d4;
  transform: rotate(28deg);
}

.plant-left {
  left: 6%;
}

.plant-right {
  right: 2%;
}

.scene-caption {
  position: absolute;
  right: 8%;
  bottom: 1.2rem;
  left: 8%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 0.8rem;
  color: #8d80a9;
  font-size: 0.9rem;
  font-weight: 900;
}

.scene-caption span {
  height: 2px;
  border-radius: 999px;
  background: rgba(141, 128, 169, 0.22);
}

.button-paw {
  width: 1.15rem;
  height: 1.15rem;
  object-fit: contain;
  filter: brightness(0) invert(1);
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

@keyframes scene-paw-float {
  0%,
  100% {
    transform: translateY(0) rotate(-10deg);
  }

  50% {
    transform: translateY(-8px) rotate(6deg);
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
}

@media (max-width: 640px) {
  .scene {
    height: 18rem;
  }

  .dog-runner {
    bottom: 4.15rem;
    width: 4.9rem;
  }

  .door {
    right: 3%;
    width: 5.3rem;
    height: 7.8rem;
  }

  .door-sign {
    top: 2rem;
    width: 2.25rem;
    height: 2.25rem;
    border-width: 3px;
  }

  .door-sign::after {
    width: 2.8rem;
    height: 3px;
  }

  .plant {
    display: none;
  }

  .scene-caption {
    font-size: 0.8rem;
  }

  .feature-card .flex {
    align-items: flex-start;
  }

  .feature-icon {
    min-width: 3.8rem;
    width: 3.8rem;
    height: 3.8rem;
  }
}
</style>