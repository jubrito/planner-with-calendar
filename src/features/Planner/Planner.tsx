import { useSelector } from "react-redux";
import styles from "./_planner.module.scss";
import {
  getInitialDay,
  getInitialMonth,
  getInitialYear,
} from "../../redux/slices/dateSlice/selectors";
import { useDate } from "../../hooks/useDate";
import { getLocaleLanguage } from "../../redux/slices/localeSlice/selectors";
import { getCurrentMonthName } from "../../utils/calendar/current";

const Planner = () => {
  const locale = useSelector(getLocaleLanguage());
  const initialYear = useSelector(getInitialYear());
  const initialMonth = useSelector(getInitialMonth());
  const initialDay = useSelector(getInitialDay(locale));
  const { date, day, dayOfWeek } = useDate(
    locale,
    initialYear,
    initialMonth,
    initialDay
  );

  return (
    <section className={styles.planner}>
      <div className={styles.plannerHeader}>
        <h2 className={styles.plannerHeaderLabel} id="calendar-month-name">
          {`${getCurrentMonthName(locale, date, "short")} ${day}, ${
            dayOfWeek.short
          }`}
        </h2>
      </div>
    </section>
  );
};

export default Planner;
