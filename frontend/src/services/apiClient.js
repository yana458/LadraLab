// src/services/apiClient.js

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function buildUrl(path, query = {}) {
  const url = new URL(path, API_BASE_URL)

  Object.entries(query).forEach(([key, value]) => {
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
  const contentType = response.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    return response.json()
  }

  return response.text()
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

  const config = {
    method,
    credentials: 'include',
    headers: requestHeaders,
  }

  if (body !== undefined) {
    if (isFormData) {
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