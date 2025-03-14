import { DateConfig } from "../../types/calendar/types";

export const getCurrentMonthName = (
  date: Date,
  locale: string,
  format: "short" | "long" = "long"
): string =>
  new Intl.DateTimeFormat(locale, {
    month: format,
  }).format(date);

export const getCurrentMonthDaysInfo = (
  year: DateConfig["year"],
  month: DateConfig["month"],
  monthNumberOfDays: DateConfig["monthNumberOfDays"],
  monthStartingInZero = false
) => {
  const monthDays = [...Array(monthNumberOfDays).keys()];
  return monthDays.map((day) => ({
    month: monthStartingInZero ? month : month + 1,
    day: day + 1,
    year: year,
  }));
};
