import { createRouter, createWebHistory } from 'vue-router'
import { pinia } from '@/stores'
import { useAuthStore } from '@/stores/auth'

const LoginView = () => import('@/views/auth/LoginView.vue')
const RegisterView = () => import('@/views/auth/RegisterView.vue')
const LandingView = () => import('@/views/public/LandingView.vue')
const UnauthorizedView = () => import('@/views/common/UnauthorizedView.vue')

const ClientDashboardView = () => import('@/views/dashboard/ClientDashboardView.vue')
const StaffDashboardView = () => import('@/views/dashboard/StaffDashboardView.vue')
const AdminDashboardView = () => import('@/views/dashboard/AdminDashboardView.vue')

const MyProfileView = () => import('@/views/client/MyProfileView.vue')
const MyPetsView = () => import('@/views/client/MyPetsView.vue')
const MyPetDetailView = () => import('@/views/client/MyPetDetailView.vue')
const MyPetEditView = () => import('@/views/client/MyPetEditView.vue')
const MyReservationsView = () => import('@/views/client/MyReservationsView.vue')
const NewReservationView = () => import('@/views/client/NewReservationView.vue')

const UsersView = () => import('@/views/admin/AdminUsersView.vue')

const PetsView = () => import('@/views/pets/PetsView.vue')
const PetsDetailView = () => import('@/views/pets/PetsDetailView.vue')

const StaffReservationsView = () => import('@/views/staff/StaffReservationsView.vue')
const StaffResourcesView = () => import('@/views/staff/StaffResourcesView.vue')
const StaffFollowUpsView = () => import('@/views/staff/StaffFollowUpsView.vue')

const routes = [
  {
    path: '/',
    name: 'landing',
    component: () => import('@/views/public/LandingView.vue'),
    meta: { layout: 'empty' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { layout: 'empty' },
  },
  {
    path: '/registro',
    name: 'register',
    component: () => import('@/views/auth/RegisterView.vue'),
    meta: { layout: 'empty' },
  },
  {
    path: '/recuperar-contrasena',
    name: 'forgot-password',
    component: () => import('@/views/auth/ForgotPasswordView.vue'),
    meta: { layout: 'empty' },
  },

  {
    path: '/dashboard',
    redirect: () => {
      const authStore = useAuthStore(pinia)
      authStore.hydrate()
      return authStore.getDefaultRouteByRole()
    },
  },

  {
    path: '/dashboard/cliente',
    name: 'client-dashboard',
    component: ClientDashboardView,
    meta: {
      layout: 'dashboard',
      requiresAuth: true,
      roles: ['cliente'],
      title: 'Panel del cliente',
    },
  },
  {
    path: '/dashboard/staff',
    name: 'staff-dashboard',
    component: StaffDashboardView,
    meta: {
      layout: 'dashboard',
      requiresAuth: true,
      roles: ['staff'],
      title: 'Panel del staff',
    },
  },
  {
    path: '/dashboard/admin',
    name: 'admin-dashboard',
    component: AdminDashboardView,
    meta: {
      layout: 'dashboard',
      requiresAuth: true,
      roles: ['admin'],
      title: 'Panel de administración',
    },
  },

  {
    path: '/mi-perfil',
    name: 'my-profile',
    component: MyProfileView,
    meta: {
      layout: 'dashboard',
      requiresAuth: true,
      roles: ['cliente'],
      title: 'Mi perfil',
      description: 'Gestiona los datos de tu cuenta',
    },
  },
  {
    path: '/mis-mascotas',
    name: 'my-pets',
    component: MyPetsView,
    meta: {
      layout: 'dashboard',
      requiresAuth: true,
      roles: ['cliente'],
      title: 'Mis mascotas',
      description: 'Gestiona las fichas de tus mascotas',
    },
  },
  {
    path: '/mis-mascotas/:id/editar',
    name: 'my-pet-edit',
    component: MyPetEditView,
    props: true,
    meta: {
      layout: 'dashboard',
      requiresAuth: true,
      roles: ['cliente'],
      title: 'Editar mascota',
      description: 'Edita la ficha de tu mascota',
    },
  },
  {
    path: '/mis-mascotas/:id',
    name: 'my-pet-detail',
    component: MyPetDetailView,
    props: true,
    meta: {
      layout: 'dashboard',
      requiresAuth: true,
      roles: ['cliente'],
      title: 'Ficha de mascota',
      description: 'Consulta la ficha de tu mascota',
    },
  },
  {
    path: '/mis-reservas',
    name: 'my-reservations',
    component: MyReservationsView,
    meta: {
      layout: 'dashboard',
      requiresAuth: true,
      roles: ['cliente'],
      title: 'Mis reservas',
      description: 'Consulta tus reservas',
    },
  },
  {
    path: '/mis-reservas/nueva',
    name: 'my-reservations-new',
    component: NewReservationView,
    meta: {
      layout: 'dashboard',
      requiresAuth: true,
      roles: ['cliente'],
      title: 'Nueva reserva',
      description: 'Solicita una nueva reserva',
    },
  },
  {
    path: '/mis-seguimientos',
    name: 'my-followups',
    component: () => import('@/views/client/MyFollowUpsView.vue'),
    meta: {
      layout: 'dashboard',
      requiresAuth: true,
      roles: ['cliente'],
    },
  },

  {
    path: '/staff/mascotas',
    name: 'staff-pets',
    component: PetsView,
    meta: {
      layout: 'dashboard',
      requiresAuth: true,
      roles: ['staff', 'admin'],
      title: 'Mascotas',
      description: 'Gestión interna de mascotas del centro.',
    },
  },
  {
    path: '/staff/mascotas/:id',
    name: 'staff-pet-detail',
    component: PetsDetailView,
    props: true,
    meta: {
      layout: 'dashboard',
      requiresAuth: true,
      roles: ['staff', 'admin'],
      title: 'Ficha de mascota',
      description: 'Ficha interna de la mascota y sus seguimientos.',
    },
  },
  {
    path: '/staff/reservas',
    name: 'staff-reservations',
    component: StaffReservationsView,
    meta: {
      layout: 'dashboard',
      requiresAuth: true,
      roles: ['staff', 'admin'],
      title: 'Reservas',
      description: 'Gestión interna de reservas.',
    },
  },
  {
    path: '/staff/reservas/:id',
    name: 'staff-reservation-detail',
    component: () => import('@/views/staff/StaffReservationDetailView.vue'),
    meta: {
      layout: 'dashboard',
      requiresAuth: true,
      roles: ['staff', 'admin'],
    },
  },
  {
    path: '/staff/recursos',
    name: 'staff-resources',
    component: StaffResourcesView,
    meta: {
      layout: 'dashboard',
      requiresAuth: true,
      roles: ['staff', 'admin'],
      title: 'Recursos',
      description: 'Aquí irá la gestión de recursos del centro.',
    },
  },

  {
    path: '/staff/seguimientos',
    name: 'staff-followups',
    component: StaffFollowUpsView,
    meta: {
      layout: 'dashboard',
      requiresAuth: true,
      roles: ['staff', 'admin'],
      title: 'Seguimiento diario',
      description: 'Checklist, notas y fotos del día para el tutor.',
    },
  },

  {
    path: '/admin/usuarios',
    name: 'admin-users',
    component: UsersView,
    meta: {
      layout: 'dashboard',
      requiresAuth: true,
      roles: ['admin'],
      title: 'Usuarios',
      description: 'Aquí irá la gestión de usuarios y roles.',
    },
  },
  {
    path: '/admin/usuarios/:id',
    name: 'admin-user-detail',
    component: () => import('@/views/admin/AdminUserDetailView.vue'),
    meta: {
      layout: 'dashboard',
      requiresAuth: true,
      roles: ['admin'],
    },
  },

  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: UnauthorizedView,
    meta: {
      layout: 'auth',
      public: true,
      title: 'Sin autorización',
    },
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const authStore = useAuthStore(pinia)
  authStore.hydrate()

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return authStore.getDefaultRouteByRole()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      name: 'login',
      query: { redirect: to.fullPath },
    }
  }

  const allowedRoles = to.meta.roles ?? []

  if (allowedRoles.length && !authStore.hasRole(allowedRoles)) {
    return { name: 'unauthorized' }
  }

  return true
})

export default router