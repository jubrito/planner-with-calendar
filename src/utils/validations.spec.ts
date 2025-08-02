import { validateDate } from './validations';

describe('validations', () => {
  describe('validateDate', () => {
    it('should throw error if date is invalid', () => {
      expect(() => validateDate(new Date(0 / 0), 'get date')).toThrow(
        'Failed to get date, date is invalid',
      );
    });
  });
});
