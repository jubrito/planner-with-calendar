import { Months } from '../../../types/calendar/enums';
import { getMonthName } from '../../calendar/utils';
import { getEventInfo, getEventTitle } from './getModalInfo';

describe('getModalInfo', () => {
  const defaultEnglishLocale = 'en-US';
  const year = 2025;
  const month = Months.JUNE;
  const day = 29;
  const hour = 23;
  const minutes = 12;

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
    it('should get event info from events from the last hour', () => {
      const date = new Date(year, month, day, hour, minutes);
      const eventInfo = getEventInfo(date, defaultEnglishLocale);
      const period = 'PM';
      expect(eventInfo).toStrictEqual({
        year,
        month,
        day,
        hour,
        minutes,
        monthName: 'Jun',
        formattedFullTime: `11:${minutes} ${period}`,
        time: `11:${minutes}`,
        period: ' PM',
        weekDay: 'Sun',
      });
    });
  });
});
