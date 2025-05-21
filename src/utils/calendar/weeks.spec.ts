import { Months } from '../../types/calendar/enums';
import {
  weekDaysNamesOnEnglishLongFormatMock,
  weekDaysNamesOnPortugueseLongFormatMock,
} from '../tests/mocks/utils/calendar';
import { getWeekDayName, getWeekDaysNames } from './weeks';

describe('weeks', () => {
  const localeEnUs = 'en-US';
  const localePtBr = 'pt-BR';
  const year = 2025;
  const month = Months.MAY;
  const validDay = 21;
  describe('getWeekDaysNames(locale)', () => {
    it('should get week names in english', () => {
      expect(getWeekDaysNames(localeEnUs)).toStrictEqual(
        weekDaysNamesOnEnglishLongFormatMock,
      );
    });
    it('should get week names in portuguese', () => {
      expect(getWeekDaysNames(localePtBr)).toStrictEqual(
        weekDaysNamesOnPortugueseLongFormatMock,
      );
    });
    it('should throw error if locale is invalid', () => {
      expect(() => getWeekDaysNames(`${0}`)).toThrow(
        'Failed to get week days names, language is invalid',
      );
    });
  });
  describe('getWeekDayName(...)', () => {
    it('should return week day name in english', () => {
      expect(getWeekDayName(year, month, validDay, localeEnUs)).toStrictEqual(
        'Wed',
      );
    });
    it('should throw error if date is invalid', () => {
      expect(() => getWeekDayName(year, month, 0 / 0, localeEnUs)).toThrow(
        'Failed to get week day name, date is invalid',
      );
    });
    it('should throw error if locale is invalid', () => {
      expect(() => getWeekDayName(year, month, validDay, `${0}`)).toThrow(
        'Failed to get week day name, language is invalid',
      );
    });
  });
});
