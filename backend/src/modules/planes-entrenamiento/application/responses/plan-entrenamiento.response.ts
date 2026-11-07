import { PlanEntrenamiento } from '../../domain/entities/plan-entrenamiento.entity';

export class PlanEntrenamientoResponse {
  constructor(
    public readonly id: string,
    public readonly alumnoId: string,
    public readonly numeroPlan: number,
    public readonly nombre: string,
    public readonly objetivoId: string,
    public readonly fechaInicio: string,
    public readonly fechaFin: string,
    public readonly estado: string,
    public readonly semanaActual: number,
    public readonly microPausa: string,
    public readonly macroPausa: string,
    public readonly cantidadRutinas: number,
  ) {}

  /**
   * Construye la response a partir del agregado. Todos los valores
   * calculados (fechas en ISO, semana actual, pausas formateadas)
   * ya viajan resueltos al frontend.
   */
  static desdeDominio(
    plan: PlanEntrenamiento,
    fechaActual: Date,
  ): PlanEntrenamientoResponse {
    return new PlanEntrenamientoResponse(
      plan.getId(),
      plan.getAlumnoId(),
      plan.getNumeroPlan(),
      plan.getNombre(),
      plan.getObjetivoId(),
      plan.getPeriodo().getInicio().toISOString(),
      plan.getPeriodo().getFin().toISOString(),
      plan.getEstado(),
      plan.semanaActual(fechaActual),
      PlanEntrenamientoResponse.formatearPausa(plan.getMicroPausa()),
      PlanEntrenamientoResponse.formatearPausa(plan.getMacroPausa()),
      plan.getRutinas().length,
    );
  }

  private static formatearPausa(pausa: {
    getMinutos(): number;
    getSegundos(): number;
  }): string {
    return `${pausa.getMinutos()}' ${pausa.getSegundos()}"`;
  }
}