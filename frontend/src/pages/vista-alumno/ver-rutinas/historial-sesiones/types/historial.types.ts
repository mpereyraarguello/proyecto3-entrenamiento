// historial.types.ts
// Tipos para el historial de sesiones de entrenamiento

export interface EjercicioHistorial {
  ejercicioId: number | string;
  nombre: string;
  categoria:
    | "calentamiento"
    | "core"
    | "fuerza"
    | "cardio"
    | "estiramiento"
    | string;
  peso?: string;
  repeticiones?: string;
  series?: string;
  observaciones?: string;
  completado: boolean;
}

export interface SesionHistorial {
  id: string;
  fecha: string; // Fecha formateada o ISO
  planId: number;
  planNumero: number;
  rutinaId: number;
  rutinaNumero: number;
  rutinaNombre: string;
  duracionEstimada?: string;
  totalEjercicios: number;
  ejerciciosCompletados: EjercicioHistorial[];
}
