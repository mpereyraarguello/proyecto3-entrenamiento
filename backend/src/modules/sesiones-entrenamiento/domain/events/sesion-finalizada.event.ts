import { DomainEvent } from '../../../../shared/domain/domain-event.base';

export class SesionFinalizadaEvent extends DomainEvent {
  constructor(
    public readonly sesionId: string,
    public readonly alumnoId: string,
    public readonly rutinaId: string,
    public readonly planId: string,
    public readonly fechaFin: Date,
  ) {
    super(sesionId, fechaFin);
  }

  getNombreEvento(): string {
    return 'SesionFinalizada';
  }
}

