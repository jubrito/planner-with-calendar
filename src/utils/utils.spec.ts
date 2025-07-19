import { deepCopy } from './utils';

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
      const copy = deepCopy(original);
      expect(copy).toStrictEqual(original);
    });
  });
  describe('getChunkArrayByChunkSize', () => {
    it.todo('todo');
  });
  describe('makeFirstLetterUppercase', () => {
    it.todo('todo');
  });
});
