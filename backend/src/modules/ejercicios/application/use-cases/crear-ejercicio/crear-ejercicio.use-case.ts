import { Injectable, Inject } from "@nestjs/common";
import { Ejercicio } from "src/modules/ejercicios/domain/entities/ejercicio.entity";
import { EJERCICIO_REPOSITORY} from "src/modules/ejercicios/domain/repositories/ejercicio.repository";
import { EjercicioMapper } from "../../mappers/ejercicio.mapper";
import { EjercicioResponse } from "../../responses/ejercicio.response";
import { CrearEjercicioCommand } from "./crear-ejercicio.command";
import { EjercicioValidator } from "../../validators/validar-nombre-ejercicio-unico.validator";
import type { IEjercicioRepository } from "src/modules/ejercicios/domain/repositories/ejercicio.repository";

@Injectable()
export class CrearEjercicioUseCase {
  constructor(
    @Inject(EJERCICIO_REPOSITORY)
    private readonly ejercicioRepository: IEjercicioRepository,
    private readonly validarNombreUnico: EjercicioValidator,
  ) {}

  async execute(command: CrearEjercicioCommand): Promise<EjercicioResponse> {
    // 1. Validar que no exista otro ejercicio con el mismo nombre (CA.0x.06)
    await this.validarNombreUnico.validarCreacion(command);

    // 2. Crear la entidad de dominio (el id se asigna automáticamente al persistir)
    const ejercicio = Ejercicio.crear({
      nombre: command.nombre,
      tipoEjercicio: command.tipoEjercicio,
      gruposMusculares: command.gruposMusculares,
      observacion: command.observacion,
      imagenUrl: command.imagenUrl,
    });

    // 3. Persistir en la base de datos (obteniendo el id generado)
    const guardado = await this.ejercicioRepository.guardar(ejercicio);

    // 4. Retornar DTO / Response desacoplada
    return EjercicioMapper.toDto(guardado);
  }
}
