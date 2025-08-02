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
  getDateInfo,
  getDateISOString,
} from '../../../../../utils/calendar/utils';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import styles from './_event-update-modal.module.scss';
import modalStyles from './../../../../../components/Modal/modal.module.scss';
import { getLocaleLanguage } from '../../../../../redux/slices/localeSlice/selectors';
import { FieldError } from '../../../../../components/FieldError/FieldError';
import { DateField } from './DateField/DateField';
import { updateDayViewISODate } from '../../../../../redux/slices/dateSlice';
import { validateDate } from '../../../../../utils/validations';

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
    errors,
    updateEventField,
    isDirty,
    findEventFieldsErrors,
  } = useManageEventUpdates({
    ...eventOnUpdateMode?.event,
    startDate: initialStartDate && getDateISOString(initialStartDate),
    endDate: initialEndDate && getDateISOString(initialEndDate),
  });

  const {
    title,
    startDate: startISODate,
    endDate: endISODate,
    id,
    description,
    location,
  } = eventFields;
  const style = {
    top: eventOnUpdateMode?.top,
    maxWidth: 'max-content',
    overflow: 'visible',
  };

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
              const currentDate = new Date(endISODate);
              const selectedDate = new Date(cellYear, cellMonth, cellDay);
              validateDate(currentDate, 'get date field');
              validateDate(selectedDate, 'update date field');
              const { hour: startHour } = getDateInfo(selectedDate, locale);
              updateEventField('startDate', getDateISOString(selectedDate));
              updateEventField('endDate', getDateISOString(selectedDate));
              dispatch(
                updateDayViewISODate({
                  year: cellYear,
                  month: cellMonth,
                  day: cellDay,
                }),
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
