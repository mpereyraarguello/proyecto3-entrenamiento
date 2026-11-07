import { DomainException } from '../../../../shared/domain/domain.exception';

export class PlanNoEncontradoException extends DomainException {
  constructor(id: string) {
    super(`No se encontró el plan de entrenamiento con id ${id}.`);
    this.name = 'PlanNoEncontradoException';
  }
}