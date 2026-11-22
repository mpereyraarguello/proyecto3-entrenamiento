import { DomainEvent } from '../../../../shared/domain/domain-event.base';

export class AlumnoCreadoEvent extends DomainEvent {
  constructor(
    public readonly alumnoId: string,
    public readonly correo: string,
    public readonly ocurridoEn: Date,
  ) {
    super(alumnoId, ocurridoEn);
  }

  getNombreEvento(): string {
    return 'AlumnoCreado';
  }
}
