import { useState, useCallback, useRef, useEffect } from 'react';
import styles from './clickable-hours-of-the-day.module.scss';
import {
  fifteenMinBlocksInAHour,
  sizeOfEach15MinBlock,
} from '../../../utils/calendar/constants';

interface TimeBlock {
  positionY: number;
  fixedPositionY: number;
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

  useEffect(() => {
    console.log('events', events);
  }, [events]);

  /**
   * Function to get a fixed position of the event
   *
   * Instead of creating events with the exact position that was selected,
   * if endOrStartOf15MinBlock is start, it gets the beggining of the hourBlock
   * based on the fifteenMinBlock
   *
   * Example: If hour is 0 and block is 1, and we want to get the relative fixed
   * position, we multiply the fifteenMinBlock (1) with the size of each 15 min block (12.5)
   * to get 12.5 (which is the start of the first block). So regardless of the relativeY,
   * we calculate the relative Y fixed position based on the block (which took relativeY
   * into consideration). If we want to calculate for the hour 1, we need to add the previous
   * hours heights (in this case hour 0), thus we add 'hourBlock (1) * sizeOfAnHour (12.5 * 4)' on top
   * When we want to get the end of the fifteenMinBlock, we need to add another fifteenMinBlock
   *
   * @param block
   * @param endOrStartOf15MinBlock
   * @returns fixedRelativeY – the fixed position to fit in the closest fifteen minute block position
   */
  const getFixedRelativeY = (
    block: {
      hourBlock: number;
      fifteenMinBlock: number;
    },
    endOrStartOf15MinBlock: 'start' | 'end',
  ) => {
    const { fifteenMinBlock, hourBlock } = block;
    const sizeOfAnHour = fifteenMinBlocksInAHour * sizeOfEach15MinBlock;
    const startOfBlock =
      hourBlock * sizeOfAnHour + fifteenMinBlock * sizeOfEach15MinBlock;
    const fixedRelativeY =
      endOrStartOf15MinBlock === 'start'
        ? startOfBlock
        : startOfBlock + sizeOfEach15MinBlock;
    return fixedRelativeY;
  };

  /**
   * Function to determine which fifteen minute block the user clicked
   *
   * In one hour we have 4 fifteen minutes blocks, so 1 / 4 (0.25) is
   * the end of the first block, (1 / 4) * 2 (0.5) is the end of the second
   * block and so on. The rest of the calculation of the getHourAnd15MinBlock()
   * function is compared with those values and if it is greater than 0.25 and
   * smaller than 0.5 for example, we know it is on the second block (1) as it is 0 indexed
   *
   * Example: continuing the fifteenMinuteBlock() example where the user click relativeY position is 49,
   * (remembering the container has 1200px with each hour block having 50px), a relativeY position of 49
   * indicates it should be the last fifteen minute block of the first hour. So if the floatHour calculated
   * on fifteenMinuteBlock() is 0.98 and we know the hour is 0, the rest (0.98) is compared with each possible
   * value (0.25, 0,5, 0.75, 1). As it is greater than 0.75 but smaller than 1, we know it is on the last block.
   *
   * @param rest the rest of the hour with decimals calculated on getHourAnd15MinBlock()
   * @returns fifteenMinuteBlock – the fifteen minute block of the hour the user clicked
   */
  const getFifteenMinuteBlock = (rest: number) => {
    const fifteenMinutesBlocksInOneHour = Array.from(
      Array(4).keys(),
      (index) => (1 / fifteenMinBlocksInAHour) * (index + 1),
    ); // [ 0.25, 0.5, 0.75, 1 ] each block after 1 hour divided by 4 (to get 4 blocks of 15 minutes)
    for (const [
      index,
      fifteenMinBlocksStartValue,
    ] of fifteenMinutesBlocksInOneHour.entries()) {
      if (rest < fifteenMinBlocksStartValue) {
        return index;
      }
    }
    return 0;
  };

  /**
   * Function to get the hour and the fifteen minute block
   * the user clicked (each hour has 15 minutes)
   *
   * @param relativeY the relative Y position of the click on the container
   * @returns {Object} { hourBlock, fifteenMinBlock } – the hour and the fifteen minute of
   * that hour based on the click of the user on the clickable container
   *
   * Example: The container has 1200px so each hour block has 50px and
   * each 15 min block has 12.5px. If the user clicks on the container
   * and the click relativeY position is 49, it should be in the hour 0,
   * and should be the last fifteen minute block. So the floatHour would
   * be 0.98, which means the actual hour is the integer 0. The rest is
   * used to calculate the fifteen minute block on getFifteenMinuteBlock()
   */
  const getHourAnd15MinBlock = useCallback((relativeY: number) => {
    const floatHour =
      relativeY / sizeOfEach15MinBlock / fifteenMinBlocksInAHour;
    const hourBlock = Math.floor(floatHour);
    const rest = floatHour - hourBlock;
    const fifteenMinBlock = getFifteenMinuteBlock(rest);
    return { hourBlock, fifteenMinBlock };
  }, []);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const relativeY = event.clientY - rect.top;
      const block = getHourAnd15MinBlock(relativeY);
      const fixedHourAnd15MinBlock = getFixedRelativeY(block, 'start');
      console.log('relativeY start', relativeY);
      console.log('block.fifteenMinBlock start', block.fifteenMinBlock);
      console.log('fixedHourAnd15MinBlock start', fixedHourAnd15MinBlock);

      setDraftEvent({
        eventId: `draft-${Date.now()}`,
        start: {
          positionY: relativeY,
          fixedPositionY: fixedHourAnd15MinBlock,
          block,
        },
        end: {
          positionY: relativeY,
          fixedPositionY: fixedHourAnd15MinBlock,
          block,
        },
      });
    },
    [getHourAnd15MinBlock],
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!draftEvent || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const relativeY = event.clientY - rect.top;
      const block = getHourAnd15MinBlock(relativeY);
      const fixedHourAnd15MinBlock = getFixedRelativeY(block, 'end');
      console.log('relativeY end', relativeY);
      console.log('block.fifteenMinBlock end', block.fifteenMinBlock);
      console.log('fixedHourAnd15MinBlock end', fixedHourAnd15MinBlock);
      setDraftEvent((prev) => ({
        ...prev!,
        end: {
          positionY: relativeY,
          fixedPositionY: fixedHourAnd15MinBlock,
          block,
        },
      }));
    },
    [draftEvent, getHourAnd15MinBlock],
  );

  const handleMouseUp = useCallback(() => {
    if (!draftEvent) return;

    setEvents((prev) => [
      ...prev,
      {
        eventId: draftEvent.eventId,
        start: {
          positionY: draftEvent.start.fixedPositionY,
          fixedPositionY: draftEvent.start.fixedPositionY,
          block: draftEvent.start.block,
        },
        end: {
          positionY: draftEvent.end.fixedPositionY,
          fixedPositionY: draftEvent.end.fixedPositionY,
          block: draftEvent.end.block,
        },
      },
    ]);
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
