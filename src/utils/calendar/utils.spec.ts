import { Months } from '../../types/calendar/enums';
import { IntlDateTimeFormatFull } from '../constants';
import { getDateISOString, getDay, getFullDateTitle } from './utils';

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
  describe('getDateISOString(date)', () => {
    it('should get day', () => {
      const date = new Date(year, month, day);
      expect(getDay(date)).toBe(date.getDate());
    });
    it('should throw error date if date is invalid', () => {
      expect(() => getDay(new Date(year, month, 0 / 0))).toThrow(
        'Failed to get day, date is invalid',
      );
    });
  });
});
