import { Injectable } from '@nestjs/common';
import { Transaction } from '../../../domain/entities/transaction.entity';
import type { AssetType } from '../../../../../core/assets/domain/models/asset-type.model';
import mockData from '../../../../../assets/json/transaction.json';
import { TransactionRepository } from '../../../domain/repositories/transaction.repository';

@Injectable()
export class MockTransactionService extends TransactionRepository {
  private transactions: Transaction[] = [];

  constructor() {
    super();
    if (mockData && Array.isArray(mockData.transactions)) {
      this.transactions = mockData.transactions.map(
        (data) =>
          new Transaction({
            id: data.id,
            userId: data.userId,
            ticker: data.ticker,
            quantity: data.quantity,
            pricePerShareArs: data.pricePerShareArs,
            usdArsRate: data.usdArsRate,
            createdAt: new Date(data.createdAt),
            updatedAt: new Date(data.updatedAt),
            transactionType: data.transactionType as 'BUY' | 'SELL' | 'SPLIT',
            transactionDate: new Date(data.transactionDate),
            deletedAt: undefined,
            assetRatio: data.assetRatio,
            assetType: data.assetType as AssetType,
          }),
      );
    }
  }

  save(transaction: Transaction): Promise<Transaction> {
    transaction.id = crypto.randomUUID();

    this.transactions.push(transaction);

    return Promise.resolve(transaction);
  }
  findById(id: string): Promise<Transaction | null> {
    const transaction = this.transactions.find((tx) => tx.id === id) || null;
    return Promise.resolve(transaction);
  }
  findByUserId(userId: string): Promise<Transaction[]> {
    const userTransactions = this.transactions.filter(
      (tx) => tx.userId === userId,
    );
    return Promise.resolve(userTransactions);
  }
  findByUserIdAndTicker(
    userId: string,
    ticker: string,
  ): Promise<Transaction[]> {
    const filteredTransactions = this.transactions.filter(
      (tx) => tx.userId === userId && tx.ticker === ticker,
    );
    return Promise.resolve(filteredTransactions);
  }
  findLatestByUserId(userId: string): Promise<Transaction | null> {
    const userTransactions = this.transactions
      .filter((tx) => tx.userId === userId)
      .sort(
        (a, b) => b.transactionDate.getTime() - a.transactionDate.getTime(),
      );
    const latestTransaction = userTransactions[0] || null;
    return Promise.resolve(latestTransaction);
  }
  delete(id: string): Promise<void> {
    this.transactions = this.transactions.filter((tx) => tx.id !== id);
    return Promise.resolve();
  }
}
