// src/services/reservationsService.js

import { apiRequest, normalizeSingleResponse } from './apiClient'
import { reservationsMock } from '@/mocks/reservationsMock'
import { petsMock } from '@/mocks/petsMock'
import { servicesMock } from '@/mocks/servicesMock'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

// Importante: usamos la misma referencia compartida para que petsService
// vea los cambios en las reservas mock sin duplicar estado.
const mockReservationsStore = reservationsMock

function wait(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function getCurrentMockUserId() {
  try {
    const possibleKeys = ['ladralab_auth_user', 'auth_user', 'user']

    for (const key of possibleKeys) {
      const raw = localStorage.getItem(key)
      if (!raw) continue

      const parsed = JSON.parse(raw)
      if (parsed?.id) return Number(parsed.id)
    }
  } catch {
    // seguimos con fallback
  }

  return 1
}

function parseCollectionResponse(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  return []
}

function getPetById(petId) {
  return petsMock.find((pet) => Number(pet.id) === Number(petId)) || null
}

function getServiceById(serviceId) {
  return servicesMock.find((service) => Number(service.id) === Number(serviceId)) || null
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

function normalizeReservation(reservation) {
  const pet = getPetById(reservation.pet_id)
  const service = getServiceById(reservation.service_id)

  return {
    id: reservation.id,
    client_user_id: reservation.client_user_id ?? null,
    pet_id: reservation.pet_id,
    service_id: reservation.service_id,
    resource_id: reservation.resource_id ?? null,
    service_name: reservation.service_name ?? service?.name ?? '',
    status: reservation.status ?? 'pending',
    start_at: reservation.start_at ?? null,
    end_at: reservation.end_at ?? null,
    resource_name: reservation.resource_name ?? '',
    notes: reservation.notes ?? '',
    created_at: reservation.created_at ?? null,
    updated_at: reservation.updated_at ?? null,
    daily_reports: Array.isArray(reservation.daily_reports)
      ? reservation.daily_reports.map(normalizeDailyReport)
      : [],
    pet: pet
      ? {
          id: pet.id,
          name: pet.name,
          breed: pet.breed ?? '',
          species: pet.species ?? '',
          size: pet.size ?? '',
          photo_path: pet.photo_path ?? '',
        }
      : null,
    service: service
      ? {
          id: service.id,
          name: service.name,
          booking_mode: service.booking_mode,
          base_price: Number(service.base_price ?? 0),
        }
      : null,
  }
}

function sortReservationsByStartDesc(reservations) {
  return [...reservations].sort((a, b) => {
    return new Date(b.start_at).getTime() - new Date(a.start_at).getTime()
  })
}

function buildJsonPayload(payload) {
  return {
    pet_id: Number(payload.pet_id),
    service_id: Number(payload.service_id),
    start_at: payload.start_at,
    end_at: payload.end_at,
    notes: payload.notes ?? '',
  }
}

export async function getMyReservations() {
  if (USE_MOCKS) {
    await wait()

    const currentUserId = getCurrentMockUserId()

    return sortReservationsByStartDesc(
      mockReservationsStore
        .filter((reservation) => Number(reservation.client_user_id) === currentUserId)
        .map(normalizeReservation),
    )
  }

  const data = await apiRequest('/api/reservations', {
    method: 'GET',
  })

  return sortReservationsByStartDesc(parseCollectionResponse(data).map(normalizeReservation))
}

export async function getMyReservationById(id) {
  if (USE_MOCKS) {
    await wait()

    const currentUserId = getCurrentMockUserId()

    const reservation = mockReservationsStore.find(
      (item) =>
        Number(item.id) === Number(id) &&
        Number(item.client_user_id) === currentUserId,
    )

    if (!reservation) {
      throw new Error('Reserva no encontrada')
    }

    return normalizeReservation(reservation)
  }

  const data = await apiRequest(`/api/reservations/${id}`, {
    method: 'GET',
  })

  return normalizeReservation(normalizeSingleResponse(data))
}

export async function createReservation(payload) {
  if (USE_MOCKS) {
    await wait()

    const currentUserId = getCurrentMockUserId()
    const pet = getPetById(payload.pet_id)
    const service = getServiceById(payload.service_id)

    if (!pet) {
      throw new Error('Mascota no encontrada')
    }

    if (!service) {
      throw new Error('Servicio no encontrado')
    }

    const now = new Date().toISOString()

    const newReservation = {
      id: Math.max(0, ...mockReservationsStore.map((item) => Number(item.id))) + 1,
      client_user_id: currentUserId,
      pet_id: Number(payload.pet_id),
      service_id: Number(payload.service_id),
      resource_id: null,
      service_name: service.name,
      start_at: payload.start_at,
      end_at: payload.end_at,
      status: 'pending',
      resource_name: '',
      notes: payload.notes ?? '',
      created_at: now,
      updated_at: now,
      daily_reports: [],
    }

    mockReservationsStore.unshift(newReservation)

    return normalizeReservation(newReservation)
  }

  const data = await apiRequest('/api/reservations', {
    method: 'POST',
    body: buildJsonPayload(payload),
  })

  return normalizeReservation(normalizeSingleResponse(data))
}

export async function cancelReservation(id) {
  if (USE_MOCKS) {
    await wait()

    const currentUserId = getCurrentMockUserId()

    const index = mockReservationsStore.findIndex(
      (item) =>
        Number(item.id) === Number(id) &&
        Number(item.client_user_id) === currentUserId,
    )

    if (index === -1) {
      throw new Error('Reserva no encontrada')
    }

    const current = mockReservationsStore[index]

    const cancelledReservation = {
      ...current,
      status: 'cancelled',
      updated_at: new Date().toISOString(),
    }

    mockReservationsStore[index] = cancelledReservation

    return normalizeReservation(cancelledReservation)
  }

  const data = await apiRequest(`/api/reservations/${id}/cancel`, {
    method: 'POST',
  })

  return normalizeReservation(normalizeSingleResponse(data))
}

export async function updateReservation(id, payload) {
  if (USE_MOCKS) {
    await wait()

    const currentUserId = getCurrentMockUserId()

    const index = mockReservationsStore.findIndex(
      (item) =>
        Number(item.id) === Number(id) &&
        Number(item.client_user_id) === currentUserId,
    )

    if (index === -1) {
      throw new Error('Reserva no encontrada')
    }

    const current = mockReservationsStore[index]
    const service = getServiceById(payload.service_id ?? current.service_id)

    const updatedReservation = {
      ...current,
      pet_id: Number(payload.pet_id ?? current.pet_id),
      service_id: Number(payload.service_id ?? current.service_id),
      service_name: service?.name ?? current.service_name ?? '',
      start_at: payload.start_at ?? current.start_at,
      end_at: payload.end_at ?? current.end_at,
      notes: payload.notes ?? '',
      updated_at: new Date().toISOString(),
    }

    mockReservationsStore[index] = updatedReservation

    return normalizeReservation(updatedReservation)
  }

  const data = await apiRequest(`/api/reservations/${id}`, {
    method: 'PUT',
    body: buildJsonPayload(payload),
  })

  return normalizeReservation(normalizeSingleResponse(data))
}