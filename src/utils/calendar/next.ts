import { CalendarCellInfo, DateConfig } from '../../types/calendar/types';
import { getWeekDayName, numberOfDaysOfTheWeek } from './weeks';
import {
  getMonthIndex,
  getYear,
  numOfDaysFromOtherMonthOnCurrentCalendar,
} from './utils';
import { firstDayOfTheMonth } from './constants';

export const getNextMonthDaysOnCurrentMonth = (
  month: DateConfig['month'],
  year: DateConfig['year'],
  monthNumberOfDays: DateConfig['monthNumberOfDays'],
  locale: string,
) => {
  const nextMonthDaysOnCurrentMonth: CalendarCellInfo[] = [];
  const weekDayNameWhenMonthEnds = getWeekDayName(
    year,
    month,
    monthNumberOfDays,
    locale,
  );
  const numberOfDaysOfNextMonth =
    numberOfDaysOfTheWeek -
    1 -
    numOfDaysFromOtherMonthOnCurrentCalendar(weekDayNameWhenMonthEnds, locale);

  for (let i = 0; i < numberOfDaysOfNextMonth; i++) {
    nextMonthDaysOnCurrentMonth.push({
      month: getMonthIndex(locale, new Date(year, month + 1)) + 1,
      day: firstDayOfTheMonth + i,
      year: getYear(new Date(year, month + 1)),
    });
  }
  return nextMonthDaysOnCurrentMonth;
};

export const getEntireNextMonthDaysLastRowOnCurrentMonth = (
  lastCellInfo: CalendarCellInfo,
) => {
  const nextMonthDaysLastRowCells: CalendarCellInfo[] = [];

  for (let i = 1; i < numberOfDaysOfTheWeek + 1; i++) {
    console.log('numberOfDaysOfTheWeek', numberOfDaysOfTheWeek);
    nextMonthDaysLastRowCells.push({
      month: lastCellInfo.month,
      day: lastCellInfo.day + i,
      year: lastCellInfo.year,
    });
    // console.log('BEF nextMonthDaysLastRowCells', nextMonthDaysLastRowCells);
    // console.log('AFT nextMonthDaysLastRowCells', nextMonthDaysLastRowCells);
  }
  // for (const dayOfWeek of Array.from(
  //   Array(numberOfDaysOfTheWeek).keys(),
  //   (day) => day + 1,
  // )) {
  //   console.log('dayOfWeek', dayOfWeek);
  // }

  // nextMonthDaysOnCurrentMonth.map((nextMonthDayFromPreviuosWeek) => ({
  //   month: nextMonthDayFromPreviuosWeek.month,
  //   day: nextMonthDayFromPreviuosWeek.day + 1,
  //   year: nextMonthDayFromPreviuosWeek.year,
  // }));
  return nextMonthDaysLastRowCells;
};
