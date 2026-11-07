import { DomainException } from '../../../../shared/domain/domain.exception';

export class PlanConRutinasInvalidasException extends DomainException {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = 'PlanConRutinasInvalidasException';
  }
}