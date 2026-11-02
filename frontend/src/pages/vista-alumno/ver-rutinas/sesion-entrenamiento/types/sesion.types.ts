// sesion.types.ts
// Tipos e interfaces para el módulo de sesión de entrenamiento

import type { Ejercicio } from "../../types/rutinas.types";

/** Registro de peso y repeticiones de un ejercicio en una sesión */
export interface RegistroEjercicio {
  ejercicioId: number;
  peso: string;
  repeticiones: string;
  completado: boolean;
}

/** Datos de la última sesión registrada para un ejercicio */
export interface UltimaSesionEjercicio {
  ejercicioId: number;
  peso: string;
  repeticiones: string;
}

/** Ejercicio con datos de sesión combinados para la vista */
export interface EjercicioSesion extends Ejercicio {
  ultimaSesion?: UltimaSesionEjercicio;
  registro: RegistroEjercicio;
}

/** Estado general de una sesión de entrenamiento */
export type EstadoSesion = "en-curso" | "finalizada";

/** Sesión de entrenamiento completa */
export interface SesionEntrenamiento {
  rutinaId: number;
  rutinaNumero: number;
  estado: EstadoSesion;
  fechaInicio: string;
  fechaFin?: string;
  registros: RegistroEjercicio[];
}
