import { DomainException } from '../../../../shared/domain/domain.exception';

export class AlumnoNoEncontradoException extends DomainException {
  constructor(id: string) {
    super(`No se encontró el alumno con identificador "${id}".`);
  }
}
