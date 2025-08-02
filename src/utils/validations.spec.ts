import { validateDate, validateLocale } from './validations';

describe('validations', () => {
  describe('validateDate', () => {
    it('should throw error if date is invalid', () => {
      expect(() => validateDate(new Date(0 / 0), 'get date')).toThrow(
        'Failed to get date, date is invalid',
      );
    });
    it('should not throw error if date is not invalid', () => {
      expect(() => validateDate(new Date(), 'get date')).not.toThrow();
    });
  });
  describe('validateLocale', () => {
    it('should throw error if locale is invalid', () => {
      expect(() => validateLocale(`${0}`, 'get locale')).toThrow(
        'Failed to get locale, language is invalid',
      );
    });
    it('should not throw error if locale is not invalid', () => {
      expect(() => validateLocale('pt-NR', 'get locale')).not.toThrow();
    });
  });
});
