import { numberOfDaysOfTheWeek } from '../../../utils/calendar/weeks';
import styles from './_calendar-cells.module.scss';
import { getCurrentMonthDays } from '../../../utils/calendar/current';
import { getPreviousMonthDaysOnCurrentMonth } from '../../../utils/calendar/previous';
import {
  getEntireNextMonthDaysLastRowOnCurrentMonth,
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
import { firstDayOfTheMonth } from '../../../utils/calendar/constants';
import { useCallback, useEffect, useState } from 'react';
import { chunkArrayWithNElements } from '../../../utils/utils';

const CalendarCells = () => {
  const locale = useSelector(getLocaleLanguage());
  const time = useSelector(getSelectedGlobalTimeInMilliseconds());
  const year = useSelector(getSelectedGlobalYear());
  const month = useSelector(getSelectedGlobalMonth(locale));
  const monthNumberOfDays = useSelector(
    getSelectedGlobalMonthNumberOfDays(locale),
  );
  const [calendarCellsMatrix, setCalendarCellsMatrix] =
    useState<CalendarCellInfo[][]>();

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
        // TODO refactor to make it more understandable
        const updatedLastCellInfo: CalendarCellInfo =
          lastCellInfo.month === month + 1
            ? {
                year,
                month: lastCellInfo.month + 1,
                day: firstDayOfTheMonth - 1,
              }
            : lastCellInfo;
        const nextEntireNextMonthDaysOnCurrentMonth =
          getEntireNextMonthDaysLastRowOnCurrentMonth(updatedLastCellInfo);
        chunks.push(nextEntireNextMonthDaysOnCurrentMonth);
      }
      return chunks;
    },
    [year, month],
  );

  useEffect(() => {
    // const calendarCellsByWeekChunks = (): CalendarCellInfo[][] = chunkCalendarCellsByWeek
    const allCalendarCells = getPreviousCurrentAndNextMonthDays();
    const calendarCellsByWeekChunks: CalendarCellInfo[][] =
      chunkArrayWithNElements(allCalendarCells, numberOfDaysOfTheWeek);
    const calendarCellsWith6Rows = addExtraNextMonthRowIfOnlyFiveRows(
      calendarCellsByWeekChunks,
    );
    setCalendarCellsMatrix(calendarCellsWith6Rows);
  }, [addExtraNextMonthRowIfOnlyFiveRows, getPreviousCurrentAndNextMonthDays]);

  return (
    <tbody className={styles.daysContainer}>
      {calendarCellsMatrix &&
        calendarCellsMatrix.map(
          // {chunkCalendarCellsByWeek(getPreviousCurrentAndNextMonthDays()).map(
          (week, weekIndex) => (
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
          ),
        )}
    </tbody>
  );
};

export default CalendarCells;
