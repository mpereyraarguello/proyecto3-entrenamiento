import { IsEnum, IsOptional, IsString } from 'class-validator';
import { GrupoMuscular } from 'src/shared/domain/enums/grupo-muscular.enum';
import { TipoEjercicio } from 'src/shared/domain/enums/tipo-ejercicio.enum';


export class BuscarEjercicioDto {
  @IsOptional()
  @IsString()
  termino?: string;

  @IsOptional()
  @IsEnum(TipoEjercicio)
  tipoEjercicio?: TipoEjercicio;

  @IsOptional()
  @IsEnum(GrupoMuscular)
  grupoMuscular?: GrupoMuscular;
}
