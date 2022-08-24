import {
  TRANSACTION_CATEGORY,
  TRANSACTION_CURRENCY,
  TRANSACTION_PAYMENT_METHOD,
  TRANSACTION_STATUS,
  TRANSACTION_TYPE,
} from '../shared/transaction.interface';

export interface Event {
  eventId: string;
  payload: IEventPayload;
  retry: number;
}

export interface IEventPayload {
  bankAccountId: string;
  category: TRANSACTION_CATEGORY | string;
  userId: string;
  createdAt: string;
  currency: TRANSACTION_CURRENCY | string;
  description: string;
  executedAt: string;
  paymentMethod: TRANSACTION_PAYMENT_METHOD | string; // could be one of CARD, CHECK, DIRECT_DEBIT or TRANSFER
  status: TRANSACTION_STATUS | string; // could be one of PENDING, CANCELED, VALIDATED
  title: string;
  transactionAt: string;
  transactionId: string;
  type: TRANSACTION_TYPE; // PAYIN for incoming transaction or PAYOUT for outgoing transaction
  updatedAt: string;
  value: number;
}
