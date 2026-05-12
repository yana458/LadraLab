// src/services/authService.js

import { apiRequest, normalizeSingleResponse } from './apiClient'

const AUTH_STORAGE_KEY = 'ladralab_auth_session'
const USERS_STORAGE_KEY = 'ladralab_mock_users'

function normalizeRole(role) {
  const value = String(role || '').trim().toLowerCase()

  if (['client', 'customer', 'cliente'].includes(value)) return 'cliente'
  if (['staff', 'employee', 'worker'].includes(value)) return 'staff'
  if (['admin', 'administrator', 'superadmin'].includes(value)) return 'admin'

  return 'cliente'
}

function normalizeUser(user = {}) {
  return {
    id: user.id,
    name: user.name ?? '',
    email: user.email ?? '',
    phone: user.phone ?? '',
    role: normalizeRole(user.role ?? user.type),
    original_role: user.role ?? user.type ?? null,
    status: user.status ?? 'active',
    avatar_url: user.avatar_url ?? '',
    created_at: user.created_at ?? null,
    updated_at: user.updated_at ?? null,
  }
}

function normalizeSession(data) {
  const responseData = normalizeSingleResponse(data)

  const token =
    responseData?.token ||
    responseData?.access_token ||
    data?.token ||
    data?.access_token ||
    null

  const user =
    responseData?.user ||
    data?.user ||
    responseData?.data?.user ||
    null

  if (!token) {
    throw new Error('El servidor no ha devuelto un token de acceso.')
  }

  if (!user) {
    throw new Error('El servidor no ha devuelto los datos del usuario.')
  }

  return {
    token,
    user: normalizeUser(user),
  }
}

function persistSession(session) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
  return session
}

export function bootstrapAuth() {
  // Antes inicializaba usuarios mock.
  // Ahora no hace falta hacer nada al cargar la app.
}

export function getSession() {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY)

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw)
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

export async function login({ email, password }) {
  const data = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: {
      email,
      password,
    },
  })

  const session = normalizeSession(data)

  return persistSession(session)
}

export async function register({
  name,
  email,
  phone,
  password,
  password_confirmation,
  passwordConfirmation,
}) {
  const data = await apiRequest('/api/auth/register', {
    method: 'POST',
    body: {
      name,
      email,
      phone: phone ?? '',
      password,
      password_confirmation:
        password_confirmation || passwordConfirmation || password,
    },
  })

  const session = normalizeSession(data)

  return persistSession(session)
}

export async function getCurrentUser() {
  const data = await apiRequest('/api/auth/me', {
    method: 'GET',
  })

  const responseData = normalizeSingleResponse(data)
  const user = responseData?.user || responseData

  const currentSession = getSession()

  const nextSession = {
    token: currentSession?.token || null,
    user: normalizeUser(user),
  }

  persistSession(nextSession)

  return nextSession.user
}

export async function logout() {
  try {
    await apiRequest('/api/auth/logout', {
      method: 'POST',
    })
  } catch {
    // Si el backend no responde o el token ya no es válido,
    // cerramos igualmente la sesión local.
  } finally {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }
}

export function resetMockAuth() {
  localStorage.removeItem(AUTH_STORAGE_KEY)
  localStorage.removeItem(USERS_STORAGE_KEY)
}