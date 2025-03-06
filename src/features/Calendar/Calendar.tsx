import CalendarCells from "../../components/Calendar/CalendarCells/CalendarCells";
import CalendarWeeks from "../../components/Calendar/CalendarWeeks/CalendarWeeks";
import { useDate } from "../../hooks/useDate";
import useLocale from "../../hooks/useLocale";
import { getCurrentMonthName } from "../../utils/calendar/current";
import styles from "./_calendar.module.scss";

const Calendar = () => {
  const { locale } = useLocale();
  const { date } = useDate();
  const currentMonthName = getCurrentMonthName(date, locale);
  return (
    <section className={styles.calendar}>
      <div className={styles.monthLabel}>{currentMonthName}</div>
      <CalendarWeeks />
      <CalendarCells />
    </section>
  );
};

export default Calendar;
