import {
  weekDaysNamesOnEnglishLongFormatMock,
  weekDaysNamesOnPortugueseLongFormatMock,
} from '../tests/mocks/utils/calendar';
import { getWeekDaysNames } from './weeks';

describe('weeks', () => {
  const localeEnUs = 'en-US';
  const localePtBr = 'pt-BR';
  describe('getWeekDaysNames', () => {
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
});
