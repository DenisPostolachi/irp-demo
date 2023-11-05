import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class HistoricalRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ length: 255 })
  prefix: string;

  @Column()
  asn: number;

  @Column()
  loss_from: number;

  @Column()
  loss_to: number;

  @Column()
  latency_from: number;

  @Column()
  latency_to: number;

  @Column({ length: 255 })
  type: string;
}
