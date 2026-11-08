import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ItemRutinaDto } from './item-rutina.dto';

export class RutinaDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemRutinaDto)
  items: ItemRutinaDto[];
}

class PausaDto {
  @IsNumber()
  @Min(0)
  minutos: number;

  @IsNumber()
  @Min(0)
  segundos: number;
}

export class CrearPlanEntrenamientoDto {
  @IsString()
  @IsNotEmpty()
  alumnoId: string;

  @IsString()
  @IsNotEmpty()
  objetivoId: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsDateString()
  fechaInicio: string; // llega como string ISO, el controller lo convierte a Date

  @ValidateNested()
  @Type(() => PausaDto)
  microPausa: PausaDto;

  @ValidateNested()
  @Type(() => PausaDto)
  macroPausa: PausaDto;

  @IsArray()
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  @ValidateNested({ each: true })
  @Type(() => RutinaDto)
  rutinas: RutinaDto[];

  @IsArray()
  @IsString({ each: true })
  calentamientoIds: string[];

  @IsArray()
  @IsString({ each: true })
  estiramientoIds: string[];

  @IsArray()
  @IsString({ each: true })
  cardioIds: string[];
}