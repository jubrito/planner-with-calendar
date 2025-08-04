import { useSelector } from 'react-redux';
import { FieldError } from '../../../../../../components/Fields/FieldError/FieldError';
import { getDateInfo } from '../../../../../../utils/calendar/utils';
import { enterKey } from '../../../../../../utils/constants';
import { getLocaleLanguage } from '../../../../../../redux/slices/localeSlice/selectors';
import { isValidDate } from '../../../../../../utils/checkers';
import { useState } from 'react';
import { Calendar } from '../../../../../../components/Calendar/Calendar/Calendar';
import { Months } from '../../../../../../types/calendar/enums';
import styles from './_date-field.module.scss';
import { isSameDayEvent as isSameDay } from '../../../../../../utils/utils';

type DateFieldProps = {
  icon?: React.ReactElement;
  startISODate: string;
  endISODate: string;
  readonly?: boolean;
  errorMessage?: string;
  onCellClick: {
    startDate: (cellYear: number, cellMonth: Months, cellDay: number) => void;
    endDate: (cellYear: number, cellMonth: Months, cellDay: number) => void;
  };
  className: {
    wrapper: string;
    field: string;
  };
};

type DatePicker = {
  startDate?: string;
  endDate?: string;
};

export const DateField = ({
  icon,
  startISODate,
  endISODate,
  errorMessage,
  className,
  onCellClick,
  readonly = false,
}: DateFieldProps) => {
  const [datePicker, setDatePicker] = useState<DatePicker>({});
  const openStartDatePicker =
    datePicker.startDate && isValidDate(new Date(datePicker.startDate));
  const openEndDatePicker =
    datePicker.endDate && isValidDate(new Date(datePicker.endDate));
  const locale = useSelector(getLocaleLanguage());
  const validStartDate = isValidDate(new Date(startISODate))
    ? new Date(startISODate)
    : new Date();
  const validEndDate = isValidDate(new Date(endISODate))
    ? new Date(endISODate)
    : new Date();
  const startDateLabel = 'Start date';
  const endDateLabel = 'End date';
  const startHourLabel = 'Start hour';
  const endHourLabel = 'End hour';

  const {
    label: startLabel,
    hour: startHour,
    year: startYear,
    day: startDay,
    month: startMonth,
    // minutes: startMinutes,
    // monthName: startMonthName,
    // dayOfTheWeek: startDayOfTheWeek,
  } = getDateInfo(validStartDate, locale);

  const {
    hour: endHour,
    label: endLabel,
    year: endYear,
    day: endDay,
    month: endMonth,
    // minutes: endMinutes,
    // monthName: endMonthName,
    // dayOfTheWeek: endDayOfTheWeek,
  } = getDateInfo(validEndDate, locale);

  const eventisSameDay = isSameDay(
    { year: startYear, month: startMonth, day: startDay },
    { year: endYear, month: endMonth, day: endDay },
  );

  const [isSameDayEvent, setIsSameDayEvent] = useState(eventisSameDay);

  return (
    <>
      <div className={className.wrapper}>
        {icon}
        <div className={styles.container}>
          <div className={styles.dateBox}>
            <input
              id={startDateLabel}
              aria-label={startDateLabel}
              className={className.field}
              value={startLabel}
              onClick={() =>
                setDatePicker({
                  startDate: startISODate,
                })
              }
              onKeyDown={(event) =>
                event.key === enterKey &&
                setDatePicker({
                  startDate: startISODate,
                })
              }
              aria-readonly={`${readonly}`}
              readOnly={readonly}
              aria-errormessage={errorMessage}
            />
            {openStartDatePicker && (
              <Calendar
                compactMode
                onCellClick={(cellYear, cellMonth, cellDay) => {
                  const monthZeroIndexed = cellMonth - 1;
                  onCellClick.startDate(cellYear, monthZeroIndexed, cellDay);
                }}
              />
            )}
            <input
              id={startHourLabel}
              aria-label={startHourLabel}
              className={className.field}
              value={startHour}
              onClick={() => {
                console.log('field clicked startHour', startHour);
              }}
              aria-readonly={readonly}
              readOnly={readonly}
              aria-errormessage={errorMessage}
            />
          </div>
          <div className={styles.dateBox}>
            <input
              id={endDateLabel}
              aria-label={endDateLabel}
              className={className.field}
              value={endLabel}
              onClick={() =>
                setDatePicker({
                  endDate: endISODate,
                })
              }
              onKeyDown={(event) =>
                event.key === enterKey &&
                setDatePicker({
                  startDate: startISODate,
                })
              }
              aria-readonly={`${readonly}`}
              readOnly={readonly}
              aria-errormessage={errorMessage}
            />
            {openEndDatePicker && (
              <Calendar
                compactMode
                onCellClick={(cellYear, cellMonth, cellDay) => {
                  const monthZeroIndexed = cellMonth - 1;
                  onCellClick.endDate(cellYear, monthZeroIndexed, cellDay);
                }}
              />
            )}
            <input
              id={endHourLabel}
              aria-label={endHourLabel}
              className={className.field}
              value={endHour}
              onClick={() => {
                console.log('field clicked');
              }}
              aria-readonly={readonly}
              readOnly={readonly}
              aria-errormessage={errorMessage}
            />
            {errorMessage && <FieldError errorMessage={errorMessage} />}
          </div>
        </div>
      </div>
      <div className={className.wrapper}>
        <div className={styles.container}>
          <div className={styles.multiDayEventBox}>
            <input
              name="isMultiDayEvent"
              id="isMultiDayEvent"
              type="checkbox"
              checked={!isSameDayEvent}
              aria-checked={!isSameDayEvent}
              onChange={() => setIsSameDayEvent((prevValue) => !prevValue)}
            />
            <label htmlFor="isMultiDayEvent">Multi-day event</label>
          </div>
        </div>
      </div>
    </>
  );
};
