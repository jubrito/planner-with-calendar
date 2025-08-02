import { DateConfig } from '../types/calendar/types';
import { ObjectType } from '../types/types';
import { LocaleLanguage } from '../types/locale/types';
import { getDay, getMonthIndex, getYear } from './calendar/utils';
import { validateDate, validateLocale } from './validations';

export const isToday = (locale: LocaleLanguage, date: DateConfig['date']) => {
  const errorMessage = 'determine if current date is today';
  validateDate(date, errorMessage);
  validateLocale(locale, errorMessage);
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

export const isValidDate = (date: Date) =>
  date instanceof Date && !isNaN(date.getTime());

/**
 * Checks if a locale is valid/supported by the browser's Intl API.
 * @param locale - Locale string (e.g., "en-US", "pt-BR").
 * @returns 'true' if the locale is valid, 'false' otherwise.
 */
export const isValidLocale = (
  locale: LocaleLanguage,
): locale is LocaleLanguage => {
  try {
    const sample = new Intl.DateTimeFormat(locale).format(new Date());
    return !!sample;
  } catch {
    return false;
  }
};
