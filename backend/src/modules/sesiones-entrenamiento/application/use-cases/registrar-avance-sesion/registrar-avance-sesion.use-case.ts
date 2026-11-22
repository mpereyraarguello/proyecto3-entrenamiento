import { Inject, Injectable } from '@nestjs/common';
import { RegistrarAvanceSesionCommand } from './registrar-avance-sesion.command';
import { SesionEntrenamientoResponse } from '../../responses/sesion-entrenamiento.response';
import {
  SESION_ENTRENAMIENTO_REPOSITORY,
  type SesionEntrenamientoRepository,
} from '../../../domain/repositories/sesion-entrenamiento.repository';
import { SesionNoEncontradaException } from '../../../domain/exceptions/sesion-no-encontrada.exception';
import { ValidacionDeNegocioException } from '../../../../../shared/domain/exceptions/validacion-de-negocio.exception';

@Injectable()
export class RegistrarAvanceSesionUseCase {
  constructor(
    @Inject(SESION_ENTRENAMIENTO_REPOSITORY)
    private readonly sesionRepository: SesionEntrenamientoRepository,
  ) {}

  async execute(command: RegistrarAvanceSesionCommand): Promise<SesionEntrenamientoResponse> {
    const sesion = await this.sesionRepository.findById(command.sesionId);
    if (!sesion) {
      throw new SesionNoEncontradaException(command.sesionId);
    }

    if (sesion.getAlumnoId() !== command.alumnoId) {
      throw new ValidacionDeNegocioException('La sesión no corresponde al alumno indicado.');
    }

    // Actualiza en el dominio (valida inmutabilidad de sesión finalizada e invariantes de peso/repeticiones)
    sesion.actualizarAvance(command.registros, command.bloques);

    await this.sesionRepository.save(sesion);

    return SesionEntrenamientoResponse.desdeDominio(sesion);
  }
}

