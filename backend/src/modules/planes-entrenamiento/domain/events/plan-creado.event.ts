import { DomainEvent } from '../../../../shared/domain/domain-event.base';

export class PlanCreadoEvent extends DomainEvent {
  constructor(
    public readonly planId: string,
    public readonly alumnoId: string,
    public readonly ocurridoEn: Date,
  ) {
    super(planId, ocurridoEn);
  }

  getNombreEvento(): string {
    return 'PlanCreado';
  }
}