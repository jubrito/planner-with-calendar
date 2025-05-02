import { memo, RefObject } from 'react';
import { EventDetailsModal } from './EventDetailsModal/EventDetailsModal';

type EventModalsContainerProps = {
  closeModal: () => void;
  viewEventModalRef: RefObject<HTMLDivElement | null>;
};

export const EventModalsContainer = memo(
  ({ closeModal, viewEventModalRef }: EventModalsContainerProps) => {
    return (
      <EventDetailsModal
        closeModal={closeModal}
        viewEventModalRef={viewEventModalRef}
      />
    );
  },
);
