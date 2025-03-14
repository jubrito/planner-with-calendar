import useLocale from "../../../hooks/useLocale";
import { WeekDaysShortNames } from "../../../types/calendar/enums";
import {
  getWeekDayName,
  numberOfDaysOfTheWeek,
} from "../../../utils/calendar/weeks";
import styles from "./_calendar-cells.module.scss";
import {
  firstDayOfTheMonth,
  getCurrentMonthDays,
} from "../../../utils/calendar/current";
import { getPreviousMonthDaysOnCurrentMonth } from "../../../utils/calendar/previous";
import {
  getNextMonthIndex,
  getNextMonthYear,
} from "../../../utils/calendar/next";
import { CalendarCellInfo, DateConfig } from "../../../types/calendar/types";
import { numOfDaysFromOtherMonthOnCurrentCalendar } from "../../../utils/calendar/utils";

type CalendarCellsProps = {
  dateConfig: DateConfig;
};
const CalendarCells = ({ dateConfig }: CalendarCellsProps) => {
  const { locale } = useLocale();
  const { year, month, monthNumberOfDays, time } = dateConfig;

  const getNextMonthDaysOnCurrentMonth = () => {
    const nextMonthDaysOnCurrentMonth: CalendarCellInfo[] = [];
    const weekDayNameWhenMonthEnds: WeekDaysShortNames = getWeekDayName(
      year,
      month,
      monthNumberOfDays,
      locale
    );
    const numberOfDaysOfNextMonth =
      numberOfDaysOfTheWeek -
      1 -
      numOfDaysFromOtherMonthOnCurrentCalendar(
        weekDayNameWhenMonthEnds,
        locale
      );

    for (let i = 0; i < numberOfDaysOfNextMonth; i++) {
      nextMonthDaysOnCurrentMonth.push({
        month: getNextMonthIndex(month) + 1,
        day: firstDayOfTheMonth + i,
        year: getNextMonthYear(year, month),
      });
    }
    return nextMonthDaysOnCurrentMonth;
  };

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
    const nextMonthDaysOnCurrentMonth = getNextMonthDaysOnCurrentMonth();

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
              const fullDate = `${filledCurrentMonthDay.year}-${filledCurrentMonthDay.month}-${filledCurrentMonthDay.day}`;
              return (
                <td
                  scope="col"
                  key={`${filledCurrentMonthDay.year} +
                ${filledCurrentMonthDay.month} +
                ${filledCurrentMonthDay.day}`}
                  className={
                    filledCurrentMonthDay.month === month + 1
                      ? styles.currentMonthDay
                      : styles.otherMonthDay
                  }
                >
                  <time dateTime={fullDate} title={fullDate}>
                    <span aria-hidden="true" tabIndex={-1}>
                      {filledCurrentMonthDay.day}
                    </span>
                  </time>
                </td>
              );
            })}
          </tr>
        )
      )}
    </tbody>
  );
};

export default CalendarCells;
