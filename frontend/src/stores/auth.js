import { defineStore } from 'pinia'
import { mockUsersSeed } from '@/mocks/authUsers'

const AUTH_STORAGE_KEY = 'ladralab_auth_session'
const USERS_STORAGE_KEY = 'ladralab_mock_users'

function sanitizeUser(user) {
  if (!user) return null

  const { password, ...safeUser } = user
  return safeUser
}

function getSeedUsers() {
  return JSON.parse(JSON.stringify(mockUsersSeed))
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    users: [],
    hasHydrated: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user && !!state.token,
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

      const savedUsers = localStorage.getItem(USERS_STORAGE_KEY)
      this.users = savedUsers ? JSON.parse(savedUsers) : getSeedUsers()

      const savedSession = localStorage.getItem(AUTH_STORAGE_KEY)

      if (savedSession) {
        const session = JSON.parse(savedSession)
        this.user = session.user ?? null
        this.token = session.token ?? null
      }

      this.hasHydrated = true
    },

    persistUsers() {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(this.users))
    },

    persistSession() {
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({
          user: this.user,
          token: this.token,
        }),
      )
    },

    clearSession() {
      this.user = null
      this.token = null
      localStorage.removeItem(AUTH_STORAGE_KEY)
    },

    hasRole(allowedRoles = []) {
      if (!allowedRoles.length) return true
      if (!this.user) return false

      return allowedRoles.includes(this.user.role)
    },

    getDefaultRouteByRole(role = this.user?.role) {
        switch (role) {
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
      this.hydrate()

      const normalizedEmail = email.trim().toLowerCase()

      // FUTURO API:
      // const response = await api.post('/api/auth/login', { email, password })
      // this.user = response.data.user
      // this.token = response.data.token

      const foundUser = this.users.find(
        (user) => user.email.toLowerCase() === normalizedEmail,
      )

      if (!foundUser) {
        throw new Error('No existe ninguna cuenta con ese correo.')
      }

      if (foundUser.password !== password) {
        throw new Error('La contraseña no es correcta.')
      }

      if (!foundUser.is_active) {
        throw new Error('Tu cuenta está inactiva. Contacta con el centro.')
      }

      this.user = sanitizeUser(foundUser)
      this.token = `mock-token-${foundUser.id}-${Date.now()}`
      this.persistSession()

      return this.user
    },

    async register({ name, email, password, password_confirmation }) {
      this.hydrate()

      const normalizedEmail = email.trim().toLowerCase()

      if (!name.trim()) {
        throw new Error('El nombre es obligatorio.')
      }

      if (!normalizedEmail) {
        throw new Error('El email es obligatorio.')
      }

      if (password.length < 8) {
        throw new Error('La contraseña debe tener al menos 8 caracteres.')
      }

      if (password !== password_confirmation) {
        throw new Error('Las contraseñas no coinciden.')
      }

      const exists = this.users.some(
        (user) => user.email.toLowerCase() === normalizedEmail,
      )

      if (exists) {
        throw new Error('Ese email ya está registrado.')
      }

      // FUTURO API:
      // await api.post('/api/auth/register', {
      //   name,
      //   email,
      //   password,
      //   password_confirmation,
      // })

      const newUser = {
        id: this.users.length
          ? Math.max(...this.users.map((user) => user.id)) + 1
          : 1,
        name: name.trim(),
        email: normalizedEmail,
        password,
        role: 'cliente',
        is_active: true,
      }

      this.users.push(newUser)
      this.persistUsers()

      return sanitizeUser(newUser)
    },

    async logout() {
      // FUTURO API:
      // await api.post('/api/auth/logout')

      this.clearSession()
    },
  },
})