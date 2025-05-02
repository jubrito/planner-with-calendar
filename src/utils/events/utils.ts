import { getFormattedDateString } from '../calendar/utils';

/**
 * Function to get id containing the year, month and day
 * @param ISODate
 * @returns id on the format m/d/yy
 */
export const formatDateIDFromDate = (ISODate: string) => {
  const date = new Date(ISODate);
  return getFormattedDateString('en-US', date, {
    dateStyle: 'short',
  });
};
