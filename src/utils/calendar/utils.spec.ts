import { Months } from '../../types/calendar/enums';
import {
  endLabel,
  IntlDateTimeFormat2Digit,
  IntlDateTimeFormatFull,
  IntlDateTimeFormatLong,
  IntlDateTimeFormatNumeric,
} from '../constants';
import {
  get2DigitsValue,
  getDateISOString,
  getDay,
  getDayName,
  getDayOfWeek,
  getFormattedDateString,
  getFullDateTitle,
  getLastDayOfPreviousMonth,
  getMonthIndex,
  getMonthName,
  getMonthNumberOfDays,
  getTimeInformation,
  getTimeInMilliseconds,
  getYear,
  is12HourClockSystem,
} from './utils';

describe('utils', () => {
  const year = 2025;
  const month = Months.DECEMBER;
  const day = 1;
  const hours = 13;
  const minutes = 12;
  const localeEnglish = 'en-US';
  const localePortuguese = 'pt-BR';
  const date = new Date(year, month, day, hours, minutes);
  describe('getFullDateTitle(...)', () => {
    it('should return full date title in english', () => {
      const formattedDate = new Intl.DateTimeFormat(localeEnglish, {
        dateStyle: IntlDateTimeFormatFull,
      }).format(date);
      const fullDateTitle = getFullDateTitle(year, month, day, localeEnglish);
      expect(fullDateTitle).toStrictEqual(formattedDate);
      expect(fullDateTitle).toStrictEqual('Monday, December 1, 2025');
    });
    it('should return full date title in portuguese', () => {
      const formattedDate = new Intl.DateTimeFormat(localePortuguese, {
        dateStyle: IntlDateTimeFormatFull,
      }).format(date);
      console.log(getDateISOString(date));
      const fullDateTitle = getFullDateTitle(
        year,
        month,
        day,
        localePortuguese,
      );
      const firstLetter = fullDateTitle.charAt(0).toUpperCase();
      expect(fullDateTitle).toStrictEqual(
        firstLetter + formattedDate.slice(1, formattedDate.length),
      );
      expect(fullDateTitle).toStrictEqual(
        'Segunda-feira, 1 de dezembro de 2025',
      );
    });
    it('should throw error if date is invalid', () => {
      expect(() => getFullDateTitle(year, month, 0 / 0, localeEnglish)).toThrow(
        'Failed to get date title, date is invalid',
      );
    });
    it('should throw error if locale is invalid', () => {
      expect(() => getFullDateTitle(year, month, day, `${0}`)).toThrow(
        'Failed to get date title, language is invalid',
      );
    });
  });
  describe('getDateISOString(date)', () => {
    it('should return ISO date', () => {
      const date = new Date(year, month, day);
      expect(getDateISOString(date)).toBe(date.toISOString());
    });
    it('should throw error if date is invalid', () => {
      expect(() => getDateISOString(new Date(year, month, 0 / 0))).toThrow(
        'Failed to get date, date is invalid',
      );
    });
  });
  describe('getDay(date)', () => {
    it('should get day', () => {
      expect(getDay(date)).toBe(date.getDate());
      expect(getDay(date)).toBe(day);
    });
    it('should throw error if date is invalid', () => {
      expect(() => getDay(new Date(year, month, 0 / 0))).toThrow(
        'Failed to get day, date is invalid',
      );
    });
  });
  describe('getMonthIndex(...)', () => {
    it('should get december month index', () => {
      expect(getMonthIndex(localeEnglish, date, IntlDateTimeFormat2Digit)).toBe(
        month,
      );
    });
    it('should get month index 0 for january', () => {
      const january = Months.JANUARY;
      expect(
        getMonthIndex(
          localeEnglish,
          new Date(year, january), // not definish options [for monthSyle] use the default (2-digit)
        ),
      ).toBe(january);
    });
    it('should get month index 0 for january', () => {
      const january = Months.JANUARY;
      expect(
        getMonthIndex(
          localeEnglish,
          new Date(year, january),
          IntlDateTimeFormat2Digit,
        ),
      ).toBe(january);
    });
    it('should get month index 11 for december with long option', () => {
      expect(
        getMonthIndex(
          localeEnglish,
          new Date(year, month, day),
          IntlDateTimeFormatNumeric,
        ),
      ).toBe(month);
    });
    it('should throw error if date is invalid', () => {
      expect(() =>
        getMonthIndex(localeEnglish, new Date(year, month, 0 / 0)),
      ).toThrow('Failed to get month index, date is invalid');
    });
  });
  describe('get2DigitsValue(value)', () => {
    it('should return same value if it already has two digits', () => {
      const twoDigitsValue = '00';
      expect(get2DigitsValue(twoDigitsValue)).toBe(twoDigitsValue);
    });
    describe('When value needs to be modified', () => {
      it('should return value with zero added on the start if only value is provided and it does not have two digits yet', () => {
        expect(get2DigitsValue('5')).toBe('05');
      });
      it('should return value with zero added on the start if start param is provided and it does not have two digits yet', () => {
        expect(get2DigitsValue('5')).toBe('05');
      });
      it('should return value with zero added on the start if end params is provided and it does not have two digits yet', () => {
        expect(get2DigitsValue('5', endLabel)).toBe('50');
      });
    });
  });
  describe('getMonthName(...)', () => {
    it('should return december month name in english if arguments are valid', () => {
      expect(getMonthName(localeEnglish, date)).toBe('December');
    });
    it('should return december month name in portuguese if arguments are valid', () => {
      expect(getMonthName(localePortuguese, date)).toBe('Dezembro');
    });
    it('should throw error if date is invalid', () => {
      expect(() =>
        getMonthName(localeEnglish, new Date(year, month, 0 / 0)),
      ).toThrow('Failed to get month name, date is invalid');
    });
  });
  describe('getYear(date)', () => {
    it('should return year if argument is valid', () => {
      expect(getYear(date)).toBe(year);
    });
    it('should throw error if date is invalid', () => {
      expect(() => getYear(new Date(year, month, 0 / 0))).toThrow(
        'Failed to get year, date is invalid',
      );
    });
  });
  describe('getTimeInMilliseconds(date)', () => {
    it('should return time in milliseconds if argument is valid', () => {
      expect(getTimeInMilliseconds(date)).toBe(date.getTime());
    });
    it('should throw error if date is invalid', () => {
      expect(() => getTimeInMilliseconds(new Date(year, month, 0 / 0))).toThrow(
        'Failed to get time in milliseconds, date is invalid',
      );
    });
    describe('getMonthNumberOfDays(locale, date)', () => {
      it('should return number of days if argument is valid', () => {
        expect(
          getMonthNumberOfDays(
            localeEnglish,
            new Date(year, Months.JANUARY, 1),
          ),
        ).toBe(31);
        expect(getMonthNumberOfDays(localeEnglish, date)).toBe(31);
        expect(
          getMonthNumberOfDays(
            localeEnglish,
            new Date(year, Months.FEBRUARY, day),
          ),
        ).toBe(28);
      });
      it('should throw error if date is invalid', () => {
        expect(() =>
          getMonthNumberOfDays(localeEnglish, new Date(year, month, 0 / 0)),
        ).toThrow('Failed to get month number of days, date is invalid');
      });
      it('should throw error if locale is invalid', () => {
        expect(() => getMonthNumberOfDays(`${0}`, date)).toThrow(
          'Failed to get month number of days, language is invalid',
        );
      });
    });
    describe('getDayOfWeek(...)', () => {
      it('should return day of the week in english', () => {
        expect(getDayOfWeek(localeEnglish, date)).toBe('Monday');
        expect(
          getDayOfWeek(localeEnglish, new Date(year, Months.JANUARY, 1)),
        ).toBe('Wednesday');
      });
      it('should return day of the week in portuguese', () => {
        expect(getDayOfWeek(localePortuguese, date)).toBe('Segunda-feira');
        expect(
          getDayOfWeek(localePortuguese, new Date(year, Months.JANUARY, 1)),
        ).toBe('Quarta-feira');
        expect(
          getDayOfWeek(localePortuguese, new Date(year, Months.FEBRUARY, 8)),
        ).toBe('Sábado');
      });
      it('should throw error if date is invalid', () => {
        expect(() =>
          getDayOfWeek(localeEnglish, new Date(year, month, 0 / 0)),
        ).toThrow('Failed to get day of the week, date is invalid');
      });
      it('should throw error if locale is invalid', () => {
        expect(() => getDayOfWeek(`${0}`, date)).toThrow(
          'Failed to get day of the week, language is invalid',
        );
      });
    });
  });
  describe('getDayName(dayOfWeek, locale)', () => {
    it('should return day name in english', () => {
      expect(getDayName(0, localeEnglish)).toBe('Sun');
      expect(getDayName(5, localeEnglish)).toBe('Fri');
      expect(getDayName(6, localeEnglish)).toBe('Sat');
    });
    it('should return day name in portuguese', () => {
      expect(getDayName(0, localePortuguese)).toBe('Dom.');
      expect(getDayName(5, localePortuguese)).toBe('Sex.');
      expect(getDayName(6, localePortuguese)).toBe('Sáb.');
    });
    it('should throw error if day is invalid', () => {
      expect(() => getDayName(0, `${0}`)).toThrow(
        'Failed to get day name, language is invalid',
      );
    });
    it('should throw error if locale is invalid', () => {
      expect(() => getDayName(11, localeEnglish)).toThrow(
        'Failed to get day name, day is invalid',
      );
    });
  });
  describe('getFormattedDateString(...)', () => {
    it('should return formatted date string in english', () => {
      expect(getFormattedDateString(localeEnglish, date)).toBe(
        `${month + 1}/${day}/${year}`,
      );
      expect(
        getFormattedDateString(localeEnglish, date, {
          weekday: IntlDateTimeFormatLong,
        }),
      ).toBe(`Monday`);
    });
    it('should return formatted date string in portuguese', () => {
      expect(getFormattedDateString(localePortuguese, date)).toBe(
        `0${day}/${month + 1}/${year}`,
      );
      expect(
        getFormattedDateString(localePortuguese, date, {
          weekday: IntlDateTimeFormatLong,
        }),
      ).toBe(`segunda-feira`);
    });
    it('should throw error if date is invalid', () => {
      expect(() =>
        getFormattedDateString(localeEnglish, new Date(year, month, 0 / 0)),
      ).toThrow('Failed to get date, date is invalid');
    });
    it('should throw error if locale is invalid', () => {
      expect(() => getFormattedDateString(`${0}`, date)).toThrow(
        'Failed to get date, language is invalid',
      );
    });
  });
  describe('getLastDayOfPreviousMonth(time)', () => {
    it('should return last day of previous month if argument is valid and it is not leap year', () => {
      expect(getLastDayOfPreviousMonth(date.getTime())).toBe(30);
      expect(
        getLastDayOfPreviousMonth(
          new Date(year, Months.JANUARY, day).getTime(),
        ),
      ).toBe(31);
      expect(
        getLastDayOfPreviousMonth(new Date(year, Months.MARCH, day).getTime()),
      ).toBe(28);
    });
    it('should return last day of previous month if argument is valid and it is leap year', () => {
      const leapYear = 2028;
      expect(
        getLastDayOfPreviousMonth(
          new Date(leapYear, Months.MARCH, day).getTime(),
        ),
      ).toBe(29);
    });
    it('should throw error if date is invalid', () => {
      expect(() =>
        getLastDayOfPreviousMonth(new Date(year, month, 0 / 0).getTime()),
      ).toThrow('Failed to get last day of previous month, time is invalid');
    });
  });
  describe('is12HourClockSystem(time)', () => {
    it('should return true if it includes AM or PM', () => {
      expect(is12HourClockSystem('AM')).toBeTruthy();
      expect(is12HourClockSystem('PM')).toBeTruthy();
    });
    it('should return false if it does not include AM or PM', () => {
      expect(is12HourClockSystem('anything')).toBeFalsy();
      expect(is12HourClockSystem('')).toBeFalsy();
    });
  });
  describe('getTimeInformation(formattedFullTime)', () => {
    it('should return time information when it is 12 hour clock system', () => {
      const formattedDateStringAM = getFormattedDateString(
        localeEnglish,
        new Date(year, month, day, 0, 0),
        {
          hour: IntlDateTimeFormat2Digit,
          minute: IntlDateTimeFormat2Digit,
        },
      );
      const formattedDateStringPM = getFormattedDateString(
        localeEnglish,
        new Date(year, month, day, hours, minutes),
        {
          hour: IntlDateTimeFormat2Digit,
          minute: IntlDateTimeFormat2Digit,
        },
      );
      const formattedDateStringLastHour = getFormattedDateString(
        localeEnglish,
        new Date(year, month, day, 24, minutes),
        {
          hour: IntlDateTimeFormat2Digit,
          minute: IntlDateTimeFormat2Digit,
        },
      );
      expect(getTimeInformation(formattedDateStringAM)).toStrictEqual([
        '12:00',
        ' AM',
        '12',
        '00',
      ]);
      expect(getTimeInformation(formattedDateStringPM)).toStrictEqual([
        '01:12',
        ' PM',
        '01',
        '12',
      ]);
      expect(getTimeInformation(formattedDateStringLastHour)).toStrictEqual([
        '12:12',
        ' PM',
        '12',
        '12',
      ]);
    });
    it('should return time information when it is not 12 hour clock system', () => {
      const formattedDateStringAM = getFormattedDateString(
        localePortuguese,
        new Date(year, month, day, 0, 0),
        {
          hour: IntlDateTimeFormat2Digit,
          minute: IntlDateTimeFormat2Digit,
        },
      );
      const formattedDateStringPM = getFormattedDateString(
        localePortuguese,
        new Date(year, month, day, hours, minutes),
        {
          hour: IntlDateTimeFormat2Digit,
          minute: IntlDateTimeFormat2Digit,
        },
      );
      expect(getTimeInformation(formattedDateStringAM)).toStrictEqual([
        '00:00',
        '',
        '00',
        '00',
      ]);
      expect(getTimeInformation(formattedDateStringPM)).toStrictEqual([
        '13:12',
        '',
        '13',
        '12',
      ]);
      expect(getTimeInformation(formattedDateStringPM)).toStrictEqual([
        '13:12',
        '',
        '13',
        '12',
      ]);
    });
  });
});
