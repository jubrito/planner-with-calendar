import useLocale from "../../../hooks/useLocale";
import { getWeekDaysNames } from "../../../utils/calendar/weeks";
import styles from "./_calendar-weeks.module.scss";

const CalendarWeeks = () => {
  const { locale } = useLocale();
  const weekDays = getWeekDaysNames(locale);
  return (
    <thead className={styles.weekDaysContainer}>
      <tr>
        {weekDays.map((weekDay) => {
          return (
            <th scope="col" className={styles.weekDays} key={weekDay.long}>
              <abbr key={weekDay.long} title={weekDay.long} role="columnheader">
                <span aria-hidden="true">{weekDay.short}</span>
              </abbr>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default CalendarWeeks;
