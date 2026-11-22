// duda a cambiar
import type { PlanListado, PlanDetalle } from '../types/plan-entrenamiento.types';

// Ajustá esta URL base según cómo la tengas configurada en tu proyecto
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const planEntrenamientoApi = {
  // GET /planes-entrenamiento?alumnoId=...&estado=...
  obtenerTodos: async (filtros?: { alumnoId?: string; estado?: string }): Promise<PlanListado[]> => {
    const queryParams = new URLSearchParams();
    if (filtros?.alumnoId) queryParams.append('alumnoId', filtros.alumnoId);
    if (filtros?.estado) queryParams.append('estado', filtros.estado);

    const response = await fetch(`${API_URL}/planes-entrenamiento?${queryParams.toString()}`);
    if (!response.ok) throw new Error('Error al obtener los planes');
    return response.json();
  },

  // GET /planes-entrenamiento/:id
  obtenerPorId: async (id: string): Promise<PlanDetalle> => {
    const response = await fetch(`${API_URL}/planes-entrenamiento/${id}`);
    if (!response.ok) throw new Error('Error al obtener el detalle del plan');
    return response.json();
  }
};