import { useSelector } from 'react-redux';
import styles from './_planner.module.scss';
import {
  getSelectedDayViewDay,
  getSelectedDayViewDayOfWeek,
  getSelectedDayViewMonth,
  getSelectedDayViewMonthName,
  getSelectedDayViewYear,
} from '../../redux/slices/dateSlice/selectors';
import { getLocaleLanguage } from '../../redux/slices/localeSlice/selectors';
import { getFullDateTitle, getHoursOfTheDay } from '../../utils/calendar/utils';
import { IntlDateTimeFormatShort } from '../../utils/constants';

const Planner = () => {
  const locale = useSelector(getLocaleLanguage());
  const monthName = useSelector(
    getSelectedDayViewMonthName(locale, IntlDateTimeFormatShort),
  );
  const monthIndex = useSelector(getSelectedDayViewMonth(locale));
  const day = useSelector(getSelectedDayViewDay());
  const dayOfWeek = useSelector(getSelectedDayViewDayOfWeek(locale));
  const year = useSelector(getSelectedDayViewYear());
  const hoursOfTheDay = getHoursOfTheDay(locale, year, monthIndex, day);
  const plannerDateLabel = `${monthName} ${day}, ${dayOfWeek}`;

  return (
    <section className={styles.planner}>
      <div className={styles.plannerHeader}>
        <h2 className={styles.plannerHeaderLabel} id="calendar-month-name">
          {plannerDateLabel}
        </h2>
      </div>
      <div className={styles.hoursWrapper}>
        <div className={styles.hoursOfTheDayWrapper}>
          <div className={styles.hoursOfTheDay}>
            {hoursOfTheDay.map((hourOfTheDay, index) => {
              return (
                <div
                  className={styles.hoursOfTheDayRow}
                  key={hourOfTheDay + index}
                  aria-label={`${getFullDateTitle(year, monthIndex, day, locale)} ${hourOfTheDay}`}
                  title={`${getFullDateTitle(year, monthIndex, day, locale)} ${hourOfTheDay}`}
                >
                  <span className={styles.hoursOfTheDay}>{hourOfTheDay}</span>
                  <span className={styles.hoursOfTheDayLine}></span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Planner;
