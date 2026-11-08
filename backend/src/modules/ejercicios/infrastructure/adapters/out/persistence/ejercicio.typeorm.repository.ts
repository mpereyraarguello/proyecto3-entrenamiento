import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuscarEjercicioQuery } from 'src/modules/ejercicios/application/queries/buscar-ejercicio.query';
import { Ejercicio } from 'src/modules/ejercicios/domain/entities/ejercicio.entity';
import { Repository } from 'typeorm';
import { EjercicioMapper } from './mappers/ejercicio.persistence-mapper';
import { EjercicioOrmEntity } from './orm-entities/ejercicio.orm-entity';
import type { IEjercicioRepository } from 'src/modules/ejercicios/domain/repositories/ejercicio.repository';


@Injectable()
export class EjercicioTypeOrmRepository implements IEjercicioRepository {
  constructor(
    @InjectRepository(EjercicioOrmEntity)
    private readonly ormRepo: Repository<EjercicioOrmEntity>,
  ) {}

  async guardar(ejercicio: Ejercicio): Promise<Ejercicio> {
    const ormEntity = EjercicioMapper.toOrm(ejercicio);
    const guardado = await this.ormRepo.save(ormEntity);
    return EjercicioMapper.toDomain(guardado);
  }

  async buscarPorId(id: number): Promise<Ejercicio | null> {
    const ormEntity = await this.ormRepo.findOne({ where: { id } });
    return ormEntity ? EjercicioMapper.toDomain(ormEntity) : null;
  }

  async buscarPorNombre(nombre: string): Promise<Ejercicio | null> {
    const ormEntity = await this.ormRepo.findOne({ where: { nombre } });
    return ormEntity ? EjercicioMapper.toDomain(ormEntity) : null;
  }

  async listarTodos(): Promise<Ejercicio[]> {
    const entities = await this.ormRepo.find();
    return entities.map(EjercicioMapper.toDomain);
  }

  async buscarEjercicios(query: BuscarEjercicioQuery): Promise<{ data: Ejercicio[]; total: number }> {
    const qb = this.ormRepo.createQueryBuilder('ejercicio');

    if (query.termino) {
      const termino = `%${query.termino.toLowerCase().trim()}%`;
      qb.andWhere(
        '(LOWER(ejercicio.nombre) LIKE :termino OR LOWER(ejercicio.observacion) LIKE :termino)',
        { termino },
      );
    }

    if (query.tipoEjercicio) {
      qb.andWhere('ejercicio.tipo_ejercicio = :tipo', { tipo: query.tipoEjercicio });
    }

    if (query.grupoMuscular) {
      qb.andWhere('ejercicio.grupos_musculares LIKE :grupo', {
        grupo: `%"${query.grupoMuscular}"%`,
      });
    }

    const [entities, total] = await qb.getManyAndCount();

    return {
      data: entities.map(EjercicioMapper.toDomain),
      total,
    };
  }
}
