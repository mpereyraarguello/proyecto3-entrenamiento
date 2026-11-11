import { Inject, Injectable } from '@nestjs/common';
import { ConsultarPlanesHistorialCommand } from './consultar-planes-historial.command';
import { PlanHistorialResponse } from '../../responses/plan-historial.response';
import {
  SESION_ENTRENAMIENTO_REPOSITORY,
  type SesionEntrenamientoRepository,
} from '../../../domain/repositories/sesion-entrenamiento.repository';
import { formatearFechaSesion } from '../../helpers/formatear-fecha-sesion.helper';

@Injectable()
export class ConsultarPlanesHistorialUseCase {
  constructor(
    @Inject(SESION_ENTRENAMIENTO_REPOSITORY)
    private readonly sesionRepository: SesionEntrenamientoRepository,
  ) {}

  async execute(command: ConsultarPlanesHistorialCommand): Promise<PlanHistorialResponse[]> {
    const planes = await this.sesionRepository.findPlanesConSesionesFinalizadas(command.alumnoId);

    return planes.map((plan) => ({
      planId: plan.planId,
      totalSesiones: plan.totalSesiones,
      primeraSesion: plan.primeraSesion.toISOString(),
      etiqueta: `Plan desde ${formatearFechaSesion(plan.primeraSesion)} (${plan.totalSesiones} ${
        plan.totalSesiones === 1 ? 'sesión' : 'sesiones'
      })`,
    }));
  }
}
