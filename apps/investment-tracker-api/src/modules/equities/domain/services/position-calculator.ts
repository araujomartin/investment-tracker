import { InvestmentPosition } from '../entities/position.entity';
import { Transaction } from '../entities/transaction.entity';
import { TickerSlug } from '../../../../core/assets/domain/repositories/ticker.model';
import { PositionAccumulator } from '../models/position-accumulator.model';

export function generateInvestmentPosition(
  transactions: Transaction[],
  currentPrices: Map<TickerSlug, number>,
): InvestmentPosition[] {
  const sortedTxs = transactions;

  const positionsByTicker = new Map<TickerSlug, PositionAccumulator>();

  for (const tx of sortedTxs) {
    const currentTickerPosition = positionsByTicker.get(tx.ticker) || {
      quantity: 0,
      totalCostUsd: 0,
      totalSharePriceSum: 0,
      buyCount: 0,
    };

    const ratio = tx.assetRatio || 1;
    const sharePriceAtPurchase =
      tx.calculateTotalUsdCost() / (tx.quantity / ratio);

    if (tx.isBuy()) {
      currentTickerPosition.quantity += tx.quantity;
      currentTickerPosition.totalCostUsd += tx.calculateTotalUsdCost();
      currentTickerPosition.totalSharePriceSum += sharePriceAtPurchase;
      currentTickerPosition.buyCount += 1;
    } else if (tx.isSplit()) {
      currentTickerPosition.quantity += tx.quantity;
    } else {
      const soldQuantity = tx.quantity;
      const remainingQuantity = currentTickerPosition.quantity - soldQuantity;

      if (remainingQuantity <= 0) {
        currentTickerPosition.quantity = 0;
        currentTickerPosition.totalCostUsd = 0;
        currentTickerPosition.totalSharePriceSum = 0;
        currentTickerPosition.buyCount = 0;
      } else {
        const percentageRemaining =
          remainingQuantity / currentTickerPosition.quantity;
        currentTickerPosition.quantity = remainingQuantity;
        currentTickerPosition.totalCostUsd =
          currentTickerPosition.totalCostUsd * percentageRemaining;
      }
    }

    positionsByTicker.set(tx.ticker, currentTickerPosition);
  }

  const positions: InvestmentPosition[] = [];

  for (const [ticker, position] of positionsByTicker.entries()) {
    if (position.quantity > 0) {
      const currentSharePrice = currentPrices.get(ticker) || 0;
      const lastTxForTicker = sortedTxs
        .filter((t) => t.ticker === ticker)
        .pop();
      const ratio = lastTxForTicker!.assetRatio;

      const averageSharePrice =
        position.buyCount > 0
          ? position.totalSharePriceSum / position.buyCount
          : 0;

      positions.push(
        new InvestmentPosition({
          userId: transactions[0]?.userId || '',
          ticker,
          currentPriceUsd: currentSharePrice,
          averageBuyPriceUsd: averageSharePrice,
          quantity: position.quantity,
          ratio: ratio,
          totalInvestedUsd: position.totalCostUsd,
        }),
      );
    }
  }

  return positions;
}
