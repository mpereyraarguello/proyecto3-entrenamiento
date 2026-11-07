import { PlanEntrenamiento } from '../entities/plan-entrenamiento.entity';

export interface PlanEntrenamientoRepository {
  save(plan: PlanEntrenamiento): Promise<void>;
  findById(id: string): Promise<PlanEntrenamiento | null>;
  findActivoByAlumno(alumnoId: string): Promise<PlanEntrenamiento | null>;
  findUltimoByAlumno(alumnoId: string): Promise<PlanEntrenamiento | null>;
  findHistorialByAlumno(alumnoId: string): Promise<PlanEntrenamiento[]>;
}

export const PLAN_ENTRENAMIENTO_REPOSITORY = Symbol(
  'PLAN_ENTRENAMIENTO_REPOSITORY',
);