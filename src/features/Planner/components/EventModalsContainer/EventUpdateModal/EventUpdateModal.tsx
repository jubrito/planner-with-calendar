/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useCallback, useEffect } from 'react';
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
import { DateField } from './DateField/DateField';

type DateInfo = {
  dayOfTheWeek: string;
  monthName: string;
  day: number;
  label: string;
  hour: number;
  minutes: number;
};

export const EventUpdateModal = memo(() => {
  const dispatch = useDispatch();
  const locale = useSelector(getLocaleLanguage());
  const eventOnUpdateMode = useSelector(getCurrentEventOnUpdateMode());
  const isOpen = (eventOnUpdateMode && eventOnUpdateMode.event) != null;
  const titleLabel = 'Title';
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
  const style = { top: eventOnUpdateMode?.top, maxWidth: '100%' };

  const closeOtherModals = useCallback(() => {
    dispatch(clearEventOnViewMode()); // closes View Event Details modal
  }, [dispatch]);

  const closeModal = useCallback(() => {
    dispatch(clearEventOnUpdateMode());
  }, [dispatch]);

  useEffect(() => {
    if (isOpen) {
      closeOtherModals();
    }
  }, [isOpen, closeOtherModals]);

  if (!eventOnUpdateMode || !eventOnUpdateMode.event) return null;

  return (
    <Modal
      style={style}
      closeModal={{ handleClose: closeModal }}
      dialogAccessibleName={title}
      isOpen={isOpen}
    >
      <>
        <div className={styles.field}>
          <CalendarMonthIcon />
          <input
            className={modalStyles.line}
            id={titleLabel}
            aria-label={titleLabel}
            placeholder="Add title"
            value={title}
            onChange={(event) => updateEventField('title', event.target.value)}
            aria-errormessage={errors.title}
          />
        </div>
        {errors.title && <FieldError errorMessage={errors.title} />}
        <DateField
          errorMessage={errors.startDate}
          className={{ wrapper: styles.field, field: modalStyles.box }}
          startISODate={startISODate}
          endISODate={endISODate}
          icon={<AccessTimeIcon />}
          readonly
          onCellClick={{
            startDate: (cellYear, cellMonth, cellDay) => {
              console.log('juju');
              updateEventField(
                'startDate',
                getDateISOString(new Date(cellYear, cellMonth, cellDay)),
              );
            },
            endDate: (cellYear, cellMonth, cellDay) => {
              updateEventField(
                'endDate',
                getDateISOString(new Date(cellYear, cellMonth, cellDay)),
              );
            },
          }}
        />
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
  hour: validDate.getHours(),
  minutes: validDate.getMinutes(),
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
