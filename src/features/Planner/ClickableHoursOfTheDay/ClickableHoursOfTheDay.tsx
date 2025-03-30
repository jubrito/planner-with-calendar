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
  // const relativePosition: RelativePosition = {
  //   initial: {
  //     relativeX: undefined,
  //     relativeY: undefined,
  //   },
  //   end: {
  //     relativeX: undefined,
  //     relativeY: undefined,
  //   },
  // };
  // let pendingClick = false;
  const pendingClickByButtonId: Record<string, boolean> = {};
  const createdEventBlockPositionByButtonId: Record<string, RelativePosition> =
    {};
  const blockClickedByButtonId: Record<
    string,
    {
      initial?: number;
      end?: number;
    }
  > = {};

  // const [positionSelected, setPositionSelected] = useState<RelativePosition>({
  //   initial: {
  //     relativeX: undefined,
  //     relativeY: undefined,
  //   },
  //   end: {
  //     relativeX: undefined,
  //     relativeY: undefined,
  //   },
  // });
  const [positionSelected, setPositionSelected] = useState<
    Record<string, RelativePosition>
  >({});

  const buttonRef = useRef(null);

  useEffect(() => {
    // console.log('**********************');
    // console.log('initial', positionSelected.initial);
    // console.log('end', positionSelected.end);
    // console.log('**********************');
    console.log('positionSelected', positionSelected);
  }, [positionSelected]);
  // }, [positionSelected]);

  // const activeHandlersByButtonId = Record<string,
  const handleMouse = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    mouseType: EventHandlerType,
    buttonId: string,
  ) => {
    // console.log('INITIAL --------');
    // console.log('mouseType', mouseType);
    // console.log('pendingClick', pendingClick);
    // console.log('relativePosition', relativePosition);
    console.log(
      ' pendingClickByButtonId[buttonId]',
      pendingClickByButtonId[buttonId],
    );
    // if (mouseType === mouseLeaveEventHandlerType && pendingClick === true) {
    const buttonHeight = event.currentTarget.clientHeight;

    if (
      mouseType === mouseLeaveEventHandlerType &&
      pendingClickByButtonId[buttonId] === true
    ) {
      // console.log('left');
      // relativePosition.initial = {
      //   relativeX: undefined,
      //   relativeY: undefined,
      // };
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

    // if (mouseType === mouseUpEventHandlerType && pendingClick === true) {
    if (
      mouseType === mouseUpEventHandlerType
      // && pendingClickByButtonId[buttonId] === true
    ) {
      // console.log('up and pending click');
      // relativePosition.end = {
      //   relativeX,
      //   relativeY,
      // };
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

      // setPositionSelected((prevValue) => ({
      //   ...prevValue,
      //   ...createdEventBlockPositionByButtonId,
      // }));
      pendingClickByButtonId[buttonId] = false;

      ///

      // const initialY = relativePosition.initial.relativeY;
      // const relativeInitialPosition = relativePosition[buttonId].initial.relativeY;
      const relativeInitialPosition =
        createdEventBlockPositionByButtonId[buttonId].initial;
      const relativeEndPosition =
        createdEventBlockPositionByButtonId[buttonId].end;
      const initialBlock = getBlockClicked(
        buttonHeight,
        relativeInitialPosition,
      );

      const endBlock = getBlockClicked(buttonHeight, relativeEndPosition);
      blockClickedByButtonId[buttonId] = {
        initial: initialBlock,
        end: endBlock,
      };
      console.log('initialBlock', initialBlock);
      console.log('endBlock', endBlock);
      // console.log(
      //   'blockClickedByButtonId[buttonId]',
      //   blockClickedByButtonId[buttonId],
      // );

      const initiaValue = {
        ...(relativeInitialPosition && { ...relativeInitialPosition }),
        ...(initialBlock && { initialBlock }),
      };
      // setPositionSelected((prevValue) => {
      //   const newValue = {
      //     ...prevValue,
      //     ...createdEventBlockPositionByButtonId,
      //     [buttonId]: {
      //       end: {
      //         ...createdEventBlockPositionByButtonId[buttonId].end,
      //         currentBlock: endBlock,
      //       },
      //     },
      //   };
      //   if (Object.keys(initiaValue).length > 0) {
      //     newValue[buttonId] = {
      //       initial: { ...initiaValue },
      //       end: { ...newValue[buttonId].end },
      //     };
      //   }
      //   return newValue;
      // });
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

      // console.log(
      //   'getInitialBlockNumberClickedInfo',
      //   getInitialBlockNumberClickedInfo,
      // );
      // console.log('getEndBlockNumberClickedInfo', getEndBlockNumberClickedInfo);
      // console.log(
      //   'blockClickedByButtonId[buttonId]',
      //   blockClickedByButtonId[buttonId],
      // );

      console.log(
        `initial: ${blockClickedByButtonId[buttonId]?.initial}, end: ${blockClickedByButtonId[buttonId]?.end}`,
      );

      // console.log('blocks', blocks);
      // console.log(
      //   'valueOfEachBlockOnClickableHour',
      //   valueOfEachBlockOnClickableHour,
      // );
      // console.log('buttonHeight', buttonHeight);
      // console.log('initialY', initialY);
      // checking if it is greater than value * 4 is pointless

      // const blockNumberClicked = getBlockNumberClicked();
      // console.log('blockNumberClicked', blockNumberClicked);
      ///

      // componentHeight =
    }
    // if (mouseType === mouseDownEventHandlerType && pendingClick === false) {
    if (
      mouseType === mouseDownEventHandlerType
      // && pendingClickByButtonId[buttonId] === false
    ) {
      // console.log('down');
      // relativePosition.initial = {
      //   relativeX,
      //   relativeY,
      // };
      const relativeInitialPosition: RelativePosition['end'] = {
        relativeX,
        relativeY,
      };
      const initialBlock = getBlockClicked(
        buttonHeight,
        relativeInitialPosition,
      );
      console.log('INITIAL initialBlock', initialBlock);

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
    // console.log('END --------');
    // console.log('mouseType', mouseType);
    // console.log('pendingClick', pendingClick);
    // console.log('relativePosition', relativePosition);
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
            ref={buttonRef}
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
