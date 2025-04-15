import { useSelector } from 'react-redux';
import { sizeOfEach15MinBlock } from '../../../../utils/calendar/constants';
import { getFormatedDateString } from '../../../../utils/calendar/utils';
import styles from './event.module.scss';
import { EventBlock } from '../ClickableHoursOfTheDay';
import { getLocaleLanguage } from '../../../../redux/slices/localeSlice/selectors';
import { IntlDateTimeFormat2Digit } from '../../../../utils/constants';

type EventProps = {
  event: EventBlock;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export const Event = ({ event, onClick }: EventProps) => {
  const eventHeight = event.end.fixedPositionY - event.start.fixedPositionY;
  const eventStart = event.start.fixedPositionY;
  const isAtLeast30MinEvent = eventHeight >= sizeOfEach15MinBlock * 2;
  const isAtLeast60MinEvent = eventHeight >= sizeOfEach15MinBlock * 4;
  const hasMinimumHeight = eventHeight >= sizeOfEach15MinBlock;
  const localeString = useSelector(getLocaleLanguage());
  const titleStyle = {
    fontSize: isAtLeast60MinEvent
      ? '17px'
      : isAtLeast30MinEvent
        ? '15px'
        : '10px',
    marginRight: isAtLeast60MinEvent ? 0 : '5px',
  };
  const timeStyle = {
    fontSize: isAtLeast60MinEvent
      ? '15px'
      : isAtLeast30MinEvent
        ? '15px'
        : '10px',
    marginTop: isAtLeast60MinEvent ? '5px' : 0,
  };
  const eventStyle = {
    top: `${eventStart}px`,
    height: `${eventHeight}px`,
  };
  const eventDetailsStyle = {
    marginTop: isAtLeast30MinEvent ? '5px' : '1px',
  };

  const getEventTime = () => {
    const startFullTime = getFormatedDateString(
      localeString,
      event.start.date,
      {
        hour: IntlDateTimeFormat2Digit,
        minute: IntlDateTimeFormat2Digit,
      },
    );
    const endFullTime = getFormatedDateString(localeString, event.end.date, {
      hour: IntlDateTimeFormat2Digit,
      minute: IntlDateTimeFormat2Digit,
    });
    const [startTime, startPeriod] = getTimeInformation(startFullTime);
    const [endTime, endPeriod] = getTimeInformation(endFullTime);
    const updatedStartPeriod = startPeriod !== endPeriod ? startPeriod : '';

    return `${startTime}${updatedStartPeriod} – ${endTime}${endPeriod}`;
  };

  return (
    <div
      id={event.eventId}
      key={event.eventId}
      className={styles.plannerEvent}
      style={eventStyle}
      onClick={onClick}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {hasMinimumHeight && (
        <div
          className={styles.plannerEventDetails}
          style={{
            ...eventDetailsStyle,
            flexDirection: isAtLeast60MinEvent ? 'column' : 'row',
          }}
        >
          <span style={titleStyle}>{event.title}</span>
          <span style={timeStyle}>{getEventTime()}</span>
        </div>
      )}
    </div>
  );
};

const is12HourClockSystem = (time: string) =>
  time.includes('AM') || time.includes('PM');

/**
 * Function to get time, period, hour and minutes of the event
 * If it is 12-hour clock system it will return the AM/PM period
 * If it is 24-hour clock system it will return the period as an empty string
 * @param formattedFullTime complete time based on location
 * (e.g., 12:00 for 24-hour clock system, 12:00 AM for 12-hour clock system)
 * @returns [time, period, hours, minutes]
 */
const getTimeInformation = (formattedFullTime: string) => {
  if (is12HourClockSystem(formattedFullTime)) {
    const [time, period] = formattedFullTime.split(' ');
    const [hour, minutes] = time.split(':');
    const periodWithSpaceBef = ' ' + period;
    return [time, periodWithSpaceBef, hour, minutes];
  }
  const [hour, minutes] = formattedFullTime.split(':');
  const noPeriod = '';
  return [formattedFullTime, noPeriod, hour, minutes];
};
