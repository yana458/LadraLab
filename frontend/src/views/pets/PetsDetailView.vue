<template>
  <section class="relative">
    <div class="pointer-events-none fixed right-6 top-6 z-[70] flex w-full max-w-md flex-col gap-3">
      <div
        v-if="loadError"
        class="pointer-events-auto rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-lg"
      >
        <div class="flex items-start gap-3">
          <span class="mt-0.5 text-base">⚠️</span>
          <p>{{ loadError }}</p>
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
              <div class="flex min-w-0 max-w-4xl gap-5">
                <div class="h-28 w-28 rounded-[28px] bg-white/15"></div>
                <div class="min-w-0 flex-1">
                  <div class="h-12 w-72 rounded bg-white/20"></div>
                  <div class="mt-4 h-5 w-56 rounded bg-white/15"></div>
                  <div class="mt-4 h-5 w-full max-w-2xl rounded bg-white/15"></div>
                </div>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 lg:w-[340px]">
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
      </template>

      <template v-else-if="pet">
        <!-- Cabecera -->
        <header
          class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#5A208E] via-[#7A2EA6] to-[#E02890] text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
        >
          <div class="flex min-h-[382px] flex-col p-5 sm:p-6 lg:p-7">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div class="flex min-w-0 max-w-4xl gap-5">
                <div
                  class="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-[28px] border border-white/18 bg-white/12 text-3xl font-bold text-white/90 shadow-sm"
                >
                  <img
                    v-if="getPetImage(pet)"
                    :src="getPetImage(pet)"
                    :alt="pet.name"
                    class="h-full w-full object-cover"
                    @error="hideBrokenImage"
                  />
                  <span v-else>{{ getInitial(pet.name) }}</span>
                </div>

                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <h1 class="font-ladralab-brush text-5xl leading-none tracking-tight sm:text-6xl">
                      {{ pet.name }}
                    </h1>

                    <span
                      v-if="todayReservation"
                      class="inline-flex items-center rounded-full bg-white/14 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20"
                    >
                      Hoy en el centro
                    </span>

                    <span
                      v-if="pendingTodayFollowUp"
                      class="inline-flex items-center rounded-full bg-white/14 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20"
                    >
                      Seguimiento pendiente
                    </span>

                    <span
                      v-else-if="todayReportState === 'draft'"
                      class="inline-flex items-center rounded-full bg-white/14 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20"
                    >
                      Borrador guardado
                    </span>
                  </div>

                  <p class="mt-4 text-sm font-semibold text-white/90 sm:text-base">
                    {{ pet.breed || 'Raza pendiente' }} · {{ sizeLabel(pet.size) }}
                  </p>

                  <p class="mt-4 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                    Consulta la ficha interna, el servicio del día y el historial de seguimientos desde un solo lugar.
                  </p>
                </div>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
                <RouterLink
                  :to="{ name: 'staff-pets' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Volver
                </RouterLink>

                <RouterLink
                  :to="{ name: 'staff-reservations', query: { pet: pet.id } }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Reservas
                </RouterLink>

                <RouterLink
                  :to="{ name: 'staff-resources' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Recursos
                </RouterLink>

                <RouterLink
                  v-if="todayReservation"
                  :to="followUpRoute"
                  class="inline-flex h-11 items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:bg-[#F8F2FF]"
                >
                  {{ pendingTodayFollowUp ? 'Seguimiento' : 'Ver seguimiento' }}
                </RouterLink>

                <div
                  v-else
                  class="inline-flex h-11 items-center justify-center rounded-2xl bg-white/10 px-4 text-sm font-semibold text-white/70"
                >
                  Sin seguimiento hoy
                </div>
              </div>
            </div>

            <div class="mt-6 grid items-stretch gap-4 sm:grid-cols-2 xl:mt-auto xl:grid-cols-4">
              <article
                v-for="card in summaryCards"
                :key="card.label"
                class="flex min-h-[152px] flex-col rounded-[24px] border border-white/16 bg-white/12 p-4 backdrop-blur-sm"
              >
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-sm font-medium text-white/85">{{ card.label }}</p>
                    <p class="mt-2 text-3xl font-bold leading-none text-white">{{ card.value }}</p>
                  </div>

                  <div
                    class="flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold shadow-sm"
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

        <section class="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_360px] xl:items-start">
          <!-- Columna principal -->
          <div class="space-y-6">
            <!-- Ficha interna -->
            <article class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <div>
                <h2 class="text-[26px] font-bold tracking-tight text-slate-900">
                  Ficha interna
                </h2>
                <p class="mt-1 text-sm text-slate-500">
                  Datos clave y observaciones para el trabajo diario.
                </p>
              </div>

              <div class="mt-5 grid gap-4 md:grid-cols-2">
                <div class="rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Raza</p>
                  <p class="mt-2 text-sm font-bold text-slate-900">{{ pet.breed || 'Pendiente' }}</p>
                </div>

                <div class="rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Tamaño</p>
                  <p class="mt-2 text-sm font-bold text-slate-900">{{ sizeLabel(pet.size) }}</p>
                </div>

                <div class="rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Nacimiento</p>
                  <p class="mt-2 text-sm font-bold text-slate-900">
                    {{ pet.birth_date ? formatDate(pet.birth_date, { day: '2-digit', month: 'long', year: 'numeric' }) : 'Sin fecha registrada' }}
                  </p>
                </div>

                <div class="rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Estado actual</p>
                  <p class="mt-2 text-sm font-bold text-slate-900">
                    {{ todayReservation ? 'Con servicio activo' : 'Sin servicio activo' }}
                  </p>
                </div>
              </div>

              <div class="mt-4 rounded-[24px] border border-[#F3D9E8] bg-gradient-to-br from-[#FFF8FB] to-[#FFFDFE] p-4 shadow-sm">
                <div class="flex items-center gap-2">
                  <span class="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#FCE8F4] text-sm">📝</span>
                  <p class="text-sm font-bold text-slate-900">Observaciones importantes</p>
                </div>

                <p class="mt-3 text-sm leading-7 text-slate-600">
                  {{ pet.care_notes || 'Sin observaciones importantes registradas en la ficha.' }}
                </p>
              </div>
            </article>

            <!-- Servicio de hoy -->
            <article class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h2 class="text-[26px] font-bold tracking-tight text-slate-900">
                    Servicio de hoy
                  </h2>
                  <p class="mt-1 text-sm text-slate-500">
                    Reserva activa y acceso directo al seguimiento diario.
                  </p>
                </div>

                <RouterLink
                  v-if="todayReservation"
                  :to="followUpRoute"
                  class="inline-flex h-10 items-center justify-center rounded-2xl border px-4 text-sm font-semibold transition"
                  :class="
                    pendingTodayFollowUp
                      ? 'border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100'
                      : 'border-[#D9CEE8] bg-white text-[#514980] hover:border-[#B9A6D8] hover:bg-[#F6F1FB]'
                  "
                >
                  {{ pendingTodayFollowUp ? 'Registrar seguimiento' : 'Editar seguimiento de hoy' }}
                </RouterLink>
              </div>

              <div v-if="todayReservation" class="mt-5 grid gap-4 md:grid-cols-2">
                <div class="rounded-[24px] border border-[#D9EEDC] bg-gradient-to-br from-[#F7FFF9] to-[#FCFFFD] p-4 shadow-sm">
                  <div class="flex items-center gap-2">
                    <span class="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#EAF9EE] text-sm">🐾</span>
                    <p class="text-sm font-bold text-slate-900">Servicio activo</p>
                  </div>

                  <p class="mt-3 text-sm font-semibold text-slate-900">
                    {{ todayReservation.service_name }}
                  </p>
                  <p class="mt-1 text-sm text-slate-500">
                    {{ formatDateTime(todayReservation.start_at) }} → {{ formatDateTime(todayReservation.end_at) }}
                  </p>
                  <p class="mt-1 text-sm text-slate-500">
                    {{ todayReservation.resource_name || 'Recurso pendiente o no visible' }}
                  </p>
                  <p class="mt-3 text-sm leading-7 text-slate-600">
                    {{ todayReservation.notes || 'Sin notas adicionales en la reserva.' }}
                  </p>
                </div>

                <div
                  class="rounded-[24px] border p-4 shadow-sm"
                  :class="followUpStateCardClass"
                >
                  <div class="flex items-center gap-2">
                    <span
                      class="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-sm"
                      :class="followUpStateIconClass"
                    >
                      {{ followUpStateIcon }}
                    </span>
                    <p class="text-sm font-bold text-slate-900">Seguimiento del día</p>
                  </div>

                  <p class="mt-3 text-sm font-semibold text-slate-900">
                    {{ todayReportStateLabel }}
                  </p>

                  <p class="mt-2 text-sm leading-7 text-slate-600">
                    {{ todayReport ? todayReport.summary || 'Hoy ya existe un reporte guardado.' : 'Cuando completes el seguimiento, el tutor verá el resumen del día actual.' }}
                  </p>
                </div>
              </div>

              <div
                v-else
                class="mt-5 rounded-[24px] border border-dashed border-[#E8E1F1] bg-[#FCFBFE] px-4 py-8 text-sm text-slate-500"
              >
                Esta mascota no tiene un servicio activo en este momento.
              </div>
            </article>

            <!-- Resumen del seguimiento de hoy -->
            <article class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h2 class="text-[26px] font-bold tracking-tight text-slate-900">
                    Seguimiento de hoy
                  </h2>
                  <p class="mt-1 text-sm text-slate-500">
                    Resumen visible para el tutor y materiales del informe diario.
                  </p>
                </div>

                <RouterLink
                  v-if="todayReservation"
                  :to="followUpRoute"
                  class="inline-flex h-10 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                >
                  {{ pendingTodayFollowUp ? 'Ir a seguimiento' : 'Abrir seguimiento' }}
                </RouterLink>
              </div>

              <template v-if="todayReservation">
                <div
                  v-if="todayReport"
                  class="mt-5 space-y-4"
                >
                  <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    <div
                      v-for="item in checklistOptions"
                      :key="item.key"
                      class="flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium"
                      :class="todayReport[item.key] ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-[#EEE7F6] bg-[#FCFBFE] text-slate-500'"
                    >
                      <span
                        class="inline-flex h-7 w-7 items-center justify-center rounded-xl text-xs font-bold"
                        :class="todayReport[item.key] ? 'bg-white text-emerald-700' : 'bg-white text-slate-400'"
                      >
                        {{ todayReport[item.key] ? '✓' : '—' }}
                      </span>
                      <span>{{ item.label }}</span>
                    </div>
                  </div>

                  <div class="rounded-[24px] border border-[#F7E8C9] bg-gradient-to-br from-[#FFFDF7] to-[#FFFEFC] p-4 shadow-sm">
                    <div class="flex items-center gap-2">
                      <span class="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#FFF3D9] text-sm">📋</span>
                      <p class="text-sm font-bold text-slate-900">Resumen para el tutor</p>
                    </div>
                    <p class="mt-3 text-sm leading-7 text-slate-600">
                      {{ todayReport.summary || 'Sin resumen visible en el informe de hoy.' }}
                    </p>
                  </div>

                  <div class="rounded-[24px] border border-[#E8E1F1] bg-[#FCFBFE] p-4 shadow-sm">
                    <div class="flex items-center gap-2">
                      <span class="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#F3ECFB] text-sm">🛠️</span>
                      <p class="text-sm font-bold text-slate-900">Observaciones internas</p>
                    </div>
                    <p class="mt-3 text-sm leading-7 text-slate-600">
                      {{ todayReport.observations || 'Sin observaciones internas registradas.' }}
                    </p>
                  </div>

                  <div v-if="getReportImages(todayReport).length" class="rounded-[24px] border border-[#DCE7FA] bg-gradient-to-br from-[#F8FBFF] to-[#FCFEFF] p-4 shadow-sm">
                    <div class="flex items-center gap-2">
                      <span class="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#EAF2FF] text-sm">📷</span>
                      <p class="text-sm font-bold text-slate-900">Fotos del día</p>
                    </div>

                    <div class="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      <div
                        v-for="mediaItem in getReportImages(todayReport)"
                        :key="mediaItem.id || mediaItem.file_path || mediaItem.url"
                        class="overflow-hidden rounded-[22px] border border-[#E8E1F1] bg-white shadow-sm"
                      >
                        <div class="aspect-[4/3] bg-[#F6F2FB]">
                          <img
                            :src="getMediaUrl(mediaItem)"
                            alt="Foto del seguimiento"
                            class="h-full w-full object-cover"
                            @error="hideBrokenImage"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  v-else
                  class="mt-5 rounded-[24px] border border-amber-200 bg-amber-50 px-4 py-5 text-sm text-amber-900"
                >
                  Falta registrar el seguimiento diario de esta mascota. Usa el acceso directo para completarlo.
                </div>
              </template>

              <div
                v-else
                class="mt-5 rounded-[24px] border border-dashed border-[#E8E1F1] bg-[#FCFBFE] px-4 py-8 text-sm text-slate-500"
              >
                Cuando esta mascota tenga un servicio activo, aquí se verá el resumen del día.
              </div>
            </article>
          </div>

          <!-- Columna lateral -->
          <aside class="space-y-6">
            <article class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <div class="flex items-start gap-4">
                <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F3ECFB] text-lg font-bold text-[#5A208E]">
                  {{ getInitial(ownerInfo.name) }}
                </div>

                <div class="min-w-0 flex-1">
                  <p class="text-xs font-semibold uppercase tracking-wide text-[#6E4FA2]">
                    Tutor / responsable
                  </p>
                  <h3 class="mt-1 truncate text-lg font-bold tracking-tight text-slate-900">
                    {{ ownerInfo.name }}
                  </h3>
                  <p class="mt-1 text-sm text-slate-500">
                    Dueño asociado a esta ficha.
                  </p>
                </div>
              </div>

              <div class="mt-5 space-y-3">
                <div class="rounded-2xl bg-[#FCFBFE] px-4 py-3">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Teléfono</p>
                  <p class="mt-1 text-sm font-semibold text-slate-900">{{ ownerInfo.phone }}</p>
                </div>

                <div class="rounded-2xl bg-[#FCFBFE] px-4 py-3">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Email</p>
                  <p class="mt-1 break-all text-sm font-semibold text-slate-900">{{ ownerInfo.email }}</p>
                </div>

                <div class="rounded-2xl bg-[#FCFBFE] px-4 py-3">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">ID usuario</p>
                  <p class="mt-1 text-sm font-semibold text-slate-900">{{ ownerInfo.id ? `#${ownerInfo.id}` : 'No disponible' }}</p>
                </div>
              </div>

              <RouterLink
                :to="{ name: 'staff-reservations', query: { pet: pet.id } }"
                class="mt-5 inline-flex h-11 w-full items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
              >
                Ver reservas asociadas
              </RouterLink>
            </article>

            <article class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <h3 class="text-lg font-bold tracking-tight text-slate-900">
                    Próximas reservas
                  </h3>
                  <p class="mt-1 text-sm text-slate-500">
                    Lo siguiente que tiene previsto.
                  </p>
                </div>

                <span class="rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]">
                  {{ upcomingReservations.length }}
                </span>
              </div>

              <div class="mt-5 space-y-3">
                <div
                  v-for="reservation in upcomingReservations.slice(0, 4)"
                  :key="reservation.id"
                  class="rounded-2xl border border-[#EEE7F6] bg-[#FCFBFE] p-4"
                >
                  <p class="text-sm font-bold text-slate-900">
                    {{ reservation.service_name }}
                  </p>
                  <p class="mt-1 text-sm text-slate-500">
                    {{ formatDateTime(reservation.start_at) }}
                  </p>
                  <p class="mt-1 text-sm text-slate-500">
                    {{ reservation.resource_name || 'Recurso pendiente de asignación' }}
                  </p>
                </div>

                <div
                  v-if="!upcomingReservations.length"
                  class="rounded-2xl border border-dashed border-[#E8E1F1] bg-[#FCFBFE] px-4 py-6 text-sm text-slate-500"
                >
                  No hay reservas futuras registradas.
                </div>
              </div>
            </article>

            <article class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <h3 class="text-lg font-bold tracking-tight text-slate-900">
                    Informes recientes
                  </h3>
                  <p class="mt-1 text-sm text-slate-500">
                    Últimos seguimientos guardados.
                  </p>
                </div>

                <span class="rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]">
                  {{ recentReports.length }}
                </span>
              </div>

              <div class="mt-5 space-y-3">
                <div
                  v-for="report in recentReports.slice(0, 4)"
                  :key="`${report.reservation_id}-${report.id || report.report_date}`"
                  class="rounded-2xl border border-[#EEE7F6] bg-[#FCFBFE] p-4"
                >
                  <p class="text-sm font-bold text-slate-900">
                    {{ report.service_name }}
                  </p>
                  <p class="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {{ formatDate(report.report_date, { day: '2-digit', month: 'short', year: 'numeric' }) }}
                  </p>
                  <p class="mt-2 text-sm leading-7 text-slate-600">
                    {{ report.summary || 'Sin resumen visible en este informe.' }}
                  </p>

                  <div v-if="getReportImages(report).length" class="mt-3 grid grid-cols-3 gap-2">
                    <div
                      v-for="mediaItem in getReportImages(report).slice(0, 3)"
                      :key="mediaItem.id || mediaItem.file_path || mediaItem.url"
                      class="aspect-square overflow-hidden rounded-xl bg-[#F6F2FB]"
                    >
                      <img
                        :src="getMediaUrl(mediaItem)"
                        alt="Foto del informe"
                        class="h-full w-full object-cover"
                        @error="hideBrokenImage"
                      />
                    </div>
                  </div>

                  <RouterLink
                    :to="buildReportFollowUpLink(report)"
                    class="mt-4 inline-flex h-9 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-xs font-semibold text-[#5A208E] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                  >
                    Ver seguimiento
                  </RouterLink>
                </div>

                <div
                  v-if="!recentReports.length"
                  class="rounded-2xl border border-dashed border-[#E8E1F1] bg-[#FCFBFE] px-4 py-6 text-sm text-slate-500"
                >
                  Todavía no hay informes guardados para esta mascota.
                </div>
              </div>
            </article>
          </aside>
        </section>
      </template>

      <template v-else>
        <section class="rounded-[30px] border border-[#E8E1F1] bg-white px-5 py-14 text-center shadow-sm">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F5EFFB] text-2xl text-[#5A208E]">
            🐾
          </div>
          <h1 class="mt-5 text-2xl font-bold tracking-tight text-slate-900">
            Mascota no encontrada
          </h1>
          <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            No hemos encontrado una mascota con ese identificador. Puede que no exista o que ya no esté disponible.
          </p>
          <RouterLink
            :to="{ name: 'staff-pets' }"
            class="mt-6 inline-flex h-11 items-center justify-center rounded-2xl bg-[#6627A3] px-5 text-sm font-semibold text-white transition hover:bg-[#57208D]"
          >
            Volver a mascotas
          </RouterLink>
        </section>
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { apiRequest, normalizeCollectionResponse } from '@/services/apiClient'
import { getStaffReservations } from '@/services/staffReservationsService'
import { getReservationDailyLogs } from '@/services/dailyLogsService'
import { getReadableErrorMessage } from '@/utils/errorMessages'
import { uiMessages } from '@/utils/uiMessages'

const props = defineProps({
  id: {
    type: [String, Number],
    required: false,
    default: null,
  },
})

const route = useRoute()
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

const staffPetDetailMessages = uiMessages.staffPetDetail || {
  errors: {
    load: 'No hemos podido cargar la ficha de la mascota por ahora.',
  },
}

const checklistOptions = [
  { key: 'food_done', label: 'Comida registrada' },
  { key: 'walk_done', label: 'Paseo realizado' },
  { key: 'rest_done', label: 'Descanso correcto' },
  { key: 'hygiene_done', label: 'Higiene revisada' },
  { key: 'medication_done', label: 'Medicación administrada' },
  { key: 'play_done', label: 'Juego / actividad' },
]

const isLoading = ref(true)
const loadError = ref('')

const pet = ref(null)
const reservations = ref([])

const todayKey = getDateKey(new Date())

onMounted(async () => {
  await loadData()
})

const petId = computed(() => Number(props.id || route.params.id || 0))

async function loadData() {
  isLoading.value = true
  loadError.value = ''

  try {
    const [petsData, reservationsData] = await Promise.all([
      getStaffPets(),
      getStaffReservations(),
    ])

    pet.value = petsData.find((item) => Number(item.id) === Number(petId.value)) || null

    if (!pet.value) {
      throw new Error('Mascota no encontrada')
    }

    const normalizedReservations = Array.isArray(reservationsData)
      ? reservationsData.map(normalizeReservationForView)
      : []

    const petReservationList = normalizedReservations.filter((reservation) => {
      return Number(reservation.pet_id) === Number(petId.value)
    })

    reservations.value = await attachDailyReportsToReservations(petReservationList)
  } catch (error) {
    console.error(error)
    loadError.value = getReadableErrorMessage(
      error,
      staffPetDetailMessages.errors?.load ||
        'No hemos podido cargar la ficha de la mascota por ahora.',
    )
  } finally {
    isLoading.value = false
  }
}

async function getStaffPets() {
  const data = await apiRequest('/api/staff/pets', {
    method: 'GET',
  })

  return normalizeCollectionResponse(data).map(normalizeStaffPet)
}

async function attachDailyReportsToReservations(list = []) {
  const mapped = await Promise.all(
    list.map(async (reservation) => {
      if (!reservationAllowsFollowUp(reservation)) {
        return reservation
      }

      if (Array.isArray(reservation.daily_reports) && reservation.daily_reports.length) {
        return reservation
      }

      try {
        const reports = await getReservationDailyLogs(reservation.id)

        return {
          ...reservation,
          daily_reports: Array.isArray(reports) ? reports : [],
        }
      } catch (error) {
        console.warn(`No se pudieron cargar los seguimientos de la reserva ${reservation.id}`, error)

        return {
          ...reservation,
          daily_reports: [],
        }
      }
    }),
  )

  return mapped
}

function normalizeStaffPet(item = {}) {
  return {
    id: item.id,
    owner_user_id: item.owner_user_id ?? item.owner?.id ?? null,
    owner: item.owner ?? null,
    name: item.name ?? '',
    breed: item.breed ?? '',
    species: item.species ?? '',
    size: item.size ?? '',
    birth_date: item.birth_date ?? null,
    care_notes: item.care_notes ?? '',
    photo_path: item.photo_path ?? '',
    photo_url: item.photo_url ?? '',
    created_at: item.created_at ?? null,
    updated_at: item.updated_at ?? null,
  }
}

function normalizeReservationForView(reservation = {}) {
  const reservationPet = reservation.pet || null
  const service = reservation.service || null
  const resource = reservation.resource || null
  const client = reservation.client || reservationPet?.owner || null

  return {
    ...reservation,
    id: reservation.id,
    client_user_id: reservation.client_user_id ?? client?.id ?? reservationPet?.owner_user_id ?? null,
    pet_id: reservation.pet_id ?? reservationPet?.id ?? null,
    service_id: reservation.service_id ?? service?.id ?? null,
    resource_id: reservation.resource_id ?? resource?.id ?? null,
    pet: reservationPet,
    service,
    resource,
    client,
    pet_name: reservation.pet_name || reservationPet?.name || 'Mascota',
    client_name: reservation.client_name || client?.name || 'Cliente',
    client_email: reservation.client_email || client?.email || '',
    client_phone: reservation.client_phone || client?.phone || '',
    service_name: reservation.service_name || service?.name || 'Servicio',
    resource_name: reservation.resource_name || resource?.name || '',
    status: reservation.status ?? 'pending',
    start_at: reservation.start_at ?? null,
    end_at: reservation.end_at ?? reservation.start_at ?? null,
    notes: reservation.notes ?? '',
    daily_reports: Array.isArray(reservation.daily_reports)
      ? reservation.daily_reports
      : Array.isArray(reservation.dailyReports)
        ? reservation.dailyReports
        : [],
  }
}

const petReservations = computed(() => {
  return [...reservations.value]
    .filter((reservation) => Number(reservation.pet_id) === Number(petId.value))
    .sort((a, b) => new Date(b.start_at).getTime() - new Date(a.start_at).getTime())
})

const ownerInfo = computed(() => {
  const reservationWithClient = petReservations.value.find(
    (reservation) => reservation.client_name || reservation.client_email || reservation.client_phone || reservation.client,
  )

  const owner = pet.value?.owner || reservationWithClient?.client || null
  const ownerId = pet.value?.owner_user_id || reservationWithClient?.client_user_id || owner?.id || null

  return {
    id: ownerId,
    name:
      owner?.name ||
      reservationWithClient?.client_name ||
      (ownerId ? `Cliente ${ownerId}` : 'Tutor no asignado'),
    email:
      owner?.email ||
      reservationWithClient?.client_email ||
      'No disponible',
    phone:
      owner?.phone ||
      reservationWithClient?.client_phone ||
      'No disponible',
  }
})

const todayReservation = computed(() => {
  return petReservations.value.find((reservation) => isReservationActiveToday(reservation)) || null
})

const todayReport = computed(() => {
  if (!todayReservation.value) return null

  return (
    (todayReservation.value.daily_reports || []).find(
      (report) => normalizeDateKey(report.report_date) === todayKey,
    ) || null
  )
})

const todayReportState = computed(() => getReportState(todayReport.value))

const pendingTodayFollowUp = computed(() => {
  return Boolean(
    todayReservation.value &&
      reservationAllowsFollowUp(todayReservation.value) &&
      !todayReport.value,
  )
})

const todayReportStateLabel = computed(() => {
  if (pendingTodayFollowUp.value) return 'Todavía falta registrar el informe para hoy.'
  if (todayReportState.value === 'draft') return 'Hay un borrador guardado pendiente de publicar.'
  if (todayReportState.value === 'completed') return 'El seguimiento de hoy ya está publicado.'
  return 'Seguimiento registrado.'
})

const followUpStateCardClass = computed(() => {
  if (pendingTodayFollowUp.value) return 'border-amber-200 bg-amber-50'
  if (todayReportState.value === 'draft') return 'border-orange-200 bg-orange-50'
  return 'border-emerald-200 bg-emerald-50'
})

const followUpStateIconClass = computed(() => {
  if (pendingTodayFollowUp.value) return 'text-amber-700'
  if (todayReportState.value === 'draft') return 'text-orange-700'
  return 'text-emerald-700'
})

const followUpStateIcon = computed(() => {
  if (pendingTodayFollowUp.value) return '⏳'
  if (todayReportState.value === 'draft') return '…'
  return '✓'
})

const upcomingReservations = computed(() => {
  return petReservations.value.filter((reservation) => isFutureReservation(reservation))
})

const recentReports = computed(() => {
  return petReservations.value
    .flatMap((reservation) =>
      (reservation.daily_reports || []).map((report) => ({
        ...report,
        media: normalizeReportMedia(report),
        reservation_id: reservation.id,
        service_name: reservation.service_name,
      })),
    )
    .sort((a, b) => new Date(b.report_date).getTime() - new Date(a.report_date).getTime())
})

const followUpRoute = computed(() => {
  if (!todayReservation.value) return { name: 'staff-followups' }

  return {
    path: `/staff/seguimientos/${todayReservation.value.id}`,
    query: {
      date: todayKey,
    },
  }
})

function buildReportFollowUpLink(report) {
  return {
    path: `/staff/seguimientos/${report.reservation_id}`,
    query: {
      date: normalizeDateKey(report.report_date),
    },
  }
}

const summaryCards = computed(() => [
  {
    label: 'Reservas',
    value: petReservations.value.length,
    help: 'Histórico operativo asociado a esta mascota.',
    icon: '01',
    iconClass: 'bg-[#F3ECFB] text-[#5A208E]',
  },
  {
    label: 'Hoy',
    value: todayReservation.value ? 'Sí' : 'No',
    help: todayReservation.value ? 'Tiene un servicio activo durante la jornada.' : 'No tiene servicio activo ahora mismo.',
    icon: '02',
    iconClass: 'bg-emerald-50 text-emerald-700',
  },
  {
    label: 'Informes',
    value: recentReports.value.length,
    help: 'Seguimientos diarios guardados para esta mascota.',
    icon: '03',
    iconClass: 'bg-amber-50 text-amber-700',
  },
  {
    label: 'Seguimiento hoy',
    value: pendingTodayFollowUp.value ? 'Pendiente' : todayReservation.value ? stateLabel(todayReportState.value) : '—',
    help: pendingTodayFollowUp.value
      ? 'Falta completar el informe del día actual.'
      : todayReservation.value
        ? 'El seguimiento de hoy tiene estado registrado.'
        : 'No aplica sin servicio activo.',
    icon: '04',
    iconClass: pendingTodayFollowUp.value ? 'bg-rose-50 text-rose-700' : 'bg-sky-50 text-sky-700',
  },
])

function isReservationActiveToday(reservation) {
  if (!reservation || ['cancelled'].includes(reservation.status)) {
    return false
  }

  const todayStart = new Date(`${todayKey}T00:00:00`)
  const todayEnd = new Date(`${todayKey}T23:59:59`)
  const start = new Date(reservation.start_at)
  const end = new Date(reservation.end_at || reservation.start_at)

  return start <= todayEnd && end >= todayStart
}

function isFutureReservation(reservation) {
  if (!reservation || ['cancelled', 'completed'].includes(reservation.status)) {
    return false
  }

  return new Date(reservation.start_at).getTime() > Date.now()
}

function reservationAllowsFollowUp(reservation) {
  if (!reservation || !['confirmed', 'completed'].includes(reservation.status)) {
    return false
  }

  const serviceKey = getServiceKey(reservation)
  return serviceKey === 'hotel' || serviceKey === 'daycare'
}

function getServiceKey(reservation) {
  const bookingMode = reservation.service?.booking_mode
  const category = reservation.service?.category
  const serviceName = String(reservation.service_name || reservation.service?.name || '').toLowerCase()

  if (category === 'boarding' || bookingMode === 'date_range') return 'hotel'
  if (category === 'daycare' || bookingMode === 'single_day') return 'daycare'

  if (serviceName.includes('hotel') || serviceName.includes('alojamiento')) return 'hotel'
  if (serviceName.includes('guardería') || serviceName.includes('adaptación')) return 'daycare'

  return 'other'
}

function getReportState(report) {
  const status = String(report?.status || '').toLowerCase()

  if (!report) return 'pending'
  if (status === 'draft' || report.is_draft) return 'draft'
  if (status === 'published' || status === 'completed' || report.published_at || report.completed_at) return 'completed'

  return 'draft'
}

function stateLabel(state) {
  const labels = {
    pending: 'Pendiente',
    draft: 'Borrador',
    completed: 'Hecho',
  }

  return labels[state] || 'Registrado'
}

function getInitial(value) {
  return String(value || 'T').charAt(0).toUpperCase()
}

function sizeLabel(size) {
  const labels = {
    toy: 'Toy',
    small: 'Pequeño',
    medium: 'Mediano',
    large: 'Grande',
    giant: 'Gigante',
  }

  return labels[size] || 'Tamaño pendiente'
}

function normalizeDateKey(value) {
  if (!value) return ''

  const rawValue = String(value)
  const match = rawValue.match(/^(\d{4}-\d{2}-\d{2})/)

  if (match) return match[1]

  const date = new Date(rawValue)
  if (Number.isNaN(date.getTime())) return ''

  return getDateKey(date)
}

function getDateKey(date) {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = `${d.getMonth() + 1}`.padStart(2, '0')
  const day = `${d.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatDate(dateValue, options = {}) {
  if (!dateValue) return 'Sin fecha'
  return new Intl.DateTimeFormat('es-ES', options).format(new Date(dateValue))
}

function formatDateTime(dateString) {
  return formatDate(dateString, {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function normalizeReportMedia(report = {}) {
  const media = Array.isArray(report.media) ? report.media : []
  const photos = Array.isArray(report.photos) ? report.photos : []

  return [...media, ...photos]
}

function getReportImages(report) {
  return normalizeReportMedia(report).filter((item) => {
    const type = String(item?.file_type || item?.type || '').toLowerCase()
    const path = item?.url || item?.file_url || item?.file_path || item?.path || ''

    if (!path) return false
    if (type && type !== 'image') return false

    return true
  })
}

function getPetImage(item) {
  return getStorageUrl(
    item?.photo_preview ||
      item?.photo_url ||
      item?.photo_path ||
      '',
  )
}

function getMediaUrl(item) {
  return getStorageUrl(item?.url || item?.file_url || item?.file_path || item?.path || '')
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

function hideBrokenImage(event) {
  event.target.style.display = 'none'
}
</script>

<style scoped>
.font-ladralab-brush {
  font-family: 'Caveat Brush', 'Brush Script MT', 'Segoe Script', cursive;
  font-weight: 700;
}
</style>
