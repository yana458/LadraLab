// src/services/petsService.js

import { apiRequest, normalizeSingleResponse } from './apiClient'

function isFile(value) {
  return typeof File !== 'undefined' && value instanceof File
}

function normalizeDailyReport(report = {}) {
  return {
    id: report.id ?? null,
    reservation_id: report.reservation_id ?? null,
    report_date: report.report_date ?? null,
    food_done: Boolean(report.food_done),
    walk_done: Boolean(report.walk_done),
    rest_done: Boolean(report.rest_done),
    hygiene_done: Boolean(report.hygiene_done),
    medication_done: Boolean(report.medication_done),
    play_done: Boolean(report.play_done),
    summary: report.summary ?? '',
    observations: report.observations ?? '',
    status: report.status ?? null,
    is_draft: Boolean(report.is_draft),
    published_at: report.published_at ?? null,
    completed_at: report.completed_at ?? null,
    media: Array.isArray(report.media) ? report.media : [],
    photos: Array.isArray(report.photos) ? report.photos : [],
    created_at: report.created_at ?? null,
    updated_at: report.updated_at ?? null,
  }
}

function normalizeReservation(reservation = {}) {
  return {
    id: reservation.id,
    pet_id: reservation.pet_id ?? reservation.pet?.id ?? null,
    service_id: reservation.service_id ?? reservation.service?.id ?? null,
    service_name: reservation.service_name ?? reservation.service?.name ?? '',
    status: reservation.status ?? 'pending',
    start_at: reservation.start_at ?? null,
    end_at: reservation.end_at ?? null,
    resource_id: reservation.resource_id ?? reservation.resource?.id ?? null,
    resource_name: reservation.resource_name ?? reservation.resource?.name ?? '',
    notes: reservation.notes ?? '',
    created_at: reservation.created_at ?? null,
    updated_at: reservation.updated_at ?? null,
    service: reservation.service ?? null,
    resource: reservation.resource ?? null,
    daily_reports: Array.isArray(reservation.daily_reports)
      ? reservation.daily_reports.map(normalizeDailyReport)
      : Array.isArray(reservation.dailyReports)
        ? reservation.dailyReports.map(normalizeDailyReport)
        : [],
  }
}

function normalizePet(pet = {}) {
  return {
    id: pet.id,
    owner_user_id: pet.owner_user_id ?? pet.owner?.id ?? null,
    name: pet.name ?? '',
    breed: pet.breed ?? '',
    size: pet.size ?? '',
    birth_date: pet.birth_date ?? null,
    care_notes: pet.care_notes ?? '',
    photo_path: pet.photo_path ?? '',
    photo_url: pet.photo_url ?? '',
    created_at: pet.created_at ?? null,
    updated_at: pet.updated_at ?? null,
    reservations: Array.isArray(pet.reservations)
      ? pet.reservations.map(normalizeReservation)
      : [],
  }
}

function buildJsonPayload(payload = {}) {
  return {
    name: payload.name ?? '',
    species: 'dog',
    breed: payload.breed ?? '',
    size: payload.size ?? '',
    birth_date: payload.birth_date ?? null,
    care_notes: payload.care_notes ?? '',
    photo_path: payload.photo_path ?? '',
  }
}

function buildMultipartPayload(payload = {}, method = 'POST') {
  const formData = new FormData()

  formData.append('name', payload.name ?? '')
  formData.append('species', 'dog')
  formData.append('breed', payload.breed ?? '')
  formData.append('size', payload.size ?? '')
  formData.append('birth_date', payload.birth_date ?? '')
  formData.append('care_notes', payload.care_notes ?? '')

  if (isFile(payload.photo_file)) {
    formData.append('photo', payload.photo_file)
  } else {
    formData.append('photo_path', payload.photo_path ?? '')
  }

  if (method === 'PATCH') {
    formData.append('_method', 'PATCH')
  }

  return formData
}

function parseCollectionResponse(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  return []
}

export async function getMyPets() {
  const data = await apiRequest('/api/pets', {
    method: 'GET',
  })

  return parseCollectionResponse(data).map((pet) => normalizePet(pet))
}

export async function getMyPetById(id) {
  const data = await apiRequest(`/api/pets/${id}`, {
    method: 'GET',
  })

  return normalizePet(normalizeSingleResponse(data))
}

export async function createPet(payload = {}) {
  const hasFile = isFile(payload.photo_file)

  const body = hasFile
    ? buildMultipartPayload(payload, 'POST')
    : buildJsonPayload(payload)

  const data = await apiRequest('/api/pets', {
    method: 'POST',
    body,
  })

  return normalizePet(normalizeSingleResponse(data))
}

export async function updatePet(id, payload = {}) {
  const hasFile = isFile(payload.photo_file)

  const body = hasFile
    ? buildMultipartPayload(payload, 'PATCH')
    : buildJsonPayload(payload)

  const data = await apiRequest(`/api/pets/${id}`, {
    method: hasFile ? 'POST' : 'PATCH',
    body,
  })

  return normalizePet(normalizeSingleResponse(data))
}

export async function deletePet(id) {
  await apiRequest(`/api/pets/${id}`, {
    method: 'DELETE',
  })

  return { success: true }
}