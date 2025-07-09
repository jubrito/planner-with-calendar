import { memo, RefObject, useCallback } from 'react';
import { EventDetailsModal } from './EventDetailsModal/EventDetailsModal';
import { EventCreationModal } from './EventCreationModal/EventCreationModal';
import { clearEventOnViewMode } from '../../../../redux/slices/eventSlice';
import { useDispatch } from 'react-redux';

export type ViewEventDetailsModalProps = {
  selectedEventRef: RefObject<HTMLDivElement | null>;
  modalRef: RefObject<HTMLDivElement | null>;
};

export type CreateEventModalProps = {
  modalRef: RefObject<HTMLDivElement | null>;
};

type EventModalsContainerProps = {
  viewEvent: ViewEventDetailsModalProps;
  createEvent: CreateEventModalProps;
};

export const EventModalsContainer = memo(
  ({ viewEvent, createEvent }: EventModalsContainerProps) => {
    const dispatch = useDispatch();

    const closeModal = useCallback(() => {
      const eventRef = viewEvent.selectedEventRef.current;
      if (eventRef != null) eventRef.focus();
      dispatch(clearEventOnViewMode());
    }, [dispatch, viewEvent]);

    const editModal = useCallback(() => {
      alert('edit');
    }, []);

    return (
      <>
        <EventDetailsModal
          closeModal={closeModal}
          editModal={editModal}
          viewEventModalRef={viewEvent.modalRef}
        />
        <EventCreationModal
          closeModal={closeModal}
          createEventModalRef={createEvent.modalRef}
        />
      </>
    );
  },
);
