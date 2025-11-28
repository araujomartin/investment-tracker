import { Transaction } from '../entities/transaction.entity';

/**
 * Contrato abstracto para el repositorio de transacciones
 * Define los métodos que cualquier implementación debe cumplir
 */
export abstract class TransactionRepository {
  /**
   * Guarda una nueva transacción o actualiza una existente
   */
  abstract save(transaction: Transaction): Promise<Transaction>;

  /**
   * Busca una transacción por su ID
   */
  abstract findById(id: string): Promise<Transaction | null>;

  /**
   * Busca todas las transacciones de un usuario
   * Ordenadas por fecha descendente (más reciente primero)
   */
  abstract findByUserId(userId: string): Promise<Transaction[]>;

  /**
   * Busca transacciones de un usuario filtradas por ticker
   */
  abstract findByUserIdAndTicker(
    userId: string,
    ticker: string,
  ): Promise<Transaction[]>;

  /**
   * Obtiene la última transacción creada por un usuario
   * Útil para validar si los snapshots están actualizados
   */
  abstract findLatestByUserId(userId: string): Promise<Transaction | null>;

  /**
   * Soft delete de una transacción
   * Marca deletedAt en lugar de eliminar físicamente
   */
  abstract delete(id: string): Promise<void>;
}
