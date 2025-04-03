import styles from './_hours-of-the-day.module.scss';

type HoursOfTheDayProps = {
  hoursOfTheDay: string[];
};

export const HoursOfTheDay = ({ hoursOfTheDay }: HoursOfTheDayProps) => {
  return (
    <div className={styles.hourOfTheDay}>
      {hoursOfTheDay.map((hourOfTheDay) => {
        return <span>{hourOfTheDay}</span>;
      })}
    </div>
  );
};
