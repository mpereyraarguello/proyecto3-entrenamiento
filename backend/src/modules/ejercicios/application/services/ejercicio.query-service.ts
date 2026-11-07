import { Inject, Injectable } from '@nestjs/common';
import {EJERCICIO_REPOSITORY,} from '../../domain/repositories/ejercicio.repository';
import type {IEjercicioRepository,} from '../../domain/repositories/ejercicio.repository';
import { EjercicioFinder } from '../finders/ejercicio.finder';
import { EjercicioResponse } from '../responses/ejercicio.response';
import { BuscarEjercicioQuery } from '../queries/buscar-ejercicio.query';
import { EjercicioMapper } from '../mappers/ejercicio.mapper';

@Injectable()
export class EjercicioQueryService {
  constructor(
    @Inject(EJERCICIO_REPOSITORY)
    private readonly repository: IEjercicioRepository,
    private readonly finder: EjercicioFinder,
  ) {}

  async findDtoById(id: number): Promise<EjercicioResponse> {
    const entity = await this.finder.obtenerPorIdOrThrow(id);
    return EjercicioMapper.toDto(entity);
  }

  async findAll(): Promise<EjercicioResponse[]> {
    const list = await this.repository.listarTodos();
    return list.map((entity) => EjercicioMapper.toDto(entity));
  }

  async findBy(query: BuscarEjercicioQuery): Promise<{ data: EjercicioResponse[]; total: number }> {
    const result = await this.repository.buscarEjercicios(query);
    return {
      data: result.data.map((doc) => EjercicioMapper.toDto(doc)),
      total: result.total,
    };
  }
}
