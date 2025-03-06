import { DateConfig } from "../../types/calendar/types";

export const getUseDateMock = (
  year: DateConfig["year"],
  month: DateConfig["month"],
  day: DateConfig["day"],
  monthNumberOfDays: DateConfig["monthNumberOfDays"]
): DateConfig => ({
  date: new Date(year, month, day),
  updateDate: jest.fn(),
  day: 1,
  month,
  year: year,
  time: new Date(year, month, day).getTime(),
  monthNumberOfDays,
});
