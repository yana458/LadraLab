// src/services/reservationsService.js

import { apiRequest, normalizeSingleResponse } from './apiClient'

function parseCollectionResponse(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  return []
}

function normalizeMediaItem(item = {}) {
  return {
    id: item.id ?? null,
    daily_report_id: item.daily_report_id ?? null,
    file_path: item.file_path ?? item.path ?? '',
    file_url: item.file_url ?? item.url ?? '',
    url: item.url ?? item.file_url ?? '',
    file_type: item.file_type ?? item.type ?? 'image',
    uploaded_at: item.uploaded_at ?? null,
    name: item.name ?? '',
  }
}

function normalizeDailyReport(report = {}) {
  return {
    id: report.id ?? null,
    reservation_id: report.reservation_id ?? null,
    report_date: report.report_date ?? null,

    status: report.status ?? null,
    is_draft: Boolean(report.is_draft),
    published_at: report.published_at ?? null,
    completed_at: report.completed_at ?? null,

    food_done: Boolean(report.food_done),
    walk_done: Boolean(report.walk_done),
    rest_done: Boolean(report.rest_done),
    hygiene_done: Boolean(report.hygiene_done),
    medication_done: Boolean(report.medication_done),
    play_done: Boolean(report.play_done),

    summary: report.summary ?? '',
    observations: report.observations ?? '',

    media: Array.isArray(report.media)
      ? report.media.map(normalizeMediaItem)
      : [],

    photos: Array.isArray(report.photos)
      ? report.photos.map(normalizeMediaItem)
      : [],

    created_at: report.created_at ?? null,
    updated_at: report.updated_at ?? null,
  }
}

function normalizePet(pet = null) {
  if (!pet) return null

  return {
    id: pet.id,
    owner_user_id: pet.owner_user_id ?? pet.owner?.id ?? null,
    name: pet.name ?? '',
    breed: pet.breed ?? '',
    species: pet.species ?? '',
    size: pet.size ?? '',
    birth_date: pet.birth_date ?? null,
    care_notes: pet.care_notes ?? '',
    photo_path: pet.photo_path ?? '',
    photo_url: pet.photo_url ?? '',
    created_at: pet.created_at ?? null,
    updated_at: pet.updated_at ?? null,
  }
}

function normalizeService(service = null) {
  if (!service) return null

  return {
    id: service.id,
    name: service.name ?? '',
    description: service.description ?? '',
    booking_mode: service.booking_mode ?? '',
    default_start_time: service.default_start_time ?? null,
    default_end_time: service.default_end_time ?? null,
    duration_minutes: service.duration_minutes ?? null,
    slot_interval_min: service.slot_interval_min ?? null,
    base_price: Number(service.base_price ?? 0),
    is_active: service.is_active ?? true,
    created_at: service.created_at ?? null,
    updated_at: service.updated_at ?? null,
  }
}

function normalizeResource(resource = null) {
  if (!resource) return null

  return {
    id: resource.id,
    name: resource.name ?? '',
    type: resource.type ?? '',
    capacity: resource.capacity ?? null,
    is_active: resource.is_active ?? true,
    created_at: resource.created_at ?? null,
    updated_at: resource.updated_at ?? null,
  }
}

function normalizeReservation(reservation = {}) {
  const pet = normalizePet(reservation.pet)
  const service = normalizeService(reservation.service)
  const resource = normalizeResource(reservation.resource)

  return {
    id: reservation.id,
    client_user_id: reservation.client_user_id ?? reservation.client?.id ?? null,

    pet_id: reservation.pet_id ?? pet?.id ?? null,
    service_id: reservation.service_id ?? service?.id ?? null,
    resource_id: reservation.resource_id ?? resource?.id ?? null,

    pet_name: reservation.pet_name ?? pet?.name ?? '',
    service_name: reservation.service_name ?? service?.name ?? '',
    resource_name: reservation.resource_name ?? resource?.name ?? '',

    status: reservation.status ?? 'pending',
    start_at: reservation.start_at ?? null,
    end_at: reservation.end_at ?? null,
    notes: reservation.notes ?? '',

    created_at: reservation.created_at ?? null,
    updated_at: reservation.updated_at ?? null,

    pet,
    service,
    resource,

    daily_reports: Array.isArray(reservation.daily_reports)
      ? reservation.daily_reports.map(normalizeDailyReport)
      : Array.isArray(reservation.dailyReports)
        ? reservation.dailyReports.map(normalizeDailyReport)
        : [],
  }
}

function sortReservationsByStartDesc(reservations) {
  return [...reservations].sort((a, b) => {
    return new Date(b.start_at).getTime() - new Date(a.start_at).getTime()
  })
}

function buildCreatePayload(payload = {}) {
  return {
    pet_id: Number(payload.pet_id),
    service_id: Number(payload.service_id),
    start_at: payload.start_at,
    end_at: payload.end_at,
    notes: payload.notes ?? '',
  }
}

function buildUpdatePayload(payload = {}) {
  return {
    start_at: payload.start_at,
    end_at: payload.end_at,
    notes: payload.notes ?? '',
  }
}

export async function getMyReservations() {
  const data = await apiRequest('/api/reservations', {
    method: 'GET',
  })

  return sortReservationsByStartDesc(
    parseCollectionResponse(data).map(normalizeReservation),
  )
}

export async function getMyReservationById(id) {
  const data = await apiRequest(`/api/reservations/${id}`, {
    method: 'GET',
  })

  return normalizeReservation(normalizeSingleResponse(data))
}

export async function createReservation(payload) {
  const data = await apiRequest('/api/reservations', {
    method: 'POST',
    body: buildCreatePayload(payload),
  })

  return normalizeReservation(normalizeSingleResponse(data))
}

export async function updateReservation(id, payload) {
  const data = await apiRequest(`/api/reservations/${id}`, {
    method: 'PATCH',
    body: buildUpdatePayload(payload),
  })

  return normalizeReservation(normalizeSingleResponse(data))
}

export async function cancelReservation(id) {
  const data = await apiRequest(`/api/reservations/${id}/cancel`, {
    method: 'PATCH',
  })

  return normalizeReservation(normalizeSingleResponse(data))
}