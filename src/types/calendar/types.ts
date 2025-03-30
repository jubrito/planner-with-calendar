import {
  endRelativePosition,
  initialRelativePosition,
  mouseDownEventHandlerType,
  mouseLeaveEventHandlerType,
  mouseUpEventHandlerType,
} from '../../utils/calendar/constants';
import {
  IntlDateTimeFormat2Digit,
  IntlDateTimeFormatFull,
  IntlDateTimeFormatLong,
  IntlDateTimeFormatMedium,
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

export type ObjectType = Record<string, unknown>;

export type IntlDateTimeFormatOptions =
  | typeof IntlDateTimeFormatFull
  | typeof IntlDateTimeFormatLong
  | typeof IntlDateTimeFormatMedium
  | typeof IntlDateTimeFormatShort
  | undefined;

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

export type EventHandlerType =
  | typeof mouseUpEventHandlerType
  | typeof mouseDownEventHandlerType
  | typeof mouseLeaveEventHandlerType;

export type RelativePosition = {
  initial: {
    relativeX?: number;
    relativeY?: number;
  };
  end: {
    relativeX?: number;
    relativeY?: number;
  };
};

export type RelativePositionOptions =
  | typeof initialRelativePosition
  | typeof endRelativePosition;

export type HourBlockClicked = {
  currentBlock: number;
  mouseEventType: RelativePosition;
};
