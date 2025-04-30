import { useSelector } from 'react-redux';
import styles from './_planner.module.scss';
import {
  getSelectedDayViewDay,
  getSelectedDayViewDayOfWeek,
  getSelectedDayViewMonthName,
} from '../../redux/slices/dateSlice/selectors';
import { getLocaleLanguage } from '../../redux/slices/localeSlice/selectors';
import { IntlDateTimeFormatShort } from '../../utils/constants';
import { HoursOfTheDay } from '../../components/Planner/HoursOfTheDay/HoursOfTheDay';
import { EventContainer } from '../../components/Planner/EventsContainer/EventsContainer';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../components/ErrorFallback/ErrorFallback';
import { CurrentTime } from '../../components/Planner/CurrentTime/CurrentTime';

const Planner = () => {
  const locale = useSelector(getLocaleLanguage());
  const monthName = useSelector(
    getSelectedDayViewMonthName(locale, IntlDateTimeFormatShort),
  );
  const day = useSelector(getSelectedDayViewDay());
  const dayOfWeek = useSelector(getSelectedDayViewDayOfWeek(locale));
  const plannerDateLabel = `${monthName} ${day}, ${dayOfWeek}`;

  return (
    <section className={styles.planner}>
      <div className={styles.plannerHeader}>
        <h2 className={styles.plannerHeaderLabel} id="calendar-month-name">
          {plannerDateLabel}
        </h2>
      </div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className={styles.plannerHours}>
          <CurrentTime />
          <HoursOfTheDay />
          <EventContainer />
        </div>
      </ErrorBoundary>
    </section>
  );
};

export default Planner;
