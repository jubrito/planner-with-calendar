import { EventModalContent } from '../../../types/calendar/types';
import { EventDetailsView, EventOnCreate } from '../../../types/event';
import { LocaleLanguage } from '../../../types/locale/types';
import {
  getFormattedDateString,
  getMonthIndex,
  getMonthName,
  getTimeInformation,
} from '../../calendar/utils';
import { getWeekDayName } from '../../calendar/weeks';
import {
  dashSeparator,
  IntlDateTimeFormat2Digit,
  IntlDateTimeFormatShort,
} from '../../constants';
import { isSameDayEvent } from '../../utils';
import { validateDate } from '../../validations';

export const getEventTitle = (
  sameDayContent: { date: string; time: string },
  multiDayContent: { initialDate: string; endDate: string },
) => ({
  sameDayTitle: createEventTitle({
    start: `${sameDayContent.date} ${sameDayContent.time}`,
  }),
  multiDayTitle: createEventTitle({
    start: multiDayContent.initialDate,
    end: multiDayContent.endDate,
  }),
});

export const getEventInfo = (
  date: Date,
  locale: LocaleLanguage,
): EventDetailsView => {
  const year = date.getFullYear();
  const month = getMonthIndex(locale, date);
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const monthName = getMonthName(locale, date, IntlDateTimeFormatShort);
  const formattedFullTime = getFormattedDateString(locale, date, {
    hour: IntlDateTimeFormat2Digit,
    minute: IntlDateTimeFormat2Digit,
  });
  const [time, period] = getTimeInformation(formattedFullTime);
  const weekDay = getWeekDayName(year, month, day, locale);
  return {
    year,
    month,
    monthName,
    day,
    hour,
    minutes,
    formattedFullTime,
    time,
    period,
    weekDay,
  };
};

export const createEventTitle = (sameDayContent: {
  start: string;
  end?: string;
}) => {
  if (!sameDayContent.end) return `Event on ${sameDayContent.start}`;
  return `Event from ${sameDayContent.start} to ${sameDayContent.end}`;
};

export const getSameDayEventText = (
  startEvent: EventDetailsView,
  endEvent: EventDetailsView,
) => {
  const updatedStartPeriod =
    startEvent.period === endEvent.period ? '' : startEvent.period;
  const date = `${startEvent.weekDay}, ${startEvent.monthName} ${startEvent.day}`;
  const time = `${startEvent.time}${updatedStartPeriod} ${dashSeparator} ${endEvent.time}${endEvent.period}`;
  return {
    date,
    time,
  };
};

export const getMultiDayEventText = (
  startEvent: EventDetailsView,
  endEvent: EventDetailsView,
) => {
  const getText = (event: EventDetailsView, yearUpdated: string) =>
    `${event.monthName} ${event.day}, ${yearUpdated}${event.time}${event.period}`;
  const isSameYearEvent = startEvent.year === endEvent.year;
  const startYearUpdated = !isSameYearEvent ? `${startEvent.year}, ` : '';
  const endYearUpdated = !isSameYearEvent ? `${endEvent.year}, ` : '';
  const startText = getText(startEvent, startYearUpdated);
  const endText = getText(endEvent, endYearUpdated);
  return { initialDateText: startText, endDateText: endText };
};

export const getEventModalContent = (
  startDate: EventOnCreate['start']['date'],
  endDate: EventOnCreate['end']['date'],
  locale: LocaleLanguage,
) => {
  const errorMessage = 'get modal content';
  validateDate(new Date(startDate), errorMessage);
  validateDate(new Date(endDate), errorMessage);

  const deserializedStartDate = new Date(startDate);
  const deserializedEndDate = new Date(endDate);
  const startEvent = getEventInfo(deserializedStartDate, locale);
  const endEvent = getEventInfo(deserializedEndDate, locale);
  const sameDayContent = getSameDayEventText(startEvent, endEvent);
  const multiDayEventContent = getMultiDayEventText(startEvent, endEvent);
  const { initialDateText, endDateText } = multiDayEventContent;
  const { sameDayTitle, multiDayTitle } = getEventTitle(sameDayContent, {
    initialDate: initialDateText,
    endDate: endDateText,
  });
  const result: EventModalContent = {
    isSameDayEvent: isSameDayEvent(startEvent, endEvent),
  };

  if (isSameDayEvent(startEvent, endEvent)) {
    result.sameDay = {
      start: sameDayContent.date,
      end: sameDayContent.time,
      title: sameDayTitle,
    };
  } else {
    result.multiDay = {
      start: initialDateText,
      end: endDateText,
      title: multiDayTitle,
    };
  }
  return result;
};
