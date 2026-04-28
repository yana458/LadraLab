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
                <div class="h-10 w-48 rounded bg-white/20"></div>
                <div class="mt-5 h-12 w-80 rounded bg-white/20"></div>
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
              <div v-for="n in 4" :key="n" class="h-[138px] rounded-[24px] bg-white/15"></div>
            </div>
          </div>
        </section>
      </template>

      <template v-else-if="reservation">
        <!-- Cabecera -->
        <header
          class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#5A208E] via-[#7A2EA6] to-[#E02890] text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
        >
          <div class="flex min-h-[360px] flex-col p-5 sm:p-6 lg:p-7">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div class="min-w-0 max-w-4xl">
                <RouterLink
                  :to="{ name: 'staff-reservations' }"
                  class="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  ← Volver a reservas
                </RouterLink>

                <div class="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div class="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[24px] bg-white/15 text-2xl font-bold text-white ring-1 ring-white/20">
                    <img
                      v-if="reservation.pet_image"
                      :src="reservation.pet_image"
                      :alt="reservation.pet_name"
                      class="h-full w-full object-cover"
                    />
                    <span v-else>{{ getInitial(reservation.pet_name) }}</span>
                  </div>

                  <div class="min-w-0">
                    <h1 class="font-ladralab-brush text-5xl leading-none tracking-tight sm:text-6xl">
                      {{ reservation.pet_name }}
                    </h1>
                    <p class="mt-3 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                      {{ reservation.service_name }} · {{ reservationDateLabel(reservation) }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="grid gap-3 sm:grid-cols-3 lg:w-[430px]">
                <RouterLink
                  :to="{ name: 'staff-dashboard' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Panel
                </RouterLink>

                <RouterLink
                  :to="{ name: 'staff-reservations' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Listado
                </RouterLink>

                <RouterLink
                  :to="buildFollowUpLink()"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Seguimiento
                </RouterLink>
              </div>
            </div>

            <div class="mt-6 grid items-stretch gap-4 sm:grid-cols-2 xl:mt-auto xl:grid-cols-4">
              <article
                v-for="card in summaryCards"
                :key="card.key"
                class="flex min-h-[138px] flex-col rounded-[24px] border border-white/16 bg-white/12 p-4 backdrop-blur-sm"
              >
                <div class="flex items-start justify-between gap-4">
                  <div class="min-w-0">
                    <p class="text-sm font-medium text-white/82">{{ card.label }}</p>
                    <p class="mt-3 text-[1.55rem] font-bold leading-tight text-white">
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

                <p class="mt-3 text-sm leading-6 text-white/82">
                  {{ card.help }}
                </p>
              </article>
            </div>
          </div>
        </header>

        <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
          <div class="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[#6E4FA2]">
                Gestión de la reserva
              </p>
              <h2 class="mt-2 text-xl font-bold tracking-tight text-slate-900">
                Acciones rápidas
              </h2>
              <p class="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                Gestiona los cambios principales de la reserva y accede al seguimiento diario desde un bloque más visible.
              </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap xl:justify-end">
              <button
                v-if="reservation.status === 'pending'"
                type="button"
                @click="openReviewModal(reservation)"
                class="inline-flex h-11 items-center justify-center rounded-2xl bg-[#6627A3] px-5 text-sm font-semibold text-white transition hover:bg-[#57208D]"
              >
                Revisar y confirmar
              </button>

              <button
                v-else-if="reservation.status !== 'cancelled'"
                type="button"
                @click="openEditModal(reservation)"
                class="inline-flex h-11 items-center justify-center rounded-2xl bg-[#6627A3] px-5 text-sm font-semibold text-white transition hover:bg-[#57208D]"
              >
                Editar reserva
              </button>

              <button
                v-if="canCancelReservation(reservation)"
                type="button"
                @click="openCancelModal(reservation)"
                class="inline-flex h-11 items-center justify-center rounded-2xl border border-red-200 bg-white px-5 text-sm font-semibold text-red-700 transition hover:bg-red-50"
              >
                Cancelar
              </button>

              <RouterLink
                :to="buildFollowUpLink()"
                class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-5 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
              >
                Ir a seguimiento
              </RouterLink>

              <RouterLink
                :to="{ name: 'staff-pet-detail', params: { id: reservation.pet_id } }"
                class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-5 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
              >
                Ver mascota
              </RouterLink>
            </div>
          </div>
        </section>

        <!-- Contenido -->
        <section class="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_390px] xl:items-start">
          <main class="space-y-6">
            <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 class="text-[24px] font-bold tracking-tight text-slate-900">
                    Información de la reserva
                  </h2>
                  <p class="mt-1 text-sm leading-6 text-slate-500">
                    Datos principales de la estancia o servicio registrado en el centro.
                  </p>
                </div>

                <span
                  class="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold"
                  :class="statusBadgeClass(reservation.status)"
                >
                  {{ reservationStatusLabel(reservation.status) }}
                </span>
              </div>

              <div class="mt-5 grid gap-4 md:grid-cols-2">
                <InfoCard label="Servicio" :value="reservation.service_name" :description="reservation.service?.description || 'Servicio registrado en la reserva.'" />
                <InfoCard label="Tipo de reserva" :value="bookingModeLabel(inferBookingMode(reservation))" :description="reservationDateLabel(reservation)" />
                <InfoCard label="Entrada / inicio" :value="formatDate(reservation.start_at, longDateOptions)" :description="formatTime(reservation.start_at)" />
                <InfoCard label="Salida / fin" :value="formatDate(reservation.end_at, longDateOptions)" :description="formatTime(reservation.end_at)" />
              </div>

              <div class="mt-4 rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4">
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Observaciones de la reserva</p>
                <p class="mt-2 text-sm leading-7 text-slate-600">
                  {{ reservation.notes || 'Sin observaciones adicionales registradas.' }}
                </p>
              </div>
            </section>

            <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 class="text-[24px] font-bold tracking-tight text-slate-900">
                    Seguimientos diarios
                  </h2>
                  <p class="mt-1 text-sm leading-6 text-slate-500">
                    Informes asociados a esta reserva. En hotel puede haber uno por cada día de estancia.
                  </p>
                </div>

                <RouterLink
                  :to="buildFollowUpLink()"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                >
                  Abrir seguimiento
                </RouterLink>
              </div>

              <div v-if="dailyReports.length" class="mt-5 space-y-3">
                <article
                  v-for="report in dailyReports"
                  :key="report.id || report.report_date"
                  class="rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4"
                >
                  <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div class="min-w-0">
                      <div class="flex flex-wrap items-center gap-2">
                        <p class="font-bold text-slate-900">
                          {{ formatDate(`${normalizeDateKey(report.report_date)}T00:00:00`, longDateOptions) }}
                        </p>
                        <span
                          class="inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1"
                          :class="reportStatusClass(report)"
                        >
                          {{ reportStatusLabel(report) }}
                        </span>
                      </div>

                      <p class="mt-2 text-sm leading-6 text-slate-600">
                        {{ report.summary || 'Resumen todavía no registrado.' }}
                      </p>

                      <p v-if="report.observations" class="mt-2 text-xs leading-6 text-slate-500">
                        <strong class="text-slate-700">Observaciones:</strong> {{ report.observations }}
                      </p>
                    </div>

                    <RouterLink
                      :to="buildFollowUpLink(report.report_date)"
                      class="inline-flex h-10 shrink-0 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                    >
                      Editar informe
                    </RouterLink>
                  </div>

                  <div class="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    <span
                      v-for="item in checklistOptions"
                      :key="item.key"
                      class="inline-flex items-center justify-between gap-3 rounded-2xl border border-white bg-white px-3 py-2 text-xs font-semibold text-slate-600"
                    >
                      {{ item.label }}
                      <span :class="report[item.key] ? 'text-emerald-600' : 'text-slate-300'">
                        {{ report[item.key] ? '✓' : '—' }}
                      </span>
                    </span>
                  </div>

                  <div class="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                    <span class="rounded-full bg-white px-3 py-1">
                      {{ countReportChecks(report) }}/{{ checklistOptions.length }} checks
                    </span>
                    <span class="rounded-full bg-white px-3 py-1">
                      {{ Array.isArray(report.media) ? report.media.length : 0 }} fotos
                    </span>
                  </div>
                </article>
              </div>

              <div
                v-else
                class="mt-5 rounded-[24px] border border-dashed border-[#E8E1F1] bg-[#FCFBFE] px-4 py-10 text-center"
              >
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5EFFB] text-lg text-[#5A208E]">
                  📋
                </div>
                <h3 class="mt-4 text-base font-bold text-slate-900">
                  Aún no hay seguimiento registrado
                </h3>
                <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Cuando el equipo guarde un borrador o complete el informe diario, aparecerá aquí.
                </p>
              </div>
            </section>
          </main>

          <aside class="space-y-6 xl:sticky xl:top-6">
            <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <div class="flex items-start gap-4">
                <div class="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#EAE9EF] to-[#D7CBE7] text-lg font-bold text-[#6B5B90]">
                  <img
                    v-if="reservation.pet_image"
                    :src="reservation.pet_image"
                    :alt="reservation.pet_name"
                    class="h-full w-full object-cover"
                  />
                  <span v-else>{{ getInitial(reservation.pet_name) }}</span>
                </div>

                <div class="min-w-0">
                  <p class="text-xs font-semibold uppercase tracking-wide text-[#6E4FA2]">Mascota</p>
                  <h2 class="mt-1 text-xl font-bold text-slate-900">{{ reservation.pet_name }}</h2>
                  <p class="mt-1 text-sm text-slate-500">
                    {{ reservation.pet_breed || 'Raza no indicada' }} · {{ petSizeLabel(reservation.pet_size) }}
                  </p>
                </div>
              </div>

              <p class="mt-4 rounded-2xl bg-[#FCFBFE] p-4 text-sm leading-6 text-slate-600">
                {{ reservation.pet?.care_notes || 'No hay observaciones especiales en la ficha.' }}
              </p>

              <RouterLink
                :to="{ name: 'staff-pet-detail', params: { id: reservation.pet_id } }"
                class="mt-4 inline-flex h-11 w-full items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
              >
                Ver ficha de la mascota
              </RouterLink>
            </section>

            <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <h2 class="text-lg font-bold text-slate-900">Tutor / cliente</h2>
              <p class="mt-1 text-sm leading-6 text-slate-500">
                Datos de contacto útiles para confirmar cambios, avisos o incidencias durante la estancia.
              </p>

              <div class="mt-4 space-y-3">
                <InfoLine label="Nombre" :value="reservation.client_name" />
                <InfoLine label="Email" :value="reservation.client_email" />
                <InfoLine label="Teléfono" :value="reservation.client_phone" />
                <InfoLine label="ID usuario" :value="reservation.client_user_id ? `#${reservation.client_user_id}` : 'No disponible'" />
              </div>
            </section>

            <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <h2 class="text-lg font-bold text-slate-900">Recurso asignado</h2>
              <div v-if="reservation.resource" class="mt-4 rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4">
                <p class="text-base font-bold text-slate-900">{{ reservation.resource.name }}</p>
                <p class="mt-1 text-sm text-slate-500">
                  {{ resourceTypeLabel(reservation.resource.type) }} · {{ resourceZoneLabel(reservation.resource.zone) }}
                </p>
                <p class="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Capacidad</p>
                <p class="mt-1 text-sm font-semibold text-slate-700">
                  {{ reservation.resource.capacity }} plazas · {{ resourceSizeLabel(reservation.resource.size_group) }}
                </p>
              </div>

              <div v-else class="mt-4 rounded-[24px] border border-dashed border-[#E8E1F1] bg-[#FCFBFE] p-4 text-sm leading-6 text-slate-500">
                Esta reserva todavía no tiene recurso asignado o el servicio no lo necesita.
              </div>
            </section>
          </aside>
        </section>
      </template>

      <template v-else>
        <section class="rounded-[30px] border border-[#E8E1F1] bg-white px-5 py-14 text-center shadow-sm">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F5EFFB] text-2xl text-[#5A208E]">
            📅
          </div>
          <h1 class="mt-5 text-2xl font-bold tracking-tight text-slate-900">
            Reserva no encontrada
          </h1>
          <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            No hemos encontrado una reserva con ese identificador. Puede que no exista en los datos demo o que se haya eliminado.
          </p>
          <RouterLink
            :to="{ name: 'staff-reservations' }"
            class="mt-6 inline-flex h-11 items-center justify-center rounded-2xl bg-[#6627A3] px-5 text-sm font-semibold text-white transition hover:bg-[#57208D]"
          >
            Volver a reservas
          </RouterLink>
        </section>
      </template>
    </div>

    <!-- Modal editar / confirmar -->
    <div
      v-if="isReservationModalOpen && editingReservation"
      class="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-slate-950/45 px-4 py-8 backdrop-blur-sm"
    >
      <div class="w-full max-w-3xl rounded-[30px] border border-[#E8E1F1] bg-white p-5 shadow-2xl sm:p-6">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[#6E4FA2]">
              {{ reservationModalMode === 'review' ? 'Revisión de reserva' : 'Edición de reserva' }}
            </p>
            <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              {{ reservationModalMode === 'review' ? 'Revisar y confirmar reserva' : 'Editar reserva' }}
            </h2>
            <p class="mt-1 text-sm leading-6 text-slate-500">
              {{ reservationModalMode === 'review'
                ? 'Revisa la información, asigna un recurso si corresponde y confirma la reserva.'
                : 'Actualiza los datos de la reserva y guarda los cambios.' }}
            </p>
          </div>

          <button
            type="button"
            @click="closeReservationModal"
            class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white text-lg font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>

        <div class="mt-5 space-y-5">
          <section
            v-if="modalNeedsResource"
            class="rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4"
          >
            <div class="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 class="text-sm font-bold text-slate-900">Recurso del centro</h3>
                <p class="mt-1 text-sm leading-6 text-slate-500">
                  {{ resourceHelperText }}
                </p>
              </div>

              <span class="rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]">
                {{ modalCompatibleResources.length }} compatibles
              </span>
            </div>

            <select
              v-model="selectedResourceId"
              class="mt-4 h-12 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
            >
              <option value="">Selecciona un recurso</option>
              <option
                v-for="resource in modalCompatibleResources"
                :key="resource.id"
                :value="String(resource.id)"
                :disabled="isResourceOccupied(resource.id, modalRange.startAt, modalRange.endAt, editingReservation?.id)"
              >
                {{ resourceOptionLabel(resource) }}
                {{ isResourceOccupied(resource.id, modalRange.startAt, modalRange.endAt, editingReservation?.id) ? ' · ocupado' : '' }}
              </option>
            </select>

            <p v-if="resourceSelectionError" class="mt-2 text-xs font-semibold text-red-600">
              {{ resourceSelectionError }}
            </p>

            <div
              v-if="!modalCompatibleResources.length"
              class="mt-4 rounded-2xl border border-dashed border-[#E8E1F1] bg-white px-4 py-4 text-sm text-slate-500"
            >
              No hay recursos activos y compatibles para esta mascota en esas fechas.
            </div>
          </section>

          <ReservationForm
            :mode="reservationModalMode === 'review' ? 'edit' : reservationModalMode"
            :pets="pets"
            :services="services"
            :initial-data="reservationFormInitialData"
            :external-errors="reservationFormErrors"
            :is-submitting="isSubmitting"
            :submit-text="reservationModalMode === 'review' ? 'Confirmar reserva' : 'Guardar cambios'"
            :submitting-text="reservationModalMode === 'review' ? 'Confirmando...' : 'Guardando...'"
            :cancel-text="'Cancelar'"
            :show-cancel="true"
            :lock-pet-and-service="reservationModalMode === 'review'"
            reminder-title="Revisión interna"
            reminder-text="Comprueba fechas, horario, recurso y observaciones antes de guardar."
            @change="handleReservationDraftChange"
            @cancel="closeReservationModal"
            @submit="handleReservationSubmit"
          />
        </div>
      </div>
    </div>

    <!-- Modal cancelar -->
    <div
      v-if="reservationToCancel"
      class="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/45 px-4 py-8 backdrop-blur-sm"
    >
      <div class="w-full max-w-md rounded-[30px] border border-red-100 bg-white p-6 shadow-2xl">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-lg text-red-600">
          !
        </div>

        <h2 class="mt-4 text-xl font-bold text-slate-900">¿Quieres cancelar esta reserva?</h2>
        <p class="mt-2 text-sm leading-6 text-slate-500">
          Esta acción dejará la reserva como cancelada dentro de la operativa del centro.
        </p>

        <div class="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            @click="reservationToCancel = null"
            class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:bg-[#F6F1FB]"
          >
            Volver
          </button>

          <button
            type="button"
            :disabled="isSubmitting"
            @click="confirmCancelReservation"
            class="inline-flex h-11 items-center justify-center rounded-2xl bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ isSubmitting ? 'Procesando...' : 'Confirmar cancelación' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, defineComponent, h, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ReservationForm from '@/components/reservations/ReservationForm.vue'
import { petsMock } from '@/mocks/petsMock'
import { reservationsMock } from '@/mocks/reservationsMock'
import { servicesMock } from '@/mocks/servicesMock'
import { resourcesMock } from '@/mocks/resourcesMock'
import { uiMessages } from '@/utils/uiMessages'

// Cuando backend esté conectado, puedes sustituir el uso de mocks por un servicio real:
// import { getStaffReservation, updateStaffReservation, cancelStaffReservation } from '@/services/staffReservationsService'

const InfoCard = defineComponent({
  name: 'InfoCard',
  props: {
    label: { type: String, default: '' },
    value: { type: [String, Number], default: '' },
    description: { type: String, default: '' },
  },
  setup(props) {
    return () =>
      h('div', { class: 'rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4' }, [
        h('p', { class: 'text-xs font-semibold uppercase tracking-wide text-slate-400' }, props.label),
        h('p', { class: 'mt-2 text-base font-bold text-slate-900' }, props.value || 'No disponible'),
        props.description
          ? h('p', { class: 'mt-1 text-sm leading-6 text-slate-500' }, props.description)
          : null,
      ])
  },
})

const InfoLine = defineComponent({
  name: 'InfoLine',
  props: {
    label: { type: String, default: '' },
    value: { type: [String, Number], default: '' },
  },
  setup(props) {
    return () =>
      h('div', { class: 'flex items-start justify-between gap-4 rounded-2xl bg-[#FCFBFE] px-4 py-3' }, [
        h('span', { class: 'text-sm font-medium text-slate-500' }, props.label),
        h('span', { class: 'text-right text-sm font-bold text-slate-900' }, props.value || 'No disponible'),
      ])
  },
})

const route = useRoute()

const staffReservationsMessages = uiMessages.staffReservations || {
  success: {
    updated: 'La reserva se ha actualizado correctamente.',
    confirmed: 'Reserva confirmada y lista para el centro.',
    cancelled: 'La reserva se ha cancelado correctamente.',
  },
  errors: {
    load: 'No hemos podido cargar la reserva por ahora.',
    save: 'No se pudo guardar la reserva.',
    confirm: 'No se pudo confirmar la reserva.',
    cancel: 'No se pudo cancelar la reserva.',
    resourceRequired: 'Este servicio necesita un recurso compatible antes de confirmarse.',
    resourceUnavailable: 'Ese recurso ya no está disponible para esas fechas.',
  },
}

const mockClientsByUserId = {
  1: {
    name: 'Ana Tutor',
    email: 'ana.tutor@ladralab.demo',
    phone: '622 104 589',
    whatsapp: '622 104 589',
  },
  2: {
    name: 'Laura Gómez',
    email: 'laura.gomez@ladralab.demo',
    phone: '610 845 233',
    whatsapp: '610 845 233',
  },
  3: {
    name: 'Marcos Peña',
    email: 'marcos.pena@ladralab.demo',
    phone: '628 450 917',
    whatsapp: '628 450 917',
  },
  4: {
    name: 'Sara León',
    email: 'sara.leon@ladralab.demo',
    phone: '604 733 128',
    whatsapp: '604 733 128',
  },
  5: {
    name: 'Iván Díaz',
    email: 'ivan.diaz@ladralab.demo',
    phone: '619 208 774',
    whatsapp: '619 208 774',
  },
}

const checklistOptions = [
  { key: 'food_done', label: 'Comida' },
  { key: 'walk_done', label: 'Paseo' },
  { key: 'rest_done', label: 'Descanso' },
  { key: 'hygiene_done', label: 'Higiene' },
  { key: 'medication_done', label: 'Medicación' },
  { key: 'play_done', label: 'Juego' },
]

const longDateOptions = { day: '2-digit', month: 'long', year: 'numeric' }

const isLoading = ref(true)
const isSubmitting = ref(false)

const loadError = ref('')
const actionError = ref('')
const successMessage = ref('')

const reservations = ref([])
const pets = ref([])
const services = ref([])
const resources = ref([])

const isReservationModalOpen = ref(false)
const reservationModalMode = ref('edit') // edit | review
const editingReservation = ref(null)
const reservationToCancel = ref(null)

const reservationFormErrors = ref({})
const reservationDraft = ref({})
const selectedResourceId = ref('')
const resourceSelectionError = ref('')

onMounted(() => {
  loadReservationDetail()
})

async function loadReservationDetail() {
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
    loadError.value = staffReservationsMessages.errors?.load || 'No hemos podido cargar la reserva por ahora.'
  } finally {
    isLoading.value = false
  }
}

const reservationId = computed(() => Number(route.params.id || 0))

const allReservations = computed(() => {
  return reservations.value.map((item) => enrichReservation(item))
})

const reservation = computed(() => {
  return allReservations.value.find((item) => Number(item.id) === Number(reservationId.value)) || null
})

const dailyReports = computed(() => {
  return [...(reservation.value?.daily_reports || [])].sort((a, b) => {
    return normalizeDateKey(a.report_date).localeCompare(normalizeDateKey(b.report_date))
  })
})

const summaryCards = computed(() => {
  if (!reservation.value) return []

  return [
    {
      key: 'status',
      label: 'Estado',
      value: reservationStatusLabel(reservation.value.status),
      help: reservationStatusHelp(reservation.value.status),
      icon: '01',
      iconClass: 'bg-white text-[#5A208E]',
    },
    {
      key: 'service',
      label: 'Servicio',
      value: reservation.value.service_name,
      help: bookingModeLabel(inferBookingMode(reservation.value)),
      icon: '02',
      iconClass: 'bg-[#F3ECFB] text-[#5A208E]',
    },
    {
      key: 'date',
      label: 'Horario',
      value: buildTimeLabel(reservation.value),
      help: reservationDateLabel(reservation.value),
      icon: '03',
      iconClass: 'bg-[#FFF0F8] text-[#A22068]',
    },
    {
      key: 'resource',
      label: 'Recurso',
      value: reservation.value.resource_name || 'Sin asignar',
      help: reservation.value.resource ? resourceZoneLabel(reservation.value.resource.zone) : 'Pendiente o no necesario',
      icon: '04',
      iconClass: 'bg-emerald-50 text-emerald-700',
    },
  ]
})

const reservationFormInitialData = computed(() => {
  if (!editingReservation.value) return {}
  return buildDraftFromReservation(editingReservation.value)
})

const modalService = computed(() => {
  const serviceId = reservationDraft.value?.service_id || editingReservation.value?.service_id
  return getServiceById(serviceId)
})

const modalPet = computed(() => {
  const petId = reservationDraft.value?.pet_id || editingReservation.value?.pet_id
  return getPetById(petId)
})

const modalNeedsResource = computed(() => serviceNeedsResource(modalService.value))

const modalRange = computed(() => getDraftDateRange(reservationDraft.value, modalService.value))

const modalCompatibleResources = computed(() => {
  const service = modalService.value
  const pet = modalPet.value
  const zone = serviceResourceZone(service)
  const sizeGroup = petSizeGroup(pet?.size)

  return resources.value.filter((resource) => {
    if (resource.status !== 'active') return false
    if (zone && resource.zone !== zone) return false
    if (resource.size_group !== 'all' && resource.size_group !== sizeGroup) return false
    return true
  })
})

const resourceHelperText = computed(() => {
  if (!modalNeedsResource.value) return 'Este servicio no necesita recurso asignado.'

  const service = modalService.value?.name || 'este servicio'
  return `Selecciona un recurso compatible para ${service}. Los recursos ocupados aparecen deshabilitados.`
})

function enrichReservation(item) {
  const pet = pets.value.find((petItem) => Number(petItem.id) === Number(item.pet_id)) || item.pet || null
  const service = services.value.find((serviceItem) => Number(serviceItem.id) === Number(item.service_id)) || item.service || null
  const resource = resources.value.find((resourceItem) => Number(resourceItem.id) === Number(item.resource_id)) || item.resource || null

  return {
    ...item,
    pet,
    service,
    resource,
    pet_name: pet?.name || item.pet_name || 'Mascota',
    pet_breed: pet?.breed || item.pet_breed || '',
    pet_size: pet?.size || item.pet_size || '',
    pet_image: pet?.photo_path || item.pet_image || '',
    client_name:
      item.client_name ||
      item.client?.name ||
      mockClientsByUserId[item.client_user_id]?.name ||
      `Cliente ${item.client_user_id ?? ''}`,
    client_email:
      item.client_email ||
      item.client?.email ||
      mockClientsByUserId[item.client_user_id]?.email ||
      'No disponible',
    client_phone:
      item.client_phone ||
      item.client?.phone ||
      mockClientsByUserId[item.client_user_id]?.phone ||
      'No disponible',
    client_whatsapp:
      item.client_whatsapp ||
      item.client?.whatsapp ||
      mockClientsByUserId[item.client_user_id]?.whatsapp ||
      item.client_phone ||
      item.client?.phone ||
      'No disponible',
    service_name: item.service_name || service?.name || 'Servicio',
    resource_name: item.resource_name || resource?.name || '',
  }
}

function wait(ms = 160) {
  return new Promise((resolve) => setTimeout(resolve, ms))
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

function buildFollowUpLink(reportDate = null) {
  const date = normalizeDateKey(reportDate || reservation.value?.start_at || new Date().toISOString())

  // Ajusta el name si tu router usa otro nombre para la vista de seguimiento.
  return {
    name: 'staff-followups',
    query: {
      reservation: reservation.value?.id,
      date,
    },
  }
}

function formatDate(dateValue, options = {}) {
  return new Intl.DateTimeFormat('es-ES', options).format(new Date(dateValue))
}

function formatTime(dateValue) {
  return new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit' }).format(new Date(dateValue))
}

function normalizeDateKey(value) {
  if (!value) return ''
  return String(value).slice(0, 10)
}

function formatDateInput(dateString) {
  return normalizeDateKey(dateString)
}

function formatTimeInput(dateString) {
  return String(dateString || '').slice(11, 16)
}

function reservationDateLabel(item) {
  if (!item) return ''

  const start = formatDate(item.start_at, longDateOptions)
  const end = formatDate(item.end_at, longDateOptions)

  if (normalizeDateKey(item.start_at) === normalizeDateKey(item.end_at)) {
    return start
  }

  return `${start} → ${end}`
}

function buildTimeLabel(item) {
  return `${formatTime(item.start_at)} → ${formatTime(item.end_at)}`
}

function inferBookingMode(item) {
  if (item.service?.booking_mode) return item.service.booking_mode
  if (normalizeDateKey(item.start_at) !== normalizeDateKey(item.end_at)) return 'date_range'
  return 'single_day'
}

function bookingModeLabel(mode) {
  const map = {
    date_range: 'Estancia de varios días',
    single_day: 'Servicio de día',
    time_slot: 'Servicio por cita',
  }

  return map[mode] || 'Reserva'
}

function reservationStatusLabel(status) {
  const map = {
    pending: 'Pendiente',
    confirmed: 'Confirmada',
    cancelled: 'Cancelada',
    completed: 'Finalizada',
  }

  return map[status] || status || 'Sin estado'
}

function reservationStatusHelp(status) {
  const map = {
    pending: 'Necesita revisión del equipo.',
    confirmed: 'Lista dentro de la operativa.',
    cancelled: 'No forma parte de la agenda activa.',
    completed: 'Servicio ya finalizado.',
  }

  return map[status] || 'Estado registrado en el sistema.'
}

function statusBadgeClass(status) {
  const map = {
    pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
    confirmed: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
    cancelled: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
    completed: 'bg-[#F3ECFB] text-[#6E4FA2] ring-1 ring-[#E3D3F4]',
  }

  return map[status] || 'bg-slate-100 text-slate-600 ring-1 ring-slate-200'
}

function reportStatusLabel(report) {
  if (!report) return 'Pendiente'
  if (report.status === 'draft') return 'Borrador'
  if (report.status === 'published') return 'Publicado'
  if (report.status === 'completed' || report.completed_at) return 'Completado'
  return 'Completado'
}

function reportStatusClass(report) {
  if (!report) return 'bg-amber-50 text-amber-700 ring-amber-100'
  if (report.status === 'draft') return 'bg-[#FFF0F8] text-[#A22068] ring-[#F7CBE1]'
  return 'bg-emerald-50 text-emerald-700 ring-emerald-100'
}

function countReportChecks(report) {
  return checklistOptions.filter((item) => Boolean(report?.[item.key])).length
}

function petSizeLabel(size) {
  const map = {
    toy: 'Toy',
    small: 'Pequeño',
    medium: 'Mediano',
    large: 'Grande',
    giant: 'Gigante',
  }

  return map[size] || 'Tamaño no indicado'
}

function petSizeGroup(size) {
  if (size === 'toy' || size === 'small') return 'toy_small'
  if (size === 'medium') return 'medium'
  if (size === 'large' || size === 'giant') return 'large'
  return 'all'
}

function resourceTypeLabel(type) {
  const map = {
    kennel: 'Suite / kennel',
    yard: 'Patio',
    room: 'Sala',
  }

  return map[type] || type || 'Recurso'
}

function resourceZoneLabel(zone) {
  const map = {
    hotel: 'Zona hotel',
    daycare: 'Zona guardería',
    support: 'Apoyo / sala común',
  }

  return map[zone] || zone || 'Zona no indicada'
}

function resourceSizeLabel(sizeGroup) {
  const map = {
    toy_small: 'toy y pequeños',
    medium: 'medianos',
    large: 'grandes',
    all: 'todos los tamaños',
  }

  return map[sizeGroup] || sizeGroup || 'sin grupo'
}

function serviceResourceZone(service) {
  if (!service) return ''
  if (service.booking_mode === 'date_range' || service.category === 'boarding') return 'hotel'
  if (service.booking_mode === 'single_day' || service.category === 'daycare') return 'daycare'
  return ''
}

function serviceNeedsResource(service) {
  if (!service) return false
  return ['date_range', 'single_day'].includes(service.booking_mode)
}

function buildDraftFromReservation(item) {
  const mode = getServiceById(item.service_id)?.booking_mode || inferBookingMode(item)
  const isSameDay = normalizeDateKey(item.start_at) === normalizeDateKey(item.end_at)

  return {
    pet_id: item.pet_id,
    service_id: item.service_id,
    booking_mode: mode,
    date: isSameDay ? formatDateInput(item.start_at) : '',
    start_date: isSameDay ? '' : formatDateInput(item.start_at),
    end_date: isSameDay ? '' : formatDateInput(item.end_at),
    start_time: formatTimeInput(item.start_at),
    end_time: formatTimeInput(item.end_at),
    notes: item.notes || '',
  }
}

function getDraftDateRange(draft, service) {
  if (!draft || !service) return { startAt: '', endAt: '' }

  if (service.booking_mode === 'date_range') {
    return {
      startAt: draft.start_date && draft.start_time ? `${draft.start_date}T${draft.start_time}:00` : '',
      endAt: draft.end_date && draft.end_time ? `${draft.end_date}T${draft.end_time}:00` : '',
    }
  }

  if (service.booking_mode === 'single_day') {
    return {
      startAt: draft.date ? `${draft.date}T${(service.default_start_time || '09:00:00').slice(0, 5)}:00` : '',
      endAt: draft.date ? `${draft.date}T${(service.default_end_time || '18:00:00').slice(0, 5)}:00` : '',
    }
  }

  const start = draft.date && draft.start_time ? `${draft.date}T${draft.start_time}:00` : ''
  const duration = Number(service.duration_minutes || 60)
  const endTime = draft.start_time ? addMinutesToTime(draft.start_time, duration) : ''

  return {
    startAt: start,
    endAt: draft.date && endTime ? `${draft.date}T${endTime}:00` : '',
  }
}

function parseTimeToMinutes(value) {
  const [hours, minutes] = String(value || '00:00').split(':').map(Number)
  return hours * 60 + minutes
}

function minutesToTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60) % 24
  const minutes = totalMinutes % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

function addMinutesToTime(time, minutesToAdd) {
  return minutesToTime(parseTimeToMinutes(time) + minutesToAdd)
}

function rangesOverlap(startA, endA, startB, endB) {
  return new Date(startA).getTime() < new Date(endB).getTime() && new Date(endA).getTime() > new Date(startB).getTime()
}

function isResourceOccupied(resourceId, startAt, endAt, ignoreReservationId = null) {
  if (!resourceId || !startAt || !endAt) return false

  return reservations.value.some((item) => {
    if (item.status === 'cancelled') return false
    if (ignoreReservationId && Number(item.id) === Number(ignoreReservationId)) return false
    if (Number(item.resource_id) !== Number(resourceId)) return false
    return rangesOverlap(startAt, endAt, item.start_at, item.end_at)
  })
}

function resourceOptionLabel(resource) {
  return `${resource.name} · ${resourceTypeLabel(resource.type)} · ${resourceSizeLabel(resource.size_group)}`
}

function canCancelReservation(item) {
  if (!item || item.status === 'cancelled') return false
  return new Date(item.start_at).getTime() > Date.now()
}

function openEditModal(item) {
  reservationModalMode.value = 'edit'
  editingReservation.value = item
  reservationFormErrors.value = {}
  reservationDraft.value = buildDraftFromReservation(item)
  selectedResourceId.value = item.resource_id ? String(item.resource_id) : ''
  resourceSelectionError.value = ''
  actionError.value = ''
  isReservationModalOpen.value = true
}

function openReviewModal(item) {
  reservationModalMode.value = 'review'
  editingReservation.value = item
  reservationFormErrors.value = {}
  reservationDraft.value = buildDraftFromReservation(item)
  selectedResourceId.value = item.resource_id ? String(item.resource_id) : ''
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

function handleReservationDraftChange(draft) {
  reservationDraft.value = { ...draft }
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
    const patch = buildReservationPatch(payload)

    if (reservationModalMode.value === 'review' && serviceNeedsResource(service)) {
      if (!patch.resource_id) {
        resourceSelectionError.value =
          staffReservationsMessages.errors?.resourceRequired ||
          'Este servicio necesita un recurso compatible antes de confirmarse.'
        isSubmitting.value = false
        return
      }

      if (isResourceOccupied(patch.resource_id, patch.start_at, patch.end_at, editingReservation.value?.id || null)) {
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
      isResourceOccupied(patch.resource_id, patch.start_at, patch.end_at, editingReservation.value?.id || null)
    ) {
      resourceSelectionError.value =
        staffReservationsMessages.errors?.resourceUnavailable ||
        'Ese recurso ya no está disponible para esas fechas.'
      isSubmitting.value = false
      return
    }

    await wait()

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

function openCancelModal(item) {
  reservationToCancel.value = item
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
      staffReservationsMessages.success?.cancelled || 'La reserva se ha cancelado correctamente.'

    reservationToCancel.value = null
  } catch (error) {
    console.error(error)
    actionError.value = staffReservationsMessages.errors?.cancel || 'No se pudo cancelar la reserva.'
  } finally {
    isSubmitting.value = false
  }
}

function getInitial(value) {
  return String(value || 'M').charAt(0).toUpperCase()
}
</script>

<style scoped>
.font-ladralab-brush {
  font-family: 'Caveat Brush', 'Brush Script MT', 'Segoe Script', cursive;
  font-weight: 700;
}
</style>
