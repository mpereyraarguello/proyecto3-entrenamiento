import { DomainException } from '../../../../shared/domain/domain.exception';

export class SesionYaFinalizadaException extends DomainException {
  constructor(id: string) {
    super(`La sesión ${id} ya se encuentra finalizada y no permite modificaciones.`);
  }
}

