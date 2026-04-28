// src/services/resourcesService.js

import {
  apiRequest,
  normalizeCollectionResponse,
  normalizeSingleResponse,
} from './apiClient'
import { resourcesMock } from '@/mocks/resourcesMock'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

// Importante: usamos la misma referencia compartida para que
// los cambios en mock se reflejen en toda la app sin duplicar estado.
const mockResourcesStore = resourcesMock

function wait(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function normalizeNumber(value, fallback = null) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function normalizeResource(resource) {
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
  const json = {
    name: payload.name ?? '',
    type: payload.type ?? '',
    zone: payload.zone ?? '',
    size_group: payload.size_group ?? 'all',
    status: payload.status ?? 'active',
    capacity: normalizeNumber(payload.capacity, null),
    notes: payload.notes ?? '',
  }

  return json
}

function applyMockFilters(resources, filters = {}) {
  let list = [...resources]

  if (filters.search) {
    const query = String(filters.search).trim().toLowerCase()

    list = list.filter((resource) =>
      resource.name?.toLowerCase().includes(query),
    )
  }

  if (filters.type && filters.type !== 'all') {
    list = list.filter((resource) => resource.type === filters.type)
  }

  if (filters.zone && filters.zone !== 'all') {
    list = list.filter((resource) => resource.zone === filters.zone)
  }

  if (filters.size_group && filters.size_group !== 'all') {
    if (filters.size_group === 'all_sizes') {
      list = list.filter((resource) => resource.size_group === 'all')
    } else {
      list = list.filter((resource) => resource.size_group === filters.size_group)
    }
  }

  if (filters.status && filters.status !== 'all') {
    list = list.filter((resource) => resource.status === filters.status)
  }

  return list
}

function sortResourcesByName(resources) {
  return [...resources].sort((a, b) => {
    return String(a.name).localeCompare(String(b.name), 'es')
  })
}

export async function getResources(filters = {}) {
  if (USE_MOCKS) {
    await wait()

    return sortResourcesByName(
      applyMockFilters(mockResourcesStore, filters).map(normalizeResource),
    )
  }

  const data = await apiRequest('/api/resources', {
    method: 'GET',
    query: filters,
  })

  return sortResourcesByName(
    normalizeCollectionResponse(data).map(normalizeResource),
  )
}

export async function getResourceById(id) {
  if (USE_MOCKS) {
    await wait()

    const resource = mockResourcesStore.find(
      (item) => Number(item.id) === Number(id),
    )

    if (!resource) {
      throw new Error('Recurso no encontrado')
    }

    return normalizeResource(resource)
  }

  const data = await apiRequest(`/api/resources/${id}`, {
    method: 'GET',
  })

  return normalizeResource(normalizeSingleResponse(data))
}

export async function createResource(payload) {
  if (USE_MOCKS) {
    await wait()

    const now = new Date().toISOString()
    const body = buildJsonPayload(payload)

    const newResource = {
      id: Math.max(0, ...mockResourcesStore.map((item) => Number(item.id))) + 1,
      ...body,
      created_at: now,
      updated_at: now,
    }

    mockResourcesStore.unshift(newResource)

    return normalizeResource(newResource)
  }

  const data = await apiRequest('/api/resources', {
    method: 'POST',
    body: buildJsonPayload(payload),
  })

  return normalizeResource(normalizeSingleResponse(data))
}

export async function updateResource(id, payload) {
  if (USE_MOCKS) {
    await wait()

    const index = mockResourcesStore.findIndex(
      (item) => Number(item.id) === Number(id),
    )

    if (index === -1) {
      throw new Error('Recurso no encontrado')
    }

    const current = mockResourcesStore[index]
    const patch = buildJsonPayload({
      ...current,
      ...payload,
    })

    const updatedResource = {
      ...current,
      ...patch,
      updated_at: new Date().toISOString(),
    }

    mockResourcesStore[index] = updatedResource

    return normalizeResource(updatedResource)
  }

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
  if (USE_MOCKS) {
    await wait()

    const index = mockResourcesStore.findIndex(
      (item) => Number(item.id) === Number(id),
    )

    if (index === -1) {
      throw new Error('Recurso no encontrado')
    }

    mockResourcesStore.splice(index, 1)
    return true
  }

  await apiRequest(`/api/resources/${id}`, {
    method: 'DELETE',
  })

  return true
}