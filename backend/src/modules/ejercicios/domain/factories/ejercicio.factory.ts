import { Injectable, Inject } from '@nestjs/common';
import { Ejercicio } from '../entities/ejercicio.entity';
import { CrearEjercicioDto } from '../../infrastructure/adapters/in/http/dtos/crear-ejercicio.dto';
import type {GeneradorId } from '../../../../shared/application/ports/generador-id.port';
import { GENERADOR_ID } from '../../../../shared/application/ports/generador-id.port';

@Injectable()
export class EjercicioFactory {
  constructor(
    @Inject(GENERADOR_ID) private readonly generadorId: GeneradorId,
  ) {}

  crear(dto: CrearEjercicioDto): Ejercicio {
    const id = this.generadorId.generar();
    return Ejercicio.crear({
      nombre: dto.nombre,
      tipoEjercicio: dto.tipoEjercicio,
      gruposMusculares: dto.gruposMusculares,
      observacion: dto.observacion,
      imagenUrl: dto.imagenUrl,
    });
  }
}