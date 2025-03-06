import useLocale from "../../../hooks/useLocale";
import { WeekDays, WeekDaysShortNames } from "../../../utils/enums";
import {
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
import { DateConfig } from "../../../types/calendar/Date";

type CalendarCellsProps = {
  dateConfig: DateConfig;
};
const CalendarCells = ({ dateConfig }: CalendarCellsProps) => {
  const { locale } = useLocale();
  const { year, month, monthNumberOfDays, time } = dateConfig;

  const getDayName = (dayOfWeek: number) => {
    let dayName: WeekDaysShortNames;
    const weekDays = getWeekDaysNames(locale);
    if (dayOfWeek === 0) {
      dayName = weekDays[WeekDays.SUNDAY].short;
    } else {
      dayName = weekDays[dayOfWeek - 1].short; // Monday (0) to Saturday (5)
    }
    return dayName;
  };

  const getWeekDayNameWhenMonthStarts = (): WeekDaysShortNames => {
    const firstDayOfTheMonthDate = new Date(year, month, 1);
    const dayOfWeek = firstDayOfTheMonthDate.getDay();
    return getDayName(dayOfWeek);
  };

  const getWeekDayNameWhenMonthEnds = (): WeekDaysShortNames => {
    const lastDayOfTheMonthDate = new Date(year, month, monthNumberOfDays);

    const dayOfWeek = lastDayOfTheMonthDate.getDay();
    return getDayName(dayOfWeek);
  };

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
    const weekDayNameWhenMonthStarts: WeekDaysShortNames =
      getWeekDayNameWhenMonthStarts();
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
    const weekDayNameWhenMonthEnds: WeekDaysShortNames =
      getWeekDayNameWhenMonthEnds();

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

  const chunkArray = <T,>(array: T[]): T[][] => {
    const chunks = [];
    for (let i = 0; i < array.length; i += numberOfDaysOfTheWeek) {
      chunks.push(array.slice(i, i + numberOfDaysOfTheWeek));
    }
    return chunks;
  };

  return (
    <tbody className={styles.daysContainer}>
      {chunkArray(currentMonthDaysWithPreviousAndNextMonths()).map(
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
