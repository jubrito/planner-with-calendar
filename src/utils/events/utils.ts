import { getFormattedDateString } from '../calendar/utils';
import { isValidDate } from '../checkers';

/**
 * Function to get id containing the year, month and day
 * @param ISODate
 * @returns id on the format m/d/yy
 */
export const formatDateIDFromDate = (ISODate: string) => {
  if (!isValidDate(new Date(ISODate))) {
    throw new Error('Failed to get date, date is invalid');
  }
  const date = new Date(ISODate);
  return getFormattedDateString('en-US', date, {
    dateStyle: 'short',
  });
};
