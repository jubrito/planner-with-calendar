import { DateConfig } from "../../types/Date";
import { Months } from "../enums";

export const getNextMonthName = (
  year: DateConfig["year"],
  month: DateConfig["month"],
  locale: string
) =>
  new Intl.DateTimeFormat(locale, {
    month: "long",
  }).format(new Date(year, month + 1, 1));

export const getNextMonthIndex = (month: DateConfig["month"]) =>
  month === Months.DECEMBER ? Months.JANUARY : month + 1;

export const getNextMonthYear = (
  year: DateConfig["year"],
  month: DateConfig["month"]
) => (month === Months.DECEMBER ? year + 1 : year);
