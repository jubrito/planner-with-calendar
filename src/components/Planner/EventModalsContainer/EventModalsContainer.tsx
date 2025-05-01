import { memo } from 'react';
import { EventDetailsModal } from './EventDetailsModal/EventDetailsModal';

type EventModalsContainerProps = {
  closeModal: () => void;
};

export const EventModalsContainer = memo(
  ({ closeModal }: EventModalsContainerProps) => {
    return <EventDetailsModal closeModal={closeModal} />;
  },
);
