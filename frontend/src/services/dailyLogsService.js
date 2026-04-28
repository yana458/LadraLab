// src/services/dailyLogsService.js

import {
  apiRequest,
  normalizeCollectionResponse,
  normalizeSingleResponse,
} from './apiClient'

function normalizeDailyLog(log) {
  return {
    id: log.id,
    reservation_id: log.reservation_id ?? null,
    report_date: log.report_date ?? null,
    food_done: Boolean(log.food_done),
    walk_done: Boolean(log.walk_done),
    rest_done: Boolean(log.rest_done),
    hygiene_done: Boolean(log.hygiene_done),
    medication_done: Boolean(log.medication_done),
    play_done: Boolean(log.play_done),
    summary: log.summary ?? '',
    observations: log.observations ?? '',
    photos: log.photos ?? [],
    created_at: log.created_at ?? null,
    updated_at: log.updated_at ?? null,
  }
}

export async function createDailyLog(payload) {
  const data = await apiRequest('/api/daily-logs', {
    method: 'POST',
    body: payload,
  })

  return normalizeDailyLog(normalizeSingleResponse(data))
}

export async function getDailyLogById(id) {
  const data = await apiRequest(`/api/daily-logs/${id}`, {
    method: 'GET',
  })

  return normalizeDailyLog(normalizeSingleResponse(data))
}

export async function updateDailyLog(id, payload) {
  const data = await apiRequest(`/api/daily-logs/${id}`, {
    method: 'PATCH',
    body: payload,
  })

  return normalizeDailyLog(normalizeSingleResponse(data))
}

export async function getReservationDailyLogs(reservationId) {
  const data = await apiRequest(`/api/reservations/${reservationId}/daily-logs`, {
    method: 'GET',
  })

  return normalizeCollectionResponse(data).map(normalizeDailyLog)
}