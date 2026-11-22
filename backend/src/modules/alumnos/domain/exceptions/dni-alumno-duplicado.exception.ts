import { DomainException } from '../../../../shared/domain/domain.exception';

export class DniAlumnoDuplicadoException extends DomainException {
  constructor(dni: string) {
    super(`Ya existe un alumno registrado con el DNI "${dni}".`);
  }
}
