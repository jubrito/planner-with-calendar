import { useRef } from 'react';
import styles from './_hours-of-the-day.module.scss';
import {
  get2DigitsValue,
  getHoursOfTheDay,
} from '../../../utils/calendar/utils';
import { useSelector } from 'react-redux';
import { getLocaleLanguage } from '../../../redux/slices/localeSlice/selectors';
import {
  getSelectedDayViewDay,
  getSelectedDayViewMonth,
  getSelectedDayViewYear,
} from '../../../redux/slices/dateSlice/selectors';
import { IntlDateTimeFormat2Digit } from '../../../utils/constants';

export const HoursOfTheDay = () => {
  const locale = useSelector(getLocaleLanguage());
  const year = useSelector(getSelectedDayViewYear());
  const day = useSelector(getSelectedDayViewDay());
  const monthIndex = useSelector(
    getSelectedDayViewMonth(locale, IntlDateTimeFormat2Digit),
  );
  const hoursOfTheDay = getHoursOfTheDay(locale, year, monthIndex, day);
  const hourOfTheDaySpanRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.hourOfTheDay} ref={hourOfTheDaySpanRef}>
      {hoursOfTheDay.map((hourOfTheDay, index) => {
        const dateTime = `${year}-${get2DigitsValue(monthIndex)}-${get2DigitsValue(day)} ${get2DigitsValue(index)}:00:00`;
        const id = (hourOfTheDay + index).toString().replace(' ', '');
        return (
          <div className={styles.container} key={id}>
            <time id={id} dateTime={dateTime}>
              {hourOfTheDay}
            </time>
            <hr className={styles.line} />
          </div>
        );
      })}
    </div>
  );
};
