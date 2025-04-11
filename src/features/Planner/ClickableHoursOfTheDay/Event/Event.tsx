import { useSelector } from 'react-redux';
import { sizeOfEach15MinBlock } from '../../../../utils/calendar/constants';
import { getFormatedDateString } from '../../../../utils/calendar/utils';
import styles from '../clickable-hours-of-the-day.module.scss';
import { EventBlock } from '../ClickableHoursOfTheDay';
import { getLocaleLanguage } from '../../../../redux/slices/localeSlice/selectors';
import { IntlDateTimeFormat2Digit } from '../../../../utils/constants';

type EventProps = {
  event: EventBlock;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export const Event = ({ event, onClick }: EventProps) => {
  const eventHeight = event.end.fixedPositionY - event.start.fixedPositionY;
  const isAtLeast45MinEvent = eventHeight >= sizeOfEach15MinBlock * 3;
  const hasMinimumHeight = eventHeight >= sizeOfEach15MinBlock;
  const localeString = useSelector(getLocaleLanguage());
  const startHour = getFormatedDateString(localeString, event.start.date, {
    hour: IntlDateTimeFormat2Digit,
  }).slice(0, 2);
  const endHour = getFormatedDateString(localeString, event.end.date, {
    hour: IntlDateTimeFormat2Digit,
  });
  const startMinutes = getFormatedDateString(localeString, event.start.date, {
    minute: IntlDateTimeFormat2Digit,
  });
  const endMinutes = getFormatedDateString(localeString, event.end.date, {
    minute: IntlDateTimeFormat2Digit,
  });
  const eventTime = `${startHour}:${startMinutes} – ${endHour}:${endMinutes}`;

  const titleStyle = {
    fontSize: isAtLeast45MinEvent ? '1em' : '0.5em',
    marginRight: isAtLeast45MinEvent ? 0 : '5px',
  };
  const timeStyle = {
    fontSize: isAtLeast45MinEvent ? '0.7em' : '0.5em',
    marginTop: isAtLeast45MinEvent ? '5px' : 0,
  };
  console.log('startHour', startHour);
  console.log('startMinutes', startMinutes);
  console.log('endHour', endHour);
  console.log('endMinutes', endMinutes);

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
      {hasMinimumHeight && (
        <div
          className={styles.plannerEventDetails}
          style={{
            flexDirection: isAtLeast45MinEvent ? 'column' : 'row',
          }}
        >
          <span style={titleStyle}>{event.title}</span>
          <span style={timeStyle}>{eventTime}</span>
        </div>
      )}
    </div>
  );
};
