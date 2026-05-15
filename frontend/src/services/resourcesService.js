// src/services/resourcesService.js

import {
  apiRequest,
  normalizeCollectionResponse,
  normalizeSingleResponse,
} from './apiClient'

function normalizeNumber(value, fallback = null) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function normalizeResource(resource = {}) {
  return {
    id: resource.id,
    name: resource.name ?? '',
    type: resource.type ?? '',
    zone: resource.zone ?? '',
    size_group: resource.size_group ?? 'all',
    status: resource.status ?? '',
    capacity: normalizeNumber(resource.capacity, null),
    notes: resource.notes ?? '',
    created_at: resource.created_at ?? null,
    updated_at: resource.updated_at ?? null,
  }
}

function buildJsonPayload(payload = {}) {
  return {
    name: payload.name ?? '',
    type: payload.type ?? '',
    zone: payload.zone ?? '',
    size_group: payload.size_group ?? 'all',
    status: payload.status ?? 'active',
    capacity: normalizeNumber(payload.capacity, null),
    notes: payload.notes ?? '',
  }
}

function sortResourcesByName(resources) {
  return [...resources].sort((a, b) => {
    return String(a.name).localeCompare(String(b.name), 'es')
  })
}

export async function getResources(filters = {}) {
  const data = await apiRequest('/api/resources', {
    method: 'GET',
    query: filters,
  })

  return sortResourcesByName(
    normalizeCollectionResponse(data).map(normalizeResource),
  )
}

export async function getResourceById(id) {
  const data = await apiRequest(`/api/resources/${id}`, {
    method: 'GET',
  })

  return normalizeResource(normalizeSingleResponse(data))
}

export async function createResource(payload) {
  const data = await apiRequest('/api/resources', {
    method: 'POST',
    body: buildJsonPayload(payload),
  })

  return normalizeResource(normalizeSingleResponse(data))
}

export async function updateResource(id, payload) {
  const data = await apiRequest(`/api/resources/${id}`, {
    method: 'PATCH',
    body: buildJsonPayload(payload),
  })

  return normalizeResource(normalizeSingleResponse(data))
}

export async function updateResourceStatus(id, status) {
  return updateResource(id, { status })
}

export async function deleteResource(id) {
  await apiRequest(`/api/resources/${id}`, {
    method: 'DELETE',
  })

  return true
}