// src/services/petsService.js

import { apiRequest, normalizeSingleResponse } from './apiClient'
import { petsMock } from '@/mocks/petsMock'
import { reservationsMock } from '@/mocks/reservationsMock'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

let mockPetsStore = clone(petsMock)

function clone(data) {
  if (typeof structuredClone === 'function') {
    return structuredClone(data)
  }

  return JSON.parse(JSON.stringify(data))
}

function wait(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function isBlobUrl(value) {
  return typeof value === 'string' && value.startsWith('blob:')
}

function revokeIfBlobUrl(value) {
  if (isBlobUrl(value)) {
    URL.revokeObjectURL(value)
  }
}

function getCurrentMockUserId() {
  try {
    const possibleKeys = [
      'ladralab_auth_user',
      'auth_user',
      'user',
    ]

    for (const key of possibleKeys) {
      const raw = localStorage.getItem(key)
      if (!raw) continue

      const parsed = JSON.parse(raw)
      if (parsed?.id) return Number(parsed.id)
    }
  } catch {
    // sin problema, usamos fallback
  }

  return 1
}

function normalizeReservation(reservation) {
  return {
    id: reservation.id,
    pet_id: reservation.pet_id,
    service_id: reservation.service_id ?? null,
    service_name: reservation.service_name ?? '',
    start_at: reservation.start_at ?? null,
    end_at: reservation.end_at ?? null,
    status: reservation.status ?? 'pending',
    resource_name: reservation.resource_name ?? '',
    notes: reservation.notes ?? '',
    created_at: reservation.created_at ?? null,
    updated_at: reservation.updated_at ?? null,
    daily_reports: Array.isArray(reservation.daily_reports) ? reservation.daily_reports : [],
  }
}

function attachReservationsToPet(pet) {
  const reservations = reservationsMock
    .filter((reservation) => Number(reservation.pet_id) === Number(pet.id))
    .map(normalizeReservation)

  return {
    ...pet,
    reservations,
  }
}

function normalizePet(pet) {
  return {
    id: pet.id,
    owner_user_id: pet.owner_user_id ?? null,
    name: pet.name ?? '',
    species: pet.species ?? 'Perro',
    breed: pet.breed ?? '',
    size: pet.size ?? '',
    birth_date: pet.birth_date ?? null,
    care_notes: pet.care_notes ?? '',
    photo_path: pet.photo_path ?? '',
    created_at: pet.created_at ?? null,
    updated_at: pet.updated_at ?? null,
    reservations: Array.isArray(pet.reservations) ? pet.reservations : [],
  }
}

function buildMockPhotoPath(payload, currentPet = {}) {
  if (payload.photo_file instanceof File) {
    revokeIfBlobUrl(currentPet.photo_path)
    return URL.createObjectURL(payload.photo_file)
  }

  if (typeof payload.photo_path === 'string') {
    if (!payload.photo_path.trim()) {
      revokeIfBlobUrl(currentPet.photo_path)
      return ''
    }

    return payload.photo_path.trim()
  }

  return currentPet.photo_path ?? ''
}

function buildPetWritePayload(payload, currentPet = {}) {
  return {
    name: payload.name ?? currentPet.name ?? '',
    species: payload.species ?? currentPet.species ?? 'Perro',
    breed: payload.breed ?? currentPet.breed ?? '',
    size: payload.size ?? currentPet.size ?? '',
    birth_date: payload.birth_date ?? currentPet.birth_date ?? null,
    care_notes: payload.care_notes ?? currentPet.care_notes ?? '',
    photo_path: buildMockPhotoPath(payload, currentPet),
  }
}

function buildJsonPayload(payload) {
  return {
    name: payload.name,
    species: payload.species ?? 'Perro',
    breed: payload.breed ?? '',
    size: payload.size ?? '',
    birth_date: payload.birth_date ?? null,
    care_notes: payload.care_notes ?? '',
    photo_path: payload.photo_path ?? '',
  }
}

function buildMultipartPayload(payload, method = 'POST') {
  const formData = new FormData()

  formData.append('name', payload.name ?? '')
  formData.append('species', payload.species ?? 'Perro')
  formData.append('breed', payload.breed ?? '')
  formData.append('size', payload.size ?? '')
  formData.append('birth_date', payload.birth_date ?? '')
  formData.append('care_notes', payload.care_notes ?? '')

  if (payload.photo_file instanceof File) {
    // Ajusta 'photo' si tu controlador Laravel usa otro nombre.
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
  if (USE_MOCKS) {
    await wait()

    const currentUserId = getCurrentMockUserId()

    return mockPetsStore
      .filter((pet) => Number(pet.owner_user_id) === currentUserId)
      .map((pet) => normalizePet(attachReservationsToPet(pet)))
      .sort((a, b) => a.name.localeCompare(b.name, 'es'))
  }

  const data = await apiRequest('/api/pets', {
    method: 'GET',
  })

  return parseCollectionResponse(data).map((pet) => normalizePet(pet))
}

export async function getMyPetById(id) {
  if (USE_MOCKS) {
    await wait()

    const currentUserId = getCurrentMockUserId()

    const pet = mockPetsStore.find(
      (item) =>
        Number(item.id) === Number(id) &&
        Number(item.owner_user_id) === currentUserId,
    )

    if (!pet) {
      throw new Error('Mascota no encontrada')
    }

    return normalizePet(attachReservationsToPet(pet))
  }

  const data = await apiRequest(`/api/pets/${id}`, {
    method: 'GET',
  })

  return normalizePet(normalizeSingleResponse(data))
}

export async function createPet(payload) {
  if (USE_MOCKS) {
    await wait()

    const currentUserId = getCurrentMockUserId()
    const now = new Date().toISOString()

    const newPet = {
      id: Math.max(0, ...mockPetsStore.map((pet) => Number(pet.id))) + 1,
      owner_user_id: currentUserId,
      created_at: now,
      updated_at: now,
      ...buildPetWritePayload(payload),
    }

    mockPetsStore.unshift(newPet)

    return normalizePet(attachReservationsToPet(newPet))
  }

  const hasFile = payload.photo_file instanceof File

  const body = hasFile
    ? buildMultipartPayload(payload, 'POST')
    : buildJsonPayload(payload)

  const data = await apiRequest('/api/pets', {
    method: 'POST',
    body,
  })

  return normalizePet(normalizeSingleResponse(data))
}

export async function updatePet(id, payload) {
  if (USE_MOCKS) {
    await wait()

    const index = mockPetsStore.findIndex((pet) => Number(pet.id) === Number(id))

    if (index === -1) {
      throw new Error('Mascota no encontrada')
    }

    const currentPet = mockPetsStore[index]

    const updatedPet = {
      ...currentPet,
      ...buildPetWritePayload(payload, currentPet),
      updated_at: new Date().toISOString(),
    }

    mockPetsStore[index] = updatedPet

    return normalizePet(attachReservationsToPet(updatedPet))
  }

  const hasFile = payload.photo_file instanceof File

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
  if (USE_MOCKS) {
    await wait()

    const index = mockPetsStore.findIndex((pet) => Number(pet.id) === Number(id))

    if (index === -1) {
      throw new Error('Mascota no encontrada')
    }

    revokeIfBlobUrl(mockPetsStore[index].photo_path)
    mockPetsStore.splice(index, 1)

    return { success: true }
  }

  await apiRequest(`/api/pets/${id}`, {
    method: 'DELETE',
  })

  return { success: true }
}