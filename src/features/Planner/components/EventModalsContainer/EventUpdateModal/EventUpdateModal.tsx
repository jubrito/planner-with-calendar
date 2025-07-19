/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useCallback } from 'react';
import { Modal } from '../../../../../components/Modal/Modal';
import { clearEventOnUpdate } from '../../../../../redux/slices/eventSlice';
import { useDispatch } from 'react-redux';
import { useManageEventUpdates } from '../../../../../hooks/useManageEventUpdates';
import { useSelector } from 'react-redux';
import { getCurrentEventOnUpdate } from '../../../../../redux/slices/eventSlice/selectors';
import { getDateISOString } from '../../../../../utils/calendar/utils';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import styles from './EventUpdateModal.module.scss';

export const EventUpdateModal = memo(() => {
  const dispatch = useDispatch();
  const eventOnUpdate = useSelector(getCurrentEventOnUpdate());
  const isOpen = (eventOnUpdate && eventOnUpdate.event) != null;
  const titleLabel = 'Title';

  const initialStartDate = eventOnUpdate?.event?.startDate
    ? new Date(eventOnUpdate?.event?.startDate)
    : undefined;
  const initialEndDate = eventOnUpdate?.event?.endDate
    ? new Date(eventOnUpdate?.event?.endDate)
    : undefined;

  const {
    eventFields,
    isDirty,
    errors,
    updateEventField,
    findEventFieldsErrors,
  } = useManageEventUpdates({
    ...eventOnUpdate?.event,
    startDate: initialStartDate && getDateISOString(initialStartDate),
    endDate: initialEndDate && getDateISOString(initialEndDate),
  });
  const { id, title, description, location, startDate, endDate } = eventFields;

  const closeModal = useCallback(() => {
    dispatch(clearEventOnUpdate());
  }, [dispatch]);

  if (!eventOnUpdate || !eventOnUpdate.event) return null;
  const style = { top: eventOnUpdate.top, maxWidth: '100%' };

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
