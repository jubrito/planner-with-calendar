import { numberOfDaysOfTheWeek } from '../../../utils/calendar/constants';
import styles from './_calendar-cells.module.scss';
import {
  getCurrentMonthDays,
  getMonthIndex,
  getYear,
  numOfDaysFromOtherMonthOnCurrentCalendar,
} from '../../../utils/calendar/utils';
import { getPreviousMonthDaysOnCurrentMonth } from '../../../utils/calendar/utils';
import { CalendarCellInfo, DateConfig } from '../../../types/calendar/types';
import { Cell } from './Cell/Cell';
import {
  getSelectedGlobalMonth,
  getSelectedGlobalMonthNumberOfDays,
  getSelectedGlobalTimeInMilliseconds,
  getSelectedGlobalYear,
} from '../../../redux/slices/dateSlice/selectors';
import { useSelector } from 'react-redux';
import { getLocaleLanguage } from '../../../redux/slices/localeSlice/selectors';
import { useCallback, useMemo } from 'react';
import { getChunkArrayByChunkSize } from '../../../utils/utils';
import { firstDayOfTheMonth } from '../../../utils/calendar/constants';
import { getWeekDayName } from '../../../utils/calendar/weeks';

const CalendarCells = () => {
  const locale = useSelector(getLocaleLanguage());
  const time = useSelector(getSelectedGlobalTimeInMilliseconds());
  const year = useSelector(getSelectedGlobalYear());
  const month = useSelector(getSelectedGlobalMonth(locale));
  const monthNumberOfDays = useSelector(
    getSelectedGlobalMonthNumberOfDays(locale),
  );

  /**
   * Function to add the days from the current month and fill the
   * calendar with the days from the previous and next month
   *
   * @returns allCalendarCells: previous, current and next month days on current calendar
   */
  const getAllCalendarCells = useCallback(() => {
    const currentMonthDays: CalendarCellInfo[] = getCurrentMonthDays(
      year,
      month,
      monthNumberOfDays,
      false,
    );
    const previousMonthDaysOnCurrentMonth = getPreviousMonthDaysOnCurrentMonth(
      month,
      year,
      time,
      locale,
    );
    const nextMonthDaysOnCurrentMonth = getNextMonthDaysOnCurrentMonth(
      month,
      year,
      monthNumberOfDays,
      locale,
    );

    return [
      ...previousMonthDaysOnCurrentMonth,
      ...currentMonthDays,
      ...nextMonthDaysOnCurrentMonth,
    ];
  }, [locale, year, month, time, monthNumberOfDays]);

  /**
   * To prevent the calendar from changing height when
   * a month requires a 6th row (i.e., when month started in a
   * Sat or Sun, if a month has only 5 rows, we should cal this funcion to
   * add a new 6th row, filling it with the following days from the next month.
   *
   * @param chunks calendar chunked with 5 rows
   * @returns last extra row with following days of next month
   */
  const getRowWithNextMonthCells = useCallback(
    (chunks: CalendarCellInfo[][]) => {
      const lastRow = chunks[chunks.length - 1];
      const lastCellInfo = lastRow[lastRow.length - 1];
      const cellIsAlreadyNextMonth = lastCellInfo.month !== month + 1; // 0 indexed
      const firstDayOfTheMonthZeroIndexed = firstDayOfTheMonth - 1;
      const nextMonth = lastCellInfo.month + 1;
      const firstDayOfNextMonthCellInfo = {
        year,
        month: nextMonth,
        day: firstDayOfTheMonthZeroIndexed,
      };
      const cellFromNextMonthInfo: CalendarCellInfo = cellIsAlreadyNextMonth
        ? lastCellInfo
        : firstDayOfNextMonthCellInfo; // first cell of extra last row to fill calendar will always be from next month
      return fillLastRowWithNextMonthCells(cellFromNextMonthInfo);
    },
    [year, month],
  );

  const getCalendarWithSixRows = useCallback(
    (calendarCellsByWeekChunks: CalendarCellInfo[][]) => {
      const chunks = calendarCellsByWeekChunks;
      const minimalNumberOfRows = 6;
      const onlyFiveRows = chunks.length < minimalNumberOfRows;
      if (onlyFiveRows) chunks.push(getRowWithNextMonthCells(chunks));
      return chunks;
    },
    [getRowWithNextMonthCells],
  );

  const dayCellsChunked = useMemo(() => {
    const allCalendarCells = getAllCalendarCells();
    const calendarCellsByWeekChunks: CalendarCellInfo[][] =
      getChunkArrayByChunkSize(allCalendarCells, numberOfDaysOfTheWeek);
    return getCalendarWithSixRows(calendarCellsByWeekChunks);
  }, [getCalendarWithSixRows, getAllCalendarCells]);

  return (
    <tbody className={styles.daysContainer}>
      {dayCellsChunked &&
        dayCellsChunked.map((week, weekIndex) => (
          <tr key={weekIndex}>
            {week.map((calendarCell) => {
              const {
                day: cellDay,
                month: cellMonth,
                year: cellYear,
              } = calendarCell;
              return (
                <Cell
                  cellDay={cellDay}
                  cellMonth={cellMonth}
                  cellYear={cellYear}
                  currentMonth={month}
                  key={`${cellYear}-${cellMonth}-${cellDay}`}
                />
              );
            })}
          </tr>
        ))}
    </tbody>
  );
};

const fillLastRowWithNextMonthCells = (lastCellInfo: CalendarCellInfo) =>
  Array.from(Array(numberOfDaysOfTheWeek).keys()).map((day) => ({
    month: lastCellInfo.month,
    day: lastCellInfo.day + day + 1,
    year: lastCellInfo.year,
  }));

const getNextMonthDaysOnCurrentMonth = (
  month: DateConfig['month'],
  year: DateConfig['year'],
  monthNumberOfDays: DateConfig['monthNumberOfDays'],
  locale: string,
) => {
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
  const numbersOfDaysOfNextMonth = Array.from(
    Array(numberOfDaysOfNextMonth).keys(),
  );
  return numbersOfDaysOfNextMonth.map((day) => ({
    month: getMonthIndex(locale, new Date(year, month + 1)) + 1,
    day: firstDayOfTheMonth + day,
    year: getYear(new Date(year, month + 1)),
  }));
};

export default CalendarCells;
