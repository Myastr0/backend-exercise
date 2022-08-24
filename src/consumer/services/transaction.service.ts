import { Database } from 'sqlite';
import {
  IInsertTransactionDTO,
  ITransaction,
  TRANSACTION_STATUS_ENUM,
  TRANSACTION_TYPE_ENUM,
} from '../interfaces/transaction.interfaces';
import {
  E_TRANSACTION_ALREADY_EXISTS,
  E_TRANSACTION_ALREADY_VALIDATED,
  E_TRANSACTION_EXECUTED_AT_SHOULD_BE_DEFINED,
  E_TRANSACTION_NOT_FOUND,
} from '../errors/transaction.errors';
import bankAccountService from './bankAccount.service';

const TRANSACTION_TABLE_NAME = 'transactions';

const transactionService = {
  /**
   * Find one transaction by id
   *
   * @param {string} id
   * @param {Database<sqlite3.Database, sqlite3.Statement>} db
   *
   * @returns {Promise<ITransaction|undefined>}
   */
  async findOneById(
    id: string,
    { db }: { db: Database },
  ): Promise<ITransaction | undefined> {
    return db.get<ITransaction>(
      `SELECT * FROM ${TRANSACTION_TABLE_NAME} WHERE id = :id;`,
      {
        ':id': id,
      },
    );
  },

  /**
   * Insert a transaction
   *
   * @param {IInsertTransactionDTO} insertTransactionDTO
   * @param {Database<sqlite3.Database, sqlite3.Statement>} db
   * @returns {Promise<ITransaction>}
   */
  async insertOne(
    insertTransactionDTO: IInsertTransactionDTO,
    { db }: { db: Database },
  ) {
    // 1. Check if transaction not already exists
    let trx = await transactionService.findOneById(insertTransactionDTO.id, {
      db,
    });

    if (trx !== undefined) {
      throw E_TRANSACTION_ALREADY_EXISTS({
        transactionId: insertTransactionDTO.id,
      });
    }

    // 2. Insert transaction in database
    const result = await db.run(
      `INSERT INTO ${TRANSACTION_TABLE_NAME} (
            id,
            bankAccountId,
            title,
            description,
            category,
            status,
            type,
            paymentMethod,
            currency,
            createdAt,
            updatedAt, 
            transactionAt, 
            executedAt,
            value
          ) VALUES (
            :id,
            :bankAccountId,
            :title,
            :description,
            :category,
            :status,
            :type,
            :paymentMethod,
            :currency,
            :createdAt,
            :updatedAt, 
            :transactionAt, 
            :executedAt,
            :value);
        `,
      {
        ':id': insertTransactionDTO.id,
        ':bankAccountId': insertTransactionDTO.bankAccountId,
        ':title': insertTransactionDTO.title,
        ':description': insertTransactionDTO.description,
        ':category': insertTransactionDTO.category,
        ':status': insertTransactionDTO.status,
        ':type': insertTransactionDTO.type,
        ':paymentMethod': insertTransactionDTO.paymentMethod,
        ':currency': insertTransactionDTO.currency,
        ':createdAt': insertTransactionDTO.createdAt,
        ':updatedAt': insertTransactionDTO.updatedAt,
        ':transactionAt': insertTransactionDTO.transactionAt,
        ':value': insertTransactionDTO.value,
      },
    );

    if (result === undefined) {
      throw new Error('Fail insert');
    }

    trx = await transactionService.findOneById(insertTransactionDTO.id, { db });

    if (trx === undefined) {
      throw E_TRANSACTION_NOT_FOUND({ transactionId: insertTransactionDTO.id });
    }

    console.log('before update next balance value');

    // 3. Update nextBalance value
    await bankAccountService.updateNextBalanceValueById(
      trx.bankAccountId,
      trx.type === TRANSACTION_TYPE_ENUM.PAYIN ? trx.value : -trx.value,
      { db },
    );

    console.log('after update next balance value');

    return trx;
  },

  /**
   * Update one transaction by id and new content to update
   *
   * @param {string} id
   * @param {TRANSACTION_STATUS_ENUM.CANCELED | TRANSACTION_STATUS_ENUM.VALIDATED} status
   * @param {Date} executedAt
   * @param {Database<sqlite3.Database, sqlite3.Statement>} db
   *
   * @returns {Promise<ITransaction>}
   */
  async updateOneStatusById(
    id: string,
    status:
      | TRANSACTION_STATUS_ENUM.CANCELED
      | TRANSACTION_STATUS_ENUM.VALIDATED,
    executedAt: Date | null,
    { db }: { db: Database },
  ): Promise<ITransaction> {
    if (status === TRANSACTION_STATUS_ENUM.VALIDATED && executedAt === null) {
      throw E_TRANSACTION_EXECUTED_AT_SHOULD_BE_DEFINED({
        transactionId: id,
      });
    }

    let trx = await transactionService.findOneById(id, { db });

    if (trx === undefined) {
      throw E_TRANSACTION_NOT_FOUND({ transactionId: id });
    }

    if (trx.status === TRANSACTION_STATUS_ENUM.VALIDATED) {
      throw E_TRANSACTION_ALREADY_VALIDATED({ transactionId: id });
    }
    // Update transaction Query
    await db.run(
      `
        UPDATE ${TRANSACTION_TABLE_NAME} 
        SET status = :status,
            executedAt = :executedAt
        WHERE id = :id;
    `,
      {
        ':id': id,
        ':status': status,
        ':executedAt': executedAt?.toISOString(),
      },
    );

    trx = await transactionService.findOneById(id, { db });

    if (trx === undefined) {
      throw E_TRANSACTION_NOT_FOUND({ transactionId: id });
    }

    if (trx.status === TRANSACTION_STATUS_ENUM.VALIDATED) {
      await bankAccountService.updateBalanceValueById(
        trx.bankAccountId,
        trx.value,
        {
          db,
        },
      );
    } else if (trx.status === TRANSACTION_STATUS_ENUM.CANCELED) {
      await bankAccountService.updateNextBalanceValueById(
        trx.bankAccountId,
        trx.type === TRANSACTION_TYPE_ENUM.PAYIN ? -trx.value : trx.value,
        { db },
      );
    }

    return trx;
  },
};

export default transactionService;
