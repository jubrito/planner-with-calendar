import { memo, RefObject } from 'react';
import { EventDetailsModal } from './EventDetailsModal/EventDetailsModal';

type EventModalsContainerProps = {
  closeModal: () => void;
  editModal: () => void;
  viewEventModalRef: RefObject<HTMLDivElement | null>;
};

export const EventModalsContainer = memo(
  ({ closeModal, editModal, viewEventModalRef }: EventModalsContainerProps) => {
    return (
      <EventDetailsModal
        closeModal={closeModal}
        editModal={editModal}
        viewEventModalRef={viewEventModalRef}
      />
    );
  },
);
