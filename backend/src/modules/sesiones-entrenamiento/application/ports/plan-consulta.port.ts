import { TipoEjercicio } from '../../../../shared/domain/enums/tipo-ejercicio.enum';

export interface ItemRutinaInfo {
  ejercicioId: string;
  nombre: string;
  tipo: TipoEjercicio;
  orden: number;
  seriesPlanificadas: number;
  repeticionesPlanificadas: number;
  rirPlanificado: number;
  pesoInicialRecomendado: number | null;
  observacion: string | null;
}

export interface PlanActivoConRutinaInfo {
  planId: string;
  estaActivo: boolean;
  estaVencido: boolean;
  semanaActual: number;
  rutinaId: string;
  rutinaNumero: number;
  tieneCardio: boolean;
  items: ItemRutinaInfo[];
}

export interface PlanConsultaPort {
  obtenerPlanActivoConRutina(alumnoId: string, rutinaId: string): Promise<PlanActivoConRutinaInfo | null>;
}

export const PLAN_CONSULTA_PORT = Symbol('PLAN_CONSULTA_PORT');

