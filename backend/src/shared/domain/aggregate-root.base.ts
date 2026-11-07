import { Entity } from './entity.base';

export abstract class AggregateRoot<TId = string> extends Entity<TId> {
  // Base para agregados. Extensible para registrar eventos de dominio.
}
