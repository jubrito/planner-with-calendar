import useLocale from "../../../hooks/useLocale";
import { WeekDaysShortNames } from "../../../types/calendar/enums";
import {
  getWeekDayName,
  getWeekDaysNames,
  numberOfDaysOfTheWeek,
} from "../../../utils/calendar/weeks";
import styles from "./_calendar-cells.module.scss";
import { getCurrentMonthDaysInfo } from "../../../utils/calendar/current";
import {
  getPreviousMonthIndex,
  getPreviousMonthYear,
} from "../../../utils/calendar/previous";
import {
  getNextMonthIndex,
  getNextMonthYear,
} from "../../../utils/calendar/next";
import { DateConfig } from "../../../types/calendar/types";

type CalendarCellsProps = {
  dateConfig: DateConfig;
};
const CalendarCells = ({ dateConfig }: CalendarCellsProps) => {
  const { locale } = useLocale();
  const { year, month, monthNumberOfDays, time } = dateConfig;

  const numOfDaysFromOtherMonthOnCurrentCalendar = (
    weekDayName: WeekDaysShortNames
  ) => getWeekDaysNames(locale).findIndex((name) => weekDayName === name.short);

  const currentMonthDaysWithPreviousMonth = () => {
    var date = new Date(time);
    date.setDate(0);
    const lastDayOfPreviousMonth = date.getDate();
    const filledArray = getCurrentMonthDaysInfo(
      year,
      month,
      monthNumberOfDays
    ).map((currentMonthDay) => ({
      ...currentMonthDay,
      month: currentMonthDay.month + 1,
    }));
    const weekDayNameWhenMonthStarts: WeekDaysShortNames = getWeekDayName(
      year,
      month,
      1,
      locale
    );
    const numberOfDaysOfPreviousMonth =
      numOfDaysFromOtherMonthOnCurrentCalendar(weekDayNameWhenMonthStarts);

    for (let i = 0; i < numberOfDaysOfPreviousMonth; i++) {
      filledArray.unshift({
        month: getPreviousMonthIndex(month) + 1,
        day: lastDayOfPreviousMonth - i,
        year: getPreviousMonthYear(year, month),
      });
    }

    return filledArray;
  };

  const currentMonthDaysWithPreviousAndNextMonths = () => {
    const firstDayOfNextMonth = 1;
    const filledArray = [...currentMonthDaysWithPreviousMonth()];
    const weekDayNameWhenMonthEnds: WeekDaysShortNames = getWeekDayName(
      year,
      month,
      monthNumberOfDays,
      locale
    );

    const numberOfDaysOfNextMonth =
      numberOfDaysOfTheWeek -
      1 -
      numOfDaysFromOtherMonthOnCurrentCalendar(weekDayNameWhenMonthEnds);

    for (let i = 0; i < numberOfDaysOfNextMonth; i++) {
      filledArray.push({
        month: getNextMonthIndex(month) + 1,
        day: firstDayOfNextMonth + i,
        year: getNextMonthYear(year, month),
      });
    }
    return filledArray;
  };

  const chunkArrayByWeek = <T,>(array: T[]): T[][] => {
    const chunks = [];
    for (let i = 0; i < array.length; i += numberOfDaysOfTheWeek) {
      chunks.push(array.slice(i, i + numberOfDaysOfTheWeek));
    }
    return chunks;
  };

  return (
    <tbody className={styles.daysContainer}>
      {chunkArrayByWeek(currentMonthDaysWithPreviousAndNextMonths()).map(
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
