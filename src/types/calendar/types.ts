import {
  Months,
  WeekDaysInitials,
  WeekDaysLongNames,
  WeekDaysShortNames,
} from "./enums";

export type DateConfig = {
  date: Date;
  updateDate: (year: number, month: Months, day: number) => void;
  day: number;
  month: Months;
  year: number;
  time: number;
  monthNumberOfDays: number;
};

export type WeekDaysShortAndLongeNames = {
  short: WeekDaysShortNames;
  long: WeekDaysLongNames;
  initial: WeekDaysInitials;
};

export type CalendarCellInfo = {
  month: DateConfig["month"];
  day: DateConfig["day"];
  year: DateConfig["year"];
};

export type ObjectType = Record<string, unknown>;
