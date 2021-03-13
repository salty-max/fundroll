import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('transaction')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('text')
  label: string;

  @Column('int')
  amount: number;

  @Column('bool')
  income: boolean;
}
