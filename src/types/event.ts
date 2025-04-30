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

export type Block = {
  hour: number;
  minutes: number;
  fifteenMinBlock: number;
};

export type TimeBlock = {
  fixedPositionY: number;
  block: Block;
  date: Date;
};

export type EventOnCreate = {
  eventId: string;
  start: TimeBlock;
  end: TimeBlock;
  title: string;
};
