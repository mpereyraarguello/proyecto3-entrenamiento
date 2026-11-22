import { Inject, Injectable } from '@nestjs/common';
import { FinalizarSesionCommand } from './finalizar-sesion.command';
import { SesionEntrenamientoResponse } from '../../responses/sesion-entrenamiento.response';
import {
  SESION_ENTRENAMIENTO_REPOSITORY,
  type SesionEntrenamientoRepository,
} from '../../../domain/repositories/sesion-entrenamiento.repository';
import { RELOJ_PORT, type RelojPort } from '../../../../../shared/application/ports/reloj.port';
import { SesionNoEncontradaException } from '../../../domain/exceptions/sesion-no-encontrada.exception';
import { ValidacionDeNegocioException } from '../../../../../shared/domain/exceptions/validacion-de-negocio.exception';

@Injectable()
export class FinalizarSesionUseCase {
  constructor(
    @Inject(SESION_ENTRENAMIENTO_REPOSITORY)
    private readonly sesionRepository: SesionEntrenamientoRepository,
    @Inject(RELOJ_PORT)
    private readonly reloj: RelojPort,
  ) {}

  async execute(command: FinalizarSesionCommand): Promise<SesionEntrenamientoResponse> {
    const sesion = await this.sesionRepository.findById(command.sesionId);
    if (!sesion) {
      throw new SesionNoEncontradaException(command.sesionId);
    }

    if (sesion.getAlumnoId() !== command.alumnoId) {
      throw new ValidacionDeNegocioException('La sesión no corresponde al alumno indicado.');
    }

    // Regla de dominio: valida estado en curso y que el 100% de ejercicios estén completos (CP-2A-01, CP-2A-02)
    sesion.finalizar(this.reloj.ahora());

    // Persiste íntegramente en la base de datos (CP-2A-03)
    await this.sesionRepository.save(sesion);

    return SesionEntrenamientoResponse.desdeDominio(sesion);
  }
}

