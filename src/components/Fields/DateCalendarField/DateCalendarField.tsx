import { useState } from 'react';
import { isValidDate } from '../../../utils/checkers';
import { Calendar } from '../../Calendar/Calendar/Calendar';
import { Months } from '../../../types/calendar/enums';
import {
  getDateInfo,
  getMonthIndex,
  getYear,
} from '../../../utils/calendar/utils';
import { useSelector } from 'react-redux';
import { getLocaleLanguage } from '../../../redux/slices/localeSlice/selectors';
import { DefaultField } from '../DefaultField/DefaultField';
import { enterKey, spaceKey } from '../../../utils/constants';

type DateCalendarFieldProps = {
  dateLabel: string;
  className?: string;
  value: string;
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: () => void;
  isFieldReadOnly?: boolean;
  errorMessage?: string;
  onCellClick: (cellYear: number, cellMonth: Months, cellDay: number) => void;
  initialISODate?: string;
};

type DatePicker = {
  date?: string;
};

export const DateCalendarField = ({
  dateLabel,
  onChange,
  onClick,
  onKeyDown,
  value,
  className,
  errorMessage,
  onCellClick,
  isFieldReadOnly = false,
  initialISODate,
}: DateCalendarFieldProps) => {
  const locale = useSelector(getLocaleLanguage());
  const [dateValue, setDateValue] = useState(value);
  const [datePicker, setDatePicker] = useState<DatePicker>({});
  const openStartDatePicker =
    datePicker.date && isValidDate(new Date(datePicker.date));
  const defaultYear = initialISODate
    ? getYear(new Date(initialISODate))
    : undefined;
  const defaultMonth = initialISODate
    ? getMonthIndex(locale, new Date(initialISODate))
    : undefined;

  function handleUpdateDateInput(
    cellYear: number,
    cellMonth: Months,
    cellDay: number,
  ) {
    const monthZeroIndexed = cellMonth - 1;
    const { label } = getDateInfo(
      new Date(cellYear, monthZeroIndexed, cellDay),
      locale,
    );
    setDateValue(label);
  }

  return (
    <>
      <DefaultField
        id={dateLabel}
        aria-label={dateLabel}
        className={className}
        value={dateValue}
        onChange={onChange}
        label={{
          text: dateLabel,
          srOnly: true,
        }}
        onClick={() => {
          if (onClick) {
            onClick();
          }
          setDatePicker({ date: initialISODate });
        }}
        onKeyDown={(event) => {
          const shouldOpen = event.key === enterKey || event.code == spaceKey;
          if (onKeyDown) {
            onKeyDown();
          }
          if (shouldOpen) {
            setDatePicker({ date: initialISODate });
          }
        }}
        readOnly={!onChange || isFieldReadOnly}
        errorMessage={errorMessage}
      />
      {openStartDatePicker && (
        <Calendar
          compactMode
          onCellClick={(
            cellYear: number,
            cellMonth: Months,
            cellDay: number,
          ) => {
            onCellClick(cellYear, cellMonth, cellDay);
            handleUpdateDateInput(cellYear, cellMonth, cellDay);
          }}
          defaultYear={defaultYear}
          defaultMonth={defaultMonth}
        />
      )}
    </>
  );
};
