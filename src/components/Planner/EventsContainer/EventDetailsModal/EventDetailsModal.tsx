import styles from './event-details-modal.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { memo } from 'react';
import { EventOnEdit } from '../EventsContainer';
import { getWeekDayName } from '../../../../utils/calendar/weeks';
import {
  getFormattedDateString,
  getMonthIndex,
  getMonthName,
  getTimeInformation,
} from '../../../../utils/calendar/utils';
import { useSelector } from 'react-redux';
import { getLocaleLanguage } from '../../../../redux/slices/localeSlice/selectors';
import {
  IntlDateTimeFormat2Digit,
  IntlDateTimeFormatShort,
} from '../../../../utils/constants';
import { LocaleLanguage } from '../../../../types/locale/types';
import { DateConfig } from '../../../../types/calendar/types';

type EventDetailsModalProps = {
  toggleDetailsModal: (eventOnEdit?: EventOnEdit) => void;
  top?: number;
  title: EventOnEdit['title'];
  startDate: EventOnEdit['startDate'];
  endDate: EventOnEdit['endDate'];
};

type EventInfo = {
  year: DateConfig['year'];
  month: DateConfig['month'];
  day: DateConfig['day'];
  hour: number;
  minutes: number;
  monthName: string;
  formattedFullTime: string;
  time: string;
  period: string;
  weekDay: string;
};

export const EventDetailsModal = memo(
  ({
    top = 0,
    toggleDetailsModal,
    title,
    startDate,
    endDate,
  }: EventDetailsModalProps) => {
    const locale = useSelector(getLocaleLanguage());
    const startEvent = getEventInfo(startDate, locale);
    const endEvent = getEventInfo(endDate, locale);
    const isSameDay = isSameDayEvent(startEvent, endEvent);
    const sameDayContent = getSameDayEventText(startEvent, endEvent);
    const multiDayContent = getMultiDayEventText(startEvent, endEvent);
    const { sameDayTitle, multiDayTitle } = getEventTitle(
      sameDayContent,
      multiDayContent,
    );

    return (
      <div
        className={styles.modal}
        id="event-details-modal"
        onMouseDown={(e) => e.stopPropagation()}
        style={{ top }}
      >
        <div className={styles.actions}>
          <button onClick={() => toggleDetailsModal()} aria-label="Close">
            <CloseIcon />
          </button>
          <button aria-label="Delete event">
            <DeleteIcon />
          </button>
          <button aria-label="Edit event (from X AM to Y AM?)">
            <EditIcon />
          </button>
        </div>
        <div className={styles.content}>
          <p>{title}</p>
          {isSameDay && <p title={sameDayTitle}>{sameDayContent}</p>}
          {!isSameDay && <p title={multiDayTitle}>{multiDayContent}</p>}
        </div>
      </div>
    );
  },
);

const getEventTitle = (sameDayContent: string, multiDayContent: string) => ({
  sameDayTitle: createEventTitle(sameDayContent).replace('\u2022', 'from'),
  multiDayTitle: createEventTitle(multiDayContent).replace('on', 'from'),
});

const getEventInfo = (date: Date, locale: LocaleLanguage): EventInfo => {
  const year = date.getFullYear();
  const month = getMonthIndex(locale, date);
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const monthName = getMonthName(locale, date, IntlDateTimeFormatShort);
  const formattedFullTime = getFormattedFullTime(date, locale);
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

const getFormattedFullTime = (date: Date, locale: LocaleLanguage) =>
  getFormattedDateString(locale, date, {
    hour: IntlDateTimeFormat2Digit,
    minute: IntlDateTimeFormat2Digit,
  });

const isSameDayEvent = (startEvent: EventInfo, endEvent: EventInfo) =>
  startEvent.day === endEvent.day &&
  startEvent.monthName === endEvent.monthName &&
  startEvent.year === endEvent.year;

const createEventTitle = (eventText: string) =>
  'Event on ' + eventText.replace('–', 'to');

const getSameDayEventText = (startEvent: EventInfo, endEvent: EventInfo) => {
  const updatedStartPeriod =
    startEvent.period === endEvent.period ? '' : startEvent.period;
  const date = `${startEvent.weekDay}, ${startEvent.monthName} ${startEvent.day}`;
  const time = `${startEvent.time}${updatedStartPeriod} – ${endEvent.time}${endEvent.period}`;
  return date + ' \u2022 ' + time;
};

const getMultiDayEventText = (startEvent: EventInfo, endEvent: EventInfo) => {
  const isSameYearEvent = startEvent.year === endEvent.year;
  const startYearUpdated = !isSameYearEvent ? `${startEvent.year}, ` : '';
  const endYearUpdated = !isSameYearEvent ? `${endEvent.year}, ` : '';
  const getText = (event: EventInfo, yearUpdated: string) =>
    `${event.monthName} ${event.day}, ${yearUpdated}${event.time}${event.period}`;
  const startText = getText(startEvent, startYearUpdated);
  const endText = getText(endEvent, endYearUpdated);
  return startText + ' – ' + endText;
};
