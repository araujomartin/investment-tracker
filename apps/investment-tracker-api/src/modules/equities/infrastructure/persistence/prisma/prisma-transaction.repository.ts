import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../core/database/prisma.service';
import { TransactionRepository } from '../../../domain/repositories/transaction.repository';
import { Transaction } from '../../../domain/entities/transaction.entity';
import { Transaction as PrismaTransaction, Asset as PrismaAsset } from '../../../../../generated/prisma/client';
import { AssetTypeKey, type AssetType } from '../../../../../core/assets/domain/models/asset-type.model';

type PrismaTransactionWithAsset = PrismaTransaction & {
  asset?: PrismaAsset | null;
};

@Injectable()
export class PrismaTransactionService extends TransactionRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async save(transaction: Transaction): Promise<Transaction> {
    console.log('Saving transaction:', transaction);
    const created = await this.prisma.transaction.create({
      data: {
        userId: transaction.userId,
        assetId: transaction.assetId,
        ticker: transaction.ticker,
        type: transaction.transactionType,
        quantity: transaction.quantity,
        pricePerShareArs: transaction.pricePerShareArs,
        usdArsRate: transaction.usdArsRate,
        totalUsd: transaction.calculateTotalUsdCost(),
        ratio: transaction.assetRatio,
        transactionDate: transaction.transactionDate,
        notes: '',
      },
      include: { asset: true },
    });
    return this.toDomain(created);
  }

  async findById(id: string): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: { asset: true },
    });

    return transaction ? this.toDomain(transaction) : null;
  }

  async findByUserId(userId: string): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      orderBy: { transactionDate: 'asc' },
      include: { asset: true },
    });

    return transactions.map((tx) => this.toDomain(tx));
  }

  async findByUserIdAndTicker(
    userId: string,
    ticker: string,
  ): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId,
        ticker,
        deletedAt: null,
      },
      orderBy: { transactionDate: 'asc' },
      include: { asset: true },
    });

    return transactions.map((tx) => this.toDomain(tx));
  }

  async findLatestByUserId(userId: string): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findFirst({
      where: {
        userId,
        deletedAt: null,
      },
      orderBy: { transactionDate: 'desc' },
      include: { asset: true },
    });

    return transaction ? this.toDomain(transaction) : null;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.transaction.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  private toDomain(prismaTransaction: PrismaTransactionWithAsset): Transaction {
    return new Transaction({
      id: prismaTransaction.id,
      userId: prismaTransaction.userId,
      assetId: prismaTransaction.assetId,
      ticker: prismaTransaction.ticker,
      quantity: prismaTransaction.quantity,
      pricePerShareArs: prismaTransaction.pricePerShareArs,
      usdArsRate: prismaTransaction.usdArsRate,
      transactionType: prismaTransaction.type as 'BUY' | 'SELL' | 'SPLIT',
      transactionDate: prismaTransaction.transactionDate,
      createdAt: prismaTransaction.createdAt,
      updatedAt: prismaTransaction.updatedAt,
      deletedAt: prismaTransaction.deletedAt,
      assetRatio: prismaTransaction.ratio,
      assetType: (prismaTransaction.asset?.type as AssetType) || AssetTypeKey.CEDEARS,
    });
  }
}

