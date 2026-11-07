import { Inject, Injectable } from '@nestjs/common';
import { EJERCICIO_REPOSITORY} from '../../domain/repositories/ejercicio.repository';
import { EjercicioNoEncontradoException } from '../../domain/exceptions/ejercicio-no-encontrado.exception';
import { Ejercicio } from '../../domain/entities/ejercicio.entity';
import type {IEjercicioRepository} from '../../domain/repositories/ejercicio.repository';

@Injectable()
export class EjercicioFinder {
  constructor(
    @Inject(EJERCICIO_REPOSITORY)
    private readonly repository: IEjercicioRepository,
  ) {}

  async obtenerPorIdOrThrow(id: number): Promise<Ejercicio> {
    const entity = await this.repository.buscarPorId(id);
    if (!entity) {
      throw new EjercicioNoEncontradoException(id);
    }
    return entity;
  }
}
