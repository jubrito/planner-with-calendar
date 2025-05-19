import { Months } from '../../types/calendar/enums';
import {
  endLabel,
  IntlDateTimeFormat2Digit,
  IntlDateTimeFormatFull,
  IntlDateTimeFormatNumeric,
} from '../constants';
import {
  get2DigitsValue,
  getDateISOString,
  getDay,
  getFullDateTitle,
  getMonthIndex,
  getMonthName,
  getYear,
} from './utils';

describe('utils', () => {
  const year = 2025;
  const month = Months.DECEMBER;
  const day = 1;
  const localeEnglish = 'en-US';
  const localePortuguese = 'pt-BR';
  const date = new Date(year, month, day);
  describe('getFullDateTitle(...)', () => {
    it('should return full date title in english', () => {
      const formattedDate = new Intl.DateTimeFormat(localeEnglish, {
        dateStyle: IntlDateTimeFormatFull,
      }).format(date);
      const fullDateTitle = getFullDateTitle(year, month, day, localeEnglish);
      expect(fullDateTitle).toStrictEqual(formattedDate);
      expect(fullDateTitle).toStrictEqual('Monday, December 1, 2025');
    });
    it('should return full date title in portuguese', () => {
      const formattedDate = new Intl.DateTimeFormat(localePortuguese, {
        dateStyle: IntlDateTimeFormatFull,
      }).format(date);
      console.log(getDateISOString(date));
      const fullDateTitle = getFullDateTitle(
        year,
        month,
        day,
        localePortuguese,
      );
      const firstLetter = fullDateTitle.charAt(0).toUpperCase();
      expect(fullDateTitle).toStrictEqual(
        firstLetter + formattedDate.slice(1, formattedDate.length),
      );
      expect(fullDateTitle).toStrictEqual(
        'Segunda-feira, 1 de dezembro de 2025',
      );
    });
    it('should throw date error if date is invalid', () => {
      expect(() => getFullDateTitle(year, month, 0 / 0, localeEnglish)).toThrow(
        'Failed to get date title, date is invalid',
      );
    });
    it('should throw locale error if date is invalid', () => {
      expect(() => getFullDateTitle(year, month, day, `${0}`)).toThrow(
        'Failed to get date title, language is invalid',
      );
    });
  });
  describe('getDateISOString(date)', () => {
    it('should return ISO date', () => {
      const date = new Date(year, month, day);
      expect(getDateISOString(date)).toBe(date.toISOString());
    });
    it('should throw error date if date is invalid', () => {
      expect(() => getDateISOString(new Date(year, month, 0 / 0))).toThrow(
        'Failed to get date, date is invalid',
      );
    });
  });
  describe('getDay(date)', () => {
    it('should get day', () => {
      expect(getDay(date)).toBe(date.getDate());
      expect(getDay(date)).toBe(day);
    });
    it('should throw error date if date is invalid', () => {
      expect(() => getDay(new Date(year, month, 0 / 0))).toThrow(
        'Failed to get day, date is invalid',
      );
    });
  });
  describe('getMonthIndex(...)', () => {
    it('should get december month index', () => {
      expect(getMonthIndex(localeEnglish, date, IntlDateTimeFormat2Digit)).toBe(
        month,
      );
    });
    it('should get month index 0 for january', () => {
      const january = Months.JANUARY;
      expect(
        getMonthIndex(
          localeEnglish,
          new Date(year, january), // not definish options [for monthSyle] use the default (2-digit)
        ),
      ).toBe(january);
    });
    it('should get month index 0 for january', () => {
      const january = Months.JANUARY;
      expect(
        getMonthIndex(
          localeEnglish,
          new Date(year, january),
          IntlDateTimeFormat2Digit,
        ),
      ).toBe(january);
    });
    it('should get month index 11 for december with long option', () => {
      expect(
        getMonthIndex(
          localeEnglish,
          new Date(year, month, day),
          IntlDateTimeFormatNumeric,
        ),
      ).toBe(month);
    });
    it('should throw error date if date is invalid', () => {
      expect(() =>
        getMonthIndex(localeEnglish, new Date(year, month, 0 / 0)),
      ).toThrow('Failed to get month index, date is invalid');
    });
  });
  describe('get2DigitsValue(value)', () => {
    it('should return same value if it already has two digits', () => {
      const twoDigitsValue = '00';
      expect(get2DigitsValue(twoDigitsValue)).toBe(twoDigitsValue);
    });
    describe('When value needs to be modified', () => {
      it('should return value with zero added on the start if only value is provided and it does not have two digits yet', () => {
        expect(get2DigitsValue('5')).toBe('05');
      });
      it('should return value with zero added on the start if start param is provided and it does not have two digits yet', () => {
        expect(get2DigitsValue('5')).toBe('05');
      });
      it('should return value with zero added on the start if end params is provided and it does not have two digits yet', () => {
        expect(get2DigitsValue('5', endLabel)).toBe('50');
      });
    });
  });
  describe('getMonthName(...)', () => {
    it('should return december month name in english if arguments are valid', () => {
      expect(getMonthName(localeEnglish, date)).toBe('December');
    });
    it('should return december month name in portuguese if arguments are valid', () => {
      expect(getMonthName(localePortuguese, date)).toBe('Dezembro');
    });
    it('should throw error date if date is invalid', () => {
      expect(() =>
        getMonthName(localeEnglish, new Date(year, month, 0 / 0)),
      ).toThrow('Failed to get month name, date is invalid');
    });
  });
  describe('getYear(date)', () => {
    it('should return year if argument is valid', () => {
      expect(getYear(date)).toBe(year);
    });
    it('should throw error date if date is invalid', () => {
      expect(() => getYear(new Date(year, month, 0 / 0))).toThrow(
        'Failed to get year, date is invalid',
      );
    });
  });
});
