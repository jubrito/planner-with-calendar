import { ErrorBoundary } from 'react-error-boundary';
import { CalendarMenu } from './components/CalendarMenu/CalendarMenu';
import styles from './_main-calendar.module.scss';
import { ErrorFallback } from '../../components/ErrorFallback/ErrorFallback';
import { useDispatch } from 'react-redux';
import { updateDayViewISODate } from '../../redux/slices/dateSlice';
import { clearEventOnViewMode } from '../../redux/slices/eventSlice';
import { Months } from '../../types/calendar/enums';
import { Calendar } from '../../components/Calendar/Calendar/Calendar';

const MainCalendar = () => {
  const dispatch = useDispatch();

  const handleUpdateDayViewDate = (
    cellYear: number,
    cellMonth: Months,
    cellDay: number,
  ) => {
    dispatch(
      updateDayViewISODate({
        year: cellYear,
        month: cellMonth - 1,
        day: cellDay,
      }),
    );
    dispatch(
      // hide view events modal
      clearEventOnViewMode(),
    );
  };

  return (
    <section className={styles.calendar}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <CalendarMenu />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div aria-labelledby="calendar-month-name">
          <Calendar onCellClick={handleUpdateDayViewDate} />
        </div>
      </ErrorBoundary>
    </section>
  );
};

export default MainCalendar;
