import { weekDaysNames } from "../../../utils/constants";
import styles from "./_calendar-weeks.module.scss";

const CalendarWeeks = () => {
  const weekDays = weekDaysNames();
  return (
    <div className={styles.weekDaysContainer}>
      {weekDays.map((weekDay) => {
        return (
          <abbr
            key={weekDay.long}
            className={styles.weekDays}
            title={weekDay.long}
            role="columnheader"
          >
            <span aria-hidden="true">{weekDay.short}</span>
          </abbr>
        );
      })}
    </div>
  );
};

export default CalendarWeeks;
