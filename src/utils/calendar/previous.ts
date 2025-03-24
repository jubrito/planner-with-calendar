import { CalendarCellInfo, DateConfig } from "../../types/calendar/types";
import { WeekDaysShortNames } from "../../types/calendar/enums";
import { getWeekDayName } from "./weeks";
import {
  getMonthIndex,
  getYear,
  numOfDaysFromOtherMonthOnCurrentCalendar,
} from "./utils";
import { firstDayOfTheMonth } from "./constants";

export const getPreviousMonthNumberOfDays = (
  year: DateConfig["year"],
  month: DateConfig["month"]
) => new Date(year, month, 0).getDate();

export const getLastDayOfPreviousMonth = (time: DateConfig["time"]): number => {
  const tempDate = new Date(time);
  tempDate.setDate(0);
  return tempDate.getDate();
};

export const getPreviousMonthDaysOnCurrentMonth = (
  month: DateConfig["month"],
  year: DateConfig["year"],
  time: DateConfig["time"],
  locale: string
) => {
  const previousMonthDaysOnCurrentMonth: CalendarCellInfo[] = [];
  const lastDayOfPreviousMonth = getLastDayOfPreviousMonth(time);
  const weekDayNameWhenMonthStarts: WeekDaysShortNames = getWeekDayName(
    year,
    month,
    firstDayOfTheMonth,
    locale
  );
  const numberOfDaysOfPreviousMonth = numOfDaysFromOtherMonthOnCurrentCalendar(
    weekDayNameWhenMonthStarts,
    locale
  );
  for (let i = 0; i < numberOfDaysOfPreviousMonth; i++) {
    previousMonthDaysOnCurrentMonth.push({
      month: getMonthIndex(locale, new Date(year, month - 1)) + 1,
      day: lastDayOfPreviousMonth - i,
      year: getYear(locale, new Date(year, month - 1)),
    });
  }
  return previousMonthDaysOnCurrentMonth.reverse();
};
