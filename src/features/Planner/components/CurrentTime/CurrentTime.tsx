import { useSelector } from 'react-redux';
import styles from './current-time.module.scss';
import { getLocaleLanguage } from '../../../../redux/slices/localeSlice/selectors';
import { getSelectedDayViewDate } from '../../../../redux/slices/dateSlice/selectors';
import {
  getFormattedDateString,
  getTimeInformation,
  is12HourClockSystem,
} from '../../../../utils/calendar/utils';
import { IntlDateTimeFormat2Digit } from '../../../../utils/constants';
import { useEffect, useState } from 'react';
import { sizeOfEachHourBlock } from '../../../../utils/calendar/constants';

export const CurrentTime = () => {
  const currentTimeElementId = 'currentTime';
  const locale = useSelector(getLocaleLanguage());
  const date = useSelector(getSelectedDayViewDate());
  const fullFormattedCurrentTime = getFormattedDateString(locale, date, {
    hour: IntlDateTimeFormat2Digit,
    minute: IntlDateTimeFormat2Digit,
  });
  const [time, setTime] = useState(getCurrentTime(fullFormattedCurrentTime));
  const [isCurrentHourVisible, setIsCurrentHourVisible] = useState(false);
  const currentTimeElement = document.getElementById(`${currentTimeElementId}`);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fullFormattedCurrentTime = getFormattedDateString(
          locale,
          new Date(),
          {
            hour: IntlDateTimeFormat2Digit,
            minute: IntlDateTimeFormat2Digit,
          },
        );
        setTime(getCurrentTime(fullFormattedCurrentTime));
        setIsCurrentHourVisible(true);
      } else {
        setIsCurrentHourVisible(false);
      }
    });
  });

  if (currentTimeElement) observer.observe(currentTimeElement);

  useEffect(() => {
    const sixtySeconds = 10000 * 60;
    const fullFormattedCurrentTime = getFormattedDateString(
      locale,
      new Date(),
      {
        hour: IntlDateTimeFormat2Digit,
        minute: IntlDateTimeFormat2Digit,
      },
    );
    setTime(getCurrentTime(fullFormattedCurrentTime));
    const currentTimeUpdate = setInterval(() => {
      setTime(getCurrentTime(fullFormattedCurrentTime));
    }, sixtySeconds);

    return () => clearInterval(currentTimeUpdate);
  }, [isCurrentHourVisible, locale]);

  useEffect(() => {
    console.log('time', time);
  }, [time]);

  return (
    <div className={styles.currentTime} style={{ top: getTop(date) }}>
      <time
        dateTime={time}
        id={currentTimeElementId}
        data-testid={currentTimeElementId}
      >
        {time}
      </time>
    </div>
  );
};

const getCurrentTime = (formattedTime: string) => {
  const [currentTime, _currentPeriod, currentHour, currentMins] =
    getTimeInformation(formattedTime);
  return is12HourClockSystem(formattedTime)
    ? `${currentHour}:${currentMins}`
    : currentTime;
};

const getTop = (date: Date) => {
  const startOfHoursBlockPx = 4;
  const oneHour = 60;
  const sizeOfEachMinute = sizeOfEachHourBlock / oneHour;
  const currentHours = date.getHours();
  const currentMinutes = date.getMinutes();
  return (
    startOfHoursBlockPx +
    currentHours * sizeOfEachHourBlock +
    currentMinutes * sizeOfEachMinute
  );
};
