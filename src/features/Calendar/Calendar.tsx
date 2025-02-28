import CalendarWeeks from "../../components/Calendar/CalendarWeeks/CalendarWeeks";
import {
  currentMonth,
  currentMonthDays,
  currentMonthName,
  currentMonthNumberOfDays,
  currentYear,
  nextMonthName,
  previousMonthName,
  weekDays,
  weekDaysWithAbbreviation,
} from "../../utils/constants";
import { WeekDaysNamesAbbreviations } from "../../utils/enums";
import styles from "./_calendar.module.scss";

const Calendar = () => {
  const getDayName = (dayOfWeek: number) => {
    let dayName: WeekDaysNamesAbbreviations;
    if (dayOfWeek === 0) {
      dayName = weekDaysWithAbbreviation[6]; // Sunday (6)
    } else {
      dayName = weekDaysWithAbbreviation[dayOfWeek - 1]; // Monday (0) to Saturday (5)
    }
    return dayName;
  };

  const getWeekDayNameWhenMonthStarts = (): WeekDaysNamesAbbreviations => {
    const firstDayOfTheMonthDate = new Date(currentYear, currentMonth, 1);
    const dayOfWeek = firstDayOfTheMonthDate.getDay();
    return getDayName(dayOfWeek);
  };

  const getWeekDayNameWhenMonthEnds = (): WeekDaysNamesAbbreviations => {
    const lastDayOfTheMonthDate = new Date(
      currentYear,
      currentMonth,
      currentMonthNumberOfDays
    );
    const dayOfWeek = lastDayOfTheMonthDate.getDay();
    return getDayName(dayOfWeek);
  };

  const numOfDaysFromOtherMonthOnCurrentCalendar = (
    weekDayName: WeekDaysNamesAbbreviations
  ) => weekDaysWithAbbreviation.indexOf(weekDayName);

  const currentMonthDaysWithPreviousMonth = () => {
    var date = new Date();
    date.setDate(0);
    const lastDayOfPreviousMonth = date.getDate();
    const filledArray = [...currentMonthDays];
    const weekDayNameWhenMonthStarts: WeekDaysNamesAbbreviations =
      getWeekDayNameWhenMonthStarts();
    const numberOfDaysOfPreviousMonth =
      numOfDaysFromOtherMonthOnCurrentCalendar(weekDayNameWhenMonthStarts);

    for (let i = 0; i < numberOfDaysOfPreviousMonth; i++) {
      filledArray.unshift({
        month: previousMonthName,
        day: lastDayOfPreviousMonth - i,
      });
    }

    return filledArray;
  };

  const currentMonthDaysWithPreviousAndNextMonths = () => {
    const firstDayOfNextMonth = 1;
    const filledArray = [...currentMonthDaysWithPreviousMonth()];
    const weekDayNameWhenMonthEnds: WeekDaysNamesAbbreviations =
      getWeekDayNameWhenMonthEnds();

    const numberOfDaysOfNextMonth =
      weekDays.length -
      1 -
      numOfDaysFromOtherMonthOnCurrentCalendar(weekDayNameWhenMonthEnds);

    for (let i = 0; i < numberOfDaysOfNextMonth; i++) {
      filledArray.push({
        month: nextMonthName,
        day: firstDayOfNextMonth + i,
      });
    }
    return filledArray;
  };

  return (
    <section className={styles.calendar}>
      <div className={styles.monthLabel}>{currentMonthName}</div>
      <CalendarWeeks />
      <div className={styles.daysContainer}>
        {currentMonthDaysWithPreviousAndNextMonths().map(
          (filledCurrentMonthDay) => {
            const combinedClasses = `${styles.dayCell} ${
              filledCurrentMonthDay.month === currentMonthName
                ? styles.currentMonthDay
                : styles.otherMonthDay
            }`;
            return (
              <div
                key={filledCurrentMonthDay.month + filledCurrentMonthDay.day}
                className={combinedClasses}
              >
                {filledCurrentMonthDay.day}
              </div>
            );
          }
        )}
      </div>
    </section>
  );
};

export default Calendar;
