import { EventOnCreate, EventStored } from '../../../types/event';
import { isValidDate } from '../../../utils/checkers';

export const isValidDraftEvent = (event: EventOnCreate) => {
  const isValid =
    event.id != null &&
    event.title != null &&
    event.start != null &&
    event.end != null &&
    event.start.fixedPositionY != null &&
    event.end.fixedPositionY != null &&
    event.start.fixedPositionY >= 0 &&
    event.end.fixedPositionY >= 0 &&
    event.start.block.fifteenMinBlock >= 0 &&
    event.end.block.fifteenMinBlock >= 0 &&
    event.start.block.hour >= 0 &&
    event.end.block.hour >= 0 &&
    event.start.block.minutes >= 0 &&
    event.end.block.minutes >= 0 &&
    isValidDate(new Date(event.start.date)) &&
    isValidDate(new Date(event.end.date));
  return isValid;
};

export const isValidEvent = (event: EventStored) =>
  event.id != null &&
  event.title != null &&
  event.startDate != null &&
  event.endDate != null &&
  typeof event.id === 'string' &&
  typeof event.title === 'string' &&
  isValidDate(new Date(event.startDate)) &&
  isValidDate(new Date(event.endDate));
