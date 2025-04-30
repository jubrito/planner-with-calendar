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
  date: Date;
};

export type EventOnCreate = {
  id: string;
  start: EventOnCreateInfo;
  end: EventOnCreateInfo;
  title: string;
};
