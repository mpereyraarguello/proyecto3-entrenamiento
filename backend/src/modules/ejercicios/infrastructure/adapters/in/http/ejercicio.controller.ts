import { Controller, Post, HttpCode, HttpStatus, Body, Get, Param } from "@nestjs/common";
import { EjercicioResponse } from "src/modules/ejercicios/application/responses/ejercicio.response";
import { ConsultarEjercicioCommand } from "src/modules/ejercicios/application/use-cases/consultar-ejercicio/consultar-ejercicio.command";
import { ConsultarEjercicioUseCase } from "src/modules/ejercicios/application/use-cases/consultar-ejercicio/consultar-ejercicio.use-case";
import { CrearEjercicioCommand } from "src/modules/ejercicios/application/use-cases/crear-ejercicio/crear-ejercicio.command";
import { CrearEjercicioUseCase } from "src/modules/ejercicios/application/use-cases/crear-ejercicio/crear-ejercicio.use-case";
import { ListarEjerciciosUseCase } from "src/modules/ejercicios/application/use-cases/listar-ejercicios/listar-ejercicios.use-case";
import { CrearEjercicioDto } from "./dtos/crear-ejercicio.dto";


@Controller('ejercicio')
export class EjercicioController {
  constructor(
    private readonly crearEjercicioUseCase: CrearEjercicioUseCase,
    private readonly listarEjerciciosUseCase: ListarEjerciciosUseCase,
    private readonly consultarEjercicioUseCase: ConsultarEjercicioUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CrearEjercicioDto): Promise<EjercicioResponse> {
    const command = new CrearEjercicioCommand(
      dto.nombre,
      dto.tipoEjercicio,
      dto.gruposMusculares,
      dto.observacion,
      dto.imagenUrl,
    );

    return await this.crearEjercicioUseCase.execute(command);
  }

  @Get()
  async findAll(): Promise<EjercicioResponse[]> {
    return await this.listarEjerciciosUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EjercicioResponse> {
    const command = new ConsultarEjercicioCommand(id);
    return await this.consultarEjercicioUseCase.execute(command);
  }
}
