import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from 'src/user/user.decorator';

import { ValidationPipe } from '../shared/validation.pipe';
import { TransactionDTO } from './transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('api/transactions')
export class TransactionController {
  private logger = new Logger('TransactionController');

  constructor(private transactionServive: TransactionService) {}

  private logData(options: any) {
    options.user && this.logger.log(`USER ${JSON.stringify(options.user)}`);
    options.data && this.logger.log(`DATA ${JSON.stringify(options.data)}`);
    options.id && this.logger.log(`TRANSACTION ${JSON.stringify(options.id)}`);
  }

  @Get()
  showAllTransactions() {
    return this.transactionServive.showAll();
  }

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createTransaction(@User('id') user: string, @Body() data: TransactionDTO) {
    this.logData({ user, data });
    return this.transactionServive.create(user, data);
  }

  @Get(':id')
  readTransaction(@Param('id') id: string) {
    return this.transactionServive.read(id);
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  updateTransaction(
    @Param('id') id: string,
    @User('id') user: string,
    @Body() data: Partial<TransactionDTO>,
  ) {
    this.logData({ id, user, data });
    return this.transactionServive.update(id, user, data);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  destroyTransaction(@Param('id') id: string, @User('id') user: string) {
    this.logData({ id, user });
    return this.transactionServive.destroy(id, user);
  }
}
