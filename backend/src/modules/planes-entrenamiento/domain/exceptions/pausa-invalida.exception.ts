import { DomainException } from '../../../../shared/domain/domain.exception';

export class PausaInvalidaException extends DomainException {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = 'PausaInvalidaException';
  }
}