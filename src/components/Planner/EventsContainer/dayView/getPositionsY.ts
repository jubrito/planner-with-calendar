import {
  fifteenMinBlocksInAHour,
  sizeOfEach15MinBlock,
} from '../../calendar/constants';

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
 * Function to get a fixed position of the event
 *
 * Instead of creating events with the exact position that was selected,
 * if endOrStartOf15MinBlock is start, it gets the beggining of the hour
 * based on the fifteenMinBlock
 *
 * Example: If hour is 0 and block is 1, and we want to get the relative fixed
 * position, we multiply the fifteenMinBlock (1) with the size of each 15 min block (12.5)
 * to get 12.5 (which is the start of the first block). So regardless of the relativeY,
 * we calculate the relative Y fixed position based on the block (which took relativeY
 * into consideration). If we want to calculate for the hour 1, we need to add the previous
 * hours heights (in this case hour 0), thus we add 'hour (1) * sizeOfAnHour (12.5 * 4)' on top
 * When we want to get the end of the fifteenMinBlock, we need to add another fifteenMinBlock
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
  endOrStartOf15MinBlock: 'start' | 'end',
) => {
  const { fifteenMinBlock, hour } = block;
  const sizeOfAnHour = fifteenMinBlocksInAHour * sizeOfEach15MinBlock;
  const startOfBlock =
    hour * sizeOfAnHour + fifteenMinBlock * sizeOfEach15MinBlock;
  const fixedRelativeY =
    endOrStartOf15MinBlock === 'start'
      ? startOfBlock
      : startOfBlock + sizeOfEach15MinBlock;
  return fixedRelativeY;
};
