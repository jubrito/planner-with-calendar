import {
  fifteenMinBlocksInAHour,
  fifteenMinutesBlocks,
  numberOfHoursInADay,
  sizeOfEach15MinBlock,
  sizeOfEachHourBlock,
} from '../../calendar/constants';
import {
  getFixedRelativeY,
  getMinimumEventFixedPositionY,
} from './getPositionsY';

describe('getYPosition', () => {
  describe('getMinimumEventFixedPositionY()', () => {
    it('should return event original height if event has the minimum height of 15 minutes', () => {
      const startPositionY = 0;
      expect(
        getMinimumEventFixedPositionY(startPositionY, sizeOfEach15MinBlock),
      ).toBe(sizeOfEach15MinBlock);
      expect(
        getMinimumEventFixedPositionY(startPositionY, sizeOfEachHourBlock),
      ).toBe(sizeOfEachHourBlock);
    });
    it('should return event original height if event does not have the minimum height of 15 minutes', () => {
      const startPositionY = 0;
      const minimumY = startPositionY + sizeOfEach15MinBlock;
      expect(
        getMinimumEventFixedPositionY(startPositionY, startPositionY),
      ).toBe(minimumY);
      expect(getMinimumEventFixedPositionY(startPositionY, 1)).toBe(minimumY);

      expect(
        getMinimumEventFixedPositionY(startPositionY, sizeOfEach15MinBlock - 1),
      ).toBe(minimumY);
    });
  });

  describe('getFixedRelativeY', () => {
    const start = 'start';
    const end = 'end';
    const dayHours = Array.from(new Array(numberOfHoursInADay).keys()).map(
      (hourZeroIndexed) => hourZeroIndexed + 1,
    );
    describe("WHEN it calculates the 'start' position", () => {
      describe.each(Array.from(new Array(fifteenMinBlocksInAHour).keys()))(
        'calculates for each $fifteenMinBlock possible as we create events with a 15 min period',
        (currentFifteenMinBlock) => {
          it('should get position Y using first hour', () => {
            const positionY = getFixedRelativeY(
              {
                hour: 0,
                fifteenMinBlock:
                  fifteenMinutesBlocks.first * currentFifteenMinBlock,
              },
              start,
            );
            const sizeOf15MinBlocksResult =
              fifteenMinutesBlocks.first * fifteenMinBlocksInAHour;
            expect(positionY).toBe(
              sizeOf15MinBlocksResult * currentFifteenMinBlock,
            );
          });
        },
      );
      describe.each(dayHours)('calculate for each $dayHour', (dayHour) => {
        it('should get position Y from hours greater than 1', () => {
          const positionY = getFixedRelativeY(
            {
              hour: dayHour, // starts in 1
              fifteenMinBlock: fifteenMinutesBlocks.second,
            },
            start,
          );
          const sizeOf15MinBlocksResult =
            sizeOfEach15MinBlock * fifteenMinutesBlocks.second;
          const sizeOfHourBlocksResult = dayHour * sizeOfEachHourBlock;
          expect(positionY).toBe(
            sizeOfHourBlocksResult + sizeOf15MinBlocksResult,
          );
        });
      });
    });
    describe("WHEN it calculates the 'end' position", () => {
      describe.each(Array.from(new Array(fifteenMinBlocksInAHour).keys()))(
        'calculates for each $fifteenMinBlock possible as we create events with a 15 min period',
        (currentFifteenMinBlock) => {
          it('should get position Y using first hour', () => {
            const positionY = getFixedRelativeY(
              {
                hour: 0,
                fifteenMinBlock:
                  fifteenMinutesBlocks.first * currentFifteenMinBlock,
              },
              end, // endOrStartOf15MinBlock
            );
            const sizeOf15MinBlocksResult =
              fifteenMinutesBlocks.first * fifteenMinBlocksInAHour;
            const resultForStart =
              sizeOf15MinBlocksResult * currentFifteenMinBlock; // if endOrStartOf15MinBlock was 'start'
            expect(positionY).toBe(resultForStart + sizeOfEach15MinBlock);
          });
        },
      );
      describe.each(dayHours)('calculate for each $dayHour', (dayHour) => {
        it('should get position Y from hours greater than 1', () => {
          const positionY = getFixedRelativeY(
            {
              hour: dayHour, // starts in 1
              fifteenMinBlock: fifteenMinutesBlocks.second,
            },
            end, // endOrStartOf15MinBlock
          );
          const sizeOf15MinBlocksResult =
            sizeOfEach15MinBlock * fifteenMinutesBlocks.second;
          const sizeOfHourBlocksResult = dayHour * sizeOfEachHourBlock;
          const resultForStart =
            sizeOfHourBlocksResult + sizeOf15MinBlocksResult; // if endOrStartOf15MinBlock was 'start'
          expect(positionY).toBe(resultForStart + sizeOfEach15MinBlock);
        });
      });
    });
  });
});
