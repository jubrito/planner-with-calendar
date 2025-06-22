import { Months } from '../../../types/calendar/enums';
import { EventDetailsView } from '../../../types/event';
import { dashSeparator } from '../../constants';
import {
  createEventTitle,
  getEventInfo,
  getEventTitle,
  getMultiDayEventText,
  getSameDayEventText,
  isSameDayEvent,
} from './getModalInfo';

describe('getModalInfo', () => {
  const defaultEnglishLocale = 'en-US';
  const year = 2025;
  const month = Months.JUNE;
  const day = 29;
  const monthName = 'Jun';
  const weekDay = 'Sun';

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
        monthName,
        formattedFullTime: `11:${minutes} ${period}`,
        time: `11:${minutes}`,
        period: ` ${period}`,
        weekDay,
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
        monthName,
        formattedFullTime: `11:${minutes} ${period}`,
        time: `11:${minutes}`,
        period: ` ${period}`,
        weekDay,
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

  describe('getSameDayEventText()', () => {
    it('should create same day event title within same period', () => {
      const startHour = 10;
      const endHour = 10;
      const startMinutes = 15;
      const endMinutes = 30;
      const startPeriod = ' AM';
      const endPeriod = ' AM';
      const startTime = `${startHour}:${startMinutes}`;
      const endTime = `${endHour}:${endMinutes}`;
      const startEvent: EventDetailsView = {
        year,
        month,
        day,
        hour: startHour,
        minutes: startMinutes,
        monthName,
        formattedFullTime: `${startTime} ${startPeriod}`,
        time: `${startTime}`,
        period: startPeriod,
        weekDay,
      };
      const endEvent: EventDetailsView = {
        year,
        month,
        day,
        hour: endHour,
        minutes: endMinutes,
        monthName,
        formattedFullTime: `${endTime} ${endPeriod}`,
        time: `${endTime}`,
        period: endPeriod,
        weekDay,
      };
      const sameDayEventText = getSameDayEventText(startEvent, endEvent);
      expect(sameDayEventText).toStrictEqual({
        date: `${weekDay}, ${monthName} ${day}`,
        time: `${startTime} ${dashSeparator} ${endTime}${endPeriod}`,
      });
    });
    it('should create same day event title within different periods', () => {
      const startHour = 10;
      const endHour = 10;
      const startMinutes = 12;
      const endMinutes = 45;
      const startPeriod = ' AM';
      const endPeriod = ' PM';
      const startTime = `${startHour}:${startMinutes}`;
      const endTime = `${endHour}:${endMinutes}`;
      const startEvent: EventDetailsView = {
        year,
        month,
        day,
        hour: startHour,
        minutes: startMinutes,
        monthName,
        formattedFullTime: `${startTime} ${startPeriod}`,
        time: `${startTime}`,
        period: startPeriod,
        weekDay,
      };
      const endEvent: EventDetailsView = {
        year,
        month,
        day,
        hour: endHour,
        minutes: endMinutes,
        monthName,
        formattedFullTime: `${endTime} ${endPeriod}`,
        time: `${endTime}`,
        period: endPeriod,
        weekDay,
      };
      const sameDayEventText = getSameDayEventText(startEvent, endEvent);
      expect(sameDayEventText).toStrictEqual({
        date: `${weekDay}, ${monthName} ${day}`,
        time: `${startTime}${startPeriod} ${dashSeparator} ${endTime}${endPeriod}`,
      });
    });
  });

  describe('getMultiDayEventText', () => {
    it('should create multi day event text within different periods and same year', () => {
      const startMonth = Months.JULY;
      const endMonth = Months.AUGUST;
      const startMonthName = 'Jul';
      const endMonthName = 'Aug';
      const startHour = 1;
      const endHour = 12;
      const startMinutes = 2;
      const endMinutes = 13;
      const startPeriod = ' AM';
      const endPeriod = ' PM';
      const startTime = `${startHour}:${startMinutes}`;
      const endTime = `${endHour}:${endMinutes}`;
      const startEvent: EventDetailsView = {
        year,
        month: startMonth,
        day,
        hour: startHour,
        minutes: startMinutes,
        monthName: startMonthName,
        formattedFullTime: `${startTime} ${startPeriod}`,
        time: `${startTime}`,
        period: startPeriod,
        weekDay,
      };
      const endEvent: EventDetailsView = {
        year,
        month: endMonth,
        day,
        hour: endHour,
        minutes: endMinutes,
        monthName: endMonthName,
        formattedFullTime: `${endTime} ${endPeriod}`,
        time: `${endTime}`,
        period: endPeriod,
        weekDay,
      };
      const multiDayEventText = getMultiDayEventText(startEvent, endEvent);
      expect(multiDayEventText).toStrictEqual({
        initialDateText: `${startMonthName} ${day}, ${startTime}${startPeriod}`,
        endDateText: `${endMonthName} ${day}, ${endTime}${endPeriod}`,
      });
    });
    it('should create multi day event text within different periods and different years', () => {
      const startYear = 2030;
      const endYear = 2031;
      const startMonth = Months.JULY;
      const endMonth = Months.AUGUST;
      const startMonthName = 'Jul';
      const endMonthName = 'Aug';
      const startHour = 1;
      const endHour = 12;
      const startMinutes = 2;
      const endMinutes = 13;
      const startPeriod = ' AM';
      const endPeriod = ' PM';
      const startTime = `${startHour}:${startMinutes}`;
      const endTime = `${endHour}:${endMinutes}`;
      const startEvent: EventDetailsView = {
        year: startYear,
        month: startMonth,
        day,
        hour: startHour,
        minutes: startMinutes,
        monthName: startMonthName,
        formattedFullTime: `${startTime} ${startPeriod}`,
        time: `${startTime}`,
        period: startPeriod,
        weekDay,
      };
      const endEvent: EventDetailsView = {
        year: endYear,
        month: endMonth,
        day,
        hour: endHour,
        minutes: endMinutes,
        monthName: endMonthName,
        formattedFullTime: `${endTime} ${endPeriod}`,
        time: `${endTime}`,
        period: endPeriod,
        weekDay,
      };
      const multiDayEventText = getMultiDayEventText(startEvent, endEvent);
      expect(multiDayEventText).toStrictEqual({
        initialDateText: `${startMonthName} ${day}, ${startYear}, ${startTime}${startPeriod}`,
        endDateText: `${endMonthName} ${day}, ${endYear}, ${endTime}${endPeriod}`,
      });
    });
  });

  describe('isSameDayEvent()', () => {
    it('should return true if events have same day, month and year', () => {
      const eventA: EventDetailsView = {
        day,
        monthName,
        year,
        month: Months.JANUARY,
        hour: 0,
        minutes: 1,
        formattedFullTime: 'a',
        time: 'a',
        period: 'a',
        weekDay: 'a',
      };
      const eventB: EventDetailsView = {
        day,
        monthName,
        year,
        month: Months.JANUARY,
        hour: 2,
        minutes: 3,
        formattedFullTime: 'b',
        time: 'b',
        period: 'b',
        weekDay: 'b',
      };
      expect(isSameDayEvent(eventA, eventB)).toBe(true);
    });
    it('should return false if events have same day and month but not year', () => {
      const eventA: EventDetailsView = {
        day,
        monthName,
        year: year + 1,
        month: Months.JANUARY,
        hour: 0,
        minutes: 1,
        formattedFullTime: 'a',
        time: 'a',
        period: 'a',
        weekDay: 'a',
      };
      const eventB: EventDetailsView = {
        day,
        monthName,
        year,
        month: Months.JANUARY,
        hour: 2,
        minutes: 3,
        formattedFullTime: 'b',
        time: 'b',
        period: 'b',
        weekDay: 'b',
      };
      expect(isSameDayEvent(eventA, eventB)).toBe(false);
    });
  });
});
