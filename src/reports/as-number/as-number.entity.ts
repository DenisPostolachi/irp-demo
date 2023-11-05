import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  as_name: string;

  @Column()
  volume: number;

  @Column()
  asn: number;

  @Column()
  improvements: number;

  @Column()
  inbound: number;

  @Column()
  outbound: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
