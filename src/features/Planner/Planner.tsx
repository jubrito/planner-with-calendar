import { useSelector } from 'react-redux';
import styles from './_planner.module.scss';
import { getInitialDate } from '../../redux/slices/dateSlice/selectors';
import { useDate } from '../../hooks/useDate';
import { getLocaleLanguage } from '../../redux/slices/localeSlice/selectors';
import {
  getFullDateTitle,
  getHoursOfTheDay,
  getMonthName,
} from '../../utils/calendar/utils';
import { IntlDateTimeFormatShort } from '../../utils/constants';

const Planner = () => {
  const locale = useSelector(getLocaleLanguage());
  const initialDate = useSelector(getInitialDate());
  const { date, year, month, day, dayOfWeek } = useDate(locale, initialDate);
  const monthName = getMonthName(locale, date, IntlDateTimeFormatShort);
  const hoursOfTheDay = getHoursOfTheDay(locale, year, month, day);
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
                  aria-label={`${getFullDateTitle(year, month, day, locale)} ${hourOfTheDay}`}
                  title={`${getFullDateTitle(year, month, day, locale)} ${hourOfTheDay}`}
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
