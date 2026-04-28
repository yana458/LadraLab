<script setup>
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

function goToMyPanel() {
  router.push(authStore.getDefaultRouteByRole())
}
</script>

<template>
  <div class="flex min-h-[70vh] items-center justify-center px-6 py-10">
    <div class="w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl">
        🚫
      </div>

      <h1 class="mt-6 text-3xl font-bold text-slate-900">Acceso no permitido</h1>
      <p class="mt-3 text-slate-600">
        Has intentado entrar en una ruta que no corresponde con tu rol actual.
      </p>

      <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          class="rounded-2xl bg-[#6d4ae6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5c3dd0]"
          @click="goToMyPanel"
        >
          Ir a mi panel
        </button>

        <RouterLink
          to="/login"
          class="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Volver al login
        </RouterLink>
      </div>
    </div>
  </div>
</template>