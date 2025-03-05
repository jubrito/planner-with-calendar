import { WeekDaysShortAndLongeNames } from "../../types/types";
import { config } from "../features/Calendar/config";
import { Months, WeekDaysLongNames, WeekDaysShortNames } from "./enums";

// Calendar --------

// Global

export const weekDaysNames = (): WeekDaysShortAndLongeNames[] => {
  const date = new Date(0);
  const arr = [...Array(numberOfDaysOfTheWeek).keys()].map((dayOfWeek) => {
    date.setDate(dayOfWeek + 1);
    return {
      long: new Intl.DateTimeFormat([config.locale], {
        weekday: "long",
      }).format(date) as WeekDaysLongNames,
      short: new Intl.DateTimeFormat([config.locale], {
        weekday: "short",
      }).format(date) as WeekDaysShortNames,
    };
  });
  return arr;
};

export const numberOfDaysOfTheWeek = 7;

// Current
export const currentMonthName = new Intl.DateTimeFormat(config.locale, {
  month: "long",
}).format(config.today.date);

const monthDays = [...Array(config.today.monthNumberOfDays).keys()];
export const currentMonthDays = monthDays.map((day) => ({
  month: config.today.month,
  day: day + 1,
  year: config.today.year,
}));

// Previous

export const previousMonthName = new Intl.DateTimeFormat(config.locale, {
  month: "long",
}).format(new Date(config.today.year, config.today.month, 0));

export const previousMonth =
  config.today.month === Months.JANUARY
    ? Months.DECEMBER
    : config.today.month - 1;

export const previousMonthYear =
  config.today.month === Months.JANUARY
    ? config.today.year - 1
    : config.today.year;

export const previousMonthNumberOfDays = new Date(
  config.today.year,
  config.today.month,
  0
).getDate();

// Next

export const nextMonthName = new Intl.DateTimeFormat(config.locale, {
  month: "long",
}).format(new Date(config.today.year, config.today.month + 1, 1));

export const nextMonth =
  config.today.month === Months.DECEMBER
    ? Months.JANUARY
    : config.today.month + 1;

export const nextMonthYear =
  config.today.month === Months.DECEMBER
    ? config.today.year + 1
    : config.today.year;
