import {
  IntlDateTimeFormat2Digit,
  IntlDateTimeFormatLong,
  IntlDateTimeFormatNarrow,
  IntlDateTimeFormatNumeric,
  IntlDateTimeFormatShort,
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
