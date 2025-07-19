/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useCallback } from 'react';
import { Modal } from '../../../../../components/Modal/Modal';
import { clearEventOnUpdate } from '../../../../../redux/slices/eventSlice';
import { useDispatch } from 'react-redux';
import { useManageEventUpdates } from '../../../../../hooks/useManageEventUpdates';
import { useSelector } from 'react-redux';
import { getCurrentEventOnUpdate } from '../../../../../redux/slices/eventSlice/selectors';
import { getDateISOString } from '../../../../../utils/calendar/utils';

export const EventUpdateModal = memo(() => {
  const dispatch = useDispatch();
  const eventOnUpdate = useSelector(getCurrentEventOnUpdate());
  const isOpen = (eventOnUpdate && eventOnUpdate.event) != null;

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
        <input
          id="Title"
          aria-label="Title"
          placeholder="Add title"
          value={title}
          onChange={(event) => updateEventField('title', event.target.value)}
          aria-errormessage={errors.title}
        />
        <span>{errors.title}</span>
      </>
    </Modal>
  );
});
