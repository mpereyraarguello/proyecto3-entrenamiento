import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { SesionEntrenamientoOrmEntity } from './sesion-entrenamiento.orm-entity';
import { SerieEjercicioOrmEntity } from './serie-ejercicio.orm-entity';

@Entity('ejercicios_sesion')
export class EjercicioSesionOrmEntity {
  @PrimaryColumn('varchar', { length: 36 })
  id: string;

  @ManyToOne(() => SesionEntrenamientoOrmEntity, (sesion) => sesion.ejercicios, {
    onDelete: 'CASCADE',
  })
  sesion: SesionEntrenamientoOrmEntity;

  @Column('varchar', { length: 36 })
  sesionId: string;

  @Column('varchar', { length: 36 })
  ejercicioId: string;

  @Column('varchar', { length: 150 })
  nombre: string;

  @Column('varchar', { length: 50 })
  tipo: string;

  @Column('int')
  orden: number;

  @Column('int')
  seriesPlanificadas: number;

  @Column('int')
  repeticionesPlanificadas: number;

  @Column('int')
  rirPlanificado: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  pesoAnterior: number | null;

  @Column('int', { nullable: true })
  repeticionesAnteriores: number | null;

  @Column('boolean', { default: false })
  completado: boolean;

  @OneToMany(() => SerieEjercicioOrmEntity, (s) => s.ejercicioSesion, {
    cascade: true,
    eager: true,
  })
  series: SerieEjercicioOrmEntity[];
}

