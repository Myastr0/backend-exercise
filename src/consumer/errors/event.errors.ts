import ShineError from '../../utils/shine-error.class';
import { Event } from '../interfaces/event.interfaces';

export const E_EVENT_INVALID_SCHEMA = ({ errors }: { errors: any[] }) =>
  new ShineError('E_EVENT_INVALID_SCHEMA', 'Event not match schema', {
    errors,
  });

export const E_EVENT_MAX_RETRIES_EXCEEDED = ({ event }: { event: Event }) =>
  new ShineError('E_EVENT_MAX_RETRIES_EXCEEDED', 'Event exceed max retries', {
    event,
  });
