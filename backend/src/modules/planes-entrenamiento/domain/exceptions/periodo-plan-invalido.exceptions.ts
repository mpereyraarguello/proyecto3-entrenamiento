import { DomainException } from '../../../../shared/domain/domain.exception';

export class PeriodoPlanInvalidoException extends DomainException {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = 'PeriodoPlanInvalidoException';
  }
}