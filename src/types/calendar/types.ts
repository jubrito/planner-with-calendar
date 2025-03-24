import {
  IntlDateTimeFormat2Digit,
  IntlDateTimeFormatFull,
  IntlDateTimeFormatLong,
  IntlDateTimeFormatMedium,
  IntlDateTimeFormatNarrow,
  IntlDateTimeFormatNumeric,
  IntlDateTimeFormatShort,
} from "../../utils/constants";
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
  dayOfWeek: {
    short: string;
    long: string;
  };
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

export type IntlDateTimeFormatOptions =
  | typeof IntlDateTimeFormatFull
  | typeof IntlDateTimeFormatLong
  | typeof IntlDateTimeFormatMedium
  | typeof IntlDateTimeFormatShort
  | undefined;

export type IntlDateTimeMonthFormatOptions =
  | typeof IntlDateTimeFormatLong
  | typeof IntlDateTimeFormatShort
  | typeof IntlDateTimeFormatNumeric
  | typeof IntlDateTimeFormat2Digit
  | typeof IntlDateTimeFormatNarrow
  | undefined;
