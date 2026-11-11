// historialApi.ts
// Servicio para consultar el historial de sesiones de entrenamiento desde el backend (HU 6A)

import type { EjercicioHistorial, SesionHistorial } from "../types/historial.types";

const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string) || "http://localhost:3000";

export interface PlanConHistorial {
  planId: string;
  totalSesiones: number;
  primeraSesion: string;
  etiqueta: string;
}

export interface HistorialPlanBackendResponse {
  planId: string;
  totalSesiones: number;
  totalEjerciciosCompletados: number;
  sesiones: SesionHistorial[];
}

/**
 * Mapear un item de sesión devuelto por el backend a la estructura visual de SesionHistorial
 */
function mapearSesionBackend(item: any): SesionHistorial {
  const ejerciciosCompletados: EjercicioHistorial[] = [];

  // 1. Calentamiento (obligatorio)
  if (item.bloques?.calentamiento) {
    ejerciciosCompletados.push({
      ejercicioId: "cal-conjunto",
      nombre:
        item.bloques.calentamiento.nombre ||
        "Calentamiento y Movilidad Articular",
      categoria: "calentamiento",
      series: "4 ejercicios de preparación articular",
      completado: Boolean(item.bloques.calentamiento.completado),
    });
  }

  // 2. Ejercicios registrados (Core y Fuerza)
  if (Array.isArray(item.ejercicios)) {
    item.ejercicios.forEach((ej: any) => {
      ejerciciosCompletados.push({
        ejercicioId: ej.ejercicioId,
        nombre: ej.nombre,
        categoria: (ej.tipo || "fuerza").toLowerCase(),
        peso: ej.peso && ej.peso !== "" ? ej.peso : "-",
        repeticiones:
          ej.repeticiones && ej.repeticiones !== "" ? ej.repeticiones : "-",
        series:
          Array.isArray(ej.series) && ej.series.length > 0
            ? ej.series
                .map(
                  (serie: any) =>
                    `S${serie.numeroSerie}: ${serie.peso} kg × ${serie.repeticiones}`
                )
                .join(" · ")
            : undefined,
        completado: Boolean(ej.completado),
      });
    });
  }

  // 3. Cardio (si existe)
  if (item.bloques?.cardio) {
    ejerciciosCompletados.push({
      ejercicioId: "car-1",
      nombre:
        item.bloques.cardio.nombre || "Entrenamiento Cardiovascular",
      categoria: "cardio",
      series: "Cardio continuo",
      completado: Boolean(item.bloques.cardio.completado),
    });
  }

  // 4. Estiramiento (si existe)
  if (item.bloques?.estiramiento) {
    ejerciciosCompletados.push({
      ejercicioId: "est-1",
      nombre:
        item.bloques.estiramiento.nombre ||
        "Elongación y vuelta a la calma",
      categoria: "estiramiento",
      series: "Elongación muscular",
      completado: Boolean(item.bloques.estiramiento.completado),
    });
  }

  return {
    id: item.id,
    fecha: item.fechaFormateada || new Date(item.fechaInicio).toLocaleString("es-AR"),
    planId: Number(item.planId) || 1,
    planNumero: Number(item.planId) || 0,
    rutinaId: Number(item.rutinaId) || 1,
    rutinaNumero: item.rutinaNumero || 1,
    rutinaNombre: item.rutinaNombre || `Rutina ${item.rutinaNumero || 1}`,
    duracionEstimada: item.duracionEstimada || `${item.duracionMinutos || 45} min`,
    totalEjercicios: item.totalEjercicios ?? 0,
    totalEjerciciosCompletados: item.totalEjerciciosCompletados ?? 0,
    ejerciciosCompletados,
  };
}

/**
 * Planes del alumno que tienen sesiones finalizadas (CP-6A-7)
 * GET /sesiones-entrenamiento/historial/:alumnoId
 */
export async function obtenerPlanesConHistorial(
  alumnoId = "alu-1"
): Promise<PlanConHistorial[]> {
  const response = await fetch(
    `${API_BASE_URL}/sesiones-entrenamiento/historial/${alumnoId}`
  );

  if (!response.ok) {
    throw new Error(`Error al obtener planes: status ${response.status}`);
  }

  return response.json();
}

/**
 * Obtener la lista de sesiones del historial y métricas calculadas en backend (HU 6A)
 * GET /sesiones-entrenamiento/historial/:alumnoId/:planId
 */
export async function obtenerHistorialPlan(
  alumnoId = "alu-1",
  planId = "plan-1"
): Promise<HistorialPlanBackendResponse> {
  const response = await fetch(
    `${API_BASE_URL}/sesiones-entrenamiento/historial/${alumnoId}/${planId}`
  );

  if (!response.ok) {
    throw new Error(
      `Error al obtener historial: status ${response.status}`
    );
  }

  const data = await response.json();
  const sesiones = (data.sesiones || []).map(mapearSesionBackend);

  return {
    planId: data.planId,
    totalSesiones: data.totalSesiones ?? sesiones.length,
    totalEjerciciosCompletados:
      data.totalEjerciciosCompletados ??
      sesiones.reduce((acc: number, s: SesionHistorial) => acc + s.ejerciciosCompletados.length, 0),
    sesiones,
  };
}

/**
 * Mantiene compatibilidad con componentes que guardaban en localStorage
 */
export async function agregarSesionAlHistorial(
  sesion: Omit<SesionHistorial, "id">
): Promise<SesionHistorial> {
  return {
    ...sesion,
    id: `sesion-${Date.now()}`,
  };
}
