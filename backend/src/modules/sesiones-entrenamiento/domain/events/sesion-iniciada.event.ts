import { DomainEvent } from '../../../../shared/domain/domain-event.base';

export class SesionIniciadaEvent extends DomainEvent {
  constructor(
    public readonly sesionId: string,
    public readonly alumnoId: string,
    public readonly rutinaId: string,
    public readonly planId: string,
    public readonly fechaInicio: Date,
  ) {
    super(sesionId, fechaInicio);
  }

  getNombreEvento(): string {
    return 'SesionIniciada';
  }
}

