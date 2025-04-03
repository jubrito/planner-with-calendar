import { useEffect, useRef, useState } from 'react';
import styles from './_hours-of-the-day.module.scss';
import { numberOfHoursInADay } from '../../../utils/calendar/constants';

type HoursOfTheDayProps = {
  hoursOfTheDay: string[];
};

export const HoursOfTheDay = ({ hoursOfTheDay }: HoursOfTheDayProps) => {
  const hourOfTheDaySpanRef = useRef<HTMLDivElement>(null);
  const [spanHeight, setSpanHeight] = useState(50);

  useEffect(() => {
    const plannerHoursDivHeight =
      hourOfTheDaySpanRef.current?.parentElement?.scrollHeight;
    if (plannerHoursDivHeight) {
      setSpanHeight(plannerHoursDivHeight / numberOfHoursInADay);
    }
  }, []);

  useEffect(() => {
    if (hourOfTheDaySpanRef.current?.parentElement) {
      console.log(
        'hourOfTheDaySpanRef.current.parentElement',
        hourOfTheDaySpanRef.current.parentElement,
      );
      console.log(
        'hourOfTheDaySpanRef.current.parentElement.scrollHeight',
        hourOfTheDaySpanRef.current.parentElement.scrollHeight,
      );
      hourOfTheDaySpanRef.current.style.height = `${hourOfTheDaySpanRef.current.parentElement.scrollHeight}px`;
    }
  }, []);

  return (
    <div className={styles.hourOfTheDay} ref={hourOfTheDaySpanRef}>
      {hoursOfTheDay.map((hourOfTheDay) => {
        return <span style={{ height: spanHeight }}>{hourOfTheDay}</span>;
      })}
    </div>
  );
};
