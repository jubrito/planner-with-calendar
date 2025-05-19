import { Months } from '../../types/calendar/enums';
import { IntlDateTimeFormatFull } from '../constants';
import { getFullDateTitle } from './utils';

describe('utils', () => {
  const year = 2025;
  const month = Months.DECEMBER;
  const day = 1;
  const locale = 'en-US';
  const date = new Date(year, month, day);
  describe('getFullDateTitle(...)', () => {
    it('should return full date title in english', () => {
      const formattedDate = new Intl.DateTimeFormat(locale, {
        dateStyle: IntlDateTimeFormatFull,
      }).format(date);
      const fullDateTitle = getFullDateTitle(year, month, day, locale);
      expect(fullDateTitle).toStrictEqual(formattedDate);
      expect(fullDateTitle).toStrictEqual('Monday, December 1, 2025');
    });
    it('should throw date error if date is invalid', () => {
      expect(() => getFullDateTitle(3, Months.JANUARY, 0 / 0, locale)).toThrow(
        'Failed to get date title, date is invalid',
      );
    });
  });
});
