<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import AuthLayout from './layouts/AuthLayout.vue'
import DashboardLayout from './layouts/DashboardLayout.vue'

const route = useRoute()

const layoutComponent = computed(() => {
  const layout = route.meta.layout || 'dashboard'

  const layouts = {
    auth: AuthLayout,
    dashboard: DashboardLayout,
  }

  return layouts[layout] || DashboardLayout
})
</script>