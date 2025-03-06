export type DateConfig = {
  date: Date;
  updateDate: (year: number, month: number, day: number) => void;
  day: number;
  month: number;
  year: number;
  time: number;
  monthNumberOfDays: number;
};
