import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { UserRO } from '../user/user.dto';

export class TransactionDTO {
  @IsString()
  label: string;

  @IsNumber()
  amount: number;

  @IsBoolean()
  income: boolean;
}

export class TransactionRO {
  id?: string;
  updatedAt: Date;
  createdAt: Date;
  label: string;
  amount: number;
  income: boolean;
  owner: UserRO;
}
