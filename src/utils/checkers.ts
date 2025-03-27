import { DateConfig } from '../types/calendar/types';
import { LocaleLanguage } from '../types/locale/types';
import { getDay, getMonthIndex, getYear } from './calendar/utils';

export const isToday = (locale: LocaleLanguage, date: DateConfig['date']) => {
  const currentDate = new Date();
  return (
    getYear(date) === getYear(currentDate) &&
    getMonthIndex(locale, date) === getMonthIndex(locale, currentDate) &&
    getDay(date) === getDay(currentDate)
  );
};
