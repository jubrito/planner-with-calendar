import { config } from "../../../features/Calendar/config";
import useLocale from "../../../hooks/useLocale";
import {
  currentMonthDays,
  nextMonth,
  nextMonthYear,
  previousMonth,
  previousMonthYear,
} from "../../../utils/constants";
import { WeekDays, WeekDaysShortNames } from "../../../utils/enums";
import {
  getWeekDaysNames,
  numberOfDaysOfTheWeek,
} from "../../../utils/calendar/weeks";
import styles from "./_calendar-cells.module.scss";

const CalendarCells = () => {
  const { locale } = useLocale();

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
    const firstDayOfTheMonthDate = new Date(
      config.today.year,
      config.today.month,
      1
    );
    const dayOfWeek = firstDayOfTheMonthDate.getDay();
    return getDayName(dayOfWeek);
  };

  const getWeekDayNameWhenMonthEnds = (): WeekDaysShortNames => {
    const lastDayOfTheMonthDate = new Date(
      config.today.year,
      config.today.month,
      config.today.monthNumberOfDays
    );

    const dayOfWeek = lastDayOfTheMonthDate.getDay();
    return getDayName(dayOfWeek);
  };

  const numOfDaysFromOtherMonthOnCurrentCalendar = (
    weekDayName: WeekDaysShortNames
  ) => getWeekDaysNames(locale).findIndex((name) => weekDayName === name.short);

  const currentMonthDaysWithPreviousMonth = () => {
    var date = new Date(config.today.date.getTime());
    date.setDate(0);
    const lastDayOfPreviousMonth = date.getDate();
    const filledArray = currentMonthDays.map((currentMonthDay) => ({
      ...currentMonthDay,
      month: currentMonthDay.month + 1,
    }));
    const weekDayNameWhenMonthStarts: WeekDaysShortNames =
      getWeekDayNameWhenMonthStarts();
    const numberOfDaysOfPreviousMonth =
      numOfDaysFromOtherMonthOnCurrentCalendar(weekDayNameWhenMonthStarts);

    for (let i = 0; i < numberOfDaysOfPreviousMonth; i++) {
      filledArray.unshift({
        month: previousMonth + 1,
        day: lastDayOfPreviousMonth - i,
        year: previousMonthYear,
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
        month: nextMonth + 1,
        day: firstDayOfNextMonth + i,
        year: nextMonthYear,
      });
    }
    return filledArray;
  };

  return (
    <div className={styles.daysContainer}>
      {currentMonthDaysWithPreviousAndNextMonths().map(
        (filledCurrentMonthDay) => {
          const combinedClasses = `${styles.dayCell} ${
            filledCurrentMonthDay.month === config.today.month + 1
              ? styles.currentMonthDay
              : styles.otherMonthDay
          }`;
          const fullDate = `${filledCurrentMonthDay.year}-${filledCurrentMonthDay.month}-${filledCurrentMonthDay.day}`;
          return (
            <time
              key={`${filledCurrentMonthDay.year} +
                ${filledCurrentMonthDay.month} +
                ${filledCurrentMonthDay.day}`}
              className={combinedClasses}
              dateTime={fullDate}
              role="gridcell"
              title={fullDate}
            >
              <span aria-hidden="true" tabIndex={-1}>
                {filledCurrentMonthDay.day}
              </span>
            </time>
          );
        }
      )}
    </div>
  );
};

export default CalendarCells;
