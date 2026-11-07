import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

// Use Cases
import { CrearPlanEntrenamientoUseCase } from '../../../../application/use-cases/crear-plan-entrenamiento.use-case.ts/crear-plan-entrenamiento.use-case';
import { CrearPlanEntrenamientoCommand } from '../../../../application/use-cases/crear-plan-entrenamiento.use-case.ts/crear-plan-entrenamiento.command';

// DTOs
import { CrearPlanEntrenamientoDto } from './dtos/crear-plan-entrenamiento.dto';
import { ObtenerPlanActivoQueryDto } from './dtos/obtener-plan-activo-query.dto';
import { ListarPlanesQueryDto } from './dtos/listar-planes-query.dto';

// Responses
import { PlanEntrenamientoResponse } from '../../../../application/responses/plan-entrenamiento.response';

// ⚠️ Importamos los Use Cases de lectura e inactivación que armaremos luego.
// Por ahora los dejo comentados para que puedas compilar solo con Crear.
// import { ObtenerPlanActivoAlumnoUseCase } from '../../../application/use-cases/obtener-plan-activo-alumno/obtener-plan-activo-alumno.use-case';
// import { InactivarPlanEntrenamientoUseCase } from '../../../application/use-cases/inactivar-plan-entrenamiento/inactivar-plan-entrenamiento.use-case';

@Controller('planes-entrenamiento')
export class PlanesEntrenamientoController {
  constructor(
    private readonly crearPlanUseCase: CrearPlanEntrenamientoUseCase,
    // private readonly obtenerActivoUseCase: ObtenerPlanActivoAlumnoUseCase,
    // private readonly inactivarUseCase: InactivarPlanEntrenamientoUseCase,
  ) {}

  // ─────────────────────────────────────────────────────────
  // POST /planes-entrenamiento
  // ─────────────────────────────────────────────────────────
  @Post()
  async create(
    @Body() dto: CrearPlanEntrenamientoDto,
  ): Promise<PlanEntrenamientoResponse> {
    // El controller convierte DTO → Command
    const command = new CrearPlanEntrenamientoCommand(
      dto.alumnoId,
      dto.objetivoId,
      dto.nombre,
      new Date(dto.fechaInicio), // conversión de string a Date
      dto.microPausa,
      dto.macroPausa,
      dto.rutinas.map((r) => ({
        items: r.items.map((i) => ({
          ejercicioId: i.ejercicioId,
          tipo: i.tipo,
          pesoInicialRecomendado: i.pesoInicialRecomendado ?? null,
          observacion: i.observacion ?? null,
        })),
      })),
      dto.calentamientoIds,
      dto.estiramientoIds,
      dto.cardioIds,
    );

    return this.crearPlanUseCase.execute(command);
  }

  // ─────────────────────────────────────────────────────────
  // GET /planes-entrenamiento/activo?alumnoId=...
  // ─────────────────────────────────────────────────────────
  // @Get('activo')
  // async findActivo(
  //   @Query() query: ObtenerPlanActivoQueryDto,
  // ): Promise<PlanEntrenamientoResponse | null> {
  //   return this.obtenerActivoUseCase.execute({ alumnoId: query.alumnoId });
  // }

  // ─────────────────────────────────────────────────────────
  // GET /planes-entrenamiento?alumnoId=...
  // ─────────────────────────────────────────────────────────
  // @Get()
  // async findAll(
  //   @Query() query: ListarPlanesQueryDto,
  // ): Promise<PlanEntrenamientoResponse[]> {
  //   return this.listarPlanesUseCase.execute({ alumnoId: query.alumnoId });
  // }

  // ─────────────────────────────────────────────────────────
  // GET /planes-entrenamiento/:id
  // ─────────────────────────────────────────────────────────
  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<PlanEntrenamientoResponse> {
  //   return this.obtenerPlanUseCase.execute({ id });
  // }

  // ─────────────────────────────────────────────────────────
  // PATCH /planes-entrenamiento/:id/inactivar
  // ─────────────────────────────────────────────────────────
  // @Patch(':id/inactivar')
  // async update(@Param('id') id: string): Promise<void> {
  //   return this.inactivarUseCase.execute({ id });
  // }
}