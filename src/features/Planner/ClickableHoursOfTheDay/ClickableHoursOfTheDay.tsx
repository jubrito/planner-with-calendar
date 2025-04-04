/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  EventHandlerType,
  RelativePosition,
} from '../../../types/calendar/types';
import styles from './clickable-hours-of-the-day.module.scss';
import {
  fifteenMinutesItemsInAnHour,
  numberOfHoursInADay,
} from '../../../utils/calendar/constants';

type ClickableHoursOfTheDayProps = {
  hoursOfTheDay: string[];
  handleMouseInteraction: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    eventType: EventHandlerType,
  ) => void;
};

interface TimeBlock {
  buttonId: string;
  positionY: number;
  block: {
    hourBlock?: number;
    fifteenMinBlock?: number;
  };
}

interface EventBlock {
  eventId: string;
  start: TimeBlock;
  end: TimeBlock;
}

// Rename other to draft
interface RealEventBlock {
  eventId: string;
  start: number;
  end: number;
}

export const ClickableHoursOfTheDay = ({
  hoursOfTheDay,
}: ClickableHoursOfTheDayProps) => {
  const [draftEvent, setDraftEvent] = useState<EventBlock | null>(null);
  // const [events, setEvents] = useState<EventBlock[]>([]);
  const [events, setEvents] = useState<RealEventBlock[]>([]);
  const [initialHeight, setInitialHeight] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonHeight = 50; // same as clickableHourOfTheDay scss button height
  useEffect(() => {
    events.forEach((event) => {
      console.log('event ----');
      console.log('event.start', event.start);
      console.log('event.end', event.end);
    });
    // console.log('events', events);
  }, [events]);
  useEffect(() => {
    console.log('draftEvent?.start', draftEvent?.start);
    console.log('draftEvent?.end', draftEvent?.end);
  }, [draftEvent]);

  useEffect(() => {
    if (containerRef.current && initialHeight === null) {
      setInitialHeight(containerRef.current.clientHeight);
    }
  }, [initialHeight]);

  useEffect(() => {
    if (containerRef.current?.parentElement) {
      containerRef.current.style.height = `${containerRef.current.parentElement.scrollHeight}px`;
    }
  }, []);

  // const hoursBlockDividedByFifteenMinutes = useMemo(() => {
  //   if (initialHeight == null) return [];
  //   return getChunkArrayByChunkSize(
  //     getPlannerHourBlockStartValues(initialHeight),
  //     fifteenMinutesItemsInAnHour,
  //   );
  // }, [initialHeight]);

  const get15MinStartValues = useCallback(
    (buttonTargetedHeight: number, draftEvent: EventBlock) => {
      console.log('draftEvent', draftEvent);
      const sizeOfEach15MinBlock =
        buttonTargetedHeight / fifteenMinutesItemsInAnHour;
      const startButtonId = draftEvent.start.buttonId;
      const endButtonId = draftEvent.end.buttonId;
      const startButton = document.getElementById(startButtonId);
      const startTopPosition = startButton?.offsetTop;
      const endButton = document.getElementById(endButtonId);
      const endTopPosition = endButton?.offsetTop;
      if (
        draftEvent.start.block.fifteenMinBlock !== undefined &&
        startTopPosition !== undefined
      ) {
        const fifteenMinBlockZeroIndexed =
          draftEvent.start.block.fifteenMinBlock - 1;
        const eventTopPosition =
          sizeOfEach15MinBlock * fifteenMinBlockZeroIndexed + startTopPosition;
        console.log('------- eventTopPosition', eventTopPosition);

        if (
          draftEvent.end.block.fifteenMinBlock !== undefined &&
          endTopPosition !== undefined
        ) {
          const fifteenMinBlockZeroIndexed =
            draftEvent.end.block.fifteenMinBlock;
          let eventBottomPosition =
            sizeOfEach15MinBlock * fifteenMinBlockZeroIndexed + endTopPosition;
          console.log('------- eventBottomPosition', eventBottomPosition);
          const eventIs15MinHeight =
            Math.abs(eventBottomPosition - eventTopPosition) >
            sizeOfEach15MinBlock;
          if (!eventIs15MinHeight && startButtonId === endButtonId) {
            eventBottomPosition = eventTopPosition + sizeOfEach15MinBlock;
          }
          return [eventTopPosition, eventBottomPosition];
        }
      }
      return [];
    },
    [],
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, buttonId: string) => {
      const buttonTargeted = event.currentTarget;
      const rect = buttonTargeted.getBoundingClientRect();
      const relativeY = event.clientY - rect.top;
      const buttonTargetedHeight = buttonTargeted.clientHeight;
      const relativeInitialPosition: RelativePosition['end'] = {
        relativeY,
      };
      const hourBlock = getHourBlock(buttonTargeted.id);
      const fifteenMinBlock = get15MinBlock(
        buttonTargetedHeight,
        relativeInitialPosition,
      );

      setDraftEvent({
        eventId: `draft-${Date.now()}`,
        start: {
          buttonId,
          positionY: relativeY,
          block: { hourBlock, fifteenMinBlock },
        },
        end: {
          buttonId,
          positionY: relativeY,
          block: { hourBlock, fifteenMinBlock },
        },
      });
      console.log('DOWN ------------');
    },
    [],
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, buttonId: string) => {
      if (draftEvent == null) return;

      const buttonTargeted = event.currentTarget;
      const rect = buttonTargeted.getBoundingClientRect();
      const buttonTargetedHeight = buttonTargeted.clientHeight;
      const relativeY = event.clientY - rect.top;
      const relativeInitialPosition: RelativePosition['end'] = {
        relativeY,
      };
      const hourBlock = getHourBlock(buttonTargeted.id);
      const fifteenMinBlock = get15MinBlock(
        buttonTargetedHeight,
        relativeInitialPosition,
      );
      setDraftEvent((prev) => ({
        ...prev!,
        end: {
          positionY: relativeY,
          buttonId,
          block: {
            hourBlock,
            fifteenMinBlock,
          },
        },
      }));
    },

    [draftEvent],
  );

  const handleMouseUp = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      console.log('draftEvent', draftEvent);
      if (!draftEvent) return;
      // Relative to the button
      // setEvents((prev) => [...prev, draftEvent]);
      const buttonTargeted = event.currentTarget;
      const buttonTargetedHeight = buttonTargeted.clientHeight;
      console.log('buttonTargetedHeight', buttonTargetedHeight);

      setEvents((prev) => {
        const fifteenMinStartValues = get15MinStartValues(
          buttonTargetedHeight,
          draftEvent,
        );
        const [start, end] = fifteenMinStartValues;
        console.log('fifteenMinStartValues', fifteenMinStartValues);
        return [
          ...prev,
          {
            eventId: draftEvent.eventId,
            start: start,
            end: end,
          },
        ];
      });

      setDraftEvent(null);
      console.log('UP ------------');
    },
    [draftEvent, get15MinStartValues],
  );

  const handleMouseLeaveContainer = useCallback(() => {
    setDraftEvent(null);
  }, []);

  const handleEventClick = useCallback((event: RealEventBlock) => {
    console.log('Event clicked:', event);
  }, []);

  return (
    <div
      className={styles.clickableHourOfTheDay}
      onMouseLeave={handleMouseLeaveContainer}
      ref={containerRef}
    >
      {draftEvent && (
        <div
          className={styles.plannerEvent}
          style={{
            top: `${draftEvent.start.positionY}px`,
            height: `${draftEvent.end.positionY - draftEvent.start.positionY}px`,
          }}
        />
      )}
      {events.map((event) => (
        <div
          key={event.eventId}
          className={styles.plannerEvent}
          style={getEventStyle(event)}
          onClick={(e) => {
            e.stopPropagation();
            handleEventClick(event);
          }}
        />
      ))}
      {hoursOfTheDay.map((_, index) => {
        const buttonId = getElementIdentifier(index);
        return (
          <>
            <button
              onMouseDown={(event) => handleMouseDown(event, buttonId)}
              onMouseMove={(event) => handleMouseMove(event, buttonId)}
              onMouseUp={handleMouseUp}
              id={buttonId}
              key={buttonId}
              style={{ height: `${buttonHeight}px` }}
            >
              {index}
            </button>
          </>
        );
      })}
    </div>
  );
};

const getEventStyle = (event: RealEventBlock) => ({
  top: `${event.start}px`,
  height: `${event.end - event.start}px`,
  border: '1px solid black',
});

const getElementIdentifier = (index: number) =>
  `hourblock_${index}`.replace(' ', '');

const getHourBlock = (buttonTargetedId: string) => {
  const [_buttonLabel, hourBlock] = buttonTargetedId.split('_');
  return parseInt(hourBlock);
};

const get15MinBlock = (
  elementHeight: number,
  relativePosition: RelativePosition['end'] | RelativePosition['initial'],
) => {
  if (!relativePosition || !relativePosition.relativeY) {
    return 0;
  }
  const horizontalValue = relativePosition.relativeY;
  const valueOfEachBlockOnClickableHour =
    elementHeight / fifteenMinutesItemsInAnHour;
  const blocks = Array.from(
    Array(fifteenMinutesItemsInAnHour).keys(),
    (item) => item + 1,
  );
  // console.log(
  //   'juju valueOfEachBlockOnClickableHour',
  //   valueOfEachBlockOnClickableHour,
  // );
  // console.log('juju elementHeight', elementHeight);
  for (const block of blocks) {
    const currentBlock = valueOfEachBlockOnClickableHour * block;
    if (horizontalValue <= currentBlock) {
      return block;
    }
    const lastItem = block === blocks.length;
    if (lastItem) return blocks.length;
  }
  return undefined;
};

const getPlannerHourBlockStartValues = (elementHeight: number) => {
  if (!elementHeight) return [];
  // Divide element height (which contans 24h) by 24 * 4 to result in 4 blocks of 15min on every hour
  const numberOfBlocks = fifteenMinutesItemsInAnHour * numberOfHoursInADay;
  const clickableHourBlockSize = elementHeight / numberOfBlocks;
  const blocks = Array.from(Array(numberOfBlocks).keys(), (item) => item + 1);
  const blocksStartValue = [0];
  for (const block of blocks) {
    const currentBlock = clickableHourBlockSize * block;
    blocksStartValue.push(currentBlock);
  }
  return blocksStartValue;
};
