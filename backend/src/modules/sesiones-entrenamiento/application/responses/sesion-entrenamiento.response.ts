import { SesionEntrenamiento } from '../../domain/entities/sesion-entrenamiento.entity';

export interface SerieEjercicioResponse {
  numeroSerie: number;
  peso: number;
  repeticiones: number;
}

export interface EjercicioSesionResponse {
  id: string;
  ejercicioId: string;
  nombre: string;
  tipo: string;
  orden: number;
  seriesPlanificadas: number;
  repeticionesPlanificadas: number;
  rirPlanificado: number;
  pesoAnterior: number | null;
  repeticionesAnteriores: number | null;
  series: SerieEjercicioResponse[];
  completado: boolean;
}

export class SesionEntrenamientoResponse {
  constructor(
    public readonly id: string,
    public readonly alumnoId: string,
    public readonly planId: string,
    public readonly rutinaId: string,
    public readonly rutinaNumero: number,
    public readonly semana: number,
    public readonly estado: string,
    public readonly fechaInicio: string,
    public readonly fechaFin: string | null,
    public readonly bloqueCalentamientoCompletado: boolean,
    public readonly bloqueCardioCompletado: boolean | null,
    public readonly bloqueEstiramientoCompletado: boolean,
    public readonly ejercicios: EjercicioSesionResponse[],
  ) {}

  static desdeDominio(sesion: SesionEntrenamiento): SesionEntrenamientoResponse {
    return new SesionEntrenamientoResponse(
      sesion.getId(),
      sesion.getAlumnoId(),
      sesion.getPlanId(),
      sesion.getRutinaId(),
      sesion.getRutinaNumero(),
      sesion.getSemana(),
      sesion.getEstado(),
      sesion.getFechaInicio().toISOString(),
      sesion.getFechaFin() ? sesion.getFechaFin()!.toISOString() : null,
      sesion.isBloqueCalentamientoCompletado(),
      sesion.isBloqueCardioCompletado(),
      sesion.isBloqueEstiramientoCompletado(),
      sesion.getEjercicios().map((e) => ({
        id: e.id,
        ejercicioId: e.getEjercicioId(),
        nombre: e.getNombre(),
        tipo: e.getTipo(),
        orden: e.getOrden(),
        seriesPlanificadas: e.getSeriesPlanificadas(),
        repeticionesPlanificadas: e.getRepeticionesPlanificadas(),
        rirPlanificado: e.getRirPlanificado(),
        pesoAnterior: e.getPesoAnterior(),
        repeticionesAnteriores: e.getRepeticionesAnteriores(),
        series: e.getSeries().map((s) => ({
          numeroSerie: s.getNumeroSerie(),
          peso: s.getPesoValor(),
          repeticiones: s.getRepeticionesValor(),
        })),
        completado: e.estaCompletado(),
      })),
    );
  }
}

