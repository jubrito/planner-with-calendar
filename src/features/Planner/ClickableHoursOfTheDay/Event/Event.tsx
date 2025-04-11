import { useSelector } from 'react-redux';
import { sizeOfEach15MinBlock } from '../../../../utils/calendar/constants';
import { getFormatedDateString } from '../../../../utils/calendar/utils';
import styles from './event.module.scss';
import { EventBlock } from '../ClickableHoursOfTheDay';
import { getLocaleLanguage } from '../../../../redux/slices/localeSlice/selectors';
import { IntlDateTimeFormat2Digit } from '../../../../utils/constants';

type EventProps = {
  event: EventBlock;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export const Event = ({ event, onClick }: EventProps) => {
  const eventHeight = event.end.fixedPositionY - event.start.fixedPositionY;
  const isAtLeast30MinEvent = eventHeight >= sizeOfEach15MinBlock * 2;
  const isAtLeast60MinEvent = eventHeight >= sizeOfEach15MinBlock * 4;
  const hasMinimumHeight = eventHeight >= sizeOfEach15MinBlock;
  const localeString = useSelector(getLocaleLanguage());

  const titleStyle = {
    fontSize: isAtLeast60MinEvent
      ? '17px'
      : isAtLeast30MinEvent
        ? '15px'
        : '10px',
    marginRight: isAtLeast60MinEvent ? 0 : '5px',
  };
  const timeStyle = {
    fontSize: isAtLeast60MinEvent
      ? '15px'
      : isAtLeast30MinEvent
        ? '15px'
        : '10px',
    marginTop: isAtLeast60MinEvent ? '5px' : 0,
  };
  const eventStyle = {
    top: `${event.start.fixedPositionY}px`,
    height: `${eventHeight}px`,
  };
  const eventDetailsStyle = {
    marginTop: isAtLeast30MinEvent ? '5px' : '1px',
  };

  const getEventTime = () => {
    let startPeriod = '';
    let endPeriod = '';
    let startHour = getFormatedDateString(localeString, event.start.date, {
      hour: IntlDateTimeFormat2Digit,
    });
    let endHour = getFormatedDateString(localeString, event.end.date, {
      hour: IntlDateTimeFormat2Digit,
    });
    if (startHour.includes('AM') || startHour.includes('PM')) {
      const [hour, period] = startHour.split(' ');
      startHour = hour;
      startPeriod = ' ' + period;
    }
    if (endHour.includes('AM') || endHour.includes('PM')) {
      const [hour, period] = endHour.split(' ');
      endHour = hour;
      endPeriod = ' ' + period;
    }
    if (startPeriod === endPeriod) {
      startPeriod = '';
    }
    const startMinutes = getFormatedDateString(localeString, event.start.date, {
      minute: IntlDateTimeFormat2Digit,
    });
    const endMinutes = getFormatedDateString(localeString, event.end.date, {
      minute: IntlDateTimeFormat2Digit,
    });
    return `${startHour}:${startMinutes}${startPeriod} – ${endHour}:${endMinutes}${endPeriod}`;
  };

  return (
    <div
      id={event.eventId}
      key={event.eventId}
      className={styles.plannerEvent}
      style={eventStyle}
      onClick={onClick}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {hasMinimumHeight && (
        <div
          className={styles.plannerEventDetails}
          style={{
            ...eventDetailsStyle,
            flexDirection: isAtLeast60MinEvent ? 'column' : 'row',
          }}
        >
          <span style={titleStyle}>{event.title}</span>
          <span style={timeStyle}>{getEventTime()}</span>
        </div>
      )}
    </div>
  );
};
