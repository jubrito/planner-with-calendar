import {
  WeekDays,
  WeekDaysLongNames,
  WeekDaysShortNames,
} from "../../types/calendar/enums";
import {
  DateConfig,
  WeekDaysShortAndLongeNames,
} from "../../types/calendar/types";

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

const getDayName = (dayOfWeek: number, locale: string) => {
  let dayName: WeekDaysShortNames;
  const weekDays = getWeekDaysNames(locale);
  if (dayOfWeek === 0) {
    dayName = weekDays[WeekDays.SUNDAY].short;
  } else {
    dayName = weekDays[dayOfWeek - 1].short; // Monday (0) to Saturday (5)
  }
  return dayName;
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

export const numberOfDaysOfTheWeek = 7;
