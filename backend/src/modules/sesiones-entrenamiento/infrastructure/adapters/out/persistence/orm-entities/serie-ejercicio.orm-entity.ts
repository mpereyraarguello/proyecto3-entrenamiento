import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { EjercicioSesionOrmEntity } from './ejercicio-sesion.orm-entity';

@Entity('series_ejercicio_sesion')
export class SerieEjercicioOrmEntity {
  // El id se compone como `<uuid del ejercicio de sesión>_s<número de serie>`
  @PrimaryColumn('varchar', { length: 50 })
  id: string;

  @ManyToOne(() => EjercicioSesionOrmEntity, (ej) => ej.series, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  ejercicioSesion: EjercicioSesionOrmEntity;

  @Column('varchar', { length: 36 })
  ejercicioSesionId: string;

  @Column('int')
  numeroSerie: number;

  @Column('decimal', { precision: 10, scale: 2 })
  peso: number;

  @Column('int')
  repeticiones: number;
}

