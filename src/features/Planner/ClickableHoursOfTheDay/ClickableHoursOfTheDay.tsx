import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import styles from './clickable-hours-of-the-day.module.scss';
import {
  numberOfBlocksOnPlannerHour,
  numberOfHoursInADay,
} from '../../../utils/calendar/constants';
import { getChunkArrayByChunkSize } from '../../../utils/utils';

interface TimeBlock {
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

export const ClickableHoursOfTheDay = () => {
  const [draftEvent, setDraftEvent] = useState<EventBlock | null>(null);
  const [events, setEvents] = useState<EventBlock[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const fifteenMinutesItemsInAnHour = 4;
  const [initialHeight, setInitialHeight] = useState<number | null>(null);

  useEffect(() => {
    if (containerRef.current && initialHeight === null) {
      setInitialHeight(containerRef.current.clientHeight);
    }
  }, [initialHeight]);

  const hoursBlockDividedByFifteenMinutes = useMemo(() => {
    if (initialHeight == null) return [];
    return getChunkArrayByChunkSize(
      getPlannerHourBlockStartValues(initialHeight),
      fifteenMinutesItemsInAnHour,
    );
  }, [initialHeight]);

  const getHourAndFifteenMinuteBlocks = useCallback(
    (relativeY: number) => {
      const getSizeOfEach15MinBlock = () => {
        if (
          !hoursBlockDividedByFifteenMinutes ||
          hoursBlockDividedByFifteenMinutes.length === 0 ||
          hoursBlockDividedByFifteenMinutes[0].length < 2
        )
          return undefined;
        return Math.abs(
          hoursBlockDividedByFifteenMinutes[0][1] -
            hoursBlockDividedByFifteenMinutes[0][0],
        );
      };
      const hourBlockWithFifteenMinutesBlocks =
        hoursBlockDividedByFifteenMinutes.find((allHours) => {
          const sizeOfEach15minBlock = getSizeOfEach15MinBlock();
          if (!sizeOfEach15minBlock) return undefined;
          const lastHourFifteenMinuteBlockEnd =
            allHours[allHours.length - 1] + sizeOfEach15minBlock;
          return relativeY <= lastHourFifteenMinuteBlockEnd;
        });

      if (!hourBlockWithFifteenMinutesBlocks)
        return { hourBlock: undefined, fifteenMinBlock: undefined };

      const hourBlockClickedIndex = hoursBlockDividedByFifteenMinutes.indexOf(
        hourBlockWithFifteenMinutesBlocks,
      );
      // console.log('hourBlockClickedIndex', hourBlockClickedIndex);
      const fifteenMinuteBlock = hourBlockWithFifteenMinutesBlocks.find(
        (allFifteenMinuteBlocks) =>
          relativeY <=
          allFifteenMinuteBlocks + (getSizeOfEach15MinBlock() || 0),
      );
      // console.log('fifteenMinuteBlock', fifteenMinuteBlock);
      if (fifteenMinuteBlock == null)
        return { hourBlock: hourBlockClickedIndex, fifteenMinBlock: undefined };

      const fifteenMinuteBlockClickedIndex =
        hourBlockWithFifteenMinutesBlocks.indexOf(fifteenMinuteBlock);
      // console.log(
      //   'fifteenMinuteBlockClickedIndex',
      //   fifteenMinuteBlockClickedIndex,
      // );
      return {
        hourBlock: hourBlockClickedIndex,
        fifteenMinBlock: fifteenMinuteBlockClickedIndex,
      };
    },
    [hoursBlockDividedByFifteenMinutes],
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const relativeY = event.clientY - rect.top;
      const block = getHourAndFifteenMinuteBlocks(relativeY);

      setDraftEvent({
        eventId: `draft-${Date.now()}`,
        start: {
          positionY: relativeY,
          block,
        },
        end: { positionY: relativeY, block },
      });
    },
    [getHourAndFifteenMinuteBlocks],
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!draftEvent || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const relativeY = event.clientY - rect.top;
      const block = getHourAndFifteenMinuteBlocks(relativeY);

      setDraftEvent((prev) => ({
        ...prev!,
        end: { positionY: relativeY, block },
      }));
    },
    [draftEvent, getHourAndFifteenMinuteBlocks],
  );

  const handleMouseUp = useCallback(() => {
    if (!draftEvent) return;
    const minimumEventHeight =
      Math.abs(draftEvent.end.positionY - draftEvent.start.positionY) > 5;
    const fifteenMinutesHeight = draftEvent.start.positionY + 10;

    if (minimumEventHeight) {
      setEvents((prev) => [...prev, draftEvent]);
    }
    if (!minimumEventHeight) {
      setEvents((prev) => [
        ...prev,
        {
          eventId: draftEvent.eventId,
          start: {
            positionY: draftEvent.start.positionY,
            block: draftEvent.start.block,
          },
          end: {
            positionY: fifteenMinutesHeight,
            block: draftEvent.end.block,
          },
        },
      ]);
    }
    setDraftEvent(null);
  }, [draftEvent]);

  const handleMouseLeave = useCallback(() => {
    setDraftEvent(null);
  }, []);

  const handleEventClick = useCallback((event: EventBlock) => {
    console.log('Event clicked:', event);
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.clickableHourOfTheDay}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
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
          style={{
            top: `${event.start.positionY}px`,
            height: `${event.end.positionY - event.start.positionY}px`,
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleEventClick(event);
          }}
        />
      ))}
    </div>
  );
};

const getPlannerHourBlockStartValues = (elementHeight: number) => {
  if (!elementHeight) return [];
  // Divide element height (which contans 24h) by 24 * 4 to result in 4 blocks of 15min on every hour
  const numberOfBlocks = numberOfBlocksOnPlannerHour * numberOfHoursInADay;
  const clickableHourBlockSize = elementHeight / numberOfBlocks;
  const blocks = Array.from(Array(numberOfBlocks).keys(), (item) => item + 1);
  const blocksStartValue = [0];
  for (const block of blocks) {
    const currentBlock = clickableHourBlockSize * block;
    blocksStartValue.push(currentBlock);
  }
  return blocksStartValue;
};
