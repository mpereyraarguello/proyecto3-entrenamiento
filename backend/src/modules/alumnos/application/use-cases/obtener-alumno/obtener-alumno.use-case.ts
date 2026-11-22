import { Inject, Injectable } from '@nestjs/common';
import {
  ALUMNO_REPOSITORY,
  type AlumnoRepository,
} from '../../../domain/repositories/alumno.repository';
import { AlumnoNoEncontradoException } from '../../../domain/exceptions/alumno-no-encontrado.exception';
import { AlumnoResponse } from '../../responses/alumno.response';
import { ObtenerAlumnoCommand } from './obtener-alumno.command';

@Injectable()
export class ObtenerAlumnoUseCase {
  constructor(
    @Inject(ALUMNO_REPOSITORY)
    private readonly repository: AlumnoRepository,
  ) {}

  async execute(command: ObtenerAlumnoCommand): Promise<AlumnoResponse> {
    const alumno = await this.repository.findById(command.id);
    if (!alumno) {
      throw new AlumnoNoEncontradoException(command.id);
    }

    return AlumnoResponse.desdeDominio(alumno);
  }
}
