// sesion.types.ts
// Tipos e interfaces para el módulo de sesión de entrenamiento

import type { Ejercicio } from "../../types/rutinas.types";

/** Peso y repeticiones cargados en una serie */
export interface RegistroSerie {
  numeroSerie: number;
  peso: string;
  repeticiones: string;
}

/** Registro de las series de un ejercicio en una sesión */
export interface RegistroEjercicio {
  ejercicioId: number;
  series: RegistroSerie[];
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
