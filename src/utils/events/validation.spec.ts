import { EventOnUpdate } from '../../types/event';
import { validateEventOnUpdate } from './validation';

describe('validations', () => {
  describe('validateEventOnUpdate', () => {
    it('should return startDate error message if start date is not provided', () => {
      const eventOnUpdate: Partial<EventOnUpdate> = {
        id: '',
        title: '',
        startDate: undefined,
        endDate: new Date(),
        location: '',
        description: '',
      };
      const errors = validateEventOnUpdate(eventOnUpdate);
      expect(errors).toStrictEqual({ startDate: 'Start date is required' });
    });
    it('should return startDate error message if start date is invalid', () => {
      const eventOnUpdate: Partial<EventOnUpdate> = {
        id: '',
        title: '',
        startDate: new Date(0 / 0),
        endDate: new Date(),
        location: '',
        description: '',
      };
      const errors = validateEventOnUpdate(eventOnUpdate);
      expect(errors).toStrictEqual({
        startDate: 'Start date must be a valid date',
      });
    });
  });
});
