import { useRef } from 'react';
import styles from './_hours-of-the-day.module.scss';
import { getHoursOfTheDay } from '../../../utils/calendar/utils';
import { useSelector } from 'react-redux';
import { getLocaleLanguage } from '../../../redux/slices/localeSlice/selectors';
import {
  getSelectedDayViewDay,
  getSelectedDayViewMonth,
  getSelectedDayViewYear,
} from '../../../redux/slices/dateSlice/selectors';

export const HoursOfTheDay = () => {
  const locale = useSelector(getLocaleLanguage());
  const year = useSelector(getSelectedDayViewYear());
  const day = useSelector(getSelectedDayViewDay());
  const monthIndex = useSelector(getSelectedDayViewMonth(locale));
  const hoursOfTheDay = getHoursOfTheDay(locale, year, monthIndex, day);
  const hourOfTheDaySpanRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.hourOfTheDay} ref={hourOfTheDaySpanRef}>
      {hoursOfTheDay.map((hourOfTheDay, index) => {
        const id = (hourOfTheDay + index).toString().replace(' ', '');
        return (
          <div className={styles.container} key={id}>
            <span id={id}>{hourOfTheDay}</span>
            <hr className={styles.line} />
          </div>
        );
      })}
    </div>
  );
};
