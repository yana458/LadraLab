// src/services/servicesService.js

import { apiRequest } from './apiClient'

function parseCollectionResponse(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  return []
}

function normalizeService(service = {}) {
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
    is_active: service.is_active !== false,
    created_at: service.created_at ?? null,
    updated_at: service.updated_at ?? null,
  }
}

export async function getServices() {
  const data = await apiRequest('/api/services', {
    method: 'GET',
  })

  return parseCollectionResponse(data)
    .map(normalizeService)
    .filter((service) => service.is_active)
}

export async function getAvailableTimeSlots(serviceId, date) {
  if (!serviceId || !date) return []

  const data = await apiRequest(`/api/services/${serviceId}/availability`, {
    method: 'GET',
    query: {
      date,
    },
  })

  return parseCollectionResponse(data)
}