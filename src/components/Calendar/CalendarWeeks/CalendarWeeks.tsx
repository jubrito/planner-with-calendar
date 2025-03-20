import { useSelector } from "react-redux";
import { getWeekDaysNames } from "../../../utils/calendar/weeks";
import styles from "./_calendar-weeks.module.scss";
import { getLocaleLanguage } from "../../../redux/slices/localeSlice/selectors";

const CalendarWeeks = () => {
  const localeLang = useSelector(getLocaleLanguage());
  const weekDays = getWeekDaysNames(localeLang);

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
