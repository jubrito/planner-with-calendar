import { memo, RefObject, useCallback } from 'react';
import { EventDetailsModal } from './EventDetailsModal/EventDetailsModal';

export type ViewEventDetailsModalProps = {
  selectedEventRef: RefObject<HTMLDivElement | null>;
  modalRef: RefObject<HTMLDivElement | null>;
};

export type CreateEventModalProps = {
  modalRef: RefObject<HTMLDivElement | null>;
};

export const EventModalsContainer = memo(() => {
  const editModal = useCallback(() => {
    alert('edit');
  }, []);

  return (
    <>
      <EventDetailsModal editModal={editModal} />
      {/* <EventCreationModal
          closeModal={closeModal}
          createEventModalRef={createEvent.modalRef}
        /> */}
    </>
  );
});
