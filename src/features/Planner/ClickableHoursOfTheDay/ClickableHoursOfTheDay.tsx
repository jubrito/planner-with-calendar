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

  const pendingClickByButtonId: Record<string, boolean> = {};
  const newEventBlockByButtonId: Record<string, RelativePosition> = {};
  const [newEventBlocksResultByButtonId, setNewEventBlocksResultByButtonId] =
    useState<Record<string, RelativePosition>>({});

  // useEffect(() => {
  //   console.log('positionSelected', newEventBlocksResultByButtonId);
  // }, [newEventBlocksResultByButtonId]);
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

  const handleMouse = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    mouseType: EventHandlerType,
    buttonId: string,
  ) => {
    const buttonHeight = event.currentTarget.clientHeight;
    if (
      mouseType === mouseLeaveEventHandlerType &&
      pendingClickByButtonId[buttonId] === true
    ) {
      newEventBlockByButtonId[buttonId] = {
        ...newEventBlockByButtonId[buttonId],
        end: {
          ...(newEventBlockByButtonId[buttonId] &&
            newEventBlockByButtonId[buttonId][endRelativePosition] && {
              ...newEventBlockByButtonId[buttonId][endRelativePosition],
            }),
          relativeX: undefined,
          relativeY: undefined,
        },
      };
      pendingClickByButtonId[buttonId] = false;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = event.clientX - rect.left;
    const relativeY = event.clientY - rect.top;
    if (mouseType === mouseUpEventHandlerType) {
      newEventBlockByButtonId[buttonId] = {
        ...newEventBlockByButtonId[buttonId],
        end: {
          ...(newEventBlockByButtonId[buttonId] &&
            newEventBlockByButtonId[buttonId][endRelativePosition] && {
              ...newEventBlockByButtonId[buttonId][endRelativePosition],
            }),
          relativeX,
          relativeY,
        },
      };
      pendingClickByButtonId[buttonId] = false;
      const relativeEndPosition = newEventBlockByButtonId[buttonId].end;
      const endBlock = get15MinBlock(buttonHeight, relativeEndPosition);
      setNewEventBlocksResultByButtonId((prevValue) => ({
        ...prevValue,
        ...newEventBlockByButtonId,
        [buttonId]: {
          end: {
            ...newEventBlockByButtonId[buttonId].end,
            currentBlock: endBlock,
          },
        },
      }));
    }
    if (mouseType === mouseDownEventHandlerType) {
      const relativeInitialPosition: RelativePosition['end'] = {
        relativeX,
        relativeY,
      };
      const initialBlock = get15MinBlock(buttonHeight, relativeInitialPosition);
      newEventBlockByButtonId[buttonId] = {
        ...newEventBlockByButtonId[buttonId],
        initial: {
          ...(newEventBlockByButtonId[buttonId] &&
            newEventBlockByButtonId[buttonId][initialRelativePosition] && {
              ...newEventBlockByButtonId[buttonId][initialRelativePosition],
            }),
          relativeX,
          relativeY,
          currentBlock: initialBlock,
        },
      };
      pendingClickByButtonId[buttonId] = true;
    }
  };

  const getElementIdentifier = (index: number, hourOfTheDay: string) =>
    `hourblock_${index}`.replace(' ', '');
  return (
    <div
      className={styles.clickableHourOfTheDay}
      onMouseLeave={handleMouseLeaveContainer}
    >
      {hoursOfTheDay.map((hourOfTheDay, index) => {
        const hourOfTheDayElementId = getElementIdentifier(index, hourOfTheDay);
        pendingClickByButtonId[hourOfTheDayElementId] = false;
        return (
          <button
            onMouseDown={
              (event) =>
                // handleMouse(
                //   event,
                //   mouseDownEventHandlerType,
                //   hourOfTheDayElementId,
                // )
                handleMouseDown(event, hourOfTheDayElementId)
              // handleMouseInteraction(event, mouseDownEventHandlerType)
            }
            onMouseMove={(event) =>
              handleMouseMove(event, hourOfTheDayElementId)
            }
            onMouseUp={handleMouseUp}
            // onMouseUp={
            //   (event) =>
            //     handleMouse(
            //       event,
            //       mouseUpEventHandlerType,
            //       hourOfTheDayElementId,
            //     )
            //   // handleMouseInteraction(event, mouseUpEventHandlerType)
            // }
            // onMouseLeave={(event) =>
            //   handleMouse(event, mouseLeaveEventHandlerType)
            // }
            id={hourOfTheDayElementId}
            key={hourOfTheDayElementId}
          >
            {hourOfTheDay}
          </button>
        );
      })}
    </div>
  );
};
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
