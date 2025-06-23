import { EventStored } from '../../../types/event';
import { oneHourInMinutes } from '../../../utils/calendar/constants';
import { endLabel, startLabel } from '../../../utils/constants';
import { getFifteenMinuteBlock } from '../../../utils/events/dayView/getBlocks';
import {
  getFixedRelativeY,
  getMinimumEventFixedPositionY,
} from '../../../utils/events/dayView/getPositionsY';

export const calculateYPosition = (
  startDate: EventStored['startDate'],
  endDate: EventStored['endDate'],
) => {
  const startDateHours = new Date(startDate).getHours();
  const endDateMinutes = new Date(endDate).getMinutes();
  let endDateHours = new Date(endDate).getHours();
  const isMidnightFromNextDay = endDateHours === 0 && endDateMinutes === 0;
  const midnightFromNextDay = 24;
  endDateHours = isMidnightFromNextDay ? midnightFromNextDay : endDateHours;
  const startDateMinutes = new Date(startDate).getMinutes();
  const start15MinBlock = getFifteenMinuteBlock(
    startDateMinutes / oneHourInMinutes,
  );
  const end15MinBlock = getFifteenMinuteBlock(
    endDateMinutes / oneHourInMinutes,
  );
  const startBlock = {
    hour: startDateHours,
    minutes: startDateMinutes,
    fifteenMinBlock: start15MinBlock,
  };
  const zeroIndexedEnd15MinBlock = end15MinBlock - 1;
  const endBlock = {
    hour: endDateHours,
    minutes: endDateMinutes,
    fifteenMinBlock: zeroIndexedEnd15MinBlock,
  };
  const startY = getFixedRelativeY(startBlock, startLabel);
  const endY = getFixedRelativeY(endBlock, endLabel);
  const minimumEndY = getMinimumEventFixedPositionY(startY, endY);
  return { startY, endY: minimumEndY };
};
