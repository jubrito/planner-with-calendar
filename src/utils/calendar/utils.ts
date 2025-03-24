import {
  Months,
  MonthsNames,
  WeekDaysShortNames,
} from "../../types/calendar/enums";
import { DateConfig } from "../../types/calendar/types";
import { LocaleLanguage } from "../../types/locale/types";
import {
  IntlDateTimeFormat2Digit,
  IntlDateTimeFormatNumeric,
  IntlDateTimeFormatShort,
} from "../constants";
import { todayLabel } from "./constants";
import { isToday } from "./current";
import { getWeekDaysNames } from "./weeks";

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
  parseInt(
    new Intl.DateTimeFormat(locale, {
      day: IntlDateTimeFormatNumeric,
    }).format(date)
  );

export const getMonthIndex = (
  locale: LocaleLanguage,
  date: DateConfig["date"],
  monthStyle?:
    | typeof IntlDateTimeFormatNumeric
    | typeof IntlDateTimeFormat2Digit
) => {
  const formatedDate = new Intl.DateTimeFormat(locale, {
    month: monthStyle || IntlDateTimeFormatNumeric,
  }).format(date);
  const zeroBaseMonthNumber = parseInt(formatedDate) - 1;
  return zeroBaseMonthNumber;
};

export const getYear = (date: DateConfig["date"]) =>
  new Date(date).getFullYear();

export const getTimeInMilliseconds = (date: DateConfig["date"]) =>
  date.getTime();

// export const getMonthNumberOfDays = (
//   locale: LocaleLanguage,
//   date: DateConfig["date"]
// ) => {
//   // const currentDate = new Date(state.initialState.date);
//   const year = getYear(date);
//   const month = getMonth(date);
//   const month = currentDate.getMonth() + 1;
//   const getLastDayOfMonth = 0;
//   return new Date(year, month, getLastDayOfMonth).getDate();
// };
