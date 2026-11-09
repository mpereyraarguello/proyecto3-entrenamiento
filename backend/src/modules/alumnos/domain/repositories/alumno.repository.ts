import { Alumno } from '../entities/alumno.entity';

export interface AlumnoRepository {
  save(alumno: Alumno): Promise<void>;
  findById(id: string): Promise<Alumno | null>;
  findByCorreo(correo: string): Promise<Alumno | null>;
  findByDni(dni: string): Promise<Alumno | null>;
  findAll(termino?: string): Promise<Alumno[]>;
  existePorId(id: string): Promise<boolean>;
}

export const ALUMNO_REPOSITORY = Symbol('ALUMNO_REPOSITORY');
