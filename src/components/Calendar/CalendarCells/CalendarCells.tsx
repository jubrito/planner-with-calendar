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

const CalendarCells = () => {
  const locale = useSelector(getLocaleLanguage());
  const time = useSelector(getSelectedGlobalTimeInMilliseconds());
  const year = useSelector(getSelectedGlobalYear());
  const month = useSelector(getSelectedGlobalMonth(locale));
  const monthNumberOfDays = useSelector(
    getSelectedGlobalMonthNumberOfDays(locale),
  );

  const getPreviousCurrentAndNextMonthDays = () => {
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
  };

  const chunkCalendarCellsByWeek = (
    array: CalendarCellInfo[],
  ): CalendarCellInfo[][] => {
    const chunks = [];
    for (let i = 0; i < array.length; i += numberOfDaysOfTheWeek) {
      chunks.push(array.slice(i, i + numberOfDaysOfTheWeek));
    }

    const onlyFiveRows = chunks.length - 1 === 4;
    const setFixedCalendarHeight = (chunks: CalendarCellInfo[][]) => {
      if (onlyFiveRows) {
        const lastRow = chunks[chunks.length - 1];
        const lastCellInfo = lastRow[lastRow.length - 1];
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
    };
    setFixedCalendarHeight(chunks);
    return chunks;
  };

  return (
    <tbody className={styles.daysContainer}>
      {chunkCalendarCellsByWeek(getPreviousCurrentAndNextMonthDays()).map(
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
