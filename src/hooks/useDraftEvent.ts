import { useCallback, useState } from 'react';
import { EventOnCreate } from '../types/event';
import {
  getFixedRelativeY,
  getMinimumEventFixedPositionY,
} from '../components/Planner/EventsContainer/getPositionsY';
import {
  getEndBlock,
  getStartBlock,
} from '../components/Planner/EventsContainer/getBlocks';
import { EventStored } from '../types/event';
import { getDateISOString } from '../utils/calendar/utils';
import { DateConfig } from '../types/calendar/types';

export const useEvent = (
  year: DateConfig['year'],
  month: DateConfig['month'],
  day: DateConfig['day'],
) => {
  const [draftEvent, setDraftEvent] = useState<EventOnCreate>();

  const createDraftEvent = useCallback(
    (relativeY: number) => {
      const startBlock = getStartBlock(relativeY);
      const endBlock = getEndBlock(startBlock);
      const fixedHourAnd15MinBlock = getFixedRelativeY(startBlock, 'start');

      setDraftEvent({
        title: '(No title)',
        id: `draft-${Date.now()}`,
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
    (draftEvent: EventOnCreate): EventStored => {
      const endMinimumFixedPosition = getMinimumEventFixedPositionY(
        draftEvent.start.fixedPositionY,
        draftEvent.end.fixedPositionY,
      );
      const startDate = new Date(
        year,
        month,
        day,
        draftEvent.start.block.hour,
        draftEvent.start.block.minutes,
      );
      const endDate = new Date(
        year,
        month,
        day,
        draftEvent.end.block.hour,
        draftEvent.end.block.minutes,
      );

      return {
        id: draftEvent.id.replace('draft', 'event'),
        title: draftEvent.title,
        startDate: getDateISOString(startDate),
        endDate: getDateISOString(endDate),
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
