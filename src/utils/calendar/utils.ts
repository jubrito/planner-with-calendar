import {
  Months,
  MonthsNames,
  WeekDaysShortNames,
} from "../../types/calendar/enums";
import { DateConfig } from "../../types/calendar/types";
import { getWeekDaysNames } from "./weeks";

export const numOfDaysFromOtherMonthOnCurrentCalendar = (
  weekDayName: WeekDaysShortNames,
  locale: string
) => getWeekDaysNames(locale).findIndex((name) => weekDayName === name.short);
export const firstDayOfTheMonth = 1;

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

export const getFullDateTitle = (
  year: DateConfig["year"],
  month: DateConfig["month"],
  day: DateConfig["day"],
  locale: string
) =>
  new Intl.DateTimeFormat(locale, {
    dateStyle: "full",
  }).format(new Date(year, month, day));
