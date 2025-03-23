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
  const localeLang = useSelector(getLocaleLanguage());
  const initialYear = useSelector(getInitialYear());
  const initialMonth = useSelector(getInitialMonth());
  const initialDay = useSelector(getInitialDay());
  const { date, day, dayOfWeek } = useDate(
    localeLang,
    initialYear,
    initialMonth,
    initialDay
  );

  return (
    <section className={styles.planner}>
      <div className={styles.plannerHeader}>
        <h2 className={styles.plannerHeaderLabel} id="calendar-month-name">
          <span>{getCurrentMonthName(date, localeLang, "short")}</span>
          <span> {day},</span>
          <span> {dayOfWeek.short}</span>
        </h2>
      </div>
    </section>
  );
};

export default Planner;
