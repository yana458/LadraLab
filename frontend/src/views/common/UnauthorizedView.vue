<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const unauthorizedBenefits = [
  {
    title: 'Acceso protegido',
    text: 'Cada perfil solo puede entrar en las secciones que le corresponden.',
    image: '/images/safe-access-icon.png',
    alt: 'Icono de perfiles',
  },
  {
    title: 'Información segura',
    text: 'Los datos de mascotas, reservas y seguimientos se muestran según permisos.',
    image: '/images/safe-info-icon.png',
    alt: 'Icono de seguimiento',
  },
  {
    title: 'Vuelve a tu espacio',
    text: 'Puedes regresar a tu panel o iniciar sesión con otra cuenta autorizada.',
    image: '/images/safe-way-back-icon.png',
    alt: 'Icono de calendario',
  },
]

function goBack() {
  if (window.history.length > 1) {
    router.back()
    return
  }

  router.push('/dashboard')
}
</script>

<template>
  <main class="relative isolate min-h-screen overflow-hidden bg-[#F6F0FF] text-[#24113F]">
    <section class="relative flex min-h-screen items-center justify-center px-4 py-3 sm:px-6 lg:px-8">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <span
          class="absolute -left-32 top-24 h-88 w-88 rounded-full bg-[radial-gradient(circle,rgba(232,60,157,0.16),rgba(232,60,157,0))] opacity-70 blur-[1px]"
        ></span>

        <span
          class="absolute -right-36 bottom-8 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(116,48,208,0.16),rgba(116,48,208,0))] opacity-70 blur-[1px]"
        ></span>

        <span
          class="absolute -bottom-60 left-[52%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(196,153,255,0.2),rgba(196,153,255,0))] opacity-70 blur-[1px]"
        ></span>

        <img
          src="/images/paws-icon.png"
          alt=""
          aria-hidden="true"
          class="absolute left-[3.4%] top-[8%] w-6 rotate-[-18deg] opacity-15 saturate-90"
        />
        <img
          src="/images/paws-icon.png"
          alt=""
          aria-hidden="true"
          class="absolute left-[5.5%] top-[11%] w-5 rotate-[10deg] opacity-15 saturate-90"
        />
        <img
          src="/images/paws-icon.png"
          alt=""
          aria-hidden="true"
          class="absolute left-[3.9%] top-[15.2%] w-5 rotate-[-8deg] opacity-15 saturate-90"
        />
        <img
          src="/images/paws-icon.png"
          alt=""
          aria-hidden="true"
          class="absolute left-[6.2%] top-[18%] w-4 rotate-[14deg] opacity-15 saturate-90"
        />
        <img
          src="/images/paws-icon.png"
          alt=""
          aria-hidden="true"
          class="absolute bottom-[8%] right-[3.4%] w-6 rotate-[16deg] opacity-15 saturate-90"
        />
        <img
          src="/images/paws-icon.png"
          alt=""
          aria-hidden="true"
          class="absolute bottom-[11.2%] right-[5.6%] w-5 rotate-[-10deg] opacity-15 saturate-90"
        />
        <img
          src="/images/paws-icon.png"
          alt=""
          aria-hidden="true"
          class="absolute bottom-[15.5%] right-[3.8%] w-5 rotate-[8deg] opacity-15 saturate-90"
        />
        <img
          src="/images/paws-icon.png"
          alt=""
          aria-hidden="true"
          class="absolute bottom-[18.2%] right-[6.4%] w-4 rotate-[-14deg] opacity-15 saturate-90"
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
                  Acceso restringido
                </p>

                <h1 class="text-[2.05rem] font-black leading-tight text-[#24113F] xl:text-[2.45rem]">
                  Esta zona está,
                  <span class="block text-[#E83C9D]">protegida por permisos</span>
                </h1>

                <p class="mt-4 max-w-lg text-[1rem] leading-8 text-[#635778]">
                  LadraLab organiza el acceso según el perfil de cada persona para mantener la información clara, ordenada y segura.
                </p>
              </div>

            </div>
          </section>

          <section class="relative flex min-h-[620px] items-center justify-center bg-white px-6 py-5 sm:px-10 lg:px-12">
            <div class="w-full max-w-2xl">
              <div class="mb-4 flex justify-center lg:hidden">
                <RouterLink to="/" class="inline-flex w-fit items-center self-center">
                  <img
                    src="/images/ladralab-logo.png"
                    alt="LadraLab"
                    class="w-52 drop-shadow-[0_12px_20px_rgba(74,24,122,0.14)] xl:w-60"
                  />
                </RouterLink>
              </div>

              <div class="mb-4">
                <p class="text-sm font-black text-[#E83C9D]">Sin permisos</p>
                <h2 class="mt-1.5 text-[2rem] font-black tracking-tight text-[#24113F] sm:text-[2.15rem]">
                  No puedes acceder a esta sección
                </h2>
                <p class="mt-2 leading-7 text-[#6F6780]">
                  Tu cuenta está activa, pero no tiene permisos para ver esta pantalla. Puedes volver a tu panel o entrar con otra cuenta.
                </p>
              </div>

              <div
                class="flex items-start gap-4 rounded-[1.45rem] border border-[#E9DDF4] bg-gradient-to-br from-[#FCFAFF] to-white p-4 shadow-[0_10px_24px_rgba(86,45,126,0.06)] max-sm:flex-col"
              >
                <div
                  class="grid h-16 w-16 min-w-16 place-items-center rounded-[1.25rem] bg-gradient-to-br from-[#F6EFFF] to-[#FFF5FB] font-black text-[#7430D0] shadow-[inset_0_0_0_1px_rgba(141,85,199,0.08)]"
                >
                  403
                </div>

                <div>
                  <p class="text-base font-black text-[#24113F]">
                    Acceso no autorizado
                  </p>
                  <p class="mt-1.5 text-sm leading-6 text-[#6F6780]">
                    Si crees que deberías tener acceso, contacta con la administración del centro para revisar tu perfil.
                  </p>
                </div>
              </div>

              <div class="mt-5 grid gap-3 sm:grid-cols-2">
                <RouterLink
                  to="/dashboard"
                  class="group flex h-[3.05rem] items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#E83C9D] to-[#7430D0] px-5 text-base font-black text-white shadow-[0_16px_32px_rgba(132,56,194,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_38px_rgba(132,56,194,0.3)]"
                >
                  <img
                    src="/images/paws-icon.png"
                    alt=""
                    aria-hidden="true"
                    class="h-[1.15rem] w-[1.15rem] object-contain brightness-0 invert"
                  />
                  Ir a mi panel
                </RouterLink>

                <button
                  type="button"
                  class="flex h-[3.05rem] items-center justify-center rounded-2xl border border-[#E4D6F0] bg-[#FCFAFF] px-5 text-base font-black text-[#7330AC] transition hover:-translate-y-0.5 hover:border-[#C8A8E2] hover:bg-[#F8F1FF]"
                  @click="goBack"
                >
                  Volver atrás
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

              <RouterLink
                to="/login"
                class="inline-flex h-[3.05rem] w-full items-center justify-center rounded-2xl border border-[#E4D6F0] bg-[#FCFAFF] px-5 text-base font-black text-[#7330AC] transition hover:-translate-y-0.5 hover:border-[#C8A8E2] hover:bg-[#F8F1FF]"
              >
                Ir al inicio de sesión
              </RouterLink>
            </div>
          </section>
        </div>

        <section class="mt-2 grid gap-3 md:grid-cols-3">
          <article
            v-for="benefit in unauthorizedBenefits"
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
