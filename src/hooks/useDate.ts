import { useState } from "react";
import { DateConfig } from "../types/calendar/types";
import { LocaleLanguage } from "../types/locale/types";
import {
  getDay,
  getDayOfWeek,
  getMonthIndex,
  getMonthNumberOfDays,
  getTimeInMilliseconds,
  getYear,
} from "../utils/calendar/utils";
import { getFormatedDate } from "../utils/calendar/current";

const getInitialDate = (
  locale: LocaleLanguage,
  initialYear?: number,
  initialMonth?: number,
  initialDay?: number
) => {
  const year = initialYear ?? getYear(locale, new Date());
  const month = initialMonth ?? getMonthIndex(locale, new Date());
  const day = initialDay ?? getDay(locale, new Date());

  return new Date(year, month, day);
};

export const useDate = (
  locale: LocaleLanguage,
  initialYear?: DateConfig["year"],
  initialMonth?: DateConfig["month"],
  initialDay?: DateConfig["day"]
): DateConfig => {
  const [formatedDate, setFormatedDate] = useState(
    getFormatedDate(
      locale,
      getInitialDate(locale, initialYear, initialMonth, initialDay)
    )
  );

  const updateDate = (year: number, month: number, day: number) => {
    setFormatedDate(getFormatedDate(locale, new Date(year, month, day)));
  };

  return {
    date: formatedDate,
    updateDate,
    day: getDay(locale, formatedDate),
    month: getMonthIndex(locale, formatedDate),
    year: getYear(locale, formatedDate),
    time: getTimeInMilliseconds(formatedDate),
    dayOfWeek: getDayOfWeek(locale, formatedDate),
    monthNumberOfDays: getMonthNumberOfDays(locale, formatedDate),
  };
};
