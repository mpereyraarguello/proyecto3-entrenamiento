import { DomainException } from '../../../../shared/domain/domain.exception';

export class AlumnoYaTieneSesionEnCursoException extends DomainException {
  constructor(alumnoId: string) {
    super(`El alumno ${alumnoId} ya tiene una sesión de entrenamiento en curso.`);
  }
}

