import { Injectable } from '@nestjs/common';
import { MarketData } from '../../domain/entities/market-data.entity';
import { MarketDataRepository } from '../../domain/repositories/market-data.repository';
import { TickerSlug } from '../../../assets/domain/repositories/ticker.model';
import type { AssetType } from '../../../assets/domain/models/asset-type.model';

@Injectable()
export class MarketDataUseCase {
  constructor(private readonly marketDataRepository: MarketDataRepository) {}

  async getAssetPrice(
    ticker: TickerSlug,
    assetType: AssetType,
  ): Promise<MarketData | null> {
    return this.marketDataRepository.getAssetValue(ticker, assetType);
  }
}
