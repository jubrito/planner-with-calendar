import { DateConfig } from "../../types/calendar/Date";

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
  monthNumberOfDays: DateConfig["monthNumberOfDays"]
) => {
  const monthDays = [...Array(monthNumberOfDays).keys()];
  return monthDays.map((day) => ({
    month: month,
    day: day + 1,
    year: year,
  }));
};
