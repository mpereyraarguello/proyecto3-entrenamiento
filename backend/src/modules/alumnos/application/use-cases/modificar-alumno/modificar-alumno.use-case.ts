import { Inject, Injectable } from '@nestjs/common';
import {
  ALUMNO_REPOSITORY,
  type AlumnoRepository,
} from '../../../domain/repositories/alumno.repository';
import { Email } from '../../../domain/value-objects/email.vo';
import { AlumnoNoEncontradoException } from '../../../domain/exceptions/alumno-no-encontrado.exception';
import { AlumnoUnicoValidator } from '../../validators/alumno-unico.validator';
import { AlumnoResponse } from '../../responses/alumno.response';
import { ModificarAlumnoCommand } from './modificar-alumno.command';
import {
  RELOJ_PORT,
  type RelojPort,
} from '../../../../../shared/application/ports/reloj.port';

@Injectable()
export class ModificarAlumnoUseCase {
  constructor(
    @Inject(ALUMNO_REPOSITORY)
    private readonly repository: AlumnoRepository,
    private readonly validator: AlumnoUnicoValidator,
    @Inject(RELOJ_PORT)
    private readonly reloj: RelojPort,
  ) {}

  async execute(command: ModificarAlumnoCommand): Promise<AlumnoResponse> {
    // 1) Obtener el agregado existente
    const alumno = await this.repository.findById(command.id);
    if (!alumno) {
      throw new AlumnoNoEncontradoException(command.id);
    }

    // 2) Construir y validar el Value Object Email
    const correoVo = Email.crear(command.correo);

    // 3) Validar unicidad de correo y DNI contra otros alumnos
    await this.validator.validarParaModificar(
      command.id,
      correoVo.getValor(),
      command.dni,
    );

    // 4) Aplicar modificación en la entidad de dominio
    alumno.modificar({
      nombre: command.nombre,
      apellido: command.apellido,
      dni: command.dni,
      telefono: command.telefono,
      correo: correoVo,
      contrasenia: command.contrasenia,
      objetivos: command.objetivos,
      fechaActual: this.reloj.ahora(),
    });

    // 5) Persistir cambios
    await this.repository.save(alumno);

    // 6) Retornar response resuelta
    return AlumnoResponse.desdeDominio(alumno);
  }
}
