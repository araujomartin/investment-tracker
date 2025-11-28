import { Module } from '@nestjs/common';
import { AssetController } from './presentation/controllers/asset.controller';
import { AssetUseCase } from './application/use-cases/asset-use-case.service';
import { MockAssetService } from './infrastructure/persistence/mock/mock-asset.service';
import { AssetRepository } from './domain/repositories/asset.repository';

@Module({
  controllers: [AssetController],
  providers: [
    AssetUseCase,
    {
      provide: AssetRepository,
      useClass: MockAssetService,
    },
  ],
  exports: [AssetRepository, AssetUseCase],
})
export class AssetsModule {}
