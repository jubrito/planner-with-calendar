import { memo } from 'react';
import { ViewEventDetailsModal } from './ViewEventDetailsModal/ViewEventDetailsModal';

type EventModalsContainerProps = {
  closeModal: () => void;
};

export const EventModalsContainer = memo(
  ({ closeModal }: EventModalsContainerProps) => {
    return <ViewEventDetailsModal closeModal={closeModal} />;
  },
);
