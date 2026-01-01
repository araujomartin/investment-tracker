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
        id: '530e1d9b-38c6-48c1-a30a-333e3de32aad',
        ticker: 'MSFT',
        name: 'Microsoft',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 30,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: '8b2018f5-1e3a-4638-bccf-6d7e8c40eeb4',
        ticker: 'GGAL',
        name: 'Grupo Financiero Galicia',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 10,
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
        id: '34dbf4b3-5edb-4d4a-b2d5-f343252eb8cb',
        ticker: 'EWZ',
        name: 'iShares MSCI Brazil ETF',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 10,
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
        id: 'ced27b37-221c-48d4-9df0-848db3ec0abf',
        ticker: 'AAPL',
        name: 'Apple',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 10,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: '52fcbe7e-5a13-4626-8320-f290fae25281',
        ticker: 'AMD',
        name: 'AMD',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 10,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: 'baed9b86-2e9f-422e-a1cf-bca46d59172b',
        ticker: 'LOMA',
        name: 'Loma Negra',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 10,
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
        id: '4e2141fe-3a09-43ea-9c82-18b22290ca50',
        ticker: 'GOOGL',
        name: 'Alphabet',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 10,
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
        id: 'edef0723-ed3b-4fcb-b8b9-2fabcc5e9724',
        ticker: 'MCD',
        name: 'McDonalds',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 24,
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
        id: '85cb6c8e-ae28-4fac-9669-579281057412',
        ticker: 'PEP',
        name: 'PepsiCo',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 10,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: '2c1dc8e8-c1de-4f7d-b518-db17910a36f4',
        ticker: 'INTC',
        name: 'Intel',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 10,
        createdAt: now,
        updatedAt: now,
      }),
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
        id: 'fb9d3003-099c-4da4-8857-5fb5c070d3a8',
        ticker: 'DE',
        name: 'Deere & Company',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 40,
        createdAt: now,
        updatedAt: now,
      }),
      new Asset({
        id: '91257cce-940e-48b8-913a-bc70a3177f87',
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
        id: '791e0336-b276-4318-9f03-304efe66c7c6',
        ticker: 'AMZN',
        name: 'Amazon',
        assetType: AssetTypeKey.CEDEARS,
        ratio: 10,
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
