import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MarketDataRepository } from './domain/repositories/market-data.repository';
import { MarketDataUseCase } from './application/use-cases/market-data-use-case.service';
import { MarketDataController } from './presentation/controllers/market-data.controller';
import { GoogleSheetMarketDataService } from './infrastructure/services/google-sheet-market-data.service';
import { GoogleSheetMarketData } from './infrastructure/persistence/google-sheet/google-sheet-market-data';

@Module({
  imports: [HttpModule],
  controllers: [MarketDataController],
  providers: [
    MarketDataUseCase,
    GoogleSheetMarketDataService,
    {
      provide: MarketDataRepository,
      useClass: GoogleSheetMarketData,
    },
  ],
  exports: [MarketDataRepository, MarketDataUseCase],
})
export class MarketDataModule {}
