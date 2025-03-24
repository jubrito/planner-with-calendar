import {
  WeekDaysInitials,
  WeekDaysLongNames,
  WeekDaysShortNames,
} from "../../types/calendar/enums";
import {
  DateConfig,
  WeekDaysShortAndLongeNames,
} from "../../types/calendar/types";
import { getDayName } from "./utils";

export const numberOfDaysOfTheWeek = 7;

export const getWeekDaysNames = (
  locale: string
): WeekDaysShortAndLongeNames[] => {
  const date = new Date(0);
  return [...Array(numberOfDaysOfTheWeek).keys()].map((dayOfWeek) => {
    date.setDate(dayOfWeek + 1);
    return {
      long: new Intl.DateTimeFormat([locale], {
        weekday: "long",
      }).format(date) as WeekDaysLongNames,
      short: new Intl.DateTimeFormat([locale], {
        weekday: "short",
      }).format(date) as WeekDaysShortNames,
      initial: new Intl.DateTimeFormat([locale], {
        weekday: "short",
      })
        .format(date)
        .charAt(0) as WeekDaysInitials,
    };
  });
};

export const getWeekDayName = (
  year: DateConfig["year"],
  month: DateConfig["month"],
  dayToFind: number,
  locale: string
): WeekDaysShortNames => {
  const dayOfTheMonthDate = new Date(year, month, dayToFind);
  const dayOfWeek = dayOfTheMonthDate.getDay();
  return getDayName(dayOfWeek, locale);
};
