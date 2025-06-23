import { Months } from '../../types/calendar/enums';
import { getFormattedDateString } from '../calendar/utils';
import { formatDateIDFromDate } from './utils';

describe('utils', () => {
  describe('formatDateIDFromDate()', () => {
    it('should throw error if date provided is invalid', () => {
      expect(() => formatDateIDFromDate(`${new Date(0 / 0)}`)).toThrow(
        'Failed to get date, date is invalid',
      );
    });

    it('shold get formatted date in english when provided date is valid', () => {
      const id = formatDateIDFromDate(
        getFormattedDateString('en-US', new Date(2025, Months.DECEMBER, 11), {
          dateStyle: 'short',
        }),
      );
      expect(id).toBe('12/11/25');
    });
  });
});
