import { useSelector } from 'react-redux';
import styles from './_planner.module.scss';
import { getLocaleLanguage } from '../../redux/slices/localeSlice/selectors';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../components/ErrorFallback/ErrorFallback';
import { CurrentTime } from './components/CurrentTime/CurrentTime';
import { HoursOfTheDay } from './components/HoursOfTheDay/HoursOfTheDay';
import { EventContainer } from './components/EventsContainer/EventsContainer';
import { isToday } from '../../utils/checkers';
import { Header } from './components/Header/Header';
import { getSelectedDayViewDate } from '../../redux/slices/dateSlice/selectors';

const Planner = () => {
  const locale = useSelector(getLocaleLanguage());
  const date = useSelector(getSelectedDayViewDate());

  return (
    <section className={styles.planner}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Header />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className={styles.plannerHours}>
          {isToday(locale, date) && <CurrentTime />}
          <HoursOfTheDay />
          <EventContainer />
        </div>
      </ErrorBoundary>
    </section>
  );
};

export default Planner;
