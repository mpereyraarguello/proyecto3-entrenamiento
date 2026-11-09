import { DomainException } from '../../../../shared/domain/domain.exception';

export class EjercicioNoEncontradoException extends DomainException {
  constructor(id: number) {
    super(`No se encontró el ejercicio con identificador "${id}".`);
  }
}
