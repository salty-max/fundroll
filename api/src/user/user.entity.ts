import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserRO } from './user.dto';
import { TransactionEntity } from 'src/transaction/transaction.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'text',
    unique: true,
  })
  username: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column('text')
  password: string;

  @OneToMany((type) => TransactionEntity, (transaction) => transaction.owner)
  transactions: TransactionEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showtoken = true): UserRO {
    const { id, createdAt, username, email, token } = this;
    const responseObject: any = { id, createdAt, username, email };

    if (showtoken) {
      responseObject.token = token;
    }

    if (this.transactions) {
      responseObject.transactions = this.transactions;
    }

    return responseObject;
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  private get token() {
    const { id, username, email } = this;
    return jwt.sign({ id, username, email }, process.env.SECRET, {
      expiresIn: '7d',
    });
  }
}
