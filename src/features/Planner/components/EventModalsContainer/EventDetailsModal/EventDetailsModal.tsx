import { useDispatch, useSelector } from 'react-redux';
import { memo, RefObject, useCallback } from 'react';
import { getLocaleLanguage } from '../../../../../redux/slices/localeSlice/selectors';
import { getCurrenteventOnViewMode } from '../../../../../redux/slices/eventSlice/selectors';
import { getEventModalContent } from '../../../../../utils/events/dayView/getModalInfo';
import { Modal } from '../../../../../components/Modal/Modal';
import { dashSeparator } from '../../../../../utils/constants';
import { clearEventOnViewMode } from '../../../../../redux/slices/eventSlice';

type EventDetailsModalProps = {
  editModal: () => void;
  viewEventModalRef: RefObject<HTMLDivElement | null>;
};

export const EventDetailsModal = memo(
  ({ editModal, viewEventModalRef }: EventDetailsModalProps) => {
    const locale = useSelector(getLocaleLanguage());
    const eventOnViewMode = useSelector(getCurrenteventOnViewMode());

    const dispatch = useDispatch();

    const closeModal = useCallback(() => {
      // TODO modal should receive ref to focus after close through redux
      // const eventRef = viewEvent.selectedEventRef.current;
      // if (eventRef != null) eventRef.focus();
      dispatch(clearEventOnViewMode());
    }, [dispatch]);

    if (!eventOnViewMode || !eventOnViewMode.event) return <></>;

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
        ref={viewEventModalRef}
        dialogAccessibleName={title}
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
  },
);
