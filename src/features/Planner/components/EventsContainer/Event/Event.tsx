import { useSelector } from 'react-redux';
import styles from './event.module.scss';
import { memo, useMemo, useRef } from 'react';
import { EventOnCreate, EventOnOpenDetails } from '../../../../../types/event';
import {
  getFormattedDateString,
  getTimeInformation,
} from '../../../../../utils/calendar/utils';
import { getLocaleLanguage } from '../../../../../redux/slices/localeSlice/selectors';
import { sizeOfEach15MinBlock } from '../../../../../utils/calendar/constants';
import {
  enterKey,
  IntlDateTimeFormat2Digit,
} from '../../../../../utils/constants';
import { calculateYPosition } from '../../../utils/screenPositions';

type EventProps = {
  id: EventOnCreate['id'];
  title: EventOnCreate['title'];
  startY?: EventOnCreate['start']['fixedPositionY'];
  endY?: EventOnCreate['end']['fixedPositionY'];
  startDate: EventOnCreate['start']['date'];
  endDate: EventOnCreate['end']['date'];
  viewEventDetails: (
    event: EventOnOpenDetails,
    eventRef: React.RefObject<HTMLDivElement | null>,
  ) => void;
};

export const Event = memo(function ({
  id,
  title,
  startY,
  endY,
  startDate,
  endDate,
  viewEventDetails,
}: EventProps) {
  let startYPosition = startY;
  let endYPosition = endY;

  if (
    startYPosition == null ||
    endYPosition == null ||
    startY == null ||
    endY == null
  ) {
    const { endY, startY } = calculateYPosition(startDate, endDate);
    startYPosition = startY;
    endYPosition = endY;
  }

  const newLocal = endYPosition - startYPosition;
  const eventHeight = newLocal;
  const eventStart = startYPosition;
  const isAtLeast30MinEvent = eventHeight >= sizeOfEach15MinBlock * 2;
  const isAtLeast60MinEvent = eventHeight >= sizeOfEach15MinBlock * 4;
  const hasMinimumHeight = eventHeight >= sizeOfEach15MinBlock;
  const localeString = useSelector(getLocaleLanguage());
  const eventRef = useRef(null);
  const event: EventOnOpenDetails = {
    id,
    title,
    startDate,
    endDate,
    startY: startYPosition,
    endY: endYPosition,
  };

  const [endTime, endPeriod] = useMemo(() => {
    const deserializedEndDate = new Date(endDate);
    const endFullTime = getFormattedDateString(
      localeString,
      deserializedEndDate,
      {
        hour: IntlDateTimeFormat2Digit,
        minute: IntlDateTimeFormat2Digit,
      },
    );
    const [endTime, endPeriod] = getTimeInformation(endFullTime);
    return [endTime, endPeriod];
  }, [endDate, localeString]);

  const [startTime, startPeriod] = useMemo(() => {
    const deserializedStartDate = new Date(startDate);
    const startFullTime = getFormattedDateString(
      localeString,
      deserializedStartDate,
      {
        hour: IntlDateTimeFormat2Digit,
        minute: IntlDateTimeFormat2Digit,
      },
    );
    const [startTime, startPeriod] = getTimeInformation(startFullTime);
    const updatedStartPeriod = startPeriod !== endPeriod ? startPeriod : '';
    return [startTime, updatedStartPeriod];
  }, [startDate, endPeriod, localeString]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === enterKey) {
      viewEventDetails(event, eventRef);
    }
  };

  return (
    <div
      id={id}
      className={styles.plannerEvent}
      style={getEventStyle(eventStart, eventHeight)}
      onClick={() => viewEventDetails(event, eventRef)}
      onKeyDown={handleKeyDown}
      onMouseDown={(e) => e.stopPropagation()}
      title="Click on the event to view details and actions"
      tabIndex={0}
      ref={eventRef}
    >
      {hasMinimumHeight && (
        <div
          className={styles.plannerEventDetails}
          style={{
            marginTop: isAtLeast30MinEvent ? '5px' : '1px',
            flexDirection: isAtLeast60MinEvent ? 'column' : 'row',
          }}
        >
          <span style={getTitleStyle(isAtLeast30MinEvent, isAtLeast60MinEvent)}>
            {title}
          </span>
          <span
            style={getTimeStyle(isAtLeast30MinEvent, isAtLeast60MinEvent)}
            aria-label={`Time range from ${startTime}${startPeriod} to ${endTime}${endPeriod}`}
          >{`${startTime}${startPeriod} – ${endTime}${endPeriod}`}</span>
        </div>
      )}
    </div>
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
