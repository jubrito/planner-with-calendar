export type Event = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  dayViewPositionY: {
    start: number;
    end: number;
  };
};
