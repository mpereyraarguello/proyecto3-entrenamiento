import { Inject, Injectable } from '@nestjs/common';
import { ConsultarDetalleSesionHistorialCommand } from './consultar-detalle-sesion-historial.command';
import { ItemHistorialSesionResponse } from '../../responses/historial-sesiones-plan.response';
import {
  SESION_ENTRENAMIENTO_REPOSITORY,
  type SesionEntrenamientoRepository,
} from '../../../domain/repositories/sesion-entrenamiento.repository';
import { SesionNoEncontradaException } from '../../../domain/exceptions/sesion-no-encontrada.exception';
import { ValidacionDeNegocioException } from '../../../../../shared/domain/exceptions/validacion-de-negocio.exception';
import { mapearSesionAHistorial } from '../../helpers/mapear-sesion-historial.helper';

@Injectable()
export class ConsultarDetalleSesionHistorialUseCase {
  constructor(
    @Inject(SESION_ENTRENAMIENTO_REPOSITORY)
    private readonly sesionRepository: SesionEntrenamientoRepository,
  ) {}

  async execute(
    command: ConsultarDetalleSesionHistorialCommand,
  ): Promise<ItemHistorialSesionResponse> {
    const sesion = await this.sesionRepository.findById(command.sesionId);
    if (!sesion) {
      throw new SesionNoEncontradaException(command.sesionId);
    }

    if (sesion.getAlumnoId() !== command.alumnoId) {
      throw new ValidacionDeNegocioException('La sesión no corresponde al alumno indicado.');
    }

    if (!sesion.estaFinalizada()) {
      throw new ValidacionDeNegocioException(
        'La sesión aún se encuentra en curso; el historial solo visualiza sesiones finalizadas.',
      );
    }

    return mapearSesionAHistorial(sesion);
  }
}
