import { useRef } from 'react';
import styles from './_hours-of-the-day.module.scss';
import { useSelector } from 'react-redux';
import { getLocaleLanguage } from '../../../../redux/slices/localeSlice/selectors';
import {
  getSelectedDayViewDay,
  getSelectedDayViewMonth,
  getSelectedDayViewYear,
} from '../../../../redux/slices/dateSlice/selectors';
import {
  IntlDateTimeFormat2Digit,
  IntlDateTimeFormatNumeric,
} from '../../../../utils/constants';
import {
  get2DigitsValue,
  getTimeInformation,
  is12HourClockSystem,
} from '../../../../utils/calendar/utils';
import { DateConfig } from '../../../../types/calendar/types';
import { numberOfHoursInADay } from '../../../../utils/calendar/constants';
import { LocaleLanguage } from '../../../../types/locale/types';

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

const getHoursOfTheDay = (
  locale: LocaleLanguage,
  year: DateConfig['year'],
  month: DateConfig['month'],
  day: DateConfig['day'],
) => {
  const hoursInADay = Array.from(Array(numberOfHoursInADay + 1).keys());
  return hoursInADay.map((hours) => {
    const formattedHour = new Intl.DateTimeFormat(locale, {
      hour: IntlDateTimeFormatNumeric,
    }).format(new Date(year, month, day, hours));
    const [time, period, hour] = getTimeInformation(formattedHour);
    if (is12HourClockSystem(formattedHour)) {
      return time + period;
    }
    return hour + ':00';
  });
};
