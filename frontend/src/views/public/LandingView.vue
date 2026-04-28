<template>
  <main class="min-h-screen bg-[#F4EFFA] text-[#15152E]">
    <header class="sticky top-0 z-40 border-b border-white/60 bg-[#F4EFFA]/84 backdrop-blur-xl">
      <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <RouterLink to="/" class="inline-flex items-center gap-3">
          <span class="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#6824A5] to-[#E52C91] text-xl font-black text-white shadow-lg shadow-purple-900/10">L</span>
          <span>
            <span class="block text-xs font-bold uppercase tracking-[0.34em] text-[#9A89B4]">Ladralab</span>
            <span class="block font-bold text-[#15152E]">Cuidado conectado</span>
          </span>
        </RouterLink>

        <div class="hidden items-center gap-8 text-sm font-bold text-[#596983] md:flex">
          <a href="#funciones" class="hover:text-[#6D28A8]">Funciones</a>
          <a href="#roles" class="hover:text-[#6D28A8]">Roles</a>
          <a href="#seguimiento" class="hover:text-[#6D28A8]">Seguimiento</a>
        </div>

        <div class="flex items-center gap-3">
          <RouterLink to="/login" class="hidden rounded-2xl border border-[#D8CBEA] bg-white px-5 py-3 text-sm font-black text-[#5A208E] transition hover:border-[#B991D6] hover:bg-[#FBF7FF] sm:inline-flex">
            Entrar
          </RouterLink>
          <RouterLink to="/registro" class="rounded-2xl bg-gradient-to-r from-[#6D28A8] to-[#E52C91] px-5 py-3 text-sm font-black text-white shadow-[0_12px_28px_rgba(109,40,168,0.22)] transition hover:scale-[1.02]">
            Crear cuenta
          </RouterLink>
        </div>
      </nav>
    </header>

    <section class="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -left-20 top-20 h-96 w-96 rounded-full bg-[#6D28A8]/16 blur-3xl"></div>
        <div class="absolute -right-24 top-32 h-96 w-96 rounded-full bg-[#E52C91]/16 blur-3xl"></div>
      </div>

      <div class="relative mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <div class="rounded-[2rem] bg-gradient-to-br from-[#5B1B8F] via-[#8A2BB0] to-[#E52C91] p-6 text-white shadow-[0_24px_80px_rgba(64,33,94,0.18)] sm:p-8 lg:min-h-[560px] lg:p-10">
          <div class="flex h-full flex-col justify-between gap-10">
            <div>
              <p class="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white/85 ring-1 ring-white/20">
                Plataforma para guarderías y hoteles caninos
              </p>
              <h1 class="mt-8 max-w-3xl font-ladralab-brush text-6xl leading-none text-white drop-shadow-sm sm:text-7xl lg:text-8xl">
                Gestiona tu centro con más calma
              </h1>
              <p class="mt-7 max-w-2xl text-lg leading-8 text-white/84">
                Reservas, mascotas, recursos y seguimientos diarios en una plataforma visual, ordenada y pensada para el trabajo real del equipo.
              </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row">
              <RouterLink to="/registro" class="inline-flex h-12 items-center justify-center rounded-2xl bg-white px-6 text-sm font-black text-[#64229B] transition hover:bg-white/90">
                Empezar como tutor
              </RouterLink>
              <RouterLink to="/login" class="inline-flex h-12 items-center justify-center rounded-2xl border border-white/24 bg-white/12 px-6 text-sm font-black text-white transition hover:bg-white/18">
                Acceder al panel
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="grid gap-5">
          <article class="rounded-[2rem] border border-[#E5D9F0] bg-white p-5 shadow-[0_16px_40px_rgba(64,33,94,0.08)] sm:p-6">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-xs font-bold uppercase tracking-[0.28em] text-[#A77BCB]">Hoy en el centro</p>
                <h2 class="mt-2 text-2xl font-black">Agenda operativa</h2>
              </div>
              <span class="rounded-2xl bg-[#F3EAFB] px-4 py-2 text-sm font-black text-[#6D28A8]">12</span>
            </div>

            <div class="mt-6 space-y-3">
              <div v-for="item in agendaPreview" :key="item.pet" class="flex items-center gap-4 rounded-3xl border border-[#E8DFF2] bg-[#FCFAFE] p-4">
                <img :src="item.image" :alt="item.pet" class="h-14 w-14 rounded-2xl object-cover" />
                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <h3 class="font-black">{{ item.pet }}</h3>
                    <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">Confirmada</span>
                  </div>
                  <p class="mt-1 text-sm font-semibold text-[#6D28A8]">{{ item.service }}</p>
                  <p class="mt-1 text-sm text-[#657491]">{{ item.time }} · {{ item.resource }}</p>
                </div>
                <span class="hidden rounded-full bg-[#F1E8FA] px-3 py-1 text-xs font-bold text-[#6D28A8] sm:inline-flex">Seguimiento</span>
              </div>
            </div>
          </article>

          <div class="grid gap-5 sm:grid-cols-2">
            <article class="rounded-[2rem] border border-[#E5D9F0] bg-white p-6 shadow-[0_16px_40px_rgba(64,33,94,0.08)]">
              <p class="text-4xl font-black text-[#6D28A8]">3</p>
              <h3 class="mt-3 text-lg font-black">Paneles por rol</h3>
              <p class="mt-2 leading-7 text-[#657491]">Cliente, staff y admin con accesos adaptados.</p>
            </article>
            <article class="rounded-[2rem] border border-[#E5D9F0] bg-white p-6 shadow-[0_16px_40px_rgba(64,33,94,0.08)]">
              <p class="text-4xl font-black text-[#E52C91]">1</p>
              <h3 class="mt-3 text-lg font-black">Seguimiento diario</h3>
              <p class="mt-2 leading-7 text-[#657491]">Notas, checks y fotos visibles para el tutor.</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section id="funciones" class="px-4 py-10 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="mb-8 max-w-3xl">
          <p class="text-xs font-bold uppercase tracking-[0.34em] text-[#A77BCB]">Funciones</p>
          <h2 class="mt-3 text-3xl font-black sm:text-4xl">Todo lo importante, sin ruido</h2>
          <p class="mt-4 leading-8 text-[#657491]">
            LadraLab organiza el día a día del centro en módulos claros para que cada persona encuentre rápido lo que necesita.
          </p>
        </div>

        <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <article v-for="feature in features" :key="feature.title" class="rounded-[2rem] border border-[#E5D9F0] bg-white p-6 shadow-[0_16px_40px_rgba(64,33,94,0.08)]">
            <div class="grid h-12 w-12 place-items-center rounded-2xl bg-[#F3EAFB] text-xl">{{ feature.icon }}</div>
            <h3 class="mt-5 text-xl font-black">{{ feature.title }}</h3>
            <p class="mt-3 leading-7 text-[#657491]">{{ feature.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="roles" class="px-4 py-10 sm:px-6 lg:px-8">
      <div class="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
        <article v-for="role in roles" :key="role.title" class="rounded-[2rem] border border-[#E5D9F0] bg-white p-6 shadow-[0_16px_40px_rgba(64,33,94,0.08)]">
          <p class="text-xs font-bold uppercase tracking-[0.28em]" :class="role.color">{{ role.badge }}</p>
          <h3 class="mt-3 text-2xl font-black">{{ role.title }}</h3>
          <p class="mt-3 leading-7 text-[#657491]">{{ role.text }}</p>
          <ul class="mt-5 space-y-3 text-sm font-semibold text-[#4C5A73]">
            <li v-for="item in role.items" :key="item" class="flex gap-3 rounded-2xl border border-[#E8DFF2] bg-[#FCFAFE] px-4 py-3">
              <span class="text-[#6D28A8]">✓</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section id="seguimiento" class="px-4 py-10 sm:px-6 lg:px-8">
      <div class="mx-auto grid max-w-7xl gap-6 rounded-[2rem] bg-gradient-to-br from-[#5B1B8F] via-[#8A2BB0] to-[#E52C91] p-6 text-white shadow-[0_24px_80px_rgba(64,33,94,0.18)] lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
        <div class="flex flex-col justify-between gap-8">
          <div>
            <p class="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white/85 ring-1 ring-white/20">
              Seguimiento visible para el tutor
            </p>
            <h2 class="mt-6 font-ladralab-brush text-5xl leading-none text-white sm:text-6xl">
              El día de cada mascota, bien contado
            </h2>
            <p class="mt-6 max-w-xl text-lg leading-8 text-white/84">
              El equipo registra cuidados, observaciones y fotos. El tutor recibe un resumen claro solo cuando el seguimiento está publicado.
            </p>
          </div>
          <RouterLink to="/registro" class="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-white px-6 text-sm font-black text-[#64229B] transition hover:bg-white/90 sm:w-fit">
            Crear cuenta de tutor
          </RouterLink>
        </div>

        <article class="rounded-[2rem] bg-white p-5 text-[#15152E] ring-1 ring-white/20 sm:p-6">
          <div class="flex items-start gap-4">
            <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=240&q=80" alt="Mascota" class="h-16 w-16 rounded-3xl object-cover" />
            <div>
              <div class="flex flex-wrap items-center gap-2">
                <h3 class="text-xl font-black">Luna</h3>
                <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">Publicado</span>
              </div>
              <p class="mt-1 font-semibold text-[#6D28A8]">Guardería de día</p>
              <p class="mt-1 text-sm text-[#657491]">28 de abril de 2026</p>
            </div>
          </div>

          <div class="mt-5 rounded-3xl border border-[#E8DFF2] bg-[#FCFAFE] p-4">
            <p class="text-xs font-bold uppercase tracking-[0.28em] text-[#A7B0C4]">Resumen del día</p>
            <p class="mt-3 leading-7 text-[#596983]">
              Luna ha pasado una jornada tranquila y activa. Ha disfrutado de sus momentos de juego y ha descansado correctamente durante la tarde.
            </p>
          </div>

          <div class="mt-5 grid grid-cols-2 gap-3 text-sm font-bold text-emerald-700">
            <span class="rounded-2xl bg-emerald-50 px-4 py-3">✓ Comida</span>
            <span class="rounded-2xl bg-emerald-50 px-4 py-3">✓ Paseo</span>
            <span class="rounded-2xl bg-emerald-50 px-4 py-3">✓ Descanso</span>
            <span class="rounded-2xl bg-emerald-50 px-4 py-3">✓ Juego</span>
          </div>
        </article>
      </div>
    </section>

    <footer class="px-4 py-8 sm:px-6 lg:px-8">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 border-t border-[#E0D2EE] pt-6 text-sm font-semibold text-[#657491] sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 LadraLab. Proyecto académico.</p>
        <div class="flex gap-4">
          <RouterLink to="/login" class="hover:text-[#6D28A8]">Login</RouterLink>
          <RouterLink to="/registro" class="hover:text-[#6D28A8]">Registro</RouterLink>
        </div>
      </div>
    </footer>
  </main>
</template>

<script setup>
const agendaPreview = [
  {
    pet: 'Rocky',
    service: 'Hotel canino',
    time: '10:00 → 17:00',
    resource: 'Suite Thor',
    image: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=160&q=80',
  },
  {
    pet: 'Nala',
    service: 'Guardería de día',
    time: '08:45 → 17:30',
    resource: 'Patio Rocky',
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=160&q=80',
  },
  {
    pet: 'Milo',
    service: 'Adaptación tranquila',
    time: '09:30 → 13:00',
    resource: 'Sala calma',
    image: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=160&q=80',
  },
]

const features = [
  {
    icon: '🐾',
    title: 'Mascotas',
    text: 'Fichas claras con datos, observaciones y relación con sus tutores.',
  },
  {
    icon: '📅',
    title: 'Reservas',
    text: 'Agenda diaria, servicios activos, estados y próximas estancias.',
  },
  {
    icon: '🏡',
    title: 'Recursos',
    text: 'Patios, salas o suites organizados para evitar asignaciones confusas.',
  },
  {
    icon: '📝',
    title: 'Seguimientos',
    text: 'Checks, notas, fotos y resumen visible cuando el informe se publica.',
  },
]

const roles = [
  {
    badge: 'Cliente',
    title: 'Tutor',
    color: 'text-[#E52C91]',
    text: 'Consulta sus mascotas, próximas reservas y seguimientos publicados.',
    items: ['Ver mascotas', 'Crear y revisar reservas', 'Consultar seguimientos'],
  },
  {
    badge: 'Staff',
    title: 'Equipo del centro',
    color: 'text-[#6D28A8]',
    text: 'Trabaja con agenda diaria, recursos y seguimiento operativo.',
    items: ['Revisar agenda', 'Completar seguimientos', 'Consultar reservas activas'],
  },
  {
    badge: 'Admin',
    title: 'Administración',
    color: 'text-[#D97706]',
    text: 'Tiene visión global del centro y gestiona usuarios, recursos y estados.',
    items: ['Gestionar usuarios', 'Supervisar reservas', 'Controlar recursos'],
  },
]
</script>
