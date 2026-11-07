import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { PlanEntrenamientoOrmEntity } from './plan-entrenamiento.orm-entity';
import { ItemRutinaOrmEntity } from './item-rutina.orm-entity';

@Entity('rutinas')
export class RutinaOrmEntity {
  @PrimaryColumn('varchar', { length: 36 })
  id: string;

  @Column('int')
  numero: number;

  @ManyToOne(() => PlanEntrenamientoOrmEntity, (plan) => plan.rutinas, {
    onDelete: 'CASCADE',
  })
  plan: PlanEntrenamientoOrmEntity;

  @Column('varchar', { length: 36 })
  planId: string;

  @OneToMany(() => ItemRutinaOrmEntity, (item) => item.rutina, {
    cascade: true,
    eager: true, // Cargamos los items automáticamente al traer la rutina
  })
  items: ItemRutinaOrmEntity[];
}