// src/utils/uiMessages.js

export const uiMessages = {
  pets: {
    loading: 'Estamos reuniendo a la manada...',
    success: {
      created: 'Nueva ficha guardada. Todo listo para su próxima aventura.',
      updated: 'Ficha actualizada correctamente. Ya está al día.',
      deleted: 'La mascota se ha dado de baja correctamente.',
      photoUpdated: 'La foto de perfil se ha actualizado correctamente.',
      photoRemoved: 'La foto de perfil se ha quitado de la ficha.',
    },
    empty: {
      title: 'Aquí no hay huellitas todavía',
      description:
        'Cuando añadas tu primera mascota, aparecerá aquí con su ficha y sus próximas estancias.',
    },
    noResults: {
      title: 'No hemos encontrado ninguna huellita por aquí',
      description:
        'Prueba con otro nombre, otra raza o limpia los filtros para volver a ver tus mascotas.',
    },
    errors: {
      load: 'No hemos podido cargar tus mascotas por ahora.',
      save: 'No se pudo guardar la ficha de la mascota.',
      delete: 'No se pudo dar de baja la mascota.',
      photoInvalidType: 'Esa foto no tiene un formato válido. Usa JPG, PNG o WEBP.',
      photoTooLarge: 'La foto es demasiado grande. El máximo permitido es 5 MB.',
    },
    sections: {
      all: {
        title: 'Mis mascotas',
        description: 'Gestiona las fichas de tus mascotas y mantén su información actualizada.',
      },
      today: {
        title: 'Hoy en el centro',
        description:
          'Aquí aparecen las mascotas que están hoy en el hotel o con servicio activo.',
      },
      upcoming: {
        title: 'Próximas estancias',
        description: 'Estas son las mascotas que tienen una estancia futura registrada.',
      },
      notes: {
        title: 'Mascotas con observaciones',
        description: 'Fichas con información importante guardada en el perfil.',
      },
      reports: {
        title: 'Mascotas con resumen disponible',
        description:
          'Aquí puedes revisar las mascotas que ya tienen seguimiento o resumen disponible.',
      },
    },
  },

  reservations: {
    loading: 'Estamos preparando la próxima aventura...',
    success: {
      created:
        'Reserva enviada correctamente. La manada ya tiene una nueva estancia en camino.',
      cancelled: 'La reserva se ha cancelado correctamente.',
    },
    errors: {
      load: 'No hemos podido cargar tus reservas por ahora.',
      save: 'No se pudo enviar la reserva.',
      cancel: 'No se pudo cancelar la reserva.',
    },
    empty: {
      title: 'Aquí todavía no hay reservas',
      description: 'Cuando prepares una nueva estancia, aparecerá reflejada en tu panel.',
    },
    emptyFiltered: {
      title: 'No hay reservas con esos filtros',
      description: 'Prueba con otra búsqueda o limpia los filtros para volver a ver todas tus reservas.',
    },
    noResults: {
      title: 'No hemos encontrado reservas con esos filtros',
      description:
        'Prueba con otro estado, otra búsqueda o limpia los filtros para volver a ver todas tus reservas.',
    },
    summary: {
      pending: 'Pendiente de confirmación',
      pendingDescription:
        'Cuando envíes la solicitud, quedará registrada como pendiente hasta su validación.',
    },
    sections: {
      all: {
        title: 'Mis reservas',
        description: 'Consulta el historial y las próximas estancias de tus mascotas.',
      },
      upcoming: {
        title: 'Próximas reservas',
        description: 'Aquí aparecen las estancias que todavía no han terminado.',
      },
      completed: {
        title: 'Finalizadas',
        description: 'Reservas ya completadas o cerradas.',
      },
    },  
  },

    profile: {
    loading: 'Estamos preparando tu rincón personal...',
    success: {
      updated: 'Tus datos se han guardado correctamente.',
    },
    errors: {
      load: 'No hemos podido cargar tu perfil por ahora.',
      save: 'No se pudieron guardar los cambios del perfil.',
    },
  },

  staffReservations: {
    success: {
      created: 'Nueva reserva guardada. Ya queda reflejada en el panel del centro.',
      updated: 'La reserva se ha actualizado correctamente.',
      confirmed: 'Reserva confirmada y lista para el centro.',
      cancelled: 'La reserva se ha cancelado correctamente.',
    },
    errors: {
      load: 'No hemos podido cargar las reservas del centro por ahora.',
      save: 'No se pudo guardar la reserva.',
      confirm: 'No se pudo confirmar la reserva.',
      cancel: 'No se pudo cancelar la reserva.',
      resourceRequired: 'Este servicio necesita un recurso compatible antes de confirmarse.',
      resourceUnavailable: 'Ese recurso ya no está disponible para esas fechas.',
    },
  },

  staffFollowUps: {
    success: {
      draftSaved: 'Borrador guardado. Puedes completarlo más tarde.',
      completed: 'Seguimiento completado correctamente. Ya queda listo en el panel del centro.',
    },
    errors: {
      load: 'No hemos podido cargar los seguimientos por ahora.',
      save: 'No hemos podido guardar el seguimiento.',
      completeRequiresSummary: 'Añade un resumen para el tutor antes de marcar el seguimiento como completado.',
      saveNotAvailable: 'El guardado real queda pendiente de conectar con backend cuando no uses mocks.',
      mediaPrepare: 'No hemos podido preparar las imágenes seleccionadas.',
    },
    empty: {
      title: 'No hay seguimientos con esos filtros',
      description:
        'Prueba con otra fecha, cambia el estado o limpia los filtros para volver a ver todas las reservas activas.',
    },
  },
}
