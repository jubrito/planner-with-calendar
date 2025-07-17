import { EventOnUpdate } from '../../types/event';
import { isValidDate } from '../checkers';

export const validateEventOnUpdate = (
  event: Partial<EventOnUpdate>,
): Partial<Record<keyof EventOnUpdate, string>> => {
  const errors: Partial<Record<keyof EventOnUpdate, string>> = {};
  const now = new Date();
  const { startDate, endDate } = event;

  if (!startDate) {
    errors.startDate = 'Start date is required';
  } else if (!isValidDate(startDate)) {
    errors.startDate = 'Start date must be a valid date';
  } else if (startDate < now) {
    errors.startDate = 'Start date cannot be in the past';
  }

  if (!endDate) {
    errors.endDate = 'End date is required';
  } else if (!isValidDate(endDate)) {
    errors.endDate = 'End date must be a valid date';
  } else if (endDate < now) {
    errors.endDate = 'End date cannot be in the past';
  } else if (startDate && endDate < startDate) {
    errors.endDate = 'End date must be after start date';
  }

  return errors;
};
