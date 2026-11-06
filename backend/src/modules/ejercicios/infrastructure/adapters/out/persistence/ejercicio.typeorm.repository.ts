import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ejercicio } from 'src/modules/ejercicios/domain/entities/ejercicio.entity';
import { EjercicioRepository } from 'src/modules/ejercicios/domain/repositories/ejercicio.repository';
import { EjercicioOrmEntity } from './orm-entities/ejercicio.orm-entity';
import { EjercicioMapper } from './mappers/ejercicio.persistence-mapper';

@Injectable()
export class EjercicioTypeOrmRepository implements EjercicioRepository {
  constructor(
    @InjectRepository(EjercicioOrmEntity)
    private readonly ormRepo: Repository<EjercicioOrmEntity>,
  ) {}

  async guardar(ejercicio: Ejercicio): Promise<void> {
    const ormEntity = EjercicioMapper.toOrm(ejercicio);
    await this.ormRepo.save(ormEntity);
  }

  async buscarPorId(id: string): Promise<Ejercicio | null> {
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
}
