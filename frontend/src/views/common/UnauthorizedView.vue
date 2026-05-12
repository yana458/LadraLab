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
  <main class="unauthorized-page min-h-screen overflow-hidden bg-[#F6F0FF] text-[#24113F]">
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

              <div class="unauthorized-illustration-shell">
                <img
                  src="/images/ladralab-unauthorized.png"
                  alt="Ilustración de LadraLab con seguimientos y reservas"
                  class="unauthorized-illustration"
                />
              </div>
            </div>
          </section>

          <section class="relative flex min-h-[620px] items-center justify-center bg-white px-6 py-5 sm:px-10 lg:px-12">
            <div class="w-full max-w-2xl">
              <div class="mb-4 flex justify-center lg:hidden">
                <RouterLink to="/" class="inline-flex w-fit items-center self-center">
                  <img src="/images/ladralab-logo.png" alt="LadraLab" class="w-52 drop-shadow-[0_12px_20px_rgba(74,24,122,0.14)] xl:w-60" />
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

              <div class="permission-card">
                <div class="permission-badge">
                  <span>403</span>
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
                  <img src="/images/paws-icon.png" alt="" class="button-paw" aria-hidden="true" />
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
                  class="separator-paw"
                  aria-hidden="true"
                />

                <span class="h-px flex-1 bg-current"></span>
              </div>

              <div class="rounded-[1.45rem] border border-[#E9DDF4] bg-[#FCFAFF] p-4">
                <p class="text-sm font-black text-[#24113F]">
                  ¿Necesitas usar otra cuenta?
                </p>

                <RouterLink
                  to="/login"
                  class="mt-2 inline-flex text-sm font-black text-[#7330AC] transition hover:text-[#E83C9D]"
                >
                  Ir al inicio de sesión
                </RouterLink>
              </div>
            </div>
          </section>
        </div>

        <section class="mt-2 grid gap-3 md:grid-cols-3">
          <article
            v-for="benefit in unauthorizedBenefits"
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
.unauthorized-page {
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

.unauthorized-illustration-shell {
  position: relative;
  display: flex;
  min-height: 155px;
  align-items: flex-start;
  justify-content: center;
  margin-top: 0.4rem;
  padding: 0.1rem 0.5rem 0;
  overflow: hidden;
  transform: translateX(-40px);
}

.unauthorized-illustration-shell::before {
  position: absolute;
  left: 12%;
  right: 12%;
  bottom: 0;
  height: 84%;
  content: '';
  border-radius: 999px;
  background: radial-gradient(circle, rgba(236, 221, 255, 0.98), rgba(236, 221, 255, 0));
}

.unauthorized-illustration {
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

.permission-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  border: 1px solid #e9ddf4;
  border-radius: 1.45rem;
  background: linear-gradient(135deg, #fcfaff, #fff);
  padding: 1rem;
  box-shadow: 0 10px 24px rgba(86, 45, 126, 0.06);
}

.permission-badge {
  display: grid;
  min-width: 4rem;
  width: 4rem;
  height: 4rem;
  place-items: center;
  border-radius: 1.25rem;
  background: linear-gradient(135deg, #f6efff, #fff5fb);
  color: #7430d0;
  font-weight: 900;
  box-shadow: inset 0 0 0 1px rgba(141, 85, 199, 0.08);
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
  .permission-card {
    flex-direction: column;
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