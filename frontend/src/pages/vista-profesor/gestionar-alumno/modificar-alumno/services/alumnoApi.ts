// Servicio mock para modificar-alumno
// Cuando se integre con el backend, reemplazar estos métodos por llamadas HTTP reales.

import type { Alumno } from '../../components-comunes/types'

export const alumnoApi = {
  /**
   * Obtiene los datos de un alumno por ID.
   * (Mock: retorna el alumno tal como se recibe)
   */
  obtener: async (id: string): Promise<Alumno | null> => {
    // TODO: reemplazar con GET /api/alumnos/:id
    console.log('obtener alumno id:', id)
    return null
  },

  /**
   * Actualiza los datos de un alumno existente.
   * (Mock: retorna el alumno actualizado localmente)
   */
  actualizar: async (alumno: Alumno): Promise<Alumno> => {
    // TODO: reemplazar con PUT /api/alumnos/:id
    return alumno
  },
}

