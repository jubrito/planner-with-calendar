import { formatDateIDFromDate } from './utils';

describe('utils', () => {
  describe('formatDateIDFromDate()', () => {
    it('should throw error if date provided is invalid', () => {
      expect(() => formatDateIDFromDate(`${new Date(0 / 0)}`)).toThrow(
        'Failed to get date, date is invalid',
      );
    });
  });
});
