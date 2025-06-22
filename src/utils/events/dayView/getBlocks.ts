import {
  fifteenMinBlocksInAHour,
  fifteenMinutes,
  fifteenMinutesBlocks,
  hourBlocks,
  numberOfHoursInADay,
  oneHourInMinutes,
  plannerContainerSize,
  sizeOfEach15MinBlock,
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
export function getStartBlock(relativeY: number): EventBlock {
  const firstBlock = { hour: 0, fifteenMinBlock: 0, minutes: 0 };
  const lastBlock = {
    hour: numberOfHoursInADay - 1,
    fifteenMinBlock: 3,
    minutes: 45,
  };
  if (relativeY < 0) return firstBlock;
  if (relativeY > plannerContainerSize) return lastBlock;

  const floatHour = relativeY / sizeOfEach15MinBlock / fifteenMinBlocksInAHour;
  const hour = Math.floor(floatHour);
  const rest = floatHour - hour;
  const fifteenMinBlocksInAnHour = getFifteenMinuteBlock(rest);
  return {
    hour,
    fifteenMinBlock: fifteenMinBlocksInAnHour,
    minutes: fifteenMinBlocksInAnHour * fifteenMinutes,
  };
}

function constrainValueToRange(
  initialValue: number,
  minimum: number,
  maximum: number,
) {
  const isNegative = initialValue < minimum;
  const exceedsMaximum = initialValue > maximum;
  if (isNegative) return minimum;
  if (exceedsMaximum) return maximum;
  return initialValue;
}

/**
 * Function to get the block values for the end of the event
 *
 * * Hour
 * Always stays the same
 *
 * * Fifteen Minute Block:
 * The end fifteenMinuteBlock should be the end of the current
 * fifteen minute block, which is the start of the next (so fifteenMinuteBlock + 1)
 *
 * * Minutes
 * The actual minutes of the end of the event should be the current minute + 15 minutes
 * (as we only store values of 15 minutes)]
 *
 * Note: If minutes is "60" it means it is a whole hour, so minute and 15 min will be transformed into 00
 *
 * @param block
 * @returns block for the end position
 */

export const getEndBlock = (block: EventBlock) => {
  const {
    hour: hourStart,
    minutes: minutesStart,
    fifteenMinBlock: fifteenMinBlockStart,
  } = block;
  const numberOfHoursInADayZeroIndex = numberOfHoursInADay - 1;
  const minimumMinutes = 0;
  const minimum15MinBlock = 0;
  const validHour = constrainValueToRange(
    hourStart,
    hourBlocks.first,
    numberOfHoursInADayZeroIndex,
  );
  const validMinutes = constrainValueToRange(
    minutesStart,
    minimumMinutes,
    oneHourInMinutes,
  );
  const valid15MinBlock = constrainValueToRange(
    fifteenMinBlockStart,
    minimum15MinBlock,
    fifteenMinutesBlocks.last,
  );
  const valid15MinBlockIsLastOne =
    valid15MinBlock + 1 > fifteenMinutesBlocks.last;
  const startOfNext15MinBlock = valid15MinBlockIsLastOne
    ? valid15MinBlock
    : valid15MinBlock + 1;
  const endMinute = validMinutes + fifteenMinutes;
  const isFullHour = endMinute >= oneHourInMinutes;

  if (isFullHour)
    return { hour: validHour + 1, minutes: 0, fifteenMinBlock: 0 };

  return {
    hour: validHour,
    minutes: endMinute,
    fifteenMinBlock: startOfNext15MinBlock,
  };
};
