<template>
  <form class="space-y-5" @submit.prevent="handleSubmit">
    <div v-if="!lockPetAndService" class="grid gap-4">
      <label class="block">
        <span class="mb-2 block text-sm font-semibold text-slate-700">Mascota</span>
        <select
          v-model="localForm.pet_id"
          class="h-12 w-full rounded-2xl border border-[#DCCFEA] bg-[#FCFBFE] px-4 text-sm text-slate-900 outline-none transition focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
        >
          <option value="">Selecciona una mascota</option>
          <option
            v-for="pet in pets"
            :key="pet.id"
            :value="String(pet.id)"
          >
            {{ pet.name }} · {{ pet.breed || 'Raza no indicada' }}
          </option>
        </select>
        <p v-if="getFieldError('pet_id')" class="mt-2 text-xs font-medium text-red-600">
          {{ getFieldError('pet_id') }}
        </p>
      </label>

      <label class="block">
        <span class="mb-2 block text-sm font-semibold text-slate-700">Servicio</span>
        <select
          v-model="localForm.service_id"
          class="h-12 w-full rounded-2xl border border-[#DCCFEA] bg-[#FCFBFE] px-4 text-sm text-slate-900 outline-none transition focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
        >
          <option value="">Selecciona un servicio</option>
          <option
            v-for="service in activeServices"
            :key="service.id"
            :value="String(service.id)"
          >
            {{ service.name }}
          </option>
        </select>
        <p v-if="getFieldError('service_id')" class="mt-2 text-xs font-medium text-red-600">
          {{ getFieldError('service_id') }}
        </p>
      </label>
    </div>

    <div v-else class="grid gap-4 sm:grid-cols-2">
      <div class="rounded-2xl border border-[#EEE7F6] bg-[#FCFBFE] p-4">
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Mascota</p>
        <p class="mt-1 text-sm font-semibold text-slate-900">
          {{ selectedPet?.name || initialPetName || 'Sin seleccionar' }}
        </p>
      </div>

      <div class="rounded-2xl border border-[#EEE7F6] bg-[#FCFBFE] p-4">
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Servicio</p>
        <p class="mt-1 text-sm font-semibold text-slate-900">
          {{ selectedService?.name || initialServiceName || 'Sin seleccionar' }}
        </p>
      </div>
    </div>

    <template v-if="bookingMode === 'date_range'">
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="block">
          <span class="mb-2 block text-sm font-semibold text-slate-700">Inicio</span>
          <input
            v-model="localForm.start_date"
            type="date"
            class="h-12 w-full rounded-2xl border border-[#DCCFEA] bg-[#FCFBFE] px-4 text-sm text-slate-900 outline-none transition focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
          />
          <p v-if="getFieldError('start_date')" class="mt-2 text-xs font-medium text-red-600">
            {{ getFieldError('start_date') }}
          </p>
        </label>

        <label class="block">
          <span class="mb-2 block text-sm font-semibold text-slate-700">Fin</span>
          <input
            v-model="localForm.end_date"
            type="date"
            class="h-12 w-full rounded-2xl border border-[#DCCFEA] bg-[#FCFBFE] px-4 text-sm text-slate-900 outline-none transition focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
          />
          <p v-if="getFieldError('end_date')" class="mt-2 text-xs font-medium text-red-600">
            {{ getFieldError('end_date') }}
          </p>
        </label>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <label class="block">
          <span class="mb-2 block text-sm font-semibold text-slate-700">Hora de entrada</span>
          <select
            v-model="localForm.start_time"
            class="h-12 w-full rounded-2xl border border-[#DCCFEA] bg-[#FCFBFE] px-4 text-sm text-slate-900 outline-none transition focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
          >
            <option
              v-for="slot in defaultTimeOptions"
              :key="slot.value"
              :value="slot.value"
            >
              {{ slot.label }}
            </option>
          </select>
        </label>

        <label class="block">
          <span class="mb-2 block text-sm font-semibold text-slate-700">Hora de salida</span>
          <select
            v-model="localForm.end_time"
            class="h-12 w-full rounded-2xl border border-[#DCCFEA] bg-[#FCFBFE] px-4 text-sm text-slate-900 outline-none transition focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
          >
            <option
              v-for="slot in endTimeOptionsForRange"
              :key="slot.value"
              :value="slot.value"
            >
              {{ slot.label }}
            </option>
          </select>
        </label>
      </div>
    </template>

    <template v-else-if="bookingMode === 'single_day'">
      <label class="block">
        <span class="mb-2 block text-sm font-semibold text-slate-700">Fecha</span>
        <input
          v-model="localForm.date"
          type="date"
          class="h-12 w-full rounded-2xl border border-[#DCCFEA] bg-[#FCFBFE] px-4 text-sm text-slate-900 outline-none transition focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
        />
        <p v-if="getFieldError('date')" class="mt-2 text-xs font-medium text-red-600">
          {{ getFieldError('date') }}
        </p>
      </label>

      <div class="rounded-2xl border border-[#EEE7F6] bg-[#FCFBFE] p-4">
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Horario del servicio</p>
        <p class="mt-1 text-sm font-semibold text-slate-900">
          {{ serviceStartTime }} - {{ serviceEndTime }}
        </p>
      </div>
    </template>

    <template v-else-if="bookingMode === 'time_slot'">
      <label class="block">
        <span class="mb-2 block text-sm font-semibold text-slate-700">Fecha</span>
        <input
          v-model="localForm.date"
          type="date"
          class="h-12 w-full rounded-2xl border border-[#DCCFEA] bg-[#FCFBFE] px-4 text-sm text-slate-900 outline-none transition focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
        />
        <p v-if="getFieldError('date')" class="mt-2 text-xs font-medium text-red-600">
          {{ getFieldError('date') }}
        </p>
      </label>

      <div class="grid gap-4 sm:grid-cols-2">
        <label class="block">
          <span class="mb-2 block text-sm font-semibold text-slate-700">Hora</span>
          <select
            v-model="localForm.start_time"
            class="h-12 w-full rounded-2xl border border-[#DCCFEA] bg-[#FCFBFE] px-4 text-sm text-slate-900 outline-none transition focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
            :disabled="!localForm.date || isLoadingSlots"
          >
            <option value="">
              {{ isLoadingSlots ? 'Cargando horarios...' : 'Selecciona una hora' }}
            </option>
            <option
              v-for="slot in slotOptions"
              :key="slot.value"
              :value="slot.value"
            >
              {{ slot.label }}
            </option>
          </select>
          <p v-if="getFieldError('start_time')" class="mt-2 text-xs font-medium text-red-600">
            {{ getFieldError('start_time') }}
          </p>
        </label>

        <label class="block">
          <span class="mb-2 block text-sm font-semibold text-slate-700">Duración</span>
          <input
            :value="durationLabel"
            type="text"
            disabled
            class="h-12 w-full cursor-not-allowed rounded-2xl border border-[#DCCFEA] bg-[#F7F3FB] px-4 text-sm text-slate-500 outline-none"
          />
        </label>
      </div>

      <p
        v-if="bookingMode === 'time_slot' && localForm.date && !isLoadingSlots && !slotOptions.length"
        class="text-xs font-medium text-amber-700"
      >
        No hay huecos disponibles para ese día.
      </p>
    </template>

    <label class="block">
      <span class="mb-2 block text-sm font-semibold text-slate-700">Observaciones</span>
      <textarea
        v-model.trim="localForm.notes"
        rows="5"
        class="w-full rounded-2xl border border-[#DCCFEA] bg-[#FCFBFE] px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#862E86] focus:ring-4 focus:ring-[#862E86]/10"
        placeholder="Añade alguna indicación útil para esta reserva."
      ></textarea>
    </label>

    <div class="rounded-[22px] border border-[#EEE7F6] bg-[#FCFBFE] p-4">
      <div class="flex items-start gap-3">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#F3ECFB] text-[#5A208E]">
          🐾
        </div>

        <div>
          <p class="text-sm font-semibold text-slate-900">{{ reminderTitle }}</p>
          <p class="mt-1 text-sm leading-6 text-slate-500">
            {{ reminderText }}
          </p>
        </div>
      </div>
    </div>

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
import { computed, reactive, ref, watch } from 'vue'
import { getAvailableTimeSlots } from '@/services/servicesService'

const props = defineProps({
  mode: {
    type: String,
    default: 'create',
  },
  pets: {
    type: Array,
    default: () => [],
  },
  services: {
    type: Array,
    default: () => [],
  },
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
  lockPetAndService: {
    type: Boolean,
    default: false,
  },
  reminderTitle: {
    type: String,
    default: 'Antes de guardar',
  },
  reminderText: {
    type: String,
    default: 'Revisa bien la fecha y el horario antes de confirmar la reserva.',
  },
})

const emit = defineEmits(['submit', 'cancel', 'change'])

const localForm = reactive({
  pet_id: '',
  service_id: '',
  date: '',
  start_date: '',
  end_date: '',
  start_time: '',
  end_time: '',
  notes: '',
})

const internalErrors = reactive({
  pet_id: '',
  service_id: '',
  date: '',
  start_date: '',
  end_date: '',
  start_time: '',
  end_time: '',
})

const slotOptions = ref([])
const isLoadingSlots = ref(false)

function normalizeHourTime(value, fallback = '09:00') {
  if (!value) return fallback
  const [hours] = value.slice(0, 5).split(':').map(Number)
  return `${String(hours).padStart(2, '0')}:00`
}

function parseTimeToMinutes(value) {
  if (!value) return 0
  const [hours, minutes] = value.slice(0, 5).split(':').map(Number)
  return (hours * 60) + minutes
}

function minutesToTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

function buildHourlyOptions(startTime, endTime, interval = 60) {
  const startMinutes = parseTimeToMinutes(startTime)
  const endMinutes = parseTimeToMinutes(endTime)
  const safeInterval = Number(interval) > 0 ? Number(interval) : 60

  const options = []
  for (let current = startMinutes; current <= endMinutes; current += safeInterval) {
    const value = minutesToTime(current)
    options.push({ value, label: value })
  }

  return options
}

function syncForm(data = {}) {
  localForm.pet_id = data.pet_id ? String(data.pet_id) : ''
  localForm.service_id = data.service_id ? String(data.service_id) : ''
  localForm.date = data.date || ''
  localForm.start_date = data.start_date || ''
  localForm.end_date = data.end_date || ''
  localForm.start_time = data.start_time || ''
  localForm.end_time = data.end_time || ''
  localForm.notes = data.notes || ''
}

watch(
  () => props.initialData,
  (value) => {
    syncForm(value || {})
  },
  { immediate: true }
)

const activeServices = computed(() => {
  return props.services.filter((service) => service.is_active !== false)
})

const selectedPet = computed(() => {
  return props.pets.find((pet) => String(pet.id) === String(localForm.pet_id)) || null
})

const selectedService = computed(() => {
  return activeServices.value.find((service) => String(service.id) === String(localForm.service_id)) || null
})

const initialPetName = computed(() => props.initialData?.pet_name || '')
const initialServiceName = computed(() => props.initialData?.service_name || '')

const bookingMode = computed(() => {
  return selectedService.value?.booking_mode || props.initialData?.booking_mode || ''
})

const serviceStartTime = computed(() => {
  return normalizeHourTime(
    selectedService.value?.default_start_time || props.initialData?.start_time || '09:00',
    '09:00',
  )
})

const serviceEndTime = computed(() => {
  return normalizeHourTime(
    selectedService.value?.default_end_time || props.initialData?.end_time || '18:00',
    '18:00',
  )
})

const defaultTimeOptions = computed(() => {
  return buildHourlyOptions(serviceStartTime.value, serviceEndTime.value, 60)
})

const endTimeOptionsForRange = computed(() => {
  const startMinutes = parseTimeToMinutes(localForm.start_time || serviceStartTime.value)

  return defaultTimeOptions.value.filter((option) => {
    return parseTimeToMinutes(option.value) >= startMinutes
  })
})

const durationLabel = computed(() => {
  const duration = Number(selectedService.value?.duration_minutes || 60)
  return `${duration} min`
})

watch(
  () => localForm.service_id,
  () => {
    if (props.lockPetAndService) return

    localForm.date = ''
    localForm.start_date = ''
    localForm.end_date = ''
    localForm.start_time = ''
    localForm.end_time = ''
    slotOptions.value = []
    resetErrors()
  }
)

watch(
  () => bookingMode.value,
  (mode) => {
    if (!mode) return

    if (mode === 'single_day') {
      localForm.start_time = serviceStartTime.value
      localForm.end_time = serviceEndTime.value
    }

    if (mode === 'date_range') {
      if (!localForm.start_time) localForm.start_time = serviceStartTime.value
      if (!localForm.end_time) localForm.end_time = serviceEndTime.value
    }
  },
  { immediate: true }
)

watch(
  () => localForm.start_time,
  (value) => {
    if (bookingMode.value === 'time_slot') {
      const duration = Number(selectedService.value?.duration_minutes || 60)
      localForm.end_time = value ? minutesToTime(parseTimeToMinutes(value) + duration) : ''
      return
    }

    if (bookingMode.value === 'date_range') {
      const startMinutes = parseTimeToMinutes(value || serviceStartTime.value)
      const endMinutes = parseTimeToMinutes(localForm.end_time || serviceEndTime.value)

      if (endMinutes < startMinutes) {
        localForm.end_time = value
      }
    }
  }
)

watch(
  () => [localForm.service_id, localForm.date, bookingMode.value],
  async () => {
    if (bookingMode.value !== 'time_slot' || !localForm.service_id || !localForm.date) {
      slotOptions.value = []
      return
    }

    isLoadingSlots.value = true

    try {
      const fetchedSlots = await getAvailableTimeSlots(localForm.service_id, localForm.date)
      const normalized = Array.isArray(fetchedSlots) ? fetchedSlots : []

      if (
        localForm.start_time &&
        !normalized.some((slot) => slot.value === localForm.start_time)
      ) {
        normalized.unshift({
          value: localForm.start_time,
          label: localForm.start_time,
        })
      }

      slotOptions.value = normalized
    } catch (error) {
      console.error(error)
      slotOptions.value = localForm.start_time
        ? [{ value: localForm.start_time, label: localForm.start_time }]
        : []
    } finally {
      isLoadingSlots.value = false
    }
  },
  { immediate: true }
)

const draftPayload = computed(() => {
  return {
    pet_id: localForm.pet_id,
    service_id: localForm.service_id,
    pet_name: selectedPet.value?.name || initialPetName.value || '',
    service_name: selectedService.value?.name || initialServiceName.value || '',
    booking_mode: bookingMode.value,
    date: localForm.date,
    start_date: localForm.start_date,
    end_date: localForm.end_date,
    start_time: localForm.start_time,
    end_time: localForm.end_time,
    notes: localForm.notes,
  }
})

watch(
  draftPayload,
  (value) => {
    emit('change', { ...value })
  },
  { immediate: true, deep: true }
)

function getFieldError(field) {
  return internalErrors[field] || props.externalErrors?.[field] || ''
}

function resetErrors() {
  internalErrors.pet_id = ''
  internalErrors.service_id = ''
  internalErrors.date = ''
  internalErrors.start_date = ''
  internalErrors.end_date = ''
  internalErrors.start_time = ''
  internalErrors.end_time = ''
}

function validate() {
  resetErrors()
  let isValid = true

  if (!localForm.pet_id) {
    internalErrors.pet_id = 'Selecciona una mascota.'
    isValid = false
  }

  if (!localForm.service_id) {
    internalErrors.service_id = 'Selecciona un servicio.'
    isValid = false
  }

  if (bookingMode.value === 'date_range') {
    if (!localForm.start_date) {
      internalErrors.start_date = 'Selecciona la fecha de inicio.'
      isValid = false
    }

    if (!localForm.end_date) {
      internalErrors.end_date = 'Selecciona la fecha de fin.'
      isValid = false
    }

    if (localForm.start_date && localForm.end_date && localForm.end_date < localForm.start_date) {
      internalErrors.end_date = 'La fecha de fin no puede ser anterior a la de inicio.'
      isValid = false
    }

    if (!localForm.start_time || !localForm.end_time) {
      internalErrors.end_time = 'Selecciona un horario válido.'
      isValid = false
    }
  }

  if (bookingMode.value === 'single_day') {
    if (!localForm.date) {
      internalErrors.date = 'Selecciona la fecha.'
      isValid = false
    }
  }

  if (bookingMode.value === 'time_slot') {
    if (!localForm.date) {
      internalErrors.date = 'Selecciona la fecha.'
      isValid = false
    }

    if (!localForm.start_time) {
      internalErrors.start_time = 'Selecciona una hora disponible.'
      isValid = false
    }
  }

  return isValid
}

function buildPayload() {
  if (bookingMode.value === 'date_range') {
    return {
      pet_id: Number(localForm.pet_id),
      service_id: Number(localForm.service_id),
      booking_mode: bookingMode.value,
      start_at: `${localForm.start_date}T${localForm.start_time}:00`,
      end_at: `${localForm.end_date}T${localForm.end_time}:00`,
      notes: localForm.notes.trim(),
      observations: localForm.notes.trim(),
    }
  }

  if (bookingMode.value === 'single_day') {
    return {
      pet_id: Number(localForm.pet_id),
      service_id: Number(localForm.service_id),
      booking_mode: bookingMode.value,
      start_at: `${localForm.date}T${serviceStartTime.value}:00`,
      end_at: `${localForm.date}T${serviceEndTime.value}:00`,
      notes: localForm.notes.trim(),
      observations: localForm.notes.trim(),
    }
  }

  const duration = Number(selectedService.value?.duration_minutes || 60)
  const calculatedEnd = localForm.end_time || minutesToTime(parseTimeToMinutes(localForm.start_time) + duration)

  return {
    pet_id: Number(localForm.pet_id),
    service_id: Number(localForm.service_id),
    booking_mode: bookingMode.value,
    start_at: `${localForm.date}T${localForm.start_time}:00`,
    end_at: `${localForm.date}T${calculatedEnd}:00`,
    notes: localForm.notes.trim(),
    observations: localForm.notes.trim(),
  }
}

function handleSubmit() {
  if (!validate()) return
  emit('submit', buildPayload())
}
</script>

<style scoped>
.font-ladralab-brush {
  font-family: 'Caveat Brush', 'Brush Script MT', 'Segoe Script', cursive;
  font-weight: 700;
}

.reservation-service-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 16px;
  line-height: 1.25;
  font-weight: 800;
  color: #6b2fa4;
  letter-spacing: -0.01em;
  word-break: break-word;
  min-height: 2.5em;
  max-width: 230px;
}
</style>