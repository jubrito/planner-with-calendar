import { DateConfig } from '../../types/calendar/types';
import { LocaleLanguage } from '../../types/locale/types';
import { getDateISOString } from './utils';

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
  locale: LocaleLanguage,
  date: DateConfig['date'],
  options: Intl.DateTimeFormatOptions = {},
) => {
  return new Intl.DateTimeFormat(locale, options).format(date);
};

// export const getDateISOString = (date: DateConfig['date']) => {
//   return date.toISOString();
// };

export const getFormatedDate = (
  _locale: LocaleLanguage,
  date: DateConfig['date'],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _options: Intl.DateTimeFormatOptions = {},
) => {
  // new
  // return new Date(getFormatedDateString(locale, date, options));
  return new Date(getDateISOString(date));
};
