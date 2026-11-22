import { Injectable } from '@nestjs/common';
import { AlumnoConsultaPort } from '../../../../application/ports/alumno-consulta.ports';
import { VerificarExistenciaAlumnoUseCase } from '../../../../../alumnos/application/use-cases/verificar-existencia-alumno/verificar-existencia-alumno.use-case';

@Injectable()
export class AlumnoConsultaAdapter implements AlumnoConsultaPort {
  constructor(
    private readonly verificarExistenciaAlumnoUseCase: VerificarExistenciaAlumnoUseCase,
  ) {}

  async existeAlumno(alumnoId: string): Promise<boolean> {
    return this.verificarExistenciaAlumnoUseCase.execute(alumnoId);
  }
}
