import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTransactionDto } from '../../application/dto/create-transaction.dto';
import { TransactionUseCase } from '../../application/use-cases/transaction-use-case.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionUseCases: TransactionUseCase) {}

  @Get()
  findAll() {
    return this.transactionUseCases.findAllTransactionsByUserId('1');
  }

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionUseCases.createTransaction(
      '1',
      createTransactionDto,
    );
  }
}
