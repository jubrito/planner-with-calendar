import { CalendarCellInfo, DateConfig } from '../../types/calendar/types';
import { getWeekDayName } from './weeks';
import {
  getMonthIndex,
  getYear,
  numOfDaysFromOtherMonthOnCurrentCalendar,
} from './utils';
import { firstDayOfTheMonth } from './constants';

export const getLastDayOfPreviousMonth = (
  time: DateConfig['timeInMilliseconds'],
): number => {
  const tempDate = new Date(time);
  tempDate.setDate(0);
  return tempDate.getDate();
};

export const getPreviousMonthDaysOnCurrentMonth = (
  month: DateConfig['month'],
  year: DateConfig['year'],
  time: DateConfig['timeInMilliseconds'],
  locale: string,
) => {
  const previousMonthDaysOnCurrentMonth: CalendarCellInfo[] = [];
  const lastDayOfPreviousMonth = getLastDayOfPreviousMonth(time);
  const weekDayNameWhenMonthStarts = getWeekDayName(
    year,
    month,
    firstDayOfTheMonth,
    locale,
  );
  const numberOfDaysOfPreviousMonth = numOfDaysFromOtherMonthOnCurrentCalendar(
    weekDayNameWhenMonthStarts,
    locale,
  );
  for (let i = 0; i < numberOfDaysOfPreviousMonth; i++) {
    previousMonthDaysOnCurrentMonth.push({
      month: getMonthIndex(locale, new Date(year, month - 1)) + 1,
      day: lastDayOfPreviousMonth - i,
      year: getYear(new Date(year, month - 1)),
    });
  }
  return previousMonthDaysOnCurrentMonth.reverse();
};
