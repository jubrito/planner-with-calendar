import { CalendarCellInfo, DateConfig } from "../../types/calendar/types";
import { Months, WeekDaysShortNames } from "../../types/calendar/enums";
import { getWeekDayName, numberOfDaysOfTheWeek } from "./weeks";
import {
  getMonthIndex,
  getYear,
  numOfDaysFromOtherMonthOnCurrentCalendar,
} from "./utils";
import { firstDayOfTheMonth } from "./constants";

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
      month: getMonthIndex(locale, new Date(year, month + 1)) + 1,
      day: firstDayOfTheMonth + i,
      year: getYear(locale, new Date(year, month + 1)),
    });
  }
  return nextMonthDaysOnCurrentMonth;
};
