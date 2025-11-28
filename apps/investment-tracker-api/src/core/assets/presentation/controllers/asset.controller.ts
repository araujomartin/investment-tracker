import { Controller, Get, Param } from '@nestjs/common';
import { AssetUseCase } from '../../application/use-cases/asset-use-case.service';
import { Asset } from '../../domain/entities/asset.entity';

@Controller('assets')
export class AssetController {
  constructor(private readonly assetUseCase: AssetUseCase) {}

  @Get()
  async getAllAssets(): Promise<Asset[]> {
    return this.assetUseCase.getAllAssets();
  }

  @Get(':id')
  async getAssetById(@Param('id') id: string): Promise<Asset | null> {
    return this.assetUseCase.getAssetById(id);
  }

  @Get('ticker/:ticker')
  async getAssetByTicker(
    @Param('ticker') ticker: string,
  ): Promise<Asset | null> {
    return this.assetUseCase.getAssetByTicker(ticker);
  }
}
