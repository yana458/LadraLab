<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const title = computed(() => route.meta.title || 'Próximamente')
const description = computed(
  () => route.meta.description || 'Esta pantalla todavía no está implementada.',
)
</script>

<template>
  <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
    <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[#7c5cf0]">
      LadraLab
    </p>
    <h1 class="mt-3 text-3xl font-bold text-slate-900">{{ title }}</h1>
    <p class="mt-3 max-w-2xl text-slate-600">{{ description }}</p>

    <div class="mt-8 rounded-3xl bg-[#f8f4ff] p-6">
      <p class="font-semibold text-[#6d4ae6]">Siguiente paso recomendado</p>
      <p class="mt-2 text-sm text-slate-700">
        Aquí ya puedes montar el componente real de este módulo manteniendo la protección por rol desde el router.
      </p>
    </div>
  </div>
</template>