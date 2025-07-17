/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useCallback } from 'react';
import { Modal } from '../../../../../components/Modal/Modal';
import { clearEventOnUpdate } from '../../../../../redux/slices/eventSlice';
import { useDispatch } from 'react-redux';
import { useManageEventUpdates } from '../../../../../hooks/useManageEventUpdates';
import { useSelector } from 'react-redux';
import { getCurrentEventOnUpdate } from '../../../../../redux/slices/eventSlice/selectors';
import { getLocaleLanguage } from '../../../../../redux/slices/localeSlice/selectors';

export const EventUpdateModal = memo(() => {
  const dispatch = useDispatch();
  const eventOnUpdate = useSelector(getCurrentEventOnUpdate());
  const locale = useSelector(getLocaleLanguage());
  const isOpen = eventOnUpdate != null && eventOnUpdate.event != null;

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
    validateEventFields,
  } = useManageEventUpdates({
    ...eventOnUpdate?.event,
    startDate: initialStartDate,
    endDate: initialEndDate,
  });
  const { id, title, description, location, startDate, endDate } = eventFields;

  const closeModal = useCallback(() => {
    dispatch(clearEventOnUpdate());
  }, [dispatch]);

  const editModal = useCallback(() => {
    alert('edit');
  }, []);

  return (
    <Modal
      style={{ top: 200 }}
      closeModal={{ handleClose: closeModal }}
      editModal={{ handleEdit: editModal }}
      dialogAccessibleName={title}
      isOpen={isOpen}
    >
      <>
        <input
          placeholder="Add title"
          value={title}
          onChange={(event) => updateEventField('title', event.target.value)}
        />
      </>
    </Modal>
  );
});
