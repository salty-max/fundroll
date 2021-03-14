import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';

import { ValidationPipe } from '../shared/validation.pipe';
import { TransactionDTO } from './transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('api/transactions')
export class TransactionController {
  private logger = new Logger('TransactionController');

  constructor(private transactionServive: TransactionService) {}

  @Get()
  showAllTransactions() {
    return this.transactionServive.showAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createTransaction(@Body() data: TransactionDTO) {
    this.logger.log(JSON.stringify(data));
    return this.transactionServive.create(data);
  }

  @Get(':id')
  readTransaction(@Param('id') id: string) {
    return this.transactionServive.read(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateTransaction(
    @Param('id') id: string,
    @Body() data: Partial<TransactionDTO>,
  ) {
    this.logger.log(JSON.stringify(data));
    return this.transactionServive.update(id, data);
  }

  @Delete(':id')
  destroyTransaction(@Param('id') id: string) {
    return this.transactionServive.destroy(id);
  }
}
