import { memo, RefObject } from 'react';
import { EventDetailsModal } from './EventDetailsModal/EventDetailsModal';
import { EventUpdateModal } from './EventUpdateModal/EventUpdateModal';

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
      <EventUpdateModal />
    </>
  );
});
