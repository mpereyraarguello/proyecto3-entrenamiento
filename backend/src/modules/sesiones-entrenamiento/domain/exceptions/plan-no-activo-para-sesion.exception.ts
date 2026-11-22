import { DomainException } from '../../../../shared/domain/domain.exception';

export class PlanNoActivoParaSesionException extends DomainException {
  constructor(mensaje: string = 'El alumno no posee un plan de entrenamiento activo o vigente para iniciar sesiones.') {
    super(mensaje);
  }
}

