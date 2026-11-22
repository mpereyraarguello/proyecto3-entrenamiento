import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResumenPlanConSesiones, SesionEntrenamientoRepository } from '../../../../domain/repositories/sesion-entrenamiento.repository';
import { SesionEntrenamiento } from '../../../../domain/entities/sesion-entrenamiento.entity';
import { EstadoSesion } from '../../../../domain/enums/estado-sesion.enum';
import { SesionEntrenamientoOrmEntity } from './orm-entities/sesion-entrenamiento.orm-entity';
import { SesionEntrenamientoPersistenceMapper } from './mappers/sesion-entrenamiento.persistence-mapper';

@Injectable()
export class SesionEntrenamientoTypeOrmRepository implements SesionEntrenamientoRepository {
  constructor(
    @InjectRepository(SesionEntrenamientoOrmEntity)
    private readonly ormRepository: Repository<SesionEntrenamientoOrmEntity>,
  ) {}

  async save(sesion: SesionEntrenamiento): Promise<void> {
    const orm = SesionEntrenamientoPersistenceMapper.toOrm(sesion);
    await this.ormRepository.save(orm);
  }

  async findById(id: string): Promise<SesionEntrenamiento | null> {
    const orm = await this.ormRepository.findOne({
      where: { id },
      relations: { ejercicios: { series: true } },
    });

    if (!orm) return null;
    return SesionEntrenamientoPersistenceMapper.toDomain(orm);
  }

  async findEnCursoByAlumnoId(alumnoId: string): Promise<SesionEntrenamiento | null> {
    const orm = await this.ormRepository.findOne({
      where: {
        alumnoId,
        estado: EstadoSesion.EN_CURSO,
      },
      relations: { ejercicios: { series: true } },
    });

    if (!orm) return null;
    return SesionEntrenamientoPersistenceMapper.toDomain(orm);
  }

  async findUltimaFinalizadaByAlumnoId(alumnoId: string): Promise<SesionEntrenamiento | null> {
    const orm = await this.ormRepository.findOne({
      where: {
        alumnoId,
        estado: EstadoSesion.FINALIZADA,
      },
      order: {
        fechaFin: 'DESC',
      },
      relations: { ejercicios: { series: true } },
    });

    if (!orm) return null;
    return SesionEntrenamientoPersistenceMapper.toDomain(orm);
  }

  async findFinalizadasByAlumnoYPlan(
    alumnoId: string,
    planId: string,
  ): Promise<SesionEntrenamiento[]> {
    const list = await this.ormRepository.find({
      where: {
        alumnoId,
        planId,
        estado: EstadoSesion.FINALIZADA,
      },
      order: {
        fechaFin: 'DESC',
      },
      relations: { ejercicios: { series: true } },
    });

    return list.map((orm) => SesionEntrenamientoPersistenceMapper.toDomain(orm));
  }

  async findPlanesConSesionesFinalizadas(alumnoId: string): Promise<ResumenPlanConSesiones[]> {
    const filas = await this.ormRepository
      .createQueryBuilder('sesion')
      .select('sesion.planId', 'planId')
      .addSelect('COUNT(*)', 'totalSesiones')
      .addSelect('MIN(sesion.fechaInicio)', 'primeraSesion')
      .where('sesion.alumnoId = :alumnoId', { alumnoId })
      .andWhere('sesion.estado = :estado', { estado: EstadoSesion.FINALIZADA })
      .groupBy('sesion.planId')
      .orderBy('primeraSesion', 'DESC')
      .getRawMany<{ planId: string; totalSesiones: string; primeraSesion: Date | string }>();

    return filas.map((fila) => ({
      planId: fila.planId,
      totalSesiones: Number(fila.totalSesiones),
      primeraSesion: new Date(fila.primeraSesion),
    }));
  }

  async findUltimoPesoEjercicio(
    alumnoId: string,
    ejercicioId: string,
  ): Promise<{ peso: number; repeticiones: number } | null> {
    const sesion = await this.ormRepository
      .createQueryBuilder('sesion')
      .innerJoinAndSelect('sesion.ejercicios', 'ejercicio')
      .innerJoinAndSelect('ejercicio.series', 'serie')
      .where('sesion.alumnoId = :alumnoId', { alumnoId })
      .andWhere('sesion.estado = :estado', { estado: EstadoSesion.FINALIZADA })
      .andWhere('ejercicio.ejercicioId = :ejercicioId', { ejercicioId })
      .orderBy('sesion.fechaFin', 'DESC')
      .addOrderBy('serie.numeroSerie', 'ASC')
      .getOne();

    if (!sesion || !sesion.ejercicios || sesion.ejercicios.length === 0) {
      return null;
    }

    const ejercicio = sesion.ejercicios.find((e) => e.ejercicioId === ejercicioId);
    if (!ejercicio || !ejercicio.series || ejercicio.series.length === 0) {
      return null;
    }

    const ultimaSerie = ejercicio.series[ejercicio.series.length - 1];
    return {
      peso: Number(ultimaSerie.peso),
      repeticiones: ultimaSerie.repeticiones,
    };
  }
}
