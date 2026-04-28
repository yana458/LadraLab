// src/services/profileService.js

import { apiRequest, normalizeSingleResponse } from './apiClient'
import { profileMock } from '@/mocks/profileMock'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

let mockProfileStore = clone(profileMock)

function clone(data) {
  if (typeof structuredClone === 'function') {
    return structuredClone(data)
  }

  return JSON.parse(JSON.stringify(data))
}

function wait(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function normalizeProfile(profile) {
  return {
    id: profile.id,
    name: profile.name ?? '',
    email: profile.email ?? '',
    phone: profile.phone ?? '',
    avatar_url: profile.avatar_url ?? '',
    created_at: profile.created_at ?? null,
    updated_at: profile.updated_at ?? null,
  }
}

export async function getMyProfile() {
  if (USE_MOCKS) {
    await wait()
    return normalizeProfile(mockProfileStore)
  }

  const data = await apiRequest('/api/profile', {
    method: 'GET',
  })

  return normalizeProfile(normalizeSingleResponse(data))
}

export async function updateMyProfile(payload) {
  if (USE_MOCKS) {
    await wait()

    mockProfileStore = {
      ...mockProfileStore,
      ...payload,
      updated_at: new Date().toISOString(),
    }

    return normalizeProfile(mockProfileStore)
  }

  const data = await apiRequest('/api/profile', {
    method: 'PATCH',
    body: payload,
  })

  return normalizeProfile(normalizeSingleResponse(data))
}