import {
  fifteenMinBlocksInAHour,
  fifteenMinutes,
  fifteenMinutesBlocks,
  hourBlocks,
  numberOfHoursInADay,
  oneHourInMinutes,
  sizeOfEach15MinBlock,
  sizeOfEachHourBlock,
} from '../../calendar/constants';
import { EventBlock } from '../../../types/event';

/**
 * Function to determine which fifteen minute block the user clicked
 *
 * In one hour we have 4 fifteen minutes blocks, so 1 / 4 (0.25) is
 * the end of the first block, (1 / 4) * 2 (0.5) is the end of the second
 * block and so on. The rest of the calculation of the getHourAnd15MinBlock()
 * function is compared with those values and if it is greater than 0.25 and
 * smaller than 0.5 for example, we know it is on the second block (1) as it is 0 indexed
 *
 * Example: continuing the fifteenMinuteBlock() example where the user click relativeY position is 49,
 * (remembering the container has 1200px with each hour block having 50px), a relativeY position of 49
 * indicates it should be the last fifteen minute block of the first hour. So if the floatHour calculated
 * on fifteenMinuteBlock() is 0.98 and we know the hour is 0, the rest (0.98) is compared with each possible
 * value (0.25, 0,5, 0.75, 1). As it is greater than 0.75 but smaller than 1, we know it is on the last block (3).
 *
 * @param rest the rest of the hour with decimals calculated on getHourAnd15MinBlock()
 * @returns fifteenMinuteBlock – the fifteen minute block of the hour the user clicked
 */
export const getFifteenMinuteBlock = (rest: number) => {
  const fifteenMinutesBlocksInOneHour = Array.from(
    Array(4).keys(),
    (index) => (1 / fifteenMinBlocksInAHour) * (index + 1),
  ); // [ 0.25, 0.5, 0.75, 1 ] each block after 1 hour divided by 4 (to get 4 blocks of 15 minutes)
  for (const [
    index,
    fifteenMinBlocksStartValue,
  ] of fifteenMinutesBlocksInOneHour.entries()) {
    if (rest < fifteenMinBlocksStartValue) {
      return index;
    }
  }
  return 0;
};

/**
 * Function to get the hour and the fifteen minute block
 * the user clicked (each hour has 15 minutes)
 *
 * @param relativeY the relative Y position of the click on the container
 * @returns {Object} { hour, fifteenMinBlock } – the hour and the fifteen minute of
 * that hour based on the click of the user on the clickable container
 *
 * Example: The container has 1200px so each hour block has 50px and
 * each 15 min block has 12.5px. If the user clicks on the container
 * and the click relativeY position is 49, it should be in the hour 0,
 * and should be the last fifteen minute block. So the floatHour would
 * be 0.98, which means the actual hour is the integer 0. The rest is
 * used to calculate the fifteen minute block on getFifteenMinuteBlock()
 */
export const getStartBlock = (relativeY: number): EventBlock => {
  const firstBlock = { hour: 0, fifteenMinBlock: 0, minutes: 0 };
  const lastBlock = {
    hour: numberOfHoursInADay - 1,
    fifteenMinBlock: 3,
    minutes: 45,
  };
  if (relativeY < 0) return firstBlock;
  if (relativeY > sizeOfEachHourBlock * numberOfHoursInADay) return lastBlock;

  const floatHour = relativeY / sizeOfEach15MinBlock / fifteenMinBlocksInAHour;
  const hour = Math.floor(floatHour);
  const rest = floatHour - hour;
  const fifteenMinBlock = getFifteenMinuteBlock(rest);
  return { hour, fifteenMinBlock, minutes: fifteenMinBlock * fifteenMinutes };
};

/**
 * Function to get the block values for the end of the event
 *
 * The fifteenMinuteBlock of the end should be the end of the current
 * fifteen minute block, which is the start of the next (so fifteenMinuteBlock + 1)
 *
 * The minute of the end should be the current minute + 15 minutes
 * (as we only store values of 15 minutes)
 *
 * If minute is 60 it means it is a whole hour, so minute should be 0
 * and we need the next hour
 *
 * @param block
 * @returns block for the end position
 */
export const getEndBlock = (block: EventBlock) => {
  const {
    hour,
    minutes: minutesStart,
    fifteenMinBlock: fifteenMinBlockStart,
  } = block;
  const numberOfHoursInADayZeroIndex = numberOfHoursInADay - 1;
  const firstMinimum = 0;
  const sanitizedHour =
    hour < hourBlocks.first
      ? hourBlocks.first
      : hour > numberOfHoursInADayZeroIndex
        ? numberOfHoursInADayZeroIndex
        : hour;
  const sanitizedMinutes =
    minutesStart < firstMinimum
      ? firstMinimum
      : minutesStart > oneHourInMinutes
        ? oneHourInMinutes
        : minutesStart;
  const sanitized15MinBlockStart =
    fifteenMinBlockStart > fifteenMinutesBlocks.last
      ? fifteenMinutesBlocks.last
      : fifteenMinBlockStart; // if it is greater than last 15 min block, should get next hour (so it's the first 15 min block)
  const fifteenMinBlockEnd =
    sanitized15MinBlockStart + 1 > fifteenMinutesBlocks.last
      ? sanitized15MinBlockStart
      : sanitized15MinBlockStart + 1;
  const endMinute = sanitizedMinutes + fifteenMinutes;
  const isFullHour = endMinute >= oneHourInMinutes;
  if (isFullHour)
    return { hour: sanitizedHour + 1, minutes: 0, fifteenMinBlock: 0 };

  return {
    hour: sanitizedHour,
    minutes: endMinute,
    fifteenMinBlock: fifteenMinBlockEnd,
  };
};
