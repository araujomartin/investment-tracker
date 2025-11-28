import { MarketData } from '../entities/market-data.entity';
import { TickerSlug } from 'src/core/assets/domain/repositories/ticker.model';
import type { AssetType } from 'src/core/assets/domain/models/asset-type.model';

export abstract class MarketDataRepository {
  abstract getAssetValue(
    ticker: TickerSlug,
    assetType: AssetType,
  ): Promise<MarketData | null>;
}
