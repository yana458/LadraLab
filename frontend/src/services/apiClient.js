// src/services/apiClient.js

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'
const AUTH_STORAGE_KEY = 'ladralab_auth_session'

function getStoredToken() {
  try {
    const rawSession = localStorage.getItem(AUTH_STORAGE_KEY)

    if (!rawSession) return null

    const session = JSON.parse(rawSession)

    return session?.token || null
  } catch {
    return null
  }
}

function buildUrl(path, query = {}) {
  const url = new URL(path, API_BASE_URL)

  Object.entries(query || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return

    if (Array.isArray(value)) {
      value.forEach((item) => url.searchParams.append(`${key}[]`, item))
      return
    }

    url.searchParams.append(key, value)
  })

  return url.toString()
}

async function parseResponse(response) {
  if (response.status === 204) {
    return null
  }

  const contentType = response.headers.get('content-type') || ''
  const text = await response.text()

  if (!text) {
    return null
  }

  if (contentType.includes('application/json')) {
    try {
      return JSON.parse(text)
    } catch {
      return null
    }
  }

  return text
}

export async function apiRequest(path, options = {}) {
  const {
    method = 'GET',
    query,
    body,
    headers = {},
    isFormData = false,
  } = options

  const requestHeaders = {
    Accept: 'application/json',
    ...headers,
  }

  const token = getStoredToken()

  if (token && !requestHeaders.Authorization) {
    requestHeaders.Authorization = `Bearer ${token}`
  }

  const config = {
    method,
    headers: requestHeaders,
  }

  if (body !== undefined) {
    const shouldSendFormData =
      isFormData ||
      (typeof FormData !== 'undefined' && body instanceof FormData)

    if (shouldSendFormData) {
      config.body = body
    } else {
      requestHeaders['Content-Type'] = 'application/json'
      config.body = JSON.stringify(body)
    }
  }

  let response

  try {
    response = await fetch(buildUrl(path, query), config)
  } catch (error) {
    const networkError = new Error(
      'No hemos podido conectar con el servidor. Revisa que el backend esté iniciado e inténtalo de nuevo.',
    )

    networkError.code = 'NETWORK_ERROR'
    networkError.originalError = error

    throw networkError
  }

  const data = await parseResponse(response)

  if (!response.ok) {
    const error = new Error(
      data?.message ||
        data?.error ||
        'Ha ocurrido un error al comunicar con el servidor.',
    )

    error.status = response.status
    error.data = data

    if (response.status === 401) {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }

    throw error
  }

  return data
}

export function normalizeCollectionResponse(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  return []
}

export function normalizeSingleResponse(data) {
  if (data?.data && !Array.isArray(data.data)) return data.data
  return data
}