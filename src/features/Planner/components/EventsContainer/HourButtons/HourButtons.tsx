import { useSelector } from 'react-redux';
import { memo } from 'react';
import { numberOfHoursInADay } from '../../../../../utils/calendar/constants';
import { getLocaleLanguage } from '../../../../../redux/slices/localeSlice/selectors';
import {
  getSelectedGlobalDay,
  getSelectedGlobalMonth,
  getSelectedGlobalYear,
} from '../../../../../redux/slices/dateSlice/selectors';
import styles from './hour-buttons.module.scss';
import { LocaleLanguage } from '../../../../../types/locale/types';
import { DateConfig } from '../../../../../types/calendar/types';
import {
  getFormattedDateString,
  getTimeInformation,
  is12HourClockSystem,
} from '../../../../../utils/calendar/utils';
import { IntlDateTimeFormat2Digit } from '../../../../../utils/constants';

export const HourButtons = memo(() => {
  const twentyFourHours = Array.from(Array(numberOfHoursInADay).keys());
  const locale = useSelector(getLocaleLanguage());
  const year = useSelector(getSelectedGlobalYear());
  const month = useSelector(getSelectedGlobalMonth(locale));
  const day = useSelector(getSelectedGlobalDay());

  return (
    <>
      {twentyFourHours.map((index) => {
        const range = getHourRange(locale, year, month, day, index);
        const title = `Click, hold, and drag to create an event within ${range}`;
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
});

const getHourRange = (
  locale: LocaleLanguage,
  year: DateConfig['year'],
  month: DateConfig['month'],
  day: DateConfig['day'],
  index: number,
) => {
  const startFullHour = getFormattedDateString(
    locale,
    new Date(year, month, day, index),
    {
      hour: IntlDateTimeFormat2Digit,
      minute: IntlDateTimeFormat2Digit,
    },
  );
  const endFullHour = getFormattedDateString(
    locale,
    new Date(year, month, day, index + 1),
    {
      hour: IntlDateTimeFormat2Digit,
      minute: IntlDateTimeFormat2Digit,
    },
  );
  const [startTime, startPeriod, startHour] = getTimeInformation(startFullHour);
  const [endTime, endPeriod, endHour] = getTimeInformation(endFullHour);
  const updatedStartPeriod = startPeriod !== endPeriod ? startPeriod : '';
  const updatedStart = is12HourClockSystem(startFullHour)
    ? startHour
    : startTime;
  const updatedEnd = is12HourClockSystem(endFullHour) ? endHour : endTime;
  return `${updatedStart}${updatedStartPeriod} to ${updatedEnd}${endPeriod}`;
};
