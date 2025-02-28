import { weekDays, weekDaysWithAbbreviation } from "../../../utils/constants";
import styles from "./_calendar-weeks.module.scss";

const CalendarWeeks = () => {
  return (
    <div className={styles.weekDaysContainer}>
      {weekDaysWithAbbreviation.map((weekDay, weekDayIndex) => {
        return (
          <div
            key={weekDay}
            className={styles.weekDays}
            aria-label={weekDays[weekDayIndex]}
          >
            <span aria-hidden="true">{weekDay}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarWeeks;
