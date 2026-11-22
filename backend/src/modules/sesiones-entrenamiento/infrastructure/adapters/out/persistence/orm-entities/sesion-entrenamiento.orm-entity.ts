import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { EjercicioSesionOrmEntity } from './ejercicio-sesion.orm-entity';

@Entity('sesiones_entrenamiento')
export class SesionEntrenamientoOrmEntity {
  @PrimaryColumn('varchar', { length: 36 })
  id: string;

  @Column('varchar', { length: 36 })
  alumnoId: string;

  @Column('varchar', { length: 36 })
  planId: string;

  @Column('varchar', { length: 36 })
  rutinaId: string;

  @Column('int')
  rutinaNumero: number;

  @Column('int')
  semana: number;

  @Column('varchar', { length: 20 })
  estado: string;

  @Column('datetime')
  fechaInicio: Date;

  @Column('datetime', { nullable: true })
  fechaFin: Date | null;

  @Column('boolean', { default: false })
  bloqueCalentamientoCompletado: boolean;

  @Column('boolean', { nullable: true, default: null })
  bloqueCardioCompletado: boolean | null;

  @Column('boolean', { default: false })
  bloqueEstiramientoCompletado: boolean;

  @OneToMany(() => EjercicioSesionOrmEntity, (ej) => ej.sesion, {
    cascade: true,
    eager: true,
  })
  ejercicios: EjercicioSesionOrmEntity[];
}

