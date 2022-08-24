import { Database } from 'sqlite';

const BANK_ACCOUNTS_TABLE_NAME = 'bankAccounts';

const bankAccountService = {
  /**
   * Update bank account balance
   *
   * @param {string} id - Bank account id
   * @param {number} value - Value should be negative or positive
   */
  updateBalanceValueById(id: string, value: number, { db }: { db: Database }) {
    return db.run('UPDATE ');
  },

  /**
   * Update bank account nextBalance
   */
  updateNextBalanceValueById(
    id: string,
    value: number,
    { db }: { db: Database },
  ) {
    return db.run(
      `UPDATE ${BANK_ACCOUNTS_TABLE_NAME} SET nextBalance += :nextBalance WHERE id = :id`,
      { nextBalance: value, id },
    );
  },
};

export default bankAccountService;
