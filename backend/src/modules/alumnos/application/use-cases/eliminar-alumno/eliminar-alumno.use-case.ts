import { Inject, Injectable } from '@nestjs/common';
import {
  ALUMNO_REPOSITORY,
  type AlumnoRepository,
} from '../../../domain/repositories/alumno.repository';
import { AlumnoNoEncontradoException } from '../../../domain/exceptions/alumno-no-encontrado.exception';
import { EliminarAlumnoCommand } from './eliminar-alumno.command';
import {
  RELOJ_PORT,
  type RelojPort,
} from '../../../../../shared/application/ports/reloj.port';

@Injectable()
export class EliminarAlumnoUseCase {
  constructor(
    @Inject(ALUMNO_REPOSITORY)
    private readonly repository: AlumnoRepository,
    @Inject(RELOJ_PORT)
    private readonly reloj: RelojPort,
  ) {}

  async execute(command: EliminarAlumnoCommand): Promise<void> {
    const alumno = await this.repository.findById(command.id);
    if (!alumno) {
      throw new AlumnoNoEncontradoException(command.id);
    }

    alumno.darDeBaja(this.reloj.ahora());

    await this.repository.save(alumno);
  }
}
