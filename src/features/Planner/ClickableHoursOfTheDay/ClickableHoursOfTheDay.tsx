/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  EventHandlerType,
  RelativePosition,
} from '../../../types/calendar/types';
import {
  endRelativePosition,
  initialRelativePosition,
  mouseDownEventHandlerType,
  mouseLeaveEventHandlerType,
  mouseUpEventHandlerType,
} from '../../../utils/calendar/constants';
import styles from './clickable-hours-of-the-day.module.scss';

type ClickableHoursOfTheDayProps = {
  hoursOfTheDay: string[];
  handleMouseInteraction: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    eventType: EventHandlerType,
  ) => void;
};

interface TimeBlock {
  // new
  buttonId: string;
  positionY: number;
  block: {
    hourBlock?: number;
    fifteenMinBlock?: number;
  };
}

interface EventBlock {
  // new
  eventId: string;
  start: TimeBlock;
  end: TimeBlock;
}

export const ClickableHoursOfTheDay = ({
  hoursOfTheDay,
}: ClickableHoursOfTheDayProps) => {
  const [draftEvent, setDraftEvent] = useState<EventBlock | null>(null); // new
  const [events, setEvents] = useState<EventBlock[]>([]); // new

  useEffect(() => {
    console.log('events', events);
  }, [events]);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, buttonId: string) => {
      const buttonTargeted = event.currentTarget;
      const rect = buttonTargeted.getBoundingClientRect();
      const relativeY = event.clientY - rect.top;
      const buttonHeight = buttonTargeted.clientHeight;
      const relativeInitialPosition: RelativePosition['end'] = {
        relativeY,
      };
      const hourBlock = getHourBlock(buttonTargeted.id);
      const fifteenMinBlock = get15MinBlock(
        buttonHeight,
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
      const buttonHeight = buttonTargeted.clientHeight;
      const relativeY = event.clientY - rect.top;
      const relativeInitialPosition: RelativePosition['end'] = {
        relativeY,
      };

      const hourBlock = getHourBlock(buttonTargeted.id);
      const fifteenMinBlock = get15MinBlock(
        buttonHeight,
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

  return (
    <div
      className={styles.clickableHourOfTheDay}
      onMouseLeave={handleMouseLeaveContainer}
    >
      {hoursOfTheDay.map((hourOfTheDay, index) => {
        const buttonId = getElementIdentifier(index);
        return (
          <button
            onMouseDown={(event) => handleMouseDown(event, buttonId)}
            onMouseMove={(event) => handleMouseMove(event, buttonId)}
            onMouseUp={handleMouseUp}
            id={buttonId}
            key={buttonId}
          >
            {hourOfTheDay}
          </button>
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
