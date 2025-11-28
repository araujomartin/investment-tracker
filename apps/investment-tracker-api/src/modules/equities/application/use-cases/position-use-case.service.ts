import { Injectable } from '@nestjs/common';
import { InvestmentPosition } from '../../domain/entities/position.entity';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { generateInvestmentPosition } from '../../domain/services/position-calculator';
import { MarketDataUseCase } from '../../../../core/market-data/application/use-cases/market-data-use-case.service';
import { AssetUseCase } from '../../../../core/assets/application/use-cases/asset-use-case.service';
import type { AssetType } from '../../../../core/assets/domain/models/asset-type.model';

@Injectable()
export class PositionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly marketDataUseCase: MarketDataUseCase,
    private readonly assetUseCase: AssetUseCase,
  ) {}

  async getUserPositions(userId: string): Promise<InvestmentPosition[]> {
    const transactions = await this.transactionRepository.findByUserId(userId);

    const tickersMap = new Map<
      string,
      { ticker: string; assetType: AssetType; price: number }
    >();
    transactions.forEach((t) => {
      if (!tickersMap.has(t.ticker)) {
        tickersMap.set(t.ticker, {
          ticker: t.ticker,
          assetType: t.assetType,
          price: 0,
        });
      }
    });

    const tickersPrice = Array.from(tickersMap.values());

    for (const tickerData of tickersPrice) {
      const marketData = await this.marketDataUseCase.getAssetPrice(
        tickerData.ticker,
        tickerData.assetType,
      );

      if (marketData) {
        tickerData.price = marketData.getPrice();
      }
    }

    const currentPrices = new Map<string, number>(
      tickersPrice.map((t) => [t.ticker, t.price]),
    );

    return generateInvestmentPosition(transactions, currentPrices);
  }
}
