import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';

import { TransactionDTO, TransactionRO } from './transaction.dto';
import { TransactionEntity } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private toResponseObject(transaction: TransactionEntity): TransactionRO {
    return { ...transaction, owner: transaction.owner.toResponseObject(false) };
  }

  private ensureOwnership(
    transaction: TransactionEntity,
    userId: string,
  ): void {
    if (transaction.owner.id !== userId) {
      throw new HttpException('Incorrect user', HttpStatus.UNAUTHORIZED);
    }
  }

  async showAll(): Promise<TransactionRO[]> {
    const transactions = await this.transactionRepository.find({
      relations: ['owner'],
    });

    return transactions.map((transaction) =>
      this.toResponseObject(transaction),
    );
  }

  async create(userId: string, data: TransactionDTO): Promise<TransactionRO> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const transaction = await this.transactionRepository.create({
      ...data,
      owner: user,
    });

    await this.transactionRepository.save(transaction);
    return this.toResponseObject(transaction);
  }

  async read(id: string): Promise<TransactionRO> {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!transaction) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.toResponseObject(transaction);
  }

  async update(
    id: string,
    userId: string,
    data: Partial<TransactionDTO>,
  ): Promise<TransactionRO> {
    let transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!transaction) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    this.ensureOwnership(transaction, userId);

    await this.transactionRepository.update({ id }, data);
    transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    return this.toResponseObject(transaction);
  }

  async destroy(id: string, userId: string) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!transaction) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    this.ensureOwnership(transaction, userId);

    await this.transactionRepository.delete({ id });
    return this.toResponseObject(transaction);
  }
}
