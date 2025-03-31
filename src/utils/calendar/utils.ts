import { Months, WeekDays } from '../../types/calendar/enums';
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
import { numberOfBlocksOnPlannerHour, todayLabel } from './constants';
import { isToday } from '../checkers';
import { getWeekDaysNames } from './weeks';

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
) =>
  isToday(locale, new Date(year, month, day))
    ? todayLabel
    : new Intl.DateTimeFormat(locale, {
        dateStyle: IntlDateTimeFormatFull,
      }).format(new Date(year, month, day));

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
  const formatedDate = new Intl.DateTimeFormat(locale, {
    month: monthStyle || IntlDateTimeFormatNumeric,
  }).format(date);
  const zeroBaseMonthNumber = parseInt(formatedDate) - 1;
  return zeroBaseMonthNumber;
};

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
) =>
  new Intl.DateTimeFormat(locale, {
    weekday: weekdayStyle || IntlDateTimeFormatLong,
  }).format(date);

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
  const numberOfHours = 24;
  const formatedHours = [];

  const addZeroDigitBeforeSingleDigits = (formatedHour: string) => {
    const [digits, period] = formatedHour.split(' ');
    let formatedHourWithZero = formatedHour;
    if (digits.length === 1) {
      formatedHourWithZero = '0' + digits + ' ' + period;
    }
    return formatedHourWithZero;
  };

  const addZeroDigitsAfterDigits = (formatedHour: string) => {
    return formatedHour + ':00';
  };

  for (let i = 0; i < numberOfHours + 1; i++) {
    let formatedHour = new Intl.DateTimeFormat(locale, {
      hour: IntlDateTimeFormatNumeric,
    }).format(new Date(year, month, day, i));
    if (formatedHour.includes('AM') || formatedHour.includes('PM')) {
      formatedHour = addZeroDigitBeforeSingleDigits(formatedHour);
    } else {
      formatedHour = addZeroDigitsAfterDigits(formatedHour);
    }
    formatedHours.push(formatedHour);
  }
  return formatedHours;
};
export const getFormatedDateString = (
  locale: LocaleLanguage,
  date: DateConfig['date'],
  options: Intl.DateTimeFormatOptions = {},
) => new Intl.DateTimeFormat(locale, options).format(date);

export const getFormatedDate = (
  locale: LocaleLanguage,
  date: DateConfig['date'],
  options: Intl.DateTimeFormatOptions = {},
) => new Date(getFormatedDateString(locale, date, options));

export const getPlannerHourBlockStartValues = (elementHeight: number) => {
  const numberOfHours = 24;
  // Divide element height (which contans 24h) by 24 * 4 to result in 4 blocks of 15min on every hour
  const numberOfBlocks = numberOfBlocksOnPlannerHour * numberOfHours;
  const clickableHourBlockSize = elementHeight / numberOfBlocks;
  const blocks = Array.from(Array(numberOfBlocks).keys(), (item) => item + 1);
  const blocksStartValue = [0];
  for (const block of blocks) {
    const currentBlock = clickableHourBlockSize * block;
    blocksStartValue.push(currentBlock);
  }
  return blocksStartValue;
};

export const getBlockByVerticalPosition = (
  elementHeight: number,
  relativePositionY: number,
) => {
  if (!relativePositionY) {
    return undefined;
  }
  const horizontalValue = relativePositionY;
  const plannerHourBlockStartValues =
    getPlannerHourBlockStartValues(elementHeight);

  for (const blockStarValue of plannerHourBlockStartValues) {
    const block = plannerHourBlockStartValues.indexOf(blockStarValue);
    if (horizontalValue <= blockStarValue) {
      return block;
    }
  }
  return numberOfBlocksOnPlannerHour;
};
