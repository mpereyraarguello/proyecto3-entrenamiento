import { Inject, Injectable } from '@nestjs/common';
import { MarcarBloqueSesionCommand } from './marcar-bloque-sesion.command';
import { SesionEntrenamientoResponse } from '../../responses/sesion-entrenamiento.response';
import {
  SESION_ENTRENAMIENTO_REPOSITORY,
  type SesionEntrenamientoRepository,
} from '../../../domain/repositories/sesion-entrenamiento.repository';
import { SesionNoEncontradaException } from '../../../domain/exceptions/sesion-no-encontrada.exception';
import { ValidacionDeNegocioException } from '../../../../../shared/domain/exceptions/validacion-de-negocio.exception';
import { TipoBloqueSesion } from '../../../domain/enums/tipo-bloque-sesion.enum';

@Injectable()
export class MarcarBloqueSesionUseCase {
  constructor(
    @Inject(SESION_ENTRENAMIENTO_REPOSITORY)
    private readonly sesionRepository: SesionEntrenamientoRepository,
  ) {}

  async execute(command: MarcarBloqueSesionCommand): Promise<SesionEntrenamientoResponse> {
    const sesion = await this.sesionRepository.findById(command.sesionId);
    if (!sesion) {
      throw new SesionNoEncontradaException(command.sesionId);
    }

    if (sesion.getAlumnoId() !== command.alumnoId) {
      throw new ValidacionDeNegocioException('La sesión no corresponde al alumno indicado.');
    }

    // Aplica la regla en el agregado de dominio (valida sesión en curso, CP-4A-1, CP-4A-2, CP-4A-3, CP-4A-7)
    switch (command.tipoBloque) {
      case TipoBloqueSesion.CALENTAMIENTO:
        sesion.marcarCalentamiento(command.completado);
        break;
      case TipoBloqueSesion.CARDIO:
        sesion.marcarCardio(command.completado);
        break;
      case TipoBloqueSesion.ESTIRAMIENTO:
        sesion.marcarEstiramiento(command.completado);
        break;
      default:
        throw new ValidacionDeNegocioException(`Tipo de bloque no válido: ${command.tipoBloque}`);
    }

    // Persiste el nuevo estado para conservar el avance (CA.4A.5, CP-4A-6)
    await this.sesionRepository.save(sesion);

    return SesionEntrenamientoResponse.desdeDominio(sesion);
  }
}

