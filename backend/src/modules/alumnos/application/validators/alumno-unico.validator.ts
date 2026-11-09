import { Inject, Injectable } from '@nestjs/common';
import {
  ALUMNO_REPOSITORY,
  type AlumnoRepository,
} from '../../domain/repositories/alumno.repository';
import { CorreoAlumnoDuplicadoException } from '../../domain/exceptions/correo-alumno-duplicado.exception';
import { DniAlumnoDuplicadoException } from '../../domain/exceptions/dni-alumno-duplicado.exception';

@Injectable()
export class AlumnoUnicoValidator {
  constructor(
    @Inject(ALUMNO_REPOSITORY)
    private readonly alumnoRepository: AlumnoRepository,
  ) {}

  async validarParaCrear(correo: string, dni: string): Promise<void> {
    const correoNormalizado = correo.trim().toLowerCase();
    const dniLimpio = dni.trim();

    const existentePorCorreo =
      await this.alumnoRepository.findByCorreo(correoNormalizado);
    if (existentePorCorreo) {
      throw new CorreoAlumnoDuplicadoException(correoNormalizado);
    }

    const existentePorDni = await this.alumnoRepository.findByDni(dniLimpio);
    if (existentePorDni) {
      throw new DniAlumnoDuplicadoException(dniLimpio);
    }
  }

  async validarParaModificar(
    idActual: string,
    nuevoCorreo: string,
    nuevoDni: string,
  ): Promise<void> {
    const correoNormalizado = nuevoCorreo.trim().toLowerCase();
    const dniLimpio = nuevoDni.trim();

    const existentePorCorreo =
      await this.alumnoRepository.findByCorreo(correoNormalizado);
    if (existentePorCorreo && existentePorCorreo.getId() !== idActual) {
      throw new CorreoAlumnoDuplicadoException(correoNormalizado);
    }

    const existentePorDni = await this.alumnoRepository.findByDni(dniLimpio);
    if (existentePorDni && existentePorDni.getId() !== idActual) {
      throw new DniAlumnoDuplicadoException(dniLimpio);
    }
  }
}
