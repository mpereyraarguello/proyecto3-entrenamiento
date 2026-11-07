import { Inject, Injectable } from '@nestjs/common';
import {
  EJERCICIO_REPOSITORY,
  EjercicioRepository,
} from '../../domain/repositories/ejercicio.repository';
import { EjercicioResponse } from '../../responses/ejercicio.response';

@Injectable()
export class ListarEjerciciosUseCase {
  constructor(
    @Inject(EJERCICIO_REPOSITORY)
    private readonly ejercicioRepository: EjercicioRepository,
  ) {}

  async execute(): Promise<EjercicioResponse[]> {
    const ejercicios = await this.ejercicioRepository.listarTodos();
    return ejercicios.map(EjercicioResponse.desdeDominio);
  }
}
