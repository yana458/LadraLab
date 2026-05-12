<template>
  <section class="relative">
    <!-- Toasts fijos -->
    <div class="pointer-events-none fixed right-6 top-6 z-[70] flex w-full max-w-md flex-col gap-3">
      <div
        v-if="successMessage"
        class="pointer-events-auto flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 shadow-lg"
      >
        <span class="mt-0.5 text-base">🐾</span>
        <p>{{ successMessage }}</p>
      </div>

      <div
        v-if="loadError"
        class="pointer-events-auto flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-lg"
      >
        <span class="mt-0.5 text-base">⚠️</span>
        <p>{{ loadError }}</p>
      </div>

      <div
        v-if="actionError"
        class="pointer-events-auto flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-lg"
      >
        <span class="mt-0.5 text-base">⚠️</span>
        <p>{{ actionError }}</p>
      </div>
    </div>

    <div class="mx-auto max-w-7xl space-y-6">
      <template v-if="isLoading">
        <section
          class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#5A208E] via-[#7A2EA6] to-[#E02890] p-6 text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
        >
          <div class="animate-pulse">
            <div class="flex items-start justify-between gap-6">
              <div class="h-10 w-52 rounded bg-white/20"></div>

              <div class="grid w-[320px] gap-3 sm:grid-cols-2">
                <div class="h-11 rounded-2xl bg-white/20"></div>
                <div class="h-11 rounded-2xl bg-white/20"></div>
              </div>
            </div>

            <div class="mt-12 max-w-3xl">
              <div class="h-14 w-80 rounded bg-white/20"></div>
              <div class="mt-5 h-5 w-full max-w-2xl rounded bg-white/15"></div>
            </div>
          </div>
        </section>

        <div class="grid gap-6 xl:grid-cols-[minmax(0,1.12fr)_360px] xl:items-stretch">
          <div class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm">
            <div class="animate-pulse space-y-4">
              <div class="h-12 rounded-2xl bg-[#FAF8FC]"></div>
              <div class="h-12 rounded-2xl bg-[#FAF8FC]"></div>

              <div class="grid gap-4 sm:grid-cols-2">
                <div class="h-12 rounded-2xl bg-[#FAF8FC]"></div>
                <div class="h-12 rounded-2xl bg-[#FAF8FC]"></div>
              </div>

              <div class="h-32 rounded-2xl bg-[#FAF8FC]"></div>
              <div class="h-20 rounded-2xl bg-[#FAF8FC]"></div>
            </div>
          </div>

          <div class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm">
            <div class="animate-pulse space-y-4">
              <div class="h-24 rounded-2xl bg-[#FAF8FC]"></div>
              <div class="h-24 rounded-2xl bg-[#FAF8FC]"></div>
              <div class="h-24 rounded-2xl bg-[#FAF8FC]"></div>
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="pet">
        <header
          class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#5A208E] via-[#7A2EA6] to-[#E02890] text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
        >
          <div class="flex min-h-[385px] flex-col p-5 sm:p-6 lg:p-7">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <RouterLink
                  :to="{ name: 'my-pet-detail', params: { id: petId } }"
                  class="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  ← Volver a la ficha
                </RouterLink>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 lg:w-[320px]">
                <RouterLink
                  :to="{ name: 'my-pet-detail', params: { id: petId } }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Ver ficha
                </RouterLink>

                <RouterLink
                  :to="{ name: 'my-reservations-new', query: { pet: petId } }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:bg-[#F8F2FF]"
                >
                  Nueva reserva
                </RouterLink>
              </div>
            </div>

            <div class="mt-10 max-w-3xl">
              <h1 class="font-ladralab-brush text-5xl leading-none tracking-tight sm:text-6xl">
                Editar ficha
              </h1>

              <p class="mt-4 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                Actualiza los datos principales de {{ previewPet.name || 'tu mascota' }} y revisa a la derecha cómo quedará su perfil.
              </p>
            </div>
          </div>
        </header>

        <section class="grid gap-6 xl:grid-cols-[minmax(0,1.12fr)_360px] xl:items-stretch">
          <article class="flex h-full flex-col rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
            <div>
              <h2 class="text-lg font-bold tracking-tight text-slate-900">
                Editar ficha
              </h2>

              <p class="mt-1 text-sm text-slate-500">
                Modifica solo los datos necesarios y guarda los cambios cuando termines.
              </p>
            </div>

            <div class="mt-5 flex h-full flex-col">
              <PetForm
                :initial-data="initialFormData"
                :external-errors="formErrors"
                :is-submitting="isSubmitting"
                :submit-text="'Guardar cambios'"
                :submitting-text="'Guardando...'"
                :cancel-text="'Cancelar'"
                :show-cancel="true"
                @change="handleDraftChange"
                @submit="handlePetFormSubmit"
                @cancel="goBackToDetail"
              />

              <div class="mt-5 rounded-[22px] border border-[#EEE7F6] bg-[#FCFBFE] p-4">
                <div class="flex items-start gap-3">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#F3ECFB] text-[#5A208E]">
                    🐾
                  </div>

                  <div>
                    <p class="text-sm font-semibold text-slate-900">
                      {{ saveReminderTitle }}
                    </p>

                    <p class="mt-1 text-sm leading-6 text-slate-500">
                      {{ saveReminderText }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article class="flex h-full flex-col rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
            <h2 class="text-lg font-bold tracking-tight text-slate-900">
              Vista previa
            </h2>

            <p class="mt-1 text-sm text-slate-500">
              Los cambios se reflejan aquí mientras editas.
            </p>

            <div class="mt-5 flex-1 rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-5">
              <div class="flex items-center gap-4">
                <div
                  class="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[24px] bg-gradient-to-br from-[#EAE9EF] to-[#D7CBE7] text-2xl font-bold text-[#514980]"
                >
                  <img
                    v-if="getPetImage(previewPet)"
                    :src="getPetImage(previewPet)"
                    :alt="previewPet.name"
                    class="h-full w-full object-cover"
                  />

                  <span v-else>
                    {{ (previewPet.name || 'M').charAt(0) }}
                  </span>
                </div>

                <div class="min-w-0">
                  <h3 class="truncate text-lg font-bold text-slate-900">
                    {{ previewPet.name || 'Sin nombre' }}
                  </h3>

                  <p class="mt-1 text-sm text-slate-500">
                    {{ previewPet.breed || 'Raza no indicada' }}
                  </p>
                </div>
              </div>

              <div class="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div class="rounded-2xl bg-white p-4 ring-1 ring-[#F0E8F7]">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Tamaño
                  </p>

                  <p class="mt-1 text-sm font-semibold text-slate-800">
                    {{ sizeLabel(previewPet.size) }}
                  </p>
                </div>

                <div class="rounded-2xl bg-white p-4 ring-1 ring-[#F0E8F7]">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Edad
                  </p>

                  <p class="mt-1 text-sm font-semibold text-slate-800">
                    {{ ageLabel(previewPet.birth_date) }}
                  </p>
                </div>
              </div>

              <div class="mt-3 rounded-2xl bg-white p-4 ring-1 ring-[#F0E8F7]">
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Observaciones
                </p>

                <p class="mt-2 text-sm leading-6 text-slate-600">
                  {{ previewPet.care_notes || 'No hay observaciones añadidas en esta ficha.' }}
                </p>
              </div>
            </div>
          </article>
        </section>
      </template>

      <template v-else-if="!isLoading && !loadError">
        <div
          class="rounded-[28px] border border-dashed border-[#DCCFEA] bg-white px-6 py-14 text-center shadow-sm"
        >
          <div
            class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3ECFB] text-xl font-bold text-[#5A208E]"
          >
            🐾
          </div>

          <h1 class="mt-4 text-xl font-bold text-slate-900">
            No hemos encontrado esta ficha
          </h1>

          <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Puede que la mascota ya no esté disponible o que el enlace no sea correcto.
          </p>

          <RouterLink
            :to="{ name: 'my-pets' }"
            class="mt-6 inline-flex items-center justify-center rounded-2xl bg-[#5A208E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4B1A77]"
          >
            Volver a mis mascotas
          </RouterLink>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import PetForm from '@/components/pets/PetForm.vue'
import { getMyPetById, updatePet } from '@/services/petsService'
import { getReadableErrorMessage, getValidationErrors } from '@/utils/errorMessages'
import { uiMessages } from '@/utils/uiMessages'

const route = useRoute()
const router = useRouter()
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

const pet = ref(null)
const petDraft = ref({})
const isLoading = ref(false)
const isSubmitting = ref(false)
const loadError = ref('')
const actionError = ref('')
const successMessage = ref('')
const formErrors = ref({})

const petId = Number(route.params.id)

let redirectTimeoutId = null

onMounted(() => {
  loadPet()
})

onBeforeUnmount(() => {
  if (redirectTimeoutId) {
    clearTimeout(redirectTimeoutId)
  }
})

const initialFormData = computed(() => {
  if (!pet.value) {
    return {
      name: '',
      breed: '',
      size: '',
      birth_date: '',
      care_notes: '',
      photo_path: '',
      photo_preview: '',
    }
  }

  return {
    name: pet.value.name || '',
    breed: pet.value.breed || '',
    size: pet.value.size || '',
    birth_date: pet.value.birth_date || '',
    care_notes: pet.value.care_notes || '',
    photo_path: pet.value.photo_path || '',
    photo_preview: pet.value.photo_preview || '',
  }
})

const previewPet = computed(() => {
  return {
    ...(pet.value || {}),
    ...(petDraft.value || {}),
  }
})

const saveReminderTitle = computed(() => {
  return previewPet.value?.care_notes
    ? 'Revisa los cambios antes de guardar'
    : 'Deja la ficha preparada'
})

const saveReminderText = computed(() => {
  return previewPet.value?.care_notes
    ? 'Comprueba nombre, raza, tamaño y observaciones para que la ficha quede lista para futuras reservas.'
    : 'Añade solo la información importante para el centro, como alergias, medicación o comportamiento.'
})

async function loadPet() {
  isLoading.value = true
  loadError.value = ''
  actionError.value = ''
  successMessage.value = ''

  try {
    pet.value = await getMyPetById(petId)

    petDraft.value = {
      name: pet.value?.name || '',
      breed: pet.value?.breed || '',
      size: pet.value?.size || '',
      birth_date: pet.value?.birth_date || '',
      care_notes: pet.value?.care_notes || '',
      photo_path: pet.value?.photo_path || '',
      photo_preview: pet.value?.photo_preview || '',
    }
  } catch (error) {
    console.error(error)

    loadError.value = getReadableErrorMessage(
      error,
      uiMessages.pets?.errors?.load || 'No hemos podido cargar la ficha de tu mascota.',
    )
  } finally {
    isLoading.value = false
  }
}

function handleDraftChange(payload) {
  petDraft.value = {
    ...petDraft.value,
    ...payload,
  }
}

function normalizePetPayload(payload) {
  return {
    ...payload,
    name: payload.name?.trim() || '',
    breed: payload.breed?.trim() || '',
    size: payload.size || '',
    birth_date: payload.birth_date || null,
    care_notes: payload.care_notes?.trim() || '',
    photo_path: payload.photo_path || '',
  }
}

async function handlePetFormSubmit(payload) {
  isSubmitting.value = true
  actionError.value = ''
  successMessage.value = ''
  formErrors.value = {}

  try {
    const updatedPet = await updatePet(petId, normalizePetPayload(payload))

    pet.value = updatedPet

    petDraft.value = {
      name: updatedPet?.name || '',
      breed: updatedPet?.breed || '',
      size: updatedPet?.size || '',
      birth_date: updatedPet?.birth_date || '',
      care_notes: updatedPet?.care_notes || '',
      photo_path: updatedPet?.photo_path || '',
      photo_preview: updatedPet?.photo_preview || '',
    }

    successMessage.value =
      uiMessages.pets?.success?.updatedAndRedirecting ||
      'Ficha guardada correctamente. Volvemos a su perfil en un momento.'

    if (redirectTimeoutId) {
      clearTimeout(redirectTimeoutId)
    }

    redirectTimeoutId = setTimeout(() => {
      router.push({ name: 'my-pet-detail', params: { id: petId } })
    }, 1100)
  } catch (error) {
    console.error(error)

    formErrors.value = getValidationErrors(error)

    actionError.value = getReadableErrorMessage(
      error,
      uiMessages.pets?.errors?.save || 'No se pudieron guardar los cambios de la ficha.',
    )
  } finally {
    isSubmitting.value = false
  }
}

function goBackToDetail() {
  router.push({ name: 'my-pet-detail', params: { id: petId } })
}

function getPetImage(petItem) {
  const value =
    petItem?.photo_preview ||
    petItem?.photo_url ||
    petItem?.photo_path ||
    ''

  if (!value) return ''

  if (
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('blob:') ||
    value.startsWith('data:')
  ) {
    return value
  }

  const cleanPath = value.replace(/^\/+/, '')

  if (cleanPath.startsWith('storage/')) {
    return `${API_BASE_URL}/${cleanPath}`
  }

  return `${API_BASE_URL}/storage/${cleanPath}`
}

function sizeLabel(size) {
  const labels = {
    toy: 'Toy',
    small: 'Pequeño',
    medium: 'Mediano',
    large: 'Grande',
  }

  return labels[size] || 'No indicado'
}

function ageLabel(dateString) {
  if (!dateString) return 'No indicada'

  const birthDate = new Date(dateString)
  const today = new Date()

  let years = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  const dayDiff = today.getDate() - birthDate.getDate()

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) years--

  if (years <= 0) return 'Menos de 1 año'
  if (years === 1) return '1 año'

  return `${years} años`
}
</script>

<style scoped>
.font-ladralab-brush {
  font-family: 'Caveat Brush', 'Brush Script MT', 'Segoe Script', cursive;
  font-weight: 700;
}
</style>