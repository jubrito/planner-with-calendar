import {
  endLabel,
  IntlDateTimeFormat2Digit,
  IntlDateTimeFormatLong,
  IntlDateTimeFormatNarrow,
  IntlDateTimeFormatNumeric,
  IntlDateTimeFormatShort,
  startLabel,
} from '../../utils/constants';
import { Months } from './enums';

export type DateConfig = {
  date: Date;
  updateDate: (year: number, month: Months, day: number) => void;
  day: number;
  month: Months;
  year: number;
  timeInMilliseconds: number;
  dayOfWeek: string;
  monthNumberOfDays: number;
};

export type CalendarCellInfo = {
  month: DateConfig['month'];
  day: DateConfig['day'];
  year: DateConfig['year'];
};

export type IntlDateTypeWeekdayStyle =
  | typeof IntlDateTimeFormatLong
  | typeof IntlDateTimeFormatShort
  | typeof IntlDateTimeFormatNarrow
  | undefined;

export type IntlDateTypeMonthStyle =
  | typeof IntlDateTimeFormatLong
  | typeof IntlDateTimeFormatShort
  | typeof IntlDateTimeFormatNarrow
  | typeof IntlDateTimeFormatNumeric
  | typeof IntlDateTimeFormat2Digit
  | undefined;

export type ZeroPosition = typeof startLabel | typeof endLabel;

export type EventModalContentBlock = {
  start: string;
  end: string;
  title: string;
};

export type EventModalContent = {
  isSameDayEvent: boolean;
  multiDay?: EventModalContentBlock;
  sameDay?: EventModalContentBlock;
};

export type DateInfo = {
  dayOfTheWeek: string;
  monthName: string;
  day: number;
  label: string;
  hour: number;
  minutes: number;
  month: number;
  year: number;
};
