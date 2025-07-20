import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback, useEffect } from 'react';
import { getLocaleLanguage } from '../../../../../redux/slices/localeSlice/selectors';
import { getCurrentEventOnViewMode } from '../../../../../redux/slices/eventSlice/selectors';
import { getEventModalContent } from '../../../../../utils/events/dayView/getModalInfo';
import { Modal } from '../../../../../components/Modal/Modal';
import { dashSeparator } from '../../../../../utils/constants';
import {
  clearEventOnUpdateMode,
  clearEventOnViewMode,
  draftEventOnUpdateMode,
  updateEventOnUpdateMode,
} from '../../../../../redux/slices/eventSlice';

export const EventDetailsModal = memo(() => {
  const locale = useSelector(getLocaleLanguage());
  const eventOnViewMode = useSelector(getCurrentEventOnViewMode());
  const isOpen = (eventOnViewMode && eventOnViewMode.event) != null;
  const dispatch = useDispatch();

  const closeOtherModals = useCallback(() => {
    dispatch(clearEventOnUpdateMode()); // closes Event Update modal
  }, [dispatch]);

  useEffect(() => {
    if (isOpen) {
      closeOtherModals();
    }
  }, [isOpen, closeOtherModals]);

  const closeModal = useCallback(() => {
    dispatch(clearEventOnViewMode());
  }, [dispatch]);

  const openUpdateEventModal = useCallback(() => {
    dispatch(
      updateEventOnUpdateMode({
        event: draftEventOnUpdateMode,
        top: 15,
      }),
    );
  }, [dispatch]);

  if (!eventOnViewMode || !eventOnViewMode.event) return null;

  const { event: selectedEvent, top } = eventOnViewMode;
  const { title } = selectedEvent;
  const { sameDay, multiDay, isSameDayEvent } = getEventModalContent(
    selectedEvent.startDate,
    selectedEvent.endDate,
    locale,
  );

  return (
    <Modal
      style={{ top }}
      closeModal={{ handleClose: closeModal }}
      editModal={{ handleEdit: openUpdateEventModal }}
      dialogAccessibleName={title}
      isOpen={isOpen}
    >
      <>
        <p>
          <strong>{title}</strong>
        </p>
        {isSameDayEvent && (
          <div title={sameDay?.title}>
            <p aria-hidden={true}>{sameDay?.start}</p>
            <p aria-hidden={true}>{sameDay?.end}</p>
          </div>
        )}
        {!isSameDayEvent && (
          <p title={multiDay?.title}>
            {multiDay?.start} {dashSeparator} {multiDay?.end}
          </p>
        )}
      </>
    </Modal>
  );
});
