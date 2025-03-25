import { act, renderHook, waitFor } from "@testing-library/react";
import { useDate } from "./useDate";
import { defaultLocale } from "../utils/locale/constants";
import { Months } from "../types/calendar/enums";
import {
  getDate,
  getDay,
  getDayOfWeek,
  getMonthIndex,
  getMonthNumberOfDays,
  getTimeInMilliseconds,
  getYear,
} from "../utils/calendar/utils";

describe("React hooks", () => {
  const locale = defaultLocale;
  describe("useDate()", () => {
    const initialYear = 2025;
    const initialMonth = Months.DECEMBER;
    const initialDay = 1;

    const getFirstFiveDigits = (value: number) => value.toString().slice(0, 4);

    describe("Only passing locale to constructor", () => {
      it("should return initial date with only locale param", () => {
        const currentDate = new Date();
        const { result } = renderHook(() => useDate(locale));
        const { date, day, dayOfWeek, month, monthNumberOfDays, time, year } =
          result.current;
        expect(date).toStrictEqual(getDate(locale, currentDate));
        expect(year).toStrictEqual(getYear(locale, currentDate));
        expect(month).toStrictEqual(getMonthIndex(locale, currentDate));
        expect(day).toStrictEqual(getDay(locale, currentDate));
        expect(dayOfWeek).toStrictEqual(getDayOfWeek(locale, currentDate));
        expect(monthNumberOfDays).toStrictEqual(
          getMonthNumberOfDays(locale, currentDate)
        );
        expect(time.toString().length).toStrictEqual(
          getTimeInMilliseconds(currentDate).toString().length
        );
        expect(getFirstFiveDigits(time)).toStrictEqual(
          getFirstFiveDigits(getTimeInMilliseconds(currentDate)) // precision of 5 digits
        );
      });
      it("should update and return the date", async () => {
        let date = new Date();
        const { result } = renderHook(() => useDate(locale));
        const { date: initialDate, updateDate: initialUpdateDate } =
          result.current;
        expect(initialDate).toStrictEqual(getDate(locale, date));

        act(() => {
          initialUpdateDate(initialYear - 1, initialMonth - 1, initialDay);
        });

        const { date: updatedDate } = result.current;
        date = new Date(initialYear - 1, initialMonth - 1, initialDay);
        await waitFor(() => {
          expect(updatedDate).toStrictEqual(getDate(locale, date));
        });
      });
    });
    describe("Passing locale and initial date to constructor", () => {
      it("should return initial date with only locale param", () => {
        const currentDate = new Date(initialYear, initialMonth, initialDay);
        const { result } = renderHook(() => useDate(locale, currentDate));
        const { date, day, dayOfWeek, month, monthNumberOfDays, time, year } =
          result.current;
        expect(date).toStrictEqual(getDate(locale, currentDate));
        expect(year).toStrictEqual(getYear(locale, currentDate));
        expect(month).toStrictEqual(getMonthIndex(locale, currentDate));
        expect(day).toStrictEqual(getDay(locale, currentDate));
        expect(dayOfWeek).toStrictEqual(getDayOfWeek(locale, currentDate));
        expect(monthNumberOfDays).toStrictEqual(
          getMonthNumberOfDays(locale, currentDate)
        );
        expect(time.toString().length).toStrictEqual(
          getTimeInMilliseconds(currentDate).toString().length
        );
        expect(getFirstFiveDigits(time)).toStrictEqual(
          getFirstFiveDigits(getTimeInMilliseconds(currentDate)) // precision of 5 digits
        );
      });
      it("should update and return the date", async () => {
        let date = new Date(initialYear, initialMonth, initialDay);
        const { result } = renderHook(() => useDate(locale, date));
        const { date: initialDate, updateDate: initialUpdateDate } =
          result.current;
        expect(initialDate).toStrictEqual(getDate(locale, date));

        act(() => {
          initialUpdateDate(initialYear - 1, initialMonth - 1, initialDay);
        });

        const { date: updatedDate } = result.current;
        date = new Date(initialYear - 1, initialMonth - 1, initialDay);
        await waitFor(() => {
          expect(updatedDate).toStrictEqual(getDate(locale, date));
        });
      });
    });
  });
});
