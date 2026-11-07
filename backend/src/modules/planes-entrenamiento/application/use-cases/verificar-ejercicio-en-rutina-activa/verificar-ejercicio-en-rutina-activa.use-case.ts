import { Inject, Injectable } from '@nestjs/common';
import {
  PLAN_ENTRENAMIENTO_REPOSITORY,
  type PlanEntrenamientoRepository,
} from '../../../domain/repositories/plan-entrenamiento.repository';

@Injectable()
export class VerificarEjercicioEnRutinaActivaUseCase {
  constructor(
    @Inject(PLAN_ENTRENAMIENTO_REPOSITORY)
    private readonly repository: PlanEntrenamientoRepository,
  ) {}

  async execute(ejercicioId: string): Promise<boolean> {
    return this.repository.verificarSiEjercicioEstaEnPlanActivo(ejercicioId);
  }
}