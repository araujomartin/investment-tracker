import { AssetType, AssetTypeKey } from '../models/asset-type.model';
import { TickerSlug } from '../repositories/ticker.model';

export class Asset {
  id?: string;
  ticker: TickerSlug;
  name: string;
  assetType: AssetType;
  ratio: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(props: {
    id?: string;
    ticker: string;
    name: string;
    assetType: AssetType;
    ratio: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }) {
    Object.assign(this, props);
  }

  isDeleted(): boolean {
    return !!this.deletedAt;
  }

  isCedear(): boolean {
    return this.assetType === AssetTypeKey.CEDEARS;
  }

  isAction(): boolean {
    return this.assetType === AssetTypeKey.ACTION;
  }

  isCrypto(): boolean {
    return this.assetType === AssetTypeKey.CRYPTO;
  }

  isFixedDeposit(): boolean {
    return this.assetType === AssetTypeKey.FIAT;
  }
}
