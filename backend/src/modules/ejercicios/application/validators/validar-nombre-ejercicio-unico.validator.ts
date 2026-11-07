import { Injectable, Inject } from '@nestjs/common';
import { EJERCICIO_REPOSITORY } from '../../domain/repositories/ejercicio.repository';
import { EjercicioYaExisteException } from '../../domain/exceptions/ejercicio-ya-existe.exception';
import { CrearEjercicioDto } from '../../infrastructure/adapters/in/http/dtos/crear-ejercicio.dto';
import type { IEjercicioRepository } from '../../domain/repositories/ejercicio.repository';

@Injectable()
export class EjercicioValidator {
  constructor(
    @Inject(EJERCICIO_REPOSITORY) private readonly repository: IEjercicioRepository,
  ) {}

  async validarCreacion(dto: CrearEjercicioDto): Promise<void> {
    const existente = await this.repository.buscarPorNombre(dto.nombre.trim());
    if (existente) {
      throw new EjercicioYaExisteException(dto.nombre.trim());
    }
  }

  async validarParaModificar(id: number, nuevoNombre: string): Promise<void> {
    const ejercicioExistente = await this.repository.buscarPorNombre(nuevoNombre.trim());
    
    // Si existe Y su id es distinto al que estamos editando, entonces es duplicado
    if (ejercicioExistente && ejercicioExistente.id !== id) {
      throw new EjercicioYaExisteException(nuevoNombre.trim());
    }
  }
}