// rutinasApi.ts
// Servicio para consultar las rutinas del plan activo del alumno

import type {
  PlanActivoDetalle,
  RutinaResumen,
} from "../../types/rutinas.types";

const PLAN_ACTIVO_MOCK: PlanActivoDetalle = {
  id: 1,
  numero: 1,
  alumno: "Zandrino, Mateo",
  objetivo: "Mejorar composición corporal",
  fechaInicio: "2026-10-07",
  fechaFin: "2026-11-07",
  activo: true,
  rutinas: [
    { id: 1, numero: 1, nombre: "Rutina 1", cantidadEjercicios: 12 },
    { id: 2, numero: 2, nombre: "Rutina 2", cantidadEjercicios: 12 },
    { id: 3, numero: 3, nombre: "Rutina 3", cantidadEjercicios: 11 },
  ],
};

/**
 * Endpoint simulado: GET /api/planes/:planId/rutinas
 * Retorna el plan de entrenamiento activo y sus rutinas asignadas
 */
export const obtenerRutinasPorPlan = (
  planId?: number | string
): Promise<{ plan: PlanActivoDetalle | null; rutinas: RutinaResumen[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!planId || Number(planId) === 1 || Number(planId) === 22) {
        resolve({
          plan: {
            ...PLAN_ACTIVO_MOCK,
            id: Number(planId) || 1,
            numero: Number(planId) || 1,
          },
          rutinas: PLAN_ACTIVO_MOCK.rutinas,
        });
        return;
      }

      // Si se consulta un plan no encontrado o inactivo
      resolve({
        plan: null,
        rutinas: [],
      });
    }, 300);
  });
};

