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
  <main class="isolate min-h-screen overflow-hidden bg-[#F6F0FF] text-[#24113F]">
    <section class="relative flex min-h-screen items-center justify-center px-4 py-3 sm:px-6 lg:px-8">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <span
          class="absolute -left-32 top-24 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(232,60,157,0.16),rgba(232,60,157,0))] opacity-70 blur-[1px]"
        ></span>
        <span
          class="absolute -right-36 bottom-8 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(116,48,208,0.16),rgba(116,48,208,0))] opacity-70 blur-[1px]"
        ></span>
        <span
          class="absolute -bottom-60 left-[52%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(196,153,255,0.20),rgba(196,153,255,0))] opacity-70 blur-[1px]"
        ></span>

        <img
          src="/images/paws-icon.png"
          alt=""
          aria-hidden="true"
          class="absolute left-[3.4%] top-[8%] w-[1.6rem] -rotate-[18deg] opacity-15 saturate-90 max-lg:left-[2%]"
        />
        <img
          src="/images/paws-icon.png"
          alt=""
          aria-hidden="true"
          class="absolute left-[5.5%] top-[11%] w-5 rotate-[10deg] opacity-15 saturate-90 max-lg:left-[2%]"
        />
        <img
          src="/images/paws-icon.png"
          alt=""
          aria-hidden="true"
          class="absolute left-[3.9%] top-[15.2%] w-[1.2rem] -rotate-[8deg] opacity-15 saturate-90 max-lg:left-[2%]"
        />
        <img
          src="/images/paws-icon.png"
          alt=""
          aria-hidden="true"
          class="absolute left-[6.2%] top-[18%] w-4 rotate-[14deg] opacity-15 saturate-90 max-lg:left-[2%]"
        />
        <img
          src="/images/paws-icon.png"
          alt=""
          aria-hidden="true"
          class="absolute bottom-[8%] right-[3.4%] w-[1.6rem] rotate-[16deg] opacity-15 saturate-90 max-lg:right-[2%]"
        />
        <img
          src="/images/paws-icon.png"
          alt=""
          aria-hidden="true"
          class="absolute bottom-[11.2%] right-[5.6%] w-5 -rotate-[10deg] opacity-15 saturate-90 max-lg:right-[2%]"
        />
        <img
          src="/images/paws-icon.png"
          alt=""
          aria-hidden="true"
          class="absolute bottom-[15.5%] right-[3.8%] w-[1.2rem] rotate-[8deg] opacity-15 saturate-90 max-lg:right-[2%]"
        />
        <img
          src="/images/paws-icon.png"
          alt=""
          aria-hidden="true"
          class="absolute bottom-[18.2%] right-[6.4%] w-4 -rotate-[14deg] opacity-15 saturate-90 max-lg:right-[2%]"
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

              <div
                class="relative mt-4 h-[245px] overflow-hidden rounded-[1.45rem] border border-[#E9DDF4] bg-[radial-gradient(circle_at_22%_84%,rgba(141,128,169,0.10),transparent_18%),radial-gradient(circle_at_95%_78%,rgba(232,60,157,0.08),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.65),rgba(246,240,250,0.78))] shadow-[0_10px_24px_rgba(86,45,126,0.08)] max-sm:h-72"
              >
                <img
                  src="/images/paws-icon.png"
                  alt=""
                  aria-hidden="true"
                  class="pointer-events-none absolute right-[22%] top-[11%] h-[1.4rem] w-[1.4rem] -rotate-12 animate-bounce object-contain opacity-[0.13]"
                />
                <img
                  src="/images/paws-icon.png"
                  alt=""
                  aria-hidden="true"
                  class="pointer-events-none absolute right-[12%] top-[25%] h-[1.7rem] w-[1.7rem] rotate-6 animate-bounce object-contain opacity-[0.13] [animation-delay:-1.2s]"
                />
                <img
                  src="/images/paws-icon.png"
                  alt=""
                  aria-hidden="true"
                  class="pointer-events-none absolute left-[10%] top-[38%] h-[1.6rem] w-[1.6rem] -rotate-6 animate-bounce object-contain opacity-[0.13] [animation-delay:-2s]"
                />

                <div class="absolute bottom-[4.25rem] left-[6%] flex items-end gap-1 opacity-60 max-sm:hidden">
                  <span class="block h-[2.3rem] w-3 rounded-[999px_999px_0_999px] bg-[#DCCFEA]"></span>
                  <span class="block h-[3.1rem] w-3 rotate-12 rounded-[999px_999px_0_999px] bg-[#CBB7E0]"></span>
                  <span class="block h-[1.9rem] w-3 rotate-[28deg] rounded-[999px_999px_0_999px] bg-[#F0B5D4]"></span>
                </div>

                <div class="absolute bottom-[4.25rem] right-[2%] flex items-end gap-1 opacity-60 max-sm:hidden">
                  <span class="block h-[2.3rem] w-3 rounded-[999px_999px_0_999px] bg-[#DCCFEA]"></span>
                  <span class="block h-[3.1rem] w-3 rotate-12 rounded-[999px_999px_0_999px] bg-[#CBB7E0]"></span>
                  <span class="block h-[1.9rem] w-3 rotate-[28deg] rounded-[999px_999px_0_999px] bg-[#F0B5D4]"></span>
                </div>

                <div
                  class="absolute bottom-[4.15rem] left-[6%] right-[6%] h-0.5 rounded-full bg-[linear-gradient(90deg,transparent,rgba(141,128,169,0.34),transparent)]"
                >
                  <span
                    class="absolute left-[46%] top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 rounded-full bg-[#DCCFEA] opacity-90 [clip-path:polygon(50%_0%,100%_35%,82%_100%,50%_78%,18%_100%,0%_35%)]"
                  ></span>
                </div>

                <div
                  class="absolute bottom-[4.35rem] z-[5] w-[5.8rem] origin-bottom transition-[left] duration-[80ms] ease-linear max-sm:bottom-[4.15rem] max-sm:w-[4.9rem]"
                  :style="dogStyle"
                >
                  <span
                    class="absolute bottom-1 left-1/2 h-2 w-12 -translate-x-1/2 rounded-full bg-[#514980]/15 blur"
                  ></span>
                  <img
                    :src="currentDogSrc"
                    alt=""
                    class="relative z-10 block h-auto w-full drop-shadow-[0_4px_8px_rgba(81,73,128,0.16)]"
                  />
                </div>

                <div class="absolute bottom-[4.15rem] right-[8%] z-[4] h-[9.3rem] w-[6.6rem] max-sm:right-[3%] max-sm:h-[7.8rem] max-sm:w-[5.3rem]">
                  <div
                    class="absolute -inset-x-3.5 -bottom-1 -top-3.5 rounded-[999px_999px_1.4rem_1.4rem] bg-gradient-to-b from-white to-[#F2EDF8] shadow-[0_18px_30px_rgba(81,73,128,0.12)]"
                  ></div>

                  <div
                    class="absolute inset-0 overflow-hidden rounded-[999px_999px_1rem_1rem] border-[3px] border-[#5A208E]/30 bg-gradient-to-b from-[#D9CCE9] to-[#B8A6D0] shadow-[inset_0_0_0_8px_rgba(255,255,255,0.30),inset_0_-14px_24px_rgba(81,73,128,0.12)]"
                  >
                    <span class="absolute bottom-4 top-8 left-[35%] w-0.5 rounded-full bg-[#5A208E]/15"></span>
                    <span class="absolute bottom-4 top-8 left-1/2 w-0.5 rounded-full bg-[#5A208E]/15"></span>
                    <span class="absolute bottom-4 top-8 left-[65%] w-0.5 rounded-full bg-[#5A208E]/15"></span>
                    <span
                      class="absolute right-4 top-[54%] h-3 w-3 rounded-full bg-gradient-to-br from-white to-[#BDAFD1] shadow-[0_4px_8px_rgba(81,73,128,0.16)]"
                    ></span>

                    <div
                      class="absolute left-1/2 top-[2.4rem] z-[4] grid h-[2.8rem] w-[2.8rem] -translate-x-1/2 place-items-center rounded-full border-4 border-[#E83C9D] bg-white shadow-[0_8px_18px_rgba(232,60,157,0.20)] max-sm:top-8 max-sm:h-9 max-sm:w-9 max-sm:border-[3px]"
                    >
                      <img src="/images/paws-icon.png" alt="" class="h-5 w-5 object-contain" />
                      <span class="absolute h-1 w-[3.4rem] -rotate-[38deg] rounded-full bg-[#E83C9D] max-sm:h-[3px] max-sm:w-11"></span>
                    </div>
                  </div>
                </div>

                <div
                  class="absolute bottom-5 left-[8%] right-[8%] grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-sm font-black text-[#8D80A9] max-sm:text-xs"
                >
                  <span class="h-0.5 rounded-full bg-[#8D80A9]/20"></span>
                  <strong>Ruta no disponible</strong>
                  <span class="h-0.5 rounded-full bg-[#8D80A9]/20"></span>
                </div>
              </div>

              <div class="mt-5 grid gap-3 sm:grid-cols-3">
                <RouterLink
                  to="/"
                  class="group flex h-[3.05rem] items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#E83C9D] to-[#7430D0] px-5 text-sm font-black text-white shadow-[0_16px_32px_rgba(132,56,194,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_38px_rgba(132,56,194,0.3)]"
                >
                  <img
                    src="/images/paws-icon.png"
                    alt=""
                    aria-hidden="true"
                    class="h-[1.15rem] w-[1.15rem] object-contain brightness-0 invert"
                  />
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
                  class="h-3.5 w-3.5 object-contain opacity-35"
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
