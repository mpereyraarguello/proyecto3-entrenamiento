export interface BloqueHistorialItem {
  nombre: string;
  completado: boolean;
}

export interface BloquesHistorialResponse {
  calentamiento: BloqueHistorialItem;
  cardio: BloqueHistorialItem | null;
  estiramiento: BloqueHistorialItem;
}

export interface SerieHistorialResponse {
  numeroSerie: number;
  peso: number;
  repeticiones: number;
}

export interface EjercicioHistorialItemResponse {
  id: string;
  ejercicioId: string;
  nombre: string;
  tipo: string;
  orden: number;
  completado: boolean;
  peso: string;
  repeticiones: string;
  series: SerieHistorialResponse[];
}

export interface ItemHistorialSesionResponse {
  id: string;
  planId: string;
  rutinaId: string;
  rutinaNumero: number;
  rutinaNombre: string;
  semana: number;
  fechaInicio: string;
  fechaFin: string;
  fechaFormateada: string;
  duracionMinutos: number;
  duracionEstimada: string;
  totalEjercicios: number;
  totalEjerciciosCompletados: number;
  bloques: BloquesHistorialResponse;
  ejercicios: EjercicioHistorialItemResponse[];
}

export class HistorialSesionesPlanResponse {
  constructor(
    public readonly planId: string,
    public readonly totalSesiones: number,
    public readonly totalEjerciciosCompletados: number,
    public readonly sesiones: ItemHistorialSesionResponse[],
  ) {}
}

