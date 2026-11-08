import { Inject, Injectable } from '@nestjs/common';
import {VERIFICADOR_EJERCICIO_EN_RUTINA_ACTIVA,} from '../ports/verificador-ejercicio-en-rutina-activa.port';
import type {VerificadorEjercicioEnRutinaActiva} from '../ports/verificador-ejercicio-en-rutina-activa.port';
import { EjercicioEnRutinaActivaException } from '../../domain/exceptions/ejercicio-en-rutina-activa.exception';

@Injectable()
export class ValidarEjercicioNoEnRutinaActivaValidator {
  constructor(
    @Inject(VERIFICADOR_EJERCICIO_EN_RUTINA_ACTIVA)
    private readonly verificador: VerificadorEjercicioEnRutinaActiva,
  ) {}

  async validar(ejercicioId: number): Promise<void> {
    const estaEnUso = await this.verificador.estaEnRutinaActiva(ejercicioId);
    if (estaEnUso) {
      throw new EjercicioEnRutinaActivaException(ejercicioId);
    }
  }
}