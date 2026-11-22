import {  Body,  Controller,  Delete,  Get,  HttpCode,  HttpStatus,  Param,  Patch,  Post,  Query,} from '@nestjs/common';

// Use Cases y Commands
import { CrearAlumnoUseCase } from '../../../../application/use-cases/crear-alumno/crear-alumno.use-case';
import { CrearAlumnoCommand } from '../../../../application/use-cases/crear-alumno/crear-alumno.command';
import { ModificarAlumnoUseCase } from '../../../../application/use-cases/modificar-alumno/modificar-alumno.use-case';
import { ModificarAlumnoCommand } from '../../../../application/use-cases/modificar-alumno/modificar-alumno.command';
import { EliminarAlumnoUseCase } from '../../../../application/use-cases/eliminar-alumno/eliminar-alumno.use-case';
import { EliminarAlumnoCommand } from '../../../../application/use-cases/eliminar-alumno/eliminar-alumno.command';
import { ObtenerAlumnoUseCase } from '../../../../application/use-cases/obtener-alumno/obtener-alumno.use-case';
import { ObtenerAlumnoCommand } from '../../../../application/use-cases/obtener-alumno/obtener-alumno.command';
import { ListarAlumnosUseCase } from '../../../../application/use-cases/listar-alumnos/listar-alumnos.use-case';
import { ListarAlumnosCommand } from '../../../../application/use-cases/listar-alumnos/listar-alumnos.command';

// DTOs y Responses
import { CrearAlumnoDto } from './dtos/crear-alumno.dto';
import { ModificarAlumnoDto } from './dtos/modificar-alumno.dto';
import { ListarAlumnosQueryDto } from './dtos/listar-alumnos-query.dto';
import { AlumnoResponse } from '../../../../application/responses/alumno.response';

@Controller('alumnos')
export class AlumnosController {
  constructor(
    private readonly crearAlumnoUseCase: CrearAlumnoUseCase,
    private readonly modificarAlumnoUseCase: ModificarAlumnoUseCase,
    private readonly eliminarAlumnoUseCase: EliminarAlumnoUseCase,
    private readonly obtenerAlumnoUseCase: ObtenerAlumnoUseCase,
    private readonly listarAlumnosUseCase: ListarAlumnosUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CrearAlumnoDto): Promise<AlumnoResponse> {
    const command = new CrearAlumnoCommand(
      dto.nombre,
      dto.apellido,
      dto.dni,
      dto.telefono,
      dto.correo,
      dto.contrasenia,
      dto.objetivos,
    );

    return this.crearAlumnoUseCase.execute(command);
  }

  @Get()
  async findAll(
    @Query() query: ListarAlumnosQueryDto,
  ): Promise<AlumnoResponse[]> {
    const command = new ListarAlumnosCommand(query.termino);
    return this.listarAlumnosUseCase.execute(command);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AlumnoResponse> {
    const command = new ObtenerAlumnoCommand(id);
    return this.obtenerAlumnoUseCase.execute(command);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: ModificarAlumnoDto,
  ): Promise<AlumnoResponse> {
    const command = new ModificarAlumnoCommand(
      id,
      dto.nombre,
      dto.apellido,
      dto.dni,
      dto.telefono,
      dto.correo,
      dto.contrasenia,
      dto.objetivos,
    );

    return this.modificarAlumnoUseCase.execute(command);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    const command = new EliminarAlumnoCommand(id);
    await this.eliminarAlumnoUseCase.execute(command);
  }
}
