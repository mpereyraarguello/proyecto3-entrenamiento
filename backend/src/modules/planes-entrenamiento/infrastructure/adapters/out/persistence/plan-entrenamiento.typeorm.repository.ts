import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PlanEntrenamientoRepository } from '../../../../domain/repositories/plan-entrenamiento.repository';
import { PlanEntrenamiento } from '../../../../domain/entities/plan-entrenamiento.entity';
import { PlanEntrenamientoOrmEntity } from './orm-entities/plan-entrenamiento.orm-entity';
import { PlanEntrenamientoPersistenceMapper } from './mappers/plan-entrenamiento.persistence-mapper';
import { EstadoPlan } from '../../../../domain/enums/estado-plan.enums';

@Injectable()
export class PlanEntrenamientoTypeOrmRepository implements PlanEntrenamientoRepository{
  constructor(
    @InjectRepository(PlanEntrenamientoOrmEntity)
    private readonly repo: Repository<PlanEntrenamientoOrmEntity>,
  ) {}

  async verificarSiEjercicioEstaEnPlanActivo(ejercicioId: string): Promise<boolean> {
    // Buscamos si el ejercicio está en algún ítem de una rutina de un plan ACTIVO
    const count = await this.repo.manager
      .createQueryBuilder(PlanEntrenamientoOrmEntity, 'plan')
      .innerJoin('plan.rutinas', 'rutina')
      .innerJoin('rutina.items', 'item')
      .where('plan.estado = :estado', { estado: EstadoPlan.ACTIVO })
      .andWhere('item.ejercicioId = :ejercicioId', { ejercicioId })
      .getCount();

    return count > 0; // Si hay al menos 1, devuelve true
  }

  async save(plan: PlanEntrenamiento): Promise<void> {
    const orm = PlanEntrenamientoPersistenceMapper.toOrm(plan);
    
    // Usamos save porque maneja tanto INSERT como UPDATE.
    // Al tener cascade: true en las rutinas e ítems, TypeORM guarda todo el agregado.
    await this.repo.save(orm);
  }

  async findById(id: string): Promise<PlanEntrenamiento | null> {
    const orm = await this.repo.findOne({
      where: { id },
      relations: {'rutinas':true },
    });
    return orm ? PlanEntrenamientoPersistenceMapper.toDomain(orm) : null;
  }

  async findActivoByAlumno(alumnoId: string): Promise<PlanEntrenamiento | null> {
    const orm = await this.repo.findOne({
      where: { alumnoId, estado: EstadoPlan.ACTIVO },
      relations: {'rutinas':true },
    });
    return orm ? PlanEntrenamientoPersistenceMapper.toDomain(orm) : null;
  }

  async findUltimoByAlumno(alumnoId: string): Promise<PlanEntrenamiento | null> {
    const orm = await this.repo.findOne({
      where: { alumnoId },
      order: { numeroPlan: 'DESC' },
      relations: {'rutinas':true },
    });
    return orm ? PlanEntrenamientoPersistenceMapper.toDomain(orm) : null;
  }

  async findHistorialByAlumno(alumnoId: string): Promise<PlanEntrenamiento[]> {
    const orms = await this.repo.find({
      where: { alumnoId },
      order: { numeroPlan: 'DESC' },
      relations: {'rutinas':true },
    });
    return orms.map(PlanEntrenamientoPersistenceMapper.toDomain);
  }
}