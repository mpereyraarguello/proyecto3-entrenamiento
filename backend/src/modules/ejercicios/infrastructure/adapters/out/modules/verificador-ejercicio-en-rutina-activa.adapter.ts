import { Injectable } from '@nestjs/common';
import { VerificadorEjercicioEnRutinaActiva } from 'src/modules/ejercicios/application/ports/verificador-ejercicio-en-rutina-activa.port';
import { VerificarEjercicioEnRutinaActivaUseCase } from 'src/modules/planes-entrenamiento/application/use-cases/verificar-ejercicio-en-rutina-activa/verificar-ejercicio-en-rutina-activa.use-case';


@Injectable()
export class VerificadorEjercicioEnRutinaActivaAdapter implements VerificadorEjercicioEnRutinaActiva {
  constructor(
    private readonly verificarUseCase: VerificarEjercicioEnRutinaActivaUseCase,
  ) {}

  async estaEnRutinaActiva(ejercicioId: number): Promise<boolean> {
    return this.verificarUseCase.execute(ejercicioId);
  }
}