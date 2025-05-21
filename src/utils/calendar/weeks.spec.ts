import { getWeekDaysNames } from './weeks';

describe('weeks', () => {
  describe('getWeekDaysNames', () => {
    it('should throw error if locale is invalid', () => {
      expect(() => getWeekDaysNames(`${0}`)).toThrow(
        'Failed to get week days names, language is invalid',
      );
    });
  });
});
