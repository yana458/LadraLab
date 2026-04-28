<template>
  <section>
    <div class="pointer-events-none fixed right-6 top-6 z-[70] flex w-full max-w-md flex-col gap-3">
      <div
        v-if="loadError"
        class="pointer-events-auto flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-lg"
      >
        <span class="mt-0.5 text-base">⚠️</span>
        <p>{{ loadError }}</p>
      </div>
    </div>

    <div class="mx-auto max-w-7xl space-y-6">
      <template v-if="isLoading">
        <header
          class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#5A208E] via-[#7A2EA6] to-[#E02890] text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
        >
          <div class="flex min-h-[385px] flex-col justify-between p-5 sm:p-6 lg:p-7">
            <div class="animate-pulse">
              <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div class="h-11 w-52 rounded-2xl bg-white/20"></div>

                <div class="grid w-full max-w-[320px] gap-3 sm:grid-cols-2">
                  <div class="h-11 rounded-2xl bg-white/20"></div>
                  <div class="h-11 rounded-2xl bg-white/20"></div>
                  <div class="h-11 rounded-2xl bg-white/20 sm:col-span-2"></div>
                </div>
              </div>

              <div class="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_580px] xl:items-end">
                <div class="flex items-center gap-5">
                  <div class="h-40 w-40 rounded-[34px] bg-white/20"></div>

                  <div class="min-w-0 flex-1">
                    <div class="h-12 w-44 rounded bg-white/20"></div>
                    <div class="mt-4 h-5 w-72 rounded bg-white/20"></div>
                    <div class="mt-4 h-4 w-full max-w-xl rounded bg-white/15"></div>
                    <div class="mt-2 h-4 w-full max-w-lg rounded bg-white/15"></div>
                  </div>
                </div>

                <div class="grid gap-3 sm:grid-cols-3">
                  <div class="h-[160px] rounded-[24px] bg-white/15"></div>
                  <div class="h-[160px] rounded-[24px] bg-white/15"></div>
                  <div class="h-[160px] rounded-[24px] bg-white/15"></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section class="grid items-stretch gap-6 xl:grid-cols-[minmax(0,1.08fr)_340px]">
          <div class="h-[430px] rounded-[28px] border border-[#E8E1F1] bg-white shadow-sm"></div>
          <div class="h-[430px] rounded-[28px] border border-[#E8E1F1] bg-white shadow-sm"></div>
        </section>

        <section class="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_340px] xl:items-start">
          <div class="h-[420px] rounded-[28px] border border-[#E8E1F1] bg-white shadow-sm"></div>
          <div class="h-[260px] rounded-[28px] border border-[#E8E1F1] bg-white shadow-sm"></div>
        </section>
      </template>

      <template v-else-if="pet">
        <!-- CABECERA -->
        <header
          class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#5A208E] via-[#7A2EA6] to-[#E02890] text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
        >
          <div class="flex min-h-[386px] flex-col justify-between p-5 sm:p-6 lg:p-7">
            <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <RouterLink
                :to="{ name: 'my-pets' }"
                class="inline-flex h-11 w-fit items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
              >
                ← Volver a mis mascotas
              </RouterLink>

              <div class="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
                <RouterLink
                  :to="{ name: 'my-pet-edit', params: { id: pet.id } }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Editar ficha
                </RouterLink>

                <RouterLink
                  :to="{ name: 'my-reservations' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Mis reservas
                </RouterLink>

                <RouterLink
                  :to="buildPetFollowUpsLink(pet)"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Seguimientos
                </RouterLink>

                <RouterLink
                  :to="{ name: 'my-reservations-new', query: { pet: pet.id } }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:bg-[#F8F2FF]"
                >
                  Nueva reserva
                </RouterLink>
              </div>
            </div>

            <div class="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1fr)_540px] xl:items-end">
              <div class="flex flex-col gap-5 sm:flex-row sm:items-end">
                <div
                  class="flex h-36 w-36 shrink-0 items-center justify-center overflow-hidden rounded-[32px] border border-white/20 bg-white/12 text-6xl font-bold text-white shadow-[0_24px_60px_-25px_rgba(0,0,0,0.38)] ring-4 ring-white/10 sm:h-40 sm:w-40"
                >
                  <img
                    v-if="getPetImage(pet)"
                    :src="getPetImage(pet)"
                    :alt="pet.name"
                    class="h-full w-full object-cover"
                  />
                  <span v-else>{{ pet.name.charAt(0) }}</span>
                </div>

                <div class="min-w-0 flex-1 pb-1">
                  <h1 class="font-ladralab-brush text-5xl leading-none tracking-tight sm:text-6xl">
                    {{ pet.name }}
                  </h1>

                  <p class="mt-3 text-base text-white/92 sm:text-[1.05rem]">
                    {{ pet.breed || 'Raza no indicada' }} · {{ sizeLabel(pet.size) }} ·
                    {{ ageLabel(pet.birth_date) }}
                  </p>

                  <p class="mt-4 max-w-2xl text-sm leading-7 text-white/88 sm:text-base">
                    Ficha, reservas y últimos cuidados en un mismo lugar.
                  </p>
                </div>
              </div>

              <div class="grid gap-3 sm:grid-cols-3">
                <article
                  class="flex min-h-[146px] flex-col rounded-[24px] border border-white/16 bg-white/12 p-4 backdrop-blur-sm"
                >
                  <p class="text-sm font-medium text-white/85">Reservas</p>
                  <p class="mt-2 text-4xl font-bold leading-none text-white">
                    {{ sortedReservations.length }}
                  </p>
                  <p class="mt-4 text-sm leading-6 text-white/82">
                    Historial y próximas estancias.
                  </p>
                </article>

                <article
                  class="flex min-h-[146px] flex-col rounded-[24px] border border-white/16 bg-white/12 p-4 backdrop-blur-sm"
                >
                  <p class="text-sm font-medium text-white/85">Seguimientos</p>
                  <p class="mt-2 text-4xl font-bold leading-none text-white">
                    {{ visibleReports.length }}
                  </p>
                  <p class="mt-4 text-sm leading-6 text-white/82">
                    Resúmenes recibidos.
                  </p>
                </article>

                <article
                  class="flex min-h-[146px] flex-col rounded-[24px] border border-white/16 bg-white/12 p-4 backdrop-blur-sm"
                >
                  <p class="text-sm font-medium text-white/85">Próxima reserva</p>
                  <p class="mt-2 text-3xl font-bold leading-none text-white">
                    {{ currentOrUpcomingReservation ? formatShortDate(currentOrUpcomingReservation.start_at) : '—' }}
                  </p>
                  <p class="mt-4 text-sm leading-6 text-white/82">
                    {{ currentOrUpcomingReservation?.service_name || 'Sin fecha prevista.' }}
                  </p>
                </article>
              </div>
            </div>
          </div>
        </header>

        <!-- FICHA + ACCESOS RÁPIDOS -->
        <section class="grid items-stretch gap-6 xl:grid-cols-[minmax(0,1.08fr)_340px]">
          <article class="flex h-full min-h-[430px] flex-col rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 class="text-lg font-bold tracking-tight text-slate-900">
                  Ficha de {{ pet.name }}
                </h2>
                <p class="mt-1 text-sm text-slate-500">
                  Información general guardada en su perfil.
                </p>
              </div>

              <span class="inline-flex w-fit items-center rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#5A208E]">
                Perfil
              </span>
            </div>

            <div class="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div class="rounded-2xl border border-[#EEE7F6] bg-gradient-to-br from-[#FAF4FF] to-[#F8EEF8] px-4 py-4">
                <p class="text-xs font-semibold uppercase tracking-wide text-[#9887B1]">Nombre</p>
                <p class="mt-2 text-sm font-semibold text-slate-900">{{ pet.name }}</p>
              </div>

              <div class="rounded-2xl border border-[#EEE7F6] bg-gradient-to-br from-[#FAF4FF] to-[#F8EEF8] px-4 py-4">
                <p class="text-xs font-semibold uppercase tracking-wide text-[#9887B1]">Raza</p>
                <p class="mt-2 text-sm font-semibold text-slate-900">
                  {{ pet.breed || 'No indicada' }}
                </p>
              </div>

              <div class="rounded-2xl border border-[#EEE7F6] bg-gradient-to-br from-[#FAF4FF] to-[#F8EEF8] px-4 py-4">
                <p class="text-xs font-semibold uppercase tracking-wide text-[#9887B1]">Tamaño</p>
                <p class="mt-2 text-sm font-semibold text-slate-900">{{ sizeLabel(pet.size) }}</p>
              </div>

              <div class="rounded-2xl border border-[#EEE7F6] bg-gradient-to-br from-[#FAF4FF] to-[#F8EEF8] px-4 py-4">
                <p class="text-xs font-semibold uppercase tracking-wide text-[#9887B1]">Edad</p>
                <p class="mt-2 text-sm font-semibold text-slate-900">{{ ageLabel(pet.birth_date) }}</p>
              </div>

              <div class="rounded-2xl border border-[#EEE7F6] bg-gradient-to-br from-[#FAF4FF] to-[#F8EEF8] px-4 py-4 sm:col-span-2">
                <p class="text-xs font-semibold uppercase tracking-wide text-[#9887B1]">Estado actual</p>
                <p class="mt-2 text-sm font-semibold text-slate-900">
                  {{
                    currentReservation
                      ? 'En el centro hoy'
                      : currentOrUpcomingReservation
                        ? 'Con próxima reserva'
                        : 'Sin reserva prevista'
                  }}
                </p>
              </div>
            </div>

            <div
              class="mt-5 flex min-h-[230px] flex-1 flex-col rounded-[24px] border border-[#E9D7E8] bg-gradient-to-br from-[#FFF8FC] via-white to-[#F9F3FF] p-5"
            >
              <h3 class="text-lg font-bold tracking-tight text-slate-900">
                Observaciones de la ficha
              </h3>

              <p
                v-if="pet.care_notes"
                class="mt-4 text-sm leading-7 text-slate-600"
              >
                {{ pet.care_notes }}
              </p>

              <p
                v-else
                class="mt-4 text-sm leading-7 text-slate-500"
              >
                No hay observaciones importantes registradas en este momento.
              </p>
            </div>
          </article>

          <aside class="flex h-full min-h-[430px] flex-col rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
            <div>
              <h2 class="text-lg font-bold tracking-tight text-slate-900">Accesos rápidos</h2>
              <p class="mt-1 text-sm text-slate-500">
                Accesos principales de {{ pet.name }}.
              </p>
            </div>

            <div class="mt-5 space-y-3">
              <RouterLink
                :to="{ name: 'my-pet-edit', params: { id: pet.id } }"
                class="inline-flex w-full items-center justify-center rounded-2xl border border-[#E9D7E8] bg-white px-4 py-3 text-sm font-semibold text-[#514980] transition hover:border-[#E02890]/30 hover:text-[#A22068] hover:ring-4 hover:ring-[#E02890]/10"
              >
                Editar ficha
              </RouterLink>

              <RouterLink
                :to="{ name: 'my-reservations-new', query: { pet: pet.id } }"
                class="inline-flex w-full items-center justify-center rounded-2xl bg-[#5A208E] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4B1A77]"
              >
                Hacer una reserva
              </RouterLink>

              <RouterLink
                :to="{ name: 'my-reservations' }"
                class="inline-flex w-full items-center justify-center rounded-2xl border border-[#E9D7E8] bg-white px-4 py-3 text-sm font-semibold text-[#514980] transition hover:border-[#E02890]/30 hover:text-[#A22068] hover:ring-4 hover:ring-[#E02890]/10"
              >
                Ver mis reservas
              </RouterLink>

              <RouterLink
                :to="buildPetFollowUpsLink(pet)"
                class="inline-flex w-full items-center justify-center rounded-2xl border border-[#E9D7E8] bg-white px-4 py-3 text-sm font-semibold text-[#514980] transition hover:border-[#E02890]/30 hover:text-[#A22068] hover:ring-4 hover:ring-[#E02890]/10"
              >
                Ver seguimientos
              </RouterLink>
            </div>

            <div class="mt-auto rounded-[22px] border border-[#EEE7F6] bg-[#FAF8FC] p-4">
              <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Última actualización
              </p>
              <p class="mt-2 text-sm font-semibold text-slate-900">
                {{ formatDate(pet.updated_at || pet.created_at) }}
              </p>
            </div>
          </aside>
        </section>

        <!-- RESERVAS + RESÚMENES -->
        <section class="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_340px] xl:items-start">
          <article class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 class="text-lg font-bold tracking-tight text-slate-900">
                  Reservas y estancias
                </h2>
                <p class="mt-1 text-sm text-slate-500">
                  Consulta las reservas registradas para {{ pet.name }}.
                </p>
              </div>

              <span class="inline-flex w-fit whitespace-nowrap items-center rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#5A208E]">
                {{ reservationsCountLabel }}
              </span>
            </div>

            <div v-if="sortedReservations.length" class="mt-5 space-y-4">
              <article
                v-for="reservation in sortedReservations"
                :key="reservation.id"
                class="rounded-[24px] border border-[#ECE5F5] bg-[#FCFBFE] p-4"
              >
                <div class="flex flex-col gap-4">
                  <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div class="flex flex-wrap items-center gap-2">
                        <h3 class="text-xl font-bold tracking-tight text-slate-900">
                          {{ reservation.service_name }}
                        </h3>

                        <span
                          class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                          :class="statusBadgeClass(reservation.status)"
                        >
                          {{ statusLabel(reservation.status) }}
                        </span>

                        <span
                          class="inline-flex items-center rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#5A208E]"
                        >
                          {{ bookingModeLabel(getReservationBookingMode(reservation)) }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="grid gap-3 sm:grid-cols-2">
                    <div class="rounded-2xl bg-white p-4 ring-1 ring-[#F0E8F7]">
                      <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {{ reservationPrimaryDateLabel(reservation) }}
                      </p>
                      <p class="mt-1 text-sm font-semibold text-slate-800">
                        {{ reservationPrimaryDateValue(reservation) }}
                      </p>
                    </div>

                    <div class="rounded-2xl bg-white p-4 ring-1 ring-[#F0E8F7]">
                      <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Detalle
                      </p>
                      <p class="mt-1 text-sm font-semibold text-slate-800">
                        {{ reservationSecondaryDateValue(reservation) }}
                      </p>
                    </div>
                  </div>

                  <div class="rounded-2xl bg-white p-4 ring-1 ring-[#F0E8F7]">
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Resumen
                    </p>
                    <p class="mt-2 text-sm leading-6 text-slate-600">
                      {{ reservationSummaryText(reservation) }}
                    </p>
                  </div>

                  <div
                    v-if="reservation.notes"
                    class="rounded-2xl bg-white p-4 ring-1 ring-[#F0E8F7]"
                  >
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Observaciones
                    </p>
                    <p class="mt-2 text-sm leading-6 text-slate-600">
                      {{ reservation.notes }}
                    </p>
                  </div>
                </div>
              </article>
            </div>

            <div
              v-else
              class="mt-5 rounded-2xl border border-dashed border-[#DDCFEA] bg-[#FCFBFE] px-5 py-8 text-center"
            >
              <p class="text-sm font-semibold text-slate-700">
                Todavía no hay reservas registradas para {{ pet.name }}.
              </p>
              <p class="mt-2 text-sm text-slate-500">
                Cuando prepares una nueva estancia, la verás aquí.
              </p>
            </div>
          </article>

          <aside class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 class="text-lg font-bold tracking-tight text-slate-900">
                  Resúmenes disponibles
                </h2>
                <p class="mt-1 text-sm text-slate-500">
Últimos resúmenes de {{ pet.name }}.
                </p>
              </div>

              <span
                class="inline-flex shrink-0 whitespace-nowrap items-center rounded-full bg-[#FCE8F4] px-3 py-1 text-xs font-semibold text-[#A22068]"
              >
                {{ reportsCountBadgeLabel }}
              </span>
            </div>

            <div v-if="visibleReports.length" class="mt-5 space-y-4">
              <article
                v-for="report in visibleReports"
                :key="report.id"
                class="rounded-[22px] border border-[#EEE7F6] bg-[#FCFBFE] p-4"
              >
                <div class="flex flex-wrap items-center gap-2">
                  <p class="text-sm font-bold text-slate-900">
                    {{ report.reservation_name }}
                  </p>

                  <span class="inline-flex items-center rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#7A2EA6]">
                    {{ formatDate(report.report_date) }}
                  </span>
                </div>

                <p class="mt-3 text-sm leading-6 text-slate-600">
                  {{ report.summary }}
                </p>

                <RouterLink
                  :to="buildReportFollowUpLink(report)"
                  class="mt-4 inline-flex h-10 w-full items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                >
                  Ver seguimiento
                </RouterLink>
              </article>
            </div>

            <div
              v-else
              class="mt-5 rounded-[22px] bg-[#FAF8FC] p-4 text-sm leading-6 text-slate-500"
            >
Aún no hay seguimientos disponibles para esta mascota.
            </div>
          </aside>
        </section>
      </template>

      <template v-else-if="!isLoading && !loadError">
        <div
          class="rounded-[28px] border border-dashed border-[#DCCFEA] bg-white px-6 py-14 text-center shadow-sm"
        >
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3ECFB] text-xl font-bold text-[#5A208E]">
            🐾
          </div>

          <h1 class="mt-4 text-xl font-bold text-slate-900">No hemos encontrado esta ficha</h1>
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
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getMyPetById } from '@/services/petsService'
import { getReadableErrorMessage } from '@/utils/errorMessages'
import { uiMessages } from '@/utils/uiMessages'

const route = useRoute()

const pet = ref(null)
const isLoading = ref(false)
const loadError = ref('')

const petId = computed(() => Number(route.params.id))

onMounted(() => {
  loadPet()
})

async function loadPet() {
  isLoading.value = true
  loadError.value = ''

  try {
    pet.value = await getMyPetById(petId.value)
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

const sortedReservations = computed(() => {
  if (!pet.value?.reservations) return []
  return [...pet.value.reservations].sort(
    (a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime(),
  )
})

const visibleReports = computed(() => {
  if (!pet.value?.reservations?.length) return []

  return pet.value.reservations
    .flatMap((reservation) =>
      (reservation.daily_reports || [])
        .filter((report) => Boolean(report.summary) && isVisibleForClient(report))
        .map((report) => ({
          ...report,
          reservation_id: reservation.id,
          reservation_name: reservation.service_name,
        })),
    )
    .sort((a, b) => new Date(b.report_date).getTime() - new Date(a.report_date).getTime())
})

const currentReservation = computed(() => {
  const now = Date.now()

  return (
    pet.value?.reservations?.find((reservation) => {
      if (reservation.status === 'cancelled') return false
      const start = new Date(reservation.start_at).getTime()
      const end = reservation.end_at ? new Date(reservation.end_at).getTime() : start
      return now >= start && now <= end
    }) || null
  )
})

const upcomingReservation = computed(() => {
  const now = Date.now()

  return (
    [...(pet.value?.reservations || [])]
      .filter((reservation) => {
        if (reservation.status === 'cancelled') return false
        return new Date(reservation.start_at).getTime() > now
      })
      .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime())[0] || null
  )
})

const currentOrUpcomingReservation = computed(() => {
  return currentReservation.value || upcomingReservation.value || null
})

const reportsCountBadgeLabel = computed(() => {
  const total = visibleReports.value.length
  return `${total} ${total === 1 ? 'resumen' : 'resúmenes'}`
})

const reservationsCountLabel = computed(() => {
  const total = sortedReservations.value.length
  return `${total} ${total === 1 ? 'reserva' : 'reservas'}`
})

function isVisibleForClient(report) {
  const status = String(report?.status || '').toLowerCase()

  if (status === 'draft') return false
  if (status === 'published' || status === 'completed') return true

  return Boolean(report?.published_at || report?.completed_at)
}

function buildPetFollowUpsLink(petItem) {
  return {
    name: 'my-followups',
    query: { pet: petItem.id },
  }
}

function buildReportFollowUpLink(report) {
  return {
    name: 'my-followups',
    query: {
      pet: pet.value?.id,
      report: report.id,
    },
  }
}

function getPetImage(petItem) {
  return petItem?.photo_preview || petItem?.photo_path || ''
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

function statusLabel(status) {
  const labels = {
    pending: 'Pendiente',
    confirmed: 'Confirmada',
    cancelled: 'Cancelada',
    completed: 'Finalizada',
  }

  return labels[status] || status || 'Reserva'
}

function statusBadgeClass(status) {
  const classes = {
    pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
    confirmed: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
    cancelled: 'bg-rose-50 text-rose-700 ring-1 ring-rose-100',
    completed: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
  }

  return classes[status] || 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
}

function inferBookingMode(reservation) {
  if (!reservation?.start_at || !reservation?.end_at) return 'single_day'

  const start = new Date(reservation.start_at)
  const end = new Date(reservation.end_at)

  const sameDay =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate()

  const diffMinutes = Math.round((end.getTime() - start.getTime()) / (1000 * 60))

  if (!sameDay) return 'date_range'
  if (diffMinutes > 0 && diffMinutes <= 12 * 60) return 'time_slot'
  return 'single_day'
}

function getReservationBookingMode(reservation) {
  return reservation?.service?.booking_mode || inferBookingMode(reservation)
}

function bookingModeLabel(mode) {
  const labels = {
    date_range: 'Estancia',
    single_day: 'Día',
    time_slot: 'Cita',
  }

  return labels[mode] || 'Reserva'
}

function reservationPrimaryDateLabel(reservation) {
  const mode = getReservationBookingMode(reservation)
  return mode === 'date_range' ? 'Inicio' : 'Fecha'
}

function reservationPrimaryDateValue(reservation) {
  const mode = getReservationBookingMode(reservation)

  if (mode === 'date_range') return formatDateTime(reservation.start_at)
  if (mode === 'time_slot') return formatDate(reservation.start_at)
  return formatDate(reservation.start_at)
}

function reservationSecondaryDateValue(reservation) {
  const mode = getReservationBookingMode(reservation)

  if (mode === 'date_range') return `Hasta ${formatDateTime(reservation.end_at)}`
  if (mode === 'time_slot') {
    return `${formatOnlyTime(reservation.start_at)} · ${reservationDurationLabel(reservation)}`
  }

  return `${formatOnlyTime(reservation.start_at)} - ${formatOnlyTime(reservation.end_at)}`
}

function reservationDurationLabel(reservation) {
  if (!reservation.start_at || !reservation.end_at) return 'Pendiente'

  const start = new Date(reservation.start_at).getTime()
  const end = new Date(reservation.end_at).getTime()
  const diffMinutes = Math.round((end - start) / (1000 * 60))

  if (getReservationBookingMode(reservation) === 'date_range') {
    const diffDays = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1
    return diffDays <= 1 ? '1 día' : `${diffDays} días`
  }

  if (diffMinutes < 60) return `${diffMinutes} min`
  if (diffMinutes % 60 === 0) {
    const hours = diffMinutes / 60
    return hours === 1 ? '1 hora' : `${hours} horas`
  }

  return `${diffMinutes} min`
}

function reservationSummaryText(reservation) {
  const mode = getReservationBookingMode(reservation)

  if (mode === 'date_range') {
    return `Estancia prevista ${reservationDurationLabel(reservation).toLowerCase()} para ${pet.value?.name || 'tu mascota'}.`
  }

  if (mode === 'time_slot') {
    return `Cita programada para ${formatDate(reservation.start_at)} a las ${formatOnlyTime(reservation.start_at)}.`
  }

  return `Reserva prevista para ${formatDate(reservation.start_at)} durante la jornada.`
}

function formatDate(dateString) {
  if (!dateString) return 'Sin fecha'

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString))
}

function formatDateTime(dateString) {
  if (!dateString) return 'Sin fecha'

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString))
}

function formatOnlyTime(dateString) {
  if (!dateString) return 'Sin hora'

  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString))
}

function formatShortDate(dateString) {
  if (!dateString) return '—'

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
  }).format(new Date(dateString))
}
</script>

<style scoped>
.font-ladralab-brush {
  font-family: "Caveat Brush", "Brush Script MT", "Segoe Script", cursive;
  font-weight: 700;
}
</style>