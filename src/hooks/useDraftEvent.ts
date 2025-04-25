import { useState } from 'react';
import { EventBlock } from '../components/Planner/ClickableHoursOfTheDay/ClickableHoursOfTheDay';
import { getFixedRelativeY } from '../components/Planner/ClickableHoursOfTheDay/getPositionsY';
import {
  getEndBlock,
  getStartBlock,
} from '../components/Planner/ClickableHoursOfTheDay/getBlocks';
import {
  getSelectedDayViewDay,
  getSelectedDayViewMonth,
  getSelectedDayViewYear,
} from '../redux/slices/dateSlice/selectors';
import { useSelector } from 'react-redux';
import { getLocaleLanguage } from '../redux/slices/localeSlice/selectors';

export const useEvent = () => {
  const locale = useSelector(getLocaleLanguage());
  const year = useSelector(getSelectedDayViewYear());
  const month = useSelector(getSelectedDayViewMonth(locale));
  const day = useSelector(getSelectedDayViewDay());
  const [draftEvent, setDraftEvent] = useState<EventBlock>();

  const createDraftEvent = (relativeY: number) => {
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
  };

  const updateDraftEvent = (relativeY: number) => {
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
  };

  const clearDraftEvent = () => setDraftEvent(undefined);

  return {
    draftEvent,
    createDraftEvent,
    updateDraftEvent,
    clearDraftEvent,
  };
};
