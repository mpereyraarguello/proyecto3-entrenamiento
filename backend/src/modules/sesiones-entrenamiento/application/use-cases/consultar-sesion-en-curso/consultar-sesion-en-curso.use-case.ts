import { Inject, Injectable } from '@nestjs/common';
import { ConsultarSesionEnCursoCommand } from './consultar-sesion-en-curso.command';
import { SesionEntrenamientoResponse } from '../../responses/sesion-entrenamiento.response';
import {
  SESION_ENTRENAMIENTO_REPOSITORY,
  type SesionEntrenamientoRepository,
} from '../../../domain/repositories/sesion-entrenamiento.repository';

@Injectable()
export class ConsultarSesionEnCursoUseCase {
  constructor(
    @Inject(SESION_ENTRENAMIENTO_REPOSITORY)
    private readonly sesionRepository: SesionEntrenamientoRepository,
  ) {}

  async execute(command: ConsultarSesionEnCursoCommand): Promise<SesionEntrenamientoResponse | null> {
    const sesion = await this.sesionRepository.findEnCursoByAlumnoId(command.alumnoId);
    if (!sesion) {
      return null;
    }
    return SesionEntrenamientoResponse.desdeDominio(sesion);
  }
}

