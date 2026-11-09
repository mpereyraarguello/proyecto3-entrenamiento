import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { RutinaOrmEntity } from './rutina.orm-entity';

@Entity('items_rutina')
export class ItemRutinaOrmEntity {
  @PrimaryColumn('varchar', { length: 36 })
  id: string;

  @Column('varchar', { length: 36 })
  ejercicioId: string;

  @Column('varchar', { length: 50 })
  tipo: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  pesoInicialRecomendado: number | null;

  @Column('text', { nullable: true })
  observacion: string | null;

  @Column('int', { nullable: true })
  series: number | null;

  @Column('int', { nullable: true })
  repeticiones: number | null;

  @Column('int')
  orden: number;

  @ManyToOne(() => RutinaOrmEntity, (rutina) => rutina.items, {
    onDelete: 'CASCADE',
  })
  rutina: RutinaOrmEntity;

  @Column('varchar', { length: 36 })
  rutinaId: string;
}