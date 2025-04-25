export type Event = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  dayViewPosition: {
    startY: number;
    endY: number;
  };
};
