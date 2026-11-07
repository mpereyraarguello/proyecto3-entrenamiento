import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ejercicios')
export class EjercicioOrmEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 150, unique: true })
  nombre: string;

  @Column('varchar', { length: 50, name: 'tipo_ejercicio' })
  tipoEjercicio: string;

  @Column('simple-json', { name: 'grupos_musculares' })
  gruposMusculares: string[];

  @Column('text', { nullable: true })
  observacion: string | null;

  @Column('varchar', { length: 500, nullable: true, name: 'imagen_url' })
  imagenUrl: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
