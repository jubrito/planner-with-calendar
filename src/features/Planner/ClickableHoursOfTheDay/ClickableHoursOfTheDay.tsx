/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  EventHandlerType,
  RelativePosition,
} from '../../../types/calendar/types';
import styles from './clickable-hours-of-the-day.module.scss';
import { numberOfHoursInADay } from '../../../utils/calendar/constants';

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

export const ClickableHoursOfTheDay = ({
  hoursOfTheDay,
}: ClickableHoursOfTheDayProps) => {
  const [draftEvent, setDraftEvent] = useState<EventBlock | null>(null); // new
  const [events, setEvents] = useState<EventBlock[]>([]); // new
  const [initialHeight, setInitialHeight] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [buttonHeight, setButtonHeight] = useState<number>();
  useEffect(() => {
    console.log('events', events);
  }, [events]);

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

  useEffect(() => {
    const plannerHoursDivHeight = containerRef.current?.scrollHeight;
    if (plannerHoursDivHeight) {
      setButtonHeight(plannerHoursDivHeight / numberOfHoursInADay);
    }
  }, []);

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

  const handleMouseUp = useCallback(() => {
    if (!draftEvent) return;
    console.log('draftEvent', draftEvent);
    setEvents((prev) => [...prev, draftEvent]);
    setDraftEvent(null);
  }, [draftEvent]);

  const handleMouseLeaveContainer = useCallback(() => {
    setDraftEvent(null);
  }, []);

  const handleEventClick = useCallback((event: EventBlock) => {
    console.log('Event clicked:', event);
  }, []);

  return (
    <div
      className={styles.clickableHourOfTheDay}
      onMouseLeave={handleMouseLeaveContainer}
      ref={containerRef}
    >
      {hoursOfTheDay.map((hourOfTheDay, index) => {
        const buttonId = getElementIdentifier(index);
        return (
          <>
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
            <button
              onMouseDown={(event) => handleMouseDown(event, buttonId)}
              onMouseMove={(event) => handleMouseMove(event, buttonId)}
              onMouseUp={handleMouseUp}
              id={buttonId}
              key={buttonId}
              style={{ height: buttonHeight }}
            >
              {hourOfTheDay}
            </button>
          </>
        );
      })}
    </div>
  );
};

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
    return undefined;
  }
  const horizontalValue = relativePosition.relativeY;
  const numberOfBlocksOnClickableHour = 4;
  const valueOfEachBlockOnClickableHour = elementHeight / 4;
  const blocks = Array.from(
    Array(numberOfBlocksOnClickableHour).keys(),
    (item) => item + 1,
  );
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
