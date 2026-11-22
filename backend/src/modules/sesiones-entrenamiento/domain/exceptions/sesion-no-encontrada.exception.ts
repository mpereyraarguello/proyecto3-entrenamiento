import { DomainException } from '../../../../shared/domain/domain.exception';

export class SesionNoEncontradaException extends DomainException {
  constructor(id: string) {
    super(`No se encontró la sesión de entrenamiento con id ${id}.`);
  }
}

