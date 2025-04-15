import { useState } from 'react';
import { DateConfig } from '../types/calendar/types';
import { LocaleLanguage } from '../types/locale/types';
import {
  getDay,
  getDayOfWeek,
  getMonthIndex,
  getMonthNumberOfDays,
  getTimeInMilliseconds,
  getYear,
} from '../utils/calendar/utils';

export const useDate = (
  locale: LocaleLanguage,
  initialDate?: DateConfig['date'],
): DateConfig => {
  const [formattedDate, setFormattedDate] = useState(initialDate || new Date());

  const updateDate = (year: number, month: number, day: number) => {
    setFormattedDate(new Date(year, month, day));
  };

  return {
    date: formattedDate,
    updateDate,
    day: getDay(formattedDate),
    month: getMonthIndex(locale, formattedDate),
    year: getYear(formattedDate),
    timeInMilliseconds: getTimeInMilliseconds(formattedDate),
    dayOfWeek: getDayOfWeek(locale, formattedDate),
    monthNumberOfDays: getMonthNumberOfDays(locale, formattedDate),
  };
};
