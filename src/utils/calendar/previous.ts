import { CalendarCellInfo, DateConfig } from "../../types/calendar/types";
import { Months, WeekDaysShortNames } from "../../types/calendar/enums";
import { getWeekDayName } from "./weeks";
import { numOfDaysFromOtherMonthOnCurrentCalendar } from "./utils";
import { firstDayOfTheMonth } from "./constants";

export const getPreviousMonthName = (
  year: DateConfig["year"],
  month: DateConfig["month"],
  locale: string,
  format: "short" | "long" = "long"
) =>
  new Intl.DateTimeFormat(locale, {
    month: format,
  }).format(new Date(year, month, 0));

export const getPreviousMonthIndex = (month: DateConfig["month"]) =>
  month === Months.JANUARY ? Months.DECEMBER : month - 1;

export const getPreviousMonthYear = (
  year: DateConfig["year"],
  month: DateConfig["month"]
) => (month === Months.JANUARY ? year - 1 : year);

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
      month: getPreviousMonthIndex(month) + 1,
      day: lastDayOfPreviousMonth - i,
      year: getPreviousMonthYear(year, month),
    });
  }
  return previousMonthDaysOnCurrentMonth.reverse();
};
