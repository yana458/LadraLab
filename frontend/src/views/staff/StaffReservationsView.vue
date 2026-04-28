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
              <div v-for="n in 4" :key="n" class="h-[152px] rounded-[24px] bg-white/15"></div>
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
                  Reservas del centro
                </h1>

                <p class="mt-5 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                  Revisa la agenda diaria, organiza la semana, consulta el mes completo y confirma reservas con recurso asignado cuando haga falta.
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
                  :to="{ name: 'staff-pets' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Mascotas
                </RouterLink>

                <RouterLink
                  :to="{ name: 'staff-resources' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Recursos
                </RouterLink>

                <button
                  type="button"
                  @click="openCreateModal"
                  class="inline-flex h-11 items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:bg-[#F8F2FF]"
                >
                  Nueva reserva
                </button>
              </div>
            </div>

            <div class="mt-6 grid items-stretch gap-4 sm:grid-cols-2 xl:mt-auto xl:grid-cols-4">
              <button
                v-for="card in summaryCards"
                :key="card.key"
                type="button"
                @click="quickFilter = card.key"
                class="flex h-full min-h-[152px] flex-col rounded-[24px] border bg-white/12 p-4 text-left backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-lg"
                :class="
                  quickFilter === card.key
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

        <!-- Barra vista + navegación + filtros -->
        <section class="rounded-[28px] border border-[#E8E1F1] bg-white px-5 py-5 shadow-sm sm:px-6">
          <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div class="inline-flex w-fit flex-wrap items-center gap-2 rounded-[24px] bg-[#F6F1FB] p-2">
              <button
                v-for="tab in viewTabs"
                :key="tab.key"
                type="button"
                @click="setView(tab.key)"
                class="inline-flex h-12 items-center justify-center rounded-[18px] px-5 text-sm font-semibold transition"
                :class="
                  currentView === tab.key
                    ? 'bg-[#6627A3] text-white shadow-[0_8px_24px_-12px_rgba(102,39,163,0.65)]'
                    : 'bg-white text-[#6E4FA2] ring-1 ring-[#E4D6F4] hover:bg-[#FCFAFE]'
                "
              >
                {{ tab.label }}
              </button>
            </div>

            <div
              v-if="currentView !== 'list'"
              class="inline-flex items-center gap-2 rounded-[24px] bg-[#F6F1FB] p-2"
            >
              <button
                type="button"
                @click="goToToday"
                class="inline-flex h-12 items-center justify-center rounded-[18px] px-4 text-sm font-semibold transition"
                :class="
                  isShowingActualToday
                    ? 'bg-[#6627A3] text-white shadow-[0_8px_24px_-12px_rgba(102,39,163,0.65)]'
                    : 'bg-white text-[#6E4FA2] ring-1 ring-[#E4D6F4] hover:bg-[#FCFAFE]'
                "
              >
                Hoy
              </button>

              <button
                type="button"
                @click="movePeriod(-1)"
                class="inline-flex h-12 w-12 items-center justify-center rounded-[18px] bg-white text-[#6E4FA2] ring-1 ring-[#E4D6F4] transition hover:bg-[#FCFAFE]"
              >
                ←
              </button>

              <button
                type="button"
                @click="movePeriod(1)"
                class="inline-flex h-12 w-12 items-center justify-center rounded-[18px] bg-white text-[#6E4FA2] ring-1 ring-[#E4D6F4] transition hover:bg-[#FCFAFE]"
              >
                →
              </button>
            </div>
          </div>

          <div class="mt-5 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 class="text-[24px] font-bold tracking-tight text-slate-900">
                {{ periodTitle }}
              </h2>
              <p class="mt-1 text-sm text-slate-500">
                {{ periodDescription }}
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

          <div class="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_220px_220px_220px]">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">Buscar</label>
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Mascota, tutor o servicio"
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
                <option value="pending">Pendientes</option>
                <option value="confirmed">Confirmadas</option>
                <option value="cancelled">Canceladas</option>
                <option value="today">Hoy</option>
              </select>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">Servicio</label>
              <select
                v-model="serviceFilter"
                class="h-10 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
              >
                <option value="all">Todos</option>
                <option
                  v-for="service in services"
                  :key="service.id"
                  :value="String(service.id)"
                >
                  {{ service.name }}
                </option>
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

            <span class="inline-flex items-center rounded-full bg-[#FCE8F4] px-3 py-1 text-xs font-semibold text-[#A22068]">
              {{ currentViewLabel }}
            </span>

            <span
              v-if="quickFilter !== 'all'"
              class="inline-flex items-center rounded-full bg-[#FFF3DE] px-3 py-1 text-xs font-semibold text-[#B56B17]"
            >
              {{ quickFilterLabel }}
            </span>

            <span
              v-if="petFilterId"
              class="inline-flex items-center rounded-full bg-[#EEF8FF] px-3 py-1 text-xs font-semibold text-sky-700"
            >
              Mascota: {{ petFilterName }}
            </span>
          </div>
        </section>

        <!-- DÍA -->
        <section
          v-if="currentView === 'day'"
          class="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_380px] xl:items-start"
        >
          <article class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
            <div class="flex items-center justify-between gap-4">
              <div>
                <h3 class="text-lg font-bold tracking-tight text-slate-900">Agenda del día</h3>
                <p class="mt-1 text-sm text-slate-500">
                  Vista compacta con solo las franjas que tienen actividad.
                </p>
              </div>

              <span class="rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]">
                {{ dayReservations.length }}
              </span>
            </div>

            <div v-if="dayAgendaHours.length" class="mt-5 space-y-3">
              <div
                v-for="hour in dayAgendaHours"
                :key="hour"
                class="grid gap-3 rounded-[24px] border border-[#F1EBF7] bg-[#FCFBFE] p-4 md:grid-cols-[74px_minmax(0,1fr)]"
              >
                <div class="text-sm font-semibold text-[#7D6E9D]">
                  {{ formatHour(hour) }}
                </div>

                <div class="space-y-3">
                  <article
                    v-for="item in dayAgendaItemsForHour(hour)"
                    :key="`${item.eventType}-${item.reservation.id}`"
                    class="w-full rounded-2xl border border-[#E9DDF6] bg-white p-4 text-left transition hover:border-[#D4B8F1] hover:bg-[#FEFCFF]"
                  >
                    <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div class="min-w-0">
                        <div class="flex flex-wrap items-center gap-2">
                          <p class="text-sm font-bold text-slate-900">
                            {{ item.reservation.pet_name }}
                          </p>

                          <span
                            class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                            :class="statusBadgeClass(item.reservation.status)"
                          >
                            {{ reservationStatusLabel(item.reservation.status) }}
                          </span>

                          <span
                            class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                            :class="agendaEventClass(item.eventType)"
                          >
                            {{ agendaEventLabel(item.eventType) }}
                          </span>
                        </div>

                        <p class="mt-2 text-sm font-semibold text-[#6B2FA4]">
                          {{ item.reservation.service_name }}
                        </p>

                        <p class="mt-1 text-sm text-slate-500">
                          {{ item.reservation.client_name }} · {{ reservationShortEventLabelForDate(item.reservation, activeDayKey) }}
                        </p>
                      </div>

                      <div class="flex shrink-0 flex-wrap gap-2 lg:justify-end">
                        <RouterLink
                          :to="buildReservationDetailLink(item.reservation)"
                          class="inline-flex h-10 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                        >
                          Ver reserva
                        </RouterLink>

                        <button
                          v-if="item.reservation.status === 'pending'"
                          type="button"
                          @click="openReviewModal(item.reservation)"
                          class="inline-flex h-10 items-center justify-center rounded-2xl bg-[#6627A3] px-4 text-sm font-semibold text-white transition hover:bg-[#57208D]"
                        >
                          Revisar
                        </button>

                        <button
                          v-else
                          type="button"
                          @click="openEditModal(item.reservation)"
                          class="inline-flex h-10 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                        >
                          Editar
                        </button>

                        <RouterLink
                          v-if="reservationAllowsFollowUp(item.reservation)"
                          :to="buildFollowUpLink(item.reservation, activeDayKey)"
                          class="inline-flex h-10 items-center justify-center rounded-2xl border border-[#E7CAE0] bg-[#FFF0F8] px-4 text-sm font-semibold text-[#A22068] transition hover:bg-[#FCE8F4]"
                        >
                          Seguimiento
                        </RouterLink>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>

            <div
              v-else
              class="mt-5 rounded-[24px] border border-dashed border-[#E8E1F1] bg-[#FCFBFE] px-4 py-8 text-sm text-slate-500"
            >
              No hay reservas para este día.
            </div>
          </article>

          <aside class="space-y-6">
            <article class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <h3 class="text-lg font-bold tracking-tight text-slate-900">Pendientes de atención</h3>
                  <p class="mt-1 text-sm text-slate-500">
                    Acciones importantes del día sin duplicar todo el listado de reservas.
                  </p>
                </div>

                <span class="rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]">
                  {{ operationalPendingItems.length }}
                </span>
              </div>

              <div v-if="visibleOperationalPendingItems.length" class="mt-5 space-y-3">
                <article
                  v-for="item in visibleOperationalPendingItems"
                  :key="`${item.type}-${item.reservation.id}`"
                  class="rounded-2xl border border-[#EEE7F6] bg-[#FCFBFE] p-4"
                >
                  <div class="flex items-start justify-between gap-3">
                    <div class="min-w-0">
                      <div class="flex flex-wrap items-center gap-2">
                        <p class="text-sm font-bold text-slate-900">
                          {{ item.reservation.pet_name }}
                        </p>

                        <span
                          class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                          :class="pendingTypeBadgeClass(item.type)"
                        >
                          {{ item.label }}
                        </span>
                      </div>

                      <p class="mt-1 text-sm font-semibold text-[#6B2FA4]">
                        {{ item.reservation.service_name }}
                      </p>

                      <p class="mt-2 text-sm leading-6 text-slate-500">
                        {{ item.description }}
                      </p>
                    </div>
                  </div>

                  <div class="mt-4 flex flex-wrap gap-2">
                    <RouterLink
                      :to="buildReservationDetailLink(item.reservation)"
                      class="inline-flex h-10 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                    >
                      Ver reserva
                    </RouterLink>

                    <button
                      v-if="item.type === 'confirm'"
                      type="button"
                      @click="openReviewModal(item.reservation)"
                      class="inline-flex h-10 items-center justify-center rounded-2xl bg-[#6627A3] px-4 text-sm font-semibold text-white transition hover:bg-[#57208D]"
                    >
                      Revisar
                    </button>

                    <button
                      v-else-if="item.type === 'resource'"
                      type="button"
                      @click="openResourceModal(item.reservation)"
                      class="inline-flex h-10 items-center justify-center rounded-2xl bg-[#6627A3] px-4 text-sm font-semibold text-white transition hover:bg-[#57208D]"
                    >
                      Asignar recurso
                    </button>

                    <RouterLink
                      v-else-if="item.type === 'followup'"
                      :to="buildFollowUpLink(item.reservation, activeDayKey)"
                      class="inline-flex h-10 items-center justify-center rounded-2xl bg-[#6627A3] px-4 text-sm font-semibold text-white transition hover:bg-[#57208D]"
                    >
                      Abrir seguimiento
                    </RouterLink>
                  </div>
                </article>

                <div
                  v-if="hiddenOperationalPendingCount > 0"
                  class="rounded-2xl border border-dashed border-[#E8E1F1] bg-white px-4 py-4 text-sm leading-6 text-slate-500"
                >
                  Hay {{ hiddenOperationalPendingCount }} pendientes más. Usa el listado completo o cambia los filtros para revisarlos con más calma.
                </div>
              </div>

              <div
                v-else
                class="mt-5 rounded-2xl border border-dashed border-[#E8E1F1] bg-[#FCFBFE] px-4 py-8 text-center text-sm text-slate-500"
              >
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5EFFB] text-lg text-[#5A208E]">
                  ✓
                </div>
                <h4 class="mt-4 font-bold text-slate-900">Todo controlado</h4>
                <p class="mt-2 leading-6">
                  No hay reservas sin confirmar, sin recurso o sin seguimiento para este día.
                </p>
              </div>
            </article>
          </aside>
        </section>

        <!-- SEMANA -->
        <section v-else-if="currentView === 'week'" class="space-y-6">
          <article class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
            <div class="grid gap-4 xl:grid-cols-7">
              <button
                v-for="day in weekDays"
                :key="day.key"
                type="button"
                @click="selectDate(day.key)"
                class="rounded-[24px] border p-4 text-left transition"
                :class="[
                  selectedDateKey === day.key
                    ? 'border-[#D6B5F2] bg-[#FCF8FF] shadow-sm'
                    : day.isToday
                      ? 'border-[#E8D6F8] bg-[#FEFBFF]'
                      : 'border-[#EEE7F6] bg-[#FCFBFE] hover:border-[#D6B5F2] hover:bg-[#FCF8FF]',
                ]"
              >
                <div class="flex items-center justify-between gap-2">
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {{ day.weekday }}
                    </p>
                    <p class="mt-1 text-lg font-bold text-slate-900">
                      {{ day.dayNumber }}
                    </p>
                  </div>

                  <span
                    v-if="day.isToday"
                    class="rounded-full bg-[#F3ECFB] px-3 py-1 text-[11px] font-semibold text-[#6E4FA2]"
                  >
                    hoy
                  </span>
                </div>

                <div class="mt-4 space-y-2">
                  <div
                    v-for="reservation in reservationsForDateKey(day.key).slice(0, 3)"
                    :key="`week-${day.key}-${reservation.id}`"
                    class="rounded-2xl border border-[#E9DDF6] bg-white px-3 py-3"
                  >
                    <p class="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      {{ reservationShortEventLabelForDate(reservation, day.key) }}
                    </p>
                    <p class="mt-1 truncate text-sm font-bold text-slate-900">
                      {{ reservation.pet_name }}
                    </p>
                    <p class="truncate text-xs text-[#6B2FA4]">
                      {{ reservation.service_name }}
                    </p>
                  </div>

                  <div
                    v-if="!reservationsForDateKey(day.key).length"
                    class="rounded-2xl border border-dashed border-[#E8E1F1] px-3 py-5 text-center text-sm text-slate-400"
                  >
                    Sin reservas
                  </div>

                  <div
                    v-if="reservationsForDateKey(day.key).length > 3"
                    class="rounded-xl bg-[#F8F4FD] px-3 py-2 text-xs font-semibold text-[#7A59B0]"
                  >
                    +{{ reservationsForDateKey(day.key).length - 3 }} más
                  </div>
                </div>
              </button>
            </div>
          </article>

          <article class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
            <div class="flex items-center justify-between gap-4">
              <div>
                <h3 class="text-lg font-bold tracking-tight text-slate-900">
                  Reservas del {{ selectedDateTitle }}
                </h3>
                <p class="mt-1 text-sm text-slate-500">
                  Pulsa un día de la semana para ver aquí su detalle.
                </p>
              </div>

              <span class="rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]">
                {{ selectedDateReservations.length }}
              </span>
            </div>

            <div class="mt-5 grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
              <div
                v-for="reservation in selectedDateReservations"
                :key="`selected-week-${reservation.id}`"
                class="rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4"
              >
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-sm font-bold text-slate-900">
                      {{ reservation.pet_name }}
                    </p>
                    <p class="mt-1 text-sm font-semibold text-[#6B2FA4]">
                      {{ reservation.service_name }}
                    </p>
                    <p class="mt-2 text-sm text-slate-500">
                      {{ reservation.client_name }}
                    </p>
                  </div>

                  <span
                    class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                    :class="statusBadgeClass(reservation.status)"
                  >
                    {{ reservationStatusLabel(reservation.status) }}
                  </span>
                </div>

                <p class="mt-4 text-sm text-slate-500">
                  {{ reservationShortEventLabelForDate(reservation, selectedDateKey) }}
                </p>

                <p class="mt-2 text-sm text-slate-500">
                  {{ reservation.resource_name || resourceNeededLabel(reservation) }}
                </p>

                <div class="mt-4 flex flex-wrap gap-2">
                  <RouterLink
                    :to="buildReservationDetailLink(reservation)"
                    class="inline-flex h-10 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                  >
                    Ver reserva
                  </RouterLink>

                  <button
                    v-if="reservation.status === 'pending'"
                    type="button"
                    @click="openReviewModal(reservation)"
                    class="inline-flex h-10 items-center justify-center rounded-2xl bg-[#6627A3] px-4 text-sm font-semibold text-white transition hover:bg-[#57208D]"
                  >
                    Revisar
                  </button>

                  <button
                    v-else
                    type="button"
                    @click="openEditModal(reservation)"
                    class="inline-flex h-10 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                  >
                    Editar
                  </button>
                </div>
              </div>

              <div
                v-if="!selectedDateReservations.length"
                class="rounded-[24px] border border-dashed border-[#E8E1F1] bg-[#FCFBFE] px-4 py-8 text-sm text-slate-500"
              >
                No hay reservas para este día.
              </div>
            </div>
          </article>
        </section>

        <!-- MES -->
        <section v-else-if="currentView === 'month'" class="space-y-6">
          <article class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
            <div class="grid grid-cols-7 gap-3">
              <div
                v-for="weekday in monthWeekdays"
                :key="weekday"
                class="px-2 pb-1 text-center text-xs font-semibold uppercase tracking-wide text-slate-400"
              >
                {{ weekday }}
              </div>

              <button
                v-for="cell in monthCells"
                :key="cell.key"
                type="button"
                @click="selectDate(cell.key)"
                class="min-h-[155px] rounded-[22px] border p-3 text-left transition"
                :class="[
                  selectedDateKey === cell.key
                    ? 'border-[#D6B5F2] bg-[#FCF8FF] shadow-sm'
                    : cell.inCurrentMonth
                      ? 'border-[#EEE7F6] bg-white hover:border-[#D6B5F2] hover:bg-[#FCF8FF]'
                      : 'border-[#EEE7F6] bg-[#FAF8FC] hover:border-[#D6B5F2]',
                ]"
              >
                <div class="flex items-center justify-between gap-2">
                  <p
                    class="text-sm font-bold"
                    :class="cell.inCurrentMonth ? 'text-slate-900' : 'text-slate-400'"
                  >
                    {{ cell.dayNumber }}
                  </p>

                  <span
                    v-if="cell.reservations.length"
                    class="rounded-full bg-[#F3ECFB] px-2.5 py-1 text-[11px] font-semibold text-[#6E4FA2]"
                  >
                    {{ cell.reservations.length }}
                  </span>
                </div>

                <div class="mt-3 space-y-2">
                  <div
                    v-for="reservation in cell.reservations.slice(0, 3)"
                    :key="`month-${cell.key}-${reservation.id}`"
                    class="rounded-xl border border-[#E9DDF6] bg-[#FCFBFE] px-2.5 py-2"
                  >
                    <p class="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      {{ reservationShortEventLabelForDate(reservation, cell.key) }}
                    </p>
                    <p class="mt-1 truncate text-xs font-bold text-slate-900">
                      {{ reservation.pet_name }}
                    </p>
                    <p class="truncate text-xs text-[#6B2FA4]">
                      {{ reservation.service_name }}
                    </p>
                  </div>

                  <div
                    v-if="cell.reservations.length > 3"
                    class="rounded-xl bg-[#F8F4FD] px-2.5 py-2 text-xs font-semibold text-[#7A59B0]"
                  >
                    +{{ cell.reservations.length - 3 }} más
                  </div>
                </div>
              </button>
            </div>
          </article>

          <article class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
            <div class="flex items-center justify-between gap-4">
              <div>
                <h3 class="text-lg font-bold tracking-tight text-slate-900">
                  Reservas del {{ selectedDateTitle }}
                </h3>
                <p class="mt-1 text-sm text-slate-500">
                  Pulsa cualquier día del mes para ver aquí su detalle operativo.
                </p>
              </div>

              <span class="rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]">
                {{ selectedDateReservations.length }}
              </span>
            </div>

            <div class="mt-5 grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
              <div
                v-for="reservation in selectedDateReservations"
                :key="`selected-month-${reservation.id}`"
                class="rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4"
              >
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-sm font-bold text-slate-900">
                      {{ reservation.pet_name }}
                    </p>
                    <p class="mt-1 text-sm font-semibold text-[#6B2FA4]">
                      {{ reservation.service_name }}
                    </p>
                    <p class="mt-2 text-sm text-slate-500">
                      {{ reservation.client_name }}
                    </p>
                  </div>

                  <span
                    class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                    :class="statusBadgeClass(reservation.status)"
                  >
                    {{ reservationStatusLabel(reservation.status) }}
                  </span>
                </div>

                <p class="mt-4 text-sm text-slate-500">
                  {{ reservationShortEventLabelForDate(reservation, selectedDateKey) }}
                </p>

                <p class="mt-2 text-sm text-slate-500">
                  {{ reservation.resource_name || resourceNeededLabel(reservation) }}
                </p>

                <div class="mt-4 flex flex-wrap gap-2">
                  <RouterLink
                    :to="buildReservationDetailLink(reservation)"
                    class="inline-flex h-10 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                  >
                    Ver reserva
                  </RouterLink>

                  <button
                    v-if="reservation.status === 'pending'"
                    type="button"
                    @click="openReviewModal(reservation)"
                    class="inline-flex h-10 items-center justify-center rounded-2xl bg-[#6627A3] px-4 text-sm font-semibold text-white transition hover:bg-[#57208D]"
                  >
                    Revisar
                  </button>

                  <button
                    v-else
                    type="button"
                    @click="openEditModal(reservation)"
                    class="inline-flex h-10 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                  >
                    Editar
                  </button>
                </div>
              </div>

              <div
                v-if="!selectedDateReservations.length"
                class="rounded-[24px] border border-dashed border-[#E8E1F1] bg-[#FCFBFE] px-4 py-8 text-sm text-slate-500"
              >
                No hay reservas para este día.
              </div>
            </div>
          </article>
        </section>

        <!-- LISTADO -->
        <section v-else class="space-y-4">
          <div>
            <h2 class="text-[26px] font-bold tracking-tight text-slate-900">
              Listado completo
            </h2>
            <p class="mt-1 text-sm text-slate-500">
              Vista compacta para trabajar con muchas reservas sin llenar la pantalla de tarjetas.
            </p>
          </div>

          <article class="overflow-hidden rounded-[28px] border border-[#E8E1F1] bg-white shadow-sm">
            <div v-if="filteredReservations.length" class="divide-y divide-[#F1EBF7]">
              <div
                v-for="reservation in filteredReservations"
                :key="reservation.id"
                class="transition"
              >
                <button
                  type="button"
                  @click="toggleReservationExpansion(reservation.id)"
                  class="w-full px-5 py-4 text-left hover:bg-[#FCFBFE] sm:px-6"
                >
                  <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div class="flex min-w-0 items-start gap-4">
                      <div
                        class="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#EAE9EF] to-[#D7CBE7] text-base font-bold text-[#6B5B90]"
                      >
                        <img
                          v-if="reservation.pet_image"
                          :src="reservation.pet_image"
                          :alt="reservation.pet_name"
                          class="h-full w-full object-cover"
                        />
                        <span v-else>{{ reservation.pet_name.charAt(0) }}</span>
                      </div>

                      <div class="min-w-0">
                        <div class="flex flex-wrap items-center gap-2">
                          <p class="text-sm font-bold text-slate-900">
                            {{ reservation.pet_name }}
                          </p>

                          <span
                            class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                            :class="statusBadgeClass(reservation.status)"
                          >
                            {{ reservationStatusLabel(reservation.status) }}
                          </span>
                        </div>

                        <p class="mt-1 text-sm font-semibold text-[#6B2FA4]">
                          {{ reservation.service_name }}
                        </p>

                        <p class="mt-1 text-sm text-slate-500">
                          {{ reservation.client_name }}
                        </p>
                      </div>
                    </div>

                    <div class="grid gap-3 sm:grid-cols-3 lg:min-w-[560px]">
                      <div>
                        <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Fecha
                        </p>
                        <p class="mt-1 text-sm font-semibold text-slate-900">
                          {{ formatCompactDate(reservation.start_at) }}
                        </p>
                      </div>

                      <div>
                        <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Evento
                        </p>
                        <p class="mt-1 text-sm font-semibold text-slate-900">
                          {{ reservationShortEventLabelForDate(reservation, formatDateKey(new Date(reservation.start_at))) }}
                        </p>
                      </div>

                      <div class="flex items-center justify-between gap-3">
                        <div class="min-w-0">
                          <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Recurso
                          </p>
                          <p class="mt-1 truncate text-sm font-semibold text-slate-900">
                            {{ reservation.resource_name || resourceNeededLabel(reservation) }}
                          </p>
                        </div>

                        <span class="text-lg font-bold text-[#7B61A8]">
                          {{ expandedReservationId === reservation.id ? '−' : '+' }}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>

                <div
                  v-if="expandedReservationId === reservation.id"
                  class="border-t border-[#F5EFFA] bg-[#FCFBFE] px-5 pb-5 pt-4 sm:px-6"
                >
                  <div class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
                    <div class="grid gap-4 md:grid-cols-2">
                      <div class="rounded-[24px] border border-[#E8E1F1] bg-white p-4">
                        <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Inicio</p>
                        <p class="mt-2 text-sm font-semibold text-slate-900">
                          {{ formatCompactDate(reservation.start_at) }}
                        </p>
                        <p class="mt-1 text-sm text-slate-500">
                          {{ formatTime(reservation.start_at) }}
                        </p>
                      </div>

                      <div class="rounded-[24px] border border-[#E8E1F1] bg-white p-4">
                        <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Fin</p>
                        <p class="mt-2 text-sm font-semibold text-slate-900">
                          {{ formatCompactDate(reservation.end_at) }}
                        </p>
                        <p class="mt-1 text-sm text-slate-500">
                          {{ formatTime(reservation.end_at) }}
                        </p>
                      </div>

                      <div class="rounded-[24px] border border-[#E8E1F1] bg-white p-4 md:col-span-2">
                        <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Observaciones</p>
                        <p class="mt-2 text-sm leading-7 text-slate-600">
                          {{ reservation.notes || 'Sin observaciones adicionales registradas.' }}
                        </p>
                      </div>
                    </div>

                    <div class="rounded-[24px] border border-[#E8E1F1] bg-white p-4">
                      <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Acciones</p>

                      <div class="mt-4 flex flex-col gap-3">
                        <RouterLink
                          :to="buildReservationDetailLink(reservation)"
                          class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                        >
                          Ver reserva
                        </RouterLink>

                        <button
                          v-if="reservation.status === 'pending'"
                          type="button"
                          @click="openReviewModal(reservation)"
                          class="inline-flex h-11 items-center justify-center rounded-2xl bg-[#6627A3] px-4 text-sm font-semibold text-white transition hover:bg-[#57208D]"
                        >
                          Revisar y confirmar
                        </button>

                        <button
                          v-else-if="reservation.status !== 'cancelled'"
                          type="button"
                          @click="openEditModal(reservation)"
                          class="inline-flex h-11 items-center justify-center rounded-2xl bg-[#6627A3] px-4 text-sm font-semibold text-white transition hover:bg-[#57208D]"
                        >
                          Editar reserva
                        </button>

                        <button
                          v-if="showSecondaryEdit(reservation)"
                          type="button"
                          @click="openEditModal(reservation)"
                          class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                        >
                          Editar
                        </button>

                        <button
                          v-if="canCancelReservation(reservation)"
                          type="button"
                          @click="openCancelModal(reservation)"
                          class="inline-flex h-11 items-center justify-center rounded-2xl border border-red-200 bg-white px-4 text-sm font-semibold text-red-700 transition hover:bg-red-50"
                        >
                          Cancelar reserva
                        </button>

                        <RouterLink
                          :to="{ name: 'staff-pet-detail', params: { id: reservation.pet_id } }"
                          class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                        >
                          Ver ficha
                        </RouterLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-else
              class="px-6 py-12 text-center"
            >
              <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5EFFB] text-xl font-bold text-[#5A208E]">
                📅
              </div>

              <h3 class="mt-4 text-lg font-bold text-slate-900">
                No hay reservas con estos filtros
              </h3>

              <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Prueba con otra búsqueda o limpia filtros para volver a ver toda la operativa.
              </p>
            </div>
          </article>
        </section>
      </template>
    </div>

    <!-- Modal crear / editar / revisar -->
    <div
      v-if="isReservationModalOpen"
      class="fixed inset-0 z-50 overflow-y-auto bg-[#2C1C43]/45 px-4 py-6 backdrop-blur-[2px]"
    >
      <div class="flex min-h-full items-start justify-center">
        <div
          class="w-full max-w-3xl overflow-hidden rounded-[28px] border border-[#E8E1F1] bg-white shadow-xl"
        >
          <div class="border-b border-[#F1EBF7] px-5 py-5 sm:px-6">
            <p class="text-xs font-semibold uppercase tracking-wide text-[#6E4FA2]">
              {{ modalEyebrow }}
            </p>

            <h2 class="mt-1 text-xl font-bold tracking-tight text-slate-900">
              {{ modalTitle }}
            </h2>

            <p class="mt-3 text-sm leading-6 text-slate-500">
              {{ modalDescription }}
            </p>
          </div>

          <div class="max-h-[calc(100vh-11rem)] overflow-y-auto px-5 py-5 sm:px-6">
            <div class="space-y-5">
              <div
                v-if="modalNeedsResource"
                class="rounded-[24px] border border-[#E8E1F1] bg-[#FCFBFE] p-4"
              >
                <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 class="text-sm font-semibold text-slate-900">Recurso del centro</h3>
                    <p class="mt-1 text-sm leading-6 text-slate-500">
                      {{ resourceHelperText }}
                    </p>
                  </div>

                  <span class="self-start rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]">
                    {{ modalCompatibleResources.length }} compatibles
                  </span>
                </div>

                <div class="mt-4">
                  <label class="mb-2 block text-sm font-medium text-slate-700">
                    Asignar recurso
                  </label>

                  <select
                    v-model="selectedResourceId"
                    class="h-11 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
                  >
                    <option value="">Selecciona un recurso</option>
                    <option
                      v-for="resource in modalCompatibleResources"
                      :key="resource.id"
                      :value="String(resource.id)"
                    >
                      {{ resourceOptionLabel(resource) }}
                    </option>
                  </select>

                  <p v-if="resourceSelectionError" class="mt-2 text-xs font-medium text-red-600">
                    {{ resourceSelectionError }}
                  </p>
                </div>

                <div
                  v-if="!modalCompatibleResources.length"
                  class="mt-4 rounded-2xl border border-dashed border-[#E8E1F1] bg-white px-4 py-4 text-sm text-slate-500"
                >
                  No hay recursos activos y compatibles para esta mascota en esas fechas.
                </div>
              </div>

              <ReservationForm
                :mode="reservationModalMode === 'review' ? 'edit' : reservationModalMode"
                :pets="pets"
                :services="services"
                :initial-data="reservationFormInitialData"
                :external-errors="reservationFormErrors"
                :is-submitting="isSubmitting"
                :lock-pet-and-service="false"
                :submit-text="modalSubmitText"
                :submitting-text="'Guardando...'"
                :cancel-text="'Cancelar'"
                :show-cancel="true"
                reminder-title="Antes de guardar"
                reminder-text="Comprueba fechas, horario, observaciones y recurso si el servicio lo necesita."
                @change="handleReservationDraftChange"
                @submit="handleReservationSubmit"
                @cancel="closeReservationModal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal cancelar -->
    <div
      v-if="reservationToCancel"
      class="fixed inset-0 z-50 overflow-y-auto bg-[#2C1C43]/45 px-4 py-6 backdrop-blur-[2px]"
    >
      <div class="flex min-h-full items-start justify-center">
        <div class="w-full max-w-lg rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-xl sm:p-6">
          <p class="text-xs font-semibold uppercase tracking-wide text-red-600">
            Cancelar reserva
          </p>

          <h2 class="mt-1 text-xl font-bold tracking-tight text-slate-900">
            ¿Quieres cancelar esta reserva?
          </h2>

          <p class="mt-3 text-sm leading-6 text-slate-500">
            {{ reservationToCancel.service_name }} para {{ reservationToCancel.pet_name }}.
            Esta acción dejará la reserva como cancelada dentro de la operativa del centro.
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
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import ReservationForm from '@/components/reservations/ReservationForm.vue'
import { petsMock } from '@/mocks/petsMock'
import { reservationsMock } from '@/mocks/reservationsMock'
import { servicesMock } from '@/mocks/servicesMock'
import { resourcesMock } from '@/mocks/resourcesMock'
import { uiMessages } from '@/utils/uiMessages'

const route = useRoute()
const router = useRouter()

const staffReservationsMessages = uiMessages.staffReservations || {
  success: {
    created: 'Nueva reserva guardada. Ya queda reflejada en el panel del centro.',
    updated: 'La reserva se ha actualizado correctamente.',
    confirmed: 'Reserva confirmada y lista para el centro.',
    cancelled: 'La reserva se ha cancelado correctamente.',
  },
  errors: {
    load: 'No hemos podido cargar las reservas del centro por ahora.',
    save: 'No se pudo guardar la reserva.',
    confirm: 'No se pudo confirmar la reserva.',
    cancel: 'No se pudo cancelar la reserva.',
    resourceRequired: 'Este servicio necesita un recurso compatible antes de confirmarse.',
    resourceUnavailable: 'Ese recurso ya no está disponible para esas fechas.',
  },
}

const mockClientsByUserId = {
  1: 'Ana Tutor',
  2: 'Laura Gómez',
  3: 'Marcos Peña',
  4: 'Sara León',
  5: 'Iván Díaz',
}

const viewTabs = [
  { key: 'day', label: 'Día' },
  { key: 'week', label: 'Semana' },
  { key: 'month', label: 'Mes' },
  { key: 'list', label: 'Listado' },
]

const monthWeekdays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

const isLoading = ref(true)
const isSubmitting = ref(false)

const loadError = ref('')
const actionError = ref('')
const successMessage = ref('')

const currentView = ref('day')
const quickFilter = ref('all')

const searchTerm = ref('')
const statusFilter = ref('all')
const serviceFilter = ref('all')
const sortOrder = ref('closest')
const petFilterId = ref(null)

const currentReferenceDate = ref(new Date())
const selectedDateKey = ref(formatDateKey(new Date()))

const reservations = ref([])
const pets = ref([])
const services = ref([])
const resources = ref([])

const isReservationModalOpen = ref(false)
const reservationModalMode = ref('create') // create | edit | review
const editingReservation = ref(null)
const reservationToCancel = ref(null)
const expandedReservationId = ref(null)

const reservationFormErrors = ref({})
const reservationDraft = ref({})
const selectedResourceId = ref('')
const resourceSelectionError = ref('')

onMounted(async () => {
  await loadStaffReservationsView()
  applyRouteFilters()
})

async function loadStaffReservationsView() {
  isLoading.value = true
  loadError.value = ''
  actionError.value = ''
  successMessage.value = ''

  try {
    await wait()

    pets.value = petsMock.map((item) => ({ ...item }))
    services.value = servicesMock.filter((item) => item.is_active !== false).map((item) => ({ ...item }))
    resources.value = resourcesMock.map((item) => ({ ...item }))
    reservations.value = reservationsMock.map((item) => ({ ...item }))
  } catch (error) {
    console.error(error)
    loadError.value =
      staffReservationsMessages.errors?.load ||
      'No hemos podido cargar las reservas del centro por ahora.'
  } finally {
    isLoading.value = false
  }
}

const allReservations = computed(() => {
  return reservations.value.map((reservation) => {
    const pet = pets.value.find((item) => Number(item.id) === Number(reservation.pet_id)) || null
    const service = services.value.find((item) => Number(item.id) === Number(reservation.service_id)) || null
    const resource = resources.value.find((item) => Number(item.id) === Number(reservation.resource_id)) || null

    return {
      ...reservation,
      pet,
      service,
      resource,
      pet_name: pet?.name || reservation.pet_name || 'Mascota',
      pet_breed: pet?.breed || '',
      pet_size: pet?.size || '',
      pet_image: pet?.photo_path || reservation.pet_image || '',
      client_name: mockClientsByUserId[reservation.client_user_id] || `Cliente ${reservation.client_user_id ?? ''}`,
      service_name: reservation.service_name || service?.name || 'Servicio',
      resource_name: reservation.resource_name || resource?.name || '',
    }
  })
})

const actualTodayKey = computed(() => formatDateKey(new Date()))
const activeDayKey = computed(() => formatDateKey(currentReferenceDate.value))
const isShowingActualToday = computed(() => activeDayKey.value === actualTodayKey.value)

const filteredReservations = computed(() => {
  let items = [...allReservations.value]

  if (quickFilter.value === 'today') {
    items = items.filter((reservation) => reservationTouchesDate(reservation, actualTodayKey.value))
  }

  if (quickFilter.value === 'pending') {
    items = items.filter((reservation) => reservation.status === 'pending')
  }

  if (quickFilter.value === 'needs_resource') {
    items = items.filter((reservation) => reservationNeedsResource(reservation) && !reservation.resource_id)
  }

  if (petFilterId.value) {
    items = items.filter((reservation) => Number(reservation.pet_id) === Number(petFilterId.value))
  }

  const query = searchTerm.value.trim().toLowerCase()
  if (query) {
    items = items.filter((reservation) => {
      return (
        reservation.pet_name?.toLowerCase().includes(query) ||
        reservation.client_name?.toLowerCase().includes(query) ||
        reservation.service_name?.toLowerCase().includes(query)
      )
    })
  }

  if (statusFilter.value !== 'all') {
    if (statusFilter.value === 'today') {
      items = items.filter((reservation) => reservationTouchesDate(reservation, actualTodayKey.value))
    } else {
      items = items.filter((reservation) => reservation.status === statusFilter.value)
    }
  }

  if (serviceFilter.value !== 'all') {
    items = items.filter((reservation) => String(reservation.service_id) === String(serviceFilter.value))
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

const dayReservations = computed(() => reservationsForDateKey(activeDayKey.value))

const pendingReservations = computed(() => {
  return filteredReservations.value.filter((reservation) => reservation.status === 'pending')
})

const reservationsNeedingResource = computed(() => {
  return filteredReservations.value.filter((reservation) => {
    return reservationNeedsResource(reservation) && !reservation.resource_id && reservation.status !== 'cancelled'
  })
})

const operationalPendingItems = computed(() => {
  const items = []

  dayReservations.value.forEach((reservation) => {
    if (reservation.status === 'pending') {
      items.push({
        type: 'confirm',
        priority: 1,
        label: 'Sin confirmar',
        description: 'Necesita revisión antes de quedar confirmada en la agenda del centro.',
        reservation,
      })
    }

    if (reservationNeedsResource(reservation) && !reservation.resource_id && reservation.status !== 'cancelled') {
      items.push({
        type: 'resource',
        priority: 2,
        label: 'Sin recurso',
        description: `Falta asignar ${resourceZoneHint(reservation) || 'un recurso compatible'} para esta reserva.`,
        reservation,
      })
    }

    if (reservationAllowsFollowUp(reservation) && !hasDailyReportForDate(reservation, activeDayKey.value)) {
      items.push({
        type: 'followup',
        priority: 3,
        label: 'Sin seguimiento',
        description: 'La reserva está activa en este día y todavía no tiene informe diario.',
        reservation,
      })
    }
  })

  return items.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority
    return new Date(a.reservation.start_at).getTime() - new Date(b.reservation.start_at).getTime()
  })
})

const visibleOperationalPendingItems = computed(() => operationalPendingItems.value.slice(0, 6))
const hiddenOperationalPendingCount = computed(() => Math.max(0, operationalPendingItems.value.length - visibleOperationalPendingItems.value.length))

const summaryCards = computed(() => [
  {
    key: 'all',
    label: 'Todas',
    value: allReservations.value.length,
    help: 'Listado completo de la operativa del centro.',
    icon: '01',
    iconClass: 'bg-[#F3ECFB] text-[#5A208E]',
  },
  {
    key: 'today',
    label: 'Hoy',
    value: allReservations.value.filter((reservation) => reservationTouchesDate(reservation, actualTodayKey.value)).length,
    help: 'Entradas y estancias previstas para la jornada real de hoy.',
    icon: '02',
    iconClass: 'bg-sky-50 text-sky-700',
  },
  {
    key: 'pending',
    label: 'Pendientes',
    value: pendingReservations.value.length,
    help: 'Reservas que necesitan revisión o confirmación.',
    icon: '03',
    iconClass: 'bg-amber-50 text-amber-700',
  },
  {
    key: 'needs_resource',
    label: 'Sin recurso',
    value: reservationsNeedingResource.value.length,
    help: 'Reservas que requieren recurso y aún no lo tienen asignado.',
    icon: '04',
    iconClass: 'bg-[#FCE8F4] text-[#A22068]',
  },
])

const quickFilterLabel = computed(() => {
  const labels = {
    all: 'Listado completo',
    today: 'Hoy',
    pending: 'Pendientes',
    needs_resource: 'Sin recurso',
  }

  return labels[quickFilter.value] || 'Vista'
})

const petFilterName = computed(() => {
  if (!petFilterId.value) return ''
  return pets.value.find((item) => Number(item.id) === Number(petFilterId.value))?.name || `#${petFilterId.value}`
})

const currentViewLabel = computed(() => {
  const labels = {
    day: 'Vista diaria',
    week: 'Vista semanal',
    month: 'Vista mensual',
    list: 'Vista listada',
  }

  return labels[currentView.value] || 'Vista'
})

const hasActiveFilters = computed(() => {
  return (
    quickFilter.value !== 'all' ||
    Boolean(petFilterId.value) ||
    searchTerm.value.trim() !== '' ||
    statusFilter.value !== 'all' ||
    serviceFilter.value !== 'all' ||
    sortOrder.value !== 'closest'
  )
})

const weekStart = computed(() => startOfWeek(currentReferenceDate.value))

const weekDays = computed(() => {
  return Array.from({ length: 7 }, (_, index) => {
    const date = addDays(weekStart.value, index)
    const key = formatDateKey(date)

    return {
      date,
      key,
      weekday: formatDate(date, { weekday: 'short' }),
      dayNumber: date.getDate(),
      isToday: key === actualTodayKey.value,
    }
  })
})

const monthCells = computed(() => {
  const firstDay = new Date(currentReferenceDate.value.getFullYear(), currentReferenceDate.value.getMonth(), 1)
  const gridStart = startOfWeek(firstDay)

  return Array.from({ length: 42 }, (_, index) => {
    const date = addDays(gridStart, index)
    const key = formatDateKey(date)

    return {
      date,
      key,
      dayNumber: date.getDate(),
      isToday: key === actualTodayKey.value,
      inCurrentMonth: date.getMonth() === currentReferenceDate.value.getMonth(),
      reservations: reservationsForDateKey(key),
    }
  })
})

const selectedDateReservations = computed(() => {
  return reservationsForDateKey(selectedDateKey.value)
})

const selectedDateTitle = computed(() => {
  return formatDate(parseDateKey(selectedDateKey.value), {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
})

const periodTitle = computed(() => {
  if (currentView.value === 'day') {
    return `${isShowingActualToday.value ? 'Hoy' : 'Día'} · ${formatDate(currentReferenceDate.value, { day: '2-digit', month: 'long', year: 'numeric' })}`
  }

  if (currentView.value === 'week') {
    const first = weekDays.value[0]?.date
    const last = weekDays.value[6]?.date

    return `Semana · ${formatDate(first, { day: '2-digit', month: 'short' })} - ${formatDate(last, { day: '2-digit', month: 'short' })}`
  }

  if (currentView.value === 'month') {
    return formatDate(currentReferenceDate.value, { month: 'long', year: 'numeric' })
  }

  return 'Listado completo'
})

const periodDescription = computed(() => {
  if (currentView.value === 'day') {
    return 'Agenda compacta del día con accesos rápidos a las entradas y revisiones.'
  }

  if (currentView.value === 'week') {
    return 'Pulsa cualquier día de la semana para abrir sus reservas.'
  }

  if (currentView.value === 'month') {
    return 'Pulsa cualquier día del mes para ver su detalle operativo.'
  }

  return 'Vista compacta para gestionar muchas reservas sin saturar la pantalla.'
})

const dayAgendaItems = computed(() => {
  return dayReservations.value
    .map((reservation) => {
      const eventType = reservationEventTypeForDate(reservation, activeDayKey.value)
      return {
        reservation,
        eventType,
        hour: agendaHourForDate(reservation, activeDayKey.value),
      }
    })
    .sort((a, b) => a.hour - b.hour || new Date(a.reservation.start_at).getTime() - new Date(b.reservation.start_at).getTime())
})

const dayAgendaHours = computed(() => {
  return [...new Set(dayAgendaItems.value.map((item) => item.hour))].sort((a, b) => a - b)
})

const reservationFormInitialData = computed(() => {
  if (!editingReservation.value || reservationModalMode.value === 'create') {
    return {
      pet_id: '',
      service_id: '',
      booking_mode: '',
      date: '',
      start_date: '',
      end_date: '',
      start_time: '',
      end_time: '',
      notes: '',
    }
  }

  const reservation = editingReservation.value
  const service = getServiceById(reservation.service_id)
  const sameDay = isSameDayReservation(reservation)

  return {
    pet_id: reservation.pet_id,
    service_id: reservation.service_id,
    pet_name: reservation.pet_name,
    service_name: reservation.service_name,
    booking_mode: service?.booking_mode || inferBookingMode(reservation),
    date: sameDay ? formatDateInput(reservation.start_at) : '',
    start_date: sameDay ? '' : formatDateInput(reservation.start_at),
    end_date: sameDay ? '' : formatDateInput(reservation.end_at),
    start_time: formatTimeInput(reservation.start_at),
    end_time: formatTimeInput(reservation.end_at),
    notes: reservation.notes || '',
  }
})

const modalService = computed(() => {
  return getServiceById(reservationDraft.value?.service_id || editingReservation.value?.service_id)
})

const modalPet = computed(() => {
  return getPetById(reservationDraft.value?.pet_id || editingReservation.value?.pet_id)
})

const modalRange = computed(() => {
  return getDraftDateRange(reservationDraft.value, modalService.value)
})

const modalNeedsResource = computed(() => {
  if (!modalService.value) return false
  return serviceNeedsResource(modalService.value)
})

const modalCompatibleResources = computed(() => {
  if (!modalNeedsResource.value || !modalPet.value) return []

  const targetZone = serviceResourceZone(modalService.value)
  const targetSizeGroup = petSizeGroup(modalPet.value?.size)
  const ignoreReservationId = editingReservation.value?.id ?? null

  return resources.value.filter((resource) => {
    const zoneMatches = resource.zone === targetZone || resource.zone === 'support'
    const sizeMatches = resource.size_group === 'all' || resource.size_group === targetSizeGroup
    const statusMatches =
      resource.status === 'active' ||
      Number(resource.id) === Number(editingReservation.value?.resource_id)

    if (!zoneMatches || !sizeMatches || !statusMatches) return false
    if (!modalRange.value.start_at || !modalRange.value.end_at) return true

    return !isResourceOccupied(resource.id, modalRange.value.start_at, modalRange.value.end_at, ignoreReservationId)
  })
})

const modalEyebrow = computed(() => {
  if (reservationModalMode.value === 'create') return 'Nueva reserva'
  if (reservationModalMode.value === 'review') return 'Revisar reserva'
  return 'Editar reserva'
})

const modalTitle = computed(() => {
  if (reservationModalMode.value === 'create') {
    return 'Registrar reserva del centro'
  }

  const serviceName = editingReservation.value?.service_name || 'Reserva'
  const petName = editingReservation.value?.pet_name || ''
  return `${serviceName} · ${petName}`
})

const modalDescription = computed(() => {
  if (reservationModalMode.value === 'create') {
    return 'Crea una nueva reserva interna y déjala preparada para la operativa del centro.'
  }

  if (reservationModalMode.value === 'review') {
    return 'Ajusta la reserva, asigna un recurso compatible si hace falta y confírmala.'
  }

  return 'Actualiza fecha, horario, observaciones o recurso asignado.'
})

const modalSubmitText = computed(() => {
  if (reservationModalMode.value === 'create') return 'Guardar reserva'
  if (reservationModalMode.value === 'review') return 'Confirmar reserva'
  return 'Guardar cambios'
})

const resourceHelperText = computed(() => {
  if (!modalService.value || !modalPet.value) {
    return 'Selecciona mascota y servicio para ver los recursos compatibles.'
  }

  const zoneLabel = serviceResourceZone(modalService.value) === 'hotel' ? 'hotel' : 'guardería'
  return `Mostramos recursos activos compatibles con ${modalPet.value.name} y con la zona de ${zoneLabel}.`
})


watch(
  () => route.query,
  () => {
    applyRouteFilters()
  },
)

watch(
  () => modalCompatibleResources.value,
  (resourcesList) => {
    if (!resourcesList.length) {
      selectedResourceId.value = ''
      return
    }

    if (
      selectedResourceId.value &&
      resourcesList.some((resource) => String(resource.id) === String(selectedResourceId.value))
    ) {
      return
    }

    const currentAssigned = editingReservation.value?.resource_id
    if (
      currentAssigned &&
      resourcesList.some((resource) => Number(resource.id) === Number(currentAssigned))
    ) {
      selectedResourceId.value = String(currentAssigned)
      return
    }

    selectedResourceId.value = ''
  },
  { immediate: true },
)

function wait(ms = 160) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function setView(view) {
  currentView.value = view

  if (view === 'day') {
    selectedDateKey.value = formatDateKey(currentReferenceDate.value)
  }

  if (view === 'week') {
    selectedDateKey.value = formatDateKey(currentReferenceDate.value)
  }

  if (view === 'month') {
    selectedDateKey.value = formatDateKey(currentReferenceDate.value)
  }
}

function goToToday() {
  const today = new Date()
  currentReferenceDate.value = today
  selectedDateKey.value = formatDateKey(today)
  if (currentView.value === 'list') {
    currentView.value = 'day'
  }
}

function movePeriod(direction) {
  const base = new Date(currentReferenceDate.value)

  if (currentView.value === 'month') {
    base.setMonth(base.getMonth() + direction)
    currentReferenceDate.value = base
    selectedDateKey.value = formatDateKey(new Date(base.getFullYear(), base.getMonth(), 1))
    return
  }

  if (currentView.value === 'week') {
    base.setDate(base.getDate() + direction * 7)
    currentReferenceDate.value = base
    selectedDateKey.value = formatDateKey(base)
    return
  }

  if (currentView.value === 'day') {
    base.setDate(base.getDate() + direction)
    currentReferenceDate.value = base
    selectedDateKey.value = formatDateKey(base)
  }
}


function applyRouteFilters() {
  const queryPet = Number(route.query.pet || 0)

  if (!queryPet) {
    petFilterId.value = null
    return
  }

  petFilterId.value = queryPet
  currentView.value = 'list'
  quickFilter.value = 'all'
  sortOrder.value = 'closest'
}

function selectDate(dateKey) {
  selectedDateKey.value = dateKey
}

function toggleReservationExpansion(id) {
  expandedReservationId.value = expandedReservationId.value === id ? null : id
}

function clearFilters() {
  quickFilter.value = 'all'
  petFilterId.value = null
  searchTerm.value = ''
  statusFilter.value = 'all'
  serviceFilter.value = 'all'
  sortOrder.value = 'closest'

  if (route.query.pet) {
    router.replace({ name: 'staff-reservations' })
  }
}

function handleReservationDraftChange(draft) {
  reservationDraft.value = { ...draft }
  resourceSelectionError.value = ''
}

function getPetById(id) {
  return pets.value.find((item) => Number(item.id) === Number(id)) || null
}

function getServiceById(id) {
  return services.value.find((item) => Number(item.id) === Number(id)) || null
}

function getResourceById(id) {
  return resources.value.find((item) => Number(item.id) === Number(id)) || null
}

function addDays(date, amount) {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return next
}

function startOfWeek(date) {
  const base = new Date(date)
  const day = base.getDay()
  const diff = day === 0 ? -6 : 1 - day
  base.setHours(0, 0, 0, 0)
  base.setDate(base.getDate() + diff)
  return base
}

function formatDateKey(date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

function parseDateKey(key) {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day, 0, 0, 0, 0)
}

function formatDate(dateValue, options = {}) {
  return new Intl.DateTimeFormat('es-ES', options).format(new Date(dateValue))
}

function formatCompactDate(dateString) {
  return formatDate(dateString, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatTime(dateString) {
  return formatDate(dateString, {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatDateInput(dateString) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatTimeInput(dateString) {
  const date = new Date(dateString)
  const hours = `${date.getHours()}`.padStart(2, '0')
  const minutes = `${date.getMinutes()}`.padStart(2, '0')
  return `${hours}:${minutes}`
}

function formatHour(hour) {
  return `${String(hour).padStart(2, '0')}:00`
}

function reservationTouchesDate(reservation, dateKey) {
  const dayStart = parseDateKey(dateKey)
  const dayEnd = new Date(dayStart)
  dayEnd.setHours(23, 59, 59, 999)

  const start = new Date(reservation.start_at)
  const end = new Date(reservation.end_at)

  return start <= dayEnd && end >= dayStart
}

function reservationsForDateKey(dateKey) {
  return filteredReservations.value
    .filter((reservation) => reservationTouchesDate(reservation, dateKey))
    .sort((a, b) => agendaHourForDate(a, dateKey) - agendaHourForDate(b, dateKey))
}

function reservationEventTypeForDate(reservation, dateKey) {
  const startKey = formatDateKey(new Date(reservation.start_at))
  const endKey = formatDateKey(new Date(reservation.end_at))

  if (isSameDayReservation(reservation)) return 'reservation'
  if (dateKey === startKey) return 'entry'
  if (dateKey === endKey) return 'exit'
  return 'stay'
}

function agendaHourForDate(reservation, dateKey) {
  const eventType = reservationEventTypeForDate(reservation, dateKey)

  if (eventType === 'reservation') return new Date(reservation.start_at).getHours()
  if (eventType === 'entry') return new Date(reservation.start_at).getHours()
  if (eventType === 'exit') return new Date(reservation.end_at).getHours()
  return 9
}

function dayAgendaItemsForHour(hour) {
  return dayAgendaItems.value.filter((item) => item.hour === hour)
}

function agendaEventLabel(eventType) {
  const labels = {
    reservation: 'Reserva',
    entry: 'Entrada',
    exit: 'Salida',
    stay: 'En estancia',
  }

  return labels[eventType] || 'Reserva'
}

function agendaEventClass(eventType) {
  const classes = {
    reservation: 'bg-[#F3ECFB] text-[#6E4FA2]',
    entry: 'bg-sky-50 text-sky-700',
    exit: 'bg-amber-50 text-amber-700',
    stay: 'bg-emerald-50 text-emerald-700',
  }

  return classes[eventType] || 'bg-slate-100 text-slate-600'
}

function reservationShortEventLabelForDate(reservation, dateKey) {
  const eventType = reservationEventTypeForDate(reservation, dateKey)

  if (eventType === 'reservation') {
    return `${formatTime(reservation.start_at)} - ${formatTime(reservation.end_at)}`
  }

  if (eventType === 'entry') {
    return `Entrada · ${formatTime(reservation.start_at)}`
  }

  if (eventType === 'exit') {
    return `Salida · ${formatTime(reservation.end_at)}`
  }

  return 'En estancia'
}

function isSameDayReservation(reservation) {
  const start = new Date(reservation.start_at)
  const end = new Date(reservation.end_at)

  return (
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate()
  )
}

function inferBookingMode(reservation) {
  return isSameDayReservation(reservation) ? 'single_day' : 'date_range'
}

function reservationDateLabel(reservation) {
  return isSameDayReservation(reservation) ? 'Fecha' : 'Inicio'
}

function primaryDateValue(reservation) {
  return formatCompactDate(reservation.start_at)
}

function startSecondaryValue(reservation) {
  if (!isSameDayReservation(reservation)) {
    return formatTime(reservation.start_at)
  }
  return ''
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

function statusBadgeClass(status) {
  const classes = {
    pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
    confirmed: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
    cancelled: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
    completed: 'bg-sky-50 text-sky-700 ring-1 ring-sky-100',
  }

  return classes[status] || 'bg-[#F3ECFB] text-[#6E4FA2] ring-1 ring-[#EADDF7]'
}

function petSizeGroup(size) {
  if (size === 'toy' || size === 'small') return 'toy_small'
  if (size === 'medium') return 'medium'
  if (size === 'large') return 'large'
  return 'all'
}

function serviceResourceZone(service) {
  if (!service) return null
  if (service.booking_mode === 'date_range') return 'hotel'
  if (service.booking_mode === 'single_day') return 'daycare'
  return null
}

function serviceNeedsResource(service) {
  return Boolean(serviceResourceZone(service))
}

function reservationNeedsResource(reservation) {
  const service = getServiceById(reservation.service_id)
  return serviceNeedsResource(service)
}

function resourceNeededLabel(reservation) {
  return reservationNeedsResource(reservation)
    ? 'Pendiente de asignación'
    : 'No necesita recurso'
}

function resourceZoneHint(reservation) {
  const service = getServiceById(reservation.service_id)
  const zone = serviceResourceZone(service)

  if (zone === 'hotel') return 'jaula o sala compatible'
  if (zone === 'daycare') return 'patio o sala compatible'
  return ''
}

function reservationAllowsFollowUp(reservation) {
  if (!reservation || reservation.status !== 'confirmed') return false

  const service = getServiceById(reservation.service_id)
  const zone = serviceResourceZone(service)

  return zone === 'hotel' || zone === 'daycare'
}

function hasDailyReportForDate(reservation, dateKey) {
  return (reservation.daily_reports || []).some(
    (report) => normalizeDateKey(report.report_date) === dateKey,
  )
}

function normalizeDateKey(value) {
  if (!value) return ''
  return String(value).slice(0, 10)
}

function pendingTypeBadgeClass(type) {
  const classes = {
    confirm: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
    resource: 'bg-[#FFF0F8] text-[#A22068] ring-1 ring-[#F7CBE1]',
    followup: 'bg-sky-50 text-sky-700 ring-1 ring-sky-100',
  }

  return classes[type] || 'bg-[#F3ECFB] text-[#6E4FA2] ring-1 ring-[#EADDF7]'
}

function buildReservationDetailLink(reservation) {
  return {
    name: 'staff-reservation-detail',
    params: {
      id: reservation.id,
    },
  }
}

function buildFollowUpLink(reservation, dateKey = activeDayKey.value) {
  return {
    name: 'staff-followups',
    query: {
      reservation: reservation.id,
      date: dateKey,
    },
  }
}

function openResourceModal(reservation) {
  if (reservation.status === 'pending') {
    openReviewModal(reservation)
    return
  }

  openEditModal(reservation)
}

function getDraftDateRange(draft, service) {
  if (!service) {
    return { start_at: null, end_at: null }
  }

  const bookingMode = draft?.booking_mode || service.booking_mode

  if (bookingMode === 'date_range') {
    if (!draft.start_date || !draft.end_date || !draft.start_time || !draft.end_time) {
      return { start_at: null, end_at: null }
    }

    return {
      start_at: `${draft.start_date}T${draft.start_time}:00`,
      end_at: `${draft.end_date}T${draft.end_time}:00`,
    }
  }

  if (bookingMode === 'single_day') {
    if (!draft.date) return { start_at: null, end_at: null }

    const startTime = service.default_start_time || '09:00'
    const endTime = service.default_end_time || '18:00'

    return {
      start_at: `${draft.date}T${startTime}:00`,
      end_at: `${draft.date}T${endTime}:00`,
    }
  }

  if (bookingMode === 'time_slot') {
    if (!draft.date || !draft.start_time) return { start_at: null, end_at: null }

    const duration = Number(service.duration_minutes || 60)
    const endTime = addMinutesToTime(draft.start_time, duration)

    return {
      start_at: `${draft.date}T${draft.start_time}:00`,
      end_at: `${draft.date}T${endTime}:00`,
    }
  }

  return { start_at: null, end_at: null }
}

function parseTimeToMinutes(value) {
  const [hours, minutes] = value.slice(0, 5).split(':').map(Number)
  return (hours * 60) + minutes
}

function minutesToTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

function addMinutesToTime(time, minutesToAdd) {
  return minutesToTime(parseTimeToMinutes(time) + minutesToAdd)
}

function rangesOverlap(startA, endA, startB, endB) {
  return new Date(startA).getTime() < new Date(endB).getTime() &&
    new Date(endA).getTime() > new Date(startB).getTime()
}

function isResourceOccupied(resourceId, startAt, endAt, ignoreReservationId = null) {
  return allReservations.value.some((reservation) => {
    if (reservation.status === 'cancelled') return false
    if (Number(reservation.resource_id) !== Number(resourceId)) return false
    if (ignoreReservationId && Number(reservation.id) === Number(ignoreReservationId)) return false

    return rangesOverlap(startAt, endAt, reservation.start_at, reservation.end_at)
  })
}

function resourceOptionLabel(resource) {
  const typeLabel = {
    kennel: 'Jaula',
    yard: 'Patio',
    room: 'Sala',
    other: 'Otro',
  }[resource.type] || resource.type

  const sizeLabel = {
    toy_small: 'toy y pequeños',
    medium: 'medianos',
    large: 'grandes',
    all: 'todos los tamaños',
  }[resource.size_group] || resource.size_group

  return `${resource.name} · ${typeLabel} · ${sizeLabel}`
}

function canCancelReservation(reservation) {
  if (reservation.status === 'cancelled') return false
  return new Date(reservation.start_at).getTime() > Date.now()
}

function showSecondaryEdit(reservation) {
  return reservation.status === 'pending'
}

function showBottomActions(reservation) {
  return showSecondaryEdit(reservation) || canCancelReservation(reservation)
}

function bottomActionsGridClass(reservation) {
  return showSecondaryEdit(reservation) && canCancelReservation(reservation)
    ? 'sm:grid-cols-2'
    : 'grid-cols-1'
}

function openCreateModal() {
  reservationModalMode.value = 'create'
  editingReservation.value = null
  reservationFormErrors.value = {}
  reservationDraft.value = {
    pet_id: '',
    service_id: '',
    booking_mode: '',
    date: '',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    notes: '',
  }
  selectedResourceId.value = ''
  resourceSelectionError.value = ''
  actionError.value = ''
  isReservationModalOpen.value = true
}

function buildDraftFromReservation(reservation) {
  return {
    pet_id: reservation.pet_id,
    service_id: reservation.service_id,
    booking_mode: getServiceById(reservation.service_id)?.booking_mode || inferBookingMode(reservation),
    date: isSameDayReservation(reservation) ? formatDateInput(reservation.start_at) : '',
    start_date: isSameDayReservation(reservation) ? '' : formatDateInput(reservation.start_at),
    end_date: isSameDayReservation(reservation) ? '' : formatDateInput(reservation.end_at),
    start_time: formatTimeInput(reservation.start_at),
    end_time: formatTimeInput(reservation.end_at),
    notes: reservation.notes || '',
  }
}

function openEditModal(reservation) {
  reservationModalMode.value = 'edit'
  editingReservation.value = reservation
  reservationFormErrors.value = {}
  reservationDraft.value = buildDraftFromReservation(reservation)
  selectedResourceId.value = reservation.resource_id ? String(reservation.resource_id) : ''
  resourceSelectionError.value = ''
  actionError.value = ''
  isReservationModalOpen.value = true
}

function openReviewModal(reservation) {
  reservationModalMode.value = 'review'
  editingReservation.value = reservation
  reservationFormErrors.value = {}
  reservationDraft.value = buildDraftFromReservation(reservation)
  selectedResourceId.value = reservation.resource_id ? String(reservation.resource_id) : ''
  resourceSelectionError.value = ''
  actionError.value = ''
  isReservationModalOpen.value = true
}

function closeReservationModal() {
  isReservationModalOpen.value = false
  editingReservation.value = null
  reservationFormErrors.value = {}
  reservationDraft.value = {}
  selectedResourceId.value = ''
  resourceSelectionError.value = ''
}

function buildReservationPatch(payload) {
  const resourceId = selectedResourceId.value ? Number(selectedResourceId.value) : null
  const resource = resourceId ? getResourceById(resourceId) : null

  return {
    pet_id: Number(payload.pet_id),
    service_id: Number(payload.service_id),
    start_at: payload.start_at,
    end_at: payload.end_at,
    notes: payload.notes ?? '',
    resource_id: resourceId,
    resource_name: resource?.name || '',
  }
}

async function handleReservationSubmit(payload) {
  isSubmitting.value = true
  actionError.value = ''
  resourceSelectionError.value = ''

  try {
    const service = getServiceById(payload.service_id)
    const pet = getPetById(payload.pet_id)
    const patch = buildReservationPatch(payload)

    if (reservationModalMode.value === 'review' && serviceNeedsResource(service)) {
      if (!patch.resource_id) {
        resourceSelectionError.value =
          staffReservationsMessages.errors?.resourceRequired ||
          'Este servicio necesita un recurso compatible antes de confirmarse.'
        isSubmitting.value = false
        return
      }

      if (
        isResourceOccupied(
          patch.resource_id,
          patch.start_at,
          patch.end_at,
          editingReservation.value?.id || null,
        )
      ) {
        resourceSelectionError.value =
          staffReservationsMessages.errors?.resourceUnavailable ||
          'Ese recurso ya no está disponible para esas fechas.'
        isSubmitting.value = false
        return
      }
    }

    if (
      reservationModalMode.value === 'edit' &&
      patch.resource_id &&
      isResourceOccupied(
        patch.resource_id,
        patch.start_at,
        patch.end_at,
        editingReservation.value?.id || null,
      )
    ) {
      resourceSelectionError.value =
        staffReservationsMessages.errors?.resourceUnavailable ||
        'Ese recurso ya no está disponible para esas fechas.'
      isSubmitting.value = false
      return
    }

    await wait()

    if (reservationModalMode.value === 'create') {
      const now = new Date().toISOString()

      const newReservation = {
        id: Math.max(0, ...reservations.value.map((item) => Number(item.id))) + 1,
        client_user_id: Number(pet?.owner_user_id || 1),
        pet_id: Number(payload.pet_id),
        service_id: Number(payload.service_id),
        resource_id: patch.resource_id,
        service_name: service?.name || 'Servicio',
        start_at: patch.start_at,
        end_at: patch.end_at,
        status: 'pending',
        resource_name: patch.resource_name,
        notes: patch.notes,
        created_at: now,
        updated_at: now,
        daily_reports: [],
      }

      reservations.value.unshift(newReservation)

      successMessage.value =
        staffReservationsMessages.success?.created ||
        'Nueva reserva guardada. Ya queda reflejada en el panel del centro.'
    } else if (editingReservation.value) {
      reservations.value = reservations.value.map((item) => {
        if (Number(item.id) !== Number(editingReservation.value.id)) return item

        return {
          ...item,
          ...patch,
          service_name: service?.name || item.service_name,
          status: reservationModalMode.value === 'review' ? 'confirmed' : item.status,
          updated_at: new Date().toISOString(),
        }
      })

      successMessage.value =
        reservationModalMode.value === 'review'
          ? staffReservationsMessages.success?.confirmed || 'Reserva confirmada y lista para el centro.'
          : staffReservationsMessages.success?.updated || 'La reserva se ha actualizado correctamente.'
    }

    closeReservationModal()
  } catch (error) {
    console.error(error)
    actionError.value =
      reservationModalMode.value === 'review'
        ? staffReservationsMessages.errors?.confirm || 'No se pudo confirmar la reserva.'
        : staffReservationsMessages.errors?.save || 'No se pudo guardar la reserva.'
  } finally {
    isSubmitting.value = false
  }
}

function openCancelModal(reservation) {
  reservationToCancel.value = reservation
  actionError.value = ''
}

async function confirmCancelReservation() {
  if (!reservationToCancel.value) return

  isSubmitting.value = true
  actionError.value = ''

  try {
    await wait()

    reservations.value = reservations.value.map((item) =>
      Number(item.id) === Number(reservationToCancel.value.id)
        ? {
            ...item,
            status: 'cancelled',
            updated_at: new Date().toISOString(),
          }
        : item,
    )

    successMessage.value =
      staffReservationsMessages.success?.cancelled ||
      'La reserva se ha cancelado correctamente.'

    reservationToCancel.value = null
  } catch (error) {
    console.error(error)
    actionError.value =
      staffReservationsMessages.errors?.cancel || 'No se pudo cancelar la reserva.'
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