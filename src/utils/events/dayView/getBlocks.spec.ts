import {
  fifteenMinutes,
  numberOfHoursInADay,
  oneHourInMinutes,
  sizeOfEach15MinBlock,
  sizeOfEachHourBlock,
} from '../../calendar/constants';
import { getEndBlock, getFifteenMinuteBlock, getStartBlock } from './getBlocks';

describe('getBlocks', () => {
  const firstBlock = 0;
  const secondBlock = 1;
  const thirdBlock = 2;
  const lastBlock = 3;
  const lastHourOfThePlanner = numberOfHoursInADay - 1; // 23

  describe('getFifteenMinuteBlock(rest)', () => {
    it('should return first block if rest is negative', () => {
      expect(getFifteenMinuteBlock(-1)).toBe(firstBlock);
    });
    it('should return first block if rest is equal to or greater than 0 and smaller than 0.25', () => {
      expect(getFifteenMinuteBlock(0)).toBe(firstBlock);
      expect(getFifteenMinuteBlock(0.19)).toBe(firstBlock);
      expect(getFifteenMinuteBlock(0.2499)).toBe(firstBlock);
      expect(getFifteenMinuteBlock(0.25)).not.toBe(firstBlock);
    });
    it('should return second block if rest is equal to or greater than 0.25 and smaller than 0.50', () => {
      expect(getFifteenMinuteBlock(0.2499)).not.toBe(secondBlock);
      expect(getFifteenMinuteBlock(0.25)).toBe(secondBlock);
      expect(getFifteenMinuteBlock(0.4999)).toBe(secondBlock);
      expect(getFifteenMinuteBlock(0.5)).not.toBe(secondBlock);
    });
    it('should return third block if rest is equal to or greater than 0.50 and smaller than 0.75', () => {
      expect(getFifteenMinuteBlock(0.499)).not.toBe(thirdBlock);
      expect(getFifteenMinuteBlock(0.5)).toBe(thirdBlock);
      expect(getFifteenMinuteBlock(0.7499)).toBe(thirdBlock);
      expect(getFifteenMinuteBlock(0.75)).not.toBe(thirdBlock);
    });
    it('should return last block if rest is greater than or equal to 0.75 and smaller than 1', () => {
      expect(getFifteenMinuteBlock(0.75)).toBe(lastBlock);
      expect(getFifteenMinuteBlock(0.75999)).toBe(lastBlock);
      expect(getFifteenMinuteBlock(0.999)).toBe(lastBlock);
      expect(getFifteenMinuteBlock(1)).not.toBe(lastBlock);
    });
  });

  // each hour block has 50px (divided in four 15 min blocks of 12.5px each)
  describe('getStartBlock(relativeY)', () => {
    it('should return next hour block info if relative position corresponds to the first portion of the next hour planner block', () => {
      const relativeY = 50; // start of next hour, first 15 min block
      expect(getStartBlock(relativeY)).toStrictEqual({
        hour: 1,
        minutes: 0,
        fifteenMinBlock: firstBlock,
      });
    });
    it('should return first 15 minutes block info of first hour when relative position is negative', () => {
      const relativeY = -1;
      expect(getStartBlock(relativeY)).toStrictEqual({
        hour: 0,
        minutes: 0,
        fifteenMinBlock: firstBlock,
      });
    });
    it('should last 15 minutes block info of last hour when relative position is negative', () => {
      const relativeY = sizeOfEachHourBlock * numberOfHoursInADay + 0.001;
      expect(getStartBlock(relativeY)).toStrictEqual({
        hour: numberOfHoursInADay - 1,
        minutes: 45,
        fifteenMinBlock: lastBlock,
      });
    });

    describe('When relative position corresponds to the first hour block', () => {
      it('should return first 15 minutes block info', () => {
        const relativeY = 0; // start of first hour, first 15 min block
        expect(getStartBlock(relativeY)).toStrictEqual({
          hour: 0,
          minutes: 0,
          fifteenMinBlock: firstBlock,
        });
      });
      it('should return second 15 minutes block info', () => {
        const relativeY = sizeOfEach15MinBlock;
        expect(getStartBlock(relativeY)).toStrictEqual({
          hour: 0,
          minutes: 15,
          fifteenMinBlock: secondBlock,
        });
      });
      it('should return third 15 minutes block info', () => {
        const relativeY = sizeOfEach15MinBlock * 2;
        expect(getStartBlock(relativeY)).toStrictEqual({
          hour: 0,
          minutes: 30,
          fifteenMinBlock: thirdBlock,
        });
      });
      it('should return last 15 minutes block info', () => {
        const relativeY = 49; // end of first hour, last 15 min block
        expect(getStartBlock(relativeY)).toStrictEqual({
          hour: 0,
          minutes: 45,
          fifteenMinBlock: lastBlock,
        });
      });
    });

    describe('When relative position corresponds to the last hour block', () => {
      const startOfLastHourFirstBlock =
        sizeOfEachHourBlock * lastHourOfThePlanner; // start of last hour, first 15 min block
      it('should return first 15 minutes block info', () => {
        const relativeY = startOfLastHourFirstBlock;
        expect(getStartBlock(relativeY)).toStrictEqual({
          hour: lastHourOfThePlanner,
          minutes: 0,
          fifteenMinBlock: firstBlock,
        });
      });
      it('should return second 15 minutes block info', () => {
        const relativeY = startOfLastHourFirstBlock + sizeOfEach15MinBlock;
        expect(getStartBlock(relativeY)).toStrictEqual({
          hour: lastHourOfThePlanner,
          minutes: 15,
          fifteenMinBlock: secondBlock,
        });
      });
      it('should return third 15 minutes block info', () => {
        const relativeY = startOfLastHourFirstBlock + sizeOfEach15MinBlock * 2;
        expect(getStartBlock(relativeY)).toStrictEqual({
          hour: lastHourOfThePlanner,
          minutes: 30,
          fifteenMinBlock: thirdBlock,
        });
      });
      it('should return last 15 minutes block info', () => {
        const relativeY = startOfLastHourFirstBlock + sizeOfEach15MinBlock * 3;
        expect(getStartBlock(relativeY)).toStrictEqual({
          hour: lastHourOfThePlanner,
          minutes: 45,
          fifteenMinBlock: lastBlock,
        });
      });
    });
  });

  describe('getEndBlock(block)', () => {
    describe('15 minute blocks changes', () => {
      it('should use minimum 15 block (0) when fifteen min block is smaller than min block min value (fifteenMinutesBlocks.first)', () => {
        const initialMinutes = 0;
        const initialHour = 0;
        expect(
          getEndBlock({
            hour: initialHour,
            minutes: initialMinutes,
            fifteenMinBlock: -1, // is threated like 0
          }),
        ).toStrictEqual({
          hour: initialHour,
          minutes: initialMinutes + fifteenMinutes,
          fifteenMinBlock: firstBlock + 1,
        });
      });
      it('should return maximum 15 min block (3) when fifteen min block is higher than min block max value (fifteenMinutesBlocks.last)', () => {
        const initialMinutes = 0;
        const initialHour = 0;
        expect(
          getEndBlock({
            hour: initialHour,
            minutes: initialMinutes,
            fifteenMinBlock: lastBlock + 1,
          }),
        ).toStrictEqual({
          hour: initialHour,
          minutes: initialMinutes + fifteenMinutes,
          fifteenMinBlock: lastBlock, // max value
        });
      });
      it('should return second 15 minutes block (1) when start is first block (0)', () => {
        const initialMinutes = 0;
        expect(
          getEndBlock({
            hour: 0,
            minutes: initialMinutes,
            fifteenMinBlock: firstBlock,
          }),
        ).toStrictEqual({
          hour: 0,
          minutes: initialMinutes + fifteenMinutes,
          fifteenMinBlock: secondBlock,
        });
      });
      it('should return third 15 minutes block (2) when start is second block (1)', () => {
        const initialMinutes = 15;
        expect(
          getEndBlock({
            hour: 0,
            minutes: initialMinutes,
            fifteenMinBlock: secondBlock,
          }),
        ).toStrictEqual({
          hour: 0,
          minutes: initialMinutes + fifteenMinutes,
          fifteenMinBlock: thirdBlock,
        });
      });
      it('should return last 15 minutes block (3) when start is third block (2)', () => {
        const initialMinutes = 30;
        expect(
          getEndBlock({
            hour: 0,
            minutes: initialMinutes,
            fifteenMinBlock: thirdBlock,
          }),
        ).toStrictEqual({
          hour: 0,
          minutes: initialMinutes + fifteenMinutes,
          fifteenMinBlock: lastBlock,
        });
      });
      it('should return last 15 minutes block (3, which is the limit) when start is last (3)', () => {
        const initialMinutes = 30;
        const initialHour = 0;
        expect(
          getEndBlock({
            hour: initialHour,
            minutes: initialMinutes,
            fifteenMinBlock: lastBlock,
          }),
        ).toStrictEqual({
          hour: initialHour,
          minutes: initialMinutes + fifteenMinutes,
          fifteenMinBlock: lastBlock,
        });
      });
    });
    describe('Hour changes', () => {
      it('should not change hour value if it is >= 0', () => {
        const initialMinutes = 0;
        const firstHour = 0;
        expect(
          getEndBlock({
            hour: firstHour,
            minutes: initialMinutes,
            fifteenMinBlock: firstBlock,
          }),
        ).toStrictEqual({
          hour: firstHour,
          minutes: initialMinutes + fifteenMinutes,
          fifteenMinBlock: secondBlock,
        });
      });
      it('should not change hour value if it is <= 24', () => {
        const initialMinutes = 0;
        expect(
          getEndBlock({
            hour: lastHourOfThePlanner,
            minutes: initialMinutes,
            fifteenMinBlock: firstBlock,
          }),
        ).toStrictEqual({
          hour: lastHourOfThePlanner,
          minutes: initialMinutes + fifteenMinutes,
          fifteenMinBlock: secondBlock,
        });
      });
      it('should use minimum hour value if hour is < 0', () => {
        const initialMinutes = 0;
        const firstHour = 0;
        expect(
          getEndBlock({
            hour: -1,
            minutes: initialMinutes,
            fifteenMinBlock: firstBlock,
          }),
        ).toStrictEqual({
          hour: firstHour,
          minutes: initialMinutes + fifteenMinutes,
          fifteenMinBlock: secondBlock,
        });
      });
      it('should use maximum hour value if hour is > 24', () => {
        const initialMinutes = 0;
        expect(
          getEndBlock({
            hour: numberOfHoursInADay,
            minutes: initialMinutes,
            fifteenMinBlock: firstBlock,
          }),
        ).toStrictEqual({
          hour: lastHourOfThePlanner,
          minutes: initialMinutes + fifteenMinutes,
          fifteenMinBlock: secondBlock,
        });
      });
    });
    describe('Minutes changes', () => {
      it('should return 15 minutes when start minutes is < 0 (result: 0 + 15)', () => {
        const initialMinutes = -1;
        expect(
          getEndBlock({
            hour: 0,
            minutes: initialMinutes,
            fifteenMinBlock: firstBlock,
          }),
        ).toStrictEqual({
          hour: 0,
          minutes: fifteenMinutes,
          fifteenMinBlock: secondBlock,
        });
      });
      it('should return 15 minutes when start minutes is 0 (result: 0 + 15)', () => {
        const initialMinutes = 0;
        expect(
          getEndBlock({
            hour: 0,
            minutes: initialMinutes,
            fifteenMinBlock: firstBlock,
          }),
        ).toStrictEqual({
          hour: 0,
          minutes: initialMinutes + fifteenMinutes,
          fifteenMinBlock: secondBlock,
        });
      });
      it('should return 30 minutes when start minutes is 15 (result: 15 + 15)', () => {
        const initialMinutes = 15;
        expect(
          getEndBlock({
            hour: 0,
            minutes: initialMinutes,
            fifteenMinBlock: secondBlock,
          }),
        ).toStrictEqual({
          hour: 0,
          minutes: initialMinutes + fifteenMinutes,
          fifteenMinBlock: thirdBlock,
        });
      });
      it('should return 45 minutes when start minutes is 30 (result: 30 + 15)', () => {
        const initialMinutes = 30;
        expect(
          getEndBlock({
            hour: 0,
            minutes: initialMinutes,
            fifteenMinBlock: thirdBlock,
          }),
        ).toStrictEqual({
          hour: 0,
          minutes: initialMinutes + fifteenMinutes,
          fifteenMinBlock: lastBlock,
        });
      });
      it('should return start of next hour when is full hour (i.e., minutes is 60)', () => {
        const initialHour = 0;
        const initialMinutes = 60;
        expect(
          getEndBlock({
            hour: initialHour,
            minutes: initialMinutes,
            fifteenMinBlock: firstBlock,
          }),
        ).toStrictEqual({
          hour: initialHour + 1,
          minutes: 0,
          fifteenMinBlock: firstBlock,
        });
      });
      it('should return 0 minutes (originally 60) when start minutes is > 60', () => {
        const initialHour = 0;
        expect(
          getEndBlock({
            hour: initialHour,
            minutes: oneHourInMinutes + 1,
            fifteenMinBlock: firstBlock,
          }),
        ).toStrictEqual({
          hour: initialHour + 1,
          minutes: 0,
          fifteenMinBlock: firstBlock,
        });
      });
    });
  });
});
