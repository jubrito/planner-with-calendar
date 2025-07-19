import {
  deepCopy,
  getChunkArrayByChunkSize,
  makeFirstLetterUppercase,
} from './utils';

describe('utils', () => {
  describe('deepCopy', () => {
    it('should clone each property of element and return clone', () => {
      const original = {
        property: 1,
        otherProperty: {
          anotherProperty: true,
        },
        date: new Date(),
        function: () => false,
      };
      expect(deepCopy(original)).toStrictEqual(original);
    });
  });
  describe('getChunkArrayByChunkSize', () => {
    it('should return empty array when input awway is empty', () => {
      const chunk = getChunkArrayByChunkSize([], 5);
      expect(chunk).toEqual([]);
    });
    it('should handle chunk size equal to array length', () => {
      const input = [1, 2, 3, 4, 5];
      const result = getChunkArrayByChunkSize(input, 5);
      expect(result).toEqual([input]);
    });
    it('should return chunk with original array when chunk size is 0', () => {
      const input = [1, 2, 3, 4, 5];
      const result = getChunkArrayByChunkSize(input, 0);
      expect(result).toEqual([input]);
    });
    it('should split array into multiple chunks when needed', () => {
      const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const result = getChunkArrayByChunkSize(input, 3);
      expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]);
    });
    it('should handle chunk size of 1', () => {
      const input = ['a', 'b', 'c'];
      const result = getChunkArrayByChunkSize(input, 1);
      expect(result).toEqual([['a'], ['b'], ['c']]);
    });
    it('should handle non-integer chunk sizes by using floor', () => {
      const input = [1, 2, 3, 4, 5, 6];
      const result = getChunkArrayByChunkSize(input, 2.9);
      expect(result).toEqual([
        [1, 2],
        [3, 4],
        [5, 6],
      ]);
    });
  });
  describe('makeFirstLetterUppercase', () => {
    it('should make first letter uppercase', () => {
      const first = 'first';
      const second = 'sECOND';
      const third = 'THIRD';
      expect(makeFirstLetterUppercase(first)).toBe('First');
      expect(makeFirstLetterUppercase(second)).toBe('SECOND');
      expect(makeFirstLetterUppercase(third)).toBe('THIRD');
    });
  });
});
