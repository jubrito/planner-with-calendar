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
  // console.log('useDate:');
  // console.log('initialDate', initialDate);
  // console.log('getInitialDate\n', getInitialDate(locale, initialDate));
  const [formatedDate, setFormatedDate] = useState(initialDate || new Date());

  const updateDate = (year: number, month: number, day: number) => {
    setFormatedDate(new Date(year, month, day));
  };

  return {
    date: formatedDate,
    updateDate,
    day: getDay(locale, formatedDate),
    month: getMonthIndex(locale, formatedDate),
    year: getYear(locale, formatedDate),
    timeInMilliseconds: getTimeInMilliseconds(formatedDate),
    dayOfWeek: getDayOfWeek(locale, formatedDate),
    monthNumberOfDays: getMonthNumberOfDays(locale, formatedDate),
  };
};
