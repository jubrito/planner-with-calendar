import { DateConfig } from '../../types/calendar/types';
import { LocaleLanguage } from '../../types/locale/types';

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

export const getFormatedDateString = (
  _locale: LocaleLanguage,
  date: DateConfig['date'],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _options: Intl.DateTimeFormatOptions = {},
) => {
  // console.log('getFormatedDateString date', date);
  return date.toISOString();
  // return new Intl.DateTimeFormat(locale, options).format(date);
};

export const getFormatedDate = (
  locale: LocaleLanguage,
  date: DateConfig['date'],
  options: Intl.DateTimeFormatOptions = {},
) => {
  // console.log('getFormatedDate date', date);
  // console.log(
  //   'getFormatedDateString(locale, date, options)',
  //   getFormatedDateString(locale, date, options),
  // );
  // console.log(
  //   'new Date(getFormatedDateString(locale, date, options))',
  //   new Date(getFormatedDateString(locale, date, options)),
  // );
  return new Date(getFormatedDateString(locale, date, options));
};
