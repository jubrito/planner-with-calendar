import { EventOnUpdate } from '../../types/event';
import { validateEventOnUpdate } from './validation';

describe('validations', () => {
  describe('validateEventOnUpdate', () => {
    describe('Start date errors', () => {
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
    describe('End date errors', () => {
      it('should return endDate error message if end date is not provided', () => {
        const eventOnUpdate: Partial<EventOnUpdate> = {
          id: '',
          title: '',
          startDate: new Date(),
          endDate: undefined,
          location: '',
          description: '',
        };
        const errors = validateEventOnUpdate(eventOnUpdate);
        expect(errors).toStrictEqual({ endDate: 'End date is required' });
      });
      it('should return endDate error message if end date is invalid', () => {
        const eventOnUpdate: Partial<EventOnUpdate> = {
          id: '',
          title: '',
          startDate: new Date(),
          endDate: new Date(0 / 0),
          location: '',
          description: '',
        };
        const errors = validateEventOnUpdate(eventOnUpdate);
        expect(errors).toStrictEqual({
          endDate: 'End date must be a valid date',
        });
      });
      it('should return endDate error message if end date is before start date', () => {
        const eventOnUpdate: Partial<EventOnUpdate> = {
          id: '',
          title: '',
          startDate: new Date(),
          endDate: new Date(0),
          location: '',
          description: '',
        };
        const errors = validateEventOnUpdate(eventOnUpdate);
        expect(errors).toStrictEqual({
          endDate: 'End date must be after start date',
        });
      });
    });
  });
});
