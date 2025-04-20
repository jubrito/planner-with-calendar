import { useSelector } from 'react-redux';
import styles from './_planner.module.scss';
import {
  getSelectedDayViewDay,
  getSelectedDayViewDayOfWeek,
  getSelectedDayViewMonthName,
  getSelectedGlobalDate,
} from '../../redux/slices/dateSlice/selectors';
import { getLocaleLanguage } from '../../redux/slices/localeSlice/selectors';
import {
  IntlDateTimeFormat2Digit,
  IntlDateTimeFormatShort,
} from '../../utils/constants';
import { HoursOfTheDay } from './HoursOfTheDay/HoursOfTheDay';
import { ClickableHoursOfTheDay } from './ClickableHoursOfTheDay/ClickableHoursOfTheDay';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../components/ErrorFallback/ErrorFallback';
import {
  getFormattedDateString,
  getTimeInformation,
  is12HourClockSystem,
} from '../../utils/calendar/utils';

const Planner = () => {
  const locale = useSelector(getLocaleLanguage());
  const monthName = useSelector(
    getSelectedDayViewMonthName(locale, IntlDateTimeFormatShort),
  );
  const day = useSelector(getSelectedDayViewDay());
  const dayOfWeek = useSelector(getSelectedDayViewDayOfWeek(locale));
  const plannerDateLabel = `${monthName} ${day}, ${dayOfWeek}`;
  const date = useSelector(getSelectedGlobalDate());
  const currentHours = date.getHours();
  const currentMinutes = date.getMinutes();
  const fullFormattedCurrentTime = getFormattedDateString(locale, date, {
    hour: IntlDateTimeFormat2Digit,
    minute: IntlDateTimeFormat2Digit,
  });
  const [currentTime, _currentPeriod, currentHour, currentMins] =
    getTimeInformation(fullFormattedCurrentTime);
  const currentTimeDisplay = is12HourClockSystem(fullFormattedCurrentTime)
    ? `${currentHour}:${currentMins}`
    : currentTime;
  const startOfHoursBlockPx = 4;
  const sizeOfEachHourBlock = 50; // px
  const oneHour = 60;
  const sizeOfEachMinute = sizeOfEachHourBlock / oneHour;
  const top =
    startOfHoursBlockPx +
    currentHours * sizeOfEachHourBlock +
    currentMinutes * sizeOfEachMinute;

  return (
    <section className={styles.planner}>
      <div className={styles.plannerHeader}>
        <h2 className={styles.plannerHeaderLabel} id="calendar-month-name">
          {plannerDateLabel}
        </h2>
      </div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className={styles.plannerHours}>
          <div className={styles.currentHour} style={{ top }}>
            <span>{currentTimeDisplay}</span>
          </div>
          <HoursOfTheDay />
          <ClickableHoursOfTheDay />
        </div>
      </ErrorBoundary>
    </section>
  );
};

export default Planner;
