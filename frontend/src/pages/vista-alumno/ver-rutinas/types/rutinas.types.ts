// rutinas.types.ts
// Definición de tipos e interfaces para el módulo de rutinas del alumno

export type TipoEjercicio =
  | "calentamiento"
  | "core"
  | "fuerza"
  | "cardio"
  | "estiramiento";

export interface Ejercicio {
  id: number;
  tipo: TipoEjercicio;
  nombre: string;
  seriesRepeticiones?: string;
  pesoInicial?: string;
  observaciones?: string;
  duracion?: string;
}

export interface ProgresionSemana {
  semana: number;
  series: number;
  repeticiones: number;
  rir: number;
}

export interface Pausas {
  microPausa: string;
  macroPausa: string;
}

export interface RutinaDetalle {
  id: number;
  numero: number;
  nombre: string;
  cantidadEjercicios: number;
  calentamiento: string;
  core: Ejercicio[];
  fuerza: Ejercicio[];
  cardio: string;
  estiramiento: {
    descripcion: string;
  };
  progresionSemanal: ProgresionSemana[];
  pausas: Pausas;
}

export interface RutinaResumen {
  id: number;
  numero: number;
  nombre: string;
  cantidadEjercicios: number;
}

export interface PlanActivoDetalle {
  id: number;
  numero: number;
  alumno: string;
  objetivo: string;
  fechaInicio: string;
  fechaFin: string;
  activo: boolean;
  rutinas: RutinaResumen[];
}

