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
  IntlDateTimeFormat2Digit,
  IntlDateTimeFormatShort,
} from '../../constants';

const getEventTitle = (sameDayContent: string, multiDayContent: string) => ({
  sameDayTitle: createEventTitle(sameDayContent).replace('\u2022', 'from'),
  multiDayTitle: createEventTitle(multiDayContent).replace('on', 'from'),
});

const getEventInfo = (date: Date, locale: LocaleLanguage): EventDetailsView => {
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

const createEventTitle = (eventText: string) =>
  'Event on ' + eventText.replace('–', 'to');

const getSameDayEventText = (
  startEvent: EventDetailsView,
  endEvent: EventDetailsView,
) => {
  const updatedStartPeriod =
    startEvent.period === endEvent.period ? '' : startEvent.period;
  const date = `${startEvent.weekDay}, ${startEvent.monthName} ${startEvent.day}`;
  const time = `${startEvent.time}${updatedStartPeriod} – ${endEvent.time}${endEvent.period}`;
  return date + ' \u2022 ' + time;
};

const getMultiDayEventText = (
  startEvent: EventDetailsView,
  endEvent: EventDetailsView,
) => {
  const isSameYearEvent = startEvent.year === endEvent.year;
  const startYearUpdated = !isSameYearEvent ? `${startEvent.year}, ` : '';
  const endYearUpdated = !isSameYearEvent ? `${endEvent.year}, ` : '';
  const getText = (event: EventDetailsView, yearUpdated: string) =>
    `${event.monthName} ${event.day}, ${yearUpdated}${event.time}${event.period}`;
  const startText = getText(startEvent, startYearUpdated);
  const endText = getText(endEvent, endYearUpdated);
  return startText + ' – ' + endText;
};

const isSameDayEvent = (
  startEvent: EventDetailsView,
  endEvent: EventDetailsView,
) =>
  startEvent.day === endEvent.day &&
  startEvent.monthName === endEvent.monthName &&
  startEvent.year === endEvent.year;

export const getModalContent = (
  startDate: EventOnCreate['start']['date'],
  endDate: EventOnCreate['end']['date'],
  locale: LocaleLanguage,
) => {
  const startEvent = getEventInfo(startDate, locale);
  const endEvent = getEventInfo(endDate, locale);
  const sameDayContent = getSameDayEventText(startEvent, endEvent);
  const multiDayContent = getMultiDayEventText(startEvent, endEvent);
  const { sameDayTitle, multiDayTitle } = getEventTitle(
    sameDayContent,
    multiDayContent,
  );
  return {
    sameDay: {
      content: sameDayContent,
      title: sameDayTitle,
    },
    multiDay: {
      content: multiDayContent,
      title: multiDayTitle,
    },
    isSameDayEvent: isSameDayEvent(startEvent, endEvent),
  };
};
