import { DateConfig } from "../../types/calendar/types";
import { Months } from "../../types/calendar/enums";

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
