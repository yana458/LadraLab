import { apiRequest } from './apiClient'
import { servicesMock } from '@/mocks/servicesMock'
import { reservationsMock } from '@/mocks/reservationsMock'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

function clone(data) {
  if (typeof structuredClone === 'function') {
    return structuredClone(data)
  }

  return JSON.parse(JSON.stringify(data))
}

function wait(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function parseCollectionResponse(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  return []
}

function normalizeService(service) {
  return {
    id: service.id,
    name: service.name ?? '',
    slug: service.slug ?? '',
    category: service.category ?? '',
    description: service.description ?? '',
    base_price: Number(service.base_price ?? 0),
    booking_mode: service.booking_mode ?? 'single_day',
    default_start_time: service.default_start_time ?? null,
    default_end_time: service.default_end_time ?? null,
    duration_minutes: service.duration_minutes ?? null,
    slot_interval_min: service.slot_interval_min ?? null,
    is_active: Boolean(service.is_active),
    created_at: service.created_at ?? null,
    updated_at: service.updated_at ?? null,
  }
}

function timeToMinutes(value) {
  if (!value) return 0
  const [hours, minutes] = value.split(':').map(Number)
  return (hours * 60) + (minutes || 0)
}

function minutesToTime(value) {
  const hours = String(Math.floor(value / 60)).padStart(2, '0')
  const minutes = String(value % 60).padStart(2, '0')
  return `${hours}:${minutes}`
}

function getDatePart(isoString) {
  return new Date(isoString).toISOString().slice(0, 10)
}

function getTimePart(isoString) {
  const date = new Date(isoString)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

export async function getServices() {
  if (USE_MOCKS) {
    await wait()
    return clone(servicesMock).map(normalizeService).filter((service) => service.is_active)
  }

  const data = await apiRequest('/api/services', {
    method: 'GET',
  })

  return parseCollectionResponse(data).map(normalizeService).filter((service) => service.is_active)
}

export async function getAvailableTimeSlots(serviceId, date) {
  if (!date) return []

  if (USE_MOCKS) {
    await wait()

    const service = servicesMock.find((item) => Number(item.id) === Number(serviceId))
    if (!service || service.booking_mode !== 'time_slot') return []

    const startMinutes = timeToMinutes(service.default_start_time)
    const endMinutes = timeToMinutes(service.default_end_time)
    const duration = Number(service.duration_minutes || 60)
    const interval = Number(service.slot_interval_min || 60)

    const occupiedSlots = reservationsMock
      .filter((reservation) => {
        if (Number(reservation.service_id) !== Number(serviceId)) return false
        if (!['pending', 'confirmed'].includes(reservation.status)) return false
        return getDatePart(reservation.start_at) === date
      })
      .map((reservation) => getTimePart(reservation.start_at))

    const slots = []

    for (let minutes = startMinutes; minutes + duration <= endMinutes; minutes += interval) {
      const value = minutesToTime(minutes)

      if (!occupiedSlots.includes(value)) {
        slots.push({
          value,
          label: value,
        })
      }
    }

    return slots
  }

  const data = await apiRequest(
    `/api/services/${serviceId}/availability?date=${encodeURIComponent(date)}`,
    {
      method: 'GET',
    },
  )

  return parseCollectionResponse(data)
}