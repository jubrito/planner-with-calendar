import { DateConfig } from "../../types/Date";

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
