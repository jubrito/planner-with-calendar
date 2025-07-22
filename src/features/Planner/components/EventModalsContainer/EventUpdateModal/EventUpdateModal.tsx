/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useCallback, useEffect, useState } from 'react';
import { Modal } from '../../../../../components/Modal/Modal';
import {
  clearEventOnUpdateMode,
  clearEventOnViewMode,
} from '../../../../../redux/slices/eventSlice';
import { useDispatch } from 'react-redux';
import { useManageEventUpdates } from '../../../../../hooks/useManageEventUpdates';
import { useSelector } from 'react-redux';
import { getCurrentEventOnUpdateMode } from '../../../../../redux/slices/eventSlice/selectors';
import {
  getDateISOString,
  getDay,
  getFormattedDateString,
  getMonthIndex,
  getMonthName,
  getYear,
} from '../../../../../utils/calendar/utils';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import styles from './EventUpdateModal.module.scss';
import modalStyles from './../../../../../components/Modal/modal.module.scss';
import { getWeekDayName } from '../../../../../utils/calendar/weeks';
import { getLocaleLanguage } from '../../../../../redux/slices/localeSlice/selectors';
import {
  IntlDateTimeFormatLong,
  IntlDateTimeFormatNumeric,
} from '../../../../../utils/constants';
import { LocaleLanguage } from '../../../../../types/locale/types';
import { isValidDate } from '../../../../../utils/checkers';
import { FieldError } from '../../../../../components/FieldError/FieldError';
import CalendarCells from '../../../../../components/Calendar/CalendarCells/CalendarCells';
import CalendarWeeks from '../../../../../components/Calendar/CalendarWeeks/CalendarWeeks';

type DateInfo = {
  dayOfTheWeek: string;
  monthName: string;
  day: number;
  label: string;
};

type DatePicker = {
  startDate?: string;
  endDate?: string;
};

export const EventUpdateModal = memo(() => {
  const [datePicker, setDatePicker] = useState<DatePicker>({});
  const dispatch = useDispatch();
  const locale = useSelector(getLocaleLanguage());
  const eventOnUpdateMode = useSelector(getCurrentEventOnUpdateMode());
  const isOpen = (eventOnUpdateMode && eventOnUpdateMode.event) != null;
  const titleLabel = 'Title';
  const startDateLabel = 'Start Date';
  const initialStartDate = eventOnUpdateMode?.event?.startDate
    ? new Date(eventOnUpdateMode?.event?.startDate)
    : undefined;
  const initialEndDate = eventOnUpdateMode?.event?.endDate
    ? new Date(eventOnUpdateMode?.event?.endDate)
    : undefined;

  const {
    eventFields,
    isDirty,
    errors,
    updateEventField,
    findEventFieldsErrors,
  } = useManageEventUpdates({
    ...eventOnUpdateMode?.event,
    startDate: initialStartDate && getDateISOString(initialStartDate),
    endDate: initialEndDate && getDateISOString(initialEndDate),
  });

  const {
    id,
    title,
    description,
    location,
    startDate: startISODate,
    endDate: endISODate,
  } = eventFields;

  const validStartDate = isValidDate(new Date(startISODate))
    ? new Date(startISODate)
    : new Date();
  // const validEndDate = isValidDate(new Date(endISODate))
  //   ? new Date(endISODate)
  //   : new Date();

  console.log('startDate', validStartDate);
  const startDateInfo = getDateInfo(validStartDate, locale);
  // const endDateInfo = getDateInfo(validEndDate, locale)

  const closeOtherModals = useCallback(() => {
    dispatch(clearEventOnViewMode()); // closes View Event Details modal
  }, [dispatch]);

  useEffect(() => {
    if (isOpen) {
      closeOtherModals();
    }
  }, [isOpen, closeOtherModals]);

  const closeModal = useCallback(() => {
    dispatch(clearEventOnUpdateMode());
  }, [dispatch]);

  if (!eventOnUpdateMode || !eventOnUpdateMode.event) return null;
  const style = { top: eventOnUpdateMode.top, maxWidth: '100%' };

  return (
    <Modal
      style={style}
      closeModal={{ handleClose: closeModal }}
      dialogAccessibleName={title}
      isOpen={isOpen}
    >
      <>
        {/* Title */}
        <>
          <div className={styles.field}>
            <CalendarMonthIcon />
            <input
              className={modalStyles.line}
              id={titleLabel}
              aria-label={titleLabel}
              placeholder="Add title"
              value={title}
              onChange={(event) =>
                updateEventField('title', event.target.value)
              }
              aria-errormessage={errors.title}
            />
          </div>
          {errors.title && <FieldError errorMessage={errors.title} />}
        </>

        {/* Start Date */}
        <>
          <div className={styles.field}>
            <AccessTimeIcon />
            <input
              id={startDateLabel}
              aria-label={startDateLabel}
              className={modalStyles.box}
              value={startDateInfo.label}
              onClick={() =>
                setDatePicker((prevValue) => ({
                  ...prevValue,
                  startDate: startISODate,
                }))
              }
              onChange={(event) => {
                console.log('event.target.value', event.target.value);
                // updateEventField('startDate', event.target.value)
              }}
              aria-errormessage={errors.startDate}
            />
            {errors.startDate && <FieldError errorMessage={errors.startDate} />}
            <input
              id={startDateLabel}
              aria-label={startDateLabel}
              className={modalStyles.box}
              value={'10:00am'}
              aria-errormessage={errors.startDate}
              aria-disabled="true"
              readOnly
            />
            {errors.endDate && <FieldError errorMessage={errors.endDate} />}
          </div>
          {datePicker.endDate && (
            <>
              <table className={styles.compactTable}>
                <CalendarWeeks compactMode />
                <CalendarCells
                  compactMode
                  onCellClick={(cellYear, cellMonth, cellDay) => {
                    updateEventField(
                      'endDate',
                      getDateISOString(new Date(cellYear, cellMonth, cellDay)),
                    );
                  }}
                />
              </table>
            </>
          )}
          {datePicker.startDate && (
            <>
              <table className={styles.compactTable}>
                <CalendarWeeks compactMode />
                <CalendarCells
                  compactMode
                  onCellClick={(cellYear, cellMonth, cellDay) => {
                    updateEventField(
                      'startDate',
                      getDateISOString(new Date(cellYear, cellMonth, cellDay)),
                    );
                  }}
                />
              </table>
            </>
          )}
        </>
      </>
    </Modal>
  );
});

const getDateInfo = (validDate: Date, locale: LocaleLanguage): DateInfo => ({
  dayOfTheWeek: getWeekDayName(
    getYear(validDate),
    getMonthIndex(locale, validDate),
    getDay(validDate),
    locale,
  ),
  monthName: getMonthName(locale, validDate),
  day: getDay(validDate),
  label: getFullDateLabel(locale, validDate),
});

const getFullDateLabel = (locale: LocaleLanguage, date: Date) => {
  const formattedLabel = getFormattedDateString(locale, date, {
    weekday: IntlDateTimeFormatLong,
    month: IntlDateTimeFormatLong,
    day: IntlDateTimeFormatNumeric,
  });
  const firstCharInUpperCase = formattedLabel.charAt(0).toUpperCase();
  return firstCharInUpperCase + formattedLabel.slice(1);
};
