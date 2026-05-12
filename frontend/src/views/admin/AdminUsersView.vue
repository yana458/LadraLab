<template>
  <section class="relative">
    <div class="pointer-events-none fixed right-6 top-6 z-[70] flex w-full max-w-md flex-col gap-3">
      <div
        v-if="toast.message"
        class="pointer-events-auto rounded-2xl border px-4 py-3 text-sm shadow-lg"
        :class="toast.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-red-200 bg-red-50 text-red-700'"
      >
        <div class="flex items-start gap-3">
          <span class="mt-0.5 text-base">{{ toast.type === 'success' ? '✓' : '⚠️' }}</span>
          <div>
            <p class="font-bold">{{ toast.title }}</p>
            <p class="mt-1">{{ toast.message }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl space-y-6">
      <template v-if="isLoading">
        <section
          class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#4B167D] via-[#7426A8] to-[#E02890] p-6 text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
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
        <header
          class="overflow-hidden rounded-[30px] border border-[#E7E0F1] bg-gradient-to-r from-[#4B167D] via-[#7426A8] to-[#E02890] text-white shadow-[0_24px_70px_-30px_rgba(90,32,142,0.58)]"
        >
          <div class="flex min-h-[382px] flex-col p-5 sm:p-6 lg:p-7">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div class="min-w-0 max-w-4xl">
                <h1 class="font-ladralab-brush text-5xl leading-none tracking-tight sm:text-6xl">
                  Usuarios
                </h1>

                <p class="mt-4 max-w-2xl text-sm font-semibold leading-7 text-white/90 sm:text-base">
                  Gestión de accesos, roles y estado de las cuentas del centro.
                </p>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
                <RouterLink
                  :to="{ name: 'admin-dashboard' }"
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

                <button
                  type="button"
                  @click="openCreateModal"
                  class="inline-flex h-11 items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:bg-[#F8F2FF]"
                >
                  Nuevo usuario
                </button>

                <RouterLink
                  :to="{ name: 'staff-followups' }"
                  class="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Seguimientos
                </RouterLink>
              </div>
            </div>

            <div class="mt-6 grid items-stretch gap-4 sm:grid-cols-2 xl:mt-auto xl:grid-cols-4">
              <button
                v-for="card in summaryCards"
                :key="card.key"
                type="button"
                @click="applySummaryFilter(card.key)"
                class="flex h-full min-h-[152px] flex-col rounded-[24px] border p-4 text-left backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-lg"
                :class="
                  activeSummary === card.key
                    ? 'border-white/30 bg-white/20 ring-4 ring-white/15'
                    : 'border-white/16 bg-white/12'
                "
              >
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-sm font-medium text-white/85">{{ card.label }}</p>
                    <p class="mt-2 text-3xl font-bold leading-none text-white">{{ card.value }}</p>
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

        <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
          <div class="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <h2 class="text-2xl font-bold text-slate-950">Listado de usuarios</h2>
              <p class="mt-2 text-sm leading-6 text-slate-500">
                Busca por nombre, correo o teléfono y filtra por rol o estado.
              </p>
            </div>

            <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(240px,1fr)_180px_180px_auto] xl:min-w-[780px]">
              <label class="block">
                <span class="sr-only">Buscar usuario</span>
                <input
                  v-model.trim="filters.search"
                  type="search"
                  placeholder="Buscar usuario..."
                  class="h-11 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#B9A6D8] focus:ring-4 focus:ring-[#F1E9FB]"
                />
              </label>

              <label class="block">
                <span class="sr-only">Rol</span>
                <select
                  v-model="filters.role"
                  class="h-11 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#B9A6D8] focus:ring-4 focus:ring-[#F1E9FB]"
                >
                  <option value="all">Todos los roles</option>
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="client">Cliente</option>
                </select>
              </label>

              <label class="block">
                <span class="sr-only">Estado</span>
                <select
                  v-model="filters.status"
                  class="h-11 w-full rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#B9A6D8] focus:ring-4 focus:ring-[#F1E9FB]"
                >
                  <option value="all">Todos</option>
                  <option value="active">Activos</option>
                  <option value="inactive">Desactivados</option>
                </select>
              </label>

              <button
                type="button"
                @click="clearFilters"
                class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-4 text-sm font-semibold text-[#5A208E] transition hover:border-[#B9A6D8] hover:bg-[#F6F1FB]"
              >
                Limpiar
              </button>
            </div>
          </div>
        </section>

        <section class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(300px,0.34fr)]">
          <main class="space-y-4">
            <div class="hidden overflow-hidden rounded-[28px] border border-[#E8E1F1] bg-white shadow-sm lg:block">
              <table class="w-full table-fixed divide-y divide-[#EEE7F6]">
                <thead class="bg-[#FCFBFE]">
                  <tr>
                    <th class="w-[34%] px-4 py-4 text-left text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Usuario</th>
                    <th class="w-[12%] px-3 py-4 text-left text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Rol</th>
                    <th class="w-[14%] px-3 py-4 text-left text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Estado</th>
                    <th class="w-[14%] px-3 py-4 text-left text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Último acceso</th>
                    <th class="w-[26%] px-4 py-4 text-right text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Acciones</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#F1ECF7]">
                  <tr v-for="user in filteredUsers" :key="user.id" class="transition hover:bg-[#FCFBFE]">
                    <td class="px-4 py-4">
                      <div class="flex min-w-0 items-center gap-3">
                        <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold" :class="getAvatarClass(user.role)">
                          {{ getInitials(user.name) }}
                        </div>
                        <div class="min-w-0">
                          <p class="font-bold text-slate-950">{{ user.name }}</p>
                          <p class="mt-1 truncate text-sm text-slate-500">{{ user.email }}</p>
                          <p v-if="user.phone" class="mt-1 text-xs font-semibold text-slate-400">{{ user.phone }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-3 py-4">
                      <span class="rounded-full px-3 py-1 text-xs font-bold" :class="getRoleClass(user.role)">
                        {{ getRoleLabel(user.role) }}
                      </span>
                    </td>
                    <td class="px-3 py-4">
                      <span class="rounded-full px-3 py-1 text-xs font-bold" :class="getStatusClass(user.status)">
                        {{ getUserStatusLabel(user.status) }}
                      </span>
                    </td>
                    <td class="px-3 py-4 text-sm font-semibold leading-5 text-slate-500">
                      {{ formatDate(user.last_login_at) }}
                    </td>
                    <td class="px-4 py-4">
                      <div class="flex items-center justify-end gap-1.5">
                        <RouterLink
                          :to="{ path: `/admin/usuarios/${user.id}` }"
                          class="inline-flex h-9 min-w-[76px] items-center justify-center whitespace-nowrap rounded-2xl bg-[#6627A3] px-3 text-[11px] font-semibold text-white transition hover:bg-[#57208D]"
                        >
                          Ver perfil
                        </RouterLink>
                        <button
                          type="button"
                          @click="openEditModal(user)"
                          class="inline-flex h-9 min-w-[62px] items-center justify-center whitespace-nowrap rounded-2xl border border-[#D9CEE8] bg-white px-3 text-[11px] font-semibold text-[#5A208E] transition hover:bg-[#F6F1FB]"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          @click="toggleUserStatus(user)"
                          :disabled="isSubmitting"
                          class="inline-flex h-9 min-w-[86px] items-center justify-center whitespace-nowrap rounded-2xl px-3 text-[11px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
                          :class="user.status === 'active' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'"
                        >
                          {{ user.status === 'active' ? 'Desactivar' : 'Activar' }}
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="grid gap-4 lg:hidden">
              <article
                v-for="user in filteredUsers"
                :key="user.id"
                class="rounded-[26px] border border-[#E8E1F1] bg-white p-5 shadow-sm"
              >
                <div class="flex items-start gap-4">
                  <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold" :class="getAvatarClass(user.role)">
                    {{ getInitials(user.name) }}
                  </div>
                  <div class="min-w-0 flex-1">
                    <h3 class="font-bold text-slate-950">{{ user.name }}</h3>
                    <p class="mt-1 break-words text-sm text-slate-500">{{ user.email }}</p>
                    <div class="mt-3 flex flex-wrap gap-2">
                      <span class="rounded-full px-3 py-1 text-xs font-bold" :class="getRoleClass(user.role)">
                        {{ getRoleLabel(user.role) }}
                      </span>
                      <span class="rounded-full px-3 py-1 text-xs font-bold" :class="getStatusClass(user.status)">
                        {{ getUserStatusLabel(user.status) }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="mt-5 flex flex-wrap gap-2">
                  <RouterLink
                    :to="{ path: `/admin/usuarios/${user.id}` }"
                    class="inline-flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-2xl bg-[#6627A3] px-4 text-xs font-semibold text-white transition hover:bg-[#57208D]"
                  >
                    Ver perfil
                  </RouterLink>
                  <button
                    type="button"
                    @click="openEditModal(user)"
                    class="inline-flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-2xl border border-[#D9CEE8] bg-white px-4 text-xs font-semibold text-[#5A208E] transition hover:bg-[#F6F1FB]"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    @click="toggleUserStatus(user)"
                    :disabled="isSubmitting"
                    class="inline-flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-2xl px-4 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
                    :class="user.status === 'active' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'"
                  >
                    {{ user.status === 'active' ? 'Desactivar' : 'Activar' }}
                  </button>
                </div>
              </article>
            </div>

            <div
              v-if="!filteredUsers.length"
              class="rounded-[28px] border border-dashed border-[#D9CEE8] bg-white px-5 py-10 text-center shadow-sm"
            >
              <p class="text-lg font-bold text-slate-950">No hay usuarios con esos filtros</p>
              <p class="mt-2 text-sm text-slate-500">Prueba a limpiar la búsqueda o cambiar el estado.</p>
            </div>
          </main>

          <aside class="space-y-6 xl:sticky xl:top-6 xl:self-start">
            <section class="rounded-[28px] border border-[#E8E1F1] bg-white p-5 shadow-sm sm:p-6">
              <h2 class="text-2xl font-bold text-slate-950">Roles</h2>
              <p class="mt-2 text-sm leading-6 text-slate-500">
                Distribución actual de cuentas.
              </p>

              <div class="mt-6 space-y-3">
                <button
                  v-for="role in roleCards"
                  :key="role.key"
                  type="button"
                  @click="filters.role = role.key"
                  class="flex w-full items-center justify-between gap-4 rounded-[20px] border p-4 text-left transition hover:border-[#D7C6EA] hover:bg-white"
                  :class="filters.role === role.key ? 'border-[#D7B4EA] bg-[#F8F1FB] ring-2 ring-[#F1E0F7]' : 'border-[#E8E1F1] bg-[#FCFBFE]'"
                >
                  <div>
                    <p class="font-bold text-slate-950">{{ role.label }}</p>
                    <p class="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                      {{ role.note }}
                    </p>
                  </div>
                  <span class="text-2xl font-bold text-[#6627A3]">{{ role.value }}</span>
                </button>
              </div>
            </section>
          </aside>
        </section>
      </template>
    </div>

    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/40 px-4 py-6 backdrop-blur-sm"
      @click.self="closeModal"
    >
      <form
        class="w-full max-w-2xl overflow-hidden rounded-[30px] border border-[#E8E1F1] bg-white shadow-2xl"
        @submit.prevent="saveUser"
      >
        <div class="border-b border-[#EEE7F6] bg-[#FCFBFE] p-5 sm:p-6">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#9D7BC2]">
                {{ editingUserId ? 'Editar cuenta' : 'Nuevo usuario del equipo' }}
              </p>
              <h2 class="mt-2 text-2xl font-bold text-slate-950">
                {{ editingUserId ? 'Actualizar usuario' : 'Crear usuario' }}
              </h2>
              <p class="mt-2 text-sm leading-6 text-slate-500">
                {{ editingUserId ? 'Actualiza datos básicos, rol y estado de acceso.' : 'El alta desde administración está pensada para crear cuentas de admin o staff.' }}
              </p>
            </div>
            <button
              type="button"
              @click="closeModal"
              class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white text-lg font-bold text-slate-500 transition hover:bg-[#F6F1FB]"
            >
              ×
            </button>
          </div>
        </div>

        <div class="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
          <label class="block sm:col-span-2">
            <span class="text-sm font-bold text-slate-700">Nombre</span>
            <input
              v-model.trim="form.name"
              required
              type="text"
              class="mt-2 h-11 w-full rounded-2xl border border-[#D9CEE8] px-4 text-sm font-semibold text-slate-700 outline-none focus:border-[#B9A6D8] focus:ring-4 focus:ring-[#F1E9FB]"
            />
            <p v-if="formErrors.name" class="mt-2 text-xs font-semibold text-red-600">{{ formErrors.name }}</p>
          </label>

          <label class="block">
            <span class="text-sm font-bold text-slate-700">Email</span>
            <input
              v-model.trim="form.email"
              required
              type="email"
              class="mt-2 h-11 w-full rounded-2xl border border-[#D9CEE8] px-4 text-sm font-semibold text-slate-700 outline-none focus:border-[#B9A6D8] focus:ring-4 focus:ring-[#F1E9FB]"
            />
            <p v-if="formErrors.email" class="mt-2 text-xs font-semibold text-red-600">{{ formErrors.email }}</p>
          </label>

          <label class="block">
            <span class="text-sm font-bold text-slate-700">Teléfono</span>
            <input
              v-model.trim="form.phone"
              type="tel"
              class="mt-2 h-11 w-full rounded-2xl border border-[#D9CEE8] px-4 text-sm font-semibold text-slate-700 outline-none focus:border-[#B9A6D8] focus:ring-4 focus:ring-[#F1E9FB]"
            />
            <p v-if="formErrors.phone" class="mt-2 text-xs font-semibold text-red-600">{{ formErrors.phone }}</p>
          </label>

          <label class="block">
            <span class="text-sm font-bold text-slate-700">Rol</span>
            <select
              v-model="form.role"
              class="mt-2 h-11 w-full rounded-2xl border border-[#D9CEE8] px-4 text-sm font-semibold text-slate-700 outline-none focus:border-[#B9A6D8] focus:ring-4 focus:ring-[#F1E9FB]"
            >
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option v-if="editingUserId" value="client">Cliente</option>
            </select>
            <p v-if="formErrors.role" class="mt-2 text-xs font-semibold text-red-600">{{ formErrors.role }}</p>
          </label>

          <label class="block">
            <span class="text-sm font-bold text-slate-700">Estado</span>
            <select
              v-model="form.status"
              class="mt-2 h-11 w-full rounded-2xl border border-[#D9CEE8] px-4 text-sm font-semibold text-slate-700 outline-none focus:border-[#B9A6D8] focus:ring-4 focus:ring-[#F1E9FB]"
            >
              <option value="active">Activo</option>
              <option value="inactive">Desactivado</option>
            </select>
            <p v-if="formErrors.is_active" class="mt-2 text-xs font-semibold text-red-600">{{ formErrors.is_active }}</p>
          </label>

          <label v-if="!editingUserId" class="block sm:col-span-2">
            <span class="text-sm font-bold text-slate-700">Contraseña temporal</span>
            <input
              v-model="form.password"
              required
              type="password"
              minlength="6"
              autocomplete="new-password"
              class="mt-2 h-11 w-full rounded-2xl border border-[#D9CEE8] px-4 text-sm font-semibold text-slate-700 outline-none focus:border-[#B9A6D8] focus:ring-4 focus:ring-[#F1E9FB]"
            />
            <p class="mt-2 text-xs leading-5 text-slate-500">
              Mínimo 6 caracteres. La cuenta creada desde administración debe ser de admin o staff.
            </p>
            <p v-if="formErrors.password" class="mt-2 text-xs font-semibold text-red-600">{{ formErrors.password }}</p>
          </label>
        </div>

        <div class="flex flex-col-reverse gap-3 border-t border-[#EEE7F6] bg-[#FCFBFE] p-5 sm:flex-row sm:justify-end sm:p-6">
          <button
            type="button"
            @click="closeModal"
            class="inline-flex h-11 items-center justify-center rounded-2xl border border-[#D9CEE8] bg-white px-5 text-sm font-semibold text-[#514980] transition hover:bg-[#F6F1FB]"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="inline-flex h-11 items-center justify-center rounded-2xl bg-[#6627A3] px-5 text-sm font-semibold text-white transition hover:bg-[#57208D] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ isSubmitting ? 'Guardando...' : editingUserId ? 'Guardar cambios' : 'Crear usuario' }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  apiRequest,
  normalizeCollectionResponse,
  normalizeSingleResponse,
} from '@/services/apiClient'
import { getReadableErrorMessage, getValidationErrors } from '@/utils/errorMessages'

const route = useRoute()

const isLoading = ref(true)
const isSubmitting = ref(false)
const users = ref([])
const isModalOpen = ref(false)
const editingUserId = ref(null)
const activeSummary = ref('total')

const toast = reactive({ title: '', message: '', type: 'success' })
const formErrors = reactive({})

const initialStatus = typeof route.query.status === 'string' ? route.query.status : 'all'

const filters = reactive({
  search: '',
  role: 'all',
  status: ['active', 'inactive'].includes(initialStatus) ? initialStatus : 'all',
})

const form = reactive({
  name: '',
  email: '',
  phone: '',
  role: 'staff',
  status: 'active',
  password: '',
})

onMounted(() => {
  loadUsers()
})

async function loadUsers() {
  isLoading.value = true

  try {
    const data = await apiRequest('/api/admin/users', {
      method: 'GET',
    })

    users.value = normalizeCollectionResponse(data).map(normalizeUser)
  } catch (error) {
    console.error(error)
    showToast(
      'No se pudieron cargar los usuarios',
      getReadableErrorMessage(error, 'No hemos podido cargar los usuarios del centro por ahora.'),
      'error',
    )
  } finally {
    isLoading.value = false
  }
}

function normalizeUser(user = {}) {
  const role = normalizeRole(user.role)
  const isActive = Boolean(user.is_active ?? user.status === 'active')

  return {
    id: user.id,
    name: user.name ?? '',
    email: user.email ?? '',
    phone: user.phone ?? '',
    role,
    status: isActive ? 'active' : 'inactive',
    is_active: isActive,
    last_login_at: user.last_login_at ?? null,
    created_at: user.created_at ?? null,
    updated_at: user.updated_at ?? null,
  }
}

function normalizeRole(role) {
  if (role === 'cliente') return 'client'
  return role || 'client'
}

function buildCreatePayload() {
  return {
    name: form.name,
    email: form.email,
    password: form.password,
    phone: form.phone || null,
    role: form.role,
    is_active: form.status === 'active',
  }
}

function buildUpdatePayload() {
  return {
    name: form.name,
    email: form.email,
    phone: form.phone || null,
    role: form.role,
    is_active: form.status === 'active',
  }
}

async function createAdminUser() {
  const data = await apiRequest('/api/admin/users', {
    method: 'POST',
    body: buildCreatePayload(),
  })

  return normalizeUser(normalizeSingleResponse(data))
}

async function updateAdminUser(id, payload = buildUpdatePayload()) {
  const data = await apiRequest(`/api/admin/users/${id}`, {
    method: 'PATCH',
    body: payload,
  })

  return normalizeUser(normalizeSingleResponse(data))
}

const summaryCards = computed(() => [
  {
    key: 'total',
    label: 'Usuarios',
    value: users.value.length,
    help: 'Cuentas registradas en la plataforma.',
    icon: '01',
    iconClass: 'bg-white text-[#5A208E]',
  },
  {
    key: 'active',
    label: 'Activos',
    value: users.value.filter((user) => user.status === 'active').length,
    help: 'Usuarios que pueden acceder.',
    icon: '02',
    iconClass: 'bg-emerald-50 text-emerald-700',
  },
  {
    key: 'team',
    label: 'Equipo',
    value: users.value.filter((user) => ['admin', 'staff'].includes(user.role)).length,
    help: 'Administración y personal del centro.',
    icon: '03',
    iconClass: 'bg-[#FCE7F3] text-[#B31470]',
  },
  {
    key: 'inactive',
    label: 'Desactivados',
    value: users.value.filter((user) => user.status === 'inactive').length,
    help: 'Cuentas sin acceso actualmente.',
    icon: '04',
    iconClass: 'bg-slate-100 text-slate-600',
  },
])

const filteredUsers = computed(() => {
  const search = filters.search.toLowerCase()

  return users.value.filter((user) => {
    const matchesSearch = !search || [user.name, user.email, user.phone].some((value) => String(value || '').toLowerCase().includes(search))
    const matchesRole = filters.role === 'all' || user.role === filters.role
    const matchesStatus = filters.status === 'all' || user.status === filters.status

    return matchesSearch && matchesRole && matchesStatus
  })
})

const roleCards = computed(() => [
  {
    key: 'all',
    label: 'Todos',
    note: 'Vista completa',
    value: users.value.length,
  },
  {
    key: 'admin',
    label: 'Admin',
    note: 'Gestión completa',
    value: users.value.filter((user) => user.role === 'admin').length,
  },
  {
    key: 'staff',
    label: 'Staff',
    note: 'Operativa diaria',
    value: users.value.filter((user) => user.role === 'staff').length,
  },
  {
    key: 'client',
    label: 'Clientes',
    note: 'Tutores registrados',
    value: users.value.filter((user) => user.role === 'client').length,
  },
])

function applySummaryFilter(key) {
  activeSummary.value = key

  if (key === 'total') {
    filters.status = 'all'
    filters.role = 'all'
  }

  if (key === 'active') {
    filters.status = 'active'
    filters.role = 'all'
  }

  if (key === 'inactive') {
    filters.status = 'inactive'
    filters.role = 'all'
  }

  if (key === 'team') {
    filters.status = 'all'
    filters.role = 'all'
  }
}

function openCreateModal() {
  editingUserId.value = null
  clearFormErrors()
  Object.assign(form, {
    name: '',
    email: '',
    phone: '',
    role: 'staff',
    status: 'active',
    password: '',
  })
  isModalOpen.value = true
}

function openEditModal(user) {
  editingUserId.value = user.id
  clearFormErrors()
  Object.assign(form, {
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    role: user.role,
    status: user.status,
    password: '',
  })
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  clearFormErrors()
}

async function saveUser() {
  isSubmitting.value = true
  clearFormErrors()

  try {
    if (editingUserId.value) {
      const updatedUser = await updateAdminUser(editingUserId.value)

      users.value = users.value.map((user) =>
        Number(user.id) === Number(editingUserId.value) ? updatedUser : user,
      )

      showToast('Usuario actualizado', 'Los cambios se han guardado correctamente.', 'success')
    } else {
      const createdUser = await createAdminUser()

      users.value = [createdUser, ...users.value]

      showToast('Usuario creado', 'La cuenta se ha añadido correctamente.', 'success')
    }

    closeModal()
  } catch (error) {
    console.error(error)
    assignFormErrors(getValidationErrors(error))
    showToast(
      'No se pudo guardar',
      getReadableErrorMessage(error, 'Revisa los datos e inténtalo de nuevo.'),
      'error',
    )
  } finally {
    isSubmitting.value = false
  }
}

async function toggleUserStatus(user) {
  const nextStatus = user.status === 'active' ? 'inactive' : 'active'

  isSubmitting.value = true

  try {
    const updatedUser = await updateAdminUser(user.id, {
      is_active: nextStatus === 'active',
    })

    users.value = users.value.map((item) =>
      Number(item.id) === Number(user.id) ? updatedUser : item,
    )

    showToast(
      nextStatus === 'active' ? 'Usuario activado' : 'Usuario desactivado',
      nextStatus === 'active' ? 'La cuenta vuelve a tener acceso.' : 'La cuenta queda sin acceso.',
      'success',
    )
  } catch (error) {
    console.error(error)
    showToast(
      'No se pudo cambiar el estado',
      getReadableErrorMessage(error, 'No hemos podido actualizar el estado del usuario.'),
      'error',
    )
  } finally {
    isSubmitting.value = false
  }
}

function clearFilters() {
  filters.search = ''
  filters.role = 'all'
  filters.status = 'all'
  activeSummary.value = 'total'
}

function showToast(title, message, type = 'success') {
  toast.title = title
  toast.message = message
  toast.type = type

  window.setTimeout(() => {
    toast.title = ''
    toast.message = ''
    toast.type = 'success'
  }, 3200)
}

function clearFormErrors() {
  Object.keys(formErrors).forEach((key) => {
    delete formErrors[key]
  })
}

function assignFormErrors(errors = {}) {
  clearFormErrors()

  Object.entries(errors).forEach(([key, value]) => {
    formErrors[key] = Array.isArray(value) ? value[0] : value
  })
}

function getRoleLabel(role) {
  const labels = {
    admin: 'Admin',
    staff: 'Staff',
    client: 'Cliente',
    cliente: 'Cliente',
  }

  return labels[role] || role
}

function getRoleClass(role) {
  const classes = {
    admin: 'bg-[#F1E9FB] text-[#6627A3]',
    staff: 'bg-pink-50 text-[#B31470]',
    client: 'bg-slate-100 text-slate-600',
    cliente: 'bg-slate-100 text-slate-600',
  }

  return classes[role] || 'bg-slate-100 text-slate-600'
}

function getAvatarClass(role) {
  const classes = {
    admin: 'bg-[#F1E9FB] text-[#6627A3]',
    staff: 'bg-pink-50 text-[#B31470]',
    client: 'bg-slate-100 text-slate-600',
    cliente: 'bg-slate-100 text-slate-600',
  }

  return classes[role] || 'bg-slate-100 text-slate-600'
}

function getStatusClass(status) {
  return status === 'active'
    ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
    : 'bg-slate-100 text-slate-600 ring-1 ring-slate-200'
}

function getUserStatusLabel(status) {
  return status === 'active' ? 'Activo' : 'Desactivado'
}

function getInitials(name) {
  return String(name || 'U')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

function formatDate(value) {
  if (!value) return 'Sin acceso reciente'

  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}
</script>

<style scoped>
.font-ladralab-brush {
  font-family: 'Caveat Brush', 'Brush Script MT', 'Segoe Script', cursive;
  font-weight: 700;
}
</style>
