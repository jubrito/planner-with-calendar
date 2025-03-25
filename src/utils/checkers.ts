import { DateConfig } from "../types/calendar/types";
import { LocaleLanguage } from "../types/locale/types";
import { getFormatedDate } from "./calendar/current";
import { getDay, getMonthIndex, getYear } from "./calendar/utils";

export const isToday = (locale: LocaleLanguage, date: DateConfig["date"]) => {
  const currentDate = getFormatedDate(locale, new Date());
  return (
    getYear(locale, date) === getYear(locale, currentDate) &&
    getMonthIndex(locale, date) === getMonthIndex(locale, currentDate) &&
    getDay(locale, date) === getDay(locale, currentDate)
  );
};
