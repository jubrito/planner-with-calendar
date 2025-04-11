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
  const isAtLeast30MinEvent = eventHeight >= sizeOfEach15MinBlock * 2;
  const isAtLeast45MinEvent = eventHeight >= sizeOfEach15MinBlock * 3;
  const isAtLeast60MinEvent = eventHeight >= sizeOfEach15MinBlock * 4;
  const hasMinimumHeight = eventHeight >= sizeOfEach15MinBlock;
  const localeString = useSelector(getLocaleLanguage());

  const titleStyle = {
    fontSize: isAtLeast60MinEvent
      ? '1em'
      : isAtLeast30MinEvent
        ? '0.7em'
        : '0.5em',
    marginRight: isAtLeast45MinEvent ? 0 : '5px',
  };
  const timeStyle = {
    fontSize: isAtLeast60MinEvent
      ? '0.8em'
      : isAtLeast30MinEvent
        ? '0.7em'
        : '0.5em',
    marginTop: isAtLeast45MinEvent ? '5px' : 0,
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
            marginTop: isAtLeast30MinEvent ? '5px' : '1px',
          }}
        >
          <span style={titleStyle}>{event.title}</span>
          <span style={timeStyle}>{getEventTime()}</span>
        </div>
      )}
    </div>
  );
};
