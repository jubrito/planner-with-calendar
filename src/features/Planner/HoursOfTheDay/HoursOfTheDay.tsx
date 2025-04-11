import { useRef } from 'react';
import styles from './_hours-of-the-day.module.scss';

type HoursOfTheDayProps = {
  hoursOfTheDay: string[];
};

export const HoursOfTheDay = ({ hoursOfTheDay }: HoursOfTheDayProps) => {
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
