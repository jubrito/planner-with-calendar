import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { getLocaleLanguage } from '../../../../../redux/slices/localeSlice/selectors';
import { getCurrentEventOnViewMode } from '../../../../../redux/slices/eventSlice/selectors';
import { getEventModalContent } from '../../../../../utils/events/dayView/getModalInfo';
import { Modal } from '../../../../../components/Modal/Modal';
import { dashSeparator } from '../../../../../utils/constants';
import { clearEventOnViewMode } from '../../../../../redux/slices/eventSlice';

export const EventDetailsModal = memo(() => {
  const locale = useSelector(getLocaleLanguage());
  const eventOnViewMode = useSelector(getCurrentEventOnViewMode());
  const isOpen = (eventOnViewMode && eventOnViewMode.event) != null;
  const dispatch = useDispatch();

  const closeModal = useCallback(() => {
    dispatch(clearEventOnViewMode());
  }, [dispatch]);

  const editModal = useCallback(() => {
    alert('edit');
  }, []);

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
      editModal={{ handleEdit: editModal }}
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
