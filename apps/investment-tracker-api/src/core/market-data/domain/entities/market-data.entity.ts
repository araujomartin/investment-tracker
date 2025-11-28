import { TickerSlug } from '../../../assets/domain/repositories/ticker.model';

export class MarketData {
  ticker: TickerSlug;
  priceInUsd: number;
  closePriceInUsd: number;
  lastUpdatedDate: Date;
  marketStatus: 'OPEN' | 'CLOSED';

  constructor(props: {
    ticker: TickerSlug;
    priceInUsd: number | null;
    closePriceInUsd: number;
    lastUpdatedDate: Date;
    marketStatus: 'OPEN' | 'CLOSED';
  }) {
    Object.assign(this, props);
  }

  isMarketOpen(): boolean {
    return this.marketStatus === 'OPEN';
  }

  getPrice(): number {
    return this.isMarketOpen() ? this.priceInUsd : this.closePriceInUsd;
  }
}
