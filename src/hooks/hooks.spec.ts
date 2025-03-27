import { act, renderHook, waitFor } from '@testing-library/react';
import { useDate } from './useDate';
import { defaultLocale } from '../utils/locale/constants';
import { Months } from '../types/calendar/enums';
import {
  getDateISOString,
  getDay,
  getDayOfWeek,
  getMonthIndex,
  getMonthNumberOfDays,
  getTimeInMilliseconds,
  getYear,
} from '../utils/calendar/utils';
import { DateConfig } from '../types/calendar/types';

describe('React hooks', () => {
  const locale = defaultLocale;
  describe('useDate()', () => {
    const initialYear = 2025;
    const initialMonth = Months.DECEMBER;
    const initialDay = 1;

    const getFirstThreeDigits = (value: number) => value.toString().slice(0, 3);

    const dateWithoutMilliseconds = (date: DateConfig['date']) => {
      const dateIsoString = getDateISOString(date);
      const withoutMilliseconds = dateIsoString.slice(
        0,
        dateIsoString.length - 5,
      );
      const timezone = dateIsoString.slice(
        dateIsoString.length - 2,
        dateIsoString.length - 5,
      );
      return [withoutMilliseconds, timezone];
    };

    describe('Only passing locale to constructor', () => {
      it('should return initial date with only locale param', () => {
        const currentDate = new Date();
        const { result } = renderHook(() => useDate(locale));
        const {
          date,
          day,
          dayOfWeek,
          month,
          monthNumberOfDays,
          timeInMilliseconds,
          year,
        } = result.current;
        const [receivedDateWithoutMilliseconds, receivedDateTimezone] =
          dateWithoutMilliseconds(date);
        const [currentDateWithoutMilliseconds, currentDateTimezone] =
          dateWithoutMilliseconds(currentDate);
        expect(receivedDateWithoutMilliseconds).toStrictEqual(
          currentDateWithoutMilliseconds,
        );
        expect(receivedDateTimezone).toStrictEqual(currentDateTimezone);
        expect(year).toStrictEqual(getYear(locale, currentDate));
        expect(month).toStrictEqual(getMonthIndex(locale, currentDate));
        expect(day).toStrictEqual(getDay(locale, currentDate));
        expect(dayOfWeek).toStrictEqual(getDayOfWeek(locale, currentDate));
        expect(monthNumberOfDays).toStrictEqual(
          getMonthNumberOfDays(locale, currentDate),
        );
        expect(timeInMilliseconds.toString().length).toStrictEqual(
          getTimeInMilliseconds(currentDate).toString().length,
        );
        expect(getFirstThreeDigits(timeInMilliseconds)).toStrictEqual(
          getFirstThreeDigits(getTimeInMilliseconds(currentDate)), // precision of 5 digits
        );
      });
      it('should update and return the date', async () => {
        let currentDate = new Date();
        const { result } = renderHook(() => useDate(locale));
        const { date: initialDate, updateDate: initialUpdateDate } =
          result.current;
        const [initialDateWithoutMilliseconds, initialDateTimezone] =
          dateWithoutMilliseconds(initialDate);
        const [currentDateWithoutMilliseconds, currentDateTimezone] =
          dateWithoutMilliseconds(currentDate);
        expect(initialDateWithoutMilliseconds).toStrictEqual(
          currentDateWithoutMilliseconds,
        );
        expect(initialDateTimezone).toStrictEqual(currentDateTimezone);

        act(() => {
          initialUpdateDate(initialYear - 1, initialMonth - 1, initialDay);
        });

        const { date: updatedDate } = result.current;
        currentDate = new Date(initialYear - 1, initialMonth - 1, initialDay);
        await waitFor(() => {
          const [updatedDateWithoutMilliseconds, updatedDateTimezone] =
            dateWithoutMilliseconds(updatedDate);
          const [currentDateWithoutMilliseconds, currentDateTimezone] =
            dateWithoutMilliseconds(currentDate);
          expect(updatedDateWithoutMilliseconds).toStrictEqual(
            currentDateWithoutMilliseconds,
          );
          expect(updatedDateTimezone).toStrictEqual(currentDateTimezone);
        });
      });
    });
    describe('Passing locale and initial date to constructor', () => {
      it('should return initial date with only locale param', () => {
        const currentDate = new Date(initialYear, initialMonth, initialDay);
        const { result } = renderHook(() => useDate(locale, currentDate));
        const {
          date: initialDate,
          day,
          dayOfWeek,
          month,
          monthNumberOfDays,
          timeInMilliseconds,
          year,
        } = result.current;
        const [initialDateWithoutMilliseconds, initialDateTimezone] =
          dateWithoutMilliseconds(initialDate);
        const [currentDateWithoutMilliseconds, currentDateTimezone] =
          dateWithoutMilliseconds(currentDate);
        expect(initialDateWithoutMilliseconds).toStrictEqual(
          currentDateWithoutMilliseconds,
        );
        expect(initialDateTimezone).toStrictEqual(currentDateTimezone);
        expect(year).toStrictEqual(getYear(locale, currentDate));
        expect(month).toStrictEqual(getMonthIndex(locale, currentDate));
        expect(day).toStrictEqual(getDay(locale, currentDate));
        expect(dayOfWeek).toStrictEqual(getDayOfWeek(locale, currentDate));
        expect(monthNumberOfDays).toStrictEqual(
          getMonthNumberOfDays(locale, currentDate),
        );
        expect(timeInMilliseconds.toString().length).toStrictEqual(
          getTimeInMilliseconds(currentDate).toString().length,
        );
        expect(getFirstThreeDigits(timeInMilliseconds)).toStrictEqual(
          getFirstThreeDigits(getTimeInMilliseconds(currentDate)), // precision of 5 digits
        );
      });
      it('should update and return the date', async () => {
        let currentDate = new Date(initialYear, initialMonth, initialDay);
        const { result } = renderHook(() => useDate(locale, currentDate));
        const { date: initialDate, updateDate: initialUpdateDate } =
          result.current;
        const [initialDateWithoutMilliseconds, initialDateTimezone] =
          dateWithoutMilliseconds(initialDate);
        const [currentDateWithoutMilliseconds, currentDateTimezone] =
          dateWithoutMilliseconds(currentDate);
        expect(initialDateWithoutMilliseconds).toStrictEqual(
          currentDateWithoutMilliseconds,
        );
        expect(initialDateTimezone).toStrictEqual(currentDateTimezone);

        act(() => {
          initialUpdateDate(initialYear - 1, initialMonth - 1, initialDay);
        });

        const { date: updatedDate } = result.current;
        currentDate = new Date(initialYear - 1, initialMonth - 1, initialDay);
        await waitFor(() => {
          const [updatedDateWithoutMilliseconds, updatedDateTimezone] =
            dateWithoutMilliseconds(updatedDate);
          const [currentDateWithoutMilliseconds, currentDateTimezone] =
            dateWithoutMilliseconds(currentDate);
          expect(updatedDateWithoutMilliseconds).toStrictEqual(
            currentDateWithoutMilliseconds,
          );
          expect(updatedDateTimezone).toStrictEqual(currentDateTimezone);
        });
      });
    });
  });
});
