import { DateConfig } from "../types/calendar/types";

export const isToday = (
  year: DateConfig["year"],
  month: DateConfig["month"],
  date: DateConfig["day"]
) => {
  const currentDate = new Date();
  return (
    year === currentDate.getFullYear() &&
    month === currentDate.getMonth() &&
    date === currentDate.getDate()
  );
};
