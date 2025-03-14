import { WeekDaysShortNames } from "../../types/calendar/enums";
import { getWeekDaysNames } from "./weeks";

export const numOfDaysFromOtherMonthOnCurrentCalendar = (
  weekDayName: WeekDaysShortNames,
  locale: string
) => getWeekDaysNames(locale).findIndex((name) => weekDayName === name.short);
