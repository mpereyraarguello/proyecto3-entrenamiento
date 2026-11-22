import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('alumnos')
export class AlumnoOrmEntity {
  @PrimaryColumn('varchar', { length: 36 })
  id!: string;

  @Column('varchar', { length: 50 })
  nombre!: string;

  @Column('varchar', { length: 50 })
  apellido!: string;

  @Column('varchar', { length: 8, unique: true })
  dni!: string;

  @Column('varchar', { length: 20 })
  telefono!: string;

  @Column('varchar', { length: 100, unique: true })
  correo!: string;

  @Column('varchar', { length: 100 })
  contrasenia!: string;

  @Column('simple-json')
  objetivos!: string[];

  @Column('boolean', { default: true })
  activo!: boolean;

  @Column('datetime', { name: 'creado_en' })
  creadoEn!: Date;

  @Column('datetime', { name: 'actualizado_en', nullable: true })
  actualizadoEn!: Date | null;

  @Column('datetime', { name: 'baja_en', nullable: true })
  bajaEn!: Date | null;
}
