import { Months, WeekDays } from '../../types/calendar/enums';
import {
  CalendarCellInfo,
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
import {
  firstDayOfTheMonth,
  numberOfHoursInADay,
  todayLabel,
} from './constants';
import { isToday } from '../checkers';
import { getWeekDayName, getWeekDaysNames } from './weeks';
import { numberOfDaysOfTheWeek } from './constants';

export const monthNameByIndex = (
  locale: LocaleLanguage,
): Record<Months, string> => {
  const anyYear = 2025;
  return {
    [Months.JANUARY]: getMonthName(locale, new Date(anyYear, Months.JANUARY)),
    [Months.FEBRUARY]: getMonthName(locale, new Date(anyYear, Months.FEBRUARY)),
    [Months.MARCH]: getMonthName(locale, new Date(anyYear, Months.MARCH)),
    [Months.APRIL]: getMonthName(locale, new Date(anyYear, Months.APRIL)),
    [Months.MAY]: getMonthName(locale, new Date(anyYear, Months.MAY)),
    [Months.JUNE]: getMonthName(locale, new Date(anyYear, Months.JUNE)),
    [Months.JULY]: getMonthName(locale, new Date(anyYear, Months.JULY)),
    [Months.AUGUST]: getMonthName(locale, new Date(anyYear, Months.AUGUST)),
    [Months.SEPTEMBER]: getMonthName(
      locale,
      new Date(anyYear, Months.SEPTEMBER),
    ),
    [Months.OCTOBER]: getMonthName(locale, new Date(anyYear, Months.OCTOBER)),
    [Months.NOVEMBER]: getMonthName(locale, new Date(anyYear, Months.NOVEMBER)),
    [Months.DECEMBER]: getMonthName(locale, new Date(anyYear, Months.DECEMBER)),
  };
};

export const numOfDaysFromOtherMonthOnCurrentCalendar = (
  weekDayName: string,
  locale: string,
) => getWeekDaysNames(locale).findIndex((name) => weekDayName === name.short);

export const getFullDateTitle = (
  year: DateConfig['year'],
  month: DateConfig['month'],
  day: DateConfig['day'],
  locale: string,
) => {
  if (isToday(locale, new Date(year, month, day))) return todayLabel;
  return new Intl.DateTimeFormat(locale, {
    dateStyle: IntlDateTimeFormatFull,
  }).format(new Date(year, month, day));
};

export const getDateISOString = (date: DateConfig['date']) =>
  date.toISOString();

export const getDay = (date: DateConfig['date']) => date.getDate();

export const getMonthIndex = (
  locale: LocaleLanguage,
  date: DateConfig['date'],
  monthStyle?:
    | typeof IntlDateTimeFormatNumeric
    | typeof IntlDateTimeFormat2Digit,
) => {
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
  const monthName = new Intl.DateTimeFormat(locale, {
    month: monthStyle || IntlDateTimeFormatLong,
  }).format(date);
  const monthNameFirstLetterUpperCase = monthName.charAt(0).toUpperCase();
  return monthNameFirstLetterUpperCase + monthName.slice(1);
};

export const getYear = (date: DateConfig['date']) => date.getFullYear();

export const getTimeInMilliseconds = (date: DateConfig['date']) =>
  date.getTime();

export const getMonthNumberOfDays = (
  locale: LocaleLanguage,
  date: DateConfig['date'],
) => {
  const year = getYear(date);
  const month = getMonthIndex(locale, date) + 1;
  const getLastDayOfMonth = 0;
  return new Date(year, month, getLastDayOfMonth).getDate();
};

export const getDayOfWeek = (
  locale: LocaleLanguage,
  date: DateConfig['date'],
  weekdayStyle?: IntlDateTypeWeekdayStyle,
) => {
  const dayOfWeek = new Intl.DateTimeFormat(locale, {
    weekday: weekdayStyle || IntlDateTimeFormatLong,
  }).format(date);
  const dayOfWeekFirstLetterUpperCased = dayOfWeek.charAt(0).toUpperCase();
  return dayOfWeekFirstLetterUpperCased + dayOfWeek.slice(1);
};

export const getDayName = (dayOfWeek: number, locale: string) => {
  let dayName: string;
  const weekDays = getWeekDaysNames(locale);
  if (dayOfWeek === 0) {
    dayName = weekDays[WeekDays.SUNDAY].short;
  } else {
    dayName = weekDays[dayOfWeek - 1].short; // Monday (0) to Saturday (5)
  }
  return dayName;
};

export const getHoursOfTheDay = (
  locale: LocaleLanguage,
  year: DateConfig['year'],
  month: DateConfig['month'],
  day: DateConfig['day'],
) => {
  const formattedHours = [];

  const addZeroDigitsAfterDigits = (formattedHour: string) => {
    return formattedHour + ':00';
  };

  for (let i = 0; i < numberOfHoursInADay + 1; i++) {
    let formattedHour = new Intl.DateTimeFormat(locale, {
      hour: IntlDateTimeFormatNumeric,
    }).format(new Date(year, month, day, i));
    if (formattedHour.includes('AM') || formattedHour.includes('PM')) {
      const [time, period] = formattedHour.split(' ');
      formattedHour = get2DigitsValue(time) + ' ' + period;
    } else {
      formattedHour = addZeroDigitsAfterDigits(formattedHour);
    }
    formattedHours.push(formattedHour);
  }
  return formattedHours;
};
export const getFormattedDateString = (
  locale: LocaleLanguage,
  date: DateConfig['date'],
  options: Intl.DateTimeFormatOptions = {},
) => new Intl.DateTimeFormat(locale, options).format(date);

export const getFormattedDate = (
  locale: LocaleLanguage,
  date: DateConfig['date'],
  options: Intl.DateTimeFormatOptions = {},
) => new Date(getFormattedDateString(locale, date, options));

export const getCurrentMonthDays = (
  year: DateConfig['year'],
  month: DateConfig['month'],
  monthNumberOfDays: DateConfig['monthNumberOfDays'],
  monthStartingInZero = false,
) => {
  const monthDays = [...Array(monthNumberOfDays).keys()];
  return monthDays.map((day) => ({
    month: monthStartingInZero ? month : month + 1,
    day: day + 1,
    year: year,
  }));
};
export const getNextMonthDaysOnCurrentMonth = (
  month: DateConfig['month'],
  year: DateConfig['year'],
  monthNumberOfDays: DateConfig['monthNumberOfDays'],
  locale: string,
) => {
  const nextMonthDaysOnCurrentMonth: CalendarCellInfo[] = [];
  const weekDayNameWhenMonthEnds = getWeekDayName(
    year,
    month,
    monthNumberOfDays,
    locale,
  );
  const numberOfDaysOfNextMonth =
    numberOfDaysOfTheWeek -
    1 -
    numOfDaysFromOtherMonthOnCurrentCalendar(weekDayNameWhenMonthEnds, locale);

  for (let i = 0; i < numberOfDaysOfNextMonth; i++) {
    nextMonthDaysOnCurrentMonth.push({
      month: getMonthIndex(locale, new Date(year, month + 1)) + 1,
      day: firstDayOfTheMonth + i,
      year: getYear(new Date(year, month + 1)),
    });
  }
  return nextMonthDaysOnCurrentMonth;
};
export const getLastDayOfPreviousMonth = (
  time: DateConfig['timeInMilliseconds'],
): number => {
  const tempDate = new Date(time);
  tempDate.setDate(0);
  return tempDate.getDate();
};
export const getPreviousMonthDaysOnCurrentMonth = (
  month: DateConfig['month'],
  year: DateConfig['year'],
  time: DateConfig['timeInMilliseconds'],
  locale: string,
) => {
  const previousMonthDaysOnCurrentMonth: CalendarCellInfo[] = [];
  const lastDayOfPreviousMonth = getLastDayOfPreviousMonth(time);
  const weekDayNameWhenMonthStarts = getWeekDayName(
    year,
    month,
    firstDayOfTheMonth,
    locale,
  );
  const numberOfDaysOfPreviousMonth = numOfDaysFromOtherMonthOnCurrentCalendar(
    weekDayNameWhenMonthStarts,
    locale,
  );
  for (let i = 0; i < numberOfDaysOfPreviousMonth; i++) {
    previousMonthDaysOnCurrentMonth.push({
      month: getMonthIndex(locale, new Date(year, month - 1)) + 1,
      day: lastDayOfPreviousMonth - i,
      year: getYear(new Date(year, month - 1)),
    });
  }
  return previousMonthDaysOnCurrentMonth.reverse();
};

const is12HourClockSystem = (time: string) =>
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
    return [time, periodWithSpaceBef, hour, minutes];
  }
  const [hour, minutes] = formattedFullTime.split(':');
  const noPeriod = '';
  return [formattedFullTime, noPeriod, hour, minutes];
};
