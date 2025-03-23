import { useSelector } from "react-redux";
import styles from "./_planner.module.scss";
import {
  getCurrentDay,
  getCurrentMonth,
  getCurrentYear,
} from "../../redux/slices/dateSlice/selectors";
import { useDate } from "../../hooks/useDate";
import { getLocaleLanguage } from "../../redux/slices/localeSlice/selectors";

const Planner = () => {
  const localeLang = useSelector(getLocaleLanguage());
  const year = useSelector(getCurrentYear());
  const month = useSelector(getCurrentMonth());
  const day = useSelector(getCurrentDay());
  const { dayOfWeek } = useDate(localeLang, year, month, day);

  return (
    <section className={styles.planner}>
      <div className={styles.plannerHeader}>
        <h2 className={styles.plannerHeaderLabel} id="calendar-month-name">
          {dayOfWeek.long}
        </h2>
      </div>
    </section>
  );
};

export default Planner;
