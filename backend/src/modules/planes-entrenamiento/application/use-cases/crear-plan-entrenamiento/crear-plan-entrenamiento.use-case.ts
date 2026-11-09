import { Inject, Injectable } from '@nestjs/common';

import {
  PLAN_ENTRENAMIENTO_REPOSITORY,
  type PlanEntrenamientoRepository,
} from '../../../domain/repositories/plan-entrenamiento.repository';
import { PlanEntrenamientoFactory } from '../../../domain/factories/plan-entrenamiento.factory';
import { AlumnoSinPlanActivoValidator } from '../../validators/alumno-sin-plan-activo.validator';
import { Pausa } from '../../../domain/value-objects/pausa.vo';
import {
  RELOJ_PORT,
  type RelojPort,
} from '../../../../../shared/application/ports/reloj.port';
import { CrearPlanEntrenamientoCommand } from './crear-plan-entrenamiento.command';
import { PlanEntrenamientoResponse } from '../../responses/plan-entrenamiento.response';

@Injectable()
export class CrearPlanEntrenamientoUseCase {
  constructor(
    @Inject(PLAN_ENTRENAMIENTO_REPOSITORY)
    private readonly repository: PlanEntrenamientoRepository,
    private readonly validator: AlumnoSinPlanActivoValidator,
    private readonly factory: PlanEntrenamientoFactory,
    @Inject(RELOJ_PORT)
    private readonly reloj: RelojPort,
  ) {}

  async execute(
    command: CrearPlanEntrenamientoCommand,
  ): Promise<PlanEntrenamientoResponse> {
    // 1) Validaciones que necesitan consultar datos externos
    await this.validator.validar(command.alumnoId);

    // 2) Número de plan: secuencial por alumno
    const numeroPlan = await this.obtenerSiguienteNumeroPlan(command.alumnoId);

    // 3) Construcción del agregado vía factory (dominio puro)
    const plan = this.factory.crear({
      alumnoId: command.alumnoId,
      objetivoId: command.objetivoId,
      nombre: command.nombre,
      fechaInicio: command.fechaInicio,
      numeroPlan,
      microPausa: Pausa.crear(command.microPausa),
      macroPausa: Pausa.crear(command.macroPausa),
      rutinas: command.rutinas.map((r) => ({
        items: r.items.map((i) => ({
          ejercicioId: i.ejercicioId,
          tipo: i.tipo,
          pesoInicialRecomendado: i.pesoInicialRecomendado,
          observacion: i.observacion,
        })),
      })),
      calentamientoIds: command.calentamientoIds,
      estiramientoIds: command.estiramientoIds,
      cardioIds: command.cardioIds,
    });

    // 4) Persistencia
    await this.repository.save(plan);

    // 5) Response ya resuelta para el frontend
    return PlanEntrenamientoResponse.desdeDominio(plan, this.reloj.ahora());
  }

  private async obtenerSiguienteNumeroPlan(alumnoId: string): Promise<number> {
    const ultimo = await this.repository.findUltimoByAlumno(alumnoId);
    return ultimo ? ultimo.getNumeroPlan() + 1 : 1;
  }
}