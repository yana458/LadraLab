<template>
  <form class="space-y-5" @submit.prevent="handleSubmit">
    <div class="rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4 sm:p-5">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div
          class="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[26px] bg-gradient-to-br from-[#EAE9EF] to-[#D7CBE7] text-3xl font-bold text-[#514980]"
        >
          <img
            v-if="previewImage"
            :src="previewImage"
            :alt="localForm.name || 'Mascota'"
            class="h-full w-full object-cover"
          />
          <span v-else>{{ avatarInitial }}</span>
        </div>

        <div class="min-w-0 flex-1">
          <h3 class="text-base font-bold tracking-tight text-slate-900">
            Foto de perfil
          </h3>

          <p class="mt-1 text-sm leading-6 text-slate-500">
            Puedes elegir una imagen desde tu dispositivo y revisar la vista previa antes de guardar.
          </p>

          <div class="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              @click="openFilePicker"
              class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#E9D7E8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#E02890]/30 hover:text-[#A22068] hover:ring-4 hover:ring-[#E02890]/10"
            >
              {{ previewImage ? 'Cambiar foto' : 'Subir foto' }}
            </button>

            <button
              v-if="previewImage"
              type="button"
              @click="clearPhoto"
              class="inline-flex h-11 items-center justify-center rounded-2xl border border-red-200 bg-white px-4 text-sm font-semibold text-red-700 transition hover:bg-red-50"
            >
              Quitar foto
            </button>
          </div>

          <input
            ref="fileInputRef"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/jpg"
            class="hidden"
            @change="handleFileChange"
          />

          <p class="mt-2 text-xs leading-5 text-slate-400">
            Formatos recomendados: JPG, PNG o WEBP. Tamaño máximo: 5 MB.
          </p>

          <p v-if="getFieldError('photo')" class="mt-2 text-xs font-medium text-red-600">
            {{ getFieldError('photo') }}
          </p>
        </div>
      </div>
    </div>

    <label class="block">
      <span class="mb-2 block text-sm font-semibold text-slate-700">Nombre</span>
      <input
        v-model.trim="localForm.name"
        type="text"
        class="h-12 w-full rounded-2xl border border-[#DCCFEA] bg-[#FCFBFE] px-4 text-sm text-slate-900 outline-none transition focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
        placeholder="Ej. Kira"
      />

      <p v-if="getFieldError('name')" class="mt-2 text-xs font-medium text-red-600">
        {{ getFieldError('name') }}
      </p>
    </label>

    <label class="block">
      <span class="mb-2 block text-sm font-semibold text-slate-700">Raza</span>
      <input
        v-model.trim="localForm.breed"
        type="text"
        class="h-12 w-full rounded-2xl border border-[#DCCFEA] bg-[#FCFBFE] px-4 text-sm text-slate-900 outline-none transition focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
        placeholder="Ej. Podenco"
      />

      <p v-if="getFieldError('breed')" class="mt-2 text-xs font-medium text-red-600">
        {{ getFieldError('breed') }}
      </p>
    </label>

    <div class="grid gap-4 sm:grid-cols-2">
      <label class="block">
        <span class="mb-2 block text-sm font-semibold text-slate-700">Tamaño</span>
        <select
          v-model="localForm.size"
          class="h-12 w-full rounded-2xl border border-[#DCCFEA] bg-[#FCFBFE] px-4 text-sm text-slate-900 outline-none transition focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
        >
          <option value="">Selecciona tamaño</option>
          <option value="toy">Toy</option>
          <option value="small">Pequeño</option>
          <option value="medium">Mediano</option>
          <option value="large">Grande</option>
        </select>

        <p v-if="getFieldError('size')" class="mt-2 text-xs font-medium text-red-600">
          {{ getFieldError('size') }}
        </p>
      </label>

      <label class="block">
        <span class="mb-2 block text-sm font-semibold text-slate-700">Fecha de nacimiento</span>
        <input
          v-model="localForm.birth_date"
          type="date"
          class="h-12 w-full rounded-2xl border border-[#DCCFEA] bg-[#FCFBFE] px-4 text-sm text-slate-900 outline-none transition focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
        />

        <p v-if="getFieldError('birth_date')" class="mt-2 text-xs font-medium text-red-600">
          {{ getFieldError('birth_date') }}
        </p>
      </label>
    </div>

    <label class="block">
      <span class="mb-2 block text-sm font-semibold text-slate-700">Observaciones</span>
      <textarea
        v-model.trim="localForm.care_notes"
        rows="5"
        class="w-full rounded-2xl border border-[#DCCFEA] bg-[#FCFBFE] px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
        placeholder="Ej. sensibilidad digestiva, medicación, comportamiento al llegar..."
      ></textarea>

      <p v-if="getFieldError('care_notes')" class="mt-2 text-xs font-medium text-red-600">
        {{ getFieldError('care_notes') }}
      </p>
    </label>

    <div class="flex flex-wrap justify-end gap-3 pt-2">
      <button
        v-if="showCancel"
        type="button"
        @click="$emit('cancel')"
        class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
        :disabled="isSubmitting"
      >
        {{ cancelText }}
      </button>

      <button
        type="submit"
        class="inline-flex h-11 items-center justify-center rounded-2xl bg-[#5A208E] px-5 text-sm font-semibold text-white transition hover:bg-[#4B1A77] disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? submittingText : submitText }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { computed, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { uiMessages } from '@/utils/uiMessages'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

const MAX_FILE_SIZE_MB = 2
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({}),
  },
  externalErrors: {
    type: Object,
    default: () => ({}),
  },
  isSubmitting: {
    type: Boolean,
    default: false,
  },
  submitText: {
    type: String,
    default: 'Guardar',
  },
  submittingText: {
    type: String,
    default: 'Guardando...',
  },
  cancelText: {
    type: String,
    default: 'Cancelar',
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['submit', 'cancel', 'change'])

const fileInputRef = ref(null)
const localPhotoFile = ref(null)
const localPreviewUrl = ref('')

const localForm = reactive({
  name: '',
  breed: '',
  size: '',
  birth_date: '',
  care_notes: '',
  photo_path: '',
})

const errors = reactive({
  name: '',
  size: '',
  photo: '',
})

function syncForm(data = {}) {
  localForm.name = data.name || ''
  localForm.breed = data.breed || ''
  localForm.size = data.size || ''
  localForm.birth_date = data.birth_date || ''
  localForm.care_notes = data.care_notes || ''
  localForm.photo_path = data.photo_path || ''

  clearPreviewOnly()
  localPhotoFile.value = null
  errors.photo = ''
}

watch(
  () => props.initialData,
  (value) => {
    syncForm(value || {})
  },
  { immediate: true },
)

const previewImage = computed(() => {
  return getPhotoUrl(localPreviewUrl.value || localForm.photo_path || '')
})

const avatarInitial = computed(() => {
  const value = localForm.name || 'M'
  return value.charAt(0).toUpperCase()
})

const livePreviewPayload = computed(() => ({
  name: localForm.name.trim(),
  breed: localForm.breed.trim(),
  size: localForm.size,
  birth_date: localForm.birth_date || '',
  care_notes: localForm.care_notes.trim(),
  photo_path: localForm.photo_path || '',
  photo_preview: previewImage.value || '',
}))

watch(
  livePreviewPayload,
  (value) => {
    emit('change', { ...value })
  },
  { immediate: true, deep: true },
)

function getFieldError(field) {
  if (field === 'photo') {
    return (
      errors.photo ||
      props.externalErrors?.photo ||
      props.externalErrors?.photo_file ||
      props.externalErrors?.photo_path ||
      ''
    )
  }

  return errors[field] || props.externalErrors?.[field] || ''
}

function openFilePicker() {
  fileInputRef.value?.click()
}

function revokePreviewUrl() {
  if (localPreviewUrl.value) {
    URL.revokeObjectURL(localPreviewUrl.value)
    localPreviewUrl.value = ''
  }
}

function clearPreviewOnly() {
  revokePreviewUrl()
}

function clearPhoto() {
  revokePreviewUrl()
  localPhotoFile.value = null
  localForm.photo_path = ''
  errors.photo = ''

  emit('change', {
    ...livePreviewPayload.value,
    photo_path: '',
    photo_preview: '',
  })

  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

function validatePhoto(file) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return uiMessages.pets.errors.photoInvalidType
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return uiMessages.pets.errors.photoTooLarge
  }

  return ''
}

function handleFileChange(event) {
  const file = event.target.files?.[0]

  if (!file) return

  const photoError = validatePhoto(file)

  if (photoError) {
    errors.photo = photoError
    localPhotoFile.value = null

    if (fileInputRef.value) {
      fileInputRef.value.value = ''
    }

    return
  }

  errors.photo = ''
  revokePreviewUrl()
  localPhotoFile.value = file
  localPreviewUrl.value = URL.createObjectURL(file)
}

function resetErrors() {
  errors.name = ''
  errors.size = ''
  errors.photo = ''
}

function validate() {
  resetErrors()

  let isValid = true

  if (!localForm.name.trim()) {
    errors.name = 'Indica el nombre de tu mascota.'
    isValid = false
  }

  if (!localForm.size) {
    errors.size = 'Selecciona el tamaño.'
    isValid = false
  }

  if (errors.photo) {
    isValid = false
  }

  return isValid
}

function handleSubmit() {
  if (!validate()) return

  emit('submit', {
    name: localForm.name.trim(),
    breed: localForm.breed.trim(),
    size: localForm.size,
    birth_date: localForm.birth_date || null,
    care_notes: localForm.care_notes.trim(),
    photo_path: localForm.photo_path || '',
    photo_file: localPhotoFile.value || null,
    photo_preview: previewImage.value || '',
  })
}

function getPhotoUrl(value) {
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

onBeforeUnmount(() => {
  revokePreviewUrl()
})
</script>