import { Ejercicio } from '../../domain/entities/ejercicio.entity';
import { EjercicioResponse } from '../responses/ejercicio.response';

export class EjercicioMapper {
  static toDto(domain: Ejercicio): EjercicioResponse {
    const dto = new EjercicioResponse();
    dto.id = domain.id!;
    dto.nombre = domain.nombre;
    dto.tipoEjercicio = domain.tipoEjercicio;
    dto.gruposMusculares = domain.gruposMusculares;
    dto.observacion = domain.observacion;
    dto.imagenUrl = domain.imagenUrl;
    dto.createdAt = domain.createdAt.toISOString();
    dto.updatedAt = domain.updatedAt ? domain.updatedAt.toISOString() : null;
    return dto;
  }
}
