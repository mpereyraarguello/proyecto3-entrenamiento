import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RutinaOrmEntity } from './rutina.orm-entity';

@Entity('planes_entrenamiento')
export class PlanEntrenamientoOrmEntity {
  @PrimaryColumn('varchar', { length: 36 })
  id: string;

  @Column('varchar', { length: 36 })
  alumnoId: string;

  @Column('varchar', { length: 36 })
  objetivoId: string;

  @Column('varchar', { length: 150 })
  nombre: string;

  @Column('int')
  numeroPlan: number;

  @Column('datetime')
  fechaInicio: Date;

  @Column('datetime')
  fechaFin: Date;

  @Column('int')
  microPausaMinutos: number;

  @Column('int')
  microPausaSegundos: number;

  @Column('int')
  macroPausaMinutos: number;

  @Column('int')
  macroPausaSegundos: number;

  @Column('varchar', { length: 20 })
  estado: string;

  // Guardamos los IDs de plantilla-base como JSON (es un array de strings simple)
  @Column('json')
  calentamientoIds: string[];

  @Column('json')
  estiramientoIds: string[];

  @Column('json')
  cardioIds: string[];

  @OneToMany(() => RutinaOrmEntity, (rutina) => rutina.plan, {
    cascade: true,
    eager: true,
  })
  rutinas: RutinaOrmEntity[];
}