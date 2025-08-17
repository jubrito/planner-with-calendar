import { useSelector } from 'react-redux';
import { getDateInfo, getHoursOfTheDay } from '../../../utils/calendar/utils';
import { getLocaleLanguage } from '../../../redux/slices/localeSlice/selectors';
import { isValidDate } from '../../../utils/checkers';
import { Months } from '../../../types/calendar/enums';
import styles from './_date-fields.module.scss';
import { ErrorField } from '../ErrorField/ErrorField';
import { DateCalendarField } from '../DateCalendarField/DateCalendarField';
import { TimeField } from '../TimeField/TimeField';

type DateFieldProps = {
  icon?: React.ReactElement;
  startISODate: string;
  endISODate: string;
  timeOptions: string[];
  onCellClick: {
    startDate: (cellYear: number, cellMonth: Months, cellDay: number) => void;
    endDate: (cellYear: number, cellMonth: Months, cellDay: number) => void;
  };
  className: {
    wrapper: string;
    field: string;
  };
  readonly?: boolean;
  errorMessage?: string;
};

export const DateFields = ({
  icon,
  startISODate,
  endISODate,
  errorMessage,
  className,
  onCellClick,
  readonly = false,
}: DateFieldProps) => {
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
  const hoursOfTheDay = getHoursOfTheDay(locale);

  const { label: startLabel, hour: startHour } = getDateInfo(
    validStartDate,
    locale,
  );

  const { hour: endHour, label: endLabel } = getDateInfo(validEndDate, locale);

  return (
    <>
      <div className={className.wrapper}>
        {icon}
        <div className={styles.container}>
          <div className={styles.dateBox}>
            <DateCalendarField
              dateLabel={startDateLabel}
              className={className.field}
              value={startLabel}
              errorMessage={errorMessage}
              isFieldReadOnly={readonly}
              onCellClick={(cellYear, cellMonth, cellDay) => {
                const monthZeroIndexed = cellMonth - 1;
                onCellClick.startDate(cellYear, monthZeroIndexed, cellDay);
              }}
              initialISODate={startISODate}
            />
            <TimeField
              id={startHourLabel}
              className={className.field}
              value={startHour}
              label={{
                text: startHour,
                srOnly: true,
              }}
              onClick={() => {
                console.log('field clicked startHour', startHour);
              }}
              readOnly={readonly}
              errorMessage={errorMessage}
              timeOptions={hoursOfTheDay}
            />
          </div>
          <div className={styles.dateBox}>
            <DateCalendarField
              dateLabel={endDateLabel}
              className={className.field}
              value={endLabel}
              errorMessage={errorMessage}
              isFieldReadOnly={readonly}
              onCellClick={(cellYear, cellMonth, cellDay) => {
                const monthZeroIndexed = cellMonth - 1;
                onCellClick.endDate(cellYear, monthZeroIndexed, cellDay);
              }}
              initialISODate={startISODate}
            />
            <TimeField
              id={endHourLabel}
              className={className.field}
              value={endHour}
              label={{
                text: endHour,
                srOnly: true,
              }}
              onClick={() => {
                console.log('field clicked endHour', endHour);
              }}
              readOnly={readonly}
              errorMessage={errorMessage}
              timeOptions={hoursOfTheDay}
            />
            {errorMessage && <ErrorField errorMessage={errorMessage} />}
          </div>
        </div>
      </div>
    </>
  );
};
