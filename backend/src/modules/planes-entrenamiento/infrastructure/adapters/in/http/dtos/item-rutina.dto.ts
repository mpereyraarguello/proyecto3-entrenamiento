import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { TipoEjercicio } from '../../../../../../../shared/domain/enums/tipo-ejercicio.enum';

export class ItemRutinaDto {
  @IsString()
  @IsNotEmpty()
  ejercicioId: string;

  @IsEnum(TipoEjercicio)
  tipo: TipoEjercicio;

  @IsNumber()
  @Min(0)
  @IsOptional()
  pesoInicialRecomendado?: number;

  @IsString()
  @IsOptional()
  observacion?: string;
}