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
        <ResourceSection
          v-if="visibleHotelResources.length"
          title="Hotel canino"
          description="Jaulas y suites con ocupación actual, salida prevista y próxima entrada."
          count-label="jaulas"
          :resources="visibleHotelResources"
          :is-restoring="isRestoring"
          :updating-resource-id="updatingResourceId"
          :current-occupancy="currentOccupancy"
          :current-daycare-occupancy="currentDaycareOccupancy"
          :next-reservation="nextReservation"
          :resource-status-class="resourceStatusClass"
          :resource-status-label="resourceStatusLabel"
          :size-group-label="sizeGroupLabel"
          :format-date-time="formatDateTime"
          :format-time="formatTime"
          :stay-until-label="stayUntilLabel"
          zone-type="hotel"
          @open="openResourceModal"
          @status="setResourceStatus"
        />

        <!-- GUARDERÍA -->
        <ResourceSection
          v-if="visibleDaycareResources.length"
          title="Guardería"
          description="Patios con aforo actual, perros presentes ahora y próximas entradas."
          count-label="patios"
          :resources="visibleDaycareResources"
          :is-restoring="isRestoring"
          :updating-resource-id="updatingResourceId"
          :current-occupancy="currentOccupancy"
          :current-daycare-occupancy="currentDaycareOccupancy"
          :next-reservation="nextReservation"
          :resource-status-class="resourceStatusClass"
          :resource-status-label="resourceStatusLabel"
          :size-group-label="sizeGroupLabel"
          :format-date-time="formatDateTime"
          :format-time="formatTime"
          :stay-until-label="stayUntilLabel"
          zone-type="daycare"
          @open="openResourceModal"
          @status="setResourceStatus"
        />

        <!-- APOYO -->
        <ResourceSection
          v-if="visibleSupportResources.length"
          title="Salas de apoyo"
          description="Recursos auxiliares del centro para adaptación o apoyo puntual."
          count-label="salas"
          :resources="visibleSupportResources"
          :is-restoring="isRestoring"
          :updating-resource-id="updatingResourceId"
          :current-occupancy="currentOccupancy"
          :current-daycare-occupancy="currentDaycareOccupancy"
          :next-reservation="nextReservation"
          :resource-status-class="resourceStatusClass"
          :resource-status-label="resourceStatusLabel"
          :size-group-label="sizeGroupLabel"
          :format-date-time="formatDateTime"
          :format-time="formatTime"
          :stay-until-label="stayUntilLabel"
          zone-type="support"
          @open="openResourceModal"
          @status="setResourceStatus"
        />

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

    <!-- Modal recurso -->
    <div
      v-if="selectedResource"
      class="fixed inset-0 z-50 overflow-y-auto bg-[#2C1C43]/45 px-4 py-6 backdrop-blur-[2px]"
    >
      <div class="flex min-h-full items-start justify-center">
        <div
          class="w-full max-w-3xl overflow-hidden rounded-[28px] border border-[#E8E1F1] bg-white shadow-xl"
        >
          <div class="border-b border-[#F1EBF7] px-5 py-5 sm:px-6">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-[#6E4FA2]">
                  {{ resourceZoneLabel(selectedResource.zone) }}
                </p>

                <h2 class="mt-1 text-xl font-bold tracking-tight text-slate-900">
                  {{ selectedResource.name }}
                </h2>

                <p class="mt-1 text-sm leading-6 text-slate-500">
                  {{ resourceTypeLabel(selectedResource.type) }} · {{ sizeGroupLabel(selectedResource.size_group) }} · {{ resourceStatusLabel(selectedResource.status) }}
                </p>
              </div>

              <button
                type="button"
                @click="closeResourceModal"
                class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#E8E1F1] bg-white text-slate-500 transition hover:bg-[#FAF7FD]"
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

                  <RouterLink
                    :to="{ name: 'staff-reservation-detail', params: { id: selectedCurrentReservation.id } }"
                    class="mt-4 inline-flex h-10 items-center justify-center rounded-2xl bg-[#6627A3] px-4 text-sm font-semibold text-white transition hover:bg-[#57208D]"
                  >
                    Ver reserva
                  </RouterLink>
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
import { computed, defineComponent, h, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getResources, updateResourceStatus } from '@/services/resourcesService'
import { getStaffReservations } from '@/services/staffReservationsService'
import { getReadableErrorMessage } from '@/utils/errorMessages'
import { uiMessages } from '@/utils/uiMessages'

const ResourceSection = defineComponent({
  name: 'ResourceSection',
  props: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    countLabel: { type: String, required: true },
    resources: { type: Array, default: () => [] },
    isRestoring: { type: Boolean, default: false },
    updatingResourceId: { type: [Number, String, null], default: null },
    currentOccupancy: { type: Function, required: true },
    currentDaycareOccupancy: { type: Function, required: true },
    nextReservation: { type: Function, required: true },
    resourceStatusClass: { type: Function, required: true },
    resourceStatusLabel: { type: Function, required: true },
    sizeGroupLabel: { type: Function, required: true },
    formatDateTime: { type: Function, required: true },
    formatTime: { type: Function, required: true },
    stayUntilLabel: { type: Function, required: true },
    zoneType: { type: String, required: true },
  },
  emits: ['open', 'status'],
  setup(props, { emit }) {
    function statusButton(resource, status, label, activeClasses) {
      const isActive = resource.status === status
      return h(
        'button',
        {
          type: 'button',
          disabled: props.updatingResourceId === resource.id || props.isRestoring,
          onClick: () => emit('status', resource.id, status),
          class: [
            'inline-flex h-11 items-center justify-center rounded-2xl border px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
            isActive
              ? activeClasses
              : 'border-[#D9CEE8] bg-white text-[#514980] hover:bg-[#F6F1FB]',
          ],
        },
        label,
      )
    }

    function resourceCard(resource) {
      const occupancy = props.currentOccupancy(resource)
      const daycareOccupancy = props.currentDaycareOccupancy(resource)
      const next = props.nextReservation(resource)
      const isDaycare = props.zoneType === 'daycare'

      return h(
        'article',
        {
          key: resource.id,
          class:
            'rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md',
        },
        [
          h('div', { class: 'flex h-full flex-col' }, [
            h('div', { class: 'flex items-start justify-between gap-4' }, [
              h('div', { class: 'min-w-0' }, [
                h('h3', { class: 'text-lg font-bold tracking-tight text-slate-900' }, resource.name),
                h('div', { class: 'mt-3 flex flex-wrap gap-2' }, [
                  h(
                    'span',
                    { class: 'inline-flex items-center rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]' },
                    props.sizeGroupLabel(resource.size_group),
                  ),
                  h(
                    'span',
                    { class: ['inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold', props.resourceStatusClass(resource.status)] },
                    props.resourceStatusLabel(resource.status),
                  ),
                ]),
              ]),
              h('div', { class: 'rounded-2xl bg-[#FAF8FC] px-4 py-3 text-right' }, [
                h('p', { class: 'text-xs font-semibold uppercase tracking-wide text-slate-400' }, 'Aforo'),
                h(
                  'p',
                  { class: 'mt-1 text-lg font-bold text-slate-900' },
                  isDaycare ? `${daycareOccupancy.length} / ${resource.capacity}` : resource.capacity,
                ),
              ]),
            ]),

            h(
              'div',
              {
                class: [
                  'mt-4 rounded-[24px] border p-4',
                  occupancy ? 'border-[#D8EAD6] bg-[#F6FCF5]' : 'border-[#EEE7F6] bg-[#FCFBFE]',
                ],
              },
              isDaycare
                ? [
                    h('p', { class: 'text-xs font-semibold uppercase tracking-wide text-slate-400' }, 'Ahora en el patio'),
                    daycareOccupancy.length
                      ? h(
                          'div',
                          { class: 'mt-3 space-y-2' },
                          daycareOccupancy.slice(0, 3).map((reservation) =>
                            h('div', { key: reservation.id, class: 'rounded-2xl border border-[#E9DDF6] bg-white px-3 py-3' }, [
                              h('p', { class: 'text-sm font-bold text-slate-900' }, reservation.pet_name),
                              h('p', { class: 'mt-1 text-sm font-semibold text-[#6B2FA4]' }, reservation.client_name),
                              h('p', { class: 'mt-1 text-xs text-slate-500' }, `Hasta ${props.formatTime(reservation.end_at)}`),
                            ]),
                          ),
                        )
                      : h('p', { class: 'mt-3 text-sm text-slate-500' }, 'No hay perros dentro ahora mismo.'),
                    daycareOccupancy.length > 3
                      ? h('div', { class: 'mt-2 rounded-xl bg-[#F8F4FD] px-3 py-2 text-xs font-semibold text-[#7A59B0]' }, `+${daycareOccupancy.length - 3} más`)
                      : null,
                  ]
                : occupancy
                  ? [
                      h('p', { class: 'text-xs font-semibold uppercase tracking-wide text-slate-400' }, props.zoneType === 'support' ? 'En uso ahora' : 'Ahora dentro'),
                      h('p', { class: 'mt-2 text-base font-bold text-slate-900' }, occupancy.pet_name),
                      h('p', { class: 'mt-1 text-sm font-semibold text-[#6B2FA4]' }, occupancy.service_name),
                      h('p', { class: 'mt-1 text-sm text-slate-500' }, occupancy.client_name),
                      h('div', { class: 'mt-4 grid gap-3 sm:grid-cols-2' }, [
                        h('div', {}, [
                          h('p', { class: 'text-xs font-semibold uppercase tracking-wide text-slate-400' }, 'Entrada'),
                          h('p', { class: 'mt-1 text-sm font-semibold text-slate-900' }, props.formatDateTime(occupancy.start_at)),
                        ]),
                        h('div', {}, [
                          h('p', { class: 'text-xs font-semibold uppercase tracking-wide text-slate-400' }, 'Salida'),
                          h('p', { class: 'mt-1 text-sm font-semibold text-slate-900' }, props.formatDateTime(occupancy.end_at)),
                        ]),
                      ]),
                      h('p', { class: 'mt-4 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-emerald-700' }, props.stayUntilLabel(occupancy.end_at)),
                    ]
                  : [
                      h('p', { class: 'text-xs font-semibold uppercase tracking-wide text-slate-400' }, 'Estado actual'),
                      h('p', { class: 'mt-2 text-base font-bold text-slate-900' }, 'Libre ahora mismo'),
                      next
                        ? h('p', { class: 'mt-3 text-sm text-slate-500' }, `Próxima entrada: ${next.pet_name} · ${props.formatDateTime(next.start_at)}`)
                        : h('p', { class: 'mt-3 text-sm text-slate-500' }, 'No hay ninguna entrada próxima asignada.'),
                    ],
            ),

            isDaycare
              ? h('div', { class: 'mt-4 rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4' }, [
                  h('p', { class: 'text-xs font-semibold uppercase tracking-wide text-slate-400' }, 'Próxima entrada'),
                  next
                    ? h('div', {}, [
                        h('p', { class: 'mt-2 text-sm font-bold text-slate-900' }, next.pet_name),
                        h('p', { class: 'mt-1 text-sm font-semibold text-[#6B2FA4]' }, next.client_name),
                        h('p', { class: 'mt-1 text-sm text-slate-500' }, props.formatDateTime(next.start_at)),
                      ])
                    : h('p', { class: 'mt-2 text-sm text-slate-500' }, 'No hay entradas próximas asignadas.'),
                ])
              : null,

            h('div', { class: 'mt-4' }, [
              h(
                'button',
                {
                  type: 'button',
                  onClick: () => emit('open', resource),
                  class:
                    'inline-flex h-11 w-full items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]',
                },
                occupancy ? 'Ver reserva actual' : 'Ver detalle',
              ),
            ]),

            h('div', { class: 'mt-auto border-t border-[#F1EBF7] pt-5' }, [
              h('div', { class: 'grid gap-3 sm:grid-cols-3' }, [
                statusButton(resource, 'active', 'Activo', 'border-emerald-200 bg-emerald-50 text-emerald-700'),
                statusButton(resource, 'cleaning', 'Limpieza', 'border-amber-200 bg-amber-50 text-amber-700'),
                statusButton(resource, 'disabled', 'Deshabilitar', 'border-red-200 bg-red-50 text-red-700'),
              ]),
            ]),
          ]),
        ],
      )
    }

    return () =>
      h('section', { class: 'space-y-4' }, [
        h('div', { class: 'flex items-end justify-between gap-4' }, [
          h('div', {}, [
            h('h2', { class: 'text-[28px] font-bold tracking-tight text-slate-900' }, props.title),
            h('p', { class: 'mt-1 text-sm text-slate-500' }, props.description),
          ]),
          h(
            'span',
            { class: 'rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]' },
            `${props.resources.length} ${props.countLabel}`,
          ),
        ]),
        h('div', { class: 'grid gap-4 lg:grid-cols-2 2xl:grid-cols-3' }, props.resources.map(resourceCard)),
      ])
  },
})

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

    resources.value = Array.isArray(resourcesData)
      ? resourcesData.map(normalizeResource)
      : []

    reservations.value = Array.isArray(reservationsData)
      ? reservationsData.map(normalizeReservation)
      : []

    initialStatusSnapshot.value = resources.value.map((resource) => ({
      id: resource.id,
      status: resource.status,
    }))
  } catch (error) {
    console.error(error)
    loadError.value = getReadableErrorMessage(
      error,
      resourcesMessages.errors?.load || 'No hemos podido cargar los recursos del centro por ahora.',
    )
  } finally {
    isLoading.value = false
  }
}

function normalizeResource(resource = {}) {
  return {
    id: resource.id,
    name: resource.name ?? '',
    type: resource.type ?? 'other',
    zone: resource.zone ?? 'support',
    size_group: resource.size_group ?? 'all',
    capacity: Number(resource.capacity ?? 1),
    status: resource.status ?? 'active',
    created_at: resource.created_at ?? null,
    updated_at: resource.updated_at ?? null,
  }
}

function normalizeReservation(reservation = {}) {
  const pet = reservation.pet || null
  const service = reservation.service || null
  const resource = reservation.resource || null
  const client = reservation.client || pet?.owner || null

  return {
    ...reservation,
    id: reservation.id,
    client_user_id: reservation.client_user_id ?? client?.id ?? pet?.owner_user_id ?? null,
    pet_id: reservation.pet_id ?? pet?.id ?? null,
    service_id: reservation.service_id ?? service?.id ?? null,
    resource_id: reservation.resource_id ?? resource?.id ?? null,
    pet_name: reservation.pet_name || pet?.name || 'Mascota',
    client_name: reservation.client_name || client?.name || 'Cliente',
    service_name: reservation.service_name || service?.name || 'Servicio',
    resource_name: reservation.resource_name || resource?.name || '',
    status: reservation.status ?? 'pending',
    start_at: reservation.start_at ?? null,
    end_at: reservation.end_at ?? reservation.start_at ?? null,
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
    items = items.filter((resource) => currentOccupancyCount(resource) === 0 && resource.status === 'active')
  }

  if (quickFilter.value === 'checkouts_today') {
    items = items.filter((resource) => resourceHasCheckoutToday(resource))
  }

  return items.sort((a, b) => a.name.localeCompare(b.name, 'es'))
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
    actionError.value = getReadableErrorMessage(
      error,
      resourcesMessages.errors?.update || 'No se ha podido actualizar el recurso.',
    )
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
    actionError.value = getReadableErrorMessage(
      error,
      resourcesMessages.errors?.update || 'No se ha podido actualizar el recurso.',
    )
  } finally {
    updatingResourceId.value = null
  }
}

async function refreshResources() {
  const data = await getResources()
  resources.value = Array.isArray(data) ? data.map(normalizeResource) : []
}

function resourceReservations(resourceId) {
  return reservations.value
    .filter((reservation) => Number(reservation.resource_id) === Number(resourceId))
    .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime())
}

function currentReservations(resource) {
  const now = Date.now()

  return resourceReservations(resource.id).filter((reservation) => {
    if (['cancelled', 'completed'].includes(reservation.status)) return false

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
    if (['cancelled', 'completed'].includes(reservation.status)) return false
    return new Date(reservation.start_at).getTime() > now
  })
}

function nextReservation(resource) {
  return upcomingReservations(resource)[0] || null
}

function checkoutTodayReservations(resource) {
  return resourceReservations(resource).filter((reservation) => {
    if (['cancelled', 'completed'].includes(reservation.status)) return false
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
  if (!dateValue) return 'Sin fecha'
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