import { DomainException } from '../../../../shared/domain/domain.exception';

export class RepeticionesInvalidasException extends DomainException {
  constructor(mensaje: string = 'Las repeticiones ingresadas deben ser un número entero mayor o igual a cero.') {
    super(mensaje);
  }
}

