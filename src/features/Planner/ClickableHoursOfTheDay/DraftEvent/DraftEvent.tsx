import styles from '../clickable-hours-of-the-day.module.scss';
import { EventBlock } from '../ClickableHoursOfTheDay';

type DraftEventProps = {
  draftEvent: EventBlock;
};

export const DraftEvent = ({ draftEvent }: DraftEventProps) => {
  return (
    <div
      className={styles.plannerEvent}
      style={{
        top: `${draftEvent.start.fixedPositionY}px`,
        height: `${draftEvent.end.fixedPositionY - draftEvent.start.fixedPositionY}px`,
      }}
    >
      <span>{draftEvent.title}</span>
    </div>
  );
};
