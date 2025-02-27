import { currentMonthName } from "../../utils/constants";
import styles from "./_calendar.module.scss";

const Calendar = () => {
  return (
    <section className={styles.calendar}>
      <div className={styles.monthLabel}>{currentMonthName}</div>
    </section>
  );
};

export default Calendar;
