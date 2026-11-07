import { Inject, Injectable } from '@nestjs/common';
import {
  EJERCICIO_REPOSITORY,
  EjercicioRepository,
} from '../../domain/repositories/ejercicio.repository';
import { EjercicioNoEncontradoException } from '../../domain/exceptions/ejercicio-no-encontrado.exception';
import { EjercicioResponse } from '../../responses/ejercicio.response';
import { ConsultarEjercicioCommand } from './consultar-ejercicio.command';

@Injectable()
export class ConsultarEjercicioUseCase {
  constructor(
    @Inject(EJERCICIO_REPOSITORY)
    private readonly ejercicioRepository: EjercicioRepository,
  ) {}

  async execute(command: ConsultarEjercicioCommand): Promise<EjercicioResponse> {
    const ejercicio = await this.ejercicioRepository.buscarPorId(command.id);
    if (!ejercicio) {
      throw new EjercicioNoEncontradoException(command.id);
    }
    return EjercicioResponse.desdeDominio(ejercicio);
  }
}
