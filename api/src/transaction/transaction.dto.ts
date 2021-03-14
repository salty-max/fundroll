import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class TransactionDTO {
  @IsString()
  label: string;

  @IsNumber()
  amount: number;

  @IsBoolean()
  income: boolean;
}
