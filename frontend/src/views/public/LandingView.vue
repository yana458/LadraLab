<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const loginRoute = '/login'
const registerRoute = '/registro'

const mainLogo = '/images/ladralab-logo.png'

const registeredPetIcon = '/images/registered-pet-icon.png'
const activeReservationsIcon = '/images/active-reservations-icon.png'
const pendingFollowupsIcon = '/images/pending-followups-icon.png'
const infoIcon = '/images/info-icon.png'
const followupsIcon = '/images/followups-icon.png'
const familiesAccessIcon = '/images/families-access-icon.png'
const safeAccessIcon = '/images/safe-access-icon.png'
const safeInfoIcon = '/images/safe-info-icon.png'

// La landing usa datos demostrativos propios. No se conecta al backend ni depende de /src/mocks.

const fallbackPets = [
  {
    id: 1,
    name: 'Luna',
    species: 'Perro',
    breed: 'Border Collie',
    photo_path:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop',
    care_notes:
      'Sensibilidad digestiva. Conviene respetar su comida habitual y vigilar si come demasiado rápido.',
  },
  {
    id: 2,
    name: 'Milo',
    species: 'Perro',
    breed: 'Teckel',
    photo_path:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1200&auto=format&fit=crop',
    care_notes:
      'Puede mostrarse algo nervioso al entrar. Le ayuda empezar en una zona más tranquila antes de pasar al grupo.',
  },
  {
    id: 3,
    name: 'Nala',
    species: 'Perro',
    breed: 'Golden Retriever',
    photo_path:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1200&auto=format&fit=crop',
    care_notes:
      'Muy cariñosa y sociable. Se emociona al inicio del día, pero responde bien a rutinas de calma.',
  },
]

const fallbackResources = [
  { id: 1, name: 'Patio Nala', type: 'patio', status: 'active' },
  { id: 2, name: 'Suite Thor', type: 'suite', status: 'active' },
  { id: 3, name: 'Sala calma', type: 'sala', status: 'cleaning' },
  { id: 4, name: 'Patio Rocky', type: 'patio', status: 'active' },
  { id: 5, name: 'Patio exterior', type: 'patio', status: 'active' },
  { id: 6, name: 'Sala descanso', type: 'sala', status: 'active' },
  { id: 7, name: 'Suite Luna', type: 'suite', status: 'active' },
  { id: 8, name: 'Zona adaptación', type: 'sala', status: 'active' },
  { id: 9, name: 'Sala tranquila', type: 'sala', status: 'active' },
  { id: 10, name: 'Patio pequeño', type: 'patio', status: 'active' },
  { id: 11, name: 'Espacio individual', type: 'suite', status: 'active' },
]

const fallbackServices = [
  { id: 1, name: 'Guardería de día', category: 'daycare', is_active: true },
  { id: 2, name: 'Hotel canino', category: 'boarding', is_active: true },
  { id: 3, name: 'Adaptación tranquila', category: 'daycare', is_active: true },
]

const fallbackReservations = [
  {
    id: 1,
    pet_id: 1,
    service_id: 1,
    resource_id: 1,
    status: 'confirmed',
    start_at: '2026-05-06T09:00:00',
    end_at: '2026-05-06T18:00:00',
    service_name: 'Guardería de día',
    resource_name: 'Patio Nala',
    daily_reports: [
      {
        id: 401,
        report_date: '2026-05-06',
        status: 'completed',
        food_done: true,
        walk_done: true,
        rest_done: true,
        hygiene_done: false,
        medication_done: false,
        play_done: true,
        summary:
          'Día tranquilo y activo. Ha estado cómoda en grupo, ha comido bien y descansó con normalidad.',
        observations: 'Buena interacción con otros perros. Sin incidencias durante la jornada.',
        media: [
          {
            id: 901,
            file_path:
              'https://images.unsplash.com/photo-1558788353-f76d92427f16?q=80&w=900&auto=format&fit=crop',
            name: 'luna-1.jpg',
          },
          {
            id: 902,
            file_path:
              'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=900&auto=format&fit=crop',
            name: 'luna-2.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    pet_id: 3,
    service_id: 1,
    resource_id: 4,
    status: 'confirmed',
    start_at: '2026-05-06T08:45:00',
    end_at: '2026-05-06T17:30:00',
    service_name: 'Guardería de día',
    resource_name: 'Patio Rocky',
    daily_reports: [],
  },
  {
    id: 3,
    pet_id: 2,
    service_id: 3,
    resource_id: 3,
    status: 'confirmed',
    start_at: '2026-05-06T10:00:00',
    end_at: '2026-05-06T15:00:00',
    service_name: 'Adaptación tranquila',
    resource_name: 'Sala calma',
    daily_reports: [],
  },
]

const pets = fallbackPets
const resources = fallbackResources
const services = fallbackServices
const reservations = fallbackReservations

const isScrolled = ref(false)
const activeRole = ref(0)

let revealObserver = null

const enrichedReservations = computed(() =>
  reservations
    .filter((reservation) => reservation.status !== 'cancelled')
    .map((reservation) => {
      const petId = reservation.pet_id ?? reservation.petId ?? reservation.pet?.id
      const serviceId = reservation.service_id ?? reservation.serviceId ?? reservation.service?.id
      const resourceId =
        reservation.resource_id ?? reservation.resourceId ?? reservation.resource?.id

      const pet = reservation.pet || pets.find((item) => Number(item.id) === Number(petId))

      const service =
        reservation.service ||
        services.find((item) => Number(item.id) === Number(serviceId))

      const resource =
        reservation.resource ||
        resources.find((item) => Number(item.id) === Number(resourceId))

      return {
        ...reservation,
        pet,
        serviceName:
          reservation.service_name || reservation.serviceName || service?.name || 'Servicio',
        resourceName:
          reservation.resource_name || reservation.resourceName || resource?.name || 'Recurso',
        reports:
          reservation.daily_reports || reservation.dailyReports || reservation.reports || [],
      }
    }),
)

const visibleReservations = computed(() => enrichedReservations.value.slice(0, 3))

const pendingFollowups = computed(() =>
  enrichedReservations.value.filter((reservation) => {
    const reports = reservation.reports || []
    const hasCompletedReport = reports.some((report) => report.status === 'completed')

    return ['confirmed', 'pending'].includes(reservation.status) && !hasCompletedReport
  }),
)

const activeResources = computed(() =>
  resources.filter((resource) => resource.status !== 'disabled'),
)

const occupiedResources = computed(() => {
  const ids = new Set()

  enrichedReservations.value.forEach((reservation) => {
    if (!['confirmed', 'pending'].includes(reservation.status)) return

    const resourceId =
      reservation.resource_id ?? reservation.resourceId ?? reservation.resource?.id

    if (resourceId) ids.add(resourceId)
  })

  return ids
})

const occupancyPercent = computed(() => {
  const total = activeResources.value.length || 1
  const used = occupiedResources.value.size || enrichedReservations.value.length

  return Math.min(100, Math.round((used / total) * 100))
})

const familyProfilesCount = computed(() => pets.length)
const todayAgendaCount = computed(() => enrichedReservations.value.length)
const pendingCount = computed(() => pendingFollowups.value.length)

const familyCards = computed(() =>
  pets.slice(0, 2).map((pet) => {
    const reservation = enrichedReservations.value.find(
      (item) => item.pet?.id === pet.id || item.pet_id === pet.id,
    )

    return {
      pet,
      reservation,
    }
  }),
)

const todayLabel = computed(() => {
  try {
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }).format(new Date())
  } catch {
    return 'Hoy'
  }
})

const roles = [
  {
    key: 'family',
    title: 'Familia',
    badge: 'Espacio de familia',
    headline: 'Todo lo importante de su mascota, fácil de consultar.',
    text: 'Las familias revisan mascotas, reservas y seguimientos publicados desde una zona sencilla.',
    iconPath: familiesAccessIcon,
    colorClass: 'text-[#E83C9D]',
    panelClass: 'from-[#FFF5FB] via-white to-[#F4ECFF]',
    pillClass: 'bg-[#FFEAF6] text-[#C7358E]',
    items: ['Mis mascotas', 'Reservas visibles', 'Seguimientos publicados'],
  },
  {
    key: 'staff',
    title: 'Staff',
    badge: 'Trabajo diario',
    headline: 'Agenda, tareas y seguimientos en una vista práctica.',
    text: 'El equipo ve qué mascotas están en el centro y qué seguimientos faltan por revisar.',
    iconPath: followupsIcon,
    colorClass: 'text-[#6F2DBD]',
    panelClass: 'from-[#F8F1FF] via-white to-[#FFF5FB]',
    pillClass: 'bg-[#F1E7FB] text-[#6F2DBD]',
    items: ['Agenda del día', 'Seguimientos pendientes', 'Recursos del centro'],
  },
  {
    key: 'admin',
    title: 'Administración',
    badge: 'Control del centro',
    headline: 'Una visión general para organizar el centro con calma.',
    text: 'La administración supervisa usuarios, servicios, reservas, recursos y permisos.',
    iconPath: safeAccessIcon || safeInfoIcon,
    colorClass: 'text-[#8B4CC8]',
    panelClass: 'from-[#FBF7FF] via-white to-[#F4ECFF]',
    pillClass: 'bg-[#F1E7FB] text-[#7B4BB2]',
    items: ['Usuarios y permisos', 'Servicios activos', 'Recursos y ocupación'],
  },
]

const activeRoleData = computed(() => roles[activeRole.value])

const followUpLandingCards = [
  {
    icon: followupsIcon,
    title: 'La familia entiende el día de un vistazo',
    text: 'Comida, paseo, descanso y observaciones, todo explicado de forma sencilla y visual.',
  },
  {
    icon: familiesAccessIcon,
    title: 'Más tranquilidad para la familia',
    text: 'Un resumen claro ayuda a saber cómo ha estado la mascota sin llamadas ni dudas innecesarias.',
  },
]

const placeholderFollowUpImage =
  'https://images.unsplash.com/photo-1558788353-f76d92427f16?q=80&w=900&auto=format&fit=crop'

const followUpGalleryFallback = [
  'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=900&auto=format&fit=crop',
]

const landingFollowUpPreview = computed(() => {
  const reservationWithCompletedReport =
    enrichedReservations.value.find((reservation) =>
      (reservation.reports || []).some((report) => report.status === 'completed'),
    ) || enrichedReservations.value[0]

  const report =
    reservationWithCompletedReport?.reports?.find((item) => item.status === 'completed') ||
    reservationWithCompletedReport?.reports?.[0] ||
    null

  const pet = reservationWithCompletedReport?.pet || null

  const mediaPaths = Array.isArray(report?.media)
    ? report.media.map((media) => media?.file_path || media?.url || '').filter(Boolean)
    : []

  const gallery = []
  const candidates = [
    ...mediaPaths,
    pet?.photo_path,
    pet?.photo,
    pet?.image,
    placeholderFollowUpImage,
    ...followUpGalleryFallback,
  ]

  candidates.forEach((item) => {
    if (item && !gallery.includes(item) && gallery.length < 3) {
      gallery.push(item)
    }
  })

  return {
    petName: pet?.name || 'Luna',
    petImage: pet?.photo_path || pet?.photo || pet?.image || placeholderFollowUpImage,
    serviceName: reservationWithCompletedReport?.serviceName || 'Guardería de día',
    dateLabel: formatLongDate(report?.report_date || reservationWithCompletedReport?.start_at),
    statusLabel: report?.status === 'completed' ? 'Publicado' : 'Pendiente',
    summary:
      report?.summary ||
      'Día tranquilo y activo. Ha estado cómoda en grupo, ha comido bien y descansó con normalidad.',
    observations:
      report?.observations || 'Buena interacción con otros perros. Sin incidencias durante la jornada.',
    checklist: [
      { label: 'Comida', done: Boolean(report?.food_done) },
      { label: 'Paseo', done: Boolean(report?.walk_done) },
      { label: 'Descanso', done: Boolean(report?.rest_done) },
      { label: 'Juego', done: Boolean(report?.play_done) },
    ],
    gallery,
  }
})

function getPetImage(pet) {
  return pet?.photo_path || pet?.photo || pet?.image || pet?.avatar || ''
}

function formatTime(value) {
  if (!value) return '--:--'

  try {
    return new Intl.DateTimeFormat('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value))
  } catch {
    return '--:--'
  }
}

function formatLongDate(value) {
  if (!value) return 'Hoy'

  try {
    const parsedValue =
      String(value).length <= 10 ? `${String(value).slice(0, 10)}T12:00:00` : value

    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(parsedValue))
  } catch {
    return 'Hoy'
  }
}

function statusLabel(status) {
  const labels = {
    confirmed: 'Confirmada',
    pending: 'Pendiente',
    completed: 'Finalizada',
    cancelled: 'Cancelada',
    draft: 'Borrador',
  }

  return labels[status] || status || 'Pendiente'
}

function statusClass(status) {
  const classes = {
    confirmed: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    pending: 'bg-amber-50 text-amber-700 ring-amber-200',
    completed: 'bg-[#F1E7FB] text-[#6F2DBD] ring-[#E2D3F2]',
    draft: 'bg-amber-50 text-amber-700 ring-amber-200',
    cancelled: 'bg-rose-50 text-rose-700 ring-rose-200',
  }

  return classes[status] || 'bg-[#F1E7FB] text-[#6F2DBD] ring-[#E2D3F2]'
}

function handleScroll() {
  isScrolled.value = window.scrollY > 30
}

function setupRevealAnimation() {
  if (typeof window === 'undefined') return

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        revealObserver.unobserve(entry.target)
      })
    },
    {
      threshold: 0.16,
      rootMargin: '0px 0px -70px 0px',
    },
  )

  document.querySelectorAll('[data-reveal]').forEach((element) => {
    revealObserver.observe(element)
  })
}

onMounted(() => {
  handleScroll()
  setupRevealAnimation()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)

  if (revealObserver) {
    revealObserver.disconnect()
  }
})
</script>

<template>
  <main class="landing-page relative isolate min-h-screen overflow-hidden text-[#24113F]">
    <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <span
        class="ambient-orb absolute -left-52 top-20 h-[34rem] w-[34rem] rounded-full bg-[#E83C9D]/10"
      ></span>

      <span
        class="ambient-orb absolute -right-56 top-[24%] h-[34rem] w-[34rem] rounded-full bg-[#7430D0]/10 [animation-delay:-2s]"
      ></span>

      <span
        class="ambient-orb absolute -bottom-72 left-[38%] h-[42rem] w-[42rem] rounded-full bg-[#C499FF]/10 [animation-delay:-4s]"
      ></span>
    </div>

    <!-- NAV -->
    <header
      class="fixed left-1/2 top-4 z-50 w-[94%] max-w-6xl -translate-x-1/2 rounded-[1.45rem] border transition-all duration-300"
      :class="
        isScrolled
          ? 'border-white/80 bg-white/90 py-2.5 shadow-[0_18px_44px_rgba(86,45,126,0.14)] backdrop-blur-xl'
          : 'border-white/70 bg-white/70 py-3.5 shadow-[0_12px_34px_rgba(86,45,126,0.08)] backdrop-blur-lg'
      "
    >
      <nav class="flex items-center justify-between px-4 sm:px-6">
        <RouterLink to="/" class="flex items-center gap-3">
          <img
            :src="mainLogo"
            alt="LadraLab"
            class="h-12 w-auto object-contain sm:h-14"
          />
        </RouterLink>

        <div class="hidden items-center gap-8 text-sm font-black text-[#6E617F] lg:flex">
          <a href="#plataforma" class="nav-link transition hover:text-[#6F2DBD]">
            Plataforma
          </a>
          <a href="#familias" class="nav-link transition hover:text-[#6F2DBD]">
            Familias
          </a>
          <a href="#seguimientos" class="nav-link transition hover:text-[#6F2DBD]">
            Seguimientos
          </a>
          <a href="#roles" class="nav-link transition hover:text-[#6F2DBD]">
            Roles
          </a>
        </div>

        <div class="flex items-center gap-3">
          <RouterLink
            :to="loginRoute"
            class="hidden h-11 items-center justify-center rounded-2xl border border-[#E2D4F2] bg-white px-5 text-sm font-black text-[#6F2DBD] transition hover:-translate-y-0.5 hover:border-[#C9AEE8] hover:bg-[#FCFAFF] sm:inline-flex"
          >
            Iniciar sesión
          </RouterLink>

          <RouterLink
            :to="registerRoute"
            class="inline-flex h-11 items-center justify-center rounded-2xl bg-gradient-to-r from-[#E83C9D] to-[#7430D0] px-5 text-sm font-black text-white shadow-[0_14px_30px_rgba(116,48,208,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(116,48,208,0.30)]"
          >
            Crear cuenta
          </RouterLink>
        </div>
      </nav>
    </header>

    <!-- HERO -->
    <section class="relative z-10 px-4 pb-10 pt-[7.8rem]">
      <div class="mx-auto w-full max-w-6xl">
        <div
          data-reveal
          class="reveal relative flex min-h-[calc(100vh-8.6rem)] items-center justify-center overflow-hidden rounded-[2.4rem] border border-white/85 bg-white/90 px-6 py-10 shadow-[0_24px_65px_rgba(86,45,126,0.13)] backdrop-blur-[14px] sm:px-8"
        >
          <div
            class="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_18%_18%,rgba(232,60,157,0.05),transparent_16rem),radial-gradient(circle_at_84%_14%,rgba(232,60,157,0.08),transparent_14rem),radial-gradient(circle_at_78%_82%,rgba(116,48,208,0.08),transparent_18rem),radial-gradient(circle_at_20%_80%,rgba(196,153,255,0.07),transparent_14rem)]"
          ></div>

          <div
            class="pointer-events-none absolute -right-32 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(232,60,157,0.12),transparent_72%)] blur-2xl"
          ></div>

          <div
            class="pointer-events-none absolute -bottom-32 right-4 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(116,48,208,0.10),transparent_72%)] blur-2xl"
          ></div>

          <div class="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
            <div
              class="inline-flex w-fit items-center gap-2 rounded-full border border-[#E8DBF5] bg-white/80 px-4 py-2.5 text-[0.72rem] font-black uppercase tracking-[0.18em] text-[#9068B8] shadow-[0_10px_24px_rgba(86,45,126,0.06)]"
            >
              <span
                class="h-2.5 w-2.5 rounded-full bg-[#E83C9D] shadow-[0_0_0_5px_rgba(232,60,157,0.14)]"
              ></span>
              Software para centros de mascotas
            </div>

            <h1
              class="mt-7 text-[3.1rem] font-black leading-[0.98] tracking-tight text-[#24113F] sm:text-[4.5rem] lg:text-[5.6rem]"
            >
              Una plataforma
              <span class="block">completa</span>
              <span class="block text-[#E83C9D]">para cuidar mejor</span>
              <span class="block">a cada mascota.</span>
            </h1>

            <p class="mt-7 max-w-2xl text-lg leading-8 text-[#6B607A] sm:text-xl">
              LadraLab reúne reservas, mascotas, recursos y seguimientos diarios en un
              espacio pensado para que el equipo trabaje con orden y las familias tengan
              la información que necesitan.
            </p>

            <div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <RouterLink
                :to="registerRoute"
                class="inline-flex h-[52px] min-w-[190px] items-center justify-center rounded-2xl bg-gradient-to-r from-[#E83C9D] to-[#7430D0] px-8 text-sm font-black text-white shadow-[0_18px_35px_rgba(116,48,208,0.24)] transition hover:-translate-y-0.5"
              >
                Crear cuenta
              </RouterLink>

              <a
                href="#plataforma"
                class="inline-flex h-[52px] min-w-[210px] items-center justify-center gap-2 rounded-2xl border border-[#E3D4F1] bg-white px-8 text-sm font-black text-[#6F2DBD] shadow-[0_8px_20px_rgba(86,45,126,0.08)] transition hover:-translate-y-0.5 hover:border-[#D4BDEB] hover:bg-[#FCFAFF]"
              >
                <span>Ver la plataforma</span>
                <span class="text-base leading-none">↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PLATAFORMA -->
    <section id="plataforma" class="relative z-10 px-4 py-10">
      <div class="mx-auto w-full max-w-6xl">
        <div
          data-reveal
          class="reveal rounded-[2.4rem] border border-white/85 bg-white/90 p-5 shadow-[0_24px_65px_rgba(86,45,126,0.13)] backdrop-blur-[14px] sm:p-6"
        >
          <div class="mx-auto mb-6 max-w-[980px] text-center">
            <p
              class="mx-auto inline-flex w-fit items-center rounded-full border border-[#E8DBF5] bg-white/80 px-4 py-2.5 text-[0.72rem] font-black uppercase tracking-[0.18em] text-[#9068B8] shadow-[0_10px_24px_rgba(86,45,126,0.06)]"
            >
              Vista del centro
            </p>

            <h2
              class="mt-5 text-3xl font-black leading-tight text-[#24113F] sm:text-5xl lg:whitespace-nowrap"
            >
              Todo el centro en
              <span class="text-[#E83C9D]"> un solo vistazo.</span>
            </h2>

            <p class="mx-auto mt-4 max-w-4xl text-lg leading-8 text-[#6A607A] lg:whitespace-nowrap">
              Una vista clara para trabajar con calma, cuidar mejor y mantener a las familias informadas.
            </p>
          </div>

          <div
            class="rounded-[2rem] border border-[#EADFF4] bg-gradient-to-b from-white to-[#FCFAFF] p-4 shadow-[0_14px_34px_rgba(86,45,126,0.06)]"
          >
            <div class="mb-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p class="text-[0.72rem] font-black uppercase tracking-[0.18em] text-[#9A73BC]">
                  Panel operativo
                </p>

                <h3 class="mt-1 text-2xl font-black text-[#24113F]">
                  Resumen del día
                </h3>

                <p class="mt-1 font-bold capitalize text-[#7B718B]">
                  {{ todayLabel }}
                </p>
              </div>
            </div>

            <div class="mb-4 grid gap-3 lg:grid-cols-3">
              <article
                class="flex items-center gap-3 rounded-[1.35rem] border border-[#EADFF4] bg-white px-4 py-3"
              >
                <div
                  class="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-[1.05rem] bg-gradient-to-br from-[#FFF5FB] to-[#F3E9FF]"
                >
                  <img :src="registeredPetIcon" alt="" class="h-14 w-14 object-contain" />
                </div>

                <div>
                  <p class="text-sm font-extrabold text-[#8A7F99]">
                    Mascotas registradas
                  </p>
                  <p class="mt-0.5 text-2xl font-black text-[#24113F]">
                    {{ familyProfilesCount }}
                  </p>
                </div>
              </article>

              <article
                class="flex items-center gap-3 rounded-[1.35rem] border border-[#EADFF4] bg-white px-4 py-3"
              >
                <div
                  class="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-[1.05rem] bg-gradient-to-br from-[#FFF5FB] to-[#F3E9FF]"
                >
                  <img :src="activeReservationsIcon" alt="" class="h-14 w-14 object-contain" />
                </div>

                <div>
                  <p class="text-sm font-extrabold text-[#8A7F99]">
                    Reservas activas
                  </p>
                  <p class="mt-0.5 text-2xl font-black text-[#24113F]">
                    {{ todayAgendaCount }}
                  </p>
                </div>
              </article>

              <article
                class="flex items-center gap-3 rounded-[1.35rem] border border-[#EADFF4] bg-white px-4 py-3"
              >
                <div
                  class="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-[1.05rem] bg-gradient-to-br from-[#FFF5FB] to-[#F3E9FF]"
                >
                  <img :src="pendingFollowupsIcon" alt="" class="h-14 w-14 object-contain" />
                </div>

                <div>
                  <p class="text-sm font-extrabold text-[#8A7F99]">
                    Seguimientos pendientes
                  </p>
                  <p class="mt-0.5 text-2xl font-black text-[#24113F]">
                    {{ pendingCount }}
                  </p>
                </div>
              </article>
            </div>

            <div class="grid items-stretch gap-5 xl:grid-cols-[1.2fr_0.8fr]">
              <section
                class="flex h-full flex-col rounded-[1.65rem] border border-[#EADFF4] bg-white p-4 shadow-[0_12px_28px_rgba(86,45,126,0.05)]"
              >
                <div class="mb-3 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p class="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#9A73BC]">
                      Agenda
                    </p>
                    <h4 class="mt-1 text-lg font-black text-[#24113F]">
                      Entradas y estancias
                    </h4>
                  </div>

                  <span class="rounded-full bg-[#F1E7FB] px-3 py-1.5 text-xs font-black text-[#6F2DBD]">
                    {{ visibleReservations.length }} en vista
                  </span>
                </div>

                <div class="grid flex-1 grid-rows-3 gap-3">
                  <article
                    v-for="reservation in visibleReservations"
                    :key="reservation.id"
                    class="grid min-h-[6.3rem] items-center gap-3 rounded-[1.2rem] border border-[#EFE6F7] bg-[#FCFAFF] p-3 md:grid-cols-[4rem_2.8rem_minmax(0,1fr)]"
                  >
                    <div
                      class="inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-black text-[#6F2DBD] shadow-[inset_0_0_0_1px_#EADFF4]"
                    >
                      {{ formatTime(reservation.start_at || reservation.startAt) }}
                    </div>

                    <div
                      class="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-[#FBE7F4] to-[#EEE4FF] text-xl"
                    >
                      <img
                        v-if="getPetImage(reservation.pet)"
                        :src="getPetImage(reservation.pet)"
                        :alt="reservation.pet?.name || 'Mascota'"
                        class="h-full w-full object-cover"
                      />
                      <span v-else>🐶</span>
                    </div>

                    <div class="min-w-0">
                      <div class="flex flex-wrap items-center gap-2">
                        <h5 class="text-base font-black text-[#24113F]">
                          {{ reservation.pet?.name || 'Mascota' }}
                        </h5>

                        <span
                          class="rounded-full px-2.5 py-1 text-[11px] font-black ring-1"
                          :class="statusClass(reservation.status)"
                        >
                          {{ statusLabel(reservation.status) }}
                        </span>
                      </div>

                      <p class="mt-1 text-sm font-extrabold text-[#6F2DBD]">
                        {{ reservation.serviceName }}
                      </p>

                      <p class="mt-0.5 text-xs leading-5 text-[#7D738D]">
                        {{ reservation.resourceName }}
                        <span class="mx-1">•</span>
                        hasta {{ formatTime(reservation.end_at || reservation.endAt) }}
                      </p>
                    </div>
                  </article>
                </div>
              </section>

              <aside class="grid h-full gap-5">
                <article
                  class="rounded-[1.65rem] bg-gradient-to-b from-[#7D33C6] to-[#E5469F] p-4 text-white shadow-[0_12px_28px_rgba(86,45,126,0.05)]"
                >
                  <p class="text-[0.68rem] font-black uppercase tracking-[0.18em] text-white/80">
                    Para el equipo
                  </p>

                  <h4 class="mt-1 text-lg font-black">
                    Lo importante, bien organizado
                  </h4>

                  <div class="mt-4 grid gap-3">
                    <div class="flex justify-between gap-3 rounded-2xl bg-white/15 px-4 py-3">
                      <strong class="font-black">{{ pendingCount }}</strong>
                      <span class="text-right text-sm font-bold">seguimientos pendientes</span>
                    </div>

                    <div class="flex justify-between gap-3 rounded-2xl bg-white/15 px-4 py-3">
                      <strong class="font-black">{{ activeResources.length }}</strong>
                      <span class="text-right text-sm font-bold">recursos disponibles</span>
                    </div>

                    <div class="flex justify-between gap-3 rounded-2xl bg-white/15 px-4 py-3">
                      <strong class="font-black">{{ occupancyPercent }}%</strong>
                      <span class="text-right text-sm font-bold">ocupación actual</span>
                    </div>
                  </div>
                </article>

                <article
                  class="rounded-[1.65rem] border border-[#EADFF4] bg-white p-4 shadow-[0_12px_28px_rgba(86,45,126,0.05)]"
                >
                  <p class="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#9A73BC]">
                    Para familias
                  </p>

                  <h4 class="mt-1 text-lg font-black text-[#24113F]">
                    Información clara y cercana
                  </h4>

                  <div class="mt-3 flex flex-wrap gap-2">
                    <span class="rounded-full bg-[#F1E7FB] px-3 py-2 text-xs font-black text-[#6F2DBD]">
                      Reservas
                    </span>
                    <span class="rounded-full bg-[#F1E7FB] px-3 py-2 text-xs font-black text-[#6F2DBD]">
                      Seguimientos
                    </span>
                    <span class="rounded-full bg-[#F1E7FB] px-3 py-2 text-xs font-black text-[#6F2DBD]">
                      Ficha de mascota
                    </span>
                  </div>

                  <p class="mt-4 text-sm leading-6 text-[#6C627B]">
                    Las familias pueden consultar lo importante sin llamadas innecesarias ni mensajes perdidos.
                  </p>
                </article>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAMILIAS -->
    <section id="familias" class="relative z-10 px-4 py-10">
      <div class="mx-auto w-full max-w-6xl">
        <div
          data-reveal
          class="reveal rounded-[2.4rem] border border-white/85 bg-white/90 p-6 shadow-[0_24px_65px_rgba(86,45,126,0.13)] backdrop-blur-[14px] sm:p-7"
        >
          <div class="grid items-start gap-6 xl:grid-cols-[0.88fr_1.12fr]">
            <div>
              <p
                class="inline-flex w-fit items-center rounded-full border border-[#E8DBF5] bg-white/80 px-4 py-2.5 text-[0.72rem] font-black uppercase tracking-[0.18em] text-[#9068B8] shadow-[0_10px_24px_rgba(86,45,126,0.06)]"
              >
                Para familias y tutores
              </p>

              <h2
                class="mt-5 max-w-[28rem] text-[clamp(2.45rem,3.35vw,4rem)] font-black leading-[0.96] tracking-[-0.04em] text-[#24113F]"
              >
                Todo lo importante
                <span class="block text-[#E83C9D]">de tu mascota</span>
                en un solo lugar.
              </h2>

              <p class="mt-5 max-w-[32rem] text-base leading-8 text-[#6A607A]">
                Las familias pueden consultar la ficha de su mascota, sus reservas y los
                seguimientos publicados por el centro de forma sencilla, clara y sin depender
                de llamadas o mensajes.
              </p>
            </div>

            <div>
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-[0.72rem] font-black uppercase tracking-[0.2em] text-[#9A73BC]">
                    Espacio de familia
                  </p>

                  <h3 class="mt-1 text-3xl font-black text-[#24113F]">
                    Mis mascotas
                  </h3>
                </div>

                <span
                  class="inline-flex items-center justify-center rounded-full bg-[#F1E7FB] px-4 py-2 text-sm font-black text-[#6F2DBD]"
                >
                  {{ familyCards.length }} perfiles
                </span>
              </div>

              <div class="mt-5 grid gap-4 md:grid-cols-2">
                <article
                  v-for="{ pet, reservation } in familyCards"
                  :key="pet.id"
                  class="flex flex-col rounded-[1.75rem] border border-[#EADCF6] bg-[#FCFAFE] p-4 shadow-[0_8px_18px_rgba(124,82,163,0.04)]"
                >
                  <div
                    class="grid h-32 place-items-center overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-[#FBE7F4] to-[#EEE4FF] text-3xl"
                  >
                    <img
                      v-if="getPetImage(pet)"
                      :src="getPetImage(pet)"
                      :alt="pet.name"
                      class="h-full w-full object-cover"
                    />
                    <span v-else>🐶</span>
                  </div>

                  <div class="mt-4">
                    <h4 class="text-2xl font-black leading-none text-[#24113F]">
                      {{ pet.name }}
                    </h4>

                    <p class="mt-2 text-base font-bold text-[#7F58C9]">
                      {{ pet.breed || pet.species || 'Mascota' }}
                    </p>

                    <p class="mt-3 text-sm leading-7 text-[#756A87]">
                      {{ pet.care_notes || pet.notes || 'Información útil para el cuidado diario.' }}
                    </p>
                  </div>

                  <div
                    class="mt-4 rounded-[1.25rem] border border-[#E8DCF7] bg-white p-4"
                  >
                    <span class="block text-[0.72rem] font-black uppercase tracking-[0.18em] text-[#9B7AD2]">
                      Próxima reserva
                    </span>

                    <strong class="mt-1 block text-base font-black text-[#24113F]">
                      {{ reservation?.serviceName || 'Sin reserva próxima' }}
                    </strong>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div class="mt-5 grid gap-4 md:grid-cols-2">
            <article
              class="flex items-center gap-4 rounded-[1.65rem] border border-[#EADCF6] bg-white/85 p-4 shadow-[0_10px_24px_rgba(86,45,126,0.06)]"
            >
              <div
                class="grid h-16 w-16 shrink-0 place-items-center rounded-[1.25rem] bg-gradient-to-br from-[#FBE7F4] to-[#EEE4FF]"
              >
                <img :src="infoIcon" alt="" class="h-12 w-12 object-contain" />
              </div>

              <div>
                <h3 class="font-black text-[#24113F]">
                  Ficha de mascota siempre disponible
                </h3>
                <p class="mt-1 text-sm leading-6 text-[#71677F]">
                  Datos importantes, cuidados y notas útiles para entender mejor cada estancia.
                </p>
              </div>
            </article>

            <article
              class="flex items-center gap-4 rounded-[1.65rem] border border-[#EADCF6] bg-white/85 p-4 shadow-[0_10px_24px_rgba(86,45,126,0.06)]"
            >
              <div
                class="grid h-16 w-16 shrink-0 place-items-center rounded-[1.25rem] bg-gradient-to-br from-[#FBE7F4] to-[#EEE4FF]"
              >
                <img :src="activeReservationsIcon" alt="" class="h-12 w-12 object-contain" />
              </div>

              <div>
                <h3 class="font-black text-[#24113F]">
                  Reservas fáciles de consultar
                </h3>
                <p class="mt-1 text-sm leading-6 text-[#71677F]">
                  Próximos servicios, estado de la solicitud y detalles básicos en un mismo lugar.
                </p>
              </div>
            </article>

            <article
              class="flex items-center gap-4 rounded-[1.65rem] border border-[#EADCF6] bg-white/85 p-4 shadow-[0_10px_24px_rgba(86,45,126,0.06)]"
            >
              <div
                class="grid h-16 w-16 shrink-0 place-items-center rounded-[1.25rem] bg-gradient-to-br from-[#FBE7F4] to-[#EEE4FF]"
              >
                <img :src="pendingFollowupsIcon" alt="" class="h-12 w-12 object-contain" />
              </div>

              <div>
                <h3 class="font-black text-[#24113F]">
                  Seguimientos publicados por el centro
                </h3>
                <p class="mt-1 text-sm leading-6 text-[#71677F]">
                  Información clara sobre rutinas, comportamiento y observaciones importantes.
                </p>
              </div>
            </article>

            <article
              class="flex items-center gap-4 rounded-[1.65rem] border border-[#EADCF6] bg-white/85 p-4 shadow-[0_10px_24px_rgba(86,45,126,0.06)]"
            >
              <div
                class="grid h-16 w-16 shrink-0 place-items-center rounded-[1.25rem] bg-gradient-to-br from-[#FBE7F4] to-[#EEE4FF]"
              >
                <img :src="registeredPetIcon" alt="" class="h-12 w-12 object-contain" />
              </div>

              <div>
                <p class="text-[0.72rem] font-black uppercase tracking-[0.18em] text-[#9A73BC]">
                  Información para familias
                </p>

                <h3 class="mt-1 font-black text-[#24113F]">
                  Todo más claro y accesible
                </h3>

                <p class="mt-1 text-sm leading-6 text-[#71677F]">
                  La familia revisa fichas, reservas y seguimientos publicados sin entrar
                  en la gestión interna del centro.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- SEGUIMIENTOS -->
    <section id="seguimientos" class="relative z-10 px-4 py-10">
      <div class="mx-auto w-full max-w-6xl">
        <div
          data-reveal
          class="reveal rounded-[2.4rem] border border-white/85 bg-white/90 p-6 shadow-[0_24px_65px_rgba(86,45,126,0.13)] backdrop-blur-[14px] sm:p-7"
        >
          <div class="grid items-stretch gap-6 xl:grid-cols-[0.92fr_1.08fr]">
            <div class="flex h-full flex-col">
              <p
                class="inline-flex w-fit items-center rounded-full border border-[#E8DBF5] bg-white/80 px-4 py-2.5 text-[0.72rem] font-black uppercase tracking-[0.18em] text-[#9068B8] shadow-[0_10px_24px_rgba(86,45,126,0.06)]"
              >
                Seguimientos diarios
              </p>

              <h2
                class="mt-5 max-w-[30rem] text-[clamp(2.45rem,3.4vw,4.2rem)] font-black leading-[0.98] tracking-[-0.04em] text-[#24113F]"
              >
                El cuidado también
                <span class="block text-[#E83C9D]">se comunica.</span>
              </h2>

              <p class="mt-5 max-w-[32rem] text-base leading-8 text-[#6A607A]">
                Un seguimiento claro evita dudas y transmite confianza. La familia recibe
                un resumen amable, visual y fácil de entender sobre cómo ha ido el día.
              </p>

              <div class="mt-6 grid gap-4 sm:grid-cols-2">
                <article
                  v-for="item in followUpLandingCards"
                  :key="item.title"
                  class="rounded-[1.55rem] border border-[#E8E1F1] bg-white p-5 shadow-[0_10px_24px_rgba(86,45,126,0.06)]"
                >
                  <div
                    class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FBE7F4] to-[#EEE4FF]"
                  >
                    <img :src="item.icon" alt="" class="h-10 w-10 object-contain" />
                  </div>

                  <h3 class="mt-4 text-[1.04rem] font-black leading-6 text-[#24113F]">
                    {{ item.title }}
                  </h3>

                  <p class="mt-2 text-sm leading-7 text-[#6F6480]">
                    {{ item.text }}
                  </p>
                </article>
              </div>

              <div class="mt-5 flex flex-wrap gap-3">
                <span
                  class="inline-flex items-center rounded-full border border-[#E2D4F4] bg-gradient-to-r from-[#F7ECFF] to-[#FFF3FA] px-4 py-2 text-sm font-black text-[#7A4DA1] shadow-sm"
                >
                  Resumen fácil
                </span>

                <span
                  class="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700 shadow-sm"
                >
                  Fotos del día
                </span>

                <span
                  class="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-black text-sky-700 shadow-sm"
                >
                  Seguimiento claro
                </span>
              </div>
            </div>

            <article
              class="flex h-full flex-col rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-[0_12px_28px_rgba(86,45,126,0.06)]"
            >
              <div class="flex items-start gap-4">
                <img
                  :src="landingFollowUpPreview.petImage || placeholderFollowUpImage"
                  :alt="`Foto de ${landingFollowUpPreview.petName}`"
                  class="h-14 w-14 shrink-0 rounded-2xl object-cover"
                />

                <div class="min-w-0">
                  <div class="flex flex-wrap items-center gap-2">
                    <h3 class="truncate text-[1.65rem] font-black leading-none text-[#24113F]">
                      Reporte de {{ landingFollowUpPreview.petName }}
                    </h3>

                    <span
                      class="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100"
                    >
                      {{ landingFollowUpPreview.statusLabel }}
                    </span>
                  </div>

                  <p class="mt-2 text-sm font-semibold text-[#6A27A4]">
                    {{ landingFollowUpPreview.serviceName }}
                  </p>

                  <p class="mt-1 text-sm text-[#7B718B]">
                    {{ landingFollowUpPreview.dateLabel }}
                  </p>
                </div>
              </div>

              <div class="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
                <span
                  v-for="item in landingFollowUpPreview.checklist"
                  :key="item.label"
                  class="rounded-2xl px-3 py-2.5 text-xs font-bold"
                  :class="
                    item.done
                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100'
                      : 'bg-[#F8F5FB] text-slate-400 ring-1 ring-[#EEE7F6]'
                  "
                >
                  {{ item.done ? '✓' : '·' }} {{ item.label }}
                </span>
              </div>

              <div class="mt-4 rounded-2xl border border-[#EFE7F8] bg-[#FCFBFE] p-4">
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-[#9AA7C0]">
                  Resumen del día
                </p>
                <p class="mt-3 text-sm leading-7 text-[#5F566D]">
                  {{ landingFollowUpPreview.summary }}
                </p>
              </div>

              <div class="mt-4 rounded-2xl border border-[#EFE7F8] bg-white p-4">
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-[#9AA7C0]">
                  Observaciones
                </p>
                <p class="mt-3 text-sm leading-7 text-[#5F566D]">
                  {{ landingFollowUpPreview.observations }}
                </p>
              </div>

              <div class="mt-4 rounded-2xl border border-[#EFE7F8] bg-[#FCFBFE] p-4">
                <div class="flex items-center justify-between gap-3">
                  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-[#9AA7C0]">
                    Fotos del seguimiento
                  </p>
                  <span class="text-xs font-bold text-[#8B65B6]">
                    {{ landingFollowUpPreview.gallery.length }} subidas
                  </span>
                </div>

                <div class="mt-3 grid grid-cols-3 gap-3">
                  <img
                    v-for="(image, index) in landingFollowUpPreview.gallery"
                    :key="`${image}-${index}`"
                    :src="image"
                    :alt="`Foto ${index + 1} del seguimiento`"
                    class="h-24 w-full rounded-2xl object-cover md:h-28"
                  />
                </div>
              </div>

              <div class="mt-4 flex flex-wrap gap-2">
                <span class="rounded-full bg-[#F3ECFB] px-3.5 py-1.5 text-xs font-black text-[#7A4DA1]">
                  Resumen claro
                </span>
                <span class="rounded-full bg-[#F3ECFB] px-3.5 py-1.5 text-xs font-black text-[#7A4DA1]">
                  Hábitos del día
                </span>
                <span class="rounded-full bg-[#F3ECFB] px-3.5 py-1.5 text-xs font-black text-[#7A4DA1]">
                  Observaciones útiles
                </span>
              </div>

              <button
                type="button"
                class="mt-auto inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#E83C9D] to-[#7430D0] px-5 text-sm font-black text-white shadow-[0_14px_30px_rgba(116,48,208,0.22)] transition hover:-translate-y-0.5"
              >
                Enviar a la familia
              </button>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- ROLES -->
    <section id="roles" class="relative z-10 px-4 py-6">
      <div class="mx-auto w-full max-w-6xl">
        <div
          data-reveal
          class="reveal overflow-hidden rounded-[2rem] border border-white/85 bg-white/90 p-4 shadow-[0_20px_52px_rgba(86,45,126,0.11)] backdrop-blur-[14px] sm:p-5"
        >
          <div class="mx-auto mb-4 max-w-3xl text-center">
            <p
              class="mx-auto inline-flex w-fit items-center rounded-full border border-[#E8DBF5] bg-white/80 px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#9068B8] shadow-[0_10px_24px_rgba(86,45,126,0.06)]"
            >
              Perfiles de acceso
            </p>

            <h2 class="mt-3 text-3xl font-black leading-tight text-[#24113F] sm:text-[2.7rem]">
              Cada persona ve
              <span class="text-[#E83C9D]"> lo que necesita.</span>
            </h2>

            <p class="mx-auto mt-2 max-w-2xl text-base leading-7 text-[#6A607A]">
              Familias, equipo y administración tienen espacios claros y adaptados a su forma
              de usar LadraLab.
            </p>
          </div>

          <div class="grid items-stretch gap-4 xl:grid-cols-[0.78fr_1.22fr]">
            <div class="grid auto-rows-fr gap-3">
              <button
                v-for="(role, index) in roles"
                :key="role.title"
                type="button"
                class="group relative flex min-h-[8.4rem] items-start gap-4 overflow-hidden rounded-[1.45rem] border p-4 text-left transition duration-200"
                :class="
                  activeRole === index
                    ? 'border-[#E8CFEA] bg-gradient-to-r from-[#FFF8FC] via-white to-[#F6F1FF] ring-2 ring-[#F0DBEC] shadow-[0_16px_30px_rgba(111,45,189,0.13)] -translate-y-0.5'
                    : 'border-[#EDE2F6] bg-white/85 shadow-[0_8px_18px_rgba(86,45,126,0.05)] hover:-translate-y-0.5 hover:border-[#E4D3F1] hover:bg-white hover:shadow-[0_14px_24px_rgba(86,45,126,0.08)]'
                "
                @click="activeRole = index"
              >
                <span
                  v-if="activeRole === index"
                  class="absolute inset-y-4 left-0 w-1 rounded-r-full bg-gradient-to-b from-[#E83C9D] to-[#7430D0]"
                ></span>

                <span
                  v-if="activeRole === index"
                  class="absolute bottom-4 right-4 h-2.5 w-2.5 rounded-full bg-[#E83C9D] shadow-[0_0_0_5px_rgba(232,60,157,0.12)]"
                ></span>

                <div
                  class="grid h-12 w-12 shrink-0 place-items-center rounded-[1.05rem] bg-gradient-to-br from-[#FFF3FA] to-[#F1E8FF] p-2"
                  :class="activeRole === index ? 'shadow-[0_10px_18px_rgba(116,48,208,0.10)]' : ''"
                >
                  <img :src="role.iconPath" alt="" class="h-9 w-9 object-contain" />
                </div>

                <div class="min-w-0 pr-4">
                  <h3 class="text-2xl font-black leading-none text-[#24113F]">
                    {{ role.title }}
                  </h3>

                  <p class="mt-2 text-sm leading-6 text-[#746A84]">
                    {{ role.text }}
                  </p>
                </div>
              </button>
            </div>

            <article
              class="relative flex min-h-[28.8rem] flex-col overflow-hidden rounded-[1.8rem] border border-[#E8DDF4] bg-gradient-to-br p-4 shadow-[0_14px_30px_rgba(86,45,126,0.08)]"
              :class="activeRoleData.panelClass"
            >
              <div
                class="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#E83C9D]/10 blur-2xl"
              ></div>

              <div
                class="pointer-events-none absolute -bottom-16 left-1/3 h-44 w-44 rounded-full bg-[#7430D0]/10 blur-2xl"
              ></div>

              <div class="relative z-10 flex h-full flex-col">
                <div class="flex items-start gap-4">
                  <div
                    class="grid h-12 w-12 shrink-0 place-items-center rounded-[1.05rem] bg-white/85 p-2 shadow-sm ring-1 ring-white"
                  >
                    <img
                      :src="activeRoleData.iconPath"
                      alt=""
                      class="h-9 w-9 object-contain"
                    />
                  </div>

                  <div>
                    <p
                      class="text-[0.68rem] font-black uppercase tracking-[0.2em]"
                      :class="activeRoleData.colorClass"
                    >
                      {{ activeRoleData.badge }}
                    </p>

                    <h3
                      class="mt-1 max-w-[34rem] text-[1.75rem] font-black leading-tight text-[#24113F]"
                    >
                      {{ activeRoleData.headline }}
                    </h3>
                  </div>
                </div>

                <p class="mt-3 max-w-3xl text-sm leading-7 text-[#6F6680]">
                  {{ activeRoleData.text }}
                </p>

                <div class="mt-3 grid gap-2.5 sm:grid-cols-3">
                  <div
                    v-for="item in activeRoleData.items"
                    :key="item"
                    class="flex min-h-[3.6rem] items-center gap-2.5 rounded-2xl border border-white/80 bg-white/85 px-3 py-2.5 shadow-sm"
                  >
                    <span
                      class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F8E8F5] to-[#EDE4FF] text-sm font-black text-[#7B4BB2]"
                    >
                      ✓
                    </span>

                    <span class="text-sm font-black leading-5 text-[#4D425E]">
                      {{ item }}
                    </span>
                  </div>
                </div>

                <!-- FAMILY -->
                <div
                  v-if="activeRoleData.key === 'family'"
                  class="mt-4 flex h-[15.2rem] flex-col rounded-[1.35rem] border border-white/90 bg-white/80 p-3 shadow-sm"
                >
                  <div class="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p class="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#9A73BC]">
                        Vista de familia
                      </p>

                      <h4 class="mt-1 text-lg font-black text-[#24113F]">
                        Mis mascotas y próximos avisos
                      </h4>
                    </div>

                    <span
                      class="rounded-full px-3 py-1.5 text-xs font-black"
                      :class="activeRoleData.pillClass"
                    >
                      {{ familyCards.length }} perfiles
                    </span>
                  </div>

                  <div class="grid flex-1 gap-3 sm:grid-cols-2">
                    <article
                      v-for="{ pet, reservation } in familyCards"
                      :key="pet.id"
                      class="flex h-full flex-col rounded-[1.15rem] border border-[#EFE5F8] bg-[#FCFAFF] p-3"
                    >
                      <div class="flex items-center gap-3">
                        <img
                          :src="getPetImage(pet)"
                          :alt="pet.name"
                          class="h-11 w-11 rounded-xl object-cover"
                        />

                        <div class="min-w-0">
                          <h5 class="truncate font-black text-[#24113F]">
                            {{ pet.name }}
                          </h5>

                          <p class="truncate text-sm font-bold text-[#7F58C9]">
                            {{ pet.breed || pet.species || 'Mascota' }}
                          </p>
                        </div>
                      </div>

                      <div class="mt-auto rounded-xl bg-white px-3 py-2.5 ring-1 ring-[#EEE4F7]">
                        <p
                          class="text-[0.62rem] font-black uppercase tracking-[0.16em] text-[#9A73BC]"
                        >
                          Próxima reserva
                        </p>

                        <p class="mt-1 text-sm font-black leading-5 text-[#24113F]">
                          {{ reservation?.serviceName || 'Sin reserva próxima' }}
                        </p>
                      </div>
                    </article>
                  </div>
                </div>

                <!-- STAFF -->
                <div
                  v-else-if="activeRoleData.key === 'staff'"
                  class="mt-4 flex h-[15.2rem] flex-col rounded-[1.35rem] border border-white/90 bg-white/80 p-3 shadow-sm"
                >
                  <div class="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p class="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#9A73BC]">
                        Vista de staff
                      </p>

                      <h4 class="mt-1 text-lg font-black text-[#24113F]">
                        Agenda rápida del día
                      </h4>
                    </div>

                    <span
                      class="rounded-full px-3 py-1.5 text-xs font-black"
                      :class="activeRoleData.pillClass"
                    >
                      {{ pendingCount }} pendientes
                    </span>
                  </div>

                  <div class="grid flex-1 gap-2.5">
                    <article
                      v-for="reservation in visibleReservations"
                      :key="reservation.id"
                      class="flex items-center justify-between gap-3 rounded-[1rem] border border-[#EFE5F8] bg-[#FCFAFF] p-2.5"
                    >
                      <div class="flex min-w-0 items-center gap-3">
                        <img
                          :src="getPetImage(reservation.pet)"
                          :alt="reservation.pet?.name || 'Mascota'"
                          class="h-9 w-9 rounded-xl object-cover"
                        />

                        <div class="min-w-0">
                          <h5 class="truncate text-sm font-black text-[#24113F]">
                            {{ reservation.pet?.name || 'Mascota' }}
                          </h5>

                          <p class="truncate text-xs font-bold text-[#6F2DBD]">
                            {{ reservation.serviceName }}
                          </p>
                        </div>
                      </div>

                      <span
                        class="rounded-full bg-emerald-50 px-2.5 py-1.5 text-xs font-black text-emerald-700 ring-1 ring-emerald-100"
                      >
                        {{ formatTime(reservation.start_at || reservation.startAt) }}
                      </span>
                    </article>
                  </div>
                </div>

                <!-- ADMIN -->
                <div
                  v-else
                  class="mt-4 flex h-[15.2rem] flex-col rounded-[1.35rem] border border-white/90 bg-white/80 p-3 shadow-sm"
                >
                  <div class="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p class="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#9A73BC]">
                        Vista de administración
                      </p>

                      <h4 class="mt-1 text-lg font-black text-[#24113F]">
                        Control general del centro
                      </h4>
                    </div>

                    <span
                      class="rounded-full px-3 py-1.5 text-xs font-black"
                      :class="activeRoleData.pillClass"
                    >
                      Vista completa
                    </span>
                  </div>

                  <div class="grid gap-2.5 sm:grid-cols-3">
                    <article class="rounded-[1rem] border border-[#EFE5F8] bg-[#FCFAFF] p-3">
                      <p class="text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#9A73BC]">
                        Mascotas
                      </p>

                      <p class="mt-1 text-2xl font-black text-[#24113F]">
                        {{ familyProfilesCount }}
                      </p>
                    </article>

                    <article class="rounded-[1rem] border border-[#EFE5F8] bg-[#FCFAFF] p-3">
                      <p class="text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#9A73BC]">
                        Reservas
                      </p>

                      <p class="mt-1 text-2xl font-black text-[#24113F]">
                        {{ todayAgendaCount }}
                      </p>
                    </article>

                    <article class="rounded-[1rem] border border-[#EFE5F8] bg-[#FCFAFF] p-3">
                      <p class="text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#9A73BC]">
                        Ocupación
                      </p>

                      <p class="mt-1 text-2xl font-black text-[#24113F]">
                        {{ occupancyPercent }}%
                      </p>
                    </article>
                  </div>

                  <div class="mt-2.5 grid flex-1 gap-2.5 md:grid-cols-[1.05fr_0.95fr]">
                    <div class="rounded-[1rem] border border-[#EFE5F8] bg-white p-3">
                      <p class="text-sm font-black text-[#24113F]">
                        Gestión por permisos
                      </p>

                      <p class="mt-1 text-xs leading-5 text-[#6F6680]">
                        Cada perfil mantiene su propio espacio para evitar información innecesaria.
                      </p>
                    </div>

                    <div class="rounded-[1rem] border border-[#EFE5F8] bg-[#FCFAFF] p-3">
                      <p class="text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#9A73BC]">
                        Supervisión
                      </p>

                      <div class="mt-2 space-y-2">
                        <div class="flex items-center justify-between rounded-xl bg-white px-3 py-1.5 ring-1 ring-[#EEE4F7]">
                          <span class="text-xs font-bold text-[#5E556C]">Servicios</span>
                          <strong class="text-xs font-black text-[#24113F]">{{ services.length }}</strong>
                        </div>

                        <div class="flex items-center justify-between rounded-xl bg-white px-3 py-1.5 ring-1 ring-[#EEE4F7]">
                          <span class="text-xs font-bold text-[#5E556C]">Recursos</span>
                          <strong class="text-xs font-black text-[#24113F]">{{ activeResources.length }}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="relative z-10 px-4 py-8">
      <div class="mx-auto w-full max-w-6xl">
        <div
          data-reveal
          class="reveal relative overflow-hidden rounded-[2.2rem] bg-[radial-gradient(circle_at_82%_16%,rgba(255,255,255,0.22),transparent_18rem),radial-gradient(circle_at_18%_88%,rgba(255,255,255,0.14),transparent_16rem),linear-gradient(135deg,#5D1F93,#8131B5_50%,#E83C9D)] p-6 shadow-[0_26px_70px_rgba(91,36,151,0.24)] sm:p-8 lg:p-10"
        >
          <div
            class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl"
          ></div>

          <div
            class="pointer-events-none absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-[#F9B7DD]/20 blur-3xl"
          ></div>

          <div class="relative z-10 grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <!-- Texto CTA -->
            <div>
              <div
                class="mb-6 inline-flex items-center gap-3 rounded-[1.25rem] border border-white/20 bg-white/14 px-4 py-3 shadow-[0_18px_34px_rgba(32,10,54,0.12)] backdrop-blur-xl"
              >
                <span class="grid h-14 w-14 place-items-center rounded-2xl bg-white">
                  <img
                    :src="mainLogo"
                    alt="LadraLab"
                    class="h-11 w-auto object-contain"
                  />
                </span>

                <div>
                  <p class="text-[0.7rem] font-black uppercase tracking-[0.22em] text-white/65">
                    LadraLab
                  </p>
                  <p class="mt-0.5 text-sm font-black text-white">
                    Software para centros de mascotas
                  </p>
                </div>
              </div>

              <h2 class="max-w-3xl text-3xl font-black leading-tight text-white sm:text-5xl">
                Gestiona tu centro con más calma y mantén a cada familia bien informada.
              </h2>

              <p class="mt-5 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
                Reúne reservas, mascotas, recursos y seguimientos en un solo lugar para
                trabajar con más orden, ahorrar tiempo y comunicar mejor el cuidado diario.
              </p>

              <div class="mt-6 flex flex-wrap gap-3">
                <span
                  class="rounded-full border border-white/20 bg-white/12 px-4 py-2 text-sm font-black text-white backdrop-blur"
                >
                  Menos desorden
                </span>

                <span
                  class="rounded-full border border-white/20 bg-white/12 px-4 py-2 text-sm font-black text-white backdrop-blur"
                >
                  Más claridad
                </span>

                <span
                  class="rounded-full border border-white/20 bg-white/12 px-4 py-2 text-sm font-black text-white backdrop-blur"
                >
                  Comunicación sencilla
                </span>
              </div>

              <div class="mt-8 flex flex-col gap-3 sm:flex-row">
                <RouterLink
                  :to="registerRoute"
                  class="inline-flex h-12 items-center justify-center rounded-2xl bg-white px-7 text-sm font-black text-[#6F2DBD] shadow-[0_14px_30px_rgba(32,10,54,0.16)] transition hover:-translate-y-0.5 hover:bg-white/90"
                >
                  Crear cuenta
                </RouterLink>

                <RouterLink
                  :to="loginRoute"
                  class="inline-flex h-12 items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-7 text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
                >
                  Entrar al panel
                </RouterLink>
              </div>
            </div>

            <!-- Tarjeta resumen -->
            <div
              class="rounded-[1.7rem] border border-white/20 bg-white/14 p-4 shadow-[0_24px_48px_rgba(32,10,54,0.16)] backdrop-blur-xl sm:p-5"
            >
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-[0.68rem] font-black uppercase tracking-[0.2em] text-white/65">
                    Hoy en el centro
                  </p>

                  <h3 class="mt-1 text-2xl font-black text-white">
                    Una visión clara del día
                  </h3>
                </div>

                <span
                  class="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-black text-white"
                >
                  Demo
                </span>
              </div>

              <div class="mt-5 grid gap-3">
                <article
                  class="flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/16 p-4"
                >
                  <div class="flex items-center gap-3">
                    <div class="grid h-12 w-12 place-items-center rounded-2xl bg-white/18">
                      <img
                        :src="registeredPetIcon"
                        alt=""
                        class="h-10 w-10 object-contain"
                      />
                    </div>

                    <div>
                      <p class="text-sm font-black text-white">
                        Mascotas registradas
                      </p>
                      <p class="text-xs font-semibold text-white/68">
                        Fichas completas y datos importantes
                      </p>
                    </div>
                  </div>

                  <strong class="text-2xl font-black text-white">
                    {{ familyProfilesCount }}
                  </strong>
                </article>

                <article
                  class="flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/16 p-4"
                >
                  <div class="flex items-center gap-3">
                    <div class="grid h-12 w-12 place-items-center rounded-2xl bg-white/18">
                      <img
                        :src="activeReservationsIcon"
                        alt=""
                        class="h-10 w-10 object-contain"
                      />
                    </div>

                    <div>
                      <p class="text-sm font-black text-white">
                        Reservas activas
                      </p>
                      <p class="text-xs font-semibold text-white/68">
                        Entradas, estancias y servicios en curso
                      </p>
                    </div>
                  </div>

                  <strong class="text-2xl font-black text-white">
                    {{ todayAgendaCount }}
                  </strong>
                </article>

                <article
                  class="flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/16 p-4"
                >
                  <div class="flex items-center gap-3">
                    <div class="grid h-12 w-12 place-items-center rounded-2xl bg-white/18">
                      <img
                        :src="pendingFollowupsIcon"
                        alt=""
                        class="h-10 w-10 object-contain"
                      />
                    </div>

                    <div>
                      <p class="text-sm font-black text-white">
                        Seguimientos pendientes
                      </p>
                      <p class="text-xs font-semibold text-white/68">
                        Información lista para revisar o publicar
                      </p>
                    </div>
                  </div>

                  <strong class="text-2xl font-black text-white">
                    {{ pendingCount }}
                  </strong>
                </article>
              </div>

              <div class="mt-4 rounded-2xl border border-white/15 bg-white/12 p-4">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <p class="text-sm font-black text-white">
                      Ocupación de recursos
                    </p>
                    <p class="mt-1 text-xs font-semibold text-white/68">
                      Distribución del centro en tiempo real
                    </p>
                  </div>

                  <strong class="text-2xl font-black text-white">
                    {{ occupancyPercent }}%
                  </strong>
                </div>

                <div class="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
                  <div
                    class="h-full rounded-full bg-white"
                    :style="{ width: `${occupancyPercent}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="relative z-10 px-4 pb-8 sm:px-6 lg:px-8">
      <div
        class="mx-auto flex max-w-6xl flex-col gap-4 border-t border-[#E4D8F0] pt-6 text-sm font-semibold text-[#71677F] sm:flex-row sm:items-center sm:justify-between"
      >
        <p>© 2026 LadraLab · Proyecto académico</p>

        <div class="flex flex-wrap gap-5">
          <a href="#plataforma" class="transition hover:text-[#6F2DBD]">Plataforma</a>
          <a href="#familias" class="transition hover:text-[#6F2DBD]">Familias</a>
          <a href="#seguimientos" class="transition hover:text-[#6F2DBD]">Seguimientos</a>
          <RouterLink :to="loginRoute" class="transition hover:text-[#6F2DBD]">
            Login
          </RouterLink>
        </div>
      </div>
    </footer>
  </main>
</template>

<style scoped>
.landing-page {
  scroll-behavior: smooth;
  background:
    radial-gradient(circle at 12% 18%, rgba(232, 60, 157, 0.08), transparent 28rem),
    radial-gradient(circle at 88% 12%, rgba(116, 48, 208, 0.09), transparent 30rem),
    radial-gradient(circle at 78% 72%, rgba(196, 153, 255, 0.11), transparent 32rem),
    linear-gradient(135deg, #fffaff 0%, #f8f1ff 42%, #f3eafd 100%);
}

.ambient-orb {
  filter: blur(85px);
  opacity: 0.42;
  animation: orb-pulse 12s ease-in-out infinite alternate;
}

.nav-link {
  position: relative;
}

.nav-link::after {
  position: absolute;
  left: 0;
  bottom: -0.45rem;
  width: 0;
  height: 3px;
  content: '';
  border-radius: 999px;
  background: linear-gradient(90deg, #e83c9d, #7430d0);
  transition: width 0.2s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.reveal {
  opacity: 0;
  transform: translateY(34px) scale(0.97);
  transition:
    opacity 0.78s cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 0.78s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

@keyframes orb-pulse {
  from {
    transform: scale(1);
    opacity: 0.36;
  }

  to {
    transform: scale(1.16);
    opacity: 0.58;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ambient-orb {
    animation: none;
  }

  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>