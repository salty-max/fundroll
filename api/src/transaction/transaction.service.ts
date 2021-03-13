import { Injectable } from '@nestjs/common';
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
    return await this.transactionRepository.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<TransactionDTO>) {
    await this.transactionRepository.update({ id }, data);
    return await this.transactionRepository.findOne({ where: { id } });
  }

  async destroy(id: string) {
    await this.transactionRepository.delete({ id });
    return { deleted: true };
  }
}
