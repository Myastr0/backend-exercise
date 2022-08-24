import { Database } from 'sqlite';
import { IBankAccount } from '../interfaces/bankAccount.interfaces';

const BANK_ACCOUNTS_TABLE_NAME = 'bankAccounts';

const bankAccountService = {
  /**
   * Find one bank account by id
   *
   * @param {string} id
   * @param {Database<sqlite3.Database, sqlite3.Statement>} db
   * @returns {Promise<IBankAccount>}
   */
  findOneById(id: string, { db }: { db: Database }) {
    return db.get<IBankAccount>('SELECT * FROM bankAccounts WHERE id = :id', {
      ':id': id,
    });
  },

  /**
   * Insert bankAccount row if not exists
   *
   * @param {string} id
   * @param {string} userId
   *
   * @returns {Promise<void>}
   */
  async createBankAccountIfNotExists(
    id: string,
    userId: string,
    { db }: { db: Database },
  ) {
    const bA = await bankAccountService.findOneById(id, { db });

    if (!bA) {
      await db.run(
        `INSERT INTO ${BANK_ACCOUNTS_TABLE_NAME} (
            id,
            userId,
            balance,
            nextBalance
          ) VALUES (
            :id,
            :userId,
            :balance,
            :nextBalance);`,
        {
          ':id': id,
          ':userId': userId,
          ':balance': 0,
          ':nextBalance': 0,
        },
      );
    }
  },
  /**
   * Update bank account balance
   *
   * @param {string} id - Bank account id
   * @param {number} value - Value should be negative or positive
   *
   * @returns {Promise<*>}
   */
  updateBalanceValueById(id: string, value: number, { db }: { db: Database }) {
    let sign;
    if (value < 0) {
      sign = '-';
    } else {
      sign = '+';
    }

    return db.run(
      `UPDATE ${BANK_ACCOUNTS_TABLE_NAME} SET balance = balance ${sign} :balance WHERE id = :id`,
      { ':balance': value, ':id': id },
    );
  },

  /**
   * Update bank account nextBalance
   *
   * @param {string} id - Bank account id
   * @param {number} value - Value should be negative or positive
   *
   * @returns {Promise<*>}
   */
  updateNextBalanceValueById(
    id: string,
    value: number,
    { db }: { db: Database },
  ) {
    let sign;
    if (value < 0) {
      sign = '-';
    } else {
      sign = '+';
    }

    return db.run(
      `UPDATE ${BANK_ACCOUNTS_TABLE_NAME} SET nextBalance = nextBalance ${sign} :nextBalance WHERE id = :id`,
      { ':nextBalance': value, ':id': id },
    );
  },
};

export default bankAccountService;
