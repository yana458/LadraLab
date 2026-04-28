<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const route = useRoute()

const usesDashboardLayout = computed(() => route.meta.layout === 'dashboard')
</script>

<template>
  <DashboardLayout v-if="usesDashboardLayout">
    <RouterView />
  </DashboardLayout>

  <RouterView v-else />
</template>