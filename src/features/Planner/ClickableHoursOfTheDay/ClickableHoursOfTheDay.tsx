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
import { getBlockClicked } from '../../../utils/calendar/utils';

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
    console.log('draftEvent', draftEvent);
  }, [draftEvent]);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, buttonId: string) => {
      const buttonTargeted = event.currentTarget;
      const rect = buttonTargeted.getBoundingClientRect();
      const relativeY = event.clientY - rect.top;
      const buttonHeight = buttonTargeted.clientHeight;

      const relativeInitialPosition: RelativePosition['end'] = {
        // new
        relativeY,
      };

      const [_buttonLabel, hourBlock] = buttonTargeted.id.split('_'); // id format is button_<index>
      const fifteenMinBlock = getBlockClicked(
        // new
        buttonHeight,
        relativeInitialPosition,
      );

      setDraftEvent({
        eventId: `draft-${Date.now()}`,
        start: {
          buttonId,
          positionY: relativeY,
          block: { hourBlock: parseInt(hourBlock), fifteenMinBlock },
        },
        end: {
          buttonId,
          positionY: relativeY,
          block: { hourBlock: parseInt(hourBlock), fifteenMinBlock },
        },
      });
    },
    [],
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, buttonId: string) => {
      if (!draftEvent) return;

      const buttonTargeted = event.currentTarget;
      const rect = buttonTargeted.getBoundingClientRect();
      const buttonHeight = buttonTargeted.clientHeight;
      const relativeY = event.clientY - rect.top;
      const relativeInitialPosition: RelativePosition['end'] = {
        relativeY,
      };

      const [_buttonLabel, hourBlock] = buttonTargeted.id.split('_'); // id format is button_<index>
      const fifteenMinBlock = getBlockClicked(
        buttonHeight,
        relativeInitialPosition,
      );

      setDraftEvent((prev) => ({
        ...prev!,
        end: {
          buttonId,
          positionY: relativeY,
          block: {
            hourBlock: parseInt(hourBlock),
            fifteenMinBlock,
          },
        },
      }));
    },
    [draftEvent],
  );

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
      const endBlock = getBlockClicked(buttonHeight, relativeEndPosition);
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
      const initialBlock = getBlockClicked(
        buttonHeight,
        relativeInitialPosition,
      );
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
    <div className={styles.clickableHourOfTheDay}>
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
