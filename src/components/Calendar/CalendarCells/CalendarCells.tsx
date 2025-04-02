import { numberOfDaysOfTheWeek } from '../../../utils/calendar/weeks';
import styles from './_calendar-cells.module.scss';
import { getCurrentMonthDays } from '../../../utils/calendar/current';
import { getPreviousMonthDaysOnCurrentMonth } from '../../../utils/calendar/previous';
import {
  fillLastCalendarRow,
  getNextMonthDaysOnCurrentMonth,
} from '../../../utils/calendar/next';
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

  const getPreviousCurrentAndNextMonthDays = useCallback(() => {
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

  const addExtraNextMonthRowIfOnlyFiveRows = useCallback(
    (calendarCellsByWeekChunks: CalendarCellInfo[][]) => {
      const chunks = calendarCellsByWeekChunks;
      const minimalNumberOfRows = 6;
      const onlyFiveRows = chunks.length < minimalNumberOfRows;

      if (onlyFiveRows) {
        const lastRow = chunks[chunks.length - 1];
        const lastCellInfo = lastRow[lastRow.length - 1];
        const cellIsAlreadyNextMonth = lastCellInfo.month !== month + 1; // 0 indexed
        const firstDayOfTheMonthZeroIndexed = firstDayOfTheMonth - 1;
        const nextMonth = lastCellInfo.month + 1;
        const nextMonthCellInfo = {
          year,
          month: nextMonth,
          day: firstDayOfTheMonthZeroIndexed,
        };
        // if last cell is current month, next cell should be from next month as there is no other day from this month
        const cellFromNextMonthInfo: CalendarCellInfo = cellIsAlreadyNextMonth
          ? lastCellInfo
          : nextMonthCellInfo;
        const nextEntireNextMonthDaysOnCurrentMonth = fillLastCalendarRow(
          cellFromNextMonthInfo,
        );
        chunks.push(nextEntireNextMonthDaysOnCurrentMonth);
      }
      return chunks;
    },
    [year, month],
  );

  const cellsMatrix = useMemo(() => {
    const allCalendarCells = getPreviousCurrentAndNextMonthDays();
    const calendarCellsByWeekChunks: CalendarCellInfo[][] =
      getChunkArrayByChunkSize(allCalendarCells, numberOfDaysOfTheWeek);
    const calendarCellsWith6Rows = addExtraNextMonthRowIfOnlyFiveRows(
      calendarCellsByWeekChunks,
    );
    return calendarCellsWith6Rows;
  }, [addExtraNextMonthRowIfOnlyFiveRows, getPreviousCurrentAndNextMonthDays]);

  return (
    <tbody className={styles.daysContainer}>
      {cellsMatrix &&
        cellsMatrix.map((week, weekIndex) => (
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

export default CalendarCells;
