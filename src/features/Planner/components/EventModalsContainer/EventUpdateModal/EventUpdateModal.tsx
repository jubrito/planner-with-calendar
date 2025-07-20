/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useCallback } from 'react';
import { Modal } from '../../../../../components/Modal/Modal';
import { clearEventOnUpdateMode } from '../../../../../redux/slices/eventSlice';
import { useDispatch } from 'react-redux';
import { useManageEventUpdates } from '../../../../../hooks/useManageEventUpdates';
import { useSelector } from 'react-redux';
import { getCurrenteventOnUpdateMode } from '../../../../../redux/slices/eventSlice/selectors';
import { getDateISOString } from '../../../../../utils/calendar/utils';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import styles from './EventUpdateModal.module.scss';

export const EventUpdateModal = memo(() => {
  const dispatch = useDispatch();
  const eventOnUpdateMode = useSelector(getCurrenteventOnUpdateMode());
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
  const { id, title, description, location, startDate, endDate } = eventFields;

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
        <div className={styles.field}>
          <CalendarMonthIcon />
          <input
            id={titleLabel}
            aria-label={titleLabel}
            placeholder="Add title"
            value={title}
            onChange={(event) => updateEventField('title', event.target.value)}
            aria-errormessage={errors.title}
          />
        </div>
        <span>{errors.title}</span>
      </>
    </Modal>
  );
});
