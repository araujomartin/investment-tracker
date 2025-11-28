export class InvestmentPosition {
  userId: string;
  ticker: string;
  currentPriceUsd: number;
  averageBuyPriceUsd: number;
  quantity: number;
  assetRatio: number;
  totalInvestedUsd: number;
  totalValuedUsd: number;
  yieldPercentage: number;

  constructor(props: {
    userId: string;
    ticker: string;
    currentPriceUsd: number;
    averageBuyPriceUsd: number;
    quantity: number;
    ratio: number;
    totalInvestedUsd: number;
  }) {
    this.userId = props.userId;
    this.ticker = props.ticker;
    this.currentPriceUsd = props.currentPriceUsd;
    this.averageBuyPriceUsd = props.averageBuyPriceUsd;
    this.quantity = props.quantity;
    this.assetRatio = props.ratio;
    this.totalInvestedUsd = props.totalInvestedUsd;
    this.totalValuedUsd =
      (this.quantity / this.assetRatio) * this.currentPriceUsd;
    this.yieldPercentage = this.calculateYieldPercentage();
  }

  calculateYieldPercentage(): number {
    if (this.totalInvestedUsd === 0) return 0;
    const profitLoss = this.totalValuedUsd - this.totalInvestedUsd;
    return (profitLoss / this.totalInvestedUsd) * 100;
  }
}
