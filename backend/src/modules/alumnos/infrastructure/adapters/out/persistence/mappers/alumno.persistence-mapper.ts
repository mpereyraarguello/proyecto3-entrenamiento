import { Alumno } from '../../../../../domain/entities/alumno.entity';
import { Email } from '../../../../../domain/value-objects/email.vo';
import { ObjetivoAlumno } from '../../../../../domain/enums/objetivo-alumno.enum';
import { AlumnoOrmEntity } from '../orm-entities/alumno.orm-entity';

export class AlumnoPersistenceMapper {
  static toDomain(orm: AlumnoOrmEntity): Alumno {
    return Alumno.reconstituir({
      id: orm.id,
      nombre: orm.nombre,
      apellido: orm.apellido,
      dni: orm.dni,
      telefono: orm.telefono,
      correo: Email.crear(orm.correo),
      contrasenia: orm.contrasenia,
      objetivos: (orm.objetivos || []) as ObjetivoAlumno[],
      activo: orm.activo,
      creadoEn: orm.creadoEn,
      actualizadoEn: orm.actualizadoEn ?? null,
      bajaEn: orm.bajaEn ?? null,
    });
  }

  static toOrm(dominio: Alumno): AlumnoOrmEntity {
    const orm = new AlumnoOrmEntity();
    orm.id = dominio.getId();
    orm.nombre = dominio.getNombre();
    orm.apellido = dominio.getApellido();
    orm.dni = dominio.getDni();
    orm.telefono = dominio.getTelefono();
    orm.correo = dominio.getCorreo().getValor();
    orm.contrasenia = dominio.getContrasenia();
    orm.objetivos = [...dominio.getObjetivos()];
    orm.activo = dominio.estaActivo();
    orm.creadoEn = dominio.getCreadoEn();
    orm.actualizadoEn = dominio.getActualizadoEn();
    orm.bajaEn = dominio.getBajaEn();
    return orm;
  }
}
