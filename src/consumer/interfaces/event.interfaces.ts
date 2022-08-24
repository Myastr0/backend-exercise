import {
  TRANSACTION_CATEGORY_ENUM,
  TRANSACTION_CURRENCY_ENUM,
  TRANSACTION_PAYMENT_METHOD_ENUM,
  TRANSACTION_STATUS_ENUM,
  TRANSACTION_TYPE_ENUM,
} from './transaction.interfaces';

export interface Event {
  eventId: string;
  payload: IEventPayload;
  retry: number;
}

export interface IEventPayload {
  bankAccountId: string;
  category: TRANSACTION_CATEGORY_ENUM;
  userId: string;
  createdAt: string;
  currency: TRANSACTION_CURRENCY_ENUM;
  description: string;
  executedAt: string | null;
  paymentMethod: TRANSACTION_PAYMENT_METHOD_ENUM; // could be one of CARD, CHECK, DIRECT_DEBIT or TRANSFER
  status: TRANSACTION_STATUS_ENUM; // could be one of PENDING, CANCELED, VALIDATED
  title: string;
  transactionAt: string;
  transactionId: string;
  type: TRANSACTION_TYPE_ENUM; // PAYIN for incoming transaction or PAYOUT for outgoing transaction
  updatedAt: string;
  value: number;
}
