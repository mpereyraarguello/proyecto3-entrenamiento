export interface AlumnoResumen {
    id: string;
    nombre: string;
    apellido: string;
}

export interface AlumnoConsultaPort {
  existeAlumno(alumnoId: string): Promise<boolean>;
  obtenerResumenes(alumnoIds: string[]): Promise<AlumnoResumen[]>;
}

export const ALUMNO_CONSULTA_PORT = Symbol('ALUMNO_CONSULTA_PORT');