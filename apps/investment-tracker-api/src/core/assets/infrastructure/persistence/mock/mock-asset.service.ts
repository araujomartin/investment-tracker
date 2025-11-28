import { Injectable } from '@nestjs/common';
import { AssetRepository } from '../../../domain/repositories/asset.repository';
import { Asset } from '../../../domain/entities/asset.entity';
import { AssetTypeKey } from '../../../domain/models/asset-type.model';

@Injectable()
export class MockAssetService extends AssetRepository {
  private assets: Asset[] = [];

  constructor() {
    super();
    this.initializeMockData();
  }

  private initializeMockData(): void {
    const now = new Date();
    this.assets = [
      new Asset({
        id: '1',
        ticker: 'PG',
        name: 'Procter & Gamble',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 15,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: '2',
        ticker: 'KO',
        name: 'Coca-Cola',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 5,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: '3',
        ticker: 'DE',
        name: 'Deere & Company',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 40,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: '4',
        ticker: 'CRM',
        name: 'Salesforce',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 18,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: '5',
        ticker: 'META',
        name: 'Meta Platforms',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 24,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: '6',
        ticker: 'V',
        name: 'Visa',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 18,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: '7',
        ticker: 'MCD',
        name: "McDonald's",
        assetType: AssetTypeKey.CEDEARS,
        ratio: 24,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: '8',
        ticker: 'NKE',
        name: 'Nike',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 12,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: '9',
        ticker: 'PFE',
        name: 'Pfizer',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 4,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: '10',
        ticker: 'PBR',
        name: 'Petrobras',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 1,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: '11',
        ticker: 'DIS',
        name: 'Disney',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 12,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: '12',
        ticker: 'MSFT',
        name: 'Microsoft',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 30,
        createdAt: now,
        updatedAt: now,
      }),
    ];
  }

  async findById(id: string): Promise<Asset | null> {
    return Promise.resolve(
      this.assets.find((asset) => asset.id === id) || null,
    );
  }

  async findByTicker(ticker: string): Promise<Asset | null> {
    return Promise.resolve(
      this.assets.find((asset) => asset.ticker === ticker) || null,
    );
  }

  async findAll(): Promise<Asset[]> {
    return Promise.resolve(this.assets);
  }
}
