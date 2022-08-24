import logger from '../utils/logger';
import { Event, IEventPayload } from './event.interfaces';
import eventValidator from './event.validator';
import getDatabase from '../utils/database';

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

    try {
      eventValidator(event);
    } catch (err) {
      logger.error(err);
      throw err;
    }

    logger.info('Event valid', { eventId: event.eventId });

    // Start transaction

    // Considérer le user et le bankAccount existent avec un solde à 0.
    //

    // End transaction

    //
    // TODO insert your code here
    // 1. Add validator for event.payload
    // 2. Store data in transactions table
    // 3.

    return true;
  } catch (err) {
    return false;
  }
};

export default handle;
