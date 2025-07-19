import { FieldsErrors } from '../../hooks/useManageEventUpdates';
import { EventStored } from '../../types/event';
import { isValidDate } from '../checkers';

export const validateEventOnUpdate = (
  event: Partial<EventStored>,
): FieldsErrors => {
  const errors: FieldsErrors = {};
  const { startDate, endDate } = event;

  if (!startDate) {
    errors.startDate = 'Start date is required';
  } else if (!isValidDate(new Date(startDate))) {
    errors.startDate = 'Start date must be a valid date';
  }

  if (!endDate) {
    errors.endDate = 'End date is required';
  } else if (!isValidDate(new Date(endDate))) {
    errors.endDate = 'End date must be a valid date';
  } else if (
    startDate &&
    isValidDate(new Date(startDate)) &&
    endDate < startDate
  ) {
    errors.endDate = 'End date must be after start date';
  }

  return errors;
};
