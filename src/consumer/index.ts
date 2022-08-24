import config from './config';

import logger from '../utils/logger';
import getDatabase from '../utils/database';
import ShineError from '../utils/shine-error.class';

import eventValidator from './validators/event.validator';

import transactionService from './services/transaction.service';

import { Event } from './interfaces/event.interfaces';
import {
  IInsertTransactionDTO,
  ITransaction,
  TRANSACTION_STATUS_ENUM,
} from './interfaces/transaction.interfaces';

import { E_INVALID_TRANSACTION_STATUS } from './errors/transaction.errors';
import {
  E_EVENT_INVALID_SCHEMA,
  E_EVENT_MAX_RETRIES_EXCEEDED,
} from './errors/event.errors';

/**
 * A handler that will receive transaction events
 *
 * @param {object} event - The received event from the queue
 * @param {object} event.eventId - The unique id of the event
 * @param {string} event.payload - The payload of the event
 * @param {number} event.retry - The number of retries (defaults to 0)
 * @returns {boolean} false if the event needs to be retried, else true
 */
const handle = async (event: Event) => {
  const db = await getDatabase();

  try {
    logger.info('Event received', { event });

    const valid = eventValidator(event);

    if (!valid) {
      throw E_EVENT_INVALID_SCHEMA({ errors: eventValidator.errors || [] });
    }

    logger.info('Event valid', { eventId: event.eventId });

    // Start transaction

    const transactionInfo: ITransaction = {
      id: event.payload.transactionId,
      bankAccountId: event.payload.bankAccountId,
      title: event.payload.title,
      description: event.payload.description,
      status: event.payload.status,
      type: event.payload.type,
      value: event.payload.value,
      category: event.payload.category,
      currency: event.payload.currency,
      paymentMethod: event.payload.paymentMethod,
      updatedAt: new Date(event.payload.updatedAt),
      createdAt: new Date(event.payload.createdAt),
      executedAt: event.payload?.executedAt
        ? new Date(event.payload.executedAt)
        : null,
      transactionAt: new Date(event.payload.transactionAt),
    };

    console.log({ transactionInfo });
    await db.run('BEGIN');

    try {
      switch (transactionInfo.status) {
        case TRANSACTION_STATUS_ENUM.PENDING:
          // eslint-disable-next-line no-case-declarations
          const insertTransactionDTO: IInsertTransactionDTO = {
            id: transactionInfo.id,
            bankAccountId: transactionInfo.bankAccountId,
            title: transactionInfo.title,
            description: transactionInfo.description,
            status: transactionInfo.status,
            type: transactionInfo.type,
            value: transactionInfo.value,
            category: transactionInfo.category,
            currency: transactionInfo.currency,
            paymentMethod: transactionInfo.paymentMethod,
            updatedAt: transactionInfo.updatedAt,
            createdAt: transactionInfo.createdAt,
            transactionAt: transactionInfo.transactionAt,
          };

          await transactionService.insertOne(insertTransactionDTO, { db });
          break;
        case TRANSACTION_STATUS_ENUM.VALIDATED:
        case TRANSACTION_STATUS_ENUM.CANCELED:
          await transactionService.updateOneStatusById(
            transactionInfo.id,
            transactionInfo.status,
            transactionInfo.executedAt,
            { db },
          );
          break;
        default:
          throw E_INVALID_TRANSACTION_STATUS({
            transactionId: transactionInfo.id,
            status: transactionInfo.status,
          });
      }
    } catch (err) {
      await db.run('ROLLBACK');
      throw err;
    }

    await db.run('COMMIT');
    return true;
  } catch (err) {
    if (err! instanceof ShineError) {
      logger.alert(err);
    } else {
      console.log(err);
      logger.error(err);
    }

    if (event.retry >= config.MAX_RETRIES) {
      throw E_EVENT_MAX_RETRIES_EXCEEDED({ event });
    }

    /**
     * Error management
     *
     * Send error to ErrorTracker like Sentry
     *
     */

    return false;
  }
};

export default handle;
