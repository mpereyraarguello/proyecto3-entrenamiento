import { Inject, Injectable } from '@nestjs/common';
import {
  ALUMNO_REPOSITORY,
  type AlumnoRepository,
} from '../../../domain/repositories/alumno.repository';
import { Alumno } from '../../../domain/entities/alumno.entity';
import { Email } from '../../../domain/value-objects/email.vo';
import { AlumnoUnicoValidator } from '../../validators/alumno-unico.validator';
import { AlumnoResponse } from '../../responses/alumno.response';
import { CrearAlumnoCommand } from './crear-alumno.command';
import {
  GENERADOR_ID,
  type GeneradorId,
} from '../../../../../shared/application/ports/generador-id.port';
import {
  RELOJ_PORT,
  type RelojPort,
} from '../../../../../shared/application/ports/reloj.port';

@Injectable()
export class CrearAlumnoUseCase {
  constructor(
    @Inject(ALUMNO_REPOSITORY)
    private readonly repository: AlumnoRepository,
    private readonly validator: AlumnoUnicoValidator,
    @Inject(GENERADOR_ID)
    private readonly generadorId: GeneradorId,
    @Inject(RELOJ_PORT)
    private readonly reloj: RelojPort,
  ) {}

  async execute(command: CrearAlumnoCommand): Promise<AlumnoResponse> {
    // 1) Validar formato del Value Object Email antes de consultar unicidad
    const correoVo = Email.crear(command.correo);

    // 2) Validaciones que requieren consultar datos externos (correo y DNI únicos)
    await this.validator.validarParaCrear(correoVo.getValor(), command.dni);

    // 3) Construir el agregado de dominio (simple -> Alumno.crear)
    const alumno = Alumno.crear({
      id: this.generadorId.generar(),
      nombre: command.nombre,
      apellido: command.apellido,
      dni: command.dni,
      telefono: command.telefono,
      correo: correoVo,
      contrasenia: command.contrasenia,
      objetivos: command.objetivos,
      fechaActual: this.reloj.ahora(),
    });

    // 4) Persistir el agregado
    await this.repository.save(alumno);

    // 5) Devolver la response resuelta para el frontend
    return AlumnoResponse.desdeDominio(alumno);
  }
}
