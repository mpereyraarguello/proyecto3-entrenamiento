import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlumnoRepository } from '../../../../domain/repositories/alumno.repository';
import { Alumno } from '../../../../domain/entities/alumno.entity';
import { AlumnoOrmEntity } from './orm-entities/alumno.orm-entity';
import { AlumnoPersistenceMapper } from './mappers/alumno.persistence-mapper';

@Injectable()
export class AlumnoTypeOrmRepository implements AlumnoRepository {
  constructor(
    @InjectRepository(AlumnoOrmEntity)
    private readonly ormRepo: Repository<AlumnoOrmEntity>,
  ) {}

  async save(alumno: Alumno): Promise<void> {
    const orm = AlumnoPersistenceMapper.toOrm(alumno);
    await this.ormRepo.save(orm);
  }

  async findById(id: string): Promise<Alumno | null> {
    const orm = await this.ormRepo.findOne({
      where: { id, activo: true },
    });
    return orm ? AlumnoPersistenceMapper.toDomain(orm) : null;
  }

  async findByCorreo(correo: string): Promise<Alumno | null> {
    const orm = await this.ormRepo.findOne({
      where: { correo: correo.trim().toLowerCase(), activo: true },
    });
    return orm ? AlumnoPersistenceMapper.toDomain(orm) : null;
  }

  async findByDni(dni: string): Promise<Alumno | null> {
    const orm = await this.ormRepo.findOne({
      where: { dni: dni.trim(), activo: true },
    });
    return orm ? AlumnoPersistenceMapper.toDomain(orm) : null;
  }

  async findAll(termino?: string): Promise<Alumno[]> {
    const qb = this.ormRepo
      .createQueryBuilder('alumno')
      .where('alumno.activo = :activo', { activo: true });

    if (termino && termino.trim().length > 0) {
      const busqueda = `%${termino.trim().toLowerCase()}%`;
      qb.andWhere(
        '(LOWER(alumno.nombre) LIKE :busqueda OR LOWER(alumno.apellido) LIKE :busqueda OR alumno.dni LIKE :busqueda OR LOWER(alumno.correo) LIKE :busqueda)',
        { busqueda },
      );
    }

    qb.orderBy('alumno.apellido', 'ASC').addOrderBy('alumno.nombre', 'ASC');

    const entities = await qb.getMany();
    return entities.map((orm) => AlumnoPersistenceMapper.toDomain(orm));
  }

  async existePorId(id: string): Promise<boolean> {
    const count = await this.ormRepo.count({
      where: { id, activo: true },
    });
    return count > 0;
  }
}
