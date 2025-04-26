import { useSelector } from 'react-redux';
import { sizeOfEach15MinBlock } from '../../../../utils/calendar/constants';
import {
  getFormattedDateString,
  getTimeInformation,
} from '../../../../utils/calendar/utils';
import styles from './event.module.scss';
import { EventBlock } from '../EventsContainer';
import { getLocaleLanguage } from '../../../../redux/slices/localeSlice/selectors';
import { IntlDateTimeFormat2Digit } from '../../../../utils/constants';
import { memo, useMemo, useState } from 'react';
import { EventDetailsModal } from '../EventDetailsModal/EventDetailsModal';

type Event = {
  id: EventBlock['eventId'];
  title: EventBlock['title'];
  startY: EventBlock['start']['fixedPositionY'];
  endY: EventBlock['end']['fixedPositionY'];
  startDate: EventBlock['start']['date'];
  endDate: EventBlock['end']['date'];
};

type SelectedEvent = {
  top?: number;
  event?: Event;
};

export const Event = memo(function ({
  id,
  title,
  startY,
  endY,
  startDate,
  endDate,
}: Event) {
  const eventHeight = endY - startY;
  const eventStart = startY;
  const isAtLeast30MinEvent = eventHeight >= sizeOfEach15MinBlock * 2;
  const isAtLeast60MinEvent = eventHeight >= sizeOfEach15MinBlock * 4;
  const hasMinimumHeight = eventHeight >= sizeOfEach15MinBlock;
  const localeString = useSelector(getLocaleLanguage());
  const event: Event = {
    id,
    title,
    startY,
    endY,
    startDate,
    endDate,
  };
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent>({
    top: undefined,
    event: undefined,
  });

  const [endTime, endPeriod] = useMemo(() => {
    const endFullTime = getFormattedDateString(localeString, endDate, {
      hour: IntlDateTimeFormat2Digit,
      minute: IntlDateTimeFormat2Digit,
    });
    const [endTime, endPeriod] = getTimeInformation(endFullTime);
    return [endTime, endPeriod];
  }, [endDate, localeString]);

  const [startTime, startPeriod] = useMemo(() => {
    const startFullTime = getFormattedDateString(localeString, startDate, {
      hour: IntlDateTimeFormat2Digit,
      minute: IntlDateTimeFormat2Digit,
    });
    const [startTime, startPeriod] = getTimeInformation(startFullTime);
    const updatedStartPeriod = startPeriod !== endPeriod ? startPeriod : '';
    return [startTime, updatedStartPeriod];
  }, [startDate, endPeriod, localeString]);

  const handleEventClick = (event: Event) => {
    console.log('Event clicked:', event);
    const moveEventInPixels = 20;
    setSelectedEvent({
      top: event.endY - moveEventInPixels,
      event,
    });
  };

  return (
    <>
      <div
        id={id}
        className={styles.plannerEvent}
        style={getEventStyle(eventStart, eventHeight)}
        onClick={() => handleEventClick(event)}
        onMouseDown={(e) => e.stopPropagation()}
        title="Click on the event to edit it"
      >
        {hasMinimumHeight && (
          <div
            className={styles.plannerEventDetails}
            style={{
              marginTop: isAtLeast30MinEvent ? '5px' : '1px',
              flexDirection: isAtLeast60MinEvent ? 'column' : 'row',
            }}
          >
            <span
              style={getTitleStyle(isAtLeast30MinEvent, isAtLeast60MinEvent)}
            >
              {title}
            </span>
            <span
              style={getTimeStyle(isAtLeast30MinEvent, isAtLeast60MinEvent)}
              aria-label={`Time range from ${startTime}${startPeriod} to ${endTime}${endPeriod}`}
            >{`${startTime}${startPeriod} – ${endTime}${endPeriod}`}</span>
          </div>
        )}
      </div>
      {selectedEvent.event && (
        <EventDetailsModal
          top={selectedEvent.top}
          title={selectedEvent.event.title}
          startDate={selectedEvent.event.startDate}
          endDate={selectedEvent.event.endDate}
          toggleDetailsModal={() =>
            setSelectedEvent({
              top: undefined,
              event: undefined,
            })
          }
        />
      )}
    </>
  );
});

const getTitleStyle = (
  isAtLeast30MinEvent: boolean,
  isAtLeast60MinEvent: boolean,
) => ({
  fontSize: isAtLeast60MinEvent
    ? '17px'
    : isAtLeast30MinEvent
      ? '15px'
      : '10px',
  marginRight: isAtLeast60MinEvent ? 0 : '5px',
});

const getTimeStyle = (
  isAtLeast30MinEvent: boolean,
  isAtLeast60MinEvent: boolean,
) => ({
  fontSize: isAtLeast30MinEvent ? '15px' : '10px',
  marginTop: isAtLeast60MinEvent ? '5px' : 0,
});

const getEventStyle = (eventStart: number, eventHeight: number) => ({
  top: `${eventStart}px`,
  height: `${eventHeight}px`,
});
