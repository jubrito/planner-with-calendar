import { useEffect } from "react";
import CalendarCells from "../../components/Calendar/CalendarCells/CalendarCells";
import CalendarWeeks from "../../components/Calendar/CalendarWeeks/CalendarWeeks";
import { UpdateCalendarButton } from "../../components/Calendar/UpdateCalendarButton/UpdateCalendarButton";
import { useDate } from "../../hooks/useDate";
import useLocale from "../../hooks/useLocale";
import { getCurrentMonthName } from "../../utils/calendar/current";
import { getNextMonthIndex } from "../../utils/calendar/next";
import { getPreviousMonthIndex } from "../../utils/calendar/previous";
import styles from "./_calendar.module.scss";

const Calendar = () => {
  const { locale } = useLocale();
  const dateConfig = useDate();
  const { date, year, month, day, updateDate } = dateConfig;
  const currentMonthName = getCurrentMonthName(date, locale);

  return (
    <section className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <UpdateCalendarButton
          label={"Go to previous year"}
          symbol={"<<"}
          updateDate={() => updateDate(year - 1, month, day)}
        />
        <UpdateCalendarButton
          label={"Go to previous month"}
          symbol={"<"}
          updateDate={() => updateDate(year, getPreviousMonthIndex(month), day)}
        />
        <h2 className={styles.monthLabel} id="calendar-month-name">
          {`${currentMonthName}, ${year}`}
        </h2>
        <UpdateCalendarButton
          label={"Go to next month"}
          symbol={">"}
          updateDate={() => updateDate(year, getNextMonthIndex(month), day)}
        />
        <UpdateCalendarButton
          label={"Go to next year"}
          symbol={">>"}
          updateDate={() => updateDate(year + 1, month, day)}
        />
      </div>
      <table aria-labelledby="calendar-month-name">
        <CalendarWeeks />
        <CalendarCells dateConfig={dateConfig} />
      </table>
    </section>
  );
};

export default Calendar;
