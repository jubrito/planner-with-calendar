import { currentMonthName, weekDays } from "../../utils/constants";
import styles from "./_calendar.module.scss";

const Calendar = () => {
  return (
    <section className={styles.calendar}>
      <div className={styles.monthLabel}>{currentMonthName}</div>
      <div className={styles.weekDaysContainer}>
        {weekDays.map((weekDay) => {
          return (
            <div key={weekDay} className={styles.weekDays}>
              {weekDay}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Calendar;
