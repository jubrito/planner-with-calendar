import { deepCopy, getChunkArrayByChunkSize } from './utils';

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
  });
  describe('makeFirstLetterUppercase', () => {
    it.todo('todo');
  });
});
