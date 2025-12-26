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
        id: 'f07cd0ba-348b-4a7f-9749-f2bd1be2844e',
        ticker: 'PG',
        name: 'Procter & Gamble',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 15,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: '2b5a4032-57f4-4e17-b93e-aa7b4ac04fe3',
        ticker: 'KO',
        name: 'Coca-Cola',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 5,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: 'fb9d3003-099c-4da4-8857-5fb5c070d3a8',
        ticker: 'DE',
        name: 'Deere & Company',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 40,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: '4b112114-d887-4381-b481-d2767d3bd89f',
        ticker: 'CRM',
        name: 'Salesforce',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 18,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: '75c99e81-3c20-45d7-8399-fcded43835d7',
        ticker: 'META',
        name: 'Meta Platforms',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 24,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: '9f19e620-12ca-4727-bd7d-f5ace944a09f',
        ticker: 'V',
        name: 'Visa',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 18,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: 'edef0723-ed3b-4fcb-b8b9-2fabcc5e9724',
        ticker: 'MCD',
        name: "McDonald's",
        assetType: AssetTypeKey.CEDEARS,
        ratio: 24,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: 'b6ac0240-02f3-4f5d-be30-470d5d0447b8',
        ticker: 'NKE',
        name: 'Nike',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 12,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: '42ec99e7-472c-4213-b095-5271b39e6b4c',
        ticker: 'PFE',
        name: 'Pfizer',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 4,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: '2f0ab02a-8d5e-41f4-ae55-45502014a6cc',
        ticker: 'PBR',
        name: 'Petrobras',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 1,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: 'dff8e9df-3796-43e4-a5ad-e5f76552bbf2',
        ticker: 'DIS',
        name: 'Disney',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 12,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: '530e1d9b-38c6-48c1-a30a-333e3de32aad',
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
