import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TipoBloqueSesion } from '../../../../../domain/enums/tipo-bloque-sesion.enum';

export class MarcarBloqueSesionDto {
  @IsNotEmpty({ message: 'El alumnoId es obligatorio.' })
  @IsString({ message: 'El alumnoId debe ser una cadena de texto.' })
  alumnoId: string;

  @IsNotEmpty({ message: 'El bloque es obligatorio.' })
  @IsEnum(TipoBloqueSesion, {
    message: 'El bloque debe ser CALENTAMIENTO, CARDIO o ESTIRAMIENTO.',
  })
  bloque: TipoBloqueSesion;

  @IsBoolean({ message: 'El campo completado debe ser booleano.' })
  completado: boolean;
}
