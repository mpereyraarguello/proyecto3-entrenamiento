import { DomainException } from '../../../../shared/domain/domain.exception';

export class PesoInvalidoException extends DomainException {
  constructor(mensaje: string = 'El peso ingresado debe ser un número válido mayor o igual a cero.') {
    super(mensaje);
  }
}

