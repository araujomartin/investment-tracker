import { Asset } from '../entities/asset.entity';
import { TickerSlug } from './ticker.model';

export abstract class AssetRepository {
  abstract findById(id: string): Promise<Asset | null>;
  abstract findByTicker(ticker: TickerSlug): Promise<Asset | null>;
  abstract findAll(): Promise<Asset[]>;
}
