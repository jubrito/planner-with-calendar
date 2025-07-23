import { Months } from '../types/calendar/enums';
import { EventDetailsView } from '../types/event';
import {
  deepCopy,
  getChunkArrayByChunkSize,
  isSameDayEvent,
  makeFirstLetterUppercase,
} from './utils';

describe('utils', () => {
  describe('deepCopy', () => {
    it('should clone each property of element and return clone', () => {
      const original = {
        property: 1,
        otherProperty: {
          anotherProperty: true,
          array: [1, 2, 3],
          null: null,
          undefined: undefined,
        },
        date: new Date(),
        function: () => false,
      };
      expect(deepCopy(original)).toStrictEqual(original);
    });
    it('should clone empty element and return clone', () => {
      const original = {};
      expect(deepCopy(original)).toStrictEqual(original);
    });
  });
  describe('getChunkArrayByChunkSize', () => {
    it('should return empty array when input awway is empty', () => {
      const chunk = getChunkArrayByChunkSize([], 5);
      expect(chunk).toEqual([]);
    });
    it('should handle chunk size equal to array length', () => {
      const input = [1, 2, 3, 4, 5];
      const result = getChunkArrayByChunkSize(input, 5);
      expect(result).toEqual([input]);
    });
    it('should return chunk with original array when chunk size is 0', () => {
      const input = [1, 2, 3, 4, 5];
      const result = getChunkArrayByChunkSize(input, 0);
      expect(result).toEqual([input]);
    });
    it('should split array into multiple chunks when needed', () => {
      const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const result = getChunkArrayByChunkSize(input, 3);
      expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]);
    });
    it('should handle chunk size of 1', () => {
      const input = ['a', 'b', 'c'];
      const result = getChunkArrayByChunkSize(input, 1);
      expect(result).toEqual([['a'], ['b'], ['c']]);
    });
    it('should handle non-integer chunk sizes by using floor', () => {
      const input = [1, 2, 3, 4, 5, 6];
      const result = getChunkArrayByChunkSize(input, 2.9);
      expect(result).toEqual([
        [1, 2],
        [3, 4],
        [5, 6],
      ]);
    });
  });
  describe('makeFirstLetterUppercase', () => {
    it('should make first letter uppercase', () => {
      const first = 'first';
      const second = 'sECOND';
      const third = 'THIRD';
      expect(makeFirstLetterUppercase(first)).toBe('First');
      expect(makeFirstLetterUppercase(second)).toBe('SECOND');
      expect(makeFirstLetterUppercase(third)).toBe('THIRD');
    });
  });

  describe('isSameDayEvent()', () => {
    const year = 2025;
    const day = 29;
    const monthName = 'Jun';
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
    it('should return true if events have same day and year but not month', () => {
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
        month: Months.FEBRUARY,
        hour: 2,
        minutes: 3,
        formattedFullTime: 'b',
        time: 'b',
        period: 'b',
        weekDay: 'b',
      };
      expect(isSameDayEvent(eventA, eventB)).toBe(false);
    });
    it('should return true if events have same month and year but not day', () => {
      const eventA: EventDetailsView = {
        day: day + 1,
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
      expect(isSameDayEvent(eventA, eventB)).toBe(false);
    });
  });
});
