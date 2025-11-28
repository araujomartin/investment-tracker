import { Injectable } from '@nestjs/common';
import { TickerSlug } from 'src/core/assets/domain/repositories/ticker.model';
import { MarketData } from 'src/core/market-data/domain/entities/market-data.entity';
import { MarketDataRepository } from 'src/core/market-data/domain/repositories/market-data.repository';

const MOCK_PRICES: Record<
  string,
  {
    priceInUsd: number;
    closePriceInUsd: number;
    lastUpdatedDate: string;
    marketStatus: 'OPEN' | 'CLOSED';
  }
> = {
  AAPL: {
    priceInUsd: 180.5,
    closePriceInUsd: 179.8,
    lastUpdatedDate: '2025-11-19T15:30:00Z',
    marketStatus: 'OPEN',
  },
  KO: {
    priceInUsd: 70.2,
    closePriceInUsd: 70.0,
    lastUpdatedDate: '2025-11-19T15:30:00Z',
    marketStatus: 'OPEN',
  },
  MSFT: {
    priceInUsd: 370.1,
    closePriceInUsd: 369.5,
    lastUpdatedDate: '2025-11-19T15:30:00Z',
    marketStatus: 'OPEN',
  },
};

@Injectable()
export class MockMarketDataService implements MarketDataRepository {
  async getAssetValue(ticker: TickerSlug): Promise<MarketData | null> {
    const data = MOCK_PRICES[ticker.toUpperCase()];
    if (!data) return Promise.resolve(null);
    return Promise.resolve(
      new MarketData({
        ticker,
        priceInUsd: data.priceInUsd,
        closePriceInUsd: data.closePriceInUsd,
        lastUpdatedDate: new Date(data.lastUpdatedDate),
        marketStatus: data.marketStatus,
      }),
    );
  }
}
