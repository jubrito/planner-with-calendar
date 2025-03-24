import { useSelector } from "react-redux";
import styles from "./_planner.module.scss";
import {
  getInitialDate,
  getInitialDay,
  getInitialMonth,
  getInitialYear,
} from "../../redux/slices/dateSlice/selectors";
import { useDate } from "../../hooks/useDate";
import { getLocaleLanguage } from "../../redux/slices/localeSlice/selectors";
import { getCurrentMonthName } from "../../utils/calendar/current";
import { useEffect } from "react";

const Planner = () => {
  const locale = useSelector(getLocaleLanguage());
  const initialYear = useSelector(getInitialYear());
  const initialMonth = useSelector(getInitialMonth());
  const initialDay = useSelector(getInitialDay());
  const initialDate = useSelector(getInitialDate(locale));
  const { date, day, dayOfWeek } = useDate(
    locale,
    initialYear,
    initialMonth,
    initialDay
  );

  useEffect(() => {
    console.log("RESULT");
    console.log("EXPECTED:", new Date());
    console.log("RESULT:", initialDate);
  }, []);

  return (
    <section className={styles.planner}>
      <div className={styles.plannerHeader}>
        <h2 className={styles.plannerHeaderLabel} id="calendar-month-name">
          {`${getCurrentMonthName(date, locale, "short")} ${day}, ${
            dayOfWeek.short
          }`}
        </h2>
      </div>
    </section>
  );
};

export default Planner;
