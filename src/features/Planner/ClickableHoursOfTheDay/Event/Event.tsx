import { sizeOfEach15MinBlock } from '../../../../utils/calendar/constants';
import styles from '../clickable-hours-of-the-day.module.scss';
import { EventBlock } from '../ClickableHoursOfTheDay';

type EventProps = {
  event: EventBlock;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export const Event = ({ event, onClick }: EventProps) => {
  const eventHeight = event.end.fixedPositionY - event.start.fixedPositionY;
  const hasMinimumHeight = eventHeight >= sizeOfEach15MinBlock;
  return (
    <div
      key={event.eventId}
      className={styles.plannerEvent}
      style={{
        top: `${event.start.fixedPositionY}px`,
        height: `${eventHeight}px`,
      }}
      onClick={onClick}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <span
        style={{
          fontSize: eventHeight === sizeOfEach15MinBlock ? '0.5em' : '1em',
        }}
      >
        {hasMinimumHeight && event.title}
      </span>
    </div>
  );
};
