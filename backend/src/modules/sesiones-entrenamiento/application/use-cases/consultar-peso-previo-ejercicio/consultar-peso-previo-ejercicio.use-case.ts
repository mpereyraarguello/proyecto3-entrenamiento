import { Inject, Injectable } from '@nestjs/common';
import { ConsultarPesoPrevioEjercicioCommand } from './consultar-peso-previo-ejercicio.command';
import { PesoPrevioResponse } from '../../responses/peso-previo.response';
import {
  SESION_ENTRENAMIENTO_REPOSITORY,
  type SesionEntrenamientoRepository,
} from '../../../domain/repositories/sesion-entrenamiento.repository';

@Injectable()
export class ConsultarPesoPrevioEjercicioUseCase {
  constructor(
    @Inject(SESION_ENTRENAMIENTO_REPOSITORY)
    private readonly sesionRepository: SesionEntrenamientoRepository,
  ) {}

  async execute(command: ConsultarPesoPrevioEjercicioCommand): Promise<PesoPrevioResponse> {
    const registro = await this.sesionRepository.findUltimoPesoEjercicio(
      command.alumnoId,
      command.ejercicioId,
    );

    return {
      ejercicioId: command.ejercicioId,
      peso: registro ? registro.peso : null,
      repeticiones: registro ? registro.repeticiones : null,
    };
  }
}

