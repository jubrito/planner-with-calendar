import { useSelector } from 'react-redux';
import { getSelectedGlobalDate } from '../../../redux/slices/dateSlice/selectors';
import { getLocaleLanguage } from '../../../redux/slices/localeSlice/selectors';
import { IntlDateTimeFormat2Digit } from '../../../utils/constants';
import {
  getFormattedDateString,
  getTimeInformation,
  is12HourClockSystem,
} from '../../../utils/calendar/utils';
import styles from './current-time.module.scss';

export const CurrentTime = () => {
  const locale = useSelector(getLocaleLanguage());
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
    <div className={styles.currentTime} style={{ top }}>
      <time
        dateTime={currentTimeDisplay}
        id="currentTime"
        data-testid="currentTime"
      >
        {currentTimeDisplay}
      </time>
    </div>
  );
};
