// src/services/dailyLogsService.js

import {
  apiRequest,
  normalizeCollectionResponse,
  normalizeSingleResponse,
} from './apiClient'

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

function normalizeDailyLog(log = {}) {
  const media = Array.isArray(log.media)
    ? log.media.map(normalizeMediaItem)
    : []

  const photos = Array.isArray(log.photos)
    ? log.photos.map(normalizeMediaItem)
    : []

  return {
    id: log.id,
    reservation_id: log.reservation_id ?? null,
    report_date: log.report_date ?? null,

    status: log.status ?? null,
    is_draft: Boolean(log.is_draft),
    published_at: log.published_at ?? null,
    completed_at: log.completed_at ?? null,

    food_done: Boolean(log.food_done),
    walk_done: Boolean(log.walk_done),
    rest_done: Boolean(log.rest_done),
    hygiene_done: Boolean(log.hygiene_done),
    medication_done: Boolean(log.medication_done),
    play_done: Boolean(log.play_done),

    summary: log.summary ?? '',
    observations: log.observations ?? '',

    media,
    photos,

    created_at: log.created_at ?? null,
    updated_at: log.updated_at ?? null,
  }
}

export async function createDailyLog(payload) {
  const data = await apiRequest('/api/daily-reports', {
    method: 'POST',
    body: payload,
  })

  return normalizeDailyLog(normalizeSingleResponse(data))
}

export async function getDailyLogById(id) {
  const data = await apiRequest(`/api/daily-reports/${id}`, {
    method: 'GET',
  })

  return normalizeDailyLog(normalizeSingleResponse(data))
}

export async function updateDailyLog(id, payload) {
  const data = await apiRequest(`/api/daily-reports/${id}`, {
    method: 'PATCH',
    body: payload,
  })

  return normalizeDailyLog(normalizeSingleResponse(data))
}

export async function getReservationDailyLogs(reservationId) {
  const data = await apiRequest(
    `/api/reservations/${reservationId}/daily-reports`,
    {
      method: 'GET',
    },
  )

  return normalizeCollectionResponse(data).map(normalizeDailyLog)
}