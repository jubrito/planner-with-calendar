import {
  weekDaysNamesOnEnglishLongFormatMock,
  weekDaysNamesOnPortugueseLongFormatMock,
} from '../tests/mocks/utils/calendar';
import { getWeekDaysNames } from './weeks';

describe('weeks', () => {
  const localeEnUs = 'en-US';
  const localePtBr = 'pt-BR';
  describe('getWeekDaysNames', () => {
    it('should throw error if locale is invalid', () => {
      expect(() => getWeekDaysNames(`${0}`)).toThrow(
        'Failed to get week days names, language is invalid',
      );
    });
    it('should return week names long format', () => {
      expect(getWeekDaysNames(localeEnUs)).toStrictEqual(
        weekDaysNamesOnEnglishLongFormatMock,
      );
      expect(getWeekDaysNames(localePtBr)).toStrictEqual(
        weekDaysNamesOnPortugueseLongFormatMock,
      );
    });
  });
});
