import { useState } from "react";
import { DateConfig } from "../types/calendar/types";
import { LocaleLanguage } from "../types/locale/types";
import { getDayOfWeek, getYear } from "../utils/calendar/utils";

const getInitialDate = (
  initialYear?: number,
  initialMonth?: number,
  initialDay?: number
) => {
  const year = initialYear ?? new Date().getFullYear();
  const month = initialMonth ?? new Date().getMonth();
  const day = initialDay ?? new Date().getDate();

  return new Date(year, month, day);
};

export const useDate = (
  locale: LocaleLanguage,
  initialYear?: DateConfig["year"],
  initialMonth?: DateConfig["month"],
  initialDay?: DateConfig["day"]
): DateConfig => {
  const [date, setDate] = useState(
    getInitialDate(initialYear, initialMonth, initialDay)
  );

  const updateDate = (year: number, month: number, day: number) => {
    setDate(new Date(year, month, day));
  };

  return {
    date,
    updateDate,
    day: date.getDate(),
    month: date.getMonth(),
    year: getYear(locale, date),
    time: date.getTime(),
    dayOfWeek: getDayOfWeek(locale, date),
    monthNumberOfDays: new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate(),
  };
};
