import styles from './event-details-modal.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { memo } from 'react';
import { EventOnEdit } from '../ClickableHoursOfTheDay';
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

    const getEventTimeDetails = () => {
      const startEvent = getEventInfo(startDate, locale);
      const endEvent = getEventInfo(endDate, locale);
      const isSameDay = isSameDayEvent(startEvent, endEvent);

      if (isSameDay) return formatSameDayEvent(startEvent, endEvent);
      return formatMultiDayEvent(startEvent, endEvent);
    };

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
          <p title={getEventTimeDetails()}>{getEventTimeDetails()}</p>
        </div>
      </div>
    );
  },
);

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

const formatSameDayEvent = (startEvent: EventInfo, endEvent: EventInfo) => {
  const updatedStartPeriod =
    startEvent.period === endEvent.period ? '' : startEvent.period;
  return `${startEvent.weekDay}, ${startEvent.monthName} ${startEvent.day} ⋅ ${startEvent.time}${updatedStartPeriod} – ${endEvent.time}${endEvent.period}`;
};

const formatMultiDayEvent = (startEvent: EventInfo, endEvent: EventInfo) => {
  const isSameYearEvent = startEvent.year === startEvent.year;
  const startYearUpdated = !isSameYearEvent ? `${startEvent.year}, ` : '';
  const endYearUpdated = !isSameYearEvent ? `${endEvent.year}, ` : '';
  return `${startEvent.monthName} ${startEvent.day}, ${startYearUpdated} ${startEvent.time}${startEvent.period} – ${endEvent.monthName} ${endEvent.day}, ${endYearUpdated} ${endEvent.time}${endEvent.period}`;
};
