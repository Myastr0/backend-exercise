export enum TRANSACTION_STATUS {
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  VALIDATED = 'VALIDATED',
}

export enum TRANSACTION_TYPE {
  PAYIN = 'PAYIN',
  PAYOUT = 'PAYOUT',
}

export enum TRANSACTION_PAYMENT_METHOD {
  CARD = 'CARD',
  CHECK = 'CHECK',
  DIRECT_DEBIT = 'DIRECT_DEBIT',
  TRANSFER = 'TRANSFER',
}

export enum TRANSACTION_CURRENCY {
  EUR = 'EUR',
}

export enum TRANSACTION_CATEGORY {
  TAX = 'TAX',
}

export interface ITransaction {
  id: string;
  title: string;
  description: string;
  category: TRANSACTION_CATEGORY;
  status: TRANSACTION_STATUS;
  type: TRANSACTION_TYPE;
  paymentMethod: TRANSACTION_PAYMENT_METHOD;
  currency: TRANSACTION_CURRENCY;
  createdAt: Date; // Interne
  updatedAt: Date; // Interne
  transactionAt: Date; // Externe (creation)
  executedAt: Date; // Externe (execution)
  value: Number;
}
