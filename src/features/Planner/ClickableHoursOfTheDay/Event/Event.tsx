import { useSelector } from 'react-redux';
import { sizeOfEach15MinBlock } from '../../../../utils/calendar/constants';
import {
  getFormattedDateString,
  getTimeInformation,
} from '../../../../utils/calendar/utils';
import styles from './event.module.scss';
import { EventBlock } from '../ClickableHoursOfTheDay';
import { getLocaleLanguage } from '../../../../redux/slices/localeSlice/selectors';
import { IntlDateTimeFormat2Digit } from '../../../../utils/constants';
import { useMemo } from 'react';

type EventProps = {
  event: EventBlock;
};

export const Event = ({ event }: EventProps) => {
  const eventHeight = event.end.fixedPositionY - event.start.fixedPositionY;
  const eventStart = event.start.fixedPositionY;
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
    top: `${eventStart}px`,
    height: `${eventHeight}px`,
  };
  const eventDetailsStyle = {
    marginTop: isAtLeast30MinEvent ? '5px' : '1px',
  };

  const [endTime, endPeriod] = useMemo(() => {
    const endFullTime = getFormattedDateString(localeString, event.end.date, {
      hour: IntlDateTimeFormat2Digit,
      minute: IntlDateTimeFormat2Digit,
    });
    const [endTime, endPeriod] = getTimeInformation(endFullTime);
    return [endTime, endPeriod];
  }, [event.end.date, localeString]);

  const [startTime, startPeriod] = useMemo(() => {
    const startFullTime = getFormattedDateString(
      localeString,
      event.start.date,
      {
        hour: IntlDateTimeFormat2Digit,
        minute: IntlDateTimeFormat2Digit,
      },
    );
    const [startTime, startPeriod] = getTimeInformation(startFullTime);
    const updatedStartPeriod = startPeriod !== endPeriod ? startPeriod : '';
    return [startTime, updatedStartPeriod];
  }, [event.start.date, endPeriod, localeString]);

  const handleEventClick = (event: EventBlock) => {
    console.log('Event clicked:', event);
  };

  return (
    <div
      id={event.eventId}
      key={event.eventId}
      className={styles.plannerEvent}
      style={eventStyle}
      onClick={() => handleEventClick(event)}
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
          <span
            style={timeStyle}
            aria-label={`Time range from ${startTime}${startPeriod} to ${endTime}${endPeriod}`}
          >{`${startTime}${startPeriod} – ${endTime}${endPeriod}`}</span>
        </div>
      )}
    </div>
  );
};
