import type { AssetType } from '../../../../core/assets/domain/models/asset-type.model';

export class Transaction {
  id?: string;
  userId: string;
  assetId: string;
  ticker: string;
  quantity: number;
  pricePerShareArs: number;
  usdArsRate: number;
  transactionType: 'BUY' | 'SELL' | 'SPLIT';
  transactionDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  assetRatio: number;
  assetType: AssetType;

  constructor(props: {
    id?: string;
    userId: string;
    assetId: string;
    ticker: string;
    quantity: number;
    pricePerShareArs: number;
    usdArsRate: number;
    transactionType: 'BUY' | 'SELL' | 'SPLIT';
    transactionDate: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    assetRatio: number;
    assetType: AssetType;
  }) {
    Object.assign(this, props);
  }

  calculateTotalUsdCost(): number {
    return (this.quantity * this.pricePerShareArs) / this.usdArsRate;
  }

  isBuy(): boolean {
    return this.transactionType === 'BUY';
  }

  isSplit(): boolean {
    return this.transactionType === 'SPLIT';
  }

  isDeleted(): boolean {
    return !!this.deletedAt;
  }
}
