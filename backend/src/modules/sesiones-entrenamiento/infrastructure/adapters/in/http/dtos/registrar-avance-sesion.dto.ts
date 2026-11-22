import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SerieDto {
  @IsInt({ message: 'El número de serie debe ser un número entero.' })
  @Min(1, { message: 'El número de serie debe ser mayor o igual a 1.' })
  numeroSerie: number;

  @IsNotEmpty({ message: 'El peso es obligatorio.' })
  peso: number | string;

  @IsNotEmpty({ message: 'Las repeticiones son obligatorias.' })
  repeticiones: number | string;
}

export class RegistroEjercicioDto {
  @IsNotEmpty({ message: 'El ejercicioId es obligatorio.' })
  @IsString({ message: 'El ejercicioId debe ser una cadena de texto.' })
  ejercicioId: string;

  @IsArray({ message: 'Las series deben ser un arreglo.' })
  @ValidateNested({ each: true })
  @Type(() => SerieDto)
  series: SerieDto[];
}

export class BloquesDto {
  @IsOptional()
  @IsBoolean({ message: 'calentamientoCompletado debe ser booleano.' })
  calentamientoCompletado?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'cardioCompletado debe ser booleano.' })
  cardioCompletado?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'estiramientoCompletado debe ser booleano.' })
  estiramientoCompletado?: boolean;
}

export class RegistrarAvanceSesionDto {
  @IsNotEmpty({ message: 'El alumnoId es obligatorio.' })
  @IsString({ message: 'El alumnoId debe ser una cadena de texto.' })
  alumnoId: string;

  @IsArray({ message: 'Los registros deben ser un arreglo.' })
  @ValidateNested({ each: true })
  @Type(() => RegistroEjercicioDto)
  registros: RegistroEjercicioDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => BloquesDto)
  bloques?: BloquesDto;
}

