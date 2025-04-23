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

type EventDetailsModalProps = {
  toggleDetailsModal: (eventOnEdit?: EventOnEdit) => void;
  top?: number;
  title: EventOnEdit['title'];
  startDate: EventOnEdit['startDate'];
  endDate: EventOnEdit['endDate'];
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
      const startDay = startDate.getDate();
      const startYear = startDate.getFullYear();
      const startHour = startDate.getHours();
      const startMinutes = startDate.getMinutes();
      const startMonthName = getMonthName(
        locale,
        startDate,
        IntlDateTimeFormatShort,
      );

      const endDay = endDate.getDate();
      const endYear = startDate.getFullYear();
      const endHour = endDate.getHours();
      const endMinutes = endDate.getMinutes();
      const endMonthName = getMonthName(
        locale,
        endDate,
        IntlDateTimeFormatShort,
      );
      const isSameDayEvent =
        startDay === endDay &&
        startMonthName === endMonthName &&
        startYear === endYear;
      const isSameYear = startYear === endYear;
      console.log('startDate', startDate);
      const startYearUpdated = !isSameYear ? `${startYear}, ` : '';
      const startMonth = getMonthIndex(locale, startDate);
      const endYearUpdated = !isSameYear ? `${endYear}, ` : '';
      const endMonth = getMonthIndex(locale, endDate);
      const startFullTime = getFormattedDateString(
        locale,
        new Date(startYear, startMonth, startDay, startHour, startMinutes),
        {
          hour: IntlDateTimeFormat2Digit,
          minute: IntlDateTimeFormat2Digit,
        },
      );
      const endFullTime = getFormattedDateString(
        locale,
        new Date(endYear, endMonth, endDay, endHour, endMinutes),
        {
          hour: IntlDateTimeFormat2Digit,
          minute: IntlDateTimeFormat2Digit,
        },
      );
      const [startTime, startPeriod] = getTimeInformation(startFullTime);
      const [endTime, endPeriod] = getTimeInformation(endFullTime);
      const updatedStartPeriod = startPeriod === endPeriod ? '' : startPeriod;

      if (isSameDayEvent) {
        const weekDay = getWeekDayName(startYear, startMonth, startDay, locale);
        return `${weekDay}, ${startMonthName} ${startDay} ⋅ ${startTime}${updatedStartPeriod} – ${endTime}${endPeriod}`;
      }
      return `${startMonthName} ${startDay}, ${startYearUpdated} ${startTime}${startPeriod} – ${endMonthName} ${endDay}, ${endYearUpdated} ${endTime}${endPeriod}`;

      {
        /* April 21, 2025, 1:30pm – April 22, 2025, 2:45pm */
      }
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
          {/* <p>Monday, April 21 ⋅ 10:45 – 11 AM</p> */}
          {/* April 21, 2025, 1:30pm – April 22, 2025, 2:45pm */}
        </div>
      </div>
    );
  },
);
