import { DomainException } from '../../../../shared/domain/domain.exception';

export class AlumnoInvalidoException extends DomainException {
  constructor(motivo: string) {
    super(`Los datos del alumno no son válidos: ${motivo}`);
  }
}
