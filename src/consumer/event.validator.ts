import { JSONSchemaType } from 'ajv';
import ajv from '../utils/ajv';
import { Event } from './event.interfaces';
import {
  TRANSACTION_CATEGORY,
  TRANSACTION_CURRENCY,
  TRANSACTION_PAYMENT_METHOD,
  TRANSACTION_STATUS,
  TRANSACTION_TYPE,
} from '../shared/transaction.interface';

// const schema: JSONSchemaType<Event> = {
//   type: 'object',
//   properties: {
//     eventId: { type: 'string' },
//     payload: {
//       type: 'object',
//       properties: {
//         bankAccountId: { type: 'string', format: 'uuid' },
//         userId: { type: 'string', format: 'uuid' },
//         transactionId: { type: 'string', format: 'uuid' },
//         title: { type: 'string' },
//         description: { type: 'string' },
//         value: { type: 'number', minimum: 0 },
//         currency: { type: 'string', enum: [TRANSACTION_CURRENCY.EUR] },
//         paymentMethod: {
//           type: 'string',
//           enum: [
//             TRANSACTION_PAYMENT_METHOD.CARD,
//             TRANSACTION_PAYMENT_METHOD.CHECK,
//             TRANSACTION_PAYMENT_METHOD.DIRECT_DEBIT,
//             TRANSACTION_PAYMENT_METHOD.TRANSFER,
//           ],
//         },
//         category: { type: 'string', enum: [TRANSACTION_CATEGORY.TAX] },
//         type: {
//           type: 'string',
//           enum: [TRANSACTION_TYPE.PAYIN, TRANSACTION_TYPE.PAYOUT],
//         },
//         status: {
//           type: 'string',
//           enum: [
//             TRANSACTION_STATUS.PENDING,
//             TRANSACTION_STATUS.CANCELED,
//             TRANSACTION_STATUS.VALIDATED,
//           ],
//         },
//         createdAt: { type: 'string', format: 'date-time' },
//         updatedAt: { type: 'string', format: 'date-time' },
//         executedAt: { type: 'string', format: 'date-time' },
//         transactionAt: { type: 'string', format: 'date-time' },
//       },
//       additionalProperties: false,
//       required: [
//         'bankAccountId',
//         'userId',
//         'transactionId',
//         'title',
//         'description',
//         'value',
//         'currency',
//         'paymentMethod',
//         'category',
//         'type',
//         'status',
//         'createdAt',
//         'updatedAt',
//         'executedAt',
//         'transactionAt',
//       ],
//     },
//     retry: { type: 'integer' },
//   },
//   additionalProperties: false,
//   required: ['eventId', 'retry', 'payload'],
// } as const;

const schema: JSONSchemaType<any> = {
  type: 'string',
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
        currency: { type: 'string', enum: [TRANSACTION_CURRENCY.EUR] },
        paymentMethod: {
          type: 'string',
          enum: [
            TRANSACTION_PAYMENT_METHOD.CARD,
            TRANSACTION_PAYMENT_METHOD.CHECK,
            TRANSACTION_PAYMENT_METHOD.DIRECT_DEBIT,
            TRANSACTION_PAYMENT_METHOD.TRANSFER,
          ],
        },
        category: { type: 'string', enum: [TRANSACTION_CATEGORY.TAX] },
        type: {
          type: 'string',
          enum: [TRANSACTION_TYPE.PAYIN, TRANSACTION_TYPE.PAYOUT],
        },
        status: {
          type: 'string',
          enum: [
            TRANSACTION_STATUS.PENDING,
            TRANSACTION_STATUS.CANCELED,
            TRANSACTION_STATUS.VALIDATED,
          ],
        },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        executedAt: { type: 'string', format: 'date-time' },
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
