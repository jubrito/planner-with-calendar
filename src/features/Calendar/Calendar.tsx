import { ErrorBoundary } from 'react-error-boundary';
import { CalendarMenu } from './components/CalendarMenu/CalendarMenu';
import styles from './_calendar.module.scss';
import { ErrorFallback } from '../../components/ErrorFallback/ErrorFallback';
import { useDispatch } from 'react-redux';
import { updateDayViewISODate } from '../../redux/slices/dateSlice';
import { clearEventOnViewMode } from '../../redux/slices/eventSlice';
import { Months } from '../../types/calendar/enums';
import CalendarCells from '../../components/Calendar/CalendarCells/CalendarCells';
import CalendarWeeks from '../../components/Calendar/CalendarWeeks/CalendarWeeks';

const Calendar = () => {
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
        <table aria-labelledby="calendar-month-name">
          <CalendarWeeks />
          <CalendarCells onCellClick={handleUpdateDayViewDate} />
        </table>
      </ErrorBoundary>
    </section>
  );
};

export default Calendar;
