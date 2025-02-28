import { weekDays, weekDaysWithAbbreviation } from "../../../utils/constants";
import styles from "./_calendar-weeks.module.scss";

const CalendarWeeks = () => {
  return (
    <div className={styles.weekDaysContainer}>
      {weekDaysWithAbbreviation.map((weekDay, weekDayIndex) => {
        return (
          <abbr
            key={weekDay}
            className={styles.weekDays}
            title={weekDays[weekDayIndex]}
          >
            {weekDay}
          </abbr>
        );
      })}
    </div>
  );
};

export default CalendarWeeks;
