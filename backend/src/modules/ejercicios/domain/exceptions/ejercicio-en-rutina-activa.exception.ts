import { DomainException } from '../../../../shared/domain/domain.exception';

export class EjercicioEnRutinaActivaException extends DomainException {
  constructor(id: number) {
    super(`No se puede dar de baja el ejercicio #${id} porque está asignado a una rutina de un plan activo.`);
  }
}