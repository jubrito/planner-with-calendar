import { config } from "../features/Calendar/config";
import {
  MonthsNames,
  WeekDaysNames,
  WeekDaysNamesAbbreviations,
} from "./enums";

export const months = [
  MonthsNames.JANUARY,
  MonthsNames.FEBRUARY,
  MonthsNames.MARCH,
  MonthsNames.APRIL,
  MonthsNames.MAY,
  MonthsNames.JUNE,
  MonthsNames.JULY,
  MonthsNames.AUGUST,
  MonthsNames.SEPTEMBER,
  MonthsNames.OCTOBER,
  MonthsNames.NOVEMBER,
  MonthsNames.DECEMBER,
];

export const weekDays = [
  WeekDaysNames.MONDAY,
  WeekDaysNames.TUESDAY,
  WeekDaysNames.WEDNESDAY,
  WeekDaysNames.THURSDAY,
  WeekDaysNames.FRIDAY,
  WeekDaysNames.SATURDAY,
  WeekDaysNames.SUNDAY,
];

export const weekDaysWithAbbreviation = [
  WeekDaysNamesAbbreviations.MON,
  WeekDaysNamesAbbreviations.TUE,
  WeekDaysNamesAbbreviations.WED,
  WeekDaysNamesAbbreviations.THU,
  WeekDaysNamesAbbreviations.FRI,
  WeekDaysNamesAbbreviations.SAT,
  WeekDaysNamesAbbreviations.SUN,
];

export const today = new Date();

export const currentMonth = today.getMonth() + 1;

export const currentYear = today.getFullYear();

const date = config.date ? new Date(config.date) : today;

export const currentMonthName = new Intl.DateTimeFormat(config.locale, {
  month: "long",
}).format(date);

export const nextMonthName = new Intl.DateTimeFormat(config.locale, {
  month: "long",
}).format(new Date(currentYear, currentMonth, 1));

export const previousMonthName = new Intl.DateTimeFormat(config.locale, {
  month: "long",
}).format(new Date(currentYear, currentMonth - 1, 0));

export const previousMonth = new Intl.DateTimeFormat(config.locale, {
  month: "numeric",
}).format(new Date(currentYear, currentMonth - 1, 0));

export const nextMonth = new Intl.DateTimeFormat(config.locale, {
  month: "numeric",
}).format(new Date(currentYear, currentMonth, 1));

export const previousMonthYear = new Intl.DateTimeFormat(config.locale, {
  year: "numeric",
}).format(new Date(currentYear, currentMonth - 1, 0));

export const nextMonthYear = new Intl.DateTimeFormat(config.locale, {
  year: "numeric",
}).format(new Date(currentYear, currentMonth, 0));

export const previousMonthNumberOfDays = new Date(
  currentYear,
  currentMonth - 1,
  0
).getDate();

export const currentMonthNumberOfDays = new Date(
  currentYear,
  currentMonth,
  0
).getDate();

const monthDays = [...Array(currentMonthNumberOfDays).keys()];

export const currentMonthDays = monthDays.map((day) => ({
  month: currentMonth.toString(),
  day: day + 1,
  year: currentYear.toString(),
}));
