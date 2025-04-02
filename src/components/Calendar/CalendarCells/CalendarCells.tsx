import { numberOfDaysOfTheWeek } from '../../../utils/calendar/weeks';
import styles from './_calendar-cells.module.scss';
import { getCurrentMonthDays } from '../../../utils/calendar/current';
import { getPreviousMonthDaysOnCurrentMonth } from '../../../utils/calendar/previous';
import { getNextMonthDaysOnCurrentMonth } from '../../../utils/calendar/next';
import { CalendarCellInfo } from '../../../types/calendar/types';
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

const fillLastRowWithNextMonthCells = (lastCellInfo: CalendarCellInfo) => {
  const nextMonthDaysLastRowCells: CalendarCellInfo[] = [];
  for (let i = 1; i < numberOfDaysOfTheWeek + 1; i++) {
    nextMonthDaysLastRowCells.push({
      month: lastCellInfo.month,
      day: lastCellInfo.day + i,
      year: lastCellInfo.year,
    });
  }
  return nextMonthDaysLastRowCells;
};

export default CalendarCells;
