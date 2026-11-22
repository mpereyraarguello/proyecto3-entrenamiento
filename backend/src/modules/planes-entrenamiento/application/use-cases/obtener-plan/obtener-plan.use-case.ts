import { Inject, Injectable } from '@nestjs/common';
import { PLAN_ENTRENAMIENTO_REPOSITORY } from '../../../domain/repositories/plan-entrenamiento.repository';
import type { PlanEntrenamientoRepository } from '../../../domain/repositories/plan-entrenamiento.repository';
import { PlanNoEncontradoException } from '../../../domain/exceptions/plan-no-encontrado.exceptions';
import { PlanEntrenamientoResponse } from '../../responses/plan-entrenamiento.response';
import { RELOJ_PORT } from '../../../../../shared/application/ports/reloj.port';
import type { RelojPort } from '../../../../../shared/application/ports/reloj.port';

export class ObtenerPlanQuery {
  constructor(public readonly id: string) {}
}

@Injectable()
export class ObtenerPlanEntrenamientoUseCase {
  constructor(
    @Inject(PLAN_ENTRENAMIENTO_REPOSITORY)
    private readonly repository: PlanEntrenamientoRepository,
    @Inject(RELOJ_PORT)
    private readonly reloj: RelojPort,
  ) {}

  async execute(query: ObtenerPlanQuery): Promise<PlanEntrenamientoResponse> {
    const plan = await this.repository.findByIdDetalles(query.id);
    
    if (!plan) {
      throw new PlanNoEncontradoException(query.id);
    }

    return PlanEntrenamientoResponse.desdeDominio(plan, this.reloj.ahora());
  }
}