// src/services/staffReservationsService.js

import {
  apiRequest,
  normalizeCollectionResponse,
  normalizeSingleResponse,
} from './apiClient'

function normalizeNumber(value, fallback = null) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
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

function normalizeUser(user = null) {
  if (!user) return null

  return {
    id: user.id,
    name: user.name ?? '',
    email: user.email ?? '',
    phone: user.phone ?? '',
    role: user.role ?? '',
    is_active: user.is_active ?? true,
    created_at: user.created_at ?? null,
    updated_at: user.updated_at ?? null,
  }
}

function normalizePet(pet = null) {
  if (!pet) return null

  return {
    id: pet.id,
    owner_user_id: pet.owner_user_id ?? pet.owner?.id ?? null,
    owner: normalizeUser(pet.owner),
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
    slug: service.slug ?? '',
    category: service.category ?? '',
    description: service.description ?? '',
    booking_mode: service.booking_mode ?? '',
    default_start_time: service.default_start_time ?? null,
    default_end_time: service.default_end_time ?? null,
    duration_minutes: service.duration_minutes ?? null,
    slot_interval_min: service.slot_interval_min ?? null,
    base_price: normalizeNumber(service.base_price, 0),
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
    type: resource.type ?? 'other',
    zone: resource.zone ?? '',
    size_group: resource.size_group ?? 'all',
    capacity: normalizeNumber(resource.capacity, 1),
    status: resource.status ?? 'active',
    created_at: resource.created_at ?? null,
    updated_at: resource.updated_at ?? null,
  }
}

function normalizeReservation(reservation = {}) {
  const client = normalizeUser(reservation.client)
  const pet = normalizePet(reservation.pet)
  const service = normalizeService(reservation.service)
  const resource = normalizeResource(reservation.resource)

  return {
    id: reservation.id,
    client_user_id: reservation.client_user_id ?? client?.id ?? pet?.owner_user_id ?? null,

    pet_id: reservation.pet_id ?? pet?.id ?? null,
    service_id: reservation.service_id ?? service?.id ?? null,
    resource_id: reservation.resource_id ?? resource?.id ?? null,

    pet_name: reservation.pet_name ?? pet?.name ?? 'Mascota',
    client_name: reservation.client_name ?? client?.name ?? pet?.owner?.name ?? 'Cliente',
    service_name: reservation.service_name ?? service?.name ?? 'Servicio',
    resource_name: reservation.resource_name ?? resource?.name ?? '',

    status: reservation.status ?? 'pending',
    start_at: reservation.start_at ?? null,
    end_at: reservation.end_at ?? null,
    notes: reservation.notes ?? '',

    created_at: reservation.created_at ?? null,
    updated_at: reservation.updated_at ?? null,

    client,
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

function sortReservationsByStartAsc(reservations) {
  return [...reservations].sort((a, b) => {
    return new Date(a.start_at).getTime() - new Date(b.start_at).getTime()
  })
}

function buildJsonPayload(payload = {}) {
  const json = {}

  if ('client_user_id' in payload) {
    json.client_user_id = Number(payload.client_user_id)
  }

  if ('pet_id' in payload) {
    json.pet_id = Number(payload.pet_id)
  }

  if ('service_id' in payload) {
    json.service_id = Number(payload.service_id)
  }

  if ('resource_id' in payload) {
    json.resource_id = payload.resource_id ? Number(payload.resource_id) : null
  }

  if ('start_at' in payload) {
    json.start_at = payload.start_at
  }

  if ('end_at' in payload) {
    json.end_at = payload.end_at
  }

  if ('status' in payload && payload.status) {
    json.status = payload.status
  }

  if ('notes' in payload) {
    json.notes = payload.notes ?? ''
  }

  return json
}

export async function getStaffReservations(filters = {}) {
  const data = await apiRequest('/api/staff/reservations', {
    method: 'GET',
    query: filters,
  })

  return sortReservationsByStartAsc(
    normalizeCollectionResponse(data).map(normalizeReservation),
  )
}

export async function getStaffReservationById(id) {
  const data = await apiRequest(`/api/staff/reservations/${id}`, {
    method: 'GET',
  })

  return normalizeReservation(normalizeSingleResponse(data))
}

export async function createStaffReservation(payload) {
  const data = await apiRequest('/api/staff/reservations', {
    method: 'POST',
    body: buildJsonPayload(payload),
  })

  return normalizeReservation(normalizeSingleResponse(data))
}

export async function updateStaffReservation(id, payload) {
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

export async function getCompatibleResourcesForReservation() {
  return []
}

export async function getStaffReservationSummary(id) {
  const reservation = await getStaffReservationById(id)

  return {
    id: reservation.id,
    pet_name: reservation.pet?.name ?? reservation.pet_name ?? '',
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