import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsPositive,
  IsDate,
} from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  ticker: string;

  @IsEnum(['BUY', 'SELL'])
  transactionType: 'BUY' | 'SELL';

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  pricePerShareArs: number;

  @IsNumber()
  @IsPositive()
  usdArsRate: number;

  @Type(() => Date)
  @IsDate()
  transactionDate: Date; // ✅ Tipo Date
}
