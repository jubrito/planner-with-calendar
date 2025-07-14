import { memo, RefObject } from 'react';
import { EventDetailsModal } from './EventDetailsModal/EventDetailsModal';

export type ViewEventDetailsModalProps = {
  selectedEventRef: RefObject<HTMLDivElement | null>;
  modalRef: RefObject<HTMLDivElement | null>;
};

export type CreateEventModalProps = {
  modalRef: RefObject<HTMLDivElement | null>;
};

export const EventModalsContainer = memo(() => {
  return (
    <>
      <EventDetailsModal />
      {/* <EventCreationModal
          closeModal={closeModal}
          createEventModalRef={createEvent.modalRef}
        /> */}
    </>
  );
});
