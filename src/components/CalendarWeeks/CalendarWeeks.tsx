import { weekDaysWithAbbreviation } from "../../utils/constants";
import styles from "./_calendar-weeks.module.scss";

const CalendarWeeks = () => {
  return (
    <div className={styles.weekDaysContainer}>
      {weekDaysWithAbbreviation.map((weekDay) => {
        return (
          <div key={weekDay} className={styles.weekDays}>
            {weekDay}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarWeeks;
