import { memo, RefObject, useState } from 'react';
import { Modal } from '../../../../../components/Modal/Modal';

type EventCreationModalProps = {
  closeModal: () => void;
  createEventModalRef: RefObject<HTMLDivElement | null>;
};

export const EventCreationModal = memo(
  ({ closeModal, createEventModalRef }: EventCreationModalProps) => {
    const [title, setTitle] = useState('');

    return (
      <Modal
        title={
          <>
            <input
              placeholder="Add title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </>
        }
        content={<p>content</p>}
        style={{ top: 200 }}
        closeModal={{ handleClose: closeModal }}
        ref={createEventModalRef}
      />
    );
  },
);
