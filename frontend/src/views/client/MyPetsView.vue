<template>
  <section>
    <!-- Toasts fijos para no desplazar la cabecera -->
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
          class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#5A208E] via-[#7A2EA6] to-[#E02890] text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
        >
          <div class="flex min-h-[386px] flex-col justify-between p-5 sm:p-6 lg:p-7">
            <div class="animate-pulse">
              <div class="h-12 w-72 rounded bg-white/20"></div>
              <div class="mt-4 h-5 w-full max-w-2xl rounded bg-white/15"></div>
            </div>

            <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div class="h-[168px] rounded-[24px] bg-white/15"></div>
              <div class="h-[168px] rounded-[24px] bg-white/15"></div>
              <div class="h-[168px] rounded-[24px] bg-white/15"></div>
              <div class="h-[168px] rounded-[24px] bg-white/15"></div>
            </div>
          </div>
        </section>

        <section>
          <div class="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
            <div
              v-for="n in 3"
              :key="n"
              class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm"
            >
              <div class="animate-pulse">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex items-start gap-4">
                    <div class="h-16 w-16 rounded-2xl bg-[#EEE7F6]"></div>
                    <div>
                      <div class="h-6 w-24 rounded bg-[#EEE7F6]"></div>
                      <div class="mt-3 h-4 w-20 rounded bg-[#F3EDF8]"></div>
                    </div>
                  </div>
                  <div class="flex flex-col gap-2">
                    <div class="h-9 w-24 rounded-2xl bg-[#F7F1FC]"></div>
                    <div class="h-8 w-28 rounded-full bg-[#F7F1FC]"></div>
                  </div>
                </div>

                <div class="mt-5 grid gap-3 sm:grid-cols-2">
                  <div class="h-16 rounded-2xl bg-[#FAF8FC]"></div>
                  <div class="h-16 rounded-2xl bg-[#FAF8FC]"></div>
                </div>

                <div class="mt-3 h-[116px] rounded-2xl bg-[#FCFBFE]"></div>
                <div class="mt-4 h-[120px] rounded-2xl bg-[#FCFBFE]"></div>
                <div class="mt-5 h-11 rounded-2xl bg-[#EEE7F6]"></div>
                <div class="mt-3 grid grid-cols-2 gap-3">
                  <div class="h-11 rounded-2xl bg-[#F7F1FC]"></div>
                  <div class="h-11 rounded-2xl bg-[#F7F1FC]"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </template>

      <template v-else>
        <!-- CABECERA -->
        <header
          class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#5A208E] via-[#7A2EA6] to-[#E02890] text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
        >
          <div class="flex min-h-[385px] flex-col justify-between p-5 sm:p-6 lg:p-7">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div class="min-w-0 max-w-4xl">
                <h1 class="mt-2 font-ladralab-brush text-5xl leading-none tracking-tight sm:text-6xl">
                  Mis mascotas
                </h1>

                <p class="mt-4 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                  Revisa sus fichas, comprueba si tienen una estancia próxima y accede rápido a sus reservas.
                </p>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 lg:w-[380px]">
                <RouterLink
                  :to="{ name: 'my-reservations' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Mis reservas
                </RouterLink>

                <RouterLink
                  :to="{ name: 'my-followups' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Mis seguimientos
                </RouterLink>

                <button
                  type="button"
                  @click="openCreateModal"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Nueva mascota
                </button>

                <RouterLink
                  :to="{ name: 'my-reservations-new' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:bg-[#F8F2FF]"
                >
                  Nueva reserva
                </RouterLink>
              </div>
            </div>

            <div class="mt-6 grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <button
                v-for="card in quickCards"
                :key="card.key"
                type="button"
                @click="quickView = card.key"
                class="flex h-full min-h-[168px] flex-col rounded-[24px] border bg-white/12 p-4 text-left backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-lg"
                :class="
                  isQuickViewActive(card.key)
                    ? 'border-white/30 ring-4 ring-white/15 shadow-[0_16px_40px_-20px_rgba(30,10,60,0.45)]'
                    : 'border-white/16'
                "
              >
                <div class="flex items-start justify-between gap-4">
                  <div class="min-w-0">
                    <p class="text-sm font-medium text-white/85">{{ card.label }}</p>
                    <p class="mt-2 text-4xl font-bold leading-none text-white">
                      {{ card.value }}
                    </p>
                  </div>

                  <div
                    class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-bold shadow-sm"
                    :class="card.iconClass"
                  >
                    {{ card.icon }}
                  </div>
                </div>

                <p class="mt-4 text-sm leading-7 text-white/82">
                  {{ card.help }}
                </p>
              </button>
            </div>
          </div>
        </header>

        <!-- GRID TARJETAS -->
        <section>
          <div v-if="filteredPets.length" class="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
            <article
              v-for="pet in filteredPets"
              :key="pet.id"
              class="h-full rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div class="flex h-full min-h-[560px] flex-col">
                <!-- Cabecera tarjeta -->
                <div class="flex items-start justify-between gap-4">
                  <div class="flex min-w-0 items-start gap-4">
                    <div
                      class="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#EAE9EF] to-[#D7CBE7] text-lg font-bold text-[#514980]"
                    >
                      <img
                        v-if="getPetImage(pet)"
                        :src="getPetImage(pet)"
                        :alt="pet.name"
                        class="h-full w-full object-cover"
                      />
                      <span v-else>{{ pet.name.charAt(0) }}</span>
                    </div>

                    <div class="min-w-0">
                      <h3 class="truncate text-lg font-bold tracking-tight text-slate-900">
                        {{ pet.name }}
                      </h3>
                      <p class="mt-1 text-sm text-slate-500">
                        {{ pet.breed || 'Raza no indicada' }}
                      </p>
                    </div>
                  </div>

                  <div class="flex flex-col items-end gap-2">
                    <RouterLink
                      :to="{ name: 'my-pet-detail', params: { id: pet.id } }"
                      class="inline-flex h-9 items-center justify-center rounded-2xl border border-[#E4D6F3] bg-white px-3 text-sm font-semibold text-[#5A208E] transition hover:bg-[#FAF5FF]"
                    >
                      Ver ficha
                    </RouterLink>

                    <span
                      class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                      :class="presenceBadgeClass(getPresenceState(pet))"
                    >
                      {{ presenceLabel(getPresenceState(pet)) }}
                    </span>
                  </div>
                </div>

                <!-- Datos -->
                <div class="mt-5 grid gap-3 sm:grid-cols-2">
                  <div class="rounded-2xl bg-[#FAF8FC] px-4 py-3">
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Tamaño</p>
                    <p class="mt-1 text-sm font-semibold text-slate-800">{{ sizeLabel(pet.size) }}</p>
                  </div>

                  <div class="rounded-2xl bg-[#FAF8FC] px-4 py-3">
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Edad</p>
                    <p class="mt-1 text-sm font-semibold text-slate-800">{{ ageLabel(pet.birth_date) }}</p>
                  </div>
                </div>

                <!-- Reserva -->
                <div class="mt-3 min-h-[116px] rounded-2xl border border-[#EEE7F6] bg-[#FCFBFE] p-4">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {{ getPresenceState(pet) === 'today' ? 'Estancia actual' : 'Próxima reserva' }}
                  </p>

                  <template v-if="getTodayReservation(pet)">
                    <p class="mt-1 text-sm font-semibold text-slate-900">
                      {{ getTodayReservation(pet).service_name }}
                    </p>
                    <p class="mt-1 text-sm text-slate-500">
                      Hoy · hasta {{ formatOnlyTime(getTodayReservation(pet).end_at) }}
                    </p>
                  </template>

                  <template v-else-if="getUpcomingReservation(pet)">
                    <p class="mt-1 text-sm font-semibold text-slate-900">
                      {{ getUpcomingReservation(pet).service_name }}
                    </p>
                    <p class="mt-1 text-sm text-slate-500">
                      {{ formatDateTime(getUpcomingReservation(pet).start_at) }}
                    </p>
                  </template>

                  <template v-else>
                    <p class="mt-1 text-sm font-semibold text-slate-900">
                      No tienes una estancia próxima registrada.
                    </p>
                  </template>
                </div>

                <!-- Observaciones -->
                <div class="mt-4 min-h-[120px] flex-1">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Observaciones
                  </p>

                  <p v-if="pet.care_notes" class="mt-2 text-sm leading-7 text-slate-600">
                    {{ truncateText(pet.care_notes, 160) }}
                  </p>

                  <p v-else class="mt-2 text-sm leading-7 text-slate-400">
                    Sin observaciones relevantes en la ficha.
                  </p>
                </div>

                <!-- Acciones -->
                <div class="mt-5 border-t border-[#F1EBF7] pt-4">
                  <RouterLink
                    :to="{ name: 'my-reservations-new', query: { petId: pet.id } }"
                    class="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-[#5A208E] px-4 text-sm font-semibold text-white transition hover:bg-[#4B1A77]"
                  >
                    Hacer una reserva
                  </RouterLink>

                  <div class="mt-3 grid grid-cols-2 gap-3">
                    <RouterLink
                      :to="buildPetFollowUpsLink(pet)"
                      class="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-[#E9D7E8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#E02890]/30 hover:text-[#A22068] hover:ring-4 hover:ring-[#E02890]/10"
                    >
                      Seguimientos
                    </RouterLink>

                    <button
                      type="button"
                      @click="openEditModal(pet)"
                      class="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-[#E9D7E8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#E02890]/30 hover:text-[#A22068] hover:ring-4 hover:ring-[#E02890]/10"
                    >
                      Editar
                    </button>
                  </div>

                  <button
                    type="button"
                    @click="openDeleteModal(pet)"
                    class="mt-3 inline-flex h-11 w-full items-center justify-center rounded-2xl border border-red-200 bg-white px-4 text-sm font-semibold text-red-700 transition hover:bg-red-50"
                  >
                    Dar de baja
                  </button>
                </div>
              </div>
            </article>
          </div>

          <div
            v-else
            class="rounded-[28px] border border-dashed border-[#DCCFEA] bg-white px-6 py-12 text-center shadow-sm"
          >
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5EFFB] text-xl font-bold text-[#5A208E]">
              🐾
            </div>
            <h3 class="mt-4 text-lg font-bold text-slate-900">{{ emptyState.title }}</h3>
            <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              {{ emptyState.description }}
            </p>

            <button
              type="button"
              @click="openCreateModal"
              class="mt-6 inline-flex items-center justify-center rounded-2xl bg-[#5A208E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4B1A77]"
            >
              Añadir mascota
            </button>
          </div>
        </section>
      </template>
    </div>

    <!-- Modal formulario -->
    <div
      v-if="isPetModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-[#2C1C43]/45 px-4 py-6 backdrop-blur-[2px]"
    >
      <div class="w-full max-w-4xl rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-xl sm:p-6">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-[#A22068]">
              {{ petModalMode === 'create' ? 'Nueva mascota' : 'Editar mascota' }}
            </p>
            <h2 class="mt-1 text-xl font-bold tracking-tight text-slate-900">
              {{
                petModalMode === 'create'
                  ? 'Registrar una nueva mascota'
                  : `Editar a ${petFormInitialData.name || 'tu mascota'}`
              }}
            </h2>
            <p class="mt-1 text-sm text-slate-500">
              Completa solo la información necesaria para su ficha.
            </p>
          </div>

          <button
            type="button"
            @click="closePetModal"
            class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#E8E1F1] bg-white text-slate-500 transition hover:bg-[#FAF7FD]"
          >
            ✕
          </button>
        </div>

        <div class="mt-5">
          <PetForm
            :key="petFormKey"
            :initial-data="petFormInitialData"
            :external-errors="petFormExternalErrors"
            :is-submitting="isSubmitting"
            :submit-text="petModalMode === 'create' ? 'Guardar mascota' : 'Guardar cambios'"
            :submitting-text="petModalMode === 'create' ? 'Guardando...' : 'Guardando cambios...'"
            :cancel-text="'Cancelar'"
            :show-cancel="true"
            @submit="handlePetSubmit"
            @cancel="closePetModal"
          />
        </div>
      </div>
    </div>

    <!-- Modal baja -->
    <div
      v-if="petToDelete"
      class="fixed inset-0 z-50 flex items-center justify-center bg-[#2C1C43]/45 px-4 py-6 backdrop-blur-[2px]"
    >
      <div class="w-full max-w-lg rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-xl sm:p-6">
        <p class="text-xs font-semibold uppercase tracking-wide text-red-600">
          Dar de baja mascota
        </p>
        <h2 class="mt-1 text-xl font-bold tracking-tight text-slate-900">
          ¿Quieres dar de baja a {{ petToDelete.name }}?
        </h2>
        <p class="mt-3 text-sm leading-6 text-slate-500">
          Esta acción está preparada para conectarse al backend. Antes de hacerlo en producción,
          conviene revisar si tiene reservas futuras activas.
        </p>

        <div class="mt-5 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            @click="petToDelete = null"
            class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
          >
            Cancelar
          </button>

          <button
            type="button"
            @click="confirmDeletePet"
            class="inline-flex h-11 items-center justify-center rounded-2xl bg-red-600 px-5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Confirmar baja
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import PetForm from '@/components/pets/PetForm.vue'
import { getMyPets } from '@/services/petsService'
import { getMyReservations } from '@/services/reservationsService'
import { getReadableErrorMessage, getValidationErrors } from '@/utils/errorMessages'
import { uiMessages } from '@/utils/uiMessages'

const petsMessages = uiMessages.pets || {
  success: {
    created: 'Nueva ficha guardada. Todo listo para su próxima aventura.',
    updated: 'Ficha actualizada correctamente. Ya está al día.',
    deleted: 'La mascota se ha dado de baja correctamente.',
  },
  errors: {
    load: 'No hemos podido cargar tus mascotas por ahora.',
    save: 'No se pudo guardar la ficha de la mascota.',
    delete: 'No se pudo dar de baja la mascota.',
  },
  empty: {
    title: 'Aquí no hay huellitas todavía',
    description: 'Cuando añadas tu primera mascota, aparecerá aquí con su ficha y sus próximas estancias.',
  },
}

const pets = ref([])
const reservations = ref([])

const isLoading = ref(true)
const isSubmitting = ref(false)

const loadError = ref('')
const actionError = ref('')
const successMessage = ref('')

const quickView = ref('all')

const isPetModalOpen = ref(false)
const petModalMode = ref('create')
const editingPetId = ref(null)
const petToDelete = ref(null)
const petFormExternalErrors = ref({})

onMounted(() => {
  loadPetsView()
})

async function loadPetsView() {
  isLoading.value = true
  loadError.value = ''

  try {
    const [petsData, reservationsData] = await Promise.all([
      getMyPets(),
      getMyReservations(),
    ])

    pets.value = Array.isArray(petsData) ? petsData : []
    reservations.value = Array.isArray(reservationsData) ? reservationsData : []
  } catch (error) {
    console.error(error)
    loadError.value = getReadableErrorMessage(
      error,
      petsMessages.errors.load || 'No hemos podido cargar tus mascotas por ahora.',
    )
  } finally {
    isLoading.value = false
  }
}

const enrichedPets = computed(() => {
  return pets.value.map((pet) => {
    const petReservations = reservations.value.filter((reservation) => {
      return reservation?.pet_id === pet.id || reservation?.pet?.id === pet.id
    })

    return {
      ...pet,
      reservations: petReservations,
    }
  })
})

const quickCards = computed(() => [
  {
    key: 'all',
    label: 'Todas mis mascotas',
    value: enrichedPets.value.length,
    help: 'Todas las fichas registradas.',
    icon: '01',
    iconClass: 'bg-[#F3ECFB] text-[#5A208E]',
  },
  {
    key: 'today',
    label: 'En el centro hoy',
    value: enrichedPets.value.filter((pet) => getPresenceState(pet) === 'today').length,
    help: 'Con servicio activo hoy.',
    icon: '02',
    iconClass: 'bg-emerald-50 text-emerald-700',
  },
  {
    key: 'upcoming',
    label: 'Próximas estancias',
    value: enrichedPets.value.filter((pet) => isUpcomingEntry(pet) && getPresenceState(pet) !== 'today').length,
    help: 'Reservas ya previstas.',
    icon: '03',
    iconClass: 'bg-sky-50 text-sky-700',
  },
  {
    key: 'reports',
    label: 'Con resumen disponible',
    value: enrichedPets.value.filter((pet) => Boolean(getLatestReport(pet))).length,
    help: 'Con seguimiento disponible.',
    icon: '04',
    iconClass: 'bg-[#FCE8F4] text-[#A22068]',
  },
])

function isQuickViewActive(key) {
  return quickView.value === key
}

const filteredPets = computed(() => {
  if (quickView.value === 'today') {
    return enrichedPets.value.filter((pet) => getPresenceState(pet) === 'today')
  }

  if (quickView.value === 'upcoming') {
    return enrichedPets.value.filter((pet) => isUpcomingEntry(pet) && getPresenceState(pet) !== 'today')
  }

  if (quickView.value === 'reports') {
    return enrichedPets.value.filter((pet) => Boolean(getLatestReport(pet)))
  }

  return [...enrichedPets.value].sort((a, b) => a.name.localeCompare(b.name, 'es'))
})

const emptyState = computed(() => {
  if (!enrichedPets.value.length) {
    return petsMessages.empty || {
      title: 'Aquí no hay huellitas todavía',
      description: 'Cuando añadas tu primera mascota, aparecerá aquí con su ficha y sus próximas estancias.',
    }
  }

  return {
    title: 'No hay mascotas en esta vista',
    description: 'Cambia el bloque activo o añade una nueva mascota para seguir gestionando sus fichas.',
  }
})

function sortReservations(reservationsList = []) {
  return [...reservationsList].sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime())
}

function getTodayReservation(pet) {
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const todayEnd = new Date()
  todayEnd.setHours(23, 59, 59, 999)

  return (
    sortReservations(pet.reservations).find((reservation) => {
      if (reservation.status === 'cancelled') return false

      const start = new Date(reservation.start_at).getTime()
      const end = reservation.end_at ? new Date(reservation.end_at).getTime() : start

      return start <= todayEnd.getTime() && end >= todayStart.getTime()
    }) || null
  )
}

function getUpcomingReservation(pet) {
  const now = Date.now()

  return (
    sortReservations(pet.reservations).find((reservation) => {
      if (reservation.status === 'cancelled') return false
      return new Date(reservation.end_at).getTime() >= now
    }) || null
  )
}

function isUpcomingEntry(pet) {
  const now = Date.now()

  return (pet.reservations || []).some((reservation) => {
    if (reservation.status === 'cancelled') return false
    return new Date(reservation.start_at).getTime() > now
  })
}

function getLatestReport(pet) {
  return (pet.reservations || [])
    .flatMap((reservation) => reservation.daily_reports || [])
    .filter(isVisibleForClient)
    .sort((a, b) => new Date(b.report_date).getTime() - new Date(a.report_date).getTime())[0] || null
}

function isVisibleForClient(report) {
  const status = String(report?.status || '').toLowerCase()

  if (status === 'draft') return false
  if (status === 'published' || status === 'completed') return true

  return Boolean(report?.published_at || report?.completed_at)
}

function buildPetFollowUpsLink(pet) {
  return {
    name: 'my-followups',
    query: { pet: pet.id },
  }
}

function getPresenceState(pet) {
  if (getTodayReservation(pet)) return 'today'
  if (isUpcomingEntry(pet)) return 'upcoming'
  return 'idle'
}

function presenceLabel(state) {
  const labels = {
    today: 'En el centro hoy',
    upcoming: 'Próxima estancia',
    idle: 'Sin reserva próxima',
  }

  return labels[state] || state
}

function presenceBadgeClass(state) {
  const classes = {
    today: 'bg-[#F3ECFB] text-[#5A208E] ring-1 ring-[#E7D8F8]',
    upcoming: 'bg-sky-50 text-sky-700 ring-1 ring-sky-100',
    idle: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
  }

  return classes[state] || 'bg-slate-100 text-slate-600 ring-1 ring-slate-200'
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

function formatDateTime(dateString) {
  if (!dateString) return 'No disponible'

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString))
}

function formatOnlyTime(dateString) {
  if (!dateString) return 'No disponible'

  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString))
}

function truncateText(text, maxLength = 160) {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trim()}…`
}

function getPetImage(pet) {
  return pet.photo_preview || pet.photo_path || ''
}

function openCreateModal() {
  petModalMode.value = 'create'
  editingPetId.value = null
  actionError.value = ''
  petFormExternalErrors.value = {}
  isPetModalOpen.value = true
}

function openEditModal(pet) {
  petModalMode.value = 'edit'
  editingPetId.value = pet.id
  actionError.value = ''
  petFormExternalErrors.value = {}
  isPetModalOpen.value = true
}

function closePetModal() {
  isPetModalOpen.value = false
  editingPetId.value = null
  petFormExternalErrors.value = {}
}

const petFormInitialData = computed(() => {
  if (petModalMode.value === 'create') {
    return {
      name: '',
      breed: '',
      size: '',
      birth_date: '',
      care_notes: '',
      photo_path: '',
    }
  }

  const pet = enrichedPets.value.find((item) => item.id === editingPetId.value)

  if (!pet) {
    return {
      name: '',
      breed: '',
      size: '',
      birth_date: '',
      care_notes: '',
      photo_path: '',
    }
  }

  return {
    name: pet.name || '',
    breed: pet.breed || '',
    size: pet.size || '',
    birth_date: pet.birth_date || '',
    care_notes: pet.care_notes || '',
    photo_path: pet.photo_path || '',
  }
})

const petFormKey = computed(() => `${petModalMode.value}-${editingPetId.value ?? 'new'}`)

function normalizePetPayload(payload = {}) {
  return {
    name: payload.name?.trim() || '',
    species: payload.species || 'Perro',
    breed: payload.breed?.trim() || '',
    size: payload.size || '',
    birth_date: payload.birth_date || null,
    care_notes: payload.care_notes?.trim() || '',
    photo_path: payload.preview_url || payload.photo_path || '',
    photo_file: payload.photo_file || null,
  }
}

async function handlePetSubmit(payload) {
  isSubmitting.value = true
  actionError.value = ''
  petFormExternalErrors.value = {}

  try {
    const normalizedPayload = normalizePetPayload(payload)

    if (petModalMode.value === 'create') {
      // TODO backend:
      // const createdPet = await createPet(normalizedPayload)

      const newId = Math.max(0, ...pets.value.map((pet) => pet.id)) + 1

      pets.value.unshift({
        id: newId,
        owner_user_id: 1,
        species: 'Perro',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        reservations: [],
        ...normalizedPayload,
      })

      successMessage.value =
        petsMessages.success?.created || 'Nueva ficha guardada. Todo listo para su próxima aventura.'
    } else {
      // TODO backend:
      // await updatePet(editingPetId.value, normalizedPayload)

      pets.value = pets.value.map((pet) =>
        pet.id === editingPetId.value
          ? {
              ...pet,
              ...normalizedPayload,
              updated_at: new Date().toISOString(),
            }
          : pet,
      )

      successMessage.value =
        petsMessages.success?.updated || 'Ficha actualizada correctamente. Ya está al día.'
    }

    closePetModal()
  } catch (error) {
    console.error(error)
    petFormExternalErrors.value = getValidationErrors(error)
    actionError.value = getReadableErrorMessage(
      error,
      petsMessages.errors?.save || 'No se pudo guardar la ficha de la mascota.',
    )
  } finally {
    isSubmitting.value = false
  }
}

function openDeleteModal(pet) {
  petToDelete.value = pet
}

async function confirmDeletePet() {
  if (!petToDelete.value) return

  actionError.value = ''

  try {
    // TODO backend:
    // await deactivatePet(petToDelete.value.id)

    pets.value = pets.value.filter((pet) => pet.id !== petToDelete.value.id)

    successMessage.value =
      petsMessages.success?.deleted || 'La mascota se ha dado de baja correctamente.'

    petToDelete.value = null
  } catch (error) {
    console.error(error)
    actionError.value = getReadableErrorMessage(
      error,
      petsMessages.errors?.delete || 'No se pudo dar de baja la mascota.',
    )
  }
}
</script>

<style scoped>
.font-ladralab-brush {
  font-family: "Caveat Brush", "Brush Script MT", "Segoe Script", cursive;
  font-weight: 700;
}
</style>