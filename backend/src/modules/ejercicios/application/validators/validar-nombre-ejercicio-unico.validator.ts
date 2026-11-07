import { Inject, Injectable } from '@nestjs/common';
import {
  EJERCICIO_REPOSITORY,
  EjercicioRepository,
} from '../../domain/repositories/ejercicio.repository';
import { EjercicioYaExisteException } from '../../domain/exceptions/ejercicio-ya-existe.exception';

@Injectable()
export class ValidarNombreEjercicioUnicoValidator {
  constructor(
    @Inject(EJERCICIO_REPOSITORY)
    private readonly ejercicioRepository: EjercicioRepository,
  ) {}

  async validar(nombre: string): Promise<void> {
    const ejercicioExistente = await this.ejercicioRepository.buscarPorNombre(nombre.trim());
    if (ejercicioExistente) {
      throw new EjercicioYaExisteException(nombre.trim());
    }
  }
}
