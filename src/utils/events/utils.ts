import { getFormattedDateString } from '../calendar/utils';
import { validateDate } from '../validations';

/**
 * Function to get id containing the year, month and day
 * @param ISODate
 * @returns id on the format m/d/yy
 */
export const formatDateIDFromDate = (ISODate: string) => {
  validateDate(new Date(ISODate), 'format date');
  const date = new Date(ISODate);
  return getFormattedDateString('en-US', date, {
    dateStyle: 'short',
  });
};
