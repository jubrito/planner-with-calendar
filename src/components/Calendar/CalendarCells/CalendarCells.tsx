import {
  currentMonth,
  currentMonthDays,
  currentMonthNumberOfDays,
  currentYear,
  nextMonth,
  nextMonthYear,
  numberOfDaysOfTheWeek,
  previousMonth,
  previousMonthYear,
  weekDaysNames,
} from "../../../utils/constants";
import { WeekDays, WeekDaysShortNames } from "../../../utils/enums";
import styles from "./_calendar-cells.module.scss";

const CalendarCells = () => {
  const getDayName = (dayOfWeek: number) => {
    let dayName: WeekDaysShortNames;
    const weekDays = weekDaysNames();
    if (dayOfWeek === 0) {
      dayName = weekDays[WeekDays.SUNDAY].short;
    } else {
      dayName = weekDays[dayOfWeek - 1].short; // Monday (0) to Saturday (5)
    }
    return dayName;
  };

  const getWeekDayNameWhenMonthStarts = (): WeekDaysShortNames => {
    const firstDayOfTheMonthDate = new Date(currentYear, currentMonth, 1);
    const dayOfWeek = firstDayOfTheMonthDate.getDay();
    return getDayName(dayOfWeek);
  };

  const getWeekDayNameWhenMonthEnds = (): WeekDaysShortNames => {
    const lastDayOfTheMonthDate = new Date(
      currentYear,
      currentMonth,
      currentMonthNumberOfDays
    );
    const dayOfWeek = lastDayOfTheMonthDate.getDay();
    return getDayName(dayOfWeek);
  };

  const numOfDaysFromOtherMonthOnCurrentCalendar = (
    weekDayName: WeekDaysShortNames
  ) => weekDaysNames().findIndex((name) => weekDayName === name.short);

  const currentMonthDaysWithPreviousMonth = () => {
    var date = new Date();
    date.setDate(0);
    const lastDayOfPreviousMonth = date.getDate();
    const filledArray = [...currentMonthDays];
    const weekDayNameWhenMonthStarts: WeekDaysShortNames =
      getWeekDayNameWhenMonthStarts();
    const numberOfDaysOfPreviousMonth =
      numOfDaysFromOtherMonthOnCurrentCalendar(weekDayNameWhenMonthStarts);

    for (let i = 0; i < numberOfDaysOfPreviousMonth; i++) {
      filledArray.unshift({
        month: previousMonth,
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
        month: nextMonth,
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
            filledCurrentMonthDay.month === currentMonth.toString()
              ? styles.currentMonthDay
              : styles.otherMonthDay
          }`;
          const fullDate = `${filledCurrentMonthDay.year}-${filledCurrentMonthDay.month}-${filledCurrentMonthDay.day}`;
          return (
            <time
              key={filledCurrentMonthDay.month + filledCurrentMonthDay.day}
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
