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
      </template>

      <template v-else>
        <!-- Cabecera -->
        <header
          class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#5A208E] via-[#7A2EA6] to-[#E02890] text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
        >
          <div class="flex min-h-[382px] flex-col p-5 sm:p-6 lg:p-7">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div class="min-w-0 max-w-4xl">
                <h1 class="font-ladralab-brush text-5xl leading-none tracking-tight sm:text-6xl">
                  Mascotas del centro
                </h1>

                <p class="mt-5 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                  Revisa qué perros están hoy en el centro, qué seguimientos faltan y qué reservas siguen pendientes de recurso.
                </p>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
                <RouterLink
                  :to="{ name: 'staff-dashboard' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Dashboard
                </RouterLink>

                <RouterLink
                  :to="{ name: 'staff-reservations' }"
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

                <button
                  type="button"
                  @click="clearFilters"
                  class="inline-flex h-11 items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:bg-[#F8F2FF]"
                >
                  Limpiar vista
                </button>
              </div>
            </div>

            <div class="mt-6 grid items-stretch gap-4 sm:grid-cols-2 xl:mt-auto xl:grid-cols-4">
              <button
                v-for="card in summaryCards"
                :key="card.key"
                type="button"
                @click="applyHeaderFilter(card.key)"
                class="flex min-h-[152px] flex-col rounded-[24px] border p-4 text-left backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                :class="
                  activeSection === card.key
                    ? 'border-white/30 bg-white/20 ring-4 ring-white/15 shadow-[0_16px_40px_-20px_rgba(30,10,60,0.45)]'
                    : 'border-white/16 bg-white/12'
                "
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
              </button>
            </div>
          </div>
        </header>

        <!-- Filtros -->
        <section class="rounded-[28px] border border-[#E8E1F1] bg-white px-5 py-5 shadow-sm sm:px-6">
          <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 class="text-[24px] font-bold tracking-tight text-slate-900">
                Buscar y filtrar
              </h2>
              <p class="mt-1 text-sm text-slate-500">
                Trabaja con muchas mascotas sin perder de vista lo urgente.
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

          <div class="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_200px_220px_200px]">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">Buscar</label>
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Nombre o raza"
                class="h-10 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">Tamaño</label>
              <select
                v-model="sizeFilter"
                class="h-10 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
              >
                <option value="all">Todos</option>
                <option value="toy">Toy</option>
                <option value="small">Pequeño</option>
                <option value="medium">Mediano</option>
                <option value="large">Grande</option>
              </select>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">Estado</label>
              <select
                v-model="statusFilter"
                class="h-10 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
              >
                <option value="all">Todos</option>
                <option value="today">Hoy en el centro</option>
                <option value="notes">Con observaciones</option>
                <option value="followup_pending">Seguimiento pendiente</option>
                <option value="resource_pending">Recurso pendiente</option>
              </select>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">Ordenar</label>
              <select
                v-model="sortOrder"
                class="h-10 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
              >
                <option value="name">Por nombre</option>
                <option value="today_first">Hoy primero</option>
                <option value="followup_first">Seguimiento pendiente primero</option>
                <option value="resource_first">Recurso pendiente primero</option>
              </select>
            </div>
          </div>

          <div class="mt-4 flex flex-wrap items-center gap-2">
            <span class="inline-flex items-center rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]">
              {{ filteredPets.length }} resultados
            </span>

            <span
              v-if="activeSection !== 'all'"
              class="inline-flex items-center rounded-full bg-[#FCE8F4] px-3 py-1 text-xs font-semibold text-[#A22068]"
            >
              {{ sectionTitle }}
            </span>
          </div>
        </section>

        <!-- Lista -->
        <section>
          <div class="mb-4">
            <h2 class="text-[26px] font-bold tracking-tight text-slate-900">
              {{ sectionTitle }}
            </h2>
            <p class="mt-1 text-sm text-slate-500">
              {{ sectionDescription }}
            </p>
          </div>

          <div
            v-if="filteredPets.length"
            class="overflow-hidden rounded-[28px] border border-[#E8E1F1] bg-white shadow-sm"
          >
            <div class="hidden items-center gap-4 border-b border-[#F1EBF7] bg-[#FCFBFE] px-6 py-4 lg:grid lg:grid-cols-[minmax(0,2.2fr)_140px_190px_170px_170px_220px]">
              <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Mascota</p>
              <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Tamaño</p>
              <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Servicio actual</p>
              <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Seguimiento</p>
              <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Recurso</p>
              <p class="text-right text-xs font-semibold uppercase tracking-wide text-slate-400">Acciones</p>
            </div>

            <div class="divide-y divide-[#F1EBF7]">
              <div
                v-for="pet in filteredPets"
                :key="pet.id"
                class="transition"
              >
                <!-- fila -->
                <div
                  class="group cursor-pointer px-5 py-4 transition hover:bg-[#FCFBFE] sm:px-6"
                  @click="goToPetDetail(pet.id)"
                >
                  <div class="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,2.2fr)_140px_190px_170px_170px_220px] lg:items-center">
                    <div class="flex min-w-0 items-start gap-4">
                      <div
                        class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#EAE9EF] to-[#D7CBE7] text-base font-bold text-[#6B5B90]"
                      >
                        <img
                          v-if="pet.photo_path"
                          :src="pet.photo_path"
                          :alt="pet.name"
                          class="h-full w-full object-cover"
                        />
                        <span v-else>{{ pet.name.charAt(0) }}</span>
                      </div>

                      <div class="min-w-0">
                        <div class="flex flex-wrap items-center gap-2">
                          <p class="text-sm font-bold text-slate-900">
                            {{ pet.name }}
                          </p>

                          <span
                            v-if="pet.todayReservation"
                            class="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100"
                          >
                            Hoy en el centro
                          </span>

                          <span
                            v-if="pet.pendingTodayFollowUp"
                            class="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100"
                          >
                            Seguimiento pendiente
                          </span>

                          <span
                            v-if="pet.pendingResourceReservation"
                            class="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-100"
                          >
                            Recurso pendiente
                          </span>
                        </div>

                        <p class="mt-1 text-sm font-semibold text-[#6B2FA4]">
                          {{ pet.breed || 'Raza pendiente' }}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p class="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
                        Tamaño
                      </p>
                      <p class="mt-1 text-sm font-semibold text-slate-900 lg:mt-0">
                        {{ sizeLabel(pet.size) }}
                      </p>
                    </div>

                    <div>
                      <p class="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
                        Servicio actual
                      </p>
                      <p class="mt-1 text-sm font-semibold text-slate-900 lg:mt-0">
                        {{ pet.todayReservation ? pet.todayReservation.service_name : 'Sin servicio activo' }}
                      </p>
                      <p class="mt-1 text-xs text-slate-500">
                        {{ pet.todayReservation ? buildServiceTimeLabel(pet.todayReservation) : 'Disponible hoy' }}
                      </p>
                    </div>

                    <div>
                      <p class="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
                        Seguimiento
                      </p>
                      <p class="mt-1 text-sm font-semibold text-slate-900 lg:mt-0">
                        {{ pet.pendingTodayFollowUp ? 'Pendiente hoy' : `${pet.totalReports} ${pet.totalReports === 1 ? 'informe' : 'informes'}` }}
                      </p>
                      <p class="mt-1 text-xs text-slate-500">
                        {{ pet.latestReportDate ? formatDate(pet.latestReportDate, { day: '2-digit', month: 'short' }) : 'Sin registro' }}
                      </p>
                    </div>

                    <div>
                      <p class="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
                        Recurso
                      </p>
                      <p class="mt-1 text-sm font-semibold text-slate-900 lg:mt-0">
                        {{ pet.pendingResourceReservation ? 'Pendiente' : pet.todayReservation?.resource_name || 'Correcto / no aplica' }}
                      </p>
                      <p class="mt-1 text-xs text-slate-500">
                        {{ pet.pendingResourceReservation ? pet.pendingResourceReservation.service_name : pet.todayReservation ? 'Servicio actual' : 'Sin conflicto' }}
                      </p>
                    </div>

                    <div class="flex flex-wrap justify-end gap-2" @click.stop>
                      <RouterLink
                        v-if="pet.pendingTodayFollowUp && pet.todayReservation"
                        :to="buildFollowUpRoute(pet.todayReservation.id)"
                        class="inline-flex h-10 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 px-4 text-sm font-semibold text-amber-800 transition hover:bg-amber-100"
                      >
                        Hacer seguimiento
                      </RouterLink>

                      <RouterLink
                        v-else-if="pet.todayReservation"
                        :to="buildFollowUpRoute(pet.todayReservation.id)"
                        class="inline-flex h-10 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                      >
                        Ver seguimiento
                      </RouterLink>

                      <button
                        type="button"
                        @click.stop="toggleExpanded(pet.id)"
                        class="inline-flex h-10 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                      >
                        {{ expandedPetId === pet.id ? 'Ocultar' : 'Resumen' }}
                      </button>

                      <button
                        type="button"
                        @click.stop="goToPetDetail(pet.id)"
                        class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white text-lg font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB] group-hover:border-[#B9A6D8]"
                        aria-label="Abrir ficha"
                      >
                        →
                      </button>
                    </div>
                  </div>
                </div>

                <!-- desplegable -->
                <div
                  v-if="expandedPetId === pet.id"
                  class="border-t border-[#F5EFFA] bg-[#FCFBFE] px-5 pb-5 pt-4 sm:px-6"
                >
                  <div class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
                    <div class="grid gap-4 md:grid-cols-2">
                      <div class="rounded-[24px] border border-[#F3D9E8] bg-gradient-to-br from-[#FFF8FB] to-[#FFFDFE] p-4 shadow-sm">
                        <div class="flex items-center gap-2">
                          <span class="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#FCE8F4] text-sm">📝</span>
                          <p class="text-sm font-bold text-slate-900">Observaciones</p>
                        </div>
                        <p class="mt-3 text-sm leading-7 text-slate-600">
                          {{ pet.care_notes || 'Sin observaciones importantes registradas en la ficha.' }}
                        </p>
                      </div>

                      <div class="rounded-[24px] border border-[#F7E8C9] bg-gradient-to-br from-[#FFFDF7] to-[#FFFEFC] p-4 shadow-sm">
                        <div class="flex items-center gap-2">
                          <span class="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#FFF3D9] text-sm">📋</span>
                          <p class="text-sm font-bold text-slate-900">Seguimiento de hoy</p>
                        </div>
                        <p class="mt-3 text-sm font-semibold text-slate-900">
                          {{ pet.pendingTodayFollowUp ? 'Falta registrar el seguimiento de hoy' : pet.todayReservation ? 'Seguimiento del día al día' : 'Sin servicio activo hoy' }}
                        </p>
                        <p class="mt-2 text-sm leading-7 text-slate-600">
                          {{ pet.pendingTodayFollowUp ? 'Esta mascota tiene una reserva activa hoy y todavía no se ha registrado el informe diario para el tutor.' : pet.latestReportSummary || 'No hay resumen pendiente para hoy.' }}
                        </p>
                      </div>

                      <div class="rounded-[24px] border border-[#D9EEDC] bg-gradient-to-br from-[#F7FFF9] to-[#FCFFFD] p-4 shadow-sm">
                        <div class="flex items-center gap-2">
                          <span class="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#EAF9EE] text-sm">🐾</span>
                          <p class="text-sm font-bold text-slate-900">Servicio activo</p>
                        </div>

                        <template v-if="pet.todayReservation">
                          <p class="mt-3 text-sm font-semibold text-slate-900">
                            {{ pet.todayReservation.service_name }}
                          </p>
                          <p class="mt-1 text-sm text-slate-500">
                            {{ formatDateTime(pet.todayReservation.start_at) }} → {{ formatDateTime(pet.todayReservation.end_at) }}
                          </p>
                          <p class="mt-1 text-sm text-slate-500">
                            {{ pet.todayReservation.resource_name || 'Sin recurso visible' }}
                          </p>
                        </template>

                        <p v-else class="mt-3 text-sm text-slate-500">
                          No tiene un servicio activo ahora mismo.
                        </p>
                      </div>

                      <div class="rounded-[24px] border border-[#DCE7FA] bg-gradient-to-br from-[#F8FBFF] to-[#FCFEFF] p-4 shadow-sm">
                        <div class="flex items-center gap-2">
                          <span class="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#EAF2FF] text-sm">📦</span>
                          <p class="text-sm font-bold text-slate-900">Recurso</p>
                        </div>

                        <template v-if="pet.pendingResourceReservation">
                          <p class="mt-3 text-sm font-semibold text-slate-900">
                            Recurso pendiente de asignación
                          </p>
                          <p class="mt-1 text-sm text-slate-500">
                            {{ pet.pendingResourceReservation.service_name }}
                          </p>
                          <p class="mt-1 text-sm text-slate-500">
                            {{ formatDateTime(pet.pendingResourceReservation.start_at) }}
                          </p>
                        </template>

                        <template v-else-if="pet.todayReservation?.resource_name">
                          <p class="mt-3 text-sm font-semibold text-slate-900">
                            {{ pet.todayReservation.resource_name }}
                          </p>
                          <p class="mt-1 text-sm text-slate-500">
                            Recurso correcto para el servicio actual.
                          </p>
                        </template>

                        <p v-else class="mt-3 text-sm text-slate-500">
                          No hay un recurso pendiente para esta mascota.
                        </p>
                      </div>
                    </div>

                    <div class="rounded-[24px] border border-[#E8E1F1] bg-white p-4 shadow-sm">
                      <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Acciones
                      </p>

                      <div class="mt-4 flex flex-col gap-3">
                        <RouterLink
                          :to="{ name: 'staff-pet-detail', params: { id: pet.id } }"
                          class="inline-flex h-11 items-center justify-center rounded-2xl bg-[#6627A3] px-4 text-sm font-semibold text-white transition hover:bg-[#57208D]"
                        >
                          Abrir ficha completa
                        </RouterLink>

                        <RouterLink
                          v-if="pet.pendingTodayFollowUp && pet.todayReservation"
                          :to="buildFollowUpRoute(pet.todayReservation.id)"
                          class="inline-flex h-11 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 px-4 text-sm font-semibold text-amber-800 transition hover:bg-amber-100"
                        >
                          Hacer seguimiento de hoy
                        </RouterLink>

                        <RouterLink
                          v-else-if="pet.todayReservation"
                          :to="buildFollowUpRoute(pet.todayReservation.id)"
                          class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                        >
                          Ver seguimiento de hoy
                        </RouterLink>

                        <button
                          type="button"
                          @click="toggleExpanded(pet.id)"
                          class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                        >
                          Cerrar resumen
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else
            class="rounded-[28px] border border-dashed border-[#DCCFEA] bg-white px-6 py-12 text-center shadow-sm"
          >
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5EFFB] text-xl font-bold text-[#5A208E]">
              🐾
            </div>

            <h3 class="mt-4 text-lg font-bold text-slate-900">
              No hay mascotas con estos filtros
            </h3>

            <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Prueba con otra búsqueda o limpia filtros para volver a ver todas las fichas del centro.
            </p>

            <button
              type="button"
              @click="clearFilters"
              class="mt-6 inline-flex items-center justify-center rounded-2xl bg-[#5A208E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4B1A77]"
            >
              Limpiar filtros
            </button>
          </div>
        </section>
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { petsMock } from '@/mocks/petsMock'
import { getStaffReservations } from '@/services/staffReservationsService'
import { uiMessages } from '@/utils/uiMessages'

const router = useRouter()

const staffPetsMessages = uiMessages.staffPets || {
  errors: {
    load: 'No hemos podido cargar las mascotas del centro por ahora.',
  },
}

const isLoading = ref(true)
const loadError = ref('')

const pets = ref([])
const reservations = ref([])

const activeSection = ref('all')
const searchTerm = ref('')
const sizeFilter = ref('all')
const statusFilter = ref('all')
const sortOrder = ref('name')
const expandedPetId = ref(null)

const todayKey = getDateKey(new Date())

onMounted(async () => {
  await loadData()
})

async function loadData() {
  isLoading.value = true
  loadError.value = ''

  try {
    const reservationsData = await getStaffReservations()
    reservations.value = reservationsData

    pets.value = petsMock.map((pet) => {
      const petReservations = reservationsData
        .filter((reservation) => Number(reservation.pet_id) === Number(pet.id))
        .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime())

      const todayReservation =
        petReservations.find((reservation) => isReservationActiveToday(reservation)) || null

      const reports = petReservations
        .flatMap((reservation) => Array.isArray(reservation.daily_reports) ? reservation.daily_reports : [])
        .filter(Boolean)
        .sort((a, b) => new Date(b.report_date).getTime() - new Date(a.report_date).getTime())

      const latestReport = reports[0] || null

      const todayReservationHasReport = Boolean(
        todayReservation &&
        Array.isArray(todayReservation.daily_reports) &&
        todayReservation.daily_reports.some((report) => normalizeDateKey(report.report_date) === todayKey),
      )

      const pendingTodayFollowUp = Boolean(todayReservation && !todayReservationHasReport)

      const pendingResourceReservation =
        petReservations.find((reservation) => reservationNeedsResource(reservation) && !reservation.resource_id) || null

      return {
        ...pet,
        reservations: petReservations,
        todayReservation,
        totalReports: reports.length,
        latestReportDate: latestReport?.report_date || null,
        latestReportSummary: latestReport?.summary || '',
        pendingTodayFollowUp,
        pendingResourceReservation,
      }
    })
  } catch (error) {
    console.error(error)
    loadError.value =
      staffPetsMessages.errors?.load ||
      'No hemos podido cargar las mascotas del centro por ahora.'
  } finally {
    isLoading.value = false
  }
}

const summaryCards = computed(() => [
  {
    key: 'all',
    label: 'Total mascotas',
    value: pets.value.length,
    help: 'Vista completa de fichas registradas en el centro.',
    icon: '01',
    iconClass: 'bg-[#F3ECFB] text-[#5A208E]',
  },
  {
    key: 'today',
    label: 'Hoy en el centro',
    value: pets.value.filter((pet) => Boolean(pet.todayReservation)).length,
    help: 'Perros con un servicio activo durante la jornada.',
    icon: '02',
    iconClass: 'bg-emerald-50 text-emerald-700',
  },
  {
    key: 'followup_pending',
    label: 'Pendiente de seguimiento',
    value: pets.value.filter((pet) => pet.pendingTodayFollowUp).length,
    help: 'Perros de hoy que todavía necesitan informe para el tutor.',
    icon: '03',
    iconClass: 'bg-amber-50 text-amber-700',
  },
  {
    key: 'resource_pending',
    label: 'Pendiente de recurso',
    value: pets.value.filter((pet) => Boolean(pet.pendingResourceReservation)).length,
    help: 'Reservas que todavía necesitan recurso asignado.',
    icon: '04',
    iconClass: 'bg-rose-50 text-rose-700',
  },
])

const sectionTitle = computed(() => {
  const titles = {
    all: 'Todas las mascotas',
    today: 'Hoy en el centro',
    followup_pending: 'Seguimiento pendiente',
    resource_pending: 'Recurso pendiente',
    notes: 'Mascotas con observaciones',
  }

  return titles[activeSection.value] || 'Mascotas'
})

const sectionDescription = computed(() => {
  const descriptions = {
    all: 'Vista operativa completa para trabajar con muchas mascotas sin saturar la pantalla.',
    today: 'Perros que tienen servicio activo durante la jornada.',
    followup_pending: 'Perros que siguen pendientes de registrar el seguimiento del día actual.',
    resource_pending: 'Perros con una reserva que necesita recurso y todavía no lo tiene asignado.',
    notes: 'Mascotas con observaciones importantes para tener presentes en el día a día.',
  }

  return descriptions[activeSection.value] || 'Listado operativo del centro.'
})

const hasActiveFilters = computed(() => {
  return (
    activeSection.value !== 'all' ||
    searchTerm.value.trim() !== '' ||
    sizeFilter.value !== 'all' ||
    statusFilter.value !== 'all' ||
    sortOrder.value !== 'name'
  )
})

const filteredPets = computed(() => {
  let items = [...pets.value]

  if (activeSection.value === 'today') {
    items = items.filter((pet) => Boolean(pet.todayReservation))
  }

  if (activeSection.value === 'followup_pending') {
    items = items.filter((pet) => pet.pendingTodayFollowUp)
  }

  if (activeSection.value === 'resource_pending') {
    items = items.filter((pet) => Boolean(pet.pendingResourceReservation))
  }

  if (activeSection.value === 'notes') {
    items = items.filter((pet) => Boolean(String(pet.care_notes || '').trim()))
  }

  const query = searchTerm.value.trim().toLowerCase()
  if (query) {
    items = items.filter((pet) => {
      return (
        pet.name?.toLowerCase().includes(query) ||
        pet.breed?.toLowerCase().includes(query)
      )
    })
  }

  if (sizeFilter.value !== 'all') {
    items = items.filter((pet) => pet.size === sizeFilter.value)
  }

  if (statusFilter.value !== 'all') {
    if (statusFilter.value === 'today') {
      items = items.filter((pet) => Boolean(pet.todayReservation))
    }

    if (statusFilter.value === 'notes') {
      items = items.filter((pet) => Boolean(String(pet.care_notes || '').trim()))
    }

    if (statusFilter.value === 'followup_pending') {
      items = items.filter((pet) => pet.pendingTodayFollowUp)
    }

    if (statusFilter.value === 'resource_pending') {
      items = items.filter((pet) => Boolean(pet.pendingResourceReservation))
    }
  }

  if (sortOrder.value === 'today_first') {
    items.sort((a, b) => Number(Boolean(b.todayReservation)) - Number(Boolean(a.todayReservation)) || a.name.localeCompare(b.name, 'es'))
  } else if (sortOrder.value === 'followup_first') {
    items.sort((a, b) => Number(b.pendingTodayFollowUp) - Number(a.pendingTodayFollowUp) || a.name.localeCompare(b.name, 'es'))
  } else if (sortOrder.value === 'resource_first') {
    items.sort((a, b) => Number(Boolean(b.pendingResourceReservation)) - Number(Boolean(a.pendingResourceReservation)) || a.name.localeCompare(b.name, 'es'))
  } else {
    items.sort((a, b) => a.name.localeCompare(b.name, 'es'))
  }

  return items
})

function applyHeaderFilter(sectionKey) {
  expandedPetId.value = null
  activeSection.value = sectionKey
}

function clearFilters() {
  expandedPetId.value = null
  activeSection.value = 'all'
  searchTerm.value = ''
  sizeFilter.value = 'all'
  statusFilter.value = 'all'
  sortOrder.value = 'name'
}

function goToPetDetail(petId) {
  router.push({
    name: 'staff-pet-detail',
    params: { id: petId },
  })
}

function toggleExpanded(petId) {
  expandedPetId.value = expandedPetId.value === petId ? null : petId
}

function buildFollowUpRoute(reservationId) {
  return {
    name: 'staff-followups',
    query: {
      reservation: reservationId,
      date: todayKey,
    },
  }
}

function isReservationActiveToday(reservation) {
  if (!reservation || reservation.status === 'cancelled' || reservation.status === 'completed') {
    return false
  }

  const now = Date.now()
  const start = new Date(reservation.start_at).getTime()
  const end = new Date(reservation.end_at).getTime()

  return start <= now && end >= now
}

function reservationNeedsResource(reservation) {
  if (!reservation || reservation.status === 'cancelled' || reservation.status === 'completed') {
    return false
  }

  const bookingMode = reservation.service?.booking_mode
  return bookingMode === 'single_day' || bookingMode === 'date_range'
}

function getDateKey(date) {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = `${d.getMonth() + 1}`.padStart(2, '0')
  const day = `${d.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

function normalizeDateKey(value) {
  if (!value) return ''
  return String(value).slice(0, 10)
}

function sizeLabel(size) {
  const labels = {
    toy: 'Toy',
    small: 'Pequeño',
    medium: 'Mediano',
    large: 'Grande',
  }

  return labels[size] || 'Tamaño pendiente'
}

function buildServiceTimeLabel(reservation) {
  if (!reservation) return ''
  return `${formatDate(reservation.start_at, { hour: '2-digit', minute: '2-digit' })} → ${formatDate(reservation.end_at, { hour: '2-digit', minute: '2-digit' })}`
}

function formatDate(dateValue, options = {}) {
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
</script>

<style scoped>
.font-ladralab-brush {
  font-family: 'Caveat Brush', 'Brush Script MT', 'Segoe Script', cursive;
  font-weight: 700;
}
</style>