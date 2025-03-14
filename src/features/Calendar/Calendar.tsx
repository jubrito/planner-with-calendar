import CalendarCells from "../../components/Calendar/CalendarCells/CalendarCells";
import CalendarWeeks from "../../components/Calendar/CalendarWeeks/CalendarWeeks";
import { useDate } from "../../hooks/useDate";
import useLocale from "../../hooks/useLocale";
import { getCurrentMonthName } from "../../utils/calendar/current";
import styles from "./_calendar.module.scss";

const Calendar = () => {
  const { locale } = useLocale();
  const dateConfig = useDate();
  const { date, year: currentYear } = dateConfig;
  const currentMonthName = getCurrentMonthName(date, locale);

  return (
    <section className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <div>
          <p>{"<"}</p>
        </div>
        <h2 className={styles.monthLabel} id="calendar-month-name">
          {`${currentMonthName}, ${currentYear}`}
        </h2>
        <div>
          <p>{">"}</p>
        </div>
      </div>
      <table aria-labelledby="calendar-month-name">
        <CalendarWeeks />
        <CalendarCells dateConfig={dateConfig} />
      </table>
    </section>
  );
};

export default Calendar;
