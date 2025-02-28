import { WeekDaysShortAndLongeNames } from "../../types/types";
import { config } from "../features/Calendar/config";
import { WeekDaysLongNames, WeekDaysShortNames } from "./enums";

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

export const today = new Date();

export const currentMonth = today.getMonth() + 1;

export const currentYear = today.getFullYear();

const date = config.date ? new Date(config.date) : today;

export const currentMonthName = new Intl.DateTimeFormat(config.locale, {
  month: "long",
}).format(date);

export const currentMonthNumberOfDays = new Date(
  currentYear,
  currentMonth,
  0
).getDate();

export const monthDays = [...Array(currentMonthNumberOfDays).keys()];

export const currentMonthDays = monthDays.map((day) => ({
  month: currentMonth.toString(),
  day: day + 1,
  year: currentYear.toString(),
}));

// Previous

export const previousMonthName = new Intl.DateTimeFormat(config.locale, {
  month: "long",
}).format(new Date(currentYear, currentMonth - 1, 0));

export const previousMonth = new Intl.DateTimeFormat(config.locale, {
  month: "numeric",
}).format(new Date(currentYear, currentMonth - 1, 0));

export const previousMonthYear = new Intl.DateTimeFormat(config.locale, {
  year: "numeric",
}).format(new Date(currentYear, currentMonth - 1, 0));

export const previousMonthNumberOfDays = new Date(
  currentYear,
  currentMonth - 1,
  0
).getDate();

// Next

export const nextMonthName = new Intl.DateTimeFormat(config.locale, {
  month: "long",
}).format(new Date(currentYear, currentMonth, 1));

export const nextMonth = new Intl.DateTimeFormat(config.locale, {
  month: "numeric",
}).format(new Date(currentYear, currentMonth, 1));

export const nextMonthYear = new Intl.DateTimeFormat(config.locale, {
  year: "numeric",
}).format(new Date(currentYear, currentMonth, 0));
