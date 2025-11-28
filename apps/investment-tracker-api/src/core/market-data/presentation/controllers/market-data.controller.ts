import { Controller, Get, Param, Query } from '@nestjs/common';
import type { TickerSlug } from '../../../assets/domain/repositories/ticker.model';
import type { AssetType } from '../../../assets/domain/models/asset-type.model';
import { MarketData } from '../../domain/entities/market-data.entity';
import { MarketDataUseCase } from '../../application/use-cases/market-data-use-case.service';

@Controller('market-data')
export class MarketDataController {
  constructor(private readonly MarketPriceUseCase: MarketDataUseCase) {}

  @Get(':ticker')
  async getAssetPrice(
    @Param('ticker') ticker: TickerSlug,
    @Query('assetType') assetType: AssetType,
  ): Promise<MarketData | null> {
    return await this.MarketPriceUseCase.getAssetPrice(ticker, assetType);
  }
}
