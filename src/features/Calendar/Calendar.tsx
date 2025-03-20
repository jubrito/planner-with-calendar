import CalendarCells from "../../components/Calendar/CalendarCells/CalendarCells";
import { CalendarMenu } from "../../components/Calendar/CalendarMenu/CalendarMenu";
import CalendarWeeks from "../../components/Calendar/CalendarWeeks/CalendarWeeks";
import styles from "./_calendar.module.scss";

const Calendar = () => {
  return (
    <section className={styles.calendar}>
      <CalendarMenu />
      <table aria-labelledby="calendar-month-name">
        <CalendarWeeks />
        <CalendarCells />
      </table>
    </section>
  );
};

export default Calendar;
