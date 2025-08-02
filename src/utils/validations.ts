import { DateConfig } from '../types/calendar/types';
import { LocaleLanguage } from '../types/locale/types';
import { isValidDate, isValidLocale } from './checkers';

export const validateDate = (date: DateConfig['date'], valueName: string) => {
  if (!isValidDate(date))
    throw new Error(`Failed to ${valueName}, date is invalid`);
};

export const validateLocale = (locale: LocaleLanguage, valueName: string) => {
  if (!isValidLocale(locale))
    throw new Error(`Failed to ${valueName}, language is invalid`);
};
