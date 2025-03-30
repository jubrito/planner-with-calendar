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
  const createdEventBlockPositionByButtonId: Record<string, RelativePosition> =
    {};
  const [positionSelected, setPositionSelected] = useState<
    Record<string, RelativePosition>
  >({});

  useEffect(() => {
    console.log('positionSelected', positionSelected);
  }, [positionSelected]);

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
      createdEventBlockPositionByButtonId[buttonId] = {
        ...createdEventBlockPositionByButtonId[buttonId],
        end: {
          ...(createdEventBlockPositionByButtonId[buttonId] &&
            createdEventBlockPositionByButtonId[buttonId][
              endRelativePosition
            ] && {
              ...createdEventBlockPositionByButtonId[buttonId][
                endRelativePosition
              ],
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
      createdEventBlockPositionByButtonId[buttonId] = {
        ...createdEventBlockPositionByButtonId[buttonId],
        end: {
          ...(createdEventBlockPositionByButtonId[buttonId] &&
            createdEventBlockPositionByButtonId[buttonId][
              endRelativePosition
            ] && {
              ...createdEventBlockPositionByButtonId[buttonId][
                endRelativePosition
              ],
            }),
          relativeX,
          relativeY,
        },
      };
      pendingClickByButtonId[buttonId] = false;
      const relativeEndPosition =
        createdEventBlockPositionByButtonId[buttonId].end;
      const endBlock = getBlockClicked(buttonHeight, relativeEndPosition);
      setPositionSelected((prevValue) => ({
        ...prevValue,
        ...createdEventBlockPositionByButtonId,
        [buttonId]: {
          end: {
            ...createdEventBlockPositionByButtonId[buttonId].end,
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
      createdEventBlockPositionByButtonId[buttonId] = {
        ...createdEventBlockPositionByButtonId[buttonId],
        initial: {
          ...(createdEventBlockPositionByButtonId[buttonId] &&
            createdEventBlockPositionByButtonId[buttonId][
              initialRelativePosition
            ] && {
              ...createdEventBlockPositionByButtonId[buttonId][
                initialRelativePosition
              ],
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
