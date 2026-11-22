import { DomainException } from '../../../../shared/domain/domain.exception';

export class CorreoAlumnoDuplicadoException extends DomainException {
  constructor(correo: string) {
    super(`Ya existe un alumno registrado con el correo electrónico "${correo}".`);
  }
}
