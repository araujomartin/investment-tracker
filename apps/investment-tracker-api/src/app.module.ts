import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { AssetsModule } from './core/assets/assets.module';
import { MarketDataModule } from './core/market-data/market-data.module';
import { EquityModule } from './modules/equities/equity.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
    }),
    DatabaseModule,
    AssetsModule,
    MarketDataModule,
    EquityModule,
  ],
})
export class AppModule {
}
