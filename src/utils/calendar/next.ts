import { CalendarCellInfo, DateConfig } from "../../types/calendar/types";
import { Months, WeekDaysShortNames } from "../../types/calendar/enums";
import { getWeekDayName, numberOfDaysOfTheWeek } from "./weeks";
import { numOfDaysFromOtherMonthOnCurrentCalendar } from "./utils";
import { firstDayOfTheMonth } from "./constants";

export const getNextMonthName = (
  year: DateConfig["year"],
  month: DateConfig["month"],
  locale: string,
  format: "short" | "long" = "long"
) =>
  new Intl.DateTimeFormat(locale, {
    month: format,
  }).format(new Date(year, month + 1, 1));

export const getNextMonthIndex = (month: DateConfig["month"]) =>
  month === Months.DECEMBER ? Months.JANUARY : month + 1;

export const getNextMonthYear = (
  year: DateConfig["year"],
  month: DateConfig["month"]
) => (month === Months.DECEMBER ? year + 1 : year);

export const getNextMonthDaysOnCurrentMonth = (
  month: DateConfig["month"],
  year: DateConfig["year"],
  monthNumberOfDays: DateConfig["monthNumberOfDays"],
  locale: string
) => {
  const nextMonthDaysOnCurrentMonth: CalendarCellInfo[] = [];
  const weekDayNameWhenMonthEnds: WeekDaysShortNames = getWeekDayName(
    year,
    month,
    monthNumberOfDays,
    locale
  );
  const numberOfDaysOfNextMonth =
    numberOfDaysOfTheWeek -
    1 -
    numOfDaysFromOtherMonthOnCurrentCalendar(weekDayNameWhenMonthEnds, locale);

  for (let i = 0; i < numberOfDaysOfNextMonth; i++) {
    nextMonthDaysOnCurrentMonth.push({
      month: getNextMonthIndex(month) + 1,
      day: firstDayOfTheMonth + i,
      year: getNextMonthYear(year, month),
    });
  }
  return nextMonthDaysOnCurrentMonth;
};
