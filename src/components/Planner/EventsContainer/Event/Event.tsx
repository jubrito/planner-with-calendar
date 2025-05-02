import { useSelector } from 'react-redux';
import {
  oneHourInMinutes,
  sizeOfEach15MinBlock,
} from '../../../../utils/calendar/constants';
import {
  getFormattedDateString,
  getTimeInformation,
} from '../../../../utils/calendar/utils';
import styles from './event.module.scss';
import { EventStored } from '../../../../types/event';
import { getLocaleLanguage } from '../../../../redux/slices/localeSlice/selectors';
import {
  enterKey,
  IntlDateTimeFormat2Digit,
} from '../../../../utils/constants';
import { memo, useMemo, useRef } from 'react';
import {
  getFixedRelativeY,
  getMinimumEventFixedPositionY,
} from '../../../../utils/events/dayView/getPositionsY';
import { getFifteenMinuteBlock } from '../../../../utils/events/dayView/getBlocks';

type EventProps = {
  id: EventStored['id'];
  title: EventStored['title'];
  startY?: EventStored['dayViewPosition']['startY'];
  endY?: EventStored['dayViewPosition']['endY'];
  startDate: EventStored['startDate'];
  endDate: EventStored['endDate'];
  viewEventDetails: (
    event: EventStored,
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
  if (!startYPosition || !endYPosition || !startY || !endY) {
    const { endY, startY } = calculateYPosition(startDate, endDate);
    startYPosition = startY;
    endYPosition = endY;
  }
  console.log('startY', startY);
  console.log('endY', endY);
  console.log('startYPosition', startYPosition);
  console.log('endYPosition', endYPosition);

  const eventHeight = endYPosition - startYPosition;
  const eventStart = startYPosition;
  const isAtLeast30MinEvent = eventHeight >= sizeOfEach15MinBlock * 2;
  const isAtLeast60MinEvent = eventHeight >= sizeOfEach15MinBlock * 4;
  const hasMinimumHeight = eventHeight >= sizeOfEach15MinBlock;
  const localeString = useSelector(getLocaleLanguage());
  const eventRef = useRef(null);
  const event: EventStored = {
    id,
    title,
    dayViewPosition: {
      startY: startYPosition,
      endY: endYPosition,
    },
    startDate,
    endDate,
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

const calculateYPosition = (
  startDate: EventStored['startDate'],
  endDate: EventStored['endDate'],
) => {
  const startDateHours = new Date(startDate).getHours();
  const endDateHours = new Date(endDate).getHours();
  const startDateMinutes = new Date(startDate).getMinutes();
  const endDateMinutes = new Date(endDate).getMinutes();
  const start15MinBlock = getFifteenMinuteBlock(
    startDateMinutes / oneHourInMinutes,
  );
  const end15MinBlock = getFifteenMinuteBlock(
    endDateMinutes / oneHourInMinutes,
  );
  const startBlock = {
    hour: startDateHours,
    minutes: startDateMinutes,
    fifteenMinBlock: start15MinBlock,
  };
  const zeroIndexedEnd15MinBlock = end15MinBlock - 1;
  const endBlock = {
    hour: endDateHours,
    minutes: endDateMinutes,
    fifteenMinBlock: zeroIndexedEnd15MinBlock,
  };
  const startY = getFixedRelativeY(startBlock, 'start');
  const endY = getFixedRelativeY(endBlock, 'end');
  const minimumEndY = getMinimumEventFixedPositionY(startY, endY);
  return { startY, endY: minimumEndY };
};

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
