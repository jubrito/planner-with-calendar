/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react';
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

export const ClickableHoursOfTheDay = ({
  hoursOfTheDay,
  handleMouseInteraction,
}: ClickableHoursOfTheDayProps) => {
  const pendingClickByButtonId: Record<string, boolean> = {};
  const newEventBlockByButtonId: Record<string, RelativePosition> = {};
  const [newEventBlocksResultByButtonId, setNewEventBlocksResultByButtonId] =
    useState<Record<string, RelativePosition>>({});

  useEffect(() => {
    console.log('positionSelected', newEventBlocksResultByButtonId);
  }, [newEventBlocksResultByButtonId]);

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
    `hourblock_${index}_${hourOfTheDay}`.replace(' ', '');
  return (
    <div className={styles.clickableHourOfTheDay}>
      {hoursOfTheDay.map((hourOfTheDay, index) => {
        const hourOfTheDayElementId = getElementIdentifier(index, hourOfTheDay);
        pendingClickByButtonId[hourOfTheDayElementId] = false;
        return (
          <button
            onMouseDown={
              (event) =>
                handleMouse(
                  event,
                  mouseDownEventHandlerType,
                  hourOfTheDayElementId,
                )
              // handleMouseInteraction(event, mouseDownEventHandlerType)
            }
            onMouseUp={
              (event) =>
                handleMouse(
                  event,
                  mouseUpEventHandlerType,
                  hourOfTheDayElementId,
                )
              // handleMouseInteraction(event, mouseUpEventHandlerType)
            }
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
