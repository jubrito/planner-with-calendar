import {
  fifteenMinBlocksInAHour,
  fifteenMinutesBlocks,
} from '../../calendar/constants';
import { getFixedRelativeY } from './getPositionsY';

describe('getYPosition', () => {
  describe('getFixedRelativeY', () => {
    const start = 'start';
    const end = 'end';
    describe('When it calculates the start position', () => {
      describe.each(Array.from(new Array(fifteenMinBlocksInAHour).keys()))(
        'calculates for each $fifteenMinBlock possible as we create events with a 15 min period',
        (fifteenMinBlock) => {
          it('should get position Y using first hour', () => {
            console.log('fifteenMinBlock', fifteenMinBlock);
            const positionY = getFixedRelativeY(
              {
                hour: 0,
                fifteenMinBlock: fifteenMinutesBlocks.first * fifteenMinBlock,
              },
              start,
            );
            expect(positionY).toBe(
              fifteenMinutesBlocks.first *
                fifteenMinBlocksInAHour *
                fifteenMinBlock,
            );
          });
        },
      );
    });
  });
});
