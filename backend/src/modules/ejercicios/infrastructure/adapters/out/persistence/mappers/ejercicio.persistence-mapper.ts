import { Ejercicio } from 'src/modules/ejercicios/domain/entities/ejercicio.entity';
import { GrupoMuscular } from 'src/shared/domain/enums/grupo-muscular.enum';
import { TipoEjercicio } from 'src/shared/domain/enums/tipo-ejercicio.enum';
import { EjercicioOrmEntity } from '../orm-entities/ejercicio.orm-entity';
import { EjercicioResponse } from 'src/modules/ejercicios/application/responses/ejercicio.response';


export class EjercicioMapper {
  static toDomain(orm: EjercicioOrmEntity): Ejercicio {
    return Ejercicio.reconstituir({
      id: orm.id,
      nombre: orm.nombre,
      tipoEjercicio: orm.tipoEjercicio as TipoEjercicio,
      gruposMusculares: (orm.gruposMusculares || []) as GrupoMuscular[],
      observacion: orm.observacion,
      imagenUrl: orm.imagenUrl,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }

  static toOrm(domain: Ejercicio): EjercicioOrmEntity {
    const orm = new EjercicioOrmEntity();
    if (domain.id !== null && domain.id !== undefined) {
      orm.id = domain.id;
    }
    orm.nombre = domain.nombre;
    orm.tipoEjercicio = domain.tipoEjercicio;
    orm.gruposMusculares = domain.gruposMusculares;
    orm.observacion = domain.observacion;
    orm.imagenUrl = domain.imagenUrl;
    orm.createdAt = domain.createdAt;
    if (domain.updatedAt) {
      orm.updatedAt = domain.updatedAt;
    }
    return orm;
  }

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
