import { DEFAULT_MOCK_USERS } from '../data/mockUsers'

const USERS_STORAGE_KEY = 'ladralab_mock_users'
const AUTH_STORAGE_KEY = 'ladralab_auth_session'

function wait(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function normalizeEmail(email = '') {
  return email.trim().toLowerCase()
}

function sanitizeUser(user) {
  const { password, ...safeUser } = user
  return safeUser
}

function saveUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

function getUsers() {
  const raw = localStorage.getItem(USERS_STORAGE_KEY)

  if (!raw) {
    saveUsers(DEFAULT_MOCK_USERS)
    return [...DEFAULT_MOCK_USERS]
  }

  try {
    return JSON.parse(raw)
  } catch {
    saveUsers(DEFAULT_MOCK_USERS)
    return [...DEFAULT_MOCK_USERS]
  }
}

function persistSession(session) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
  return session
}

function createSession(user) {
  return {
    token: `mock-token-${user.role}-${Date.now()}`,
    user: sanitizeUser(user),
  }
}

export function bootstrapAuth() {
  getUsers()
}

export function getSession() {
  bootstrapAuth()

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
  bootstrapAuth()
  await wait()

  const users = getUsers()
  const user = users.find(
    (item) => normalizeEmail(item.email) === normalizeEmail(email)
  )

  if (!user || user.password !== password) {
    throw new Error('Credenciales incorrectas.')
  }

  if (user.status !== 'active') {
    throw new Error('Tu cuenta está inactiva.')
  }

  return persistSession(createSession(user))
}

export async function register({ name, email, phone, password }) {
  bootstrapAuth()
  await wait()

  const users = getUsers()
  const normalizedEmail = normalizeEmail(email)

  const exists = users.some(
    (item) => normalizeEmail(item.email) === normalizedEmail
  )

  if (exists) {
    throw new Error('Ya existe una cuenta con ese email.')
  }

  const newUser = {
    id:
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now()),
    name: name.trim(),
    email: normalizedEmail,
    phone: phone?.trim() || '',
    password,
    role: 'customer',
    status: 'active',
  }

  const updatedUsers = [newUser, ...users]
  saveUsers(updatedUsers)

  return persistSession(createSession(newUser))
}

export function logout() {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}

export function resetMockAuth() {
  localStorage.removeItem(AUTH_STORAGE_KEY)
  localStorage.removeItem(USERS_STORAGE_KEY)
  bootstrapAuth()
}