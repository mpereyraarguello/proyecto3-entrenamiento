import { DomainException } from '../../../../shared/domain/domain.exception';

export class EjercicioYaExisteException extends DomainException {
  constructor(nombre: string) {
    super(`Ya existe un ejercicio registrado con el nombre "${nombre}".`);
  }
}
