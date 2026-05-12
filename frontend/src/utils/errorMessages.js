// src/utils/errorMessages.js

function getErrorPayload(error) {
  return (
    error?.response?.data ||
    error?.data ||
    error?.payload ||
    null
  )
}

function getStatusCode(error) {
  return error?.response?.status || error?.status || null
}

function firstArrayMessage(value) {
  if (Array.isArray(value) && value.length) {
    return String(value[0])
  }

  if (typeof value === 'string' && value.trim()) {
    return value
  }

  return ''
}

function normalizeFieldName(field) {
  const map = {
    start_at: 'start_date',
    end_at: 'end_date',
    photo: 'photo',
    image: 'photo',
    photo_file: 'photo',
    photo_path: 'photo',
    phone_number: 'phone',
  }

  return map[field] || field
}

function normalizeValidationMessage(message) {
  if (!message) return ''

  const normalized = String(message).trim()

  if (/image field must be an image/i.test(normalized)) {
    return 'La foto debe ser una imagen válida.'
  }

  if (/must be a file of type/i.test(normalized)) {
    return 'La foto debe estar en formato JPG, PNG o WEBP.'
  }

  if (/may not be greater than/i.test(normalized) && /kilobytes|kb/i.test(normalized)) {
    return 'La foto es demasiado grande.'
  }

  if (/required/i.test(normalized)) {
    return 'Este campo es obligatorio.'
  }

  if (/valid email/i.test(normalized) || /must be a valid email/i.test(normalized)) {
    return 'Introduce un email válido.'
  }

  if (/date/i.test(normalized) && /valid/i.test(normalized)) {
    return 'Introduce una fecha válida.'
  }

  return normalized
}

export function getValidationErrors(error) {
  const payload = getErrorPayload(error)
  const rawErrors = payload?.errors

  if (!rawErrors || typeof rawErrors !== 'object') {
    return {}
  }

  const result = {}

  Object.entries(rawErrors).forEach(([field, value]) => {
    const normalizedField = normalizeFieldName(field)
    const firstMessage = firstArrayMessage(value)

    if (firstMessage) {
      result[normalizedField] = normalizeValidationMessage(firstMessage)
    }
  })

  return result
}

export function getReadableErrorMessage(error, fallbackMessage = 'Ha ocurrido un problema.') {
  const payload = getErrorPayload(error)
  const status = getStatusCode(error)
  const validationErrors = getValidationErrors(error)

  const firstValidationError = Object.values(validationErrors)[0]
  if (firstValidationError) {
    return firstValidationError
  }

  if (typeof payload?.message === 'string' && payload.message.trim()) {
    return payload.message.trim()
  }

  if (typeof error?.message === 'string' && error.message.trim() && error.message !== 'Failed to fetch') {
    return error.message.trim()
  }

  if (status === 401) {
    return 'Tu sesión ya no está disponible. Vuelve a iniciar sesión.'
  }

  if (status === 403) {
    return 'No tienes permiso para realizar esta acción.'
  }

  if (status === 404) {
    return 'No hemos encontrado el recurso solicitado.'
  }

  if (status === 409) {
    return 'Ya existe un dato que entra en conflicto con esta acción.'
  }

  if (status === 422) {
    return 'Hay datos que necesitan revisión antes de continuar.'
  }

  if (status >= 500) {
    return 'Ahora mismo el servidor no puede completar esta acción.'
  }

  if (error?.message === 'Failed to fetch') {
    return 'No hemos podido conectar con el servidor.'
  }

  return fallbackMessage
}