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

export const previousMonthName = new Date(
  currentYear,
  currentMonth,
  0
).toLocaleString("default", {
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

const monthDays = [...Array(currentMonthNumberOfDays).keys()];
// export const currentMonthDays = Array.from(
//   Array(currentMonthNumberOfDays),
//   (currentMonthNumberOfDays) => currentMonthNumberOfDays + 1
// );
export const currentMonthDays = monthDays.map((day) => ({
  month: currentMonthName,
  day: day + 1,
}));
