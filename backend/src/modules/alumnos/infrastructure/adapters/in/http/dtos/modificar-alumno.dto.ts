import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ObjetivoAlumno } from '../../../../../domain/enums/objetivo-alumno.enum';

export class ModificarAlumnoDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MaxLength(50, { message: 'El nombre no puede superar los 50 caracteres.' })
  nombre!: string;

  @IsNotEmpty({ message: 'El apellido es obligatorio.' })
  @IsString({ message: 'El apellido debe ser una cadena de texto.' })
  @MaxLength(50, { message: 'El apellido no puede superar los 50 caracteres.' })
  apellido!: string;

  @IsNotEmpty({ message: 'El DNI es obligatorio.' })
  @IsString({ message: 'El DNI debe ser una cadena de texto.' })
  @Matches(/^\d{7,8}$/, {
    message: 'El DNI debe tener 7 u 8 dígitos numéricos.',
  })
  dni!: string;

  @IsNotEmpty({ message: 'El teléfono es obligatorio.' })
  @IsString({ message: 'El teléfono debe ser una cadena de texto.' })
  @Matches(/^[\d\s+\-()]{7,20}$/, {
    message: 'Ingresá un número de teléfono válido (entre 7 y 20 caracteres).',
  })
  telefono!: string;

  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  @IsEmail({}, { message: 'Ingresá un correo electrónico válido.' })
  @MaxLength(100, {
    message: 'El correo electrónico no puede superar los 100 caracteres.',
  })
  correo!: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @MinLength(6, {
    message: 'La contraseña debe tener al menos 6 caracteres.',
  })
  @MaxLength(64, {
    message: 'La contraseña no puede superar los 64 caracteres.',
  })
  contrasenia!: string;

  @IsArray({ message: 'Los objetivos deben enviarse como una lista.' })
  @ArrayMinSize(1, { message: 'Seleccioná al menos un objetivo.' })
  @IsEnum(ObjetivoAlumno, {
    each: true,
    message: 'Uno o más objetivos seleccionados no son válidos.',
  })
  objetivos!: ObjetivoAlumno[];
}
