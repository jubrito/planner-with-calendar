import { Months } from '../../../types/calendar/enums';
import { getMonthName } from '../../calendar/utils';
import { createEventTitle, getEventInfo, getEventTitle } from './getModalInfo';

describe('getModalInfo', () => {
  const defaultEnglishLocale = 'en-US';
  const year = 2025;
  const month = Months.JUNE;
  const day = 29;

  describe('getEventTitle', () => {
    it('should return event title for same and multi day events', () => {
      const sameDayContent = {
        date: 'date',
        time: 'time',
      };
      const multiDayTitle = { initialDate: 'initialDate', endDate: 'endDate' };
      const title = getEventTitle(sameDayContent, multiDayTitle);

      expect(title).toStrictEqual({
        sameDayTitle: 'Event on date time',
        multiDayTitle: 'Event from initialDate to endDate',
      });
    });
  });

  describe('getEventInfo', () => {
    it('should get event info from events from the first hour', () => {
      const hour = 11;
      const minutes = 12;
      const period = 'AM';
      const date = new Date(year, month, day, hour, minutes);
      const eventInfo = getEventInfo(date, defaultEnglishLocale);
      expect(eventInfo).toStrictEqual({
        year,
        month,
        day,
        hour,
        minutes,
        monthName: 'Jun',
        formattedFullTime: `11:${minutes} ${period}`,
        time: `11:${minutes}`,
        period: ` ${period}`,
        weekDay: 'Sun',
      });
    });

    it('should get event info from events from the last hour', () => {
      const hour = 23;
      const minutes = 12;
      const period = 'PM';
      const date = new Date(year, month, day, hour, minutes);
      const eventInfo = getEventInfo(date, defaultEnglishLocale);
      expect(eventInfo).toStrictEqual({
        year,
        month,
        day,
        hour,
        minutes,
        monthName: 'Jun',
        formattedFullTime: `11:${minutes} ${period}`,
        time: `11:${minutes}`,
        period: ` ${period}`,
        weekDay: 'Sun',
      });
    });
  });
  describe('createEventTitle()', () => {
    it('should add range to event title if same day content contains end', () => {
      const eventTitle = createEventTitle({ start: 'start', end: 'end' });
      expect(eventTitle).toBe('Event from start to end');
    });
    it('should not add range to event title if same day content does not contain end', () => {
      const eventTitle = createEventTitle({ start: 'start' });
      expect(eventTitle).toBe('Event on start');
    });
  });
});
