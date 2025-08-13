import { useState } from 'react';
import { isValidDate } from '../../../utils/checkers';
import { Calendar } from '../../Calendar/Calendar/Calendar';
import { Months } from '../../../types/calendar/enums';

type DateCalendarFieldProps = {
  dateLabel: string;
  className?: string;
  value: string;
  onClick?: () => void;
  onChange?: () => void;
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
  const [datePicker, setDatePicker] = useState<DatePicker>({});
  const openStartDatePicker =
    datePicker.date && isValidDate(new Date(datePicker.date));
  return (
    <>
      <input
        id={dateLabel}
        aria-label={dateLabel}
        className={className}
        value={value}
        onChange={onChange}
        onClick={() => {
          if (onClick) {
            onClick();
          }
          setDatePicker({ date: initialISODate });
        }}
        onKeyDown={() => {
          if (onKeyDown) {
            onKeyDown();
          }
          setDatePicker({ date: initialISODate });
        }}
        aria-readonly={!onChange || `${isFieldReadOnly}`}
        readOnly={!onChange || isFieldReadOnly}
        aria-errormessage={errorMessage}
      />
      {openStartDatePicker && (
        <Calendar compactMode onCellClick={onCellClick} />
      )}
    </>
  );
};
