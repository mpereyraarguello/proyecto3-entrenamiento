import { Entity } from './entity.base';
import { DomainEvent } from './domain-event.base';

/**
 * Base de todos los Aggregate Roots del sistema.
 *
 * - Un Aggregate Root es la ÚNICA puerta de entrada a su agregado:
 *   nadie modifica una entidad interna (ej. `Rutina`) por fuera de su raíz
 *   (ej. `PlanEntrenamiento`).
 * - Extiende de `Entity` porque todo AR tiene identidad propia.
 * - Acumula eventos de dominio que ocurrieron en el agregado. Quien
 *   orquesta (el use case) los publica después de persistir.
 */
export abstract class AggregateRoot<TId = number> extends Entity<TId> {
  private readonly _domainEvents: DomainEvent[] = [];

  protected constructor(id: TId) {
    super(id);
  }

  /**
   * Registra un evento de dominio en el agregado.
   * Lo llaman los métodos de negocio de cada AR (ej. `PlanEntrenamiento.crear`).
   */
  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  /**
   * Devuelve los eventos acumulados y limpia la lista.
   * El use case lo llama DESPUÉS de persistir el agregado, para publicarlos.
   */
  pullDomainEvents(): ReadonlyArray<DomainEvent> {
    const eventos = [...this._domainEvents];
    this._domainEvents.length = 0;
    return eventos;
  }

  /**
   * Solo lectura, para inspección (tests, debugging).
   * NO usar para publicar: para eso está `pullDomainEvents`.
   */
  getDomainEvents(): ReadonlyArray<DomainEvent> {
    return [...this._domainEvents];
  }

  clearDomainEvents(): void {
    this._domainEvents.length = 0;
  }
}
