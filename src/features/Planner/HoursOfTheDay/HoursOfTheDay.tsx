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

  return (
    <div className={styles.hourOfTheDay} ref={hourOfTheDaySpanRef}>
      {hoursOfTheDay.map((hourOfTheDay) => {
        return (
          <div className={styles.container}>
            <span className="hourOfTheDay" style={{ height: spanHeight }}>
              {hourOfTheDay}
            </span>
            <hr className={styles.line} />
          </div>
        );
      })}
    </div>
  );
};
