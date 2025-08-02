import { DateConfig } from '../../types/calendar/types';
import { IntlDateTimeFormatLong, IntlDateTimeFormatShort } from '../constants';
import { makeFirstLetterUppercase } from '../utils';
import { validateDate, validateLocale } from '../validations';
import { numberOfDaysOfTheWeek } from './constants';
import { getDayName, getFormattedDateString } from './utils';

export const getWeekDaysNames = (locale: string) => {
  validateLocale(locale, 'get week days names');
  const date = new Date(0);

  return [...Array(numberOfDaysOfTheWeek).keys()].map((dayOfWeek) => {
    const dayOneIndexed = dayOfWeek + 1;
    date.setDate(dayOneIndexed);
    const long = getFormattedDateString(locale, date, {
      weekday: IntlDateTimeFormatLong,
    });
    const short = getFormattedDateString(locale, date, {
      weekday: IntlDateTimeFormatShort,
    });
    const initial = short.charAt(0);

    return {
      long: makeFirstLetterUppercase(long),
      short: makeFirstLetterUppercase(short)?.replace('.', ''),
      initial: makeFirstLetterUppercase(initial),
    };
  });
};

export const getWeekDayName = (
  year: DateConfig['year'],
  month: DateConfig['month'],
  dayToFind: number,
  locale: string,
) => {
  const errorMessage = 'get week day name';
  validateDate(new Date(year, month, dayToFind), errorMessage);
  validateLocale(locale, errorMessage);
  const date = new Date(year, month, dayToFind);
  const dayOfWeek = date.getDay();
  const dayName = getDayName(dayOfWeek, locale).replace('.', '');
  const firstLetterCapitalized = dayName.charAt(0).toUpperCase();
  return firstLetterCapitalized + dayName.slice(1);
};
