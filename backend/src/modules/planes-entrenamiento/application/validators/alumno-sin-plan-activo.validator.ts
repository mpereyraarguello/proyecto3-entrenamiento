import { Inject, Injectable } from '@nestjs/common';
import {
  ALUMNO_CONSULTA_PORT,
  type AlumnoConsultaPort,
} from '../ports/alumno-consulta.ports';
import {
  PLAN_ENTRENAMIENTO_REPOSITORY,
  type PlanEntrenamientoRepository,
} from '../../domain/repositories/plan-entrenamiento.repository';
import { AlumnoYaTienePlanActivoException } from '../../domain/exceptions/alumno-ya-tiene-plan-activo.exception';
import { ValidacionDeNegocioException } from '../../../../shared/domain/exceptions/validacion-de-negocio.exception';

@Injectable()
export class AlumnoSinPlanActivoValidator {
  constructor(
    @Inject(ALUMNO_CONSULTA_PORT)
    private readonly alumnoConsulta: AlumnoConsultaPort,
    @Inject(PLAN_ENTRENAMIENTO_REPOSITORY)
    private readonly planRepository: PlanEntrenamientoRepository,
  ) {}

  async validar(alumnoId: string): Promise<void> {
    const existe = await this.alumnoConsulta.existeAlumno(alumnoId);
    if (!existe) {
      throw new ValidacionDeNegocioException(
        `El alumno con id ${alumnoId} no existe.`,
      );
    }

    const activo = await this.planRepository.findActivoByAlumno(alumnoId);
    if (activo) {
      throw new AlumnoYaTienePlanActivoException(alumnoId);
    }
  }
}