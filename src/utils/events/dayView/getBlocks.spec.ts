import { getFifteenMinuteBlock } from './getBlocks';

describe('getBlocks', () => {
  describe('getFifteenMinuteBlock(rest)', () => {
    const lastBlock = 3;
    it('should return as last block if rests are greater than or equal to 0.75 and smaller than 1', () => {
      expect(getFifteenMinuteBlock(0.75)).toBe(lastBlock);
      expect(getFifteenMinuteBlock(0.75999)).toBe(lastBlock);
      expect(getFifteenMinuteBlock(0.76)).toBe(lastBlock);
      expect(getFifteenMinuteBlock(0.999)).toBe(lastBlock);
      expect(getFifteenMinuteBlock(1)).not.toBe(lastBlock);
    });
  });
});
