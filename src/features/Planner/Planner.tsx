import { useSelector } from "react-redux";
import styles from "./_planner.module.scss";
import { getInitialDate } from "../../redux/slices/dateSlice/selectors";
import { useDate } from "../../hooks/useDate";
import { getLocaleLanguage } from "../../redux/slices/localeSlice/selectors";
import { getMonthName } from "../../utils/calendar/utils";

const Planner = () => {
  const locale = useSelector(getLocaleLanguage());
  const initialDate = useSelector(getInitialDate(locale));
  const { date, day, dayOfWeek } = useDate(locale, initialDate);
  const monthName = getMonthName(locale, date, "short");

  return (
    <section className={styles.planner}>
      <div className={styles.plannerHeader}>
        <h2 className={styles.plannerHeaderLabel} id="calendar-month-name">
          {`${monthName} ${day}, ${dayOfWeek}`}
        </h2>
      </div>
    </section>
  );
};

export default Planner;
