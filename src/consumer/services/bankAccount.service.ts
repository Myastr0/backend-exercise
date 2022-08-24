import { Database } from 'sqlite';

const BANK_ACCOUNTS_TABLE_NAME = 'bankAccounts';

const bankAccountService = {
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
      { balance: value, id },
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
      { nextBalance: value, id },
    );
  },
};

export default bankAccountService;
