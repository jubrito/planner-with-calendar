import { WeekDays } from '../../types/calendar/enums';
import {
  DateConfig,
  DateInfo,
  IntlDateTypeMonthStyle,
  IntlDateTypeWeekdayStyle,
  ZeroPosition,
} from '../../types/calendar/types';
import { LocaleLanguage } from '../../types/locale/types';
import {
  IntlDateTimeFormat2Digit,
  IntlDateTimeFormatFull,
  IntlDateTimeFormatLong,
  IntlDateTimeFormatNumeric,
  startLabel,
} from '../constants';
import { todayLabel } from './constants';
import { isToday, isValidDate, isValidLocale } from '../checkers';
import { getWeekDayName, getWeekDaysNames } from './weeks';
import { validateDateTimeFormatRequirements } from '../validations';

/**
 * Function to generate title based on date properties
 * @param year
 * @param month
 * @param day
 * @param locale valid to be a paramerter to Intl
 * @returns full title string
 * Examples:
 * - 'Monday, December 1, 2025' (en-US)
 * - 'Segunda-feira, 1 de dezembro de 2025' (pt-BR)
 */
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
  const date = new Date(year, month, day);
  if (isToday(locale, date)) return todayLabel;
  const result = getFormattedDateString(locale, date, {
    dateStyle: IntlDateTimeFormatFull,
  });
  const firstLetter = result.charAt(0).toUpperCase();
  return firstLetter + result.slice(1, result.length);
};

export const getDateISOString = (date: DateConfig['date']) => {
  if (!isValidDate(date))
    throw new Error('Failed to get date, date is invalid');
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
  const month = getFormattedDateString(locale, date, {
    month: monthStyle || IntlDateTimeFormatNumeric,
  });
  const zeroBaseMonthNumber = parseInt(month) - 1;
  return zeroBaseMonthNumber;
};

export const get2DigitsValue = (
  value: number | string,
  zeroPosition: ZeroPosition = startLabel,
) => {
  const initialValue = value?.toString() ?? '';
  const zero = '0';
  if (zeroPosition === startLabel) return initialValue.padStart(2, zero);
  return initialValue.padEnd(2, zero);
};

export const getMonthName = (
  locale: LocaleLanguage,
  date: DateConfig['date'],
  monthStyle?: IntlDateTypeMonthStyle,
) => {
  validateDateTimeFormatRequirements(date, locale, 'get month name');
  const monthName = getFormattedDateString(locale, date, {
    month: monthStyle || IntlDateTimeFormatLong,
  });
  const monthNameFirstLetterUpperCase = monthName.charAt(0).toUpperCase();
  return monthNameFirstLetterUpperCase + monthName.slice(1).replace('.', '');
};

export const getYear = (date: DateConfig['date']) => {
  if (!isValidDate(date))
    throw new Error('Failed to get year, date is invalid');
  return date.getFullYear();
};

export const getTimeInMilliseconds = (date: DateConfig['date']) => {
  if (!isValidDate(date))
    throw new Error('Failed to get time in milliseconds, date is invalid');
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
    throw new Error('Failed to get month number of days, date is invalid');
  }
  return dateWithLastDayOfMonth.getDate();
};

export const getDayOfWeek = (
  locale: LocaleLanguage,
  date: DateConfig['date'],
  weekdayStyle?: IntlDateTypeWeekdayStyle,
) => {
  validateDateTimeFormatRequirements(date, locale, 'get day of the week');
  const dayOfWeek = getFormattedDateString(locale, date, {
    weekday: weekdayStyle || IntlDateTimeFormatLong,
  });
  const dayOfWeekFirstLetterUpperCased = dayOfWeek.charAt(0).toUpperCase();
  return dayOfWeekFirstLetterUpperCased + dayOfWeek.slice(1);
};

/**
 * Function to get the day name
 * Current implementation only returns short week day name
 * @param dayOfWeek
 * @param locale
 * @returns short day name
 * Examples: Sun (in english), Dom. (in portuguese)
 */
export const getDayName = (dayOfWeek: number, locale: string) => {
  let dayName: string;
  if (!isValidLocale(locale))
    throw new Error('Failed to get day name, language is invalid');
  const weekDays = getWeekDaysNames(locale);
  if (dayOfWeek === 0) {
    dayName = weekDays[WeekDays.SUNDAY].short;
  } else {
    const day = weekDays[dayOfWeek - 1];
    if (day == null) throw new Error('Failed to get day name, day is invalid');
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

export const getLastDayOfPreviousMonth = (
  time: DateConfig['timeInMilliseconds'],
): number => {
  const tempDate = new Date(time);
  if (!isValidDate(tempDate))
    throw new Error(
      'Failed to get last day of previous month, time is invalid',
    );
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
 * Examples: [00, 00]
 */
export const getTimeInformation = (formattedFullTime: string) => {
  const initialErrorMessage = 'Failed to get time information';
  if (!formattedFullTime)
    throw new Error(`${initialErrorMessage}, time can't be empty`);

  if (is12HourClockSystem(formattedFullTime)) {
    if (!formattedFullTime.includes(' '))
      throw new Error(
        `${initialErrorMessage}, invalid 12-hour format: missing AM/PM period`,
      );
    const [time, period] = formattedFullTime.split(' ');
    const [hour, minutes] = time.split(':');
    const periodWithSpaceBef = ' ' + period;
    return [
      get2DigitsValue(time),
      periodWithSpaceBef,
      hour,
      get2DigitsValue(minutes),
    ];
  }
  const [hour, minutes] = formattedFullTime.split(':');
  const noPeriod = '';
  return [formattedFullTime, noPeriod, hour, get2DigitsValue(minutes)];
};

export const getDateInfo = (
  validDate: Date,
  locale: LocaleLanguage,
): DateInfo => ({
  dayOfTheWeek: getWeekDayName(
    getYear(validDate),
    getMonthIndex(locale, validDate),
    getDay(validDate),
    locale,
  ),
  monthName: getMonthName(locale, validDate),
  month: getMonthIndex(locale, validDate),
  day: getDay(validDate),
  label: getFullDateLabel(locale, validDate),
  hour: validDate.getHours(),
  minutes: validDate.getMinutes(),
  year: getYear(validDate),
});
