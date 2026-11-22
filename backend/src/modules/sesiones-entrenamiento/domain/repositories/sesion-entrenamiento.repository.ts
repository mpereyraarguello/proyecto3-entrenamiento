import { SesionEntrenamiento } from '../entities/sesion-entrenamiento.entity';

export interface ResumenPlanConSesiones {
  planId: string;
  totalSesiones: number;
  primeraSesion: Date;
}

export interface SesionEntrenamientoRepository {
  save(sesion: SesionEntrenamiento): Promise<void>;
  findById(id: string): Promise<SesionEntrenamiento | null>;
  findEnCursoByAlumnoId(alumnoId: string): Promise<SesionEntrenamiento | null>;
  findUltimaFinalizadaByAlumnoId(alumnoId: string): Promise<SesionEntrenamiento | null>;
  findFinalizadasByAlumnoYPlan(alumnoId: string, planId: string): Promise<SesionEntrenamiento[]>;
  findPlanesConSesionesFinalizadas(alumnoId: string): Promise<ResumenPlanConSesiones[]>;
  findUltimoPesoEjercicio(alumnoId: string, ejercicioId: string): Promise<{ peso: number; repeticiones: number } | null>;
}

export const SESION_ENTRENAMIENTO_REPOSITORY = Symbol('SESION_ENTRENAMIENTO_REPOSITORY');

