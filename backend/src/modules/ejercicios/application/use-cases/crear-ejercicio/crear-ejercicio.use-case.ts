import { Inject, Injectable } from '@nestjs/common';

import { CrearEjercicioCommand } from './crear-ejercicio.command';
import { EjercicioResponse } from '../../responses/ejercicio.response';
import type { GeneradorId } from 'src/shared/application/ports/generador-id.port';
import { GENERADOR_ID } from 'src/shared/application/ports/generador-id.port';
import { ValidarNombreEjercicioUnicoValidator } from '../../validators/validar-nombre-ejercicio-unico.validator';
import { Ejercicio } from 'src/modules/ejercicios/domain/entities/ejercicio.entity';
import { EJERCICIO_REPOSITORY} from 'src/modules/ejercicios/domain/repositories/ejercicio.repository';
import type { EjercicioRepository } from 'src/modules/ejercicios/domain/repositories/ejercicio.repository';

@Injectable()
export class CrearEjercicioUseCase {
  constructor(
    @Inject(EJERCICIO_REPOSITORY)
    private readonly ejercicioRepository: EjercicioRepository,
    @Inject(GENERADOR_ID)
    private readonly generadorId: GeneradorId,
    private readonly validarNombreUnico: ValidarNombreEjercicioUnicoValidator,
  ) {}

  async execute(command: CrearEjercicioCommand): Promise<EjercicioResponse> {
    // Valida que no exista otro ejercicio con el mismo nombre
    await this.validarNombreUnico.validar(command.nombre);

    // Genera identificador único
    const id = this.generadorId.generar();

    const ejercicio = Ejercicio.crear({
      id,
      nombre: command.nombre,
      tipoEjercicio: command.tipoEjercicio,
      gruposMusculares: command.gruposMusculares,
      observacion: command.observacion,
      imagenUrl: command.imagenUrl,
    });


    await this.ejercicioRepository.guardar(ejercicio);


    return EjercicioResponse.desdeDominio(ejercicio);
  }
}
