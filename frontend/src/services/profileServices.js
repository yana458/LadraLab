// src/services/profileServices.js

import { apiRequest, normalizeSingleResponse } from './apiClient'

function normalizeProfile(profile = {}) {
  return {
    id: profile.id,
    name: profile.name ?? '',
    email: profile.email ?? '',
    phone: profile.phone ?? '',
    avatar_url: profile.avatar_url ?? '',
    role: profile.role ?? '',
    status: profile.status ?? '',
    is_active: profile.is_active ?? true,
    created_at: profile.created_at ?? null,
    updated_at: profile.updated_at ?? null,
  }
}

function extractUser(data) {
  const responseData = normalizeSingleResponse(data)

  return responseData?.user || responseData
}

export async function getMyProfile() {
  const data = await apiRequest('/api/auth/me', {
    method: 'GET',
  })

  return normalizeProfile(extractUser(data))
}

export async function updateMyProfile(payload) {
  const data = await apiRequest('/api/auth/profile', {
    method: 'PATCH',
    body: {
      name: payload.name,
      email: payload.email,
      phone: payload.phone ?? '',
    },
  })

  return normalizeProfile(extractUser(data))
}

export async function updateMyPassword(payload) {
  return apiRequest('/api/auth/profile/password', {
    method: 'PATCH',
    body: {
      current_password: payload.current_password,
      password: payload.password,
      password_confirmation: payload.password_confirmation,
    },
  })
}