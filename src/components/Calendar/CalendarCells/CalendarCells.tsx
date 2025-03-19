import useLocale from "../../../hooks/useLocale";
import { numberOfDaysOfTheWeek } from "../../../utils/calendar/weeks";
import styles from "./_calendar-cells.module.scss";
import { getCurrentMonthDays } from "../../../utils/calendar/current";
import { getPreviousMonthDaysOnCurrentMonth } from "../../../utils/calendar/previous";
import { getNextMonthDaysOnCurrentMonth } from "../../../utils/calendar/next";
import { CalendarCellInfo } from "../../../types/calendar/types";
import { Cell } from "./Cell/Cell";
import {
  getCurrentMonth,
  getCurrentMonthNumberOfDays,
  getCurrentTime,
  getCurrentYear,
} from "../../../redux/slices/dateSlice/selectors";
import { useSelector } from "react-redux";

const CalendarCells = () => {
  const { locale } = useLocale();
  const time = useSelector(getCurrentTime());
  const year = useSelector(getCurrentYear());
  const month = useSelector(getCurrentMonth());
  const monthNumberOfDays = useSelector(getCurrentMonthNumberOfDays());
  const getPreviousCurrentAndNextMonthDays = () => {
    const currentMonthDays: CalendarCellInfo[] = getCurrentMonthDays(
      year,
      month,
      monthNumberOfDays,
      false
    );
    const previousMonthDaysOnCurrentMonth = getPreviousMonthDaysOnCurrentMonth(
      month,
      year,
      time,
      locale
    );
    const nextMonthDaysOnCurrentMonth = getNextMonthDaysOnCurrentMonth(
      month,
      year,
      monthNumberOfDays,
      locale
    );

    return [
      ...previousMonthDaysOnCurrentMonth,
      ...currentMonthDays,
      ...nextMonthDaysOnCurrentMonth,
    ];
  };

  const chunkArrayByWeek = (
    array: CalendarCellInfo[]
  ): CalendarCellInfo[][] => {
    const chunks = [];
    for (let i = 0; i < array.length; i += numberOfDaysOfTheWeek) {
      chunks.push(array.slice(i, i + numberOfDaysOfTheWeek));
    }
    return chunks;
  };

  return (
    <tbody className={styles.daysContainer}>
      {chunkArrayByWeek(getPreviousCurrentAndNextMonthDays()).map(
        (week, weekIndex) => (
          <tr key={weekIndex}>
            {week.map((filledCurrentMonthDay) => {
              const {
                day: cellDay,
                month: cellMonth,
                year: cellYear,
              } = filledCurrentMonthDay;
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
        )
      )}
    </tbody>
  );
};

export default CalendarCells;
