<template>
  <main class="min-h-screen overflow-hidden bg-[#F4EFFA] text-[#15152E]">
    <section class="relative flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-[#6D28A8]/20 blur-3xl"></div>
        <div class="absolute -right-20 top-16 h-80 w-80 rounded-full bg-[#E52C91]/20 blur-3xl"></div>
      </div>

      <div class="relative grid w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_80px_rgba(64,33,94,0.16)] lg:grid-cols-[0.95fr_1.05fr]">
        <section class="flex min-h-[700px] flex-col justify-center px-5 py-8 sm:px-8 lg:px-10">
          <div class="mx-auto w-full max-w-lg">
            <RouterLink to="/" class="mb-8 inline-flex items-center gap-3">
              <span class="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#6824A5] to-[#E52C91] text-xl font-black text-white">L</span>
              <span>
                <span class="block text-xs font-bold uppercase tracking-[0.32em] text-[#9A89B4]">Ladralab</span>
                <span class="block font-bold text-[#15152E]">Cuidado conectado</span>
              </span>
            </RouterLink>

            <div class="mb-7">
              <p class="text-xs font-bold uppercase tracking-[0.34em] text-[#9A6AC8]">Registro</p>
              <h1 class="mt-2 text-3xl font-black text-[#15152E]">Crear cuenta de tutor</h1>
              <p class="mt-3 leading-7 text-[#657491]">
                Registra tu cuenta para gestionar tus mascotas, reservas y seguimientos publicados por el centro.
              </p>
            </div>

            <form class="space-y-5" @submit.prevent="submitRegister">
              <div class="grid gap-4 sm:grid-cols-2">
                <label class="block sm:col-span-2">
                  <span class="mb-2 block text-sm font-semibold text-[#33415F]">Nombre completo</span>
                  <input
                    v-model.trim="form.name"
                    type="text"
                    autocomplete="name"
                    placeholder="Ana Martín"
                    class="field"
                    :class="errors.name ? 'field-error' : ''"
                  />
                  <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
                </label>

                <label class="block">
                  <span class="mb-2 block text-sm font-semibold text-[#33415F]">Email</span>
                  <input
                    v-model.trim="form.email"
                    type="email"
                    autocomplete="email"
                    placeholder="ana@email.com"
                    class="field"
                    :class="errors.email ? 'field-error' : ''"
                  />
                  <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
                </label>

                <label class="block">
                  <span class="mb-2 block text-sm font-semibold text-[#33415F]">Teléfono</span>
                  <input
                    v-model.trim="form.phone"
                    type="tel"
                    autocomplete="tel"
                    placeholder="600 123 456"
                    class="field"
                    :class="errors.phone ? 'field-error' : ''"
                  />
                  <span v-if="errors.phone" class="error-text">{{ errors.phone }}</span>
                </label>

                <label class="block">
                  <span class="mb-2 block text-sm font-semibold text-[#33415F]">Contraseña</span>
                  <input
                    v-model="form.password"
                    type="password"
                    autocomplete="new-password"
                    placeholder="Mínimo 8 caracteres"
                    class="field"
                    :class="errors.password ? 'field-error' : ''"
                  />
                  <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
                </label>

                <label class="block">
                  <span class="mb-2 block text-sm font-semibold text-[#33415F]">Repetir contraseña</span>
                  <input
                    v-model="form.password_confirmation"
                    type="password"
                    autocomplete="new-password"
                    placeholder="Repite la contraseña"
                    class="field"
                    :class="errors.password_confirmation ? 'field-error' : ''"
                  />
                  <span v-if="errors.password_confirmation" class="error-text">{{ errors.password_confirmation }}</span>
                </label>
              </div>

              <label class="flex cursor-pointer gap-3 rounded-2xl border border-[#E8DFF2] bg-[#FCFAFE] p-4 text-sm leading-6 text-[#596983]">
                <input v-model="form.accept" type="checkbox" class="mt-1 h-4 w-4 rounded border-[#CDBBDF] text-[#6B25A6] focus:ring-[#6B25A6]" />
                <span>
                  Acepto crear una cuenta de tutor para recibir información de mis mascotas y gestionar mis reservas.
                </span>
              </label>
              <span v-if="errors.accept" class="error-text">{{ errors.accept }}</span>

              <div v-if="feedback.message" class="rounded-2xl border px-4 py-3 text-sm font-semibold" :class="feedback.type === 'error' ? 'border-red-100 bg-red-50 text-red-600' : 'border-emerald-100 bg-emerald-50 text-emerald-700'">
                {{ feedback.message }}
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#6D28A8] to-[#E52C91] px-5 text-sm font-black text-white shadow-[0_14px_30px_rgba(109,40,168,0.24)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {{ isSubmitting ? 'Creando cuenta...' : 'Crear cuenta' }}
              </button>
            </form>

            <p class="mt-7 text-center text-sm font-semibold text-[#657491]">
              ¿Ya tienes cuenta?
              <RouterLink to="/login" class="text-[#6D28A8] hover:text-[#E52C91]">Iniciar sesión</RouterLink>
            </p>
          </div>
        </section>

        <section class="relative hidden min-h-[700px] overflow-hidden bg-gradient-to-br from-[#5B1B8F] via-[#8A2BB0] to-[#E52C91] p-10 text-white lg:block">
          <div class="absolute -right-20 top-20 h-80 w-80 rounded-full border border-white/15"></div>
          <div class="absolute -left-28 bottom-10 h-96 w-96 rounded-full border border-white/15"></div>

          <div class="relative flex h-full flex-col justify-between">
            <div class="ml-auto grid w-full max-w-sm grid-cols-2 gap-4">
              <RouterLink to="/login" class="rounded-2xl border border-white/18 bg-white/12 px-5 py-4 text-center text-sm font-black text-white transition hover:bg-white/18">
                Login
              </RouterLink>
              <RouterLink to="/" class="rounded-2xl bg-white px-5 py-4 text-center text-sm font-black text-[#64229B] transition hover:bg-white/90">
                Inicio
              </RouterLink>
            </div>

            <div class="relative max-w-xl">
              <p class="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white/85 ring-1 ring-white/20">
                Cuenta para clientes y tutores
              </p>
              <h2 class="font-ladralab-brush text-6xl leading-none text-white drop-shadow-sm xl:text-7xl">
                Tu espacio personal
              </h2>
              <p class="mt-6 max-w-lg text-lg leading-8 text-white/82">
                Consulta tus mascotas, próximas reservas y los resúmenes diarios publicados por el equipo.
              </p>
            </div>

            <div class="relative grid gap-4">
              <article class="rounded-3xl bg-white/12 p-5 ring-1 ring-white/16 backdrop-blur">
                <p class="text-sm font-bold uppercase tracking-[0.24em] text-white/65">Importante</p>
                <p class="mt-3 leading-7 text-white/85">
                  Las cuentas de staff y admin se crearán desde el panel de administración, no desde el registro público.
                </p>
              </article>
              <div class="grid grid-cols-3 gap-4">
                <article class="rounded-3xl bg-white/12 p-4 ring-1 ring-white/16 backdrop-blur">
                  <p class="text-3xl font-black">01</p>
                  <p class="mt-2 text-sm font-semibold text-white/75">mascotas</p>
                </article>
                <article class="rounded-3xl bg-white/12 p-4 ring-1 ring-white/16 backdrop-blur">
                  <p class="text-3xl font-black">02</p>
                  <p class="mt-2 text-sm font-semibold text-white/75">reservas</p>
                </article>
                <article class="rounded-3xl bg-white/12 p-4 ring-1 ring-white/16 backdrop-blur">
                  <p class="text-3xl font-black">03</p>
                  <p class="mt-2 text-sm font-semibold text-white/75">seguimientos</p>
                </article>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
  accept: false,
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
  accept: '',
})

const feedback = reactive({
  type: '',
  message: '',
})

const isSubmitting = ref(false)

function clearErrors() {
  Object.keys(errors).forEach((key) => {
    errors[key] = ''
  })
  feedback.type = ''
  feedback.message = ''
}

function validateForm() {
  clearErrors()

  if (!form.name) errors.name = 'Introduce tu nombre.'
  if (!form.email) errors.email = 'Introduce tu email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Introduce un email válido.'

  if (!form.phone) errors.phone = 'Introduce un teléfono de contacto.'
  if (!form.password) errors.password = 'Introduce una contraseña.'
  else if (form.password.length < 8) errors.password = 'La contraseña debe tener al menos 8 caracteres.'

  if (!form.password_confirmation) errors.password_confirmation = 'Repite la contraseña.'
  else if (form.password !== form.password_confirmation) errors.password_confirmation = 'Las contraseñas no coinciden.'

  if (!form.accept) errors.accept = 'Debes aceptar la creación de la cuenta.'

  return Object.values(errors).every((value) => !value)
}

async function submitRegister() {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    // Cuando se conecte backend:
    // await authService.register({
    //   name: form.name,
    //   email: form.email,
    //   phone: form.phone,
    //   password: form.password,
    //   password_confirmation: form.password_confirmation,
    //   role: 'cliente',
    // })

    await new Promise((resolve) => setTimeout(resolve, 500))

    feedback.type = 'success'
    feedback.message = 'Cuenta creada correctamente. Ya puedes iniciar sesión.'

    setTimeout(() => {
      router.push('/login')
    }, 700)
  } catch (error) {
    feedback.type = 'error'
    feedback.message = 'No se pudo crear la cuenta. Revisa los datos e inténtalo de nuevo.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.field {
  height: 3rem;
  width: 100%;
  border-radius: 1rem;
  border: 1px solid #d8cbea;
  background: #fff;
  padding: 0 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.field::placeholder {
  color: #a7b0c4;
}

.field:focus {
  border-color: #7a2cb2;
  box-shadow: 0 0 0 4px rgba(122, 44, 178, 0.1);
}

.field-error {
  border-color: #fca5a5;
}

.field-error:focus {
  border-color: #f87171;
  box-shadow: 0 0 0 4px rgba(254, 226, 226, 0.9);
}

.error-text {
  margin-top: 0.5rem;
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  color: #ef4444;
}
</style>
