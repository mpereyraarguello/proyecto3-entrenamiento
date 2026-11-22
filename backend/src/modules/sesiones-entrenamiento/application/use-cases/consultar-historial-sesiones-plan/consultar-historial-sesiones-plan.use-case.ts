import { Inject, Injectable } from '@nestjs/common';
import { ConsultarHistorialSesionesPlanCommand } from './consultar-historial-sesiones-plan.command';
import { HistorialSesionesPlanResponse } from '../../responses/historial-sesiones-plan.response';
import {
  SESION_ENTRENAMIENTO_REPOSITORY,
  type SesionEntrenamientoRepository,
} from '../../../domain/repositories/sesion-entrenamiento.repository';
import { mapearSesionAHistorial } from '../../helpers/mapear-sesion-historial.helper';

@Injectable()
export class ConsultarHistorialSesionesPlanUseCase {
  constructor(
    @Inject(SESION_ENTRENAMIENTO_REPOSITORY)
    private readonly sesionRepository: SesionEntrenamientoRepository,
  ) {}

  async execute(
    command: ConsultarHistorialSesionesPlanCommand,
  ): Promise<HistorialSesionesPlanResponse> {
    // 1. Obtener sesiones finalizadas del alumno para ese plan (CP-6A-1, CP-6A-7)
    const sesiones = await this.sesionRepository.findFinalizadasByAlumnoYPlan(
      command.alumnoId,
      command.planId,
    );

    // 2. Si el plan no registra sesiones finalizadas (CP-6A-5)
    if (!sesiones || sesiones.length === 0) {
      return new HistorialSesionesPlanResponse(command.planId, 0, 0, []);
    }

    // 3. Ordenar cronológicamente descendente (la más reciente primero, CP-6A-6)
    const ordenadas = [...sesiones].sort((a, b) => {
      const fechaA = a.getFechaFin() ?? a.getFechaInicio();
      const fechaB = b.getFechaFin() ?? b.getFechaInicio();
      return fechaB.getTime() - fechaA.getTime();
    });

    const sesionesDto = ordenadas.map(mapearSesionAHistorial);
    const granTotalEjercicios = sesionesDto.reduce(
      (total, sesion) => total + sesion.totalEjerciciosCompletados,
      0,
    );

    // 4. Retornar el resumen calculado con los contadores globales (CP-6A-8)
    return new HistorialSesionesPlanResponse(
      command.planId,
      sesionesDto.length,
      granTotalEjercicios,
      sesionesDto,
    );
  }
}
