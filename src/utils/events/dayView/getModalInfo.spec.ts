import { getEventTitle } from './getModalInfo';

describe('getModalInfo', () => {
  describe('getEventTitle', () => {
    it('should return event title for same and multi day events', () => {
      const sameDayContent = {
        date: 'date',
        time: 'time',
      };
      const multiDayTitle = { initialDate: 'initialDate', endDate: 'endDate' };
      const title = getEventTitle(sameDayContent, multiDayTitle);

      expect(title).toBe({
        sameDayTitle: 'Event on date time',
        multiDayTitle: 'Event from initialDate to endDate',
      });
    });
  });
});
