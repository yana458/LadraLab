<template>
  <section class="space-y-6">
    <div class="pointer-events-none fixed right-4 top-4 z-[70] flex w-[calc(100%-2rem)] max-w-md flex-col gap-3 sm:right-6 sm:top-6">
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

    <!-- CABECERA -->
    <header
      class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#5A208E] via-[#7A2EA6] to-[#E02890] text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
    >
      <div class="flex min-h-[320px] flex-col p-5 sm:p-6 lg:p-7">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div class="min-w-0 max-w-4xl">
            <p class="inline-flex rounded-full border border-white/18 bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              Panel del equipo
            </p>

            <h1 class="mt-4 font-ladralab-brush text-5xl leading-none tracking-tight sm:text-6xl">
              Seguimiento diario
            </h1>

            <p class="mt-5 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
              Revisa las reservas activas, prepara el informe del día y deja cada seguimiento listo
              para que el tutor reciba una actualización clara y cuidada.
            </p>
          </div>

          <div class="grid gap-3 sm:grid-cols-3 lg:w-[440px]">
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
              :to="{ name: 'staff-reservations' }"
              class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
            >
              Reservas
            </RouterLink>
          </div>
        </div>

        <div class="mt-6 grid items-stretch gap-4 sm:grid-cols-2 xl:mt-auto xl:grid-cols-4">
          <article
            v-for="card in summaryCards"
            :key="card.key"
            class="flex min-h-[136px] flex-col rounded-[24px] border border-white/16 bg-white/12 p-4 text-left backdrop-blur-sm"
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

    <!-- FILTROS -->
    <section class="rounded-[28px] border border-[#E8E1F1] bg-white px-5 py-5 shadow-sm sm:px-6">
      <div class="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h2 class="text-[24px] font-bold tracking-tight text-slate-900">
            Buscar seguimiento
          </h2>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
            Usa una fecha y dos filtros principales. Así evitamos tener demasiados botones juntos y la búsqueda queda más clara.
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

      <div class="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.9fr)_220px_220px]">
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">Buscar por mascota, raza o servicio</label>
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Ej. Nala, labrador, hotel..."
            class="h-11 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">Fecha del seguimiento</label>
          <div class="grid grid-cols-[44px_minmax(0,1fr)_44px] gap-2 sm:grid-cols-[44px_minmax(0,1fr)_44px_auto]">
            <button
              type="button"
              @click="moveDate(-1)"
              class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
              aria-label="Día anterior"
            >
              ←
            </button>

            <input
              v-model="selectedDate"
              type="date"
              class="h-11 min-w-0 rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
            />

            <button
              type="button"
              @click="moveDate(1)"
              class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
              aria-label="Día siguiente"
            >
              →
            </button>

            <button
              type="button"
              @click="goToday"
              class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB] sm:flex"
            >
              Hoy
            </button>
          </div>
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">Estado</label>
          <select
            v-model="followUpStatusFilter"
            class="h-11 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
          >
            <option
              v-for="option in followUpStatusOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">Servicio</label>
          <select
            v-model="serviceFilter"
            class="h-11 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
          >
            <option
              v-for="option in serviceFilterOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>

      <div class="mt-4 flex flex-wrap items-center gap-2">
        <span class="inline-flex items-center rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]">
          {{ filteredRows.length }} resultados
        </span>

        <span class="inline-flex items-center rounded-full bg-[#EEF8FF] px-3 py-1 text-xs font-semibold text-sky-700">
          {{ selectedDateLabel }}
        </span>

        <span
          v-for="pill in activeFilterPills"
          :key="pill.key"
          class="inline-flex items-center rounded-full bg-[#FCE8F4] px-3 py-1 text-xs font-semibold text-[#A22068]"
        >
          {{ pill.label }}
        </span>
      </div>
    </section>

    <!-- CONTENIDO -->
    <section class="grid gap-6 xl:grid-cols-[minmax(340px,0.86fr)_minmax(560px,1.14fr)] 2xl:grid-cols-[minmax(380px,0.9fr)_minmax(680px,1.1fr)] xl:items-start">
      <!-- LISTA -->
      <div class="min-w-0">
        <div class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="text-[22px] font-bold tracking-tight text-slate-900">
                Reservas que necesitan seguimiento
              </h2>
              <p class="mt-1 text-sm leading-6 text-slate-500">
                Selecciona una reserva para abrir su informe diario.
              </p>
            </div>

            <span class="rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]">
              {{ filteredRows.length }}
            </span>
          </div>

          <div v-if="isLoading" class="mt-5 space-y-3">
            <div
              v-for="index in 3"
              :key="index"
              class="animate-pulse rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4"
            >
              <div class="flex gap-4">
                <div class="h-14 w-14 rounded-2xl bg-[#E9E1F1]"></div>
                <div class="flex-1 space-y-3">
                  <div class="h-4 w-2/3 rounded-full bg-[#E9E1F1]"></div>
                  <div class="h-3 w-1/2 rounded-full bg-[#EFE7F7]"></div>
                  <div class="h-3 w-5/6 rounded-full bg-[#EFE7F7]"></div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="filteredRows.length" class="mt-5 space-y-3">
            <button
              v-for="row in filteredRows"
              :key="row.reservation.id"
              type="button"
              @click="selectReservation(row.reservation.id)"
              class="w-full rounded-[24px] border p-4 text-left transition"
              :class="
                selectedReservationId === row.reservation.id
                  ? 'border-[#C9B0E9] bg-[#FBF8FE] shadow-sm ring-4 ring-[#F4EDFB]'
                  : 'border-[#EEE7F6] bg-white hover:border-[#DCC9F1] hover:bg-[#FCFBFE]'
              "
            >
              <div class="flex items-start gap-4">
                <div
                  class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#EAE9EF] to-[#D7CBE7] text-base font-bold text-[#6B5B90]"
                >
                  <img
                    v-if="row.pet.photo_path"
                    :src="row.pet.photo_path"
                    :alt="row.pet.name"
                    class="h-full w-full object-cover"
                  />
                  <span v-else>{{ getInitial(row.pet.name) }}</span>
                </div>

                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <p class="text-[17px] font-bold text-slate-900">
                      {{ row.pet.name }}
                    </p>

                    <span
                      class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1"
                      :class="row.statusClass"
                    >
                      {{ row.statusLabel }}
                    </span>

                    <span
                      v-if="row.serviceKey === 'hotel'"
                      class="inline-flex items-center rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]"
                    >
                      {{ row.hotelDayLabel }}
                    </span>
                  </div>

                  <p class="mt-1 text-sm font-semibold text-[#6B2FA4]">
                    {{ row.reservation.service_name }}
                  </p>

                  <p class="mt-1 text-sm text-slate-500">
                    {{ row.pet.breed || 'Raza pendiente' }}
                    <span v-if="row.reservation.resource_name"> · {{ row.reservation.resource_name }}</span>
                  </p>

                  <div class="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                    <span><strong class="font-semibold text-slate-800">Horario:</strong> {{ row.timeLabel }}</span>
                    <span><strong class="font-semibold text-slate-800">Fotos:</strong> {{ row.mediaCount }}</span>
                  </div>

                  <p class="mt-2 text-xs text-slate-500">
                    {{ row.dateHint }}
                  </p>
                </div>
              </div>
            </button>
          </div>

          <div
            v-else
            class="mt-5 rounded-[24px] border border-dashed border-[#E8E1F1] bg-[#FCFBFE] px-4 py-10 text-center text-sm text-slate-500"
          >
            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5EFFB] text-lg text-[#5A208E]">
              🐶
            </div>
            <h3 class="mt-4 text-base font-bold text-slate-900">
              No hay seguimientos con esos filtros
            </h3>
            <p class="mx-auto mt-2 max-w-sm leading-6">
              Prueba con otra fecha, cambia el estado o limpia los filtros para volver a ver todas las reservas activas.
            </p>
          </div>
        </div>
      </div>

      <!-- EDITOR -->
      <aside class="min-w-0 xl:sticky xl:top-6">
        <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
          <div v-if="selectedRow">
            <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div class="flex min-w-0 items-start gap-4">
                <div
                  class="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#EAE9EF] to-[#D7CBE7] text-lg font-bold text-[#6B5B90]"
                >
                  <img
                    v-if="selectedRow.pet.photo_path"
                    :src="selectedRow.pet.photo_path"
                    :alt="selectedRow.pet.name"
                    class="h-full w-full object-cover"
                  />
                  <span v-else>{{ getInitial(selectedRow.pet.name) }}</span>
                </div>

                <div class="min-w-0 flex-1">
                  <p class="text-xs font-semibold uppercase tracking-wide text-[#6E4FA2]">
                    Seguimiento del día
                  </p>
                  <h2 class="mt-1 text-[24px] font-bold tracking-tight text-slate-900">
                    {{ selectedRow.pet.name }}
                  </h2>
                  <p class="mt-2 text-sm text-slate-500">
                    {{ selectedRow.reservation.service_name }} · {{ selectedDateLabel }}
                  </p>
                  <p class="mt-1 text-sm text-slate-500">
                    {{ selectedRow.timeLabel }} · {{ selectedRow.reservation.resource_name || 'Recurso pendiente o no visible' }}
                  </p>

                  <div class="mt-3 flex flex-wrap gap-2">
                    <span
                      class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1"
                      :class="selectedRow.statusClass"
                    >
                      {{ selectedRow.statusLabel }}
                    </span>

                    <span
                      v-if="selectedRow.serviceKey === 'hotel'"
                      class="inline-flex items-center rounded-full bg-[#F3ECFB] px-3 py-1 text-xs font-semibold text-[#6E4FA2]"
                    >
                      {{ selectedRow.hotelDayLabel }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 lg:justify-end">
                <RouterLink
                  :to="buildPetLink(selectedRow)"
                  class="inline-flex h-10 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                >
                  Ver ficha
                </RouterLink>

                <RouterLink
                  :to="buildReservationLink(selectedRow)"
                  class="inline-flex h-10 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                >
                  Ver reserva
                </RouterLink>
              </div>
            </div>

            <form class="mt-6 space-y-5" @submit.prevent="saveSelectedFollowUp('completed')">
              <section class="rounded-[24px] border border-[#EEE7F6] bg-[#FCFBFE] p-4">
                <div class="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 class="text-base font-bold text-slate-900">Checklist rápido</h3>
                    <p class="mt-1 text-sm text-slate-500">
                      Marca solo lo que ya esté revisado para este día.
                    </p>
                  </div>
                </div>

                <div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <label
                    v-for="item in checklistOptions"
                    :key="item.key"
                    class="flex items-center gap-3 rounded-2xl border border-[#EEE7F6] bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-[#D9C4F4]"
                  >
                    <input
                      v-model="followUpForm[item.key]"
                      type="checkbox"
                      class="h-4 w-4 rounded border-[#CDBBE4] text-[#6627A3] focus:ring-[#D9C4F4]"
                    />
                    <span>{{ item.label }}</span>
                  </label>
                </div>
              </section>

              <div class="grid gap-5 lg:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-medium text-slate-700">
                    Resumen para el tutor
                  </label>
                  <textarea
                    v-model="followUpForm.summary"
                    rows="6"
                    class="w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
                    placeholder="Cuenta cómo ha ido el día de forma clara, cercana y útil para el tutor."
                  />
                </div>

                <div>
                  <label class="mb-2 block text-sm font-medium text-slate-700">
                    Observaciones internas
                  </label>
                  <textarea
                    v-model="followUpForm.observations"
                    rows="6"
                    class="w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#B89AE3] focus:ring-4 focus:ring-[#EBDDFF]"
                    placeholder="Notas para el equipo: comportamiento, incidencias, medicación, preferencias o avisos."
                  />
                </div>
              </div>

              <section class="rounded-[24px] border border-[#EEE7F6] bg-white p-4">
                <div class="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 class="text-base font-bold text-slate-900">Fotos del día</h3>
                    <p class="mt-1 text-sm text-slate-500">
                      Puedes añadir varias imágenes y quitarlas antes de guardar.
                    </p>
                  </div>

                  <span class="text-xs font-semibold text-[#6E4FA2]">
                    {{ followUpForm.media.length }} imágenes
                  </span>
                </div>

                <label
                  class="mt-4 flex min-h-[108px] cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-[#D8CBE8] bg-[#FCFBFE] px-4 py-5 text-center transition hover:border-[#B89AE3] hover:bg-[#FAF7FE]"
                >
                  <span class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F3ECFB] text-lg text-[#6627A3]">
                    📷
                  </span>
                  <span class="mt-3 text-sm font-semibold text-slate-900">
                    Añadir imágenes al seguimiento
                  </span>
                  <span class="mt-1 text-xs text-slate-500">
                    JPG, PNG o WEBP · selección múltiple
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    class="hidden"
                    @change="handleMediaSelection"
                  />
                </label>

                <div v-if="followUpForm.media.length" class="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  <div
                    v-for="(item, index) in followUpForm.media"
                    :key="item.local_id || item.id || `${item.file_path}-${index}`"
                    class="overflow-hidden rounded-[22px] border border-[#E8E1F1] bg-white shadow-sm"
                  >
                    <div class="aspect-[4/3] bg-[#F6F2FB]">
                      <img
                        :src="item.file_path"
                        alt="Foto del seguimiento"
                        class="h-full w-full object-cover"
                      />
                    </div>

                    <div class="flex items-center justify-between gap-3 px-3 py-3">
                      <div class="min-w-0">
                        <p class="truncate text-xs font-semibold text-slate-900">
                          {{ item.name || `Imagen ${index + 1}` }}
                        </p>
                        <p class="mt-1 text-[11px] text-slate-500">
                          {{ item.uploaded_at ? formatDate(item.uploaded_at, { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Pendiente de guardar' }}
                        </p>
                      </div>

                      <button
                        type="button"
                        @click="removeMedia(index)"
                        class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-[#F0D7DD] bg-white text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                        aria-label="Quitar imagen"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <footer class="rounded-[24px] border border-[#E8E1F1] bg-gradient-to-br from-[#FCFBFE] to-white p-4">
                <div class="flex flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-between">
                  <div>
                    <p class="text-sm font-bold text-slate-900">Acciones del seguimiento</p>
                    <p class="mt-1 text-sm leading-6 text-slate-500">
                      Guarda un borrador si aún falta información o márcalo como completado cuando el informe esté listo.
                    </p>
                  </div>

                  <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
                    <button
                      type="button"
                      @click="resetFormFromSelection"
                      class="inline-flex h-11 min-w-[120px] items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#514980] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
                    >
                      Restaurar
                    </button>

                    <button
                      type="button"
                      :disabled="isSaving"
                      @click="saveSelectedFollowUp('draft')"
                      class="inline-flex h-11 min-w-[170px] items-center justify-center rounded-2xl border border-[#CDBBE4] bg-[#F8F4FD] px-5 text-sm font-semibold text-[#5A208E] transition hover:bg-[#F1E9FB] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {{ isSaving ? 'Guardando...' : 'Guardar borrador' }}
                    </button>

                    <button
                      type="submit"
                      :disabled="isSaving"
                      class="inline-flex h-11 min-w-[220px] items-center justify-center rounded-2xl bg-[#6627A3] px-5 text-sm font-semibold text-white transition hover:bg-[#57208D] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {{ isSaving ? 'Guardando...' : 'Marcar como completado' }}
                    </button>
                  </div>
                </div>
              </footer>
            </form>
          </div>

          <div v-else class="py-10 text-center">
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5EFFB] text-xl text-[#5A208E]">
              📋
            </div>
            <h3 class="mt-4 text-lg font-bold text-slate-900">
              Selecciona una reserva
            </h3>
            <p class="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Abre una fila del listado para registrar o editar el seguimiento diario.
            </p>
          </div>
        </section>
      </aside>
    </section>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getStaffReservations } from '@/services/staffReservationsService'
// import {
//   upsertStaffDailyReport,
//   uploadStaffDailyReportMedia,
//   deleteStaffDailyReportMedia,
// } from '@/services/staffFollowUpsService'
import { reservationsMock } from '@/mocks/reservationsMock'
import { getReadableErrorMessage } from '@/utils/errorMessages'
import { uiMessages } from '@/utils/uiMessages'

const route = useRoute()

const messages = uiMessages.staffFollowUps || {
  success: {
    draftSaved: 'Borrador guardado. Puedes completarlo más tarde.',
    completed: 'Seguimiento completado correctamente.',
  },
  errors: {
    load: 'No hemos podido cargar los seguimientos por ahora.',
    save: 'No hemos podido guardar el seguimiento.',
    completeRequiresSummary: 'Añade un resumen para el tutor antes de marcar el seguimiento como completado.',
    saveNotAvailable: 'El guardado real queda pendiente de conectar con backend cuando no uses mocks.',
    mediaPrepare: 'No hemos podido preparar las imágenes seleccionadas.',
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

const followUpStatusOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'pending', label: 'Pendientes' },
  { value: 'draft', label: 'Borradores' },
  { value: 'completed', label: 'Completados' },
]

const serviceFilterOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'daycare', label: 'Guardería' },
]

const isLoading = ref(true)
const isSaving = ref(false)

const loadError = ref('')
const actionError = ref('')
const successMessage = ref('')

const reservations = ref([])

const selectedDate = ref(toInputDate(new Date()))
const searchTerm = ref('')
const followUpStatusFilter = ref('all')
const serviceFilter = ref('all')

const selectedReservationId = ref(null)
const followUpForm = ref(buildEmptyFollowUpForm())

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

onMounted(async () => {
  await loadData()
  hydrateSelectionFromRoute()
})

watch(
  () => route.query,
  () => {
    hydrateSelectionFromRoute()
  },
)

watch(selectedReservationId, () => {
  resetFormFromSelection()
})

watch([selectedDate, searchTerm, followUpStatusFilter, serviceFilter], () => {
  ensureValidSelection()
})

async function loadData() {
  isLoading.value = true
  loadError.value = ''
  actionError.value = ''
  successMessage.value = ''

  try {
    reservations.value = await getStaffReservations()
  } catch (error) {
    console.error(error)
    loadError.value = getReadableErrorMessage(error, messages.errors?.load)
  } finally {
    isLoading.value = false
  }
}

const followUpRows = computed(() => {
  return reservations.value
    .filter((reservation) => shouldAppearInFollowUps(reservation, selectedDate.value))
    .map((reservation) => {
      const report = getReportForDate(reservation, selectedDate.value)
      const pet = reservation.pet || {
        id: reservation.pet_id,
        name: 'Mascota',
        breed: '',
        photo_path: '',
      }

      const serviceKey = getServiceKey(reservation)
      const mediaCount = Array.isArray(report?.media) ? report.media.length : 0
      const statusKey = getReportStatus(report)
      const statusMeta = getFollowUpStatusMeta(statusKey)

      return {
        reservation,
        pet,
        report,
        statusKey,
        statusLabel: statusMeta.label,
        statusClass: statusMeta.class,
        isPending: statusKey === 'pending',
        isDraft: statusKey === 'draft',
        isCompleted: statusKey === 'completed',
        serviceKey,
        mediaCount,
        hotelDayLabel: serviceKey === 'hotel' ? getHotelDayLabel(reservation, selectedDate.value) : '',
        timeLabel: buildTimeLabel(reservation),
        dateHint:
          serviceKey === 'hotel'
            ? `Estancia ${formatDate(reservation.start_at, { day: '2-digit', month: 'short' })} → ${formatDate(reservation.end_at, { day: '2-digit', month: 'short' })}`
            : 'Servicio del día',
      }
    })
})

const filteredRows = computed(() => {
  let items = [...followUpRows.value]

  if (followUpStatusFilter.value !== 'all') {
    items = items.filter((row) => row.statusKey === followUpStatusFilter.value)
  }

  if (serviceFilter.value !== 'all') {
    items = items.filter((row) => row.serviceKey === serviceFilter.value)
  }

  const query = searchTerm.value.trim().toLowerCase()
  if (query) {
    items = items.filter((row) => {
      return (
        row.pet.name?.toLowerCase().includes(query) ||
        row.pet.breed?.toLowerCase().includes(query) ||
        row.reservation.service_name?.toLowerCase().includes(query)
      )
    })
  }

  items.sort((a, b) => {
    const order = { pending: 0, draft: 1, completed: 2 }

    if (a.statusKey !== b.statusKey) {
      return order[a.statusKey] - order[b.statusKey]
    }

    return new Date(a.reservation.start_at).getTime() - new Date(b.reservation.start_at).getTime()
  })

  return items
})

const selectedRow = computed(() => {
  return (
    filteredRows.value.find(
      (row) => Number(row.reservation.id) === Number(selectedReservationId.value),
    ) || null
  )
})

const summaryCards = computed(() => [
  {
    key: 'all',
    label: 'Activas en fecha',
    value: followUpRows.value.length,
    help: 'Reservas que admiten seguimiento en el día elegido.',
    icon: '01',
    iconClass: 'bg-[#F3ECFB] text-[#5A208E]',
  },
  {
    key: 'pending',
    label: 'Pendientes',
    value: followUpRows.value.filter((row) => row.statusKey === 'pending').length,
    help: 'Informes que todavía no se han empezado.',
    icon: '02',
    iconClass: 'bg-amber-50 text-amber-700',
  },
  {
    key: 'draft',
    label: 'Borradores',
    value: followUpRows.value.filter((row) => row.statusKey === 'draft').length,
    help: 'Seguimientos guardados pero pendientes de cerrar.',
    icon: '03',
    iconClass: 'bg-[#FFF0F8] text-[#A22068]',
  },
  {
    key: 'completed',
    label: 'Completados',
    value: followUpRows.value.filter((row) => row.statusKey === 'completed').length,
    help: 'Informes listos para revisión o envío al tutor.',
    icon: '04',
    iconClass: 'bg-emerald-50 text-emerald-700',
  },
])

const selectedDateLabel = computed(() => {
  return formatDate(`${selectedDate.value}T00:00:00`, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
})

const hasActiveFilters = computed(() => {
  return (
    searchTerm.value.trim() !== '' ||
    followUpStatusFilter.value !== 'all' ||
    serviceFilter.value !== 'all' ||
    selectedDate.value !== toInputDate(new Date())
  )
})

const activeFilterPills = computed(() => {
  const pills = []

  if (followUpStatusFilter.value !== 'all') {
    pills.push({
      key: 'status',
      label: followUpStatusOptions.find((option) => option.value === followUpStatusFilter.value)?.label,
    })
  }

  if (serviceFilter.value !== 'all') {
    pills.push({
      key: 'service',
      label: serviceFilterOptions.find((option) => option.value === serviceFilter.value)?.label,
    })
  }

  if (searchTerm.value.trim()) {
    pills.push({ key: 'search', label: `Búsqueda: ${searchTerm.value.trim()}` })
  }

  return pills.filter((pill) => Boolean(pill.label))
})

function hydrateSelectionFromRoute() {
  const queryDate = String(route.query.date || '')
  const queryReservation = Number(route.query.reservation || 0)

  if (queryDate) {
    selectedDate.value = queryDate
  }

  if (queryReservation) {
    selectedReservationId.value = queryReservation
  }

  ensureValidSelection()
}

function ensureValidSelection() {
  if (!filteredRows.value.length) {
    selectedReservationId.value = null
    return
  }

  const exists = filteredRows.value.some(
    (row) => Number(row.reservation.id) === Number(selectedReservationId.value),
  )

  if (!exists) {
    selectedReservationId.value = filteredRows.value[0].reservation.id
  }
}

function clearFilters() {
  selectedDate.value = toInputDate(new Date())
  searchTerm.value = ''
  followUpStatusFilter.value = 'all'
  serviceFilter.value = 'all'
  ensureValidSelection()
}

function moveDate(days) {
  selectedDate.value = addDaysToInputDate(selectedDate.value, days)
}

function goToday() {
  selectedDate.value = toInputDate(new Date())
}

function selectReservation(reservationId) {
  selectedReservationId.value = reservationId
}

function buildEmptyFollowUpForm() {
  return {
    food_done: false,
    walk_done: false,
    rest_done: false,
    hygiene_done: false,
    medication_done: false,
    play_done: false,
    summary: '',
    observations: '',
    media: [],
  }
}

function resetFormFromSelection() {
  if (!selectedRow.value?.report) {
    followUpForm.value = buildEmptyFollowUpForm()
    return
  }

  followUpForm.value = {
    food_done: Boolean(selectedRow.value.report.food_done),
    walk_done: Boolean(selectedRow.value.report.walk_done),
    rest_done: Boolean(selectedRow.value.report.rest_done),
    hygiene_done: Boolean(selectedRow.value.report.hygiene_done),
    medication_done: Boolean(selectedRow.value.report.medication_done),
    play_done: Boolean(selectedRow.value.report.play_done),
    summary: selectedRow.value.report.summary || '',
    observations: selectedRow.value.report.observations || '',
    media: Array.isArray(selectedRow.value.report.media)
      ? selectedRow.value.report.media.map((item) => ({
          ...item,
          local_id: item.local_id || `saved-${item.id}`,
        }))
      : [],
  }
}

function shouldAppearInFollowUps(reservation, dateKey) {
  if (!reservation) return false
  if (reservation.status === 'cancelled' || reservation.status === 'completed') return false

  const serviceKey = getServiceKey(reservation)
  if (serviceKey !== 'hotel' && serviceKey !== 'daycare') return false

  return reservationTouchesDate(reservation, dateKey)
}

function reservationTouchesDate(reservation, dateKey) {
  const dayStart = new Date(`${dateKey}T00:00:00`)
  const dayEnd = new Date(`${dateKey}T23:59:59`)
  const start = new Date(reservation.start_at)
  const end = new Date(reservation.end_at)

  return start <= dayEnd && end >= dayStart
}

function getReportForDate(reservation, dateKey) {
  return (
    (reservation.daily_reports || []).find(
      (report) => normalizeDateKey(report.report_date) === dateKey,
    ) || null
  )
}

function getReportStatus(report) {
  if (!report) return 'pending'
  if (report.status === 'draft') return 'draft'
  if (report.status === 'completed' || report.completed_at) return 'completed'

  // Compatibilidad con informes antiguos del mock/backend que todavía no tengan status.
  return 'completed'
}

function getFollowUpStatusMeta(status) {
  const map = {
    pending: {
      label: 'Pendiente',
      class: 'bg-amber-50 text-amber-700 ring-amber-100',
    },
    draft: {
      label: 'Borrador',
      class: 'bg-[#FFF0F8] text-[#A22068] ring-[#F7CBE1]',
    },
    completed: {
      label: 'Completado',
      class: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    },
  }

  return map[status] || map.pending
}

function getServiceKey(reservation) {
  const bookingMode = reservation.service?.booking_mode

  if (bookingMode === 'date_range') return 'hotel'
  if (bookingMode === 'single_day') return 'daycare'

  const serviceName = String(reservation.service_name || '').toLowerCase()

  if (serviceName.includes('hotel') || serviceName.includes('alojamiento')) return 'hotel'
  if (serviceName.includes('guardería') || serviceName.includes('guarderia')) return 'daycare'

  return 'other'
}

function getHotelDayLabel(reservation, dateKey) {
  const start = new Date(`${normalizeDateKey(reservation.start_at)}T00:00:00`)
  const current = new Date(`${dateKey}T00:00:00`)
  const diff = Math.round((current.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  return `Día ${diff + 1} de estancia`
}

function buildTimeLabel(reservation) {
  return `${formatDate(reservation.start_at, { hour: '2-digit', minute: '2-digit' })} → ${formatDate(reservation.end_at, { hour: '2-digit', minute: '2-digit' })}`
}

async function handleMediaSelection(event) {
  const files = Array.from(event.target.files || [])
  if (!files.length) return

  try {
    const images = files.filter((file) => file.type.startsWith('image/'))
    const parsed = await Promise.all(images.map(readFileAsDataUrl))

    followUpForm.value.media.push(
      ...parsed.map((item) => ({
        local_id: globalThis.crypto?.randomUUID?.() || `local-${Date.now()}-${Math.random()}`,
        id: null,
        daily_report_id: null,
        file_path: item.dataUrl,
        file_type: 'image',
        uploaded_at: new Date().toISOString(),
        name: item.name,
      })),
    )
  } catch (error) {
    console.error(error)
    actionError.value = getReadableErrorMessage(error, messages.errors?.mediaPrepare)
  } finally {
    event.target.value = ''
  }
}

function removeMedia(index) {
  followUpForm.value.media.splice(index, 1)
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve({ name: file.name, dataUrl: reader.result })
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

async function saveSelectedFollowUp(status = 'draft') {
  if (!selectedRow.value) return

  if (status === 'completed' && !followUpForm.value.summary.trim()) {
    actionError.value = messages.errors?.completeRequiresSummary
    successMessage.value = ''
    return
  }

  isSaving.value = true
  actionError.value = ''
  successMessage.value = ''

  try {
    const payload = buildFollowUpPayload(status)

    if (!USE_MOCKS) {
      // Cuando conectemos con Laravel, este bloque sería el punto de sustitución:
      // await upsertStaffDailyReport(selectedRow.value.reservation.id, payload)
      // await loadData()
      throw new Error(
        messages.errors?.saveNotAvailable ||
          'El guardado real queda pendiente de conectar con backend cuando no uses mocks.',
      )
    }

    saveFollowUpInMock(payload)

    // No recargamos los datos en modo mock porque algunos servicios devuelven copias
    // y podrían pisar el estado recién guardado en la interfaz.
    successMessage.value =
      status === 'completed'
        ? messages.success?.completed || 'Seguimiento completado correctamente.'
        : messages.success?.draftSaved || 'Borrador guardado. Puedes completarlo más tarde.'
    selectedReservationId.value = payload.reservation_id
  } catch (error) {
    console.error(error)
    actionError.value = getReadableErrorMessage(error, messages.errors?.save)
  } finally {
    isSaving.value = false
  }
}

function buildFollowUpPayload(status) {
  return {
    reservation_id: selectedRow.value.reservation.id,
    report_date: selectedDate.value,
    status,
    completed_at: status === 'completed' ? new Date().toISOString() : null,
    food_done: Boolean(followUpForm.value.food_done),
    walk_done: Boolean(followUpForm.value.walk_done),
    rest_done: Boolean(followUpForm.value.rest_done),
    hygiene_done: Boolean(followUpForm.value.hygiene_done),
    medication_done: Boolean(followUpForm.value.medication_done),
    play_done: Boolean(followUpForm.value.play_done),
    summary: followUpForm.value.summary?.trim() || '',
    observations: followUpForm.value.observations?.trim() || '',
    media: followUpForm.value.media,
  }
}

function saveFollowUpInMock(payload) {
  const sourceReservations = reservations.value.length ? reservations.value : reservationsMock
  const reservationIndex = sourceReservations.findIndex(
    (item) => Number(item.id) === Number(payload.reservation_id),
  )

  if (reservationIndex === -1) {
    throw new Error('Reserva no encontrada para guardar el seguimiento.')
  }

  const currentReservation = sourceReservations[reservationIndex]
  const currentReports = Array.isArray(currentReservation.daily_reports)
    ? [...currentReservation.daily_reports]
    : []

  const existingIndex = currentReports.findIndex(
    (report) => normalizeDateKey(report.report_date) === payload.report_date,
  )

  const reportId =
    existingIndex >= 0 ? currentReports[existingIndex].id : getNextReportId(sourceReservations)
  let nextMediaId = getNextMediaId(sourceReservations)

  const nextMedia = payload.media.map((item) => {
    const mediaId = item.id || nextMediaId

    if (!item.id) {
      nextMediaId += 1
    }

    return {
      id: mediaId,
      daily_report_id: reportId,
      file_path: item.file_path,
      file_type: item.file_type || 'image',
      uploaded_at: item.uploaded_at || new Date().toISOString(),
      name: item.name || '',
    }
  })

  const nextReport = {
    id: reportId,
    report_date: payload.report_date,
    status: payload.status,
    completed_at: payload.completed_at,
    food_done: payload.food_done,
    walk_done: payload.walk_done,
    rest_done: payload.rest_done,
    hygiene_done: payload.hygiene_done,
    medication_done: payload.medication_done,
    play_done: payload.play_done,
    summary: payload.summary,
    observations: payload.observations,
    media: nextMedia,
  }

  if (existingIndex >= 0) {
    currentReports[existingIndex] = nextReport
  } else {
    currentReports.push(nextReport)
  }

  const updatedReservation = {
    ...currentReservation,
    daily_reports: currentReports,
    updated_at: new Date().toISOString(),
  }

  reservations.value = sourceReservations.map((reservation) =>
    Number(reservation.id) === Number(payload.reservation_id) ? updatedReservation : reservation,
  )

  const mockIndex = reservationsMock.findIndex(
    (item) => Number(item.id) === Number(payload.reservation_id),
  )

  if (mockIndex >= 0) {
    reservationsMock[mockIndex] = {
      ...reservationsMock[mockIndex],
      daily_reports: currentReports,
      updated_at: updatedReservation.updated_at,
    }
  }
}

function getNextReportId(sourceReservations = reservations.value) {
  const allIds = sourceReservations.flatMap((reservation) =>
    Array.isArray(reservation.daily_reports)
      ? reservation.daily_reports.map((report) => Number(report.id) || 0)
      : [],
  )

  return Math.max(0, ...allIds) + 1
}

function getNextMediaId(sourceReservations = reservations.value) {
  const allIds = sourceReservations.flatMap((reservation) =>
    Array.isArray(reservation.daily_reports)
      ? reservation.daily_reports.flatMap((report) =>
          Array.isArray(report.media) ? report.media.map((item) => Number(item.id) || 0) : [],
        )
      : [],
  )

  return Math.max(0, ...allIds) + 1
}

function buildPetLink(row) {
  return `/staff/mascotas/${row.pet.id}`
}

function buildReservationLink(row) {
  return {
    name: 'staff-reservation-detail',
    params: {
      id: row.reservation.id,
    },
  }
}

function getInitial(value) {
  return String(value || 'M').charAt(0).toUpperCase()
}

function normalizeDateKey(value) {
  if (!value) return ''
  return String(value).slice(0, 10)
}

function toInputDate(date) {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = `${d.getMonth() + 1}`.padStart(2, '0')
  const day = `${d.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

function addDaysToInputDate(inputDate, days) {
  const date = new Date(`${inputDate}T00:00:00`)
  date.setDate(date.getDate() + days)
  return toInputDate(date)
}

function formatDate(dateValue, options = {}) {
  return new Intl.DateTimeFormat('es-ES', options).format(new Date(dateValue))
}
</script>

<style scoped>
.font-ladralab-brush {
  font-family: 'Caveat Brush', 'Brush Script MT', 'Segoe Script', cursive;
  font-weight: 700;
}
</style>
