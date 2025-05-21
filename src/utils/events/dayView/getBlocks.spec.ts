import { getFifteenMinuteBlock, getStartBlock } from './getBlocks';

describe('getBlocks', () => {
  const firstBlock = 0;
  const secondBlock = 1;
  const thirdBlock = 2;
  const lastBlock = 3;
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
    it('should return first block info if relative position corresponds to the last portion of the first hour planner block', () => {
      const relativeY = 0; // start of first hour, first 15 min block
      expect(getStartBlock(relativeY)).toStrictEqual({
        hour: 0,
        minutes: 0,
        fifteenMinBlock: firstBlock,
      });
    });
    it('should return last block info if relative position corresponds to the last portion of the first hour planner block', () => {
      const relativeY = 49; // end of first hour, last 15 min block
      expect(getStartBlock(relativeY)).toStrictEqual({
        hour: 0,
        minutes: 45,
        fifteenMinBlock: lastBlock,
      });
    });
  });
});
