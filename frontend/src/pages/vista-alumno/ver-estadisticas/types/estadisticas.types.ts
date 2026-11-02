// estadisticas.types.ts
// Definiciones e interfaces para el módulo de estadísticas y evolución del alumno

export type TipoEjercicioEstadistica = "fuerza" | "core";

export interface RegistroPeso {
  id: number;
  fecha: string;
  semana: number;
  peso: number;
  unidad: string;
  series: number;
  repeticiones: number;
  rir?: number;
}

export interface PRHistorico {
  peso: number;
  unidad: string;
  fecha: string;
  nombrePlan: string;
  esPlanActual: boolean;
}

export interface EjercicioEvolucion {
  id: number;
  nombre: string;
  tipo: TipoEjercicioEstadistica;
  rutinaId: number;
  numeroRutina: number;
  pesoInicial: number;
  unidad: string;
  prHistorico: PRHistorico;
  registros: RegistroPeso[];
}

export interface SesionesPorRutina {
  rutinaId: number;
  numeroRutina: number;
  nombreRutina: string;
  cantidadSesiones: number;
  porcentaje: number;
}

export interface EstadisticaSesiones {
  totalSesionesFinalizadas: number;
  sesionesPorRutina: SesionesPorRutina[];
}

export interface GrupoMuscularPorcentaje {
  grupo: string;
  porcentaje: number;
  ejerciciosAsociados: string[];
}

export interface PlanEstadistica {
  id: number;
  numero: number;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  esActual: boolean;
  estadisticaSesiones: EstadisticaSesiones;
  gruposMusculares: GrupoMuscularPorcentaje[];
  ejerciciosEvolucion: EjercicioEvolucion[];
}

