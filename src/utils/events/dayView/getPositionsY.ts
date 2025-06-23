import {
  fifteenMinBlocksInAHour,
  sizeOfEach15MinBlock,
} from '../../calendar/constants';
import { endLabel, startLabel } from '../../constants';

export const getMinimumEventFixedPositionY = (
  startFixedPositionY: number,
  endFixedPositionY: number,
) => {
  let endMinimumFixedPosition = endFixedPositionY;
  const eventHasMinimumWeight =
    Math.abs(endFixedPositionY - startFixedPositionY) >= sizeOfEach15MinBlock;
  if (!eventHasMinimumWeight) {
    endMinimumFixedPosition = startFixedPositionY + sizeOfEach15MinBlock;
  }
  return endMinimumFixedPosition;
};

/**
 * Considering we only allow creating events (through dragging withing the events container)
 * by using periods of 15 minutes (starting in 0 min, 15 min, etc) this function enables
 * retrieving this fixed position of the event (based on 15 min blocks) on the container.
 *
 * The result combines the size of 15 min blocks in px with the number of 15 min blocks received
 * and the size of hour pixel blocks in px with the number of hour blocks received
 *
 * When endOrStartOf15MinBlock is 'end', it creates 15 min events (as a default
 * for when the user only clicks inside the container without dragging) by adding
 * one 15 min block to the start position Y
 *
 * Example: If it is the first hour (0) with fifteen minutes (the 15 min block is 1),
 * the relative position is the result of multiplying the fifteenMinBlock received (1)
 * with the size of each 15 min block in px (result 12.5)
 *
 * For hours greater than one, we add to this value the container hours blocks in pixel
 * based on how many hours have passed, i.e., the hours value (for hour 1, we add 1
 * container hours block, for hour 2, we add 2 container hours blocks and so on).
 *
 * Since the 15 min block received was created based on the relative Y position and this
 * function uses the 15 min block to calculate the result, this function
 * don't have to directly use the relative Y position to know the end result
 *
 * @param block
 * @param endOrStartOf15MinBlock
 * @returns fixedRelativeY – the fixed position to fit in the closest fifteen minute block position
 */
export const getFixedRelativeY = (
  block: {
    hour: number;
    fifteenMinBlock: number;
  },
  endOrStartOf15MinBlock: typeof startLabel | typeof endLabel,
) => {
  const { fifteenMinBlock, hour } = block;
  const sizeOfAnHour = fifteenMinBlocksInAHour * sizeOfEach15MinBlock;
  const startOfBlock =
    hour * sizeOfAnHour + fifteenMinBlock * sizeOfEach15MinBlock;
  const endOfBlockWith15MinEventAsDefault = startOfBlock + sizeOfEach15MinBlock;
  const fixedRelativeY =
    endOrStartOf15MinBlock === startLabel
      ? startOfBlock
      : endOfBlockWith15MinEventAsDefault;
  return fixedRelativeY;
};
