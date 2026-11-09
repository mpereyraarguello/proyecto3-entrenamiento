import { Inject, Injectable } from '@nestjs/common';
import {
  ALUMNO_REPOSITORY,
  type AlumnoRepository,
} from '../../../domain/repositories/alumno.repository';

@Injectable()
export class VerificarExistenciaAlumnoUseCase {
  constructor(
    @Inject(ALUMNO_REPOSITORY)
    private readonly repository: AlumnoRepository,
  ) {}

  async execute(alumnoId: string): Promise<boolean> {
    return this.repository.existePorId(alumnoId);
  }
}
