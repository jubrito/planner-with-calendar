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

export type EventOnCreation = Omit<EventStored, 'startDate' | 'endDate'> & {
  startDate: Date;
  endDate: Date;
};
