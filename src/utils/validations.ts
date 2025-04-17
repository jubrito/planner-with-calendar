import { DateConfig } from '../types/calendar/types';
import { LocaleLanguage } from '../types/locale/types';
import { isValidDate, isValidLocale } from './checkers';

export const validateDateTimeFormatRequirements = (
  date: DateConfig['date'],
  locale: LocaleLanguage,
  valueName: string,
) => {
  if (!isValidDate(date))
    throw new Error(`Failed to ${valueName}, date is invalid`);
  if (!isValidLocale(locale))
    throw new Error(`Failed to ${valueName}, language is invalid`);
};
