import { DateConfig } from '../../types/calendar/types';
import { LocaleLanguage } from '../../types/locale/types';
import { getFormatedDateString } from './utils';

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

export const getFormatedDate = (
  locale: LocaleLanguage,
  date: DateConfig['date'],
  options: Intl.DateTimeFormatOptions = {},
) => new Date(getFormatedDateString(locale, date, options));
