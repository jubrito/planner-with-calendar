import {
  Months,
  MonthsNames,
  WeekDaysShortNames,
} from "../../types/calendar/enums";
import { DateConfig } from "../../types/calendar/types";
import { LocaleLanguage } from "../../types/locale/types";
import {
  IntlDateTimeFormatNumeric,
  IntlDateTimeFormatShort,
} from "../constants";
import { isToday } from "./current";
import { getWeekDaysNames } from "./weeks";

export const todayLabel = "Today";

export const monthNameByIndex: Record<Months, MonthsNames> = {
  [Months.JANUARY]: MonthsNames.JANUARY,
  [Months.FEBRUARY]: MonthsNames.FEBRUARY,
  [Months.MARCH]: MonthsNames.MARCH,
  [Months.APRIL]: MonthsNames.APRIL,
  [Months.MAY]: MonthsNames.MAY,
  [Months.JUNE]: MonthsNames.JUNE,
  [Months.JULY]: MonthsNames.JULY,
  [Months.AUGUST]: MonthsNames.AUGUST,
  [Months.SEPTEMBER]: MonthsNames.SEPTEMBER,
  [Months.OCTOBER]: MonthsNames.OCTOBER,
  [Months.NOVEMBER]: MonthsNames.NOVEMBER,
  [Months.DECEMBER]: MonthsNames.DECEMBER,
};

export const numOfDaysFromOtherMonthOnCurrentCalendar = (
  weekDayName: WeekDaysShortNames,
  locale: string
) => getWeekDaysNames(locale).findIndex((name) => weekDayName === name.short);

export const getFullDateTitle = (
  year: DateConfig["year"],
  month: DateConfig["month"],
  day: DateConfig["day"],
  locale: string
) =>
  isToday(year, month, day)
    ? todayLabel
    : new Intl.DateTimeFormat(locale, {
        dateStyle: "full",
      }).format(new Date(year, month, day));

export const getDate = (locale: LocaleLanguage, date: DateConfig["date"]) => {
  const formatedDate = new Intl.DateTimeFormat(locale, {
    month: IntlDateTimeFormatShort,
    day: IntlDateTimeFormatNumeric,
    year: IntlDateTimeFormatNumeric,
  }).format(date);
  return new Date(formatedDate);
};

export const getDay = (locale: LocaleLanguage, date: DateConfig["date"]) =>
  new Intl.DateTimeFormat(locale, {
    day: IntlDateTimeFormatNumeric,
  }).format(date);
