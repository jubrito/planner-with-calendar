import { DateConfig } from "../types/calendar/types";
import { LocaleLanguage } from "../types/locale/types";
import { getDate, getMonthIndex, getYear } from "./calendar/utils";

export const isToday = (locale: LocaleLanguage, date: DateConfig["date"]) => {
  const currentDate = new Date();
  return (
    getYear(locale, date) === getYear(locale, currentDate) &&
    getMonthIndex(locale, date) === getMonthIndex(locale, currentDate) &&
    getDate(locale, date) === getDate(locale, currentDate)
  );
};
