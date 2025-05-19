import { DateConfig } from '../../types/calendar/types';
import { isValidLocale } from '../checkers';
import { IntlDateTimeFormatLong, IntlDateTimeFormatShort } from '../constants';
import { validateDateTimeFormatRequirements } from '../validations';
import { numberOfDaysOfTheWeek } from './constants';
import { getDayName } from './utils';

export const getWeekDaysNames = (locale: string) => {
  if (!isValidLocale(locale))
    throw new Error('Failed to get week days names, language is invalid');

  const date = new Date(0);

  return [...Array(numberOfDaysOfTheWeek).keys()].map((dayOfWeek) => {
    const dayOneIndexed = dayOfWeek + 1;
    date.setDate(dayOneIndexed);
    const long = new Intl.DateTimeFormat(locale, {
      weekday: IntlDateTimeFormatLong,
    }).format(date);
    const short = new Intl.DateTimeFormat(locale, {
      weekday: IntlDateTimeFormatShort,
    }).format(date);
    const initial = new Intl.DateTimeFormat(locale, {
      weekday: IntlDateTimeFormatShort,
    })
      .format(date)
      .charAt(0);
    const getNameWithFirstLetterUppercased = (name: string) =>
      name.charAt(0).toUpperCase() + name.slice(1, name.length);

    return {
      long: getNameWithFirstLetterUppercased(long),
      short: getNameWithFirstLetterUppercased(short),
      initial: getNameWithFirstLetterUppercased(initial),
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
  const dayOfWeek = date.getDay();
  const dayName = getDayName(dayOfWeek, locale);
  const firstLetterCapitalized = dayName.charAt(0).toUpperCase();
  return firstLetterCapitalized + dayName.slice(1).replace('.', '');
};
