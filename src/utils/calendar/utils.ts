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
import { numberOfHoursInADay, todayLabel } from './constants';
import { isToday } from '../checkers';
import { getWeekDayName, getWeekDaysNames } from './weeks';
import { validateDate, validateLocale } from '../validations';

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
  const errorMessage = 'get date title';
  validateDate(new Date(year, month, day), errorMessage);
  validateLocale(locale, errorMessage);
  const date = new Date(year, month, day);

  if (isToday(locale, date)) return todayLabel;

  const result = getFormattedDateString(locale, date, {
    dateStyle: IntlDateTimeFormatFull,
  });

  const firstLetter = result.charAt(0).toUpperCase();
  return firstLetter + result.slice(1, result.length);
};

export const getDateISOString = (date: DateConfig['date']) => {
  const errorMessage = 'get date';
  validateDate(date, errorMessage);
  return date.toISOString();
};

export const getDay = (date: DateConfig['date']) => {
  validateDate(date, 'get day');
  return date.getDate();
};

export const getMonthIndex = (
  locale: LocaleLanguage,
  date: DateConfig['date'],
  monthStyle?:
    | typeof IntlDateTimeFormatNumeric
    | typeof IntlDateTimeFormat2Digit,
) => {
  const errorMessage = 'get month index';
  validateDate(date, errorMessage);
  validateLocale(locale, errorMessage);

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
  const errorMessage = 'get month name';
  validateDate(date, errorMessage);
  validateLocale(locale, errorMessage);
  const monthName = getFormattedDateString(locale, date, {
    month: monthStyle || IntlDateTimeFormatLong,
  });
  const monthNameFirstLetterUpperCase = monthName.charAt(0).toUpperCase();
  return monthNameFirstLetterUpperCase + monthName.slice(1).replace('.', '');
};

export const getYear = (date: DateConfig['date']) => {
  validateDate(date, 'get year');
  return date.getFullYear();
};

export const getTimeInMilliseconds = (date: DateConfig['date']) => {
  validateDate(date, 'get time in milliseconds');
  return date.getTime();
};

export const getMonthNumberOfDays = (
  locale: LocaleLanguage,
  date: DateConfig['date'],
) => {
  const errorMessage = 'get month number of days';
  validateDate(date, errorMessage);
  validateLocale(locale, errorMessage);

  const year = getYear(date);
  const month = getMonthIndex(locale, date) + 1;
  const getLastDayOfMonth = 0;

  validateDate(new Date(year, month, getLastDayOfMonth), errorMessage);
  const dateWithLastDayOfMonth = new Date(year, month, getLastDayOfMonth);

  return dateWithLastDayOfMonth.getDate();
};

export const getDayOfWeek = (
  locale: LocaleLanguage,
  date: DateConfig['date'],
  weekdayStyle?: IntlDateTypeWeekdayStyle,
) => {
  const errorMessage = 'get day of the week';
  validateDate(date, errorMessage);
  validateLocale(locale, errorMessage);
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
  validateLocale(locale, 'get day name');
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
  const errorMessage = 'get date';
  validateDate(date, errorMessage);
  validateLocale(locale, errorMessage);
  return new Intl.DateTimeFormat(locale, options).format(date);
};

export const getLastDayOfPreviousMonth = (
  time: DateConfig['timeInMilliseconds'],
): number => {
  validateDate(new Date(time), 'get last day of previous month');
  const tempDate = new Date(time);
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

export const getFullDateLabel = (locale: LocaleLanguage, date: Date) => {
  const errorMessage = 'get date label';
  validateDate(date, errorMessage);
  validateLocale(locale, errorMessage);
  const formattedLabel = getFormattedDateString(locale, date, {
    weekday: IntlDateTimeFormatLong,
    month: IntlDateTimeFormatLong,
    day: IntlDateTimeFormatNumeric,
  });
  const firstCharInUpperCase = formattedLabel.charAt(0).toUpperCase();
  return firstCharInUpperCase + formattedLabel.slice(1);
};

export const getDateInfo = (
  validDate: Date,
  locale: LocaleLanguage,
): DateInfo => {
  const errorMessage = 'get date information';
  validateDate(validDate, errorMessage);
  validateLocale(locale, errorMessage);

  return {
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
  };
};

export const getHourPeriod = (locale: LocaleLanguage, date: Date) => {
  const formattedHour = getFormattedDateString(locale, date, {
    hour: IntlDateTimeFormatNumeric,
  });

  const [time, period, hour] = getTimeInformation(formattedHour);
  if (is12HourClockSystem(formattedHour)) {
    return time + period.toLowerCase();
  }
  return hour + ':00';
};

export const getHoursOfTheDay = (locale: LocaleLanguage) => {
  const hoursInADay = Array.from(Array(numberOfHoursInADay + 1).keys());
  return hoursInADay.map((hours) => {
    const newDate = new Date();
    const date = new Date(
      getYear(newDate),
      getMonthIndex(locale, newDate),
      getDay(newDate),
      hours,
    );
    return getHourPeriod(locale, date);
  });
};
