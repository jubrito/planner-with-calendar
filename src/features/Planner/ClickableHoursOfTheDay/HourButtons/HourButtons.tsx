import { useSelector } from 'react-redux';
import { numberOfHoursInADay } from '../../../../utils/calendar/constants';
import {
  getFormattedDateString,
  getTimeInformation,
} from '../../../../utils/calendar/utils';
import { getLocaleLanguage } from '../../../../redux/slices/localeSlice/selectors';
import {
  getSelectedGlobalDay,
  getSelectedGlobalMonth,
  getSelectedGlobalYear,
} from '../../../../redux/slices/dateSlice/selectors';
import { IntlDateTimeFormat2Digit } from '../../../../utils/constants';
import styles from './hour-buttons.module.scss';

export const HourButtons = () => {
  const twentyFourHours = Array.from(Array(numberOfHoursInADay).keys());
  const localeString = useSelector(getLocaleLanguage());
  const year = useSelector(getSelectedGlobalYear());
  const month = useSelector(getSelectedGlobalMonth(localeString));
  const day = useSelector(getSelectedGlobalDay());

  return (
    <>
      {twentyFourHours.map((index) => {
        const startHour = getFormattedDateString(
          localeString,
          new Date(year, month, day, index),
          {
            hour: IntlDateTimeFormat2Digit,
            minute: IntlDateTimeFormat2Digit,
          },
        );
        const endHour = getFormattedDateString(
          localeString,
          new Date(year, month, day, index + 1),
          {
            hour: IntlDateTimeFormat2Digit,
            minute: IntlDateTimeFormat2Digit,
          },
        );
        const [startTime, startPeriod] = getTimeInformation(startHour);
        const [endTime, endPeriod] = getTimeInformation(endHour);
        const updatedStartPeriod = startPeriod !== endPeriod ? startPeriod : '';
        const range = `range ${startTime}${updatedStartPeriod} to ${endTime}${endPeriod}`;
        const title = `Click, hold, and drag to create an event within the ${range}`;
        return (
          <div
            onClick={(e) => e.preventDefault()}
            className={styles.hourBlock}
            title={title}
            key={range}
          />
        );
      })}
    </>
  );
};
