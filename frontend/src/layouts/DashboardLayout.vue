<template>
  <div class="min-h-screen bg-slate-50 flex">
    <aside class="w-64 bg-white border-r border-slate-200 p-6">
      <h1 class="text-2xl font-bold text-violet-700 mb-8">LadraLab</h1>

      <nav class="space-y-3">
        <RouterLink to="/dashboard" class="block hover:text-violet-700">Dashboard</RouterLink>
        <RouterLink to="/mis-mascotas" class="block hover:text-violet-700">Mis mascotas</RouterLink>
        <RouterLink to="/mis-reservas" class="block hover:text-violet-700">Mis reservas</RouterLink>
      </nav>
    </aside>

    <main class="flex-1 p-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>