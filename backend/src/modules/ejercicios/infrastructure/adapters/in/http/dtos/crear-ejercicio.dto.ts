import { IsEnum } from 'class-validator/types/decorator/typechecker/IsEnum';
import { IsNotEmpty } from 'class-validator/types/decorator/common/IsNotEmpty';
import { MaxLength } from 'class-validator/types/decorator/string/MaxLength';
import { IsString } from 'class-validator/types/decorator/typechecker/IsString';
import { IsArray } from 'class-validator/types/decorator/typechecker/IsArray';
import { IsOptional } from 'class-validator';
import { GrupoMuscular } from 'src/shared/domain/enums/grupo-muscular.enum';
import { TipoEjercicio } from 'src/shared/domain/enums/tipo-ejercicio.enum';

export class CrearEjercicioDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MaxLength(150, { message: 'El nombre no puede exceder los 150 caracteres.' })
  nombre!: string;

  @IsNotEmpty({ message: 'El tipo de ejercicio es obligatorio.' })
  @IsEnum(TipoEjercicio, { message: 'El tipo de ejercicio no es válido.' })
  tipoEjercicio!: TipoEjercicio;

  @IsNotEmpty({ message: 'Los grupos musculares son obligatorios.' })
  @IsEnum(GrupoMuscular, { each: true, message: 'Uno o más grupos musculares no son válidos.' })
  gruposMusculares!: GrupoMuscular[];

  @IsOptional()
  @IsString({ message: 'La observación debe ser una cadena de texto.' })
  @MaxLength(500, { message: 'La observación no puede exceder los 500 caracteres.' })
  observacion?: string;

  @IsOptional()
  @IsString({ message: 'La URL de la imagen debe ser una cadena de texto.' })
  imagenUrl?: string;
}
