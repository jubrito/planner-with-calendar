import { DateConfig } from '../../types/calendar/types';
import { isValidDate, isValidLocale } from '../checkers';
import { IntlDateTimeFormatLong, IntlDateTimeFormatShort } from '../constants';
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
  const dayOfTheMonthDate = getFormattedDate(
    locale,
    new Date(year, month, dayToFind),
  );
  const dayOfWeek = dayOfTheMonthDate.getDay();
  return getDayName(dayOfWeek, locale);
};
