import { EventStored } from '../../types/event';
import { getDateISOString } from '../calendar/utils';
import { getEventFieldErrors } from './validation';

describe('validations', () => {
  describe('validateeventOnUpdateMode', () => {
    it('should return empty object if no error was found', () => {
      const validEventOnUpdateMode: Partial<EventStored> = {
        id: '',
        title: '',
        startDate: getDateISOString(new Date()),
        endDate: getDateISOString(new Date()),
        location: '',
        description: '',
      };
      const errors = getEventFieldErrors(validEventOnUpdateMode);
      expect(errors).toStrictEqual({});
    });
    describe('Start date errors', () => {
      it('should return startDate error message if start date is not provided', () => {
        const invalidEventOnUpdateMode: Partial<EventStored> = {
          id: '',
          title: '',
          startDate: undefined,
          endDate: getDateISOString(new Date()),
          location: '',
          description: '',
        };
        const errors = getEventFieldErrors(invalidEventOnUpdateMode);
        expect(errors).toStrictEqual({ startDate: 'Start date is required' });
      });
      it.only('should return startDate error message if start date is invalid', () => {
        const invalidEventOnUpdateMode: Partial<EventStored> = {
          id: '',
          title: '',
          startDate: 'invalid date',
          endDate: getDateISOString(new Date()),
          location: '',
          description: '',
        };
        const errors = getEventFieldErrors(invalidEventOnUpdateMode);
        expect(errors).toStrictEqual({
          startDate: 'Start date must be a valid date',
        });
      });
    });
    describe('End date errors', () => {
      it('should return endDate error message if end date is not provided', () => {
        const invalidEventOnUpdateMode: Partial<EventStored> = {
          id: '',
          title: '',
          startDate: getDateISOString(new Date()),
          endDate: undefined,
          location: '',
          description: '',
        };
        const errors = getEventFieldErrors(invalidEventOnUpdateMode);
        expect(errors).toStrictEqual({ endDate: 'End date is required' });
      });
      it('should return endDate error message if end date is invalid', () => {
        const invalidEventOnUpdateMode: Partial<EventStored> = {
          id: '',
          title: '',
          startDate: getDateISOString(new Date()),
          endDate: 'invalid date',
          location: '',
          description: '',
        };
        const errors = getEventFieldErrors(invalidEventOnUpdateMode);
        expect(errors).toStrictEqual({
          endDate: 'End date must be a valid date',
        });
      });
      it('should return endDate error message if end date is before start date', () => {
        const invalidEventOnUpdateMode: Partial<EventStored> = {
          id: '',
          title: '',
          startDate: getDateISOString(new Date()),
          endDate: getDateISOString(new Date(0)),
          location: '',
          description: '',
        };
        const errors = getEventFieldErrors(invalidEventOnUpdateMode);
        expect(errors).toStrictEqual({
          endDate: 'End date must be after start date',
        });
      });
    });
  });
});
