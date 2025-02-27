import {
  currentMonthDays,
  currentMonthName,
  weekDays,
  weekDaysWithAbbreviation,
} from "../../utils/constants";
import styles from "./_calendar.module.scss";

const Calendar = () => {
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
        {currentMonthDays.map((currentMonthDay) => {
          return (
            <div key={currentMonthDay} className={styles.dayCell}>
              {currentMonthDay + 1}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Calendar;
