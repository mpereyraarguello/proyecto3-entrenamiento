import { DomainException } from '../../../../shared/domain/domain.exception';

export class RutinaNoPerteneceAlPlanException extends DomainException {
  constructor(rutinaId: string, planId: string) {
    super(`La rutina ${rutinaId} no pertenece al plan de entrenamiento activo ${planId}.`);
  }
}

