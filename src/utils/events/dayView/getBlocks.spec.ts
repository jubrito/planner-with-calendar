import {
  fifteenMinutes,
  numberOfHoursInADay,
  sizeOfEach15MinBlock,
  sizeOfEachHourBlock,
} from '../../calendar/constants';
import { getEndBlock, getFifteenMinuteBlock, getStartBlock } from './getBlocks';

describe('getBlocks', () => {
  const firstBlock = 0;
  const secondBlock = 1;
  const thirdBlock = 2;
  const lastBlock = 3;
  const lastHourOfTheDay = numberOfHoursInADay - 1; // 23

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
      const startOfLastHourFirstBlock = sizeOfEachHourBlock * lastHourOfTheDay; // start of last hour, first 15 min block
      it('should return first 15 minutes block info', () => {
        const relativeY = startOfLastHourFirstBlock;
        expect(getStartBlock(relativeY)).toStrictEqual({
          hour: lastHourOfTheDay,
          minutes: 0,
          fifteenMinBlock: firstBlock,
        });
      });
      it('should return second 15 minutes block info', () => {
        const relativeY = startOfLastHourFirstBlock + sizeOfEach15MinBlock;
        expect(getStartBlock(relativeY)).toStrictEqual({
          hour: lastHourOfTheDay,
          minutes: 15,
          fifteenMinBlock: secondBlock,
        });
      });
      it('should return third 15 minutes block info', () => {
        const relativeY = startOfLastHourFirstBlock + sizeOfEach15MinBlock * 2;
        expect(getStartBlock(relativeY)).toStrictEqual({
          hour: lastHourOfTheDay,
          minutes: 30,
          fifteenMinBlock: thirdBlock,
        });
      });
      it('should return last 15 minutes block info', () => {
        const relativeY = startOfLastHourFirstBlock + sizeOfEach15MinBlock * 3;
        expect(getStartBlock(relativeY)).toStrictEqual({
          hour: lastHourOfTheDay,
          minutes: 45,
          fifteenMinBlock: lastBlock,
        });
      });
    });
  });

  describe('getEndBlock(block)', () => {
    describe('When received block corresponds to the first hour block', () => {
      it('should return first 15 minutes block info', () => {
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
      it('should return second 15 minutes block info', () => {
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
      it('should return third 15 minutes block info', () => {
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
      it('should return first 15 minutes block info for the next hour if start 15 min block is the last block', () => {
        const initialMinutes = 45;
        const initialHour = 0;
        expect(
          getEndBlock({
            hour: initialHour,
            minutes: initialMinutes,
            fifteenMinBlock: lastBlock,
          }),
        ).toStrictEqual({
          hour: initialHour + 1,
          minutes: 0,
          fifteenMinBlock: firstBlock,
        });
      });
    });
    describe('When received block corresponds to the last hour block', () => {
      it('should return first 15 minutes block info', () => {
        const initialMinutes = 0;
        expect(
          getEndBlock({
            hour: lastHourOfTheDay,
            minutes: initialMinutes,
            fifteenMinBlock: firstBlock,
          }),
        ).toStrictEqual({
          hour: lastHourOfTheDay,
          minutes: initialMinutes + fifteenMinutes,
          fifteenMinBlock: secondBlock,
        });
      });
      it('should return second 15 minutes block info', () => {
        const initialMinutes = 15;
        expect(
          getEndBlock({
            hour: lastHourOfTheDay,
            minutes: initialMinutes,
            fifteenMinBlock: secondBlock,
          }),
        ).toStrictEqual({
          hour: lastHourOfTheDay,
          minutes: initialMinutes + fifteenMinutes,
          fifteenMinBlock: thirdBlock,
        });
      });
      it('should return third 15 minutes block info', () => {
        const initialMinutes = 30;
        expect(
          getEndBlock({
            hour: lastHourOfTheDay,
            minutes: initialMinutes,
            fifteenMinBlock: thirdBlock,
          }),
        ).toStrictEqual({
          hour: lastHourOfTheDay,
          minutes: initialMinutes + fifteenMinutes,
          fifteenMinBlock: lastBlock,
        });
      });
      it('should return first 15 minutes block info for the next hour if start 15 min block is the last block', () => {
        const initialMinutes = 45;
        expect(
          getEndBlock({
            hour: lastHourOfTheDay,
            minutes: initialMinutes,
            fifteenMinBlock: lastBlock,
          }),
        ).toStrictEqual({
          hour: numberOfHoursInADay, // lastHourOfTheDay + 1
          minutes: 0,
          fifteenMinBlock: firstBlock,
        });
      });
    });
    // it('full hour')
  });
});
