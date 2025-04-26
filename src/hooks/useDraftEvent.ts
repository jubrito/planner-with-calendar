import { useCallback, useState } from 'react';
import { EventBlock } from '../components/Planner/EventsContainer/EventsContainer';
import {
  getFixedRelativeY,
  getMinimumEventFixedPositionY,
} from '../components/Planner/EventsContainer/getPositionsY';
import {
  getEndBlock,
  getStartBlock,
} from '../components/Planner/EventsContainer/getBlocks';
import {
  getSelectedDayViewDay,
  getSelectedDayViewMonth,
  getSelectedDayViewYear,
} from '../redux/slices/dateSlice/selectors';
import { useSelector } from 'react-redux';
import { getLocaleLanguage } from '../redux/slices/localeSlice/selectors';
import { EventOnCreation } from '../types/event';

export const useEvent = () => {
  const locale = useSelector(getLocaleLanguage());
  const year = useSelector(getSelectedDayViewYear());
  const month = useSelector(getSelectedDayViewMonth(locale));
  const day = useSelector(getSelectedDayViewDay());
  const [draftEvent, setDraftEvent] = useState<EventBlock>();

  const createDraftEvent = useCallback(
    (relativeY: number) => {
      const startBlock = getStartBlock(relativeY);
      const endBlock = getEndBlock(startBlock);
      const fixedHourAnd15MinBlock = getFixedRelativeY(startBlock, 'start');
      setDraftEvent({
        title: '(No title)',
        eventId: `draft-${Date.now()}`,
        start: {
          fixedPositionY: fixedHourAnd15MinBlock,
          block: startBlock,
          date: new Date(year, month, day, startBlock.hour, startBlock.minutes),
        },
        end: {
          fixedPositionY: fixedHourAnd15MinBlock,
          block: endBlock,
          date: new Date(year, month, day, endBlock.hour, endBlock.minutes),
        },
      });
    },
    [year, month, day],
  );

  const updateDraftEvent = useCallback(
    (relativeY: number) => {
      const startBlock = getStartBlock(relativeY);
      const endBlock = getEndBlock(startBlock);
      const fixedHourAnd15MinBlock = getFixedRelativeY(startBlock, 'end');

      setDraftEvent((prev) => ({
        ...prev!,
        end: {
          fixedPositionY: fixedHourAnd15MinBlock,
          block: endBlock,
          date: new Date(year, month, day, endBlock.hour, endBlock.minutes),
        },
      }));
    },
    [year, month, day],
  );

  const clearDraftEvent = () => setDraftEvent(undefined);

  const createEvent = useCallback(
    (draftEvent: EventBlock): EventOnCreation => {
      const endMinimumFixedPosition = getMinimumEventFixedPositionY(
        draftEvent.start.fixedPositionY,
        draftEvent.end.fixedPositionY,
      );

      return {
        id: draftEvent.eventId.replace('draft', 'event'),
        title: draftEvent.title,
        startDate: new Date(
          year,
          month,
          day,
          draftEvent.start.block.hour,
          draftEvent.start.block.minutes,
        ),
        endDate: new Date(
          year,
          month,
          day,
          draftEvent.end.block.hour,
          draftEvent.end.block.minutes,
        ),
        dayViewPosition: {
          startY: draftEvent.start.fixedPositionY,
          endY: endMinimumFixedPosition,
        },
      };
    },
    [year, month, day],
  );

  return {
    draftEvent,
    createDraftEvent,
    updateDraftEvent,
    clearDraftEvent,
    createEvent,
  };
};
