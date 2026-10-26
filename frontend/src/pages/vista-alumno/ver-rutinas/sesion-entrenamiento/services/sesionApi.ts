// sesionApi.ts
// Servicio mock para la sesión de entrenamiento

import type { UltimaSesionEjercicio } from "../types/sesion.types";

/**
 * Mock: pesos y repeticiones de la última sesión registrada para cada ejercicio.
 * Simula GET /api/sesiones/ultima/:rutinaId
 */
const ULTIMA_SESION_MOCK: Record<number, UltimaSesionEjercicio[]> = {
  // Rutina 1
  1: [
    { ejercicioId: 101, peso: "-", repeticiones: "10" },
    { ejercicioId: 102, peso: "-", repeticiones: "10" },
    { ejercicioId: 201, peso: "38 kg", repeticiones: "12" },
    { ejercicioId: 202, peso: "14 kg", repeticiones: "12" },
    { ejercicioId: 203, peso: "10 kg", repeticiones: "12" },
    { ejercicioId: 204, peso: "32 kg", repeticiones: "12" },
    { ejercicioId: 205, peso: "48 kg", repeticiones: "12" },
  ],
  // Rutina 2
  2: [
    { ejercicioId: 103, peso: "-", repeticiones: "15" },
    { ejercicioId: 104, peso: "-", repeticiones: "10" },
    { ejercicioId: 206, peso: "10 kg c/u", repeticiones: "12" },
    { ejercicioId: 207, peso: "10 kg", repeticiones: "12" },
    { ejercicioId: 208, peso: "28 kg", repeticiones: "12" },
    { ejercicioId: 209, peso: "14 kg", repeticiones: "12" },
    { ejercicioId: 210, peso: "42 kg", repeticiones: "12" },
  ],
  // Rutina 3
  3: [
    { ejercicioId: 105, peso: "-", repeticiones: "15" },
    { ejercicioId: 106, peso: "-", repeticiones: "15" },
    { ejercicioId: 211, peso: "32 kg", repeticiones: "12" },
    { ejercicioId: 212, peso: "12 kg c/u", repeticiones: "12" },
    { ejercicioId: 213, peso: "14 kg", repeticiones: "12" },
    { ejercicioId: 214, peso: "14 kg", repeticiones: "12" },
  ],
};

/**
 * Endpoint simulado: GET /api/sesiones/ultima/:rutinaId
 * Retorna los registros de la última sesión para una rutina dada.
 */
export const obtenerUltimaSesion = (
  rutinaId: number | string
): Promise<UltimaSesionEjercicio[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const idNum = Number(rutinaId);
      const registros = ULTIMA_SESION_MOCK[idNum] || [];
      resolve(registros);
    }, 200);
  });
};

/**
 * Endpoint simulado: POST /api/sesiones
 * Guarda una sesión de entrenamiento finalizada.
 */
export const guardarSesion = (
  rutinaId: number,
  registros: { ejercicioId: number; peso: string; repeticiones: string }[]
): Promise<{ ok: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Sesión guardada (mock):", { rutinaId, registros });
      resolve({ ok: true });
    }, 300);
  });
};
