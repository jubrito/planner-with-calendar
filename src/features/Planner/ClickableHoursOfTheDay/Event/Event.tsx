import { sizeOfEach15MinBlock } from '../../../../utils/calendar/constants';
import styles from '../clickable-hours-of-the-day.module.scss';
import { EventBlock } from '../ClickableHoursOfTheDay';

type EventProps = {
  event: EventBlock;
};

export const Event = ({ event }: EventProps) => {
  const eventHeight = event.end.fixedPositionY - event.start.fixedPositionY;
  return (
    <div
      className={styles.plannerEvent}
      style={{
        top: `${event.start.fixedPositionY}px`,
        height: `${eventHeight}px`,
      }}
    >
      <span
        style={{
          fontSize: eventHeight === sizeOfEach15MinBlock ? '0.5em' : '1em',
        }}
      >
        {event.title}
      </span>
    </div>
  );
};
