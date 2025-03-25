import { renderHook } from "@testing-library/react";
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
    const initialMonth = Months.MARCH;

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
        expect(time.toString().slice(0, 4)).toStrictEqual(
          getTimeInMilliseconds(currentDate).toString().slice(0, 4) // precision of 5 digits
        );
      });
    });
  });
});
