import { ErrorBoundary } from 'react-error-boundary';
import CalendarCells from './components/CalendarCells/CalendarCells';
import { CalendarMenu } from './components/CalendarMenu/CalendarMenu';
import CalendarWeeks from './components/CalendarWeeks/CalendarWeeks';
import styles from './_calendar.module.scss';
import { ErrorFallback } from '../../components/ErrorFallback/ErrorFallback';

const Calendar = () => {
  return (
    <section className={styles.calendar}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <CalendarMenu />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <table aria-labelledby="calendar-month-name">
          <CalendarWeeks />
          <CalendarCells />
        </table>
      </ErrorBoundary>
    </section>
  );
};

export default Calendar;
