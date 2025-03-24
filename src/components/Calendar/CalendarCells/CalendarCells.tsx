import { numberOfDaysOfTheWeek } from "../../../utils/calendar/weeks";
import styles from "./_calendar-cells.module.scss";
import { getCurrentMonthDays } from "../../../utils/calendar/current";
import { getPreviousMonthDaysOnCurrentMonth } from "../../../utils/calendar/previous";
import { getNextMonthDaysOnCurrentMonth } from "../../../utils/calendar/next";
import { CalendarCellInfo } from "../../../types/calendar/types";
import { Cell } from "./Cell/Cell";
import {
  getSelectedMonth,
  getSelectedMonthNumberOfDays,
  getSelectedTime,
  getSelectedYear,
} from "../../../redux/slices/dateSlice/selectors";
import { useSelector } from "react-redux";
import { getLocaleLanguage } from "../../../redux/slices/localeSlice/selectors";

const CalendarCells = () => {
  const locale = useSelector(getLocaleLanguage());
  const time = useSelector(getSelectedTime());
  const year = useSelector(getSelectedYear(locale));
  const month = useSelector(getSelectedMonth(locale));
  const monthNumberOfDays = useSelector(getSelectedMonthNumberOfDays(locale));
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
