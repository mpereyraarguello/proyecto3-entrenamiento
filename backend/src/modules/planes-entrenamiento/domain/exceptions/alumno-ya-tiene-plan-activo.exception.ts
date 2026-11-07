import { DomainException } from '../../../../shared/domain/domain.exception';

export class AlumnoYaTienePlanActivoException extends DomainException {
  constructor(alumnoId: string) {
    super(`El alumno ${alumnoId} ya posee un plan de entrenamiento activo.`);
    this.name = 'AlumnoYaTienePlanActivoException';
  }
}