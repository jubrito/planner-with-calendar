import { useEffect } from "react";
import {
  currentMonth,
  currentMonthDays,
  currentMonthName,
  currentMonthNumberOfDays,
  currentYear,
  previousMonthNumberOfDays,
  weekDays,
  weekDaysWithAbbreviation,
} from "../../utils/constants";
import { WeekDaysNamesAbbreviations } from "../../utils/enums";
import styles from "./_calendar.module.scss";

const Calendar = () => {
  const getWeekDayNameWhenMonthStarts = (): WeekDaysNamesAbbreviations => {
    const firstDayOfTheMonthDate = new Date(currentYear, currentMonth, 1);
    const dayOfWeek = firstDayOfTheMonthDate.getDay();
    let dayName: WeekDaysNamesAbbreviations;
    if (dayOfWeek === 0) {
      dayName = weekDaysWithAbbreviation[6]; // Sunday (6)
    } else {
      dayName = weekDaysWithAbbreviation[dayOfWeek - 1]; // Monday (0) to Saturday (5)
    }
    return dayName;
  };
  const getWeekDayNameWhenMonthEnds = (): WeekDaysNamesAbbreviations => {
    const lastDayOfTheMonthDate = new Date(
      currentYear,
      currentMonth,
      currentMonthNumberOfDays
    );
    const dayOfWeek = lastDayOfTheMonthDate.getDay();
    let dayName: WeekDaysNamesAbbreviations;
    if (dayOfWeek === 0) {
      dayName = weekDaysWithAbbreviation[6]; // Sunday (6)
    } else {
      dayName = weekDaysWithAbbreviation[dayOfWeek - 1]; // Monday (0) to Saturday (5)
    }
    return dayName;
  };

  const numOfDaysFromPreviousMonthOnCurrentCalendar = () => {
    let previousMonthDays = 0;
    const weekDayNameWhenMonthStarts: WeekDaysNamesAbbreviations =
      getWeekDayNameWhenMonthStarts();

    for (const weekDay of weekDaysWithAbbreviation) {
      if (weekDay === weekDayNameWhenMonthStarts) return previousMonthDays;
      previousMonthDays++;
    }
    return previousMonthDays;
  };

  const filledCurrentMonthDays = () => {
    const filledArray = [...currentMonthDays];
    var date = new Date();
    date.setDate(0);
    const lastDayOfPreviousMonth = date.getDate();
    const numberOfDaysOfPreviousMonth =
      numOfDaysFromPreviousMonthOnCurrentCalendar();

    console.log("lastDayOfPreviousMonth", lastDayOfPreviousMonth);
    console.log("numberOfDaysOfPreviousMonth", numberOfDaysOfPreviousMonth);
    for (let i = 0; i < numberOfDaysOfPreviousMonth; i++) {
      // console.log("i", i);
      console.log("lastDayOfPreviousMonth - i", lastDayOfPreviousMonth - i);
      filledArray.unshift(lastDayOfPreviousMonth - i);
    }
    return filledArray;
  };
  console.log("filledCurrentMonthDays()", filledCurrentMonthDays());
  console.log("currentMonthDays", currentMonthDays);

  return (
    <section className={styles.calendar}>
      <div className={styles.monthLabel}>{currentMonthName}</div>
      <div className={styles.weekDaysContainer}>
        {weekDaysWithAbbreviation.map((weekDay) => {
          return (
            <div key={weekDay} className={styles.weekDays}>
              {weekDay}
            </div>
          );
        })}
      </div>
      <div className={styles.daysContainer}>
        {filledCurrentMonthDays().map((filledCurrentMonthDay) => {
          return (
            <div key={filledCurrentMonthDay} className={styles.dayCell}>
              {filledCurrentMonthDay + 1}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Calendar;
