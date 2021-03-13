import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { TransactionDTO } from './transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionServive: TransactionService) {}

  @Get()
  showAllTransactions() {
    return this.transactionServive.showAll();
  }

  @Post()
  createTransaction(@Body() data: TransactionDTO) {
    return this.transactionServive.create(data);
  }

  @Get(':id')
  readTransaction(@Param('id') id: string) {
    return this.transactionServive.read(id);
  }

  @Put(':id')
  updateTransaction(
    @Param('id') id: string,
    @Body() data: Partial<TransactionDTO>,
  ) {
    return this.transactionServive.update(id, data);
  }

  @Delete(':id')
  destroyTransaction(@Param('id') id: string) {
    return this.transactionServive.destroy(id);
  }
}
