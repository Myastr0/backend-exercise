import { Event } from '../../src/consumer/interfaces/event.interfaces';

import * as lodash from 'lodash';
import consume from '../../src/consumer';
import {
  TRANSACTION_CATEGORY_ENUM,
  TRANSACTION_CURRENCY_ENUM,
  TRANSACTION_PAYMENT_METHOD_ENUM,
  TRANSACTION_STATUS_ENUM,
  TRANSACTION_TYPE_ENUM,
} from '../../src/consumer/interfaces/transaction.interfaces';

const validEvent = {
  eventId: 'fcac5f82-e2e6-47b3-923d-3e71e6998f5e',
  payload: {
    bankAccountId: '475baf8c-285d-5e8f-b7a2-d12fe99fc33f',
    category: TRANSACTION_CATEGORY_ENUM.SERVICES,
    userId: 'fcb58877-1001-55e4-b0c1-e188fcabec2c',
    createdAt: '1970-01-18T20:54:46.071Z',
    currency: TRANSACTION_CURRENCY_ENUM.EUR,
    description: 'Sis fifuda alrur suoku utunasab se ce kim ejsejfun evbuta.',
    executedAt: null,
    paymentMethod: TRANSACTION_PAYMENT_METHOD_ENUM.CHECK,
    status: TRANSACTION_STATUS_ENUM.PENDING,
    title: 'Lelga ota redralsuz.',
    transactionAt: '1970-01-18T07:38:07.754Z',
    transactionId: 'ce765867-e65b-5d84-b709-b58a3f039de7',
    type: TRANSACTION_TYPE_ENUM.PAYOUT,
    updatedAt: '1970-01-18T20:54:50.044Z',
    value: 1698,
  },
  retry: 0,
};

describe('consumer', () => {
  it('should return true', async () => {
    // const result = await consume({});
    // expect(result).toEqual(true);
  });

  describe('Given invalid event data structure Then consumer receive them It should fail', () => {
    it('invalid evendId data', async () => {
      // @ts-ignore
      const event = lodash.cloneDeep(validEvent);

      event.eventId = 1;

      const result = await consume(event as unknown as Event);
      expect(result).toEqual(false);
    });

    it('invalid currency in payload', async () => {
      const event = lodash.cloneDeep(validEvent);

      event.payload.currency = 'BAD_CURRENCY';

      const result = await consume(event);

      expect(result).toEqual(false);
    });

    it('invalid category in payload', async () => {
      const event = lodash.cloneDeep(validEvent);

      event.payload.category = 'BAD_CATEGORY';

      const result = await consume(event);

      expect(result).toEqual(false);
    });
  });
});
