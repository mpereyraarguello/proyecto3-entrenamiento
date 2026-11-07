/**
 * Base de todos los eventos de dominio.
 *
 * - Un evento de dominio representa un HECHO YA OCURRIDO en el negocio.
 *   Por eso su nombre va en pasado: `PlanCreado`, `SesionFinalizada`.
 * - Solo transporta datos: sin lógica, sin dependencias externas.
 * - `aggregateId` identifica al agregado que lo emitió.
 * - `ocurridoEn` permite ordenar y auditar.
 */
export abstract class DomainEvent {
  protected constructor(
    public readonly aggregateId: string,
    public readonly ocurridoEn: Date,
  ) {}

  /**
   * Nombre del evento, en PascalCase y pasado.
   * Ej: 'PlanCreado', 'SesionFinalizada'.
   */
  abstract getNombreEvento(): string;
}