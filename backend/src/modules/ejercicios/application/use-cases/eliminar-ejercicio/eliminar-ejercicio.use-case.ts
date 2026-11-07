import { Inject, Injectable } from '@nestjs/common';
import { EliminarEjercicioCommand } from './eliminar-ejercicio.command';
import { EjercicioFinder } from '../../finders/ejercicio.finder';
import { ValidarEjercicioNoEnRutinaActivaValidator } from '../../validators/validar-ejercicio-no-en-rutina-activa.validator';
import { EJERCICIO_REPOSITORY} from 'src/modules/ejercicios/domain/repositories/ejercicio.repository';
import type{ IEjercicioRepository } from 'src/modules/ejercicios/domain/repositories/ejercicio.repository';

@Injectable()
export class EliminarEjercicioUseCase {
  constructor(
    @Inject(EJERCICIO_REPOSITORY)
    private readonly repository: IEjercicioRepository,
    private readonly finder: EjercicioFinder,
    private readonly validator: ValidarEjercicioNoEnRutinaActivaValidator,
  ) {}

  async execute(command: EliminarEjercicioCommand): Promise<void> {
    const ejercicio = await this.finder.obtenerPorIdOrThrow(command.id);

    //Validar que no pertenezca a una rutina activa
    await this.validator.validar(command.id);
    ejercicio.darDeBaja();
    await this.repository.guardar(ejercicio);
  }
}