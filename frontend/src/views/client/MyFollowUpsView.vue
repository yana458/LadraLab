<template>
  <section class="relative">
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
          <div class="flex min-h-[386px] flex-col justify-between p-5 sm:p-6 lg:p-7">
            <div class="animate-pulse">
              <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div class="min-w-0 max-w-4xl pt-1">
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

              <div class="mt-6 grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div
                  v-for="n in 4"
                  :key="n"
                  class="h-[132px] rounded-[24px] bg-white/15"
                ></div>
              </div>
            </div>
          </div>
        </header>

        <section class="rounded-[28px] border border-[#E8E1F1] bg-white px-5 py-4 shadow-sm sm:px-6 sm:py-5">
          <div class="animate-pulse">
            <div class="h-8 w-56 rounded bg-[#F3ECFB]"></div>
            <div class="mt-3 h-5 w-80 rounded bg-[#F7F1FC]"></div>

            <div class="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_220px_220px_220px]">
              <div class="h-11 rounded-2xl bg-[#F7F1FC]"></div>
              <div class="h-11 rounded-2xl bg-[#F7F1FC]"></div>
              <div class="h-11 rounded-2xl bg-[#F7F1FC]"></div>
              <div class="h-11 rounded-2xl bg-[#F7F1FC]"></div>
            </div>
          </div>
        </section>

        <section class="grid items-stretch gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          <article
            v-for="n in 3"
            :key="n"
            class="flex h-full min-h-[640px] flex-col rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm"
          >
            <div class="animate-pulse">
              <div class="flex min-h-[76px] items-start gap-4">
                <div class="h-14 w-14 rounded-2xl bg-[#EEE7F6]"></div>
                <div class="min-w-0 flex-1">
                  <div class="h-6 w-32 rounded bg-[#EEE7F6]"></div>
                  <div class="mt-3 h-5 w-40 rounded bg-[#F3EDF8]"></div>
                  <div class="mt-3 h-4 w-28 rounded bg-[#F7F1FC]"></div>
                </div>
              </div>

              <div class="mt-4 h-[116px] rounded-2xl bg-[#FCFBFE]"></div>
              <div class="mt-4 grid grid-cols-2 gap-2">
                <div class="h-9 rounded-2xl bg-[#F8F5FB]"></div>
                <div class="h-9 rounded-2xl bg-[#F8F5FB]"></div>
                <div class="h-9 rounded-2xl bg-[#F8F5FB]"></div>
                <div class="h-9 rounded-2xl bg-[#F8F5FB]"></div>
              </div>
              <div class="mt-4 h-24 rounded-2xl bg-[#FCFBFE]"></div>
              <div class="mt-6 h-11 rounded-2xl bg-[#6627A3]/15"></div>
            </div>
          </article>
        </section>
      </template>

      <template v-else>
        <header
          class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#5A208E] via-[#7A2EA6] to-[#E02890] text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
        >
          <div class="flex min-h-[386px] flex-col justify-between p-5 sm:p-6 lg:p-7">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div class="min-w-0 max-w-4xl pt-1">
                <h1 class="font-ladralab-brush text-5xl leading-none tracking-tight sm:text-6xl">
                  Mis seguimientos
                </h1>

                <p class="mt-5 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                  Revisa los resúmenes diarios de tus mascotas, con notas, cuidados y fotos de cada jornada.
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
                  :to="{ name: 'my-reservations' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Mis reservas
                </RouterLink>

                <RouterLink
                  :to="{ name: 'my-pets' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Mis mascotas
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
              <article
                v-for="card in quickCards"
                :key="card.label"
                class="flex min-h-[132px] flex-col rounded-[24px] border border-white/16 bg-white/12 p-4 backdrop-blur-sm"
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
              </article>
            </div>
          </div>
        </header>

        <section class="rounded-[28px] border border-[#E8E1F1] bg-white px-5 py-4 shadow-sm sm:px-6 sm:py-5">
          <div class="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 class="text-[26px] font-bold tracking-tight text-slate-900">
                Buscar seguimientos
              </h2>
              <p class="mt-1 text-sm text-slate-500">
                Filtra por mascota, servicio o fecha.
              </p>
            </div>

            <button
              v-if="hasActiveFilters"
              type="button"
              @click="clearFilters"
              class="inline-flex h-10 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:bg-[#F6F1FB]"
            >
              Limpiar filtros
            </button>
          </div>

          <div class="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_220px_220px_220px]">
            <label class="block">
              <span class="text-sm font-medium text-slate-700">Buscar</span>
              <input
                v-model="searchTerm"
                type="search"
                class="mt-2 h-11 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#B9A6D8] focus:ring-4 focus:ring-[#EFE7F8]"
                placeholder="Mascota, servicio o resumen"
              />
            </label>

            <label class="block">
              <span class="text-sm font-medium text-slate-700">Mascota</span>
              <select
                v-model="petFilter"
                class="mt-2 h-11 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#B9A6D8] focus:ring-4 focus:ring-[#EFE7F8]"
              >
                <option value="all">Todas</option>
                <option v-for="pet in clientPets" :key="pet.id" :value="String(pet.id)">
                  {{ pet.name }}
                </option>
              </select>
            </label>

            <label class="block">
              <span class="text-sm font-medium text-slate-700">Servicio</span>
              <select
                v-model="serviceFilter"
                class="mt-2 h-11 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#B9A6D8] focus:ring-4 focus:ring-[#EFE7F8]"
              >
                <option value="all">Todos</option>
                <option v-for="service in serviceOptions" :key="service" :value="service">
                  {{ service }}
                </option>
              </select>
            </label>

            <label class="block">
              <span class="text-sm font-medium text-slate-700">Ordenar</span>
              <select
                v-model="sortOrder"
                class="mt-2 h-11 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#B9A6D8] focus:ring-4 focus:ring-[#EFE7F8]"
              >
                <option value="latest">Más recientes</option>
                <option value="oldest">Más antiguos</option>
                <option value="pet">Mascota</option>
              </select>
            </label>
          </div>

          <div class="mt-4 flex flex-wrap gap-2">
            <span class="rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#7A4DA1]">
              {{ filteredReports.length }} resultados
            </span>

            <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Informes disponibles
            </span>

            <span
              v-if="reservationFilter !== 'all'"
              class="rounded-full bg-[#FCE8F4] px-3 py-1 text-xs font-semibold text-[#A22068]"
            >
              Reserva filtrada
            </span>
          </div>
        </section>

        <section v-if="filteredReports.length" class="grid items-stretch gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          <article
            v-for="report in filteredReports"
            :key="report.id"
            class="flex h-full min-h-[640px] flex-col rounded-[28px] border bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
            :class="isHighlighted(report) ? 'border-[#CDBBE4] ring-4 ring-[#F0E8F9]' : 'border-[#E8E1F1]'"
          >
            <div class="flex min-h-[76px] items-start gap-4">
              <img
                :src="getPetImage(report) || placeholderImage"
                :alt="`Foto de ${report.pet_name}`"
                class="h-14 w-14 shrink-0 rounded-2xl object-cover"
              />

              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="truncate text-lg font-bold text-slate-900">
                    {{ report.pet_name }}
                  </h3>
                  <span class="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                    Publicado
                  </span>
                </div>

                <p class="mt-1 text-sm font-semibold text-[#6A27A4]">
                  {{ report.service_name }}
                </p>
                <p class="mt-1 text-sm text-slate-500">
                  {{ formatDate(report.report_date) }}
                </p>
              </div>
            </div>

            <div class="mt-4 min-h-[116px] rounded-2xl border border-[#EFE7F8] bg-[#FCFBFE] p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-[#9AA7C0]">
                Resumen del día
              </p>
              <p class="mt-3 text-sm leading-6 text-slate-600">
                {{ report.summary || 'Seguimiento registrado sin resumen adicional.' }}
              </p>
            </div>

            <div class="mt-4 grid grid-cols-2 gap-2">
              <span
                v-for="item in checklistItems(report)"
                :key="item.label"
                class="rounded-2xl px-3 py-2 text-xs font-semibold"
                :class="item.done ? 'bg-emerald-50 text-emerald-700' : 'bg-[#F8F5FB] text-slate-400'"
              >
                {{ item.done ? '✓' : '·' }} {{ item.label }}
              </span>
            </div>

            <div class="mt-4 min-h-[112px]">
              <div v-if="getReportImages(report).length" class="grid grid-cols-3 gap-2">
                <img
                  v-for="image in getReportImages(report).slice(0, 3)"
                  :key="image.id || image.file_path || image.url"
                  :src="getMediaUrl(image)"
                  :alt="image.name || 'Imagen del seguimiento'"
                  class="h-24 w-full rounded-2xl object-cover"
                  @error="hideBrokenImage"
                />
              </div>

              <div
                v-else
                class="flex h-24 items-center justify-center rounded-2xl border border-dashed border-[#D9CEE8] bg-[#FCFBFE] px-4 text-center text-sm font-medium text-slate-400"
              >
                Aún no hay imágenes en este seguimiento.
              </div>
            </div>

            <div class="mt-auto pt-4">
              <RouterLink
                :to="buildPetLink(report)"
                class="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-[#6627A3] px-4 text-sm font-semibold text-white transition hover:bg-[#57208D]"
              >
                Ver mascota
              </RouterLink>
            </div>
          </article>
        </section>

        <section
          v-else
          class="rounded-[28px] border border-dashed border-[#D9CEE8] bg-white p-8 text-center shadow-sm"
        >
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#F6F1FB] text-3xl">
            🐾
          </div>
          <h2 class="mt-4 text-2xl font-bold text-slate-900">
            Todavía no hay seguimientos
          </h2>
          <p class="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Cuando haya nuevos resúmenes diarios, aparecerán aquí junto con sus fotos y cuidados registrados.
          </p>
          <RouterLink
            :to="{ name: 'my-reservations' }"
            class="mt-5 inline-flex h-11 items-center justify-center rounded-2xl bg-[#6627A3] px-5 text-sm font-semibold text-white transition hover:bg-[#57208D]"
          >
            Ver mis reservas
          </RouterLink>
        </section>
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { getMyReservations } from '@/services/reservationsService'
import { getReservationDailyLogs } from '@/services/dailyLogsService'
import { getReadableErrorMessage } from '@/utils/errorMessages'

const route = useRoute()
const router = useRouter()

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

const searchTerm = ref('')
const petFilter = ref(route.query.pet ? String(route.query.pet) : 'all')
const serviceFilter = ref('all')
const sortOrder = ref('latest')

const reservations = ref([])
const reports = ref([])

const isLoading = ref(true)
const loadError = ref('')

const reservationFilter = computed(() => {
  return route.query.reservation ? String(route.query.reservation) : 'all'
})

const placeholderImage =
  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=900&auto=format&fit=crop'

onMounted(() => {
  loadFollowUpsView()
})

async function loadFollowUpsView() {
  isLoading.value = true
  loadError.value = ''

  try {
    const reservationsData = await getMyReservations()
    reservations.value = Array.isArray(reservationsData) ? reservationsData : []

    const reportsByReservation = await Promise.all(
      reservations.value.map(async (reservation) => {
        try {
          const reservationReports = await getReservationDailyLogs(reservation.id)

          return reservationReports.map((report) =>
            normalizeReportFromReservation(report, reservation),
          )
        } catch (error) {
          console.warn(`No se pudieron cargar los seguimientos de la reserva ${reservation.id}`, error)
          return []
        }
      }),
    )

    reports.value = reportsByReservation.flat()
  } catch (error) {
    console.error(error)

    loadError.value = getReadableErrorMessage(
      error,
      'No hemos podido cargar tus seguimientos por ahora.',
    )
  } finally {
    isLoading.value = false
  }
}

const clientPets = computed(() => {
  const map = new Map()

  reservations.value.forEach((reservation) => {
    const pet = reservation.pet

    if (pet?.id) {
      map.set(Number(pet.id), {
        id: pet.id,
        name: pet.name || 'Mascota',
      })
    }
  })

  reports.value.forEach((report) => {
    if (report.pet_id) {
      map.set(Number(report.pet_id), {
        id: report.pet_id,
        name: report.pet_name || 'Mascota',
      })
    }
  })

  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name, 'es'))
})

const visibleReports = computed(() => {
  return reports.value
    .filter(isVisibleForClient)
    .sort((a, b) => new Date(b.report_date).getTime() - new Date(a.report_date).getTime())
})

const serviceOptions = computed(() => {
  return [...new Set(visibleReports.value.map((report) => report.service_name).filter(Boolean))].sort(
    (a, b) => a.localeCompare(b, 'es'),
  )
})

const quickCards = computed(() => [
  {
    label: 'Seguimientos',
    value: visibleReports.value.length,
    help: 'Resumen de actividad.',
    icon: '01',
    iconClass: 'bg-[#F3ECFB] text-[#5A208E]',
  },
  {
    label: 'Con fotos',
    value: visibleReports.value.filter((report) => getReportImages(report).length).length,
    help: 'Momentos compartidos.',
    icon: '02',
    iconClass: 'bg-emerald-50 text-emerald-700',
  },
  {
    label: 'Este mes',
    value: visibleReports.value.filter((report) => isCurrentMonth(report.report_date)).length,
    help: 'Resúmenes recientes.',
    icon: '03',
    iconClass: 'bg-amber-50 text-amber-700',
  },
  {
    label: 'Mascotas',
    value: clientPets.value.length,
    help: 'Mascotas con actividad.',
    icon: '04',
    iconClass: 'bg-[#FCE8F4] text-[#A22068]',
  },
])

const hasActiveFilters = computed(() => {
  return (
    searchTerm.value.trim() !== '' ||
    petFilter.value !== 'all' ||
    serviceFilter.value !== 'all' ||
    sortOrder.value !== 'latest' ||
    reservationFilter.value !== 'all'
  )
})

const filteredReports = computed(() => {
  let items = [...visibleReports.value]

  const query = searchTerm.value.trim().toLowerCase()

  if (query) {
    items = items.filter((report) => {
      return (
        report.pet_name?.toLowerCase().includes(query) ||
        report.service_name?.toLowerCase().includes(query) ||
        report.summary?.toLowerCase().includes(query)
      )
    })
  }

  if (petFilter.value !== 'all') {
    items = items.filter((report) => String(report.pet_id) === String(petFilter.value))
  }

  if (reservationFilter.value !== 'all') {
    items = items.filter((report) => String(report.reservation_id) === reservationFilter.value)
  }

  if (serviceFilter.value !== 'all') {
    items = items.filter((report) => report.service_name === serviceFilter.value)
  }

  if (sortOrder.value === 'oldest') {
    items.sort((a, b) => new Date(a.report_date).getTime() - new Date(b.report_date).getTime())
  } else if (sortOrder.value === 'pet') {
    items.sort((a, b) => a.pet_name.localeCompare(b.pet_name, 'es'))
  } else {
    items.sort((a, b) => new Date(b.report_date).getTime() - new Date(a.report_date).getTime())
  }

  return items
})

function normalizeReportFromReservation(report = {}, reservation = {}) {
  const pet = reservation.pet || {}
  const service = reservation.service || {}

  return {
    ...report,
    id: report.id,
    reservation_id: report.reservation_id || reservation.id,
    reservation,
    pet,
    pet_id: pet.id || reservation.pet_id || null,
    pet_name: pet.name || reservation.pet_name || 'Mascota',
    pet_image:
      pet.photo_url ||
      pet.photo_path ||
      pet.photo_preview ||
      reservation.pet_image ||
      '',
    service_id: service.id || reservation.service_id || null,
    service_name: reservation.service_name || service.name || 'Servicio',
    report_date: normalizeDateKey(report.report_date || report.completed_at || reservation.start_at),
    media: Array.isArray(report.media) ? report.media : [],
    photos: Array.isArray(report.photos) ? report.photos : [],
  }
}

function isVisibleForClient(report) {
  const status = String(report?.status || '').toLowerCase()

  if (report?.is_draft || status === 'draft') return false

  return status === 'published' || Boolean(report?.published_at)
}

function checklistItems(report) {
  return [
    { label: 'Comida', done: report.food_done },
    { label: 'Paseo', done: report.walk_done },
    { label: 'Descanso', done: report.rest_done },
    { label: 'Higiene', done: report.hygiene_done },
    { label: 'Medicación', done: report.medication_done },
    { label: 'Juego', done: report.play_done },
  ]
}

function clearFilters() {
  searchTerm.value = ''
  petFilter.value = 'all'
  serviceFilter.value = 'all'
  sortOrder.value = 'latest'

  if (Object.keys(route.query).length) {
    router.replace({ name: route.name, query: {} })
  }
}

function buildPetLink(report) {
  return {
    name: 'my-pet-detail',
    params: {
      id: report.pet_id,
    },
  }
}

function isHighlighted(report) {
  return String(route.query.report || '') === String(report.id)
}

function getPetImage(report) {
  return getStorageUrl(report?.pet_image || report?.pet?.photo_url || report?.pet?.photo_path || '')
}

function getReportImages(report) {
  const media = Array.isArray(report?.media) ? report.media : []
  const photos = Array.isArray(report?.photos) ? report.photos : []

  return [...media, ...photos].filter((item) => {
    const type = String(item?.file_type || item?.type || '').toLowerCase()
    const path = item?.url || item?.file_url || item?.file_path || item?.path || ''

    if (!path) return false
    if (type && type !== 'image') return false

    return /\.(jpg|jpeg|png|webp|gif)$/i.test(path) || type === 'image'
  })
}

function getMediaUrl(mediaItem) {
  const value =
    mediaItem?.url ||
    mediaItem?.file_url ||
    mediaItem?.file_path ||
    mediaItem?.path ||
    ''

  return getStorageUrl(value)
}

function hideBrokenImage(event) {
  event.target.style.display = 'none'
}

function getStorageUrl(value) {
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

function normalizeDateKey(value) {
  if (!value) return ''
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return ''

  return date.toISOString().slice(0, 10)
}

function formatDate(value) {
  if (!value) return 'Sin fecha'

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

function isCurrentMonth(value) {
  if (!value) return false

  const date = new Date(value)
  const now = new Date()

  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
}
</script>

<style scoped>
.font-ladralab-brush {
  font-family: 'Caveat Brush', 'Brush Script MT', 'Segoe Script', cursive;
}
</style>