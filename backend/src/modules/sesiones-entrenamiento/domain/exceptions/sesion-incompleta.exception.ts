import { DomainException } from '../../../../shared/domain/domain.exception';

export class SesionIncompletaException extends DomainException {
  constructor(ejerciciosPendientes: string[]) {
    super(`No se puede finalizar la sesión: existen ejercicios obligatorios pendientes (${ejerciciosPendientes.join(', ')}).`);
  }
}

