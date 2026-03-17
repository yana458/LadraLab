import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import MascotasView from '@/views/mascotas/MascotasView.vue'
import ReservasView from '@/views/reservas/ReservasView.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { layout: 'auth' },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { layout: 'auth' },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { layout: 'dashboard' },
  },
  {
    path: '/mis-mascotas',
    name: 'mascotas',
    component: MascotasView,
    meta: { layout: 'dashboard' },
  },
  {
    path: '/mis-reservas',
    name: 'reservas',
    component: ReservasView,
    meta: { layout: 'dashboard' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router