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
                  Recursos del centro
                </h1>

                <p class="mt-5 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                  Consulta jaulas, patios y salas con una vista operativa clara: qué perro está dentro, hasta cuándo, qué recursos están libres y qué salidas hay previstas hoy.
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
                  :to="{ name: 'staff-pets' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Mascotas
                </RouterLink>

                <button
                  type="button"
                  @click="restoreStatuses"
                  :disabled="isRestoring"
                  class="inline-flex h-11 items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:bg-[#F8F2FF] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {{ isRestoring ? 'Restaurando...' : 'Restaurar estados' }}
                </button>
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

        <!-- Controles -->
        <section class="rounded-[28px] border border-[#E8E1F1] bg-white px-5 py-5 shadow-sm sm:px-6">
          <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div class="inline-flex w-fit flex-wrap items-center gap-2 rounded-[24px] bg-[#F6F1FB] p-2">
              <button
                v-for="tab in quickTabs"
                :key="tab.key"
                type="button"
                @click="quickFilter = tab.key"
                class="inline-flex h-12 items-center justify-center rounded-[18px] px-5 text-sm font-semibold transition"
                :class="
                  quickFilter === tab.key
                    ? 'bg-[#6627A3] text-white shadow-[0_8px_24px_-12px_rgba(102,39,163,0.65)]'
                    : 'bg-white text-[#6E4FA2] ring-1 ring-[#E4D6F4] hover:bg-[#FCFAFE]'
                "
              >
                {{ tab.label }}
              </button>
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

          <div class="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_190px_190px_190px]">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">Buscar</label>
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Nombre del recurso"
                class="h-10 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">Zona</label>
              <select
                v-model="zoneFilter"
                class="h-10 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
              >
                <option value="all">Todas</option>
                <option value="hotel">Hotel</option>
                <option value="daycare">Guardería</option>
                <option value="support">Apoyo</option>
              </select>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">Tamaño</label>
              <select
                v-model="sizeGroupFilter"
                class="h-10 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
              >
                <option value="all">Todos</option>
                <option value="toy_small">Toy y pequeños</option>
                <option value="medium">Medianos</option>
                <option value="large">Grandes</option>
                <option value="all_sizes">Todos los tamaños</option>
              </select>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">Estado</label>
              <select
                v-model="statusFilter"
                class="h-10 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
              >
                <option value="all">Todos</option>
                <option value="active">Activo</option>
                <option value="cleaning">Limpieza</option>
                <option value="disabled">Deshabilitado</option>
              </select>
            </div>
          </div>
        </section>

        <!-- HOTEL -->
        <section v-if="visibleHotelResources.length" class="space-y-4">
          <div class="flex items-end justify-between gap-4">
            <div>
              <h2 class="text-[28px] font-bold tracking-tight text-slate-900">
                Hotel canino
              </h2>
              <p class="mt-1 text-sm text-slate-500">
                Jaulas y suites con ocupación actual, salida prevista y próxima entrada.
              </p>
            </div>

            <span class="rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]">
              {{ visibleHotelResources.length }} jaulas
            </span>
          </div>

          <div class="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
            <article
              v-for="resource in visibleHotelResources"
              :key="resource.id"
              class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div class="flex h-full flex-col">
                <div class="flex items-start justify-between gap-4">
                  <div class="min-w-0">
                    <h3 class="text-lg font-bold tracking-tight text-slate-900">
                      {{ resource.name }}
                    </h3>

                    <div class="mt-3 flex flex-wrap gap-2">
                      <span class="inline-flex items-center rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]">
                        {{ sizeGroupLabel(resource.size_group) }}
                      </span>

                      <span
                        class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                        :class="resourceStatusClass(resource.status)"
                      >
                        {{ resourceStatusLabel(resource.status) }}
                      </span>
                    </div>
                  </div>

                  <div class="rounded-2xl bg-[#FAF8FC] px-4 py-3 text-right">
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Aforo</p>
                    <p class="mt-1 text-lg font-bold text-slate-900">1</p>
                  </div>
                </div>

                <div
                  class="mt-4 rounded-[24px] border p-4"
                  :class="currentOccupancy(resource) ? 'border-[#D8EAD6] bg-[#F6FCF5]' : 'border-[#EEE7F6] bg-[#FCFBFE]'"
                >
                  <template v-if="currentOccupancy(resource)">
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Ahora dentro
                    </p>
                    <p class="mt-2 text-base font-bold text-slate-900">
                      {{ currentOccupancy(resource).pet_name }}
                    </p>
                    <p class="mt-1 text-sm font-semibold text-[#6B2FA4]">
                      {{ currentOccupancy(resource).service_name }}
                    </p>
                    <p class="mt-1 text-sm text-slate-500">
                      {{ currentOccupancy(resource).client_name }}
                    </p>

                    <div class="mt-4 grid gap-3 sm:grid-cols-2">
                      <div>
                        <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Entrada</p>
                        <p class="mt-1 text-sm font-semibold text-slate-900">
                          {{ formatDateTime(currentOccupancy(resource).start_at) }}
                        </p>
                      </div>
                      <div>
                        <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Salida</p>
                        <p class="mt-1 text-sm font-semibold text-slate-900">
                          {{ formatDateTime(currentOccupancy(resource).end_at) }}
                        </p>
                      </div>
                    </div>

                    <p class="mt-4 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-emerald-700">
                      {{ stayUntilLabel(currentOccupancy(resource).end_at) }}
                    </p>
                  </template>

                  <template v-else>
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Estado actual
                    </p>
                    <p class="mt-2 text-base font-bold text-slate-900">
                      Libre ahora mismo
                    </p>

                    <template v-if="nextReservation(resource)">
                      <p class="mt-3 text-sm text-slate-500">
                        Próxima entrada:
                      </p>
                      <p class="mt-1 text-sm font-semibold text-slate-900">
                        {{ nextReservation(resource).pet_name }} · {{ formatDateTime(nextReservation(resource).start_at) }}
                      </p>
                    </template>

                    <p v-else class="mt-3 text-sm text-slate-500">
                      No hay ninguna entrada próxima asignada.
                    </p>
                  </template>
                </div>

                <div class="mt-4">
                  <button
                    type="button"
                    @click="openResourceModal(resource)"
                    class="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                  >
                    {{ currentOccupancy(resource) ? 'Ver reserva actual' : 'Ver detalle' }}
                  </button>
                </div>

                <div class="mt-auto border-t border-[#F1EBF7] pt-5">
                  <div class="grid gap-3 sm:grid-cols-3">
                    <button
                      type="button"
                      @click="setResourceStatus(resource.id, 'active')"
                      :disabled="updatingResourceId === resource.id || isRestoring"
                      class="inline-flex h-11 items-center justify-center rounded-2xl border px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
                      :class="
                        resource.status === 'active'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-[#D9CEE8] bg-white text-[#514980] hover:bg-[#F6F1FB]'
                      "
                    >
                      Activo
                    </button>

                    <button
                      type="button"
                      @click="setResourceStatus(resource.id, 'cleaning')"
                      :disabled="updatingResourceId === resource.id || isRestoring"
                      class="inline-flex h-11 items-center justify-center rounded-2xl border px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
                      :class="
                        resource.status === 'cleaning'
                          ? 'border-amber-200 bg-amber-50 text-amber-700'
                          : 'border-[#D9CEE8] bg-white text-[#514980] hover:bg-[#F6F1FB]'
                      "
                    >
                      Limpieza
                    </button>

                    <button
                      type="button"
                      @click="setResourceStatus(resource.id, 'disabled')"
                      :disabled="updatingResourceId === resource.id || isRestoring"
                      class="inline-flex h-11 items-center justify-center rounded-2xl border px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
                      :class="
                        resource.status === 'disabled'
                          ? 'border-red-200 bg-red-50 text-red-700'
                          : 'border-[#D9CEE8] bg-white text-[#514980] hover:bg-[#F6F1FB]'
                      "
                    >
                      Deshabilitar
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <!-- GUARDERÍA -->
        <section v-if="visibleDaycareResources.length" class="space-y-4">
          <div class="flex items-end justify-between gap-4">
            <div>
              <h2 class="text-[28px] font-bold tracking-tight text-slate-900">
                Guardería
              </h2>
              <p class="mt-1 text-sm text-slate-500">
                Patios con aforo actual, perros presentes ahora y próximas entradas.
              </p>
            </div>

            <span class="rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]">
              {{ visibleDaycareResources.length }} patios
            </span>
          </div>

          <div class="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
            <article
              v-for="resource in visibleDaycareResources"
              :key="resource.id"
              class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div class="flex h-full flex-col">
                <div class="flex items-start justify-between gap-4">
                  <div class="min-w-0">
                    <h3 class="text-lg font-bold tracking-tight text-slate-900">
                      {{ resource.name }}
                    </h3>

                    <div class="mt-3 flex flex-wrap gap-2">
                      <span class="inline-flex items-center rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]">
                        {{ sizeGroupLabel(resource.size_group) }}
                      </span>

                      <span
                        class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                        :class="resourceStatusClass(resource.status)"
                      >
                        {{ resourceStatusLabel(resource.status) }}
                      </span>
                    </div>
                  </div>

                  <div class="rounded-2xl bg-[#FAF8FC] px-4 py-3 text-right">
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Aforo</p>
                    <p class="mt-1 text-lg font-bold text-slate-900">
                      {{ currentDaycareOccupancy(resource).length }} / {{ resource.capacity }}
                    </p>
                  </div>
                </div>

                <div class="mt-4 rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Ahora en el patio
                  </p>

                  <div v-if="currentDaycareOccupancy(resource).length" class="mt-3 space-y-2">
                    <div
                      v-for="reservation in currentDaycareOccupancy(resource).slice(0, 3)"
                      :key="reservation.id"
                      class="rounded-2xl border border-[#E9DDF6] bg-white px-3 py-3"
                    >
                      <p class="text-sm font-bold text-slate-900">
                        {{ reservation.pet_name }}
                      </p>
                      <p class="mt-1 text-sm font-semibold text-[#6B2FA4]">
                        {{ reservation.client_name }}
                      </p>
                      <p class="mt-1 text-xs text-slate-500">
                        Hasta {{ formatTime(reservation.end_at) }}
                      </p>
                    </div>

                    <div
                      v-if="currentDaycareOccupancy(resource).length > 3"
                      class="rounded-xl bg-[#F8F4FD] px-3 py-2 text-xs font-semibold text-[#7A59B0]"
                    >
                      +{{ currentDaycareOccupancy(resource).length - 3 }} más
                    </div>
                  </div>

                  <p v-else class="mt-3 text-sm text-slate-500">
                    No hay perros dentro ahora mismo.
                  </p>
                </div>

                <div class="mt-4 rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Próxima entrada
                  </p>

                  <template v-if="nextReservation(resource)">
                    <p class="mt-2 text-sm font-bold text-slate-900">
                      {{ nextReservation(resource).pet_name }}
                    </p>
                    <p class="mt-1 text-sm font-semibold text-[#6B2FA4]">
                      {{ nextReservation(resource).client_name }}
                    </p>
                    <p class="mt-1 text-sm text-slate-500">
                      {{ formatDateTime(nextReservation(resource).start_at) }}
                    </p>
                  </template>

                  <p v-else class="mt-2 text-sm text-slate-500">
                    No hay entradas próximas asignadas.
                  </p>
                </div>

                <div class="mt-4">
                  <button
                    type="button"
                    @click="openResourceModal(resource)"
                    class="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                  >
                    Ver ocupación
                  </button>
                </div>

                <div class="mt-auto border-t border-[#F1EBF7] pt-5">
                  <div class="grid gap-3 sm:grid-cols-3">
                    <button
                      type="button"
                      @click="setResourceStatus(resource.id, 'active')"
                      :disabled="updatingResourceId === resource.id || isRestoring"
                      class="inline-flex h-11 items-center justify-center rounded-2xl border px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
                      :class="
                        resource.status === 'active'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-[#D9CEE8] bg-white text-[#514980] hover:bg-[#F6F1FB]'
                      "
                    >
                      Activo
                    </button>

                    <button
                      type="button"
                      @click="setResourceStatus(resource.id, 'cleaning')"
                      :disabled="updatingResourceId === resource.id || isRestoring"
                      class="inline-flex h-11 items-center justify-center rounded-2xl border px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
                      :class="
                        resource.status === 'cleaning'
                          ? 'border-amber-200 bg-amber-50 text-amber-700'
                          : 'border-[#D9CEE8] bg-white text-[#514980] hover:bg-[#F6F1FB]'
                      "
                    >
                      Limpieza
                    </button>

                    <button
                      type="button"
                      @click="setResourceStatus(resource.id, 'disabled')"
                      :disabled="updatingResourceId === resource.id || isRestoring"
                      class="inline-flex h-11 items-center justify-center rounded-2xl border px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
                      :class="
                        resource.status === 'disabled'
                          ? 'border-red-200 bg-red-50 text-red-700'
                          : 'border-[#D9CEE8] bg-white text-[#514980] hover:bg-[#F6F1FB]'
                      "
                    >
                      Deshabilitar
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <!-- APOYO -->
        <section v-if="visibleSupportResources.length" class="space-y-4">
          <div class="flex items-end justify-between gap-4">
            <div>
              <h2 class="text-[28px] font-bold tracking-tight text-slate-900">
                Salas de apoyo
              </h2>
              <p class="mt-1 text-sm text-slate-500">
                Recursos auxiliares del centro para adaptación o apoyo puntual.
              </p>
            </div>

            <span class="rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]">
              {{ visibleSupportResources.length }} salas
            </span>
          </div>

          <div class="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
            <article
              v-for="resource in visibleSupportResources"
              :key="resource.id"
              class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div class="flex h-full flex-col">
                <div class="flex items-start justify-between gap-4">
                  <div class="min-w-0">
                    <h3 class="text-lg font-bold tracking-tight text-slate-900">
                      {{ resource.name }}
                    </h3>

                    <div class="mt-3 flex flex-wrap gap-2">
                      <span class="inline-flex items-center rounded-full bg-[#FAF8FC] px-3 py-1 text-xs font-semibold text-[#6E5E8A]">
                        {{ sizeGroupLabel(resource.size_group) }}
                      </span>

                      <span
                        class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                        :class="resourceStatusClass(resource.status)"
                      >
                        {{ resourceStatusLabel(resource.status) }}
                      </span>
                    </div>
                  </div>

                  <div class="rounded-2xl bg-[#FAF8FC] px-4 py-3 text-right">
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Aforo</p>
                    <p class="mt-1 text-lg font-bold text-slate-900">
                      {{ resource.capacity }}
                    </p>
                  </div>
                </div>

                <div class="mt-4 rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4">
                  <template v-if="currentOccupancy(resource)">
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      En uso ahora
                    </p>
                    <p class="mt-2 text-sm font-bold text-slate-900">
                      {{ currentOccupancy(resource).pet_name }}
                    </p>
                    <p class="mt-1 text-sm font-semibold text-[#6B2FA4]">
                      {{ currentOccupancy(resource).service_name }}
                    </p>
                    <p class="mt-1 text-sm text-slate-500">
                      Hasta {{ formatDateTime(currentOccupancy(resource).end_at) }}
                    </p>
                  </template>

                  <template v-else>
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Estado actual
                    </p>
                    <p class="mt-2 text-sm font-bold text-slate-900">
                      Libre ahora mismo
                    </p>
                    <p class="mt-1 text-sm text-slate-500">
                      {{ nextReservation(resource) ? `Próximo uso: ${formatDateTime(nextReservation(resource).start_at)}` : 'Sin uso previsto a corto plazo.' }}
                    </p>
                  </template>
                </div>

                <div class="mt-4">
                  <button
                    type="button"
                    @click="openResourceModal(resource)"
                    class="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                  >
                    Ver detalle
                  </button>
                </div>

                <div class="mt-auto border-t border-[#F1EBF7] pt-5">
                  <div class="grid gap-3 sm:grid-cols-3">
                    <button
                      type="button"
                      @click="setResourceStatus(resource.id, 'active')"
                      :disabled="updatingResourceId === resource.id || isRestoring"
                      class="inline-flex h-11 items-center justify-center rounded-2xl border px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
                      :class="
                        resource.status === 'active'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-[#D9CEE8] bg-white text-[#514980] hover:bg-[#F6F1FB]'
                      "
                    >
                      Activo
                    </button>

                    <button
                      type="button"
                      @click="setResourceStatus(resource.id, 'cleaning')"
                      :disabled="updatingResourceId === resource.id || isRestoring"
                      class="inline-flex h-11 items-center justify-center rounded-2xl border px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
                      :class="
                        resource.status === 'cleaning'
                          ? 'border-amber-200 bg-amber-50 text-amber-700'
                          : 'border-[#D9CEE8] bg-white text-[#514980] hover:bg-[#F6F1FB]'
                      "
                    >
                      Limpieza
                    </button>

                    <button
                      type="button"
                      @click="setResourceStatus(resource.id, 'disabled')"
                      :disabled="updatingResourceId === resource.id || isRestoring"
                      class="inline-flex h-11 items-center justify-center rounded-2xl border px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
                      :class="
                        resource.status === 'disabled'
                          ? 'border-red-200 bg-red-50 text-red-700'
                          : 'border-[#D9CEE8] bg-white text-[#514980] hover:bg-[#F6F1FB]'
                      "
                    >
                      Deshabilitar
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section
          v-if="!visibleHotelResources.length && !visibleDaycareResources.length && !visibleSupportResources.length"
          class="rounded-[28px] border border-dashed border-[#DCCFEA] bg-white px-6 py-12 text-center shadow-sm"
        >
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5EFFB] text-xl font-bold text-[#5A208E]">
            🐾
          </div>

          <h3 class="mt-4 text-lg font-bold text-slate-900">
            No hay recursos con estos filtros
          </h3>

          <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Cambia los filtros para volver a ver jaulas, patios y salas del centro.
          </p>

          <button
            type="button"
            @click="clearFilters"
            class="mt-6 inline-flex items-center justify-center rounded-2xl bg-[#5A208E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4B1A77]"
          >
            Limpiar filtros
          </button>
        </section>
      </template>
    </div>

    <!-- Modal detalle recurso -->
    <div
      v-if="selectedResource"
      class="fixed inset-0 z-50 overflow-y-auto bg-[#2C1C43]/45 px-4 py-6 backdrop-blur-[2px]"
    >
      <div class="flex min-h-full items-start justify-center">
        <div class="w-full max-w-3xl overflow-hidden rounded-[28px] border border-[#E8E1F1] bg-white shadow-xl">
          <div class="border-b border-[#F1EBF7] px-5 py-5 sm:px-6">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-[#6E4FA2]">
                  Recurso del centro
                </p>
                <h2 class="mt-1 text-xl font-bold tracking-tight text-slate-900">
                  {{ selectedResource.name }}
                </h2>

                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="inline-flex items-center rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]">
                    {{ resourceZoneLabel(selectedResource.zone) }}
                  </span>

                  <span class="inline-flex items-center rounded-full bg-[#FAF8FC] px-3 py-1 text-xs font-semibold text-[#6E5E8A]">
                    {{ sizeGroupLabel(selectedResource.size_group) }}
                  </span>

                  <span
                    class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                    :class="resourceStatusClass(selectedResource.status)"
                  >
                    {{ resourceStatusLabel(selectedResource.status) }}
                  </span>
                </div>
              </div>

              <button
                type="button"
                @click="closeResourceModal"
                class="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white text-lg font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
              >
                ×
              </button>
            </div>
          </div>

          <div class="max-h-[calc(100vh-11rem)] overflow-y-auto px-5 py-5 sm:px-6">
            <div class="space-y-5">
              <div class="grid gap-4 md:grid-cols-3">
                <div class="rounded-[24px] border border-[#E8E1F1] bg-[#FCFBFE] p-4">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Tipo</p>
                  <p class="mt-2 text-sm font-bold text-slate-900">
                    {{ resourceTypeLabel(selectedResource.type) }}
                  </p>
                </div>

                <div class="rounded-[24px] border border-[#E8E1F1] bg-[#FCFBFE] p-4">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Aforo</p>
                  <p class="mt-2 text-sm font-bold text-slate-900">
                    {{ selectedResource.capacity }}
                  </p>
                </div>

                <div class="rounded-[24px] border border-[#E8E1F1] bg-[#FCFBFE] p-4">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Hoy</p>
                  <p class="mt-2 text-sm font-bold text-slate-900">
                    {{ resourceHasCheckoutToday(selectedResource) ? 'Sale alguien hoy' : 'Sin salida prevista hoy' }}
                  </p>
                </div>
              </div>

              <div
                class="rounded-[24px] border p-4"
                :class="selectedCurrentReservation ? 'border-[#D8EAD6] bg-[#F6FCF5]' : 'border-[#E8E1F1] bg-[#FCFBFE]'"
              >
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Reserva actual
                </p>

                <template v-if="selectedCurrentReservation">
                  <p class="mt-2 text-base font-bold text-slate-900">
                    {{ selectedCurrentReservation.pet_name }}
                  </p>
                  <p class="mt-1 text-sm font-semibold text-[#6B2FA4]">
                    {{ selectedCurrentReservation.service_name }}
                  </p>
                  <p class="mt-1 text-sm text-slate-500">
                    {{ selectedCurrentReservation.client_name }}
                  </p>

                  <div class="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Entrada</p>
                      <p class="mt-1 text-sm font-semibold text-slate-900">
                        {{ formatDateTime(selectedCurrentReservation.start_at) }}
                      </p>
                    </div>
                    <div>
                      <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Salida</p>
                      <p class="mt-1 text-sm font-semibold text-slate-900">
                        {{ formatDateTime(selectedCurrentReservation.end_at) }}
                      </p>
                    </div>
                  </div>

                  <p class="mt-4 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-emerald-700">
                    {{ stayUntilLabel(selectedCurrentReservation.end_at) }}
                  </p>
                </template>

                <p v-else class="mt-2 text-sm text-slate-500">
                  Este recurso no está ocupado ahora mismo.
                </p>
              </div>

              <div class="rounded-[24px] border border-[#E8E1F1] bg-[#FCFBFE] p-4">
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Próximas reservas
                </p>

                <div v-if="selectedUpcomingReservations.length" class="mt-3 space-y-3">
                  <div
                    v-for="reservation in selectedUpcomingReservations.slice(0, 5)"
                    :key="reservation.id"
                    class="rounded-2xl border border-[#E9DDF6] bg-white p-4"
                  >
                    <div class="flex items-start justify-between gap-3">
                      <div>
                        <p class="text-sm font-bold text-slate-900">
                          {{ reservation.pet_name }}
                        </p>
                        <p class="mt-1 text-sm font-semibold text-[#6B2FA4]">
                          {{ reservation.service_name }}
                        </p>
                        <p class="mt-1 text-sm text-slate-500">
                          {{ reservation.client_name }}
                        </p>
                      </div>

                      <span class="rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]">
                        {{ reservationStatusLabel(reservation.status) }}
                      </span>
                    </div>

                    <p class="mt-3 text-sm text-slate-500">
                      {{ formatDateTime(reservation.start_at) }} → {{ formatDateTime(reservation.end_at) }}
                    </p>
                  </div>
                </div>

                <p v-else class="mt-2 text-sm text-slate-500">
                  No hay reservas próximas asociadas a este recurso.
                </p>
              </div>

              <div v-if="selectedCheckoutTodayReservations.length" class="rounded-[24px] border border-amber-200 bg-amber-50 p-4">
                <p class="text-xs font-semibold uppercase tracking-wide text-amber-700">
                  Salidas previstas hoy
                </p>

                <div class="mt-3 space-y-2">
                  <div
                    v-for="reservation in selectedCheckoutTodayReservations"
                    :key="reservation.id"
                    class="rounded-2xl bg-white px-3 py-3"
                  >
                    <p class="text-sm font-bold text-slate-900">
                      {{ reservation.pet_name }}
                    </p>
                    <p class="mt-1 text-sm text-slate-500">
                      Sale hoy a las {{ formatTime(reservation.end_at) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="border-t border-[#F1EBF7] px-5 py-4 sm:px-6">
            <div class="flex justify-end">
              <button
                type="button"
                @click="closeResourceModal"
                class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-5 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getResources, updateResourceStatus } from '@/services/resourcesService'
import { getStaffReservations } from '@/services/staffReservationsService'
import { uiMessages } from '@/utils/uiMessages'

const resourcesMessages = uiMessages.resources || {
  success: {
    updated: 'El estado del recurso se ha actualizado correctamente.',
    restored: 'Los estados de los recursos se han restaurado.',
  },
  errors: {
    load: 'No hemos podido cargar los recursos del centro por ahora.',
    update: 'No se ha podido actualizar el recurso.',
    occupied: 'No puedes pasar este recurso a limpieza o deshabilitado mientras esté ocupado.',
  },
}

const quickTabs = [
  { key: 'all', label: 'Todos' },
  { key: 'occupied', label: 'Ocupados' },
  { key: 'free', label: 'Libres' },
  { key: 'checkouts_today', label: 'Salen hoy' },
]

const isLoading = ref(true)
const isRestoring = ref(false)
const updatingResourceId = ref(null)

const loadError = ref('')
const actionError = ref('')
const successMessage = ref('')

const resources = ref([])
const reservations = ref([])
const initialStatusSnapshot = ref([])

const quickFilter = ref('all')
const searchTerm = ref('')
const zoneFilter = ref('all')
const sizeGroupFilter = ref('all')
const statusFilter = ref('all')

const selectedResourceId = ref(null)

onMounted(async () => {
  await loadData()
})

async function loadData() {
  isLoading.value = true
  loadError.value = ''
  actionError.value = ''

  try {
    const [resourcesData, reservationsData] = await Promise.all([
      getResources(),
      getStaffReservations(),
    ])

    resources.value = resourcesData
    reservations.value = reservationsData

    initialStatusSnapshot.value = resourcesData.map((resource) => ({
      id: resource.id,
      status: resource.status,
    }))
  } catch (error) {
    console.error(error)
    loadError.value =
      resourcesMessages.errors?.load ||
      'No hemos podido cargar los recursos del centro por ahora.'
  } finally {
    isLoading.value = false
  }
}

const selectedResource = computed(() => {
  return resources.value.find((resource) => Number(resource.id) === Number(selectedResourceId.value)) || null
})

const selectedCurrentReservation = computed(() => {
  if (!selectedResource.value) return null
  return currentOccupancy(selectedResource.value)
})

const selectedUpcomingReservations = computed(() => {
  if (!selectedResource.value) return []
  return upcomingReservations(selectedResource.value)
})

const selectedCheckoutTodayReservations = computed(() => {
  if (!selectedResource.value) return []
  return checkoutTodayReservations(selectedResource.value)
})

const filteredResources = computed(() => {
  let items = [...resources.value]

  const query = searchTerm.value.trim().toLowerCase()
  if (query) {
    items = items.filter((resource) => resource.name.toLowerCase().includes(query))
  }

  if (zoneFilter.value !== 'all') {
    items = items.filter((resource) => resource.zone === zoneFilter.value)
  }

  if (sizeGroupFilter.value !== 'all') {
    if (sizeGroupFilter.value === 'all_sizes') {
      items = items.filter((resource) => resource.size_group === 'all')
    } else {
      items = items.filter((resource) => resource.size_group === sizeGroupFilter.value)
    }
  }

  if (statusFilter.value !== 'all') {
    items = items.filter((resource) => resource.status === statusFilter.value)
  }

  if (quickFilter.value === 'occupied') {
    items = items.filter((resource) => currentOccupancyCount(resource) > 0)
  }

  if (quickFilter.value === 'free') {
    items = items.filter((resource) => currentOccupancyCount(resource) === 0)
  }

  if (quickFilter.value === 'checkouts_today') {
    items = items.filter((resource) => resourceHasCheckoutToday(resource))
  }

  return items
})

const visibleHotelResources = computed(() =>
  filteredResources.value.filter((resource) => resource.zone === 'hotel'),
)

const visibleDaycareResources = computed(() =>
  filteredResources.value.filter((resource) => resource.zone === 'daycare'),
)

const visibleSupportResources = computed(() =>
  filteredResources.value.filter((resource) => resource.zone === 'support'),
)

const hasActiveFilters = computed(() => {
  return (
    quickFilter.value !== 'all' ||
    searchTerm.value.trim() !== '' ||
    zoneFilter.value !== 'all' ||
    sizeGroupFilter.value !== 'all' ||
    statusFilter.value !== 'all'
  )
})

const occupiedNowCount = computed(() => {
  return resources.value.filter((resource) => currentOccupancyCount(resource) > 0).length
})

const activeResourcesCount = computed(() => {
  return resources.value.filter((resource) => resource.status === 'active').length
})

const cleaningResourcesCount = computed(() => {
  return resources.value.filter((resource) => resource.status === 'cleaning').length
})

const summaryCards = computed(() => [
  {
    label: 'Total recursos',
    value: resources.value.length,
    help: 'Jaulas, patios y salas registradas en el centro.',
    icon: '01',
    iconClass: 'bg-[#F3ECFB] text-[#5A208E]',
  },
  {
    label: 'Activos',
    value: activeResourcesCount.value,
    help: 'Listos para asignar o usar en la operativa.',
    icon: '02',
    iconClass: 'bg-emerald-50 text-emerald-700',
  },
  {
    label: 'Ocupados ahora',
    value: occupiedNowCount.value,
    help: 'Recursos con una reserva activa en este momento.',
    icon: '03',
    iconClass: 'bg-sky-50 text-sky-700',
  },
  {
    label: 'En limpieza',
    value: cleaningResourcesCount.value,
    help: 'No disponibles temporalmente por mantenimiento.',
    icon: '04',
    iconClass: 'bg-amber-50 text-amber-700',
  },
])

function openResourceModal(resource) {
  selectedResourceId.value = resource.id
}

function closeResourceModal() {
  selectedResourceId.value = null
}

function clearFilters() {
  quickFilter.value = 'all'
  searchTerm.value = ''
  zoneFilter.value = 'all'
  sizeGroupFilter.value = 'all'
  statusFilter.value = 'all'
}

async function restoreStatuses() {
  if (!initialStatusSnapshot.value.length) return

  isRestoring.value = true
  actionError.value = ''
  successMessage.value = ''

  try {
    const changedStatuses = initialStatusSnapshot.value.filter((snapshot) => {
      const current = resources.value.find((resource) => Number(resource.id) === Number(snapshot.id))
      return current && current.status !== snapshot.status
    })

    for (const snapshot of changedStatuses) {
      const current = resources.value.find((resource) => Number(resource.id) === Number(snapshot.id))
      if (!current) continue

      if (currentOccupancyCount(current) > 0 && snapshot.status !== 'active') {
        continue
      }

      await updateResourceStatus(snapshot.id, snapshot.status)
    }

    await refreshResources()

    successMessage.value =
      resourcesMessages.success?.restored ||
      'Los estados de los recursos se han restaurado.'
  } catch (error) {
    console.error(error)
    actionError.value =
      resourcesMessages.errors?.update || 'No se ha podido actualizar el recurso.'
  } finally {
    isRestoring.value = false
  }
}

async function setResourceStatus(resourceId, nextStatus) {
  const current = resources.value.find((item) => Number(item.id) === Number(resourceId))
  if (!current) return

  if (current.status === nextStatus) return

  if (currentOccupancyCount(current) > 0 && nextStatus !== 'active') {
    actionError.value =
      resourcesMessages.errors?.occupied ||
      'No puedes pasar este recurso a limpieza o deshabilitado mientras esté ocupado.'
    successMessage.value = ''
    return
  }

  updatingResourceId.value = resourceId
  actionError.value = ''
  successMessage.value = ''

  try {
    await updateResourceStatus(resourceId, nextStatus)
    await refreshResources()

    successMessage.value =
      resourcesMessages.success?.updated ||
      'El estado del recurso se ha actualizado correctamente.'
  } catch (error) {
    console.error(error)
    actionError.value =
      resourcesMessages.errors?.update || 'No se ha podido actualizar el recurso.'
  } finally {
    updatingResourceId.value = null
  }
}

async function refreshResources() {
  resources.value = await getResources()
}

function resourceReservations(resourceId) {
  return reservations.value
    .filter((reservation) => Number(reservation.resource_id) === Number(resourceId))
    .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime())
}

function currentReservations(resource) {
  const now = Date.now()

  return resourceReservations(resource.id).filter((reservation) => {
    if (reservation.status === 'cancelled' || reservation.status === 'completed') return false

    const start = new Date(reservation.start_at).getTime()
    const end = new Date(reservation.end_at).getTime()

    return start <= now && end >= now
  })
}

function currentOccupancy(resource) {
  return currentReservations(resource)[0] || null
}

function currentDaycareOccupancy(resource) {
  return currentReservations(resource)
}

function currentOccupancyCount(resource) {
  return currentReservations(resource).length
}

function upcomingReservations(resource) {
  const now = Date.now()

  return resourceReservations(resource).filter((reservation) => {
    if (reservation.status === 'cancelled' || reservation.status === 'completed') return false
    return new Date(reservation.start_at).getTime() > now
  })
}

function nextReservation(resource) {
  return upcomingReservations(resource)[0] || null
}

function checkoutTodayReservations(resource) {
  return resourceReservations(resource).filter((reservation) => {
    if (reservation.status === 'cancelled' || reservation.status === 'completed') return false
    return isToday(reservation.end_at)
  })
}

function resourceHasCheckoutToday(resource) {
  return checkoutTodayReservations(resource).length > 0
}

function resourceTypeLabel(type) {
  const labels = {
    kennel: 'Jaula',
    yard: 'Patio',
    room: 'Sala',
    other: 'Otro',
  }

  return labels[type] || type
}

function resourceZoneLabel(zone) {
  const labels = {
    hotel: 'Hotel',
    daycare: 'Guardería',
    support: 'Apoyo',
  }

  return labels[zone] || zone
}

function sizeGroupLabel(sizeGroup) {
  const labels = {
    toy_small: 'Toy y pequeños',
    medium: 'Medianos',
    large: 'Grandes',
    all: 'Todos los tamaños',
  }

  return labels[sizeGroup] || sizeGroup
}

function resourceStatusLabel(status) {
  const labels = {
    active: 'Activo',
    cleaning: 'Limpieza',
    disabled: 'Deshabilitado',
  }

  return labels[status] || status
}

function resourceStatusClass(status) {
  const classes = {
    active: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
    cleaning: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
    disabled: 'bg-red-50 text-red-700 ring-1 ring-red-100',
  }

  return classes[status] || 'bg-slate-100 text-slate-600'
}

function reservationStatusLabel(status) {
  const labels = {
    pending: 'Pendiente',
    confirmed: 'Confirmada',
    cancelled: 'Cancelada',
    completed: 'Completada',
  }

  return labels[status] || 'Reservada'
}

function stayUntilLabel(endAt) {
  const end = new Date(endAt)
  const now = new Date()

  const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime()
  const todayDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const tomorrowDay = todayDay + 24 * 60 * 60 * 1000

  if (endDay === todayDay) {
    return `Sale hoy · ${formatTime(endAt)}`
  }

  if (endDay === tomorrowDay) {
    return `Sale mañana · ${formatTime(endAt)}`
  }

  return `Sale ${formatDateTime(endAt)}`
}

function isToday(dateValue) {
  const date = new Date(dateValue)
  const now = new Date()

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  )
}

function formatDate(dateValue, options = {}) {
  return new Intl.DateTimeFormat('es-ES', options).format(new Date(dateValue))
}

function formatTime(dateString) {
  return formatDate(dateString, {
    hour: '2-digit',
    minute: '2-digit',
  })
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