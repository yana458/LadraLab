import { petsMock } from './petsMock'
import { servicesMock } from './servicesMock'

function buildIso(daysFromToday, hours = 9, minutes = 0) {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + daysFromToday)
  date.setHours(hours, minutes, 0, 0)
  return date.toISOString()
}

function dayKey(daysFromToday) {
  return buildIso(daysFromToday, 12, 0).slice(0, 10)
}

function petById(id) {
  return petsMock.find((pet) => pet.id === id) || null
}

function serviceById(id) {
  return servicesMock.find((service) => service.id === id) || null
}

function withRelations(reservation) {
  const pet = petById(reservation.pet_id)
  const service = serviceById(reservation.service_id)

  return {
    ...reservation,
    pet,
    service,
    service_name: reservation.service_name || service?.name || '',
  }
}

const rawReservations = [
  {
    id: 301,
    client_user_id: 1,
    pet_id: 1, // Luna · medium
    service_id: 1, // Guardería de día
    resource_id: 9, // Patio Nala
    service_name: 'Guardería de día',
    start_at: buildIso(0, 9, 0),
    end_at: buildIso(0, 18, 0),
    status: 'confirmed',
    resource_name: 'Patio Nala',
    notes: 'Llegada habitual por la mañana. Trae su pienso medido.',
    created_at: buildIso(-6, 11, 30),
    updated_at: buildIso(-1, 17, 10),
    daily_reports: [
      {
        id: 401,
        report_date: dayKey(0),
        status: 'completed',
        completed_at: buildIso(0, 17, 20),
        food_done: true,
        walk_done: true,
        rest_done: true,
        hygiene_done: false,
        medication_done: false,
        play_done: true,
        summary: 'Día tranquilo y activo. Ha estado cómoda en grupo y ha descansado bien.',
        observations: 'Buena interacción con otros perros. Sin incidencias.',
        media: [
          {
            id: 901,
            daily_report_id: 401,
            file_path:
              'https://images.unsplash.com/photo-1558788353-f76d92427f16?q=80&w=900&auto=format&fit=crop',
            file_type: 'image',
            uploaded_at: buildIso(0, 16, 15),
            name: 'luna-patio.jpg',
          },
        ],
      },
    ],
  },

  {
    id: 302,
    client_user_id: 4,
    pet_id: 5, // Nala · large
    service_id: 1,
    resource_id: 10,
    service_name: 'Guardería de día',
    start_at: buildIso(0, 8, 45),
    end_at: buildIso(0, 17, 30),
    status: 'confirmed',
    resource_name: 'Patio Rocky',
    notes: 'Controlar la intensidad del juego en la primera hora.',
    created_at: buildIso(-4, 9, 0),
    updated_at: buildIso(0, 8, 10),
    daily_reports: [
      {
        id: 402,
        report_date: dayKey(0),
        status: 'draft',
        completed_at: null,
        food_done: true,
        walk_done: true,
        rest_done: false,
        hygiene_done: true,
        medication_done: false,
        play_done: true,
        summary: 'Ha empezado el día con mucha energía. Falta completar el descanso de la tarde.',
        observations: 'Se recomienda cerrar el informe después del segundo descanso.',
        media: [],
      },
    ],
  },

  {
    id: 303,
    client_user_id: 1,
    pet_id: 2, // Milo · small
    service_id: 5, // Adaptación tranquila
    resource_id: 11,
    service_name: 'Adaptación tranquila',
    start_at: buildIso(0, 10, 0),
    end_at: buildIso(0, 15, 0),
    status: 'confirmed',
    resource_name: 'Sala Calma',
    notes: 'Primera hora en zona tranquila y presentación gradual.',
    created_at: buildIso(-3, 12, 0),
    updated_at: buildIso(-1, 9, 45),
    daily_reports: [],
  },

  {
    id: 304,
    client_user_id: 3,
    pet_id: 4, // Thor · large
    service_id: 2, // Hotel canino
    resource_id: 5,
    service_name: 'Hotel canino',
    start_at: buildIso(-1, 10, 0),
    end_at: buildIso(2, 17, 0),
    status: 'confirmed',
    resource_name: 'Suite Thor',
    notes: 'Salida prevista dentro de dos días. Mantener descanso entre juegos largos.',
    created_at: buildIso(-8, 9, 20),
    updated_at: buildIso(0, 8, 30),
    daily_reports: [
      {
        id: 403,
        report_date: dayKey(-1),
        status: 'completed',
        completed_at: buildIso(-1, 18, 10),
        food_done: true,
        walk_done: true,
        rest_done: true,
        hygiene_done: true,
        medication_done: false,
        play_done: true,
        summary: 'Muy sociable y con buen apetito. Ha mantenido un ritmo estable durante la estancia.',
        observations: 'Conviene mantener descansos entre juegos largos.',
        media: [],
      },
      {
        id: 404,
        report_date: dayKey(0),
        status: 'draft',
        completed_at: null,
        food_done: true,
        walk_done: true,
        rest_done: true,
        hygiene_done: false,
        medication_done: false,
        play_done: true,
        summary: 'Sigue activo y tranquilo. Falta revisar higiene antes de cerrar el informe.',
        observations: 'Sin incidencias relevantes hoy.',
        media: [
          {
            id: 902,
            daily_report_id: 404,
            file_path:
              'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=900&auto=format&fit=crop',
            file_type: 'image',
            uploaded_at: buildIso(0, 13, 5),
            name: 'thor-descanso.jpg',
          },
        ],
      },
    ],
  },

  {
    id: 305,
    client_user_id: 6,
    pet_id: 7, // Bruno · large
    service_id: 2,
    resource_id: null,
    service_name: 'Hotel canino',
    start_at: buildIso(0, 10, 0),
    end_at: buildIso(3, 17, 0),
    status: 'pending',
    resource_name: '',
    notes: 'Pendiente de asignar suite compatible antes de confirmar.',
    created_at: buildIso(-1, 15, 0),
    updated_at: buildIso(-1, 15, 0),
    daily_reports: [],
  },

  {
    id: 306,
    client_user_id: 2,
    pet_id: 3, // Kira · medium
    service_id: 1,
    resource_id: 9,
    service_name: 'Guardería de día',
    start_at: buildIso(0, 9, 15),
    end_at: buildIso(0, 18, 0),
    status: 'confirmed',
    resource_name: 'Patio Nala',
    notes: 'Revisar bien la correa antes de cada salida.',
    created_at: buildIso(-2, 10, 15),
    updated_at: buildIso(0, 9, 5),
    daily_reports: [
      {
        id: 405,
        report_date: dayKey(0),
        status: 'completed',
        completed_at: buildIso(0, 16, 50),
        food_done: true,
        walk_done: true,
        rest_done: true,
        hygiene_done: true,
        medication_done: false,
        play_done: true,
        summary: 'Muy buen día. Ha canalizado bien la energía con juegos guiados y paseo corto.',
        observations: 'Responde especialmente bien a rutinas claras.',
        media: [],
      },
    ],
  },

  {
    id: 307,
    client_user_id: 5,
    pet_id: 6, // Coco · small
    service_id: 1,
    resource_id: 7,
    service_name: 'Guardería de día',
    start_at: buildIso(0, 9, 30),
    end_at: buildIso(0, 16, 30),
    status: 'confirmed',
    resource_name: 'Patio Chispa',
    notes: 'Grupo pequeño. Evitar juegos bruscos.',
    created_at: buildIso(-7, 10, 30),
    updated_at: buildIso(-1, 18, 0),
    daily_reports: [],
  },

  {
    id: 308,
    client_user_id: 9,
    pet_id: 10, // Nube · large
    service_id: 2,
    resource_id: 6,
    service_name: 'Hotel canino',
    start_at: buildIso(-2, 10, 0),
    end_at: buildIso(0, 17, 0),
    status: 'confirmed',
    resource_name: 'Suite Bruno',
    notes: 'Último día de estancia. Revisar cepillado antes de salida.',
    created_at: buildIso(-10, 9, 50),
    updated_at: buildIso(0, 7, 45),
    daily_reports: [
      {
        id: 406,
        report_date: dayKey(-1),
        status: 'completed',
        completed_at: buildIso(-1, 17, 30),
        food_done: true,
        walk_done: true,
        rest_done: true,
        hygiene_done: true,
        medication_done: false,
        play_done: true,
        summary: 'Estancia estable. Ha buscado zonas frescas y ha descansado bien.',
        observations: 'Controlar calor por el manto abundante.',
        media: [],
      },
      {
        id: 407,
        report_date: dayKey(0),
        status: 'completed',
        completed_at: buildIso(0, 15, 40),
        food_done: true,
        walk_done: true,
        rest_done: true,
        hygiene_done: true,
        medication_done: false,
        play_done: false,
        summary: 'Último día tranquilo. Se ha priorizado descanso, agua y cepillado suave.',
        observations: 'Lista para la recogida. Sin incidencias.',
        media: [
          {
            id: 903,
            daily_report_id: 407,
            file_path:
              'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=900&auto=format&fit=crop',
            file_type: 'image',
            uploaded_at: buildIso(0, 14, 35),
            name: 'nube-descanso.jpg',
          },
        ],
      },
    ],
  },

  {
    id: 309,
    client_user_id: 10,
    pet_id: 11, // Rocky · large
    service_id: 2,
    resource_id: 5,
    service_name: 'Hotel canino',
    start_at: buildIso(-3, 10, 0),
    end_at: buildIso(1, 17, 0),
    status: 'confirmed',
    resource_name: 'Suite Thor',
    notes: 'Evitar juegos de salto después de comer.',
    created_at: buildIso(-12, 13, 0),
    updated_at: buildIso(-1, 11, 0),
    daily_reports: [
      {
        id: 408,
        report_date: dayKey(-2),
        status: 'completed',
        completed_at: buildIso(-2, 17, 55),
        food_done: true,
        walk_done: true,
        rest_done: true,
        hygiene_done: false,
        medication_done: false,
        play_done: true,
        summary: 'Muy juguetón, pero algo excitado en el patio grande.',
        observations: 'Mejor alternar juego y descanso.',
        media: [],
      },
    ],
  },

  {
    id: 310,
    client_user_id: 11,
    pet_id: 12, // Maya · medium
    service_id: 1,
    resource_id: 9,
    service_name: 'Guardería de día',
    start_at: buildIso(0, 9, 0),
    end_at: buildIso(0, 18, 0),
    status: 'confirmed',
    resource_name: 'Patio Nala',
    notes: 'Puede llorar al separarse. Darle un rato de acompañamiento inicial.',
    created_at: buildIso(-5, 16, 40),
    updated_at: buildIso(-1, 12, 10),
    daily_reports: [],
  },

  {
    id: 311,
    client_user_id: 12,
    pet_id: 13, // Leo · medium
    service_id: 4,
    resource_id: null,
    service_name: 'Entrenamiento',
    start_at: buildIso(0, 17, 0),
    end_at: buildIso(0, 18, 0),
    status: 'confirmed',
    resource_name: '',
    notes: 'Sesión de obediencia básica. No aparece en seguimiento diario.',
    created_at: buildIso(-1, 10, 30),
    updated_at: buildIso(-1, 10, 30),
    daily_reports: [],
  },

  {
    id: 312,
    client_user_id: 13,
    pet_id: 14, // Trufa · toy
    service_id: 3,
    resource_id: null,
    service_name: 'Baño y puesta a punto',
    start_at: buildIso(0, 11, 0),
    end_at: buildIso(0, 12, 0),
    status: 'confirmed',
    resource_name: '',
    notes: 'Cita de higiene. No aparece en seguimiento diario.',
    created_at: buildIso(-1, 10, 30),
    updated_at: buildIso(-1, 10, 30),
    daily_reports: [],
  },

  {
    id: 313,
    client_user_id: 8,
    pet_id: 9, // Simba · medium
    service_id: 1,
    resource_id: 9,
    service_name: 'Guardería de día',
    start_at: buildIso(1, 9, 0),
    end_at: buildIso(1, 18, 0),
    status: 'confirmed',
    resource_name: 'Patio Nala',
    notes: 'No forzar contacto con perros nuevos.',
    created_at: buildIso(-2, 13, 0),
    updated_at: buildIso(-1, 13, 20),
    daily_reports: [],
  },

  {
    id: 314,
    client_user_id: 7,
    pet_id: 8, // Chispa · toy
    service_id: 5,
    resource_id: 11,
    service_name: 'Adaptación tranquila',
    start_at: buildIso(1, 10, 0),
    end_at: buildIso(1, 15, 0),
    status: 'confirmed',
    resource_name: 'Sala Calma',
    notes: 'Trae manta propia para el descanso.',
    created_at: buildIso(-1, 12, 30),
    updated_at: buildIso(-1, 12, 30),
    daily_reports: [],
  },

  {
    id: 315,
    client_user_id: 4,
    pet_id: 5,
    service_id: 2,
    resource_id: 5,
    service_name: 'Hotel canino',
    start_at: buildIso(2, 10, 0),
    end_at: buildIso(5, 17, 0),
    status: 'confirmed',
    resource_name: 'Suite Thor',
    notes: 'Estancia futura. Sirve para probar navegación por fecha.',
    created_at: buildIso(-2, 9, 0),
    updated_at: buildIso(-2, 9, 0),
    daily_reports: [],
  },

  {
    id: 316,
    client_user_id: 1,
    pet_id: 2,
    service_id: 1,
    resource_id: 7,
    service_name: 'Guardería de día',
    start_at: buildIso(-2, 9, 0),
    end_at: buildIso(-2, 18, 0),
    status: 'completed',
    resource_name: 'Patio Chispa',
    notes: 'Reserva finalizada. No debe aparecer en la vista de seguimiento actual.',
    created_at: buildIso(-8, 9, 0),
    updated_at: buildIso(-2, 18, 10),
    daily_reports: [
      {
        id: 409,
        report_date: dayKey(-2),
        status: 'completed',
        completed_at: buildIso(-2, 17, 50),
        food_done: true,
        walk_done: true,
        rest_done: true,
        hygiene_done: true,
        medication_done: false,
        play_done: true,
        summary: 'Finalizó la jornada correctamente.',
        observations: 'Sin incidencias.',
        media: [],
      },
    ],
  },

  {
    id: 317,
    client_user_id: 2,
    pet_id: 3,
    service_id: 2,
    resource_id: 3,
    service_name: 'Hotel canino',
    start_at: buildIso(4, 10, 0),
    end_at: buildIso(7, 17, 0),
    status: 'pending',
    resource_name: 'Suite Luna',
    notes: 'Pendiente de confirmación de horario de recogida.',
    created_at: buildIso(-1, 16, 15),
    updated_at: buildIso(-1, 16, 15),
    daily_reports: [],
  },

  {
    id: 318,
    client_user_id: 6,
    pet_id: 7,
    service_id: 1,
    resource_id: null,
    service_name: 'Guardería de día',
    start_at: buildIso(3, 9, 0),
    end_at: buildIso(3, 18, 0),
    status: 'cancelled',
    resource_name: '',
    notes: 'Cancelada por el tutor. No debe aparecer en seguimiento.',
    created_at: buildIso(-4, 10, 0),
    updated_at: buildIso(-2, 10, 0),
    daily_reports: [],
  },

  {
    id: 319,
    client_user_id: 9,
    pet_id: 10,
    service_id: 7,
    resource_id: null,
    service_name: 'Peluquería completa',
    start_at: buildIso(2, 12, 0),
    end_at: buildIso(2, 13, 30),
    status: 'confirmed',
    resource_name: '',
    notes: 'Servicio con cita por hora. No aparece en seguimiento diario.',
    created_at: buildIso(-1, 8, 30),
    updated_at: buildIso(-1, 8, 30),
    daily_reports: [],
  },

  {
    id: 320,
    client_user_id: 10,
    pet_id: 11,
    service_id: 6,
    resource_id: null,
    service_name: 'Paseo individual',
    start_at: buildIso(1, 11, 0),
    end_at: buildIso(1, 11, 45),
    status: 'confirmed',
    resource_name: '',
    notes: 'Paseo individual. No aparece en seguimiento diario.',
    created_at: buildIso(-1, 8, 30),
    updated_at: buildIso(-1, 8, 30),
    daily_reports: [],
  },
]

export const reservationsMock = rawReservations.map(withRelations)
