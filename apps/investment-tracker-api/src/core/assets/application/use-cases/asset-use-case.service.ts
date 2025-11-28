import { Injectable } from '@nestjs/common';
import { AssetRepository } from '../../domain/repositories/asset.repository';
import { Asset } from '../../domain/entities/asset.entity';
import { TickerSlug } from '../../domain/repositories/ticker.model';

@Injectable()
export class AssetUseCase {
  constructor(private readonly assetRepository: AssetRepository) {}

  async getAssetById(id: string): Promise<Asset | null> {
    return this.assetRepository.findById(id);
  }

  async getAssetByTicker(ticker: TickerSlug): Promise<Asset | null> {
    return this.assetRepository.findByTicker(ticker);
  }

  async getAllAssets(): Promise<Asset[]> {
    return this.assetRepository.findAll();
  }
}
