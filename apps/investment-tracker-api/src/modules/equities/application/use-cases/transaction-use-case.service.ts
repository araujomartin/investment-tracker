import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { AssetUseCase } from '../../../../core/assets/application/use-cases/asset-use-case.service';

@Injectable()
export class TransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly assetUseCase: AssetUseCase,
  ) {}

  async createTransaction(userId: string, dto: CreateTransactionDto) {
    const asset = await this.assetUseCase.getAssetByTicker(dto.ticker);

    if (!asset) {
      throw new Error(`Asset not found for ticker: ${dto.ticker}`);
    }

    const transaction = new Transaction({
      userId,
      ticker: dto.ticker,
      quantity: dto.quantity,
      pricePerShareArs: dto.pricePerShareArs,
      usdArsRate: dto.usdArsRate,
      transactionType: dto.transactionType,
      transactionDate: new Date(dto.transactionDate),
      assetRatio: asset.ratio,
      assetType: asset.assetType,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.transactionRepository.save(transaction);
  }

  findAllTransactionsByUserId(userId: string) {
    return this.transactionRepository.findByUserId(userId);
  }
}
