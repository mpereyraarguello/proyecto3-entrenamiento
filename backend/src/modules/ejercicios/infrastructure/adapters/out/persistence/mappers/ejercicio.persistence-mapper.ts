import { Ejercicio } from "src/modules/ejercicios/domain/entities/ejercicio.entity";
import { GrupoMuscular } from "src/shared/domain/enums/grupo-muscular.enum";
import { TipoEjercicio } from "src/shared/domain/enums/tipo-ejercicio.enum";
import { EjercicioOrmEntity } from "../orm-entities/ejercicio.orm-entity";

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
    });
  }

  static toOrm(domain: Ejercicio): EjercicioOrmEntity {
    const orm = new EjercicioOrmEntity();
    orm.id = domain.id;
    orm.nombre = domain.nombre;
    orm.tipoEjercicio = domain.tipoEjercicio;
    orm.gruposMusculares = domain.gruposMusculares;
    orm.observacion = domain.observacion;
    orm.imagenUrl = domain.imagenUrl;
    orm.createdAt = domain.createdAt;
    return orm;
  }
}
