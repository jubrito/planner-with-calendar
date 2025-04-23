import { DateConfig } from '../../types/calendar/types';
import { isValidDate, isValidLocale } from '../checkers';
import { IntlDateTimeFormatLong, IntlDateTimeFormatShort } from '../constants';
import { validateDateTimeFormatRequirements } from '../validations';
import { numberOfDaysOfTheWeek } from './constants';
import { getFormattedDate } from './utils';
import { getDayName } from './utils';

export const getWeekDaysNames = (locale: string) => {
  if (!isValidLocale(locale))
    throw new Error('Failed to get week days names, language is invalid');

  const date = new Date(0);

  return [...Array(numberOfDaysOfTheWeek).keys()].map((dayOfWeek) => {
    const dayOneIndexed = dayOfWeek + 1;
    date.setDate(dayOneIndexed);

    if (!isValidDate(date))
      throw new Error('Failed to get week days names, date is invalid');

    return {
      long: new Intl.DateTimeFormat([locale], {
        weekday: IntlDateTimeFormatLong,
      }).format(date),
      short: new Intl.DateTimeFormat([locale], {
        weekday: IntlDateTimeFormatShort,
      }).format(date),
      initial: new Intl.DateTimeFormat([locale], {
        weekday: IntlDateTimeFormatShort,
      })
        .format(date)
        .charAt(0),
    };
  });
};

export const getWeekDayName = (
  year: DateConfig['year'],
  month: DateConfig['month'],
  dayToFind: number,
  locale: string,
) => {
  const date = new Date(year, month, dayToFind);
  validateDateTimeFormatRequirements(date, locale, 'get week day name');
  const dayOfTheMonthDate = getFormattedDate(locale, date);
  const dayOfWeek = dayOfTheMonthDate.getDay();
  const dayName = getDayName(dayOfWeek, locale);
  const firstLetterCapitalized = dayName.charAt(0).toUpperCase();
  return firstLetterCapitalized + dayName.slice(1).replace('.', '');
};
