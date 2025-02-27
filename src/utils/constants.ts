import { Months } from "./enums";

export const months = [
  Months.JANUARY,
  Months.FEBRUARY,
  Months.MARCH,
  Months.APRIL,
  Months.MAY,
  Months.JUNE,
  Months.JULY,
  Months.AUGUST,
  Months.SEPTEMBER,
  Months.OCTOBER,
  Months.NOVEMBER,
  Months.DECEMBER,
];

export const currentMonthName = new Date().toLocaleString("default", {
  month: "long",
});
