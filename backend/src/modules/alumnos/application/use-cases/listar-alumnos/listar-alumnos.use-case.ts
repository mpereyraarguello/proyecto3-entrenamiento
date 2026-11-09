import { Inject, Injectable } from '@nestjs/common';
import {
  ALUMNO_REPOSITORY,
  type AlumnoRepository,
} from '../../../domain/repositories/alumno.repository';
import { AlumnoResponse } from '../../responses/alumno.response';
import { ListarAlumnosCommand } from './listar-alumnos.command';

@Injectable()
export class ListarAlumnosUseCase {
  constructor(
    @Inject(ALUMNO_REPOSITORY)
    private readonly repository: AlumnoRepository,
  ) {}

  async execute(command: ListarAlumnosCommand): Promise<AlumnoResponse[]> {
    const alumnos = await this.repository.findAll(command.termino);
    return alumnos.map((alumno) => AlumnoResponse.desdeDominio(alumno));
  }
}
