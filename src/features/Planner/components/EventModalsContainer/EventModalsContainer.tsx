import { memo, RefObject, useCallback } from 'react';
import { EventDetailsModal } from './EventDetailsModal/EventDetailsModal';

export type ViewEventDetailsModalProps = {
  selectedEventRef: RefObject<HTMLDivElement | null>;
  modalRef: RefObject<HTMLDivElement | null>;
};

export type CreateEventModalProps = {
  modalRef: RefObject<HTMLDivElement | null>;
};

type EventModalsContainerProps = {
  viewEvent: ViewEventDetailsModalProps;
};

export const EventModalsContainer = memo(
  ({ viewEvent }: EventModalsContainerProps) => {
    const editModal = useCallback(() => {
      alert('edit');
    }, []);

    return (
      <>
        <EventDetailsModal
          editModal={editModal}
          viewEventModalRef={viewEvent.modalRef}
        />
        {/* <EventCreationModal
          closeModal={closeModal}
          createEventModalRef={createEvent.modalRef}
        /> */}
      </>
    );
  },
);
