import { useRef } from 'react';
import styles from './_hours-of-the-day.module.scss';
import { useSelector } from 'react-redux';
import { getLocaleLanguage } from '../../../../redux/slices/localeSlice/selectors';
import {
  getSelectedDayViewDay,
  getSelectedDayViewMonth,
  getSelectedDayViewYear,
} from '../../../../redux/slices/dateSlice/selectors';
import { IntlDateTimeFormat2Digit } from '../../../../utils/constants';
import {
  get2DigitsValue,
  getHoursOfTheDay,
} from '../../../../utils/calendar/utils';

export const HoursOfTheDay = () => {
  const locale = useSelector(getLocaleLanguage());
  const year = useSelector(getSelectedDayViewYear());
  const day = useSelector(getSelectedDayViewDay());
  const monthIndex = useSelector(
    getSelectedDayViewMonth(locale, IntlDateTimeFormat2Digit),
  );
  const hoursOfTheDay = getHoursOfTheDay(locale, false);
  const hourOfTheDaySpanRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.hourOfTheDay} ref={hourOfTheDaySpanRef}>
      {hoursOfTheDay.map((hourOfTheDay, index) => {
        const hour =
          get2DigitsValue(index) === '24' ? '00' : get2DigitsValue(index);
        const dateTime = `${year}-${get2DigitsValue(monthIndex)}-${get2DigitsValue(day)} ${hour}:00:00`;
        const id = (hourOfTheDay + index).toString().replace(' ', '');
        return (
          <time id={id} key={id} dateTime={dateTime}>
            {hourOfTheDay}
          </time>
        );
      })}
    </div>
  );
};
