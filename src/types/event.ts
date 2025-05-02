import { DateConfig } from './calendar/types';

export type EventStored = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  dayViewPosition: {
    startY: number;
    endY: number;
  };
};

export type EventBlock = {
  hour: number;
  minutes: number;
  fifteenMinBlock: number;
};

type EventOnCreateInfo = {
  fixedPositionY: number;
  block: EventBlock;
  date: string;
};

export type EventOnCreate = {
  id: string;
  start: EventOnCreateInfo;
  end: EventOnCreateInfo;
  title: string;
};

export type EventDetailsView = {
  year: DateConfig['year'];
  month: DateConfig['month'];
  day: DateConfig['day'];
  hour: number;
  minutes: number;
  monthName: string;
  formattedFullTime: string;
  time: string;
  period: string;
  weekDay: string;
};

export type SelectedEventOnDayView = {
  top?: number;
  event?: EventStored;
};
