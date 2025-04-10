import { DateConfig } from '../types/calendar/types';
import { ObjectType } from './constants';
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
export const isObject = (obj: unknown): obj is ObjectType =>
  typeof obj === 'object' &&
  obj != null &&
  !Array.isArray(obj) &&
  (Object.getPrototypeOf(obj) === Object.prototype || // not an instance of a subclass such as array or date
    Object.getPrototypeOf(obj) === null); // created with Object.create(null)
