export type Event = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  dayViewPosition: {
    startY: number;
    endY: number;
  };
};

export type EventOnCreation = Omit<Event, 'startDate' | 'endDate'> & {
  startDate: Date;
  endDate: Date;
};
