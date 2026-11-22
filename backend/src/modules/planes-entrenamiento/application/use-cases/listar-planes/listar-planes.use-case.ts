import { Inject, Injectable } from '@nestjs/common';
import { PLAN_ENTRENAMIENTO_REPOSITORY } from '../../../domain/repositories/plan-entrenamiento.repository';
import type { PlanEntrenamientoRepository } from '../../../domain/repositories/plan-entrenamiento.repository';
import { ALUMNO_CONSULTA_PORT } from '../../ports/alumno-consulta.ports';
import type { AlumnoConsultaPort } from '../../ports/alumno-consulta.ports';
import { PlanEntrenamientoListItemResponse } from '../../responses/plan-entrenamiento.response';

export class ListarPlanesQuery {
  constructor(
    public readonly alumnoId?: string,
    public readonly estado?: string,
  ) {}
}

@Injectable()
export class ListarPlanesEntrenamientoUseCase {
  constructor(
    @Inject(PLAN_ENTRENAMIENTO_REPOSITORY)
    private readonly repository: PlanEntrenamientoRepository,
    @Inject(ALUMNO_CONSULTA_PORT)
    private readonly alumnoPort: AlumnoConsultaPort,
  ) {}

  async execute(query: ListarPlanesQuery): Promise<PlanEntrenamientoListItemResponse[]> {
    // 1. Buscar planes
    const planes = await this.repository.findAll({ 
      alumnoId: query.alumnoId, 
      estado: query.estado 
    });

    if (planes.length === 0) return [];

    // 2. Obtener los IDs únicos de alumnos
    const alumnoIdsUnicos = [...new Set(planes.map((p) => p.getAlumnoId()))];

    // 3. Traer los datos de los alumnos (nombre, apellido)
    const alumnos = await this.alumnoPort.obtenerResumenes(alumnoIdsUnicos);
    const alumnosMap = new Map(alumnos.map((a) => [a.id, a]));

    // 4. Mapear a Response
    return planes.map((plan) => {
      const alumno = alumnosMap.get(plan.getAlumnoId());
      return PlanEntrenamientoListItemResponse.desdeDominio(plan, alumno);
    });
  }
}