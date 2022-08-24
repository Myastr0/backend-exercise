import ajv from '../../utils/ajv';

import {
  TRANSACTION_CATEGORY_ENUM,
  TRANSACTION_CURRENCY_ENUM,
  TRANSACTION_PAYMENT_METHOD_ENUM,
  TRANSACTION_STATUS_ENUM,
  TRANSACTION_TYPE_ENUM,
} from '../interfaces/transaction.interfaces';

const schema = {
  type: 'object',
  properties: {
    eventId: { type: 'string' },
    payload: {
      type: 'object',
      properties: {
        bankAccountId: { type: 'string', format: 'uuid' },
        userId: { type: 'string', format: 'uuid' },
        transactionId: { type: 'string', format: 'uuid' },
        title: { type: 'string' },
        description: { type: 'string' },
        value: { type: 'number', minimum: 0 },
        currency: {
          type: 'string',
          enum: Object.values(TRANSACTION_CURRENCY_ENUM),
        },
        paymentMethod: {
          type: 'string',
          enum: Object.values(TRANSACTION_PAYMENT_METHOD_ENUM),
        },
        category: {
          type: 'string',
          enum: Object.values(TRANSACTION_CATEGORY_ENUM),
        },
        type: {
          type: 'string',
          enum: Object.values(TRANSACTION_TYPE_ENUM),
        },
        status: {
          type: 'string',
          enum: Object.values(TRANSACTION_STATUS_ENUM),
        },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        executedAt: { type: 'string', format: 'date-time', nullable: true },
        transactionAt: { type: 'string', format: 'date-time' },
      },
      additionalProperties: false,
      required: [
        'bankAccountId',
        'userId',
        'transactionId',
        'title',
        'description',
        'value',
        'currency',
        'paymentMethod',
        'category',
        'type',
        'status',
        'createdAt',
        'updatedAt',
        'executedAt',
        'transactionAt',
      ],
    },
    retry: { type: 'integer' },
  },
  additionalProperties: false,
  required: ['eventId', 'retry', 'payload'],
} as const;

export default ajv.compile(schema);
