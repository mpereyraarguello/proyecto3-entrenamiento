// historialApi.ts
// Servicio para consultar y persistir el historial de sesiones de entrenamiento

import type { SesionHistorial } from "../types/historial.types";

const STORAGE_KEY = "gym_historial_sesiones_v4";

const HISTORIAL_INICIAL_MOCK: SesionHistorial[] = [
  {
    id: "sesion-mock-1",
    fecha: "23/10/2026 - 19:15 hs",
    planId: 22,
    planNumero: 22,
    rutinaId: 1,
    rutinaNumero: 1,
    rutinaNombre: "Rutina 1",
    duracionEstimada: "45 min",
    totalEjercicios: 12,
    ejerciciosCompletados: [
      {
        ejercicioId: "cal-1",
        nombre: "MOV. TÓRAX CUADRUP. 2X10",
        categoria: "calentamiento",
        completado: true,
      },
      {
        ejercicioId: "cal-2",
        nombre: "ROTAC. INT. EXT. CAD. 2X10",
        categoria: "calentamiento",
        completado: true,
      },
      {
        ejercicioId: "cal-3",
        nombre: "DORSIFLEX TOB. 3X10",
        categoria: "calentamiento",
        completado: true,
      },
      {
        ejercicioId: "cal-4",
        nombre: "PUENTE FRONTAL BAJO 15’’",
        categoria: "calentamiento",
        completado: false,
      },
      {
        ejercicioId: 101,
        nombre: "Puente bajo TRX",
        categoria: "core",
        peso: "-",
        repeticiones: "10",
        series: "3x10",
        completado: true,
      },
      {
        ejercicioId: 102,
        nombre: "Rueda abdominal",
        categoria: "core",
        peso: "-",
        repeticiones: "10",
        series: "3x10x10''",
        completado: true,
      },
      {
        ejercicioId: 201,
        nombre: "Sentadilla profunda",
        categoria: "fuerza",
        peso: "38 kg",
        repeticiones: "12",
        series: "3x12",
        completado: true,
      },
      {
        ejercicioId: 202,
        nombre: "Subidas al banco",
        categoria: "fuerza",
        peso: "14 kg",
        repeticiones: "12",
        series: "3x12",
        completado: true,
      },
      {
        ejercicioId: 203,
        nombre: "Prensa 45°",
        categoria: "fuerza",
        peso: "10 kg",
        repeticiones: "12",
        series: "3x12",
        completado: true,
      },
      {
        ejercicioId: 204,
        nombre: "Sillón de cuadriceps",
        categoria: "fuerza",
        peso: "32 kg",
        repeticiones: "12",
        series: "3x12",
        completado: true,
      },
      {
        ejercicioId: 205,
        nombre: "Camilla de isquiotibiales",
        categoria: "fuerza",
        peso: "48 kg",
        repeticiones: "12",
        series: "3x12",
        completado: true,
      },
      {
        ejercicioId: "est-1",
        nombre: "Elongación general de grupos musculares",
        categoria: "estiramiento",
        series: "10'' por grupo muscular",
        completado: true,
      },
    ],
  },
  {
    id: "sesion-mock-2",
    fecha: "21/10/2026 - 18:00 hs",
    planId: 22,
    planNumero: 22,
    rutinaId: 2,
    rutinaNumero: 2,
    rutinaNombre: "Rutina 2",
    duracionEstimada: "50 min",
    totalEjercicios: 12,
    ejerciciosCompletados: [
      {
        ejercicioId: "cal-1",
        nombre: "MOV. TÓRAX CUADRUP. 2X10",
        categoria: "calentamiento",
        completado: false,
      },
      {
        ejercicioId: "cal-2",
        nombre: "ROTAC. INT. EXT. CAD. 2X10",
        categoria: "calentamiento",
        completado: false,
      },
      {
        ejercicioId: "cal-3",
        nombre: "DORSIFLEX TOB. 3X10",
        categoria: "calentamiento",
        completado: false,
      },
      {
        ejercicioId: "cal-4",
        nombre: "PUENTE FRONTAL BAJO 15’’",
        categoria: "calentamiento",
        completado: false,
      },
      {
        ejercicioId: 103,
        nombre: "Plancha lateral con elevación",
        categoria: "core",
        peso: "-",
        repeticiones: "15",
        series: "3x15",
        completado: true,
      },
      {
        ejercicioId: 104,
        nombre: "Bicho muerto con fitball",
        categoria: "core",
        peso: "-",
        repeticiones: "10",
        series: "3x10",
        completado: true,
      },
      {
        ejercicioId: 206,
        nombre: "Press plano con mancuernas",
        categoria: "fuerza",
        peso: "10 kg c/u",
        repeticiones: "12",
        series: "3x12",
        completado: true,
      },
      {
        ejercicioId: 207,
        nombre: "Remo unilateral con mancuerna",
        categoria: "fuerza",
        peso: "10 kg",
        repeticiones: "12",
        series: "3x12",
        completado: true,
      },
      {
        ejercicioId: 208,
        nombre: "Press militar sentado",
        categoria: "fuerza",
        peso: "28 kg",
        repeticiones: "12",
        series: "3x12",
        completado: true,
      },
      {
        ejercicioId: 209,
        nombre: "Vuelos laterales",
        categoria: "fuerza",
        peso: "14 kg",
        repeticiones: "12",
        series: "3x12",
        completado: true,
      },
      {
        ejercicioId: 210,
        nombre: "Jalón al pecho agarre prono",
        categoria: "fuerza",
        peso: "42 kg",
        repeticiones: "12",
        series: "3x12",
        completado: true,
      },
      {
        ejercicioId: "est-1",
        nombre: "Elongación general de grupos musculares",
        categoria: "estiramiento",
        series: "10'' por grupo muscular",
        completado: false,
      },
    ],
  },
];

/**
 * Obtener la lista de sesiones del historial
 */
export const obtenerHistorialSesiones = (): Promise<SesionHistorial[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as SesionHistorial[];
          resolve(parsed);
          return;
        }
      } catch (err) {
        console.warn("Error leyendo historial de localStorage:", err);
      }

      // Guardar el mock inicial si no hay nada
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(HISTORIAL_INICIAL_MOCK));
      } catch (err) {
        console.warn("Error inicializando localStorage:", err);
      }

      resolve(HISTORIAL_INICIAL_MOCK);
    }, 250);
  });
};

/**
 * Guardar una nueva sesión en el historial
 */
export const agregarSesionAlHistorial = (
  sesion: Omit<SesionHistorial, "id">
): Promise<SesionHistorial> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let historial = HISTORIAL_INICIAL_MOCK;
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          historial = JSON.parse(raw);
        }
      } catch (err) {
        console.warn("Error cargando historial previo:", err);
      }

      const nuevaSesion: SesionHistorial = {
        ...sesion,
        id: `sesion-${Date.now()}`,
      };

      const actualizado = [nuevaSesion, ...historial];

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizado));
      } catch (err) {
        console.warn("Error guardando nueva sesión en localStorage:", err);
      }

      resolve(nuevaSesion);
    }, 200);
  });
};
