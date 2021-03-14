import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionDTO } from './transaction.dto';
import { TransactionEntity } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
  ) {}

  async showAll() {
    return await this.transactionRepository.find();
  }

  async create(data: TransactionDTO) {
    const transaction = await this.transactionRepository.create(data);

    await this.transactionRepository.save(transaction);
    return transaction;
  }

  async read(id: string) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!transaction) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return transaction;
  }

  async update(id: string, data: Partial<TransactionDTO>) {
    let transaction = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!transaction) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await this.transactionRepository.update({ id }, data);
    transaction = await this.transactionRepository.findOne({
      where: { id },
    });
    return transaction;
  }

  async destroy(id: string) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!transaction) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await this.transactionRepository.delete({ id });
    return transaction;
  }
}
