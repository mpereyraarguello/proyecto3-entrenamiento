// Servicio mock para crear-alumno
// Cuando se integre con el backend, reemplazar estos métodos por llamadas HTTP reales.

import type { Alumno } from '../../components-comunes/types'

export const alumnoApi = {
  /**
   * Crea un nuevo alumno.
   * (Mock: retorna el alumno con id y fecha generados localmente)
   */
  crear: async (datos: Omit<Alumno, 'id' | 'creadoEn'>): Promise<Alumno> => {
    // TODO: reemplazar con POST /api/alumnos
    return {
      ...datos,
      id: Date.now().toString(),
      creadoEn: new Date().toISOString(),
    }
  },
}

