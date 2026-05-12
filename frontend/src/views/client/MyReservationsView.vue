<template>
  <section class="relative">
    <!-- Mensajes flotantes -->
    <div class="pointer-events-none fixed right-6 top-6 z-[70] flex w-full max-w-md flex-col gap-3">
      <div
        v-if="successMessage"
        class="pointer-events-auto rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 shadow-lg"
      >
        <div class="flex items-start gap-3">
          <span class="mt-0.5 text-base">🐾</span>
          <p>{{ successMessage }}</p>
        </div>
      </div>

      <div
        v-if="loadError"
        class="pointer-events-auto rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-lg"
      >
        <div class="flex items-start gap-3">
          <span class="mt-0.5 text-base">⚠️</span>
          <p>{{ loadError }}</p>
        </div>
      </div>

      <div
        v-if="actionError"
        class="pointer-events-auto rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-lg"
      >
        <div class="flex items-start gap-3">
          <span class="mt-0.5 text-base">⚠️</span>
          <p>{{ actionError }}</p>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl space-y-6">
      <template v-if="isLoading">
        <section
          class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#5A208E] via-[#7A2EA6] to-[#E02890] p-6 text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
        >
          <div class="animate-pulse">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div class="min-w-0 max-w-4xl">
                <div class="h-12 w-72 rounded bg-white/20"></div>
                <div class="mt-5 h-5 w-full max-w-2xl rounded bg-white/15"></div>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
                <div class="h-11 rounded-2xl bg-white/20"></div>
                <div class="h-11 rounded-2xl bg-white/20"></div>
                <div class="h-11 rounded-2xl bg-white/20"></div>
                <div class="h-11 rounded-2xl bg-white/20"></div>
              </div>
            </div>

            <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div
                v-for="n in 4"
                :key="n"
                class="h-[152px] rounded-[24px] bg-white/15"
              ></div>
            </div>
          </div>
        </section>

        <section class="rounded-[28px] border border-[#E8E1F1] bg-white px-5 py-4 shadow-sm sm:px-6 sm:py-5">
          <div class="animate-pulse">
            <div class="flex items-start justify-between gap-4">
              <div>
                <div class="h-8 w-44 rounded bg-[#F3ECFB]"></div>
                <div class="mt-3 h-5 w-80 rounded bg-[#F7F1FC]"></div>
              </div>
              <div class="h-9 w-32 rounded-2xl bg-[#F7F1FC]"></div>
            </div>

            <div class="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_220px_220px]">
              <div class="h-10 rounded-2xl bg-[#F7F1FC]"></div>
              <div class="h-10 rounded-2xl bg-[#F7F1FC]"></div>
              <div class="h-10 rounded-2xl bg-[#F7F1FC]"></div>
            </div>

            <div class="mt-4 flex gap-2">
              <div class="h-7 w-24 rounded-full bg-[#F3ECFB]"></div>
              <div class="h-7 w-28 rounded-full bg-[#FCE8F4]"></div>
            </div>
          </div>
        </section>

        <section class="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          <article
            v-for="n in 3"
            :key="n"
            class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm"
          >
            <div class="animate-pulse">
              <div class="flex min-h-[74px] items-start justify-between gap-4">
                <div class="flex min-w-0 flex-1 items-start gap-4">
                  <div class="h-14 w-14 rounded-2xl bg-[#EEE7F6]"></div>
                  <div class="min-w-0 flex-1">
                    <div class="h-6 w-20 rounded bg-[#EEE7F6]"></div>
                    <div class="mt-2 h-8 w-36 rounded bg-[#F3EDF8]"></div>
                  </div>
                </div>
                <div class="h-10 w-24 rounded-2xl bg-[#F7F1FC]"></div>
              </div>

              <div class="mt-2 grid gap-3 sm:grid-cols-2">
                <div class="h-[94px] rounded-2xl bg-[#FAF8FC]"></div>
                <div class="h-[94px] rounded-2xl bg-[#FAF8FC]"></div>
              </div>

              <div class="mt-3 h-[96px] rounded-2xl bg-[#FCFBFE]"></div>
              <div class="mt-3 h-[80px] rounded-2xl bg-[#FCFBFE]"></div>
              <div class="mt-5 h-11 rounded-2xl bg-[#F3ECFB]"></div>
              <div class="mt-3 grid gap-3 sm:grid-cols-2">
                <div class="h-11 rounded-2xl bg-[#FCFBFE]"></div>
                <div class="h-11 rounded-2xl bg-[#FCFBFE]"></div>
              </div>
            </div>
          </article>
        </section>
      </template>

      <template v-else>
        <header
          class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#5A208E] via-[#7A2EA6] to-[#E02890] text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
        >
          <div class="p-5 sm:p-6 lg:p-7">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div class="min-w-0 max-w-4xl pt-1">
                <h1 class="font-ladralab-brush text-5xl leading-none tracking-tight sm:text-6xl">
                  Mis reservas
                </h1>

                <p class="mt-5 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                  Revisa tus solicitudes y estancias, consulta los detalles de cada servicio
                  y accede rápido a nuevas reservas cuando lo necesites.
                </p>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
                <RouterLink
                  :to="{ name: 'client-dashboard' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Dashboard
                </RouterLink>

                <RouterLink
                  :to="{ name: 'my-pets' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Mis mascotas
                </RouterLink>

                <RouterLink
                  :to="{ name: 'my-followups' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Mis seguimientos
                </RouterLink>

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
                class="flex h-full min-h-[152px] flex-col rounded-[24px] border bg-white/12 p-4 text-left backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-lg"
                :class="
                  isQuickViewActive(card.key)
                    ? 'border-white/30 ring-4 ring-white/15 shadow-[0_16px_40px_-20px_rgba(30,10,60,0.45)]'
                    : 'border-white/16'
                "
              >
                <div class="flex items-start justify-between gap-4">
                  <div class="min-w-0">
                    <p class="text-sm font-medium text-white/85">{{ card.label }}</p>
                    <p class="mt-2 text-3xl font-bold leading-none text-white">
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

                <p class="mt-4 text-sm leading-6 text-white/82">
                  {{ card.help }}
                </p>
              </button>
            </div>
          </div>
        </header>

        <section class="rounded-[28px] border border-[#E8E1F1] bg-white px-5 py-4 shadow-sm sm:px-6 sm:py-5">
          <div class="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 class="text-[26px] font-bold tracking-tight text-slate-900">
                Buscar y filtrar
              </h2>
              <p class="mt-1 text-sm text-slate-500">
                Encuentra una reserva por mascota o servicio.
              </p>
            </div>

            <button
              v-if="hasActiveFilters"
              type="button"
              @click="clearFilters"
              class="inline-flex h-10 items-center justify-center self-start rounded-2xl border border-[#DCCFEA] bg-white px-4 text-sm font-semibold text-[#6E4FA2] transition hover:bg-[#F8F4FD]"
            >
              Limpiar filtros
            </button>
          </div>

          <div class="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_220px_220px]">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">Buscar</label>
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Mascota o servicio"
                class="h-10 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">Estado</label>
              <select
                v-model="statusFilter"
                class="h-10 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
              >
                <option value="all">Todos</option>
                <option value="confirmed">Confirmadas</option>
                <option value="pending">Pendientes</option>
                <option value="cancelled">Canceladas</option>
                <option value="completed">Finalizadas</option>
                <option value="upcoming">Próximas</option>
              </select>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">Ordenar</label>
              <select
                v-model="sortOrder"
                class="h-10 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
              >
                <option value="closest">Más próximas</option>
                <option value="latest">Más recientes</option>
                <option value="pet">Por mascota</option>
              </select>
            </div>
          </div>

          <div class="mt-4 flex flex-wrap items-center gap-2">
            <span class="inline-flex items-center rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]">
              {{ filteredReservations.length }} resultados
            </span>

            <span
              v-if="quickView !== 'all'"
              class="inline-flex items-center rounded-full bg-[#FCE8F4] px-3 py-1 text-xs font-semibold text-[#A22068]"
            >
              {{ quickViewLabel }}
            </span>
          </div>
        </section>

        <section>
          <div v-if="filteredReservations.length" class="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
            <article
              v-for="reservation in filteredReservations"
              :key="reservation.id"
              class="h-full rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div class="flex h-full flex-col">
                <div class="flex min-h-[72px] items-start justify-between gap-4">
                  <div class="flex min-w-0 flex-1 items-start gap-4">
                    <div
                      class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#EAE9EF] to-[#D7CBE7] text-lg font-bold text-[#6B5B90]"
                    >
                      <img
                        v-if="getReservationPetImage(reservation)"
                        :src="getReservationPetImage(reservation)"
                        :alt="reservation.pet_name"
                        class="h-full w-full object-cover"
                      />
                      <span v-else>{{ reservationInitial(reservation) }}</span>
                    </div>

                    <div class="min-w-0 flex-1">
                      <div class="flex flex-wrap items-center gap-2">
                        <h3 class="text-[17px] font-bold leading-none tracking-tight text-[#556381]">
                          {{ reservation.pet_name }}
                        </h3>

                        <span
                          class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                          :class="statusBadgeClass(reservation.status)"
                        >
                          {{ reservationStatusLabel(reservation.status) }}
                        </span>
                      </div>

                      <p class="reservation-service-title mt-2">
                        {{ getReservationServiceName(reservation) }}
                      </p>
                    </div>
                  </div>

                  <RouterLink
                    :to="petDetailRoute(reservation)"
                    class="inline-flex h-10 shrink-0 items-center justify-center rounded-2xl border border-[#E4D6F4] bg-white px-4 text-sm font-semibold text-[#6E4FA2] transition hover:border-[#CDB2EA] hover:bg-[#FCFAFE]"
                  >
                    Ver ficha
                  </RouterLink>
                </div>

                <div class="mt-2 grid gap-3 sm:grid-cols-2">
                  <div class="min-h-[94px] rounded-2xl bg-[#FAF8FC] px-4 py-4">
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {{ reservationDateLabel(reservation) }}
                    </p>

                    <p class="mt-3 whitespace-nowrap text-[18px] font-bold leading-tight text-slate-900">
                      {{ primaryDateValue(reservation) }}
                    </p>

                    <p
                      class="mt-2 h-5 text-sm leading-5"
                      :class="startSecondaryValue(reservation) ? 'text-slate-600' : 'opacity-0'"
                    >
                      {{ startSecondaryValue(reservation) || '00:00' }}
                    </p>
                  </div>

                  <div class="min-h-[94px] rounded-2xl bg-[#FAF8FC] px-4 py-4">
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Detalle
                    </p>

                    <p class="mt-3 line-clamp-1 text-[17px] font-semibold leading-6 text-slate-900">
                      {{ detailMainValue(reservation) }}
                    </p>

                    <p
                      class="mt-2 h-5 text-sm leading-5"
                      :class="detailSecondaryValue(reservation) ? 'text-slate-600' : 'opacity-0'"
                    >
                      {{ detailSecondaryValue(reservation) || '00:00' }}
                    </p>
                  </div>
                </div>

                <div class="mt-3 min-h-[92px] rounded-2xl border border-[#EEE7F6] bg-[#FCFBFE] p-4">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Resumen de la reserva
                  </p>

                  <p class="mt-3 text-sm leading-7 text-slate-600">
                    {{ reservationSummary(reservation) }}
                  </p>
                </div>

                <div class="mt-3 min-h-[76px]">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Observaciones
                  </p>

                  <p class="mt-3 text-sm leading-7 text-slate-600">
                    {{ reservationObservations(reservation) }}
                  </p>
                </div>

                <div class="mt-auto border-t border-[#F1EBF7] pt-5">
                  <div class="flex flex-col gap-3">
                    <RouterLink
                      :to="newReservationRoute(reservation)"
                      class="inline-flex h-11 items-center justify-center rounded-2xl bg-[#6627A3] px-4 text-sm font-semibold text-white transition hover:bg-[#57208D]"
                    >
                      Nueva reserva
                    </RouterLink>

                    <div
                      v-if="showReservationBottomRow(reservation)"
                      class="grid gap-3"
                      :class="bottomActionsGridClass(reservation)"
                    >
                      <RouterLink
                        v-if="hasVisibleReports(reservation)"
                        :to="buildReservationFollowUpsLink(reservation)"
                        class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                      >
                        Ver seguimiento
                      </RouterLink>

                      <button
                        v-if="canEditReservation(reservation)"
                        type="button"
                        @click="openEditModal(reservation)"
                        class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                      >
                        Editar reserva
                      </button>

                      <button
                        v-if="canCancelReservation(reservation)"
                        type="button"
                        @click="openCancelModal(reservation)"
                        class="inline-flex h-11 items-center justify-center rounded-2xl border border-red-200 bg-white px-4 text-sm font-semibold text-red-700 transition hover:bg-red-50"
                      >
                        Cancelar reserva
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div
            v-else
            class="rounded-[28px] border border-dashed border-[#DCCFEA] bg-white px-6 py-12 text-center shadow-sm"
          >
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5EFFB] text-xl font-bold text-[#5A208E]">
              📅
            </div>

            <h3 class="mt-4 text-lg font-bold text-slate-900">
              No hay reservas en esta vista
            </h3>

            <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Cambia el filtro o crea una nueva reserva para seguir gestionando tus servicios.
            </p>

            <RouterLink
              :to="{ name: 'my-reservations-new' }"
              class="mt-6 inline-flex items-center justify-center rounded-2xl bg-[#5A208E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4B1A77]"
            >
              Nueva reserva
            </RouterLink>
          </div>
        </section>
      </template>
    </div>

    <div
      v-if="reservationToEdit"
      class="fixed inset-0 z-50 flex items-center justify-center bg-[#2C1C43]/45 px-4 py-6 backdrop-blur-[2px]"
    >
      <div class="w-full max-w-2xl rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-xl sm:p-6">
        <p class="text-xs font-semibold uppercase tracking-wide text-[#6E4FA2]">
          Editar reserva
        </p>

        <h2 class="mt-1 text-xl font-bold tracking-tight text-slate-900">
          {{ getReservationServiceName(reservationToEdit) }} · {{ reservationToEdit.pet_name }}
        </h2>

        <p class="mt-3 text-sm leading-6 text-slate-500">
          Puedes ajustar fecha, horario y observaciones mientras la reserva siga pendiente.
        </p>

        <div class="mt-5">
          <ReservationForm
            mode="edit"
            :pets="pets"
            :services="services"
            :initial-data="reservationFormInitialData"
            :external-errors="reservationFormErrors"
            :is-submitting="isSubmitting"
            :lock-pet-and-service="true"
            :submit-text="'Guardar cambios'"
            :submitting-text="'Guardando...'"
            :cancel-text="'Cancelar'"
            :show-cancel="true"
            reminder-title="Antes de guardar"
            reminder-text="Revisa fechas y horario antes de guardar. La reserva solo podrá modificarse mientras siga pendiente."
            @submit="confirmEditReservation"
            @cancel="closeEditModal"
          />
        </div>
      </div>
    </div>

    <div
      v-if="reservationToCancel"
      class="fixed inset-0 z-50 flex items-center justify-center bg-[#2C1C43]/45 px-4 py-6 backdrop-blur-[2px]"
    >
      <div class="w-full max-w-lg rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-xl sm:p-6">
        <p class="text-xs font-semibold uppercase tracking-wide text-red-600">
          Cancelar reserva
        </p>

        <h2 class="mt-1 text-xl font-bold tracking-tight text-slate-900">
          ¿Quieres cancelar esta reserva?
        </h2>

        <p class="mt-3 text-sm leading-6 text-slate-500">
          {{ getReservationServiceName(reservationToCancel) }} para {{ reservationToCancel.pet_name }}.
          Si confirmas, la reserva pasará a estado cancelada.
        </p>

        <div class="mt-5 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            @click="reservationToCancel = null"
            class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
          >
            Volver
          </button>

          <button
            type="button"
            @click="confirmCancelReservation"
            class="inline-flex h-11 items-center justify-center rounded-2xl bg-red-600 px-5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Procesando...' : 'Confirmar cancelación' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import ReservationForm from '@/components/reservations/ReservationForm.vue'
import {
  getMyReservations,
  updateReservation,
  cancelReservation,
} from '@/services/reservationsService'
import { getMyPets } from '@/services/petsService'
import { getServices } from '@/services/servicesService'
import { getReadableErrorMessage, getValidationErrors } from '@/utils/errorMessages'
import { uiMessages } from '@/utils/uiMessages'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

const reservationsMessages = uiMessages.reservations || {
  success: {
    cancelled: 'La reserva se ha cancelado correctamente.',
    updated: 'La reserva se ha actualizado correctamente.',
  },
  errors: {
    load: 'No hemos podido cargar tus reservas.',
    cancel: 'No se ha podido cancelar la reserva.',
    update: 'No se ha podido actualizar la reserva.',
  },
}

const route = useRoute()
const router = useRouter()

const reservations = ref([])
const pets = ref([])
const services = ref([])

const isLoading = ref(true)
const isSubmitting = ref(false)

const loadError = ref('')
const actionError = ref('')
const successMessage = ref('')

const quickView = ref('all')
const searchTerm = ref('')
const statusFilter = ref('all')
const sortOrder = ref('closest')

const reservationToCancel = ref(null)
const reservationToEdit = ref(null)
const reservationFormErrors = ref({})

onMounted(() => {
  loadReservationsView()
})

async function loadReservationsView() {
  isLoading.value = true
  loadError.value = ''
  actionError.value = ''

  try {
    const [reservationsData, petsData, servicesData] = await Promise.all([
      getMyReservations(),
      getMyPets(),
      getServices(),
    ])

    reservations.value = Array.isArray(reservationsData) ? reservationsData : []
    pets.value = Array.isArray(petsData) ? petsData : []
    services.value = Array.isArray(servicesData)
      ? servicesData.filter((service) => service.is_active !== false)
      : []
  } catch (error) {
    console.error(error)

    loadError.value = getReadableErrorMessage(
      error,
      reservationsMessages.errors?.load || 'No hemos podido cargar tus reservas.',
    )
  } finally {
    isLoading.value = false
  }
}

const enrichedReservations = computed(() => {
  return reservations.value.map((reservation) => {
    const pet =
      reservation?.pet ||
      pets.value.find((item) => Number(item.id) === Number(reservation.pet_id)) ||
      null

    const service =
      reservation?.service ||
      services.value.find((item) => Number(item.id) === Number(reservation.service_id)) ||
      null

    const resource = reservation?.resource || null

    return {
      ...reservation,
      pet,
      service,
      resource,
      pet_id: reservation.pet_id || pet?.id || null,
      pet_name: pet?.name || reservation?.pet_name || 'Mascota',
      pet_breed: pet?.breed || reservation?.pet_breed || '',
      pet_image:
        pet?.photo_url ||
        pet?.photo_path ||
        pet?.photo_preview ||
        reservation?.pet_image ||
        '',
      pet_notes: pet?.care_notes || reservation?.pet_notes || '',
      service_name: reservation?.service_name || service?.name || 'Servicio',
      service_id: reservation?.service_id || service?.id || null,
      resource_name: reservation?.resource_name || resource?.name || '',
      daily_reports: Array.isArray(reservation.daily_reports)
        ? reservation.daily_reports
        : Array.isArray(reservation.dailyReports)
          ? reservation.dailyReports
          : [],
    }
  })
})

const quickCards = computed(() => [
  {
    key: 'all',
    label: 'Todas las reservas',
    value: enrichedReservations.value.length,
    help: 'Historial completo de reservas.',
    icon: '01',
    iconClass: 'bg-[#F3ECFB] text-[#5A208E]',
  },
  {
    key: 'confirmed',
    label: 'Confirmadas',
    value: enrichedReservations.value.filter((item) => item.status === 'confirmed').length,
    help: 'Reservas listas para la fecha prevista.',
    icon: '02',
    iconClass: 'bg-emerald-50 text-emerald-700',
  },
  {
    key: 'upcoming',
    label: 'Próximas',
    value: enrichedReservations.value.filter((item) => isUpcoming(item)).length,
    help: 'Próximas fechas reservadas.',
    icon: '03',
    iconClass: 'bg-sky-50 text-sky-700',
  },
  {
    key: 'pending',
    label: 'Pendientes',
    value: enrichedReservations.value.filter((item) => item.status === 'pending').length,
    help: 'Solicitudes por confirmar.',
    icon: '04',
    iconClass: 'bg-[#FCE8F4] text-[#A22068]',
  },
])

const quickViewLabel = computed(() => {
  const labels = {
    all: 'Listado completo',
    confirmed: 'Confirmadas',
    upcoming: 'Próximas',
    pending: 'Pendientes',
  }

  return labels[quickView.value] || 'Listado'
})

const hasActiveFilters = computed(() => {
  return (
    quickView.value !== 'all' ||
    searchTerm.value.trim() !== '' ||
    statusFilter.value !== 'all' ||
    sortOrder.value !== 'closest'
  )
})

const petFilterFromQuery = computed(() => {
  return route.query.pet ? String(route.query.pet) : 'all'
})

const filteredReservations = computed(() => {
  let items = [...enrichedReservations.value]

  if (quickView.value === 'confirmed') {
    items = items.filter((item) => item.status === 'confirmed')
  }

  if (quickView.value === 'pending') {
    items = items.filter((item) => item.status === 'pending')
  }

  if (quickView.value === 'upcoming') {
    items = items.filter((item) => isUpcoming(item))
  }

  if (petFilterFromQuery.value !== 'all') {
    items = items.filter((item) => {
      return String(item.pet_id) === String(petFilterFromQuery.value)
    })
  }

  const query = searchTerm.value.trim().toLowerCase()

  if (query) {
    items = items.filter((item) => {
      return (
        item.pet_name?.toLowerCase().includes(query) ||
        getReservationServiceName(item).toLowerCase().includes(query)
      )
    })
  }

  if (statusFilter.value !== 'all') {
    if (statusFilter.value === 'upcoming') {
      items = items.filter((item) => isUpcoming(item))
    } else {
      items = items.filter((item) => item.status === statusFilter.value)
    }
  }

  if (sortOrder.value === 'pet') {
    items.sort((a, b) => a.pet_name.localeCompare(b.pet_name, 'es'))
  } else if (sortOrder.value === 'latest') {
    items.sort((a, b) => new Date(b.start_at).getTime() - new Date(a.start_at).getTime())
  } else {
    items.sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime())
  }

  return items
})

const reservationFormInitialData = computed(() => {
  if (!reservationToEdit.value) {
    return {
      pet_id: '',
      service_id: '',
      pet_name: '',
      service_name: '',
      booking_mode: '',
      date: '',
      start_date: '',
      end_date: '',
      start_time: '',
      end_time: '',
      notes: '',
    }
  }

  const reservation = reservationToEdit.value

  const service =
    reservation.service ||
    services.value.find((item) => Number(item.id) === Number(reservation.service_id)) ||
    null

  const mode = service?.booking_mode || getReservationBookingMode(reservation)
  const startDate = formatDateInput(reservation.start_at)
  const endDate = formatDateInput(reservation.end_at || reservation.start_at)

  return {
    pet_id: reservation.pet_id,
    service_id: reservation.service_id,
    pet_name: reservation.pet_name,
    service_name: getReservationServiceName(reservation),
    booking_mode: mode,

    date: mode === 'single_day' || mode === 'time_slot' ? startDate : '',
    start_date: mode === 'date_range' ? startDate : '',
    end_date: mode === 'date_range' ? endDate : '',

    start_time: formatTimeInput(reservation.start_at),
    end_time: formatTimeInput(reservation.end_at),
    notes: reservation.notes || reservation.observations || '',
  }
})

function isQuickViewActive(key) {
  return quickView.value === key
}

function clearFilters() {
  quickView.value = 'all'
  searchTerm.value = ''
  statusFilter.value = 'all'
  sortOrder.value = 'closest'

  if (route.query.pet) {
    router.replace({ name: route.name, query: {} })
  }
}

function isSameDay(startAt, endAt) {
  if (!startAt || !endAt) return true

  const start = new Date(startAt)
  const end = new Date(endAt)

  return (
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate()
  )
}

function isUpcoming(reservation) {
  if (!reservation?.start_at) return false
  if (reservation.status === 'cancelled' || reservation.status === 'completed') return false

  return new Date(reservation.start_at).getTime() > Date.now()
}

function formatDate(dateString, options = {}) {
  if (!dateString) return 'No disponible'
  return new Intl.DateTimeFormat('es-ES', options).format(new Date(dateString))
}

function formatCompactDate(dateString) {
  return formatDate(dateString, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatDateInput(dateString) {
  if (!dateString) return ''

  const value = String(dateString)

  const match = value.match(/^(\d{4}-\d{2}-\d{2})/)

  if (match) {
    return match[1]
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')

  return `${year}-${month}-${day}`
}

function formatTime(dateString) {
  return formatDate(dateString, {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatTimeInput(dateString) {
  if (!dateString) return ''

  const value = String(dateString)

  const match = value.match(/T?(\d{2}):(\d{2})/)

  if (match) {
    return `${match[1]}:${match[2]}`
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  const hours = `${date.getHours()}`.padStart(2, '0')
  const minutes = `${date.getMinutes()}`.padStart(2, '0')

  return `${hours}:${minutes}`
}

function reservationDateLabel(reservation) {
  return isSameDay(reservation.start_at, reservation.end_at) ? 'Fecha' : 'Inicio'
}

function primaryDateValue(reservation) {
  return formatCompactDate(reservation.start_at)
}

function startSecondaryValue(reservation) {
  if (!isSameDay(reservation.start_at, reservation.end_at)) {
    return formatTime(reservation.start_at)
  }

  return ''
}

function detailMainValue(reservation) {
  if (isSameDay(reservation.start_at, reservation.end_at)) {
    return `${formatTime(reservation.start_at)} - ${formatTime(reservation.end_at)}`
  }

  return formatCompactDate(reservation.end_at)
}

function detailSecondaryValue(reservation) {
  if (isSameDay(reservation.start_at, reservation.end_at)) return ''
  return formatTime(reservation.end_at)
}

function getReservationServiceName(reservation) {
  return reservation?.service_name || reservation?.service?.name || 'Servicio'
}

function reservationSummary(reservation) {
  if (reservation.summary) return reservation.summary

  const serviceName = getReservationServiceName(reservation)

  if (isSameDay(reservation.start_at, reservation.end_at)) {
    return `${serviceName} prevista para ${formatCompactDate(reservation.start_at)}.`
  }

  return `Estancia prevista para ${reservation.pet_name} con servicio de ${serviceName.toLowerCase()}.`
}

function reservationObservations(reservation) {
  return (
    reservation.observations ||
    reservation.notes ||
    reservation.pet_notes ||
    'Sin observaciones adicionales registradas.'
  )
}

function getReservationPetImage(reservation) {
  const value =
    reservation?.pet_image ||
    reservation?.pet?.photo_url ||
    reservation?.pet?.photo_path ||
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

function reservationInitial(reservation) {
  return String(reservation?.pet_name || 'M').charAt(0).toUpperCase()
}

function reservationStatusLabel(status) {
  const labels = {
    confirmed: 'Confirmada',
    pending: 'Pendiente',
    cancelled: 'Cancelada',
    completed: 'Finalizada',
  }

  return labels[status] || 'Reservada'
}

function statusBadgeClass(status) {
  const classes = {
    confirmed: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
    pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
    cancelled: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
    completed: 'bg-violet-50 text-violet-700 ring-1 ring-violet-100',
  }

  return classes[status] || 'bg-[#F3ECFB] text-[#6E4FA2] ring-1 ring-[#EADDF7]'
}

function petDetailRoute(reservation) {
  return {
    name: 'my-pet-detail',
    params: { id: reservation.pet_id },
  }
}

function newReservationRoute(reservation) {
  return {
    name: 'my-reservations-new',
    query: reservation.pet_id ? { pet: reservation.pet_id } : {},
  }
}

function canCancelReservation(reservation) {
  if (!reservation) return false
  if (reservation.status !== 'pending') return false

  return new Date(reservation.start_at).getTime() > Date.now()
}

function canEditReservation(reservation) {
  if (!reservation) return false
  if (reservation.status !== 'pending') return false

  return new Date(reservation.start_at).getTime() > Date.now()
}

function getVisibleReports(reservation) {
  return (reservation?.daily_reports || [])
    .filter(isVisibleForClient)
    .sort((a, b) => new Date(b.report_date).getTime() - new Date(a.report_date).getTime())
}

function hasVisibleReports(reservation) {
  return getVisibleReports(reservation).length > 0
}

function isVisibleForClient(report) {
  const status = String(report?.status || '').toLowerCase()

  if (report?.is_draft || status === 'draft') return false

  if (['published', 'completed', 'complete'].includes(status)) return true

  if (report?.published_at || report?.completed_at) return true

  return Boolean(report?.summary)
}

function buildReservationFollowUpsLink(reservation) {
  const latestReport = getVisibleReports(reservation)[0]

  return {
    name: 'my-followups',
    query: {
      reservation: reservation.id,
      ...(latestReport?.id ? { report: latestReport.id } : {}),
    },
  }
}

function showReservationBottomRow(reservation) {
  return hasVisibleReports(reservation) || canEditReservation(reservation) || canCancelReservation(reservation)
}

function bottomActionsGridClass(reservation) {
  const total = [
    hasVisibleReports(reservation),
    canEditReservation(reservation),
    canCancelReservation(reservation),
  ].filter(Boolean).length

  if (total >= 3) return 'sm:grid-cols-3'
  if (total === 2) return 'sm:grid-cols-2'

  return 'grid-cols-1'
}

function openCancelModal(reservation) {
  reservationToCancel.value = reservation
  actionError.value = ''
  successMessage.value = ''
}

function openEditModal(reservation) {
  reservationToEdit.value = reservation
  actionError.value = ''
  successMessage.value = ''
  reservationFormErrors.value = {}
}

function closeEditModal() {
  reservationToEdit.value = null
  reservationFormErrors.value = {}
}

async function confirmEditReservation(payload) {
  if (!reservationToEdit.value) return

  isSubmitting.value = true
  actionError.value = ''
  successMessage.value = ''
  reservationFormErrors.value = {}

  try {
    const updatedReservation = await updateReservation(
      reservationToEdit.value.id,
      payload,
    )

    reservations.value = reservations.value.map((item) =>
      Number(item.id) === Number(reservationToEdit.value.id) ? updatedReservation : item,
    )

    successMessage.value =
      reservationsMessages.success?.updated ||
      'La reserva se ha actualizado correctamente.'

    closeEditModal()
  } catch (error) {
    console.error(error)

    reservationFormErrors.value = getValidationErrors(error)

    actionError.value = getReadableErrorMessage(
      error,
      reservationsMessages.errors?.update ||
        'No se ha podido actualizar la reserva.',
    )
  } finally {
    isSubmitting.value = false
  }
}

async function confirmCancelReservation() {
  if (!reservationToCancel.value) return

  isSubmitting.value = true
  actionError.value = ''
  successMessage.value = ''

  try {
    const cancelledReservation = await cancelReservation(reservationToCancel.value.id)

    reservations.value = reservations.value.map((item) =>
      Number(item.id) === Number(reservationToCancel.value.id) ? cancelledReservation : item,
    )

    successMessage.value =
      reservationsMessages.success?.cancelled ||
      'La reserva se ha cancelado correctamente.'

    reservationToCancel.value = null
  } catch (error) {
    console.error(error)

    actionError.value = getReadableErrorMessage(
      error,
      reservationsMessages.errors?.cancel ||
        'No se ha podido cancelar la reserva.',
    )
  } finally {
    isSubmitting.value = false
  }
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