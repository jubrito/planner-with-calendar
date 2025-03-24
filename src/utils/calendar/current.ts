import { DateConfig } from "../../types/calendar/types";

export const getCurrentMonthName = (
  locale: string,
  date: Date,
  format: "short" | "long" = "long"
): string =>
  new Intl.DateTimeFormat(locale, {
    month: format,
  }).format(date);

export const getCurrentMonthDays = (
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

export const isToday = (
  year: DateConfig["year"],
  month: DateConfig["month"],
  date: DateConfig["day"]
) => {
  const currentDate = new Date();
  return (
    year === currentDate.getFullYear() &&
    month === currentDate.getMonth() &&
    date === currentDate.getDate()
  );
};
