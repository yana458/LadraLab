// src/services/staffReservationsService.js

import { apiRequest, normalizeSingleResponse } from './apiClient'
import { reservationsMock } from '@/mocks/reservationsMock'
import { petsMock } from '@/mocks/petsMock'
import { servicesMock } from '@/mocks/servicesMock'
import { resourcesMock } from '@/mocks/resourcesMock'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

// Misma referencia compartida que usa reservationsService.js
const mockReservationsStore = reservationsMock
const mockResourcesStore = resourcesMock

function wait(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function parseCollectionResponse(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  return []
}

function normalizeNumber(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function getPetById(petId) {
  return petsMock.find((pet) => Number(pet.id) === Number(petId)) || null
}

function getServiceById(serviceId) {
  return servicesMock.find((service) => Number(service.id) === Number(serviceId)) || null
}

function getResourceById(resourceId) {
  return mockResourcesStore.find((resource) => Number(resource.id) === Number(resourceId)) || null
}

function getResourceByName(resourceName) {
  if (!resourceName) return null

  return (
    mockResourcesStore.find(
      (resource) =>
        String(resource.name).trim().toLowerCase() ===
        String(resourceName).trim().toLowerCase(),
    ) || null
  )
}

function normalizeDailyReport(report) {
  return {
    id: report.id ?? null,
    report_date: report.report_date ?? null,
    food_done: Boolean(report.food_done),
    walk_done: Boolean(report.walk_done),
    rest_done: Boolean(report.rest_done),
    hygiene_done: Boolean(report.hygiene_done),
    medication_done: Boolean(report.medication_done),
    play_done: Boolean(report.play_done),
    summary: report.summary ?? '',
    observations: report.observations ?? '',
    media: Array.isArray(report.media)
      ? report.media.map((item) => ({
          id: item.id ?? null,
          daily_report_id: item.daily_report_id ?? null,
          file_path: item.file_path ?? '',
          file_type: item.file_type ?? 'image',
          uploaded_at: item.uploaded_at ?? null,
          name: item.name ?? '',
        }))
      : [],
  }
}

function normalizeResource(resource) {
  if (!resource) return null

  return {
    id: resource.id,
    name: resource.name ?? '',
    type: resource.type ?? 'other',
    zone: resource.zone ?? '',
    size_group: resource.size_group ?? 'all',
    capacity: Number(resource.capacity ?? 1),
    status: resource.status ?? 'active',
    created_at: resource.created_at ?? null,
    updated_at: resource.updated_at ?? null,
  }
}

function resolveReservationResource(reservation) {
  const byId = reservation.resource_id ? getResourceById(reservation.resource_id) : null
  if (byId) return byId

  const byName = reservation.resource_name ? getResourceByName(reservation.resource_name) : null
  if (byName) return byName

  return null
}

function normalizeReservation(reservation) {
  const pet = getPetById(reservation.pet_id)
  const service = getServiceById(reservation.service_id)
  const resource = resolveReservationResource(reservation)

  return {
    id: reservation.id,
    client_user_id: reservation.client_user_id ?? null,
    pet_id: reservation.pet_id,
    service_id: reservation.service_id,
    resource_id: reservation.resource_id ?? resource?.id ?? null,
    service_name: reservation.service_name ?? service?.name ?? '',
    status: reservation.status ?? 'pending',
    start_at: reservation.start_at ?? null,
    end_at: reservation.end_at ?? null,
    resource_name: reservation.resource_name ?? resource?.name ?? '',
    notes: reservation.notes ?? '',
    created_at: reservation.created_at ?? null,
    updated_at: reservation.updated_at ?? null,
    daily_reports: Array.isArray(reservation.daily_reports)
      ? reservation.daily_reports.map(normalizeDailyReport)
      : [],
    pet: pet
      ? {
          id: pet.id,
          owner_user_id: pet.owner_user_id ?? null,
          name: pet.name,
          breed: pet.breed ?? '',
          species: pet.species ?? '',
          size: pet.size ?? '',
          birth_date: pet.birth_date ?? null,
          care_notes: pet.care_notes ?? '',
          photo_path: pet.photo_path ?? '',
        }
      : null,
    service: service
      ? {
          id: service.id,
          name: service.name,
          slug: service.slug ?? '',
          category: service.category ?? '',
          booking_mode: service.booking_mode,
          default_start_time: service.default_start_time ?? null,
          default_end_time: service.default_end_time ?? null,
          duration_minutes: service.duration_minutes ?? null,
          slot_interval_min: service.slot_interval_min ?? null,
          base_price: Number(service.base_price ?? 0),
        }
      : null,
    resource: normalizeResource(resource),
  }
}

function sortReservationsByStartAsc(reservations) {
  return [...reservations].sort((a, b) => {
    return new Date(a.start_at).getTime() - new Date(b.start_at).getTime()
  })
}

function buildQueryString(params = {}) {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    searchParams.set(key, String(value))
  })

  const query = searchParams.toString()
  return query ? `?${query}` : ''
}

function parseTimeToMinutes(timeString) {
  const raw = String(timeString || '').slice(0, 5)
  const [hours, minutes] = raw.split(':').map(Number)
  return (hours * 60) + minutes
}

function minutesToTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

function addMinutesToTime(timeString, minutesToAdd) {
  return minutesToTime(parseTimeToMinutes(timeString) + minutesToAdd)
}

function isSameDay(startAt, endAt) {
  const start = new Date(startAt)
  const end = new Date(endAt)

  return (
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate()
  )
}

function inferBookingMode(service, reservationLike) {
  if (service?.booking_mode) return service.booking_mode
  if (reservationLike?.start_at && reservationLike?.end_at) {
    return isSameDay(reservationLike.start_at, reservationLike.end_at)
      ? 'single_day'
      : 'date_range'
  }
  return 'single_day'
}

function serviceNeedsResource(service) {
  if (!service) return false
  return service.booking_mode === 'single_day' || service.booking_mode === 'date_range'
}

function serviceResourceZone(service) {
  if (!service) return null
  if (service.booking_mode === 'date_range') return 'hotel'
  if (service.booking_mode === 'single_day') return 'daycare'
  return null
}

function petSizeGroup(size) {
  if (size === 'toy' || size === 'small') return 'toy_small'
  if (size === 'medium') return 'medium'
  if (size === 'large') return 'large'
  return 'all'
}

function rangesOverlap(startA, endA, startB, endB) {
  return new Date(startA).getTime() < new Date(endB).getTime() &&
    new Date(endA).getTime() > new Date(startB).getTime()
}

function isResourceOccupied(resourceId, startAt, endAt, ignoreReservationId = null) {
  return mockReservationsStore.some((reservation) => {
    const normalized = normalizeReservation(reservation)

    if (normalized.status === 'cancelled') return false
    if (Number(normalized.resource_id) !== Number(resourceId)) return false
    if (ignoreReservationId && Number(normalized.id) === Number(ignoreReservationId)) return false

    return rangesOverlap(startAt, endAt, normalized.start_at, normalized.end_at)
  })
}

function getCompatibleResources({ pet_id, service_id, start_at, end_at, ignore_reservation_id = null }) {
  const pet = getPetById(pet_id)
  const service = getServiceById(service_id)

  if (!pet || !service || !serviceNeedsResource(service)) {
    return []
  }

  const requiredZone = serviceResourceZone(service)
  const requiredSizeGroup = petSizeGroup(pet.size)

  return mockResourcesStore
    .filter((resource) => {
      const zoneMatches = resource.zone === requiredZone || resource.zone === 'support'
      const sizeMatches = resource.size_group === 'all' || resource.size_group === requiredSizeGroup
      const statusMatches = resource.status === 'active'

      if (!zoneMatches || !sizeMatches || !statusMatches) return false
      if (!start_at || !end_at) return true

      return !isResourceOccupied(resource.id, start_at, end_at, ignore_reservation_id)
    })
    .map(normalizeResource)
}

function buildJsonPayload(payload) {
  const json = {
    pet_id: Number(payload.pet_id),
    service_id: Number(payload.service_id),
    start_at: payload.start_at,
    end_at: payload.end_at,
    notes: payload.notes ?? '',
  }

  if ('resource_id' in payload) {
    json.resource_id = payload.resource_id ? Number(payload.resource_id) : null
  }

  if ('status' in payload && payload.status) {
    json.status = payload.status
  }

  return json
}

function buildMockPayload(payload, currentReservation = null) {
  const pet = getPetById(payload.pet_id ?? currentReservation?.pet_id)
  const service = getServiceById(payload.service_id ?? currentReservation?.service_id)

  if (!pet) {
    throw new Error('Mascota no encontrada')
  }

  if (!service) {
    throw new Error('Servicio no encontrado')
  }

  const resourceId =
    payload.resource_id === ''
      ? null
      : payload.resource_id === undefined
        ? currentReservation?.resource_id ?? null
        : normalizeNumber(payload.resource_id)

  const resource = resourceId ? getResourceById(resourceId) : null
  const nextStatus = payload.status ?? currentReservation?.status ?? 'pending'

  if (resourceId) {
    const compatibleResources = getCompatibleResources({
      pet_id: pet.id,
      service_id: service.id,
      start_at: payload.start_at ?? currentReservation?.start_at,
      end_at: payload.end_at ?? currentReservation?.end_at,
      ignore_reservation_id: currentReservation?.id ?? null,
    })

    const isCompatible = compatibleResources.some(
      (item) => Number(item.id) === Number(resourceId),
    )

    if (!isCompatible) {
      throw new Error('El recurso no es compatible o no está disponible')
    }
  }

  if (nextStatus === 'confirmed' && serviceNeedsResource(service) && !resourceId) {
    throw new Error('Este servicio necesita un recurso antes de confirmarse')
  }

  return {
    pet_id: pet.id,
    service_id: service.id,
    service_name: service.name,
    start_at: payload.start_at ?? currentReservation?.start_at ?? null,
    end_at: payload.end_at ?? currentReservation?.end_at ?? null,
    status: nextStatus,
    resource_id: resourceId,
    resource_name: resource?.name ?? '',
    notes: payload.notes ?? currentReservation?.notes ?? '',
  }
}

export async function getStaffReservations(filters = {}) {
  if (USE_MOCKS) {
    await wait()

    let list = mockReservationsStore.map(normalizeReservation)

    if (filters.status && filters.status !== 'all') {
      list = list.filter((reservation) => reservation.status === filters.status)
    }

    if (filters.service_id && filters.service_id !== 'all') {
      list = list.filter(
        (reservation) => Number(reservation.service_id) === Number(filters.service_id),
      )
    }

    if (filters.pet_id) {
      list = list.filter(
        (reservation) => Number(reservation.pet_id) === Number(filters.pet_id),
      )
    }

    if (filters.resource_id) {
      list = list.filter(
        (reservation) => Number(reservation.resource_id) === Number(filters.resource_id),
      )
    }

    if (filters.search) {
      const query = String(filters.search).trim().toLowerCase()

      list = list.filter((reservation) => {
        return (
          reservation.pet?.name?.toLowerCase().includes(query) ||
          reservation.service_name?.toLowerCase().includes(query) ||
          reservation.resource_name?.toLowerCase().includes(query) ||
          String(reservation.client_user_id).includes(query)
        )
      })
    }

    return sortReservationsByStartAsc(list)
  }

  const query = buildQueryString(filters)

  const data = await apiRequest(`/api/staff/reservations${query}`, {
    method: 'GET',
  })

  return sortReservationsByStartAsc(parseCollectionResponse(data).map(normalizeReservation))
}

export async function getStaffReservationById(id) {
  if (USE_MOCKS) {
    await wait()

    const reservation = mockReservationsStore.find(
      (item) => Number(item.id) === Number(id),
    )

    if (!reservation) {
      throw new Error('Reserva no encontrada')
    }

    return normalizeReservation(reservation)
  }

  const data = await apiRequest(`/api/staff/reservations/${id}`, {
    method: 'GET',
  })

  return normalizeReservation(normalizeSingleResponse(data))
}

export async function createStaffReservation(payload) {
  if (USE_MOCKS) {
    await wait()

    const pet = getPetById(payload.pet_id)
    const service = getServiceById(payload.service_id)

    if (!pet) throw new Error('Mascota no encontrada')
    if (!service) throw new Error('Servicio no encontrado')

    const built = buildMockPayload(
      {
        ...payload,
        status: payload.status ?? 'pending',
      },
      null,
    )

    const now = new Date().toISOString()

    const newReservation = {
      id: Math.max(0, ...mockReservationsStore.map((item) => Number(item.id))) + 1,
      client_user_id: Number(pet.owner_user_id ?? 1),
      ...built,
      created_at: now,
      updated_at: now,
      daily_reports: [],
    }

    mockReservationsStore.unshift(newReservation)

    return normalizeReservation(newReservation)
  }

  const data = await apiRequest('/api/staff/reservations', {
    method: 'POST',
    body: buildJsonPayload(payload),
  })

  return normalizeReservation(normalizeSingleResponse(data))
}

export async function updateStaffReservation(id, payload) {
  if (USE_MOCKS) {
    await wait()

    const index = mockReservationsStore.findIndex(
      (item) => Number(item.id) === Number(id),
    )

    if (index === -1) {
      throw new Error('Reserva no encontrada')
    }

    const current = mockReservationsStore[index]
    const built = buildMockPayload(payload, normalizeReservation(current))

    const updatedReservation = {
      ...current,
      ...built,
      updated_at: new Date().toISOString(),
    }

    mockReservationsStore[index] = updatedReservation

    return normalizeReservation(updatedReservation)
  }

  const data = await apiRequest(`/api/staff/reservations/${id}`, {
    method: 'PATCH',
    body: buildJsonPayload(payload),
  })

  return normalizeReservation(normalizeSingleResponse(data))
}

export async function confirmStaffReservation(id, payload = {}) {
  return updateStaffReservation(id, {
    ...payload,
    status: 'confirmed',
  })
}

export async function cancelStaffReservation(id, payload = {}) {
  return updateStaffReservation(id, {
    ...payload,
    status: 'cancelled',
  })
}

export async function completeStaffReservation(id, payload = {}) {
  return updateStaffReservation(id, {
    ...payload,
    status: 'completed',
  })
}

export async function getCompatibleResourcesForReservation(params) {
  if (USE_MOCKS) {
    await wait(120)
    return getCompatibleResources(params)
  }

  const query = buildQueryString({
    pet_id: params.pet_id,
    service_id: params.service_id,
    start_at: params.start_at,
    end_at: params.end_at,
    ignore_reservation_id: params.ignore_reservation_id,
  })

  const data = await apiRequest(`/api/resources${query}`, {
    method: 'GET',
  })

  return parseCollectionResponse(data).map(normalizeResource)
}

export async function getStaffReservationSummary(id) {
  const reservation = await getStaffReservationById(id)

  return {
    id: reservation.id,
    pet_name: reservation.pet?.name ?? '',
    service_name: reservation.service_name,
    status: reservation.status,
    start_at: reservation.start_at,
    end_at: reservation.end_at,
    resource_name: reservation.resource_name ?? '',
    reports_count: Array.isArray(reservation.daily_reports)
      ? reservation.daily_reports.length
      : 0,
    latest_report:
      Array.isArray(reservation.daily_reports) && reservation.daily_reports.length
        ? reservation.daily_reports[reservation.daily_reports.length - 1]
        : null,
  }
}