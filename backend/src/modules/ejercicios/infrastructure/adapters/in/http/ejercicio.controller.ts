import { Controller, Post, HttpCode, HttpStatus, Body, Get, Query, Param, ParseIntPipe } from "@nestjs/common";
import { BuscarEjercicioQuery } from "src/modules/ejercicios/application/queries/buscar-ejercicio.query";
import { EjercicioResponse } from "src/modules/ejercicios/application/responses/ejercicio.response";
import { EjercicioQueryService } from "src/modules/ejercicios/application/services/ejercicio.query-service";
import { CrearEjercicioCommand } from "src/modules/ejercicios/application/use-cases/crear-ejercicio/crear-ejercicio.command";
import { CrearEjercicioUseCase } from "src/modules/ejercicios/application/use-cases/crear-ejercicio/crear-ejercicio.use-case";
import { BuscarEjercicioDto } from "./dtos/buscar-ejercicio.dto";
import { CrearEjercicioDto } from "./dtos/crear-ejercicio.dto";

@Controller('ejercicios')
export class EjercicioController {
  constructor(
    private readonly crearEjercicioUseCase: CrearEjercicioUseCase,
    private readonly queryService: EjercicioQueryService,
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

  @Get('search-by')
  async findBy(
    @Query() dto: BuscarEjercicioDto,
  ): Promise<{ data: EjercicioResponse[]; total: number }> {
    const query = new BuscarEjercicioQuery(
      dto.termino,
      dto.tipoEjercicio,
      dto.grupoMuscular,
    );
    return await this.queryService.findBy(query);
  }

  @Get()
  async findAll(): Promise<EjercicioResponse[]> {
    return await this.queryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<EjercicioResponse> {
    return await this.queryService.findDtoById(id);
  }
}
