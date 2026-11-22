import { Inject, Injectable } from '@nestjs/common';
import {
  SESION_ENTRENAMIENTO_REPOSITORY,
  type SesionEntrenamientoRepository,
} from '../../domain/repositories/sesion-entrenamiento.repository';
import {
  PLAN_CONSULTA_PORT,
  type PlanConsultaPort,
  type PlanActivoConRutinaInfo,
} from '../ports/plan-consulta.port';
import { AlumnoYaTieneSesionEnCursoException } from '../../domain/exceptions/alumno-ya-tiene-sesion-en-curso.exception';
import { PlanNoActivoParaSesionException } from '../../domain/exceptions/plan-no-activo-para-sesion.exception';

@Injectable()
export class ValidarPuedeIniciarSesionValidator {
  constructor(
    @Inject(SESION_ENTRENAMIENTO_REPOSITORY)
    private readonly sesionRepository: SesionEntrenamientoRepository,
    @Inject(PLAN_CONSULTA_PORT)
    private readonly planConsultaPort: PlanConsultaPort,
  ) {}

  async validar(alumnoId: string, rutinaId: string): Promise<PlanActivoConRutinaInfo> {
    // 1. Un alumno tiene como máximo UNA sola sesión en curso a la vez
    const sesionEnCurso = await this.sesionRepository.findEnCursoByAlumnoId(alumnoId);
    if (sesionEnCurso) {
      throw new AlumnoYaTieneSesionEnCursoException(alumnoId);
    }

    // 2. El alumno debe tener un plan activo y no vencido (CP-3A-18)
    const planInfo = await this.planConsultaPort.obtenerPlanActivoConRutina(alumnoId, rutinaId);
    if (!planInfo || !planInfo.estaActivo || planInfo.estaVencido) {
      throw new PlanNoActivoParaSesionException(
        'El alumno no dispone de un plan de entrenamiento activo y vigente para iniciar una sesión.',
      );
    }

    return planInfo;
  }
}

