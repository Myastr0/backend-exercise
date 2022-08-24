export enum TRANSACTION_STATUS_ENUM {
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  VALIDATED = 'VALIDATED',
}

export enum TRANSACTION_TYPE_ENUM {
  PAYIN = 'PAYIN',
  PAYOUT = 'PAYOUT',
}

export enum TRANSACTION_PAYMENT_METHOD_ENUM {
  CARD = 'CARD',
  CHECK = 'CHECK',
  DIRECT_DEBIT = 'DIRECT_DEBIT',
  TRANSFER = 'TRANSFER',
}

export enum TRANSACTION_CURRENCY_ENUM {
  EUR = 'EUR',
}

export enum TRANSACTION_CATEGORY_ENUM {
  DEFAULT = 'DEFAULT',
  BANKING = 'BANKING',
  CASH = 'CASH',
  CONTRIBUTIONS = 'CONTRIBUTIONS',
  EQUIPMENT = 'EQUIPMENT',
  FOOD = 'FOOD',
  HOTEL = 'HOTEL',
  LEGAL = 'LEGAL',
  LOAN = 'LOAN',
  MAINTENANCE = 'MAINTENANCE',
  MISC = 'MISC',
  PERSONAL = 'PERSONAL',
  RENT = 'RENT',
  SERVICES = 'SERVICES',
  TAX = 'TAX',
  TELECOM = 'TELECOM',
  ALCOOL_TOBACCO = 'ALCOOL_TOBACCO',
  TRANSPORTATION = 'TRANSPORTATION',
  UTILITIES = 'UTILITIES',
  VEHICLE = 'VEHICLE',
  BETTING = 'BETTING',
}

export interface ITransaction {
  id: string;
  bankAccountId: string;
  title: string;
  description: string;
  category: TRANSACTION_CATEGORY_ENUM;
  status: TRANSACTION_STATUS_ENUM;
  type: TRANSACTION_TYPE_ENUM;
  paymentMethod: TRANSACTION_PAYMENT_METHOD_ENUM;
  currency: TRANSACTION_CURRENCY_ENUM;
  createdAt: Date; // Interne
  updatedAt: Date; // Interne
  transactionAt: Date; // Externe (creation)
  executedAt: Date | null; // Externe (execution)
  value: number;
}

export interface IInsertTransactionDTO
  extends Pick<
    ITransaction,
    | 'id'
    | 'bankAccountId'
    | 'title'
    | 'description'
    | 'category'
    | 'status'
    | 'type'
    | 'paymentMethod'
    | 'currency'
    | 'createdAt'
    | 'updatedAt'
    | 'transactionAt'
    | 'value'
  > {
  status: TRANSACTION_STATUS_ENUM.PENDING;
}
