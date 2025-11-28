import { Module } from '@nestjs/common';
import { MockTransactionService } from './infrastructure/persistence/mock/mock-transaction.service';
import { TransactionRepository } from './domain/repositories/transaction.repository';
import { TransactionController } from './presentation/controllers/transaction.controller';
import { TransactionUseCase } from './application/use-cases/transaction-use-case.service';
import { PositionUseCase } from './application/use-cases/position-use-case.service';
import { PositionController } from './presentation/controllers/position.controller';
import { AssetsModule } from '../../core/assets/assets.module';
import { MarketDataModule } from '../../core/market-data/market-data.module';

@Module({
  providers: [
    {
      provide: TransactionRepository,
      useClass: MockTransactionService,
    },
    TransactionUseCase,
    PositionUseCase,
  ],
  controllers: [TransactionController, PositionController],
  imports: [AssetsModule, MarketDataModule],
})
export class EquityModule {}
