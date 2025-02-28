import CalendarCells from "../../components/Calendar/CalendarCells/CalendarCells";
import CalendarWeeks from "../../components/Calendar/CalendarWeeks/CalendarWeeks";
import { currentMonthName } from "../../utils/constants";
import styles from "./_calendar.module.scss";

const Calendar = () => {
  return (
    <section className={styles.calendar}>
      <div className={styles.monthLabel}>{currentMonthName}</div>
      <CalendarWeeks />
      <CalendarCells />
    </section>
  );
};

export default Calendar;
