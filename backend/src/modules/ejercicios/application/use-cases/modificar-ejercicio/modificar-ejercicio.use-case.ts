import { Inject, Injectable } from '@nestjs/common';
import { ModificarEjercicioCommand } from './modificar-ejercicio.command';
import { EjercicioResponse } from '../../responses/ejercicio.response';
import { EjercicioFinder } from '../../finders/ejercicio.finder';
import { EjercicioValidator } from '../../validators/validar-nombre-ejercicio-unico.validator';
import { EjercicioMapper } from '../../mappers/ejercicio.mapper';
import { EJERCICIO_REPOSITORY } from 'src/modules/ejercicios/domain/repositories/ejercicio.repository';
import type { IEjercicioRepository } from 'src/modules/ejercicios/domain/repositories/ejercicio.repository';
@Injectable()
export class ModificarEjercicioUseCase {
  constructor(
    @Inject(EJERCICIO_REPOSITORY)
    private readonly repository: IEjercicioRepository,
    private readonly finder: EjercicioFinder,
    private readonly validator: EjercicioValidator,
  ) {}

  async execute(command: ModificarEjercicioCommand): Promise<EjercicioResponse> {
    const ejercicio = await this.finder.obtenerPorIdOrThrow(command.id);

    await this.validator.validarParaModificar(command.id, command.nombre);

    ejercicio.modificar({
      nombre: command.nombre,
      tipoEjercicio: command.tipoEjercicio,
      gruposMusculares: command.gruposMusculares,
      observacion: command.observacion,
      imagenUrl: command.imagenUrl,
    });

    const guardado = await this.repository.guardar(ejercicio);

    return EjercicioMapper.toDto(guardado);
  }
}