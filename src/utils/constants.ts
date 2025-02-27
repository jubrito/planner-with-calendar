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

export const currentYear = new Date().getFullYear();

export const currentMonth = new Date().getMonth();

export const currentMonthName = new Date().toLocaleString("default", {
  month: "long",
});

export const previousMonthNumberOfDays = new Date(
  currentYear,
  currentMonth,
  0
).getDate();

export const currentMonthNumberOfDays = new Date(
  currentYear,
  currentMonth + 1,
  0
).getDate();

export const currentMonthDays = [...Array(currentMonthNumberOfDays).keys()];
