import { DomainException } from '../../../../shared/domain/domain.exception';

export class EjercicioInvalidoException extends DomainException {
  constructor(motivo: string) {
    super(`El ejercicio no es válido: ${motivo}`);
  }
}
