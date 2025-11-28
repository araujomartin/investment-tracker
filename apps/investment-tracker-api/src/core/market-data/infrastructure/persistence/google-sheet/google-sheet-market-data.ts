import { Injectable } from '@nestjs/common';
import type { TickerSlug } from 'src/core/assets/domain/repositories/ticker.model';
import { MarketDataRepository } from 'src/core/market-data/domain/repositories/market-data.repository';
import { GoogleSheetMarketDataService } from '../../services/google-sheet-market-data.service';

@Injectable()
export class GoogleSheetMarketData implements MarketDataRepository {
  constructor(private readonly sheetService: GoogleSheetMarketDataService) {}

  async getAssetValue(ticker: TickerSlug) {
    return this.sheetService.fetchPrice(ticker);
  }
}
