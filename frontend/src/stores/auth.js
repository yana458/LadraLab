import { defineStore } from 'pinia'
import {
  login as loginRequest,
  register as registerRequest,
  logout as logoutRequest,
  getSession as getStoredSession,
  getCurrentUser,
} from '@/services/authService'

function normalizeRole(role) {
  const value = String(role || '').trim().toLowerCase()

  if (['client', 'customer', 'cliente'].includes(value)) return 'cliente'
  if (['staff', 'employee', 'worker'].includes(value)) return 'staff'
  if (['admin', 'administrator', 'superadmin'].includes(value)) return 'admin'

  return null
}

function normalizeUser(user) {
  if (!user) return null

  return {
    ...user,
    role: normalizeRole(user.role ?? user.type) || 'cliente',
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    hasHydrated: false,
    isLoading: false,
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.user && state.token),

    role: (state) => state.user?.role ?? null,

    roleLabel: (state) => {
      const labels = {
        cliente: 'Cliente',
        staff: 'Staff',
        admin: 'Admin',
      }

      return labels[state.user?.role] ?? 'Usuario'
    },
  },

  actions: {
    hydrate() {
      if (this.hasHydrated) return

      const session = getStoredSession()

      if (session?.token && session?.user) {
        this.token = session.token
        this.user = normalizeUser(session.user)
      } else {
        this.user = null
        this.token = null
      }

      this.hasHydrated = true
    },

    setSession(session) {
      this.token = session?.token ?? null
      this.user = normalizeUser(session?.user ?? null)
    },

    clearSession() {
      this.user = null
      this.token = null
      localStorage.removeItem('ladralab_auth_session')
    },

    hasRole(allowedRoles = []) {
      if (!allowedRoles.length) return true
      if (!this.user) return false

      const currentRole = normalizeRole(this.user.role)
      const normalizedAllowedRoles = allowedRoles
        .map((role) => normalizeRole(role))
        .filter(Boolean)

      return normalizedAllowedRoles.includes(currentRole)
    },

    getDefaultRouteByRole(role = this.user?.role) {
      switch (normalizeRole(role)) {
        case 'cliente':
          return '/dashboard/cliente'
        case 'staff':
          return '/dashboard/staff'
        case 'admin':
          return '/dashboard/admin'
        default:
          return '/login'
      }
    },

    async login({ email, password }) {
      this.isLoading = true

      try {
        const session = await loginRequest({
          email,
          password,
        })

        this.setSession(session)

        return this.user
      } finally {
        this.isLoading = false
      }
    },

    async register({
      name,
      email,
      phone,
      password,
      password_confirmation,
    }) {
      this.isLoading = true

      try {
        const session = await registerRequest({
          name,
          email,
          phone,
          password,
          password_confirmation,
        })

        this.setSession(session)

        return this.user
      } finally {
        this.isLoading = false
      }
    },

    async refreshUser() {
      if (!this.token) return null

      try {
        const user = await getCurrentUser()
        this.user = normalizeUser(user)

        return this.user
      } catch (error) {
        this.clearSession()
        throw error
      }
    },

    async logout() {
      try {
        await logoutRequest()
      } finally {
        this.clearSession()
      }
    },
  },
})