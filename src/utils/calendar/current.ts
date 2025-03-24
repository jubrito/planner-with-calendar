import { DateConfig } from "../../types/calendar/types";
import { LocaleLanguage } from "../../types/locale/types";
import {
  IntlDateTimeFormatNumeric,
  IntlDateTimeFormatShort,
} from "../constants";

export const getCurrentMonthName = (
  date: Date,
  locale: string,
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

export const getDate = (locale: LocaleLanguage, date: DateConfig["date"]) => {
  const formatedDate = new Intl.DateTimeFormat(locale, {
    month: IntlDateTimeFormatShort,
    day: IntlDateTimeFormatNumeric,
    year: IntlDateTimeFormatNumeric,
  }).format(date);
  return new Date(formatedDate);
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
