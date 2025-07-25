import { useSelector } from 'react-redux';
import { FieldError } from '../../../../../../components/FieldError/FieldError';
import { LocaleLanguage } from '../../../../../../types/locale/types';
import {
  getDay,
  getFormattedDateString,
  getMonthIndex,
  getMonthName,
  getYear,
} from '../../../../../../utils/calendar/utils';
import { getWeekDayName } from '../../../../../../utils/calendar/weeks';
import {
  IntlDateTimeFormatLong,
  IntlDateTimeFormatNumeric,
} from '../../../../../../utils/constants';
import { getLocaleLanguage } from '../../../../../../redux/slices/localeSlice/selectors';
import { isValidDate } from '../../../../../../utils/checkers';
import { useState } from 'react';
import { Calendar } from '../../../../../../components/Calendar/Calendar/Calendar';
import { Months } from '../../../../../../types/calendar/enums';
import { isSameDayEvent } from '../../../../../../utils/utils';

type DateInfo = {
  dayOfTheWeek: string;
  monthName: string;
  day: number;
  label: string;
  hour: number;
  minutes: number;
  month: number;
  year: number;
};

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
    year: startYear,
    day: startDay,
    month: startMonth,
    hour: startHour,
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

  const eventisSameDay = isSameDayEvent(
    { year: startYear, month: startMonth, day: startDay },
    { year: endYear, month: endMonth, day: endDay },
  );

  return (
    <>
      <div className={className.wrapper}>
        {icon}
        <>
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
            aria-readonly={`${readonly}`}
            readOnly={readonly}
            aria-errormessage={errorMessage}
          />
          <input
            id={startHourLabel}
            aria-label={startHourLabel}
            className={className.field}
            value={startHour}
            onClick={() => {
              console.log('field clicked');
            }}
            aria-readonly={readonly}
            readOnly={readonly}
            aria-errormessage={errorMessage}
          />
        </>
        <>
          {!eventisSameDay && (
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
              aria-readonly={`${readonly}`}
              readOnly={readonly}
              aria-errormessage={errorMessage}
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
        </>
      </div>
      {openStartDatePicker && (
        <Calendar
          compactMode
          onCellClick={(cellYear, cellMonth, cellDay) => {
            const monthZeroIndexed = cellMonth - 1;
            onCellClick.startDate(cellYear, monthZeroIndexed, cellDay);
          }}
        />
      )}
      {openEndDatePicker && (
        <Calendar
          compactMode
          onCellClick={(cellYear, cellMonth, cellDay) => {
            const monthZeroIndexed = cellMonth - 1;
            onCellClick.endDate(cellYear, monthZeroIndexed, cellDay);
          }}
        />
      )}
    </>
  );
};

const getFullDateLabel = (locale: LocaleLanguage, date: Date) => {
  const formattedLabel = getFormattedDateString(locale, date, {
    weekday: IntlDateTimeFormatLong,
    month: IntlDateTimeFormatLong,
    day: IntlDateTimeFormatNumeric,
  });
  const firstCharInUpperCase = formattedLabel.charAt(0).toUpperCase();
  return firstCharInUpperCase + formattedLabel.slice(1);
};

const getDateInfo = (validDate: Date, locale: LocaleLanguage): DateInfo => ({
  dayOfTheWeek: getWeekDayName(
    getYear(validDate),
    getMonthIndex(locale, validDate),
    getDay(validDate),
    locale,
  ),
  monthName: getMonthName(locale, validDate),
  month: getMonthIndex(locale, validDate),
  day: getDay(validDate),
  label: getFullDateLabel(locale, validDate),
  hour: validDate.getHours(),
  minutes: validDate.getMinutes(),
  year: getYear(validDate),
});
