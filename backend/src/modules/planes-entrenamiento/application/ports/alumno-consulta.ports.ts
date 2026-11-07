export interface AlumnoConsultaPort {
  existeAlumno(alumnoId: string): Promise<boolean>;
}

export const ALUMNO_CONSULTA_PORT = Symbol('ALUMNO_CONSULTA_PORT');