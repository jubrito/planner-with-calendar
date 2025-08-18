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
import modalStyles from './../../../../../components/Modal/_modal.module.scss';
import { getLocaleLanguage } from '../../../../../redux/slices/localeSlice/selectors';
import { DateFields } from '../../../../../components/Fields/DateFields/DateFields';
import { updateDayViewISODate } from '../../../../../redux/slices/dateSlice';
import { validateDate } from '../../../../../utils/validations';
import { ErrorField } from '../../../../../components/Fields/ErrorField/ErrorField';
import { DefaultField } from '../../../../../components/Fields/DefaultField/DefaultField';

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

  const { eventFields, errors, updateEventField } = useManageEventUpdates({
    ...eventOnUpdateMode?.event,
    startDate: initialStartDate && getDateISOString(initialStartDate),
    endDate: initialEndDate && getDateISOString(initialEndDate),
  });

  const { title, startDate: startISODate, endDate: endISODate } = eventFields;
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
          <DefaultField
            className={modalStyles.line}
            label={{
              text: titleLabel,
              srOnly: true,
            }}
            id={titleLabel}
            placeholder="Add title"
            value={title}
            onChange={(event) => updateEventField('title', event.target.value)}
            errorMessage={errors.title}
          />
        </div>
        {errors.title && <ErrorField errorMessage={errors.title} />}
        <DateFields
          errorMessage={errors.startDate}
          className={{ wrapper: styles.field, field: modalStyles.box }}
          startISODate={startISODate}
          endISODate={endISODate}
          icon={<AccessTimeIcon />}
          readonly
          onCellClick={{
            startDate: (cellYear, cellMonth, cellDay) => {
              validateDate(new Date(startISODate), 'get start date field');
              const currentDate = new Date(startISODate);
              const { hour: startHour, minutes: startMinutes } = getDateInfo(
                currentDate,
                locale,
              );
              validateDate(
                new Date(cellYear, cellMonth, cellDay, startHour, startMinutes),
                'update start date field',
              );
              const selectedDate = new Date(
                cellYear,
                cellMonth,
                cellDay,
                startHour,
                startMinutes,
              );
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
              validateDate(new Date(endISODate), 'get end date field');
              const currentDate = new Date(endISODate);
              const { hour: endHour, minutes: endMinutes } = getDateInfo(
                currentDate,
                locale,
              );
              validateDate(
                new Date(cellYear, cellMonth, cellDay, endHour, endMinutes),
                'update end date field',
              );
              updateEventField(
                'endDate',
                getDateISOString(
                  new Date(cellYear, cellMonth, cellDay, endHour, endMinutes),
                ),
              );
            },
          }}
        />
      </>
    </Modal>
  );
});
