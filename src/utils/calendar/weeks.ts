import { WeekDaysShortAndLongeNames } from "../../../types/types";
import {
  WeekDaysLongNames,
  WeekDaysShortNames,
} from "../../types/calendar/enums";

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
    };
  });
};

export const numberOfDaysOfTheWeek = 7;
