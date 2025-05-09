import { WeekDays } from '../../types/calendar/enums';
import {
  DateConfig,
  IntlDateTypeMonthStyle,
  IntlDateTypeWeekdayStyle,
} from '../../types/calendar/types';
import { LocaleLanguage } from '../../types/locale/types';
import {
  IntlDateTimeFormat2Digit,
  IntlDateTimeFormatFull,
  IntlDateTimeFormatLong,
  IntlDateTimeFormatNumeric,
} from '../constants';
import { todayLabel } from './constants';
import { isToday, isValidDate, isValidLocale } from '../checkers';
import { getWeekDaysNames } from './weeks';
import { validateDateTimeFormatRequirements } from '../validations';

export const getFullDateTitle = (
  year: DateConfig['year'],
  month: DateConfig['month'],
  day: DateConfig['day'],
  locale: LocaleLanguage,
) => {
  validateDateTimeFormatRequirements(
    new Date(year, month, day),
    locale,
    'get date title',
  );
  if (isToday(locale, new Date(year, month, day))) return todayLabel;
  return new Intl.DateTimeFormat(locale, {
    dateStyle: IntlDateTimeFormatFull,
  }).format(new Date(year, month, day));
};

export const getDateISOString = (date: DateConfig['date']) => {
  if (!isValidDate(date)) throw new Error('Failed to get date');
  return date.toISOString();
};

export const getDay = (date: DateConfig['date']) => {
  if (!isValidDate(date)) throw new Error('Failed to get day, date is invalid');
  return date.getDate();
};

export const getMonthIndex = (
  locale: LocaleLanguage,
  date: DateConfig['date'],
  monthStyle?:
    | typeof IntlDateTimeFormatNumeric
    | typeof IntlDateTimeFormat2Digit,
) => {
  validateDateTimeFormatRequirements(date, locale, 'get month index');
  const formattedDate = new Intl.DateTimeFormat(locale, {
    month: monthStyle || IntlDateTimeFormatNumeric,
  }).format(date);
  const zeroBaseMonthNumber = parseInt(formattedDate) - 1;
  return zeroBaseMonthNumber;
};

export const get2DigitsValue = (value: number | string) =>
  value.toString().padStart(2, '0');

export const getMonthName = (
  locale: LocaleLanguage,
  date: DateConfig['date'],
  monthStyle?: IntlDateTypeMonthStyle,
) => {
  validateDateTimeFormatRequirements(date, locale, 'get month name');
  const monthName = new Intl.DateTimeFormat(locale, {
    month: monthStyle || IntlDateTimeFormatLong,
  }).format(date);
  const monthNameFirstLetterUpperCase = monthName.charAt(0).toUpperCase();
  return monthNameFirstLetterUpperCase + monthName.slice(1).replace('.', '');
};

export const getYear = (date: DateConfig['date']) => {
  if (!isValidDate(date)) throw new Error('Failed to get year');
  return date.getFullYear();
};

export const getTimeInMilliseconds = (date: DateConfig['date']) => {
  if (!isValidDate(date)) throw new Error('Failed to get time in milliseconds');
  return date.getTime();
};

export const getMonthNumberOfDays = (
  locale: LocaleLanguage,
  date: DateConfig['date'],
) => {
  validateDateTimeFormatRequirements(date, locale, 'get month number of days');
  const year = getYear(date);
  const month = getMonthIndex(locale, date) + 1;
  const getLastDayOfMonth = 0;
  const dateWithLastDayOfMonth = new Date(year, month, getLastDayOfMonth);
  if (!isValidDate(dateWithLastDayOfMonth)) {
    throw new Error('Failed to get month number of days');
  }
  return dateWithLastDayOfMonth.getDate();
};

export const getDayOfWeek = (
  locale: LocaleLanguage,
  date: DateConfig['date'],
  weekdayStyle?: IntlDateTypeWeekdayStyle,
) => {
  validateDateTimeFormatRequirements(date, locale, 'get day of the week');
  const dayOfWeek = new Intl.DateTimeFormat(locale, {
    weekday: weekdayStyle || IntlDateTimeFormatLong,
  }).format(date);
  const dayOfWeekFirstLetterUpperCased = dayOfWeek.charAt(0).toUpperCase();
  return dayOfWeekFirstLetterUpperCased + dayOfWeek.slice(1);
};

export const getDayName = (dayOfWeek: number, locale: string) => {
  let dayName: string;
  if (!isValidLocale(locale))
    throw new Error('Failed to get day name, language is invalid');
  const weekDays = getWeekDaysNames(locale);
  if (dayOfWeek === 0) {
    dayName = weekDays[WeekDays.SUNDAY].short;
  } else {
    const day = weekDays[dayOfWeek - 1];
    if (day == null) {
      throw new Error('Failed to get day name, day is invalid');
    }
    dayName = day.short; // Monday (0) to Saturday (5)
  }
  return dayName;
};

export const getFormattedDateString = (
  locale: LocaleLanguage,
  date: DateConfig['date'],
  options: Intl.DateTimeFormatOptions = {},
) => {
  validateDateTimeFormatRequirements(date, locale, 'get date');
  return new Intl.DateTimeFormat(locale, options).format(date);
};

export const getFormattedDate = (
  locale: LocaleLanguage,
  date: DateConfig['date'],
  options: Intl.DateTimeFormatOptions = {},
) => {
  validateDateTimeFormatRequirements(date, locale, 'get date');
  return new Date(getFormattedDateString(locale, date, options));
};

export const getLastDayOfPreviousMonth = (
  time: DateConfig['timeInMilliseconds'],
): number => {
  const tempDate = new Date(time);
  if (!isValidDate(tempDate))
    throw new Error('Failed to get last day of previous month');
  tempDate.setDate(0);
  return tempDate.getDate();
};

export const is12HourClockSystem = (time: string) =>
  time.includes('AM') || time.includes('PM');

/**
 * Function to get time, period, hour and minutes of the event
 * If it is 12-hour clock system it will return the AM/PM period
 * If it is 24-hour clock system it will return the period as an empty string
 * @param formattedFullTime complete time based on location
 * (e.g., 12:00 for 24-hour clock system, 12:00 AM for 12-hour clock system)
 * @returns [time, period, hours, minutes]
 */
export const getTimeInformation = (formattedFullTime: string) => {
  if (is12HourClockSystem(formattedFullTime)) {
    const [time, period] = formattedFullTime.split(' ');
    const [hour, minutes] = time.split(':');
    const periodWithSpaceBef = ' ' + period;
    return [get2DigitsValue(time), periodWithSpaceBef, hour, minutes];
  }
  const [hour, minutes] = formattedFullTime.split(':');
  const noPeriod = '';
  return [formattedFullTime, noPeriod, hour, minutes];
};
