import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'dummy' })
export class DummyEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'value', type: 'text', nullable: false })
  value: string;
}
