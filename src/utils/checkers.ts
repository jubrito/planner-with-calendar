import { DateConfig, ObjectType } from '../types/calendar/types';
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
export const isObject = (obj: unknown): obj is ObjectType => {
  if (typeof obj != 'object' || obj === null || obj == null) return false;

  // Ensure it is plain object, not subclass such ass Array and Date
  const prototype = Object.getPrototypeOf(obj);
  if (prototype !== Object.prototype) return false;

  for (const key in obj) {
    if (typeof key !== 'string') return false;
  }

  return true;
};
