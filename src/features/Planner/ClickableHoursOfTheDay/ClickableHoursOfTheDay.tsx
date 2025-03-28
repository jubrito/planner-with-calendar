import styles from './clickable-hours-of-the-day.module.scss';

type ClickableHoursOfTheDayProps = {
  hoursOfTheDay: string[];
};

export const ClickableHoursOfTheDay = ({
  hoursOfTheDay,
}: ClickableHoursOfTheDayProps) => {
  return (
    <div className={styles.clickableHourOfTheDay}>
      {hoursOfTheDay.map((hourOfTheDay) => {
        return <button>{hourOfTheDay}</button>;
      })}
    </div>
  );
};
