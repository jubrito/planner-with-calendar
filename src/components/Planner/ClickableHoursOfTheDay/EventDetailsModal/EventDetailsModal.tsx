import styles from './event-details-modal.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { memo } from 'react';
import { EventOnEdit } from '../ClickableHoursOfTheDay';

type EventDetailsModalProps = {
  top?: number;
  toggleDetailsModal: (eventOnEdit?: EventOnEdit) => void;
};

export const EventDetailsModal = memo(
  ({ top = 0, toggleDetailsModal }: EventDetailsModalProps) => {
    return (
      <div
        className={styles.modal}
        id="event-details-modal"
        onMouseDown={(e) => e.stopPropagation()}
        style={{ top }}
      >
        <div className={styles.actions}>
          <button onClick={() => toggleDetailsModal()} aria-label="Close">
            <CloseIcon />
          </button>
          <button aria-label="Delete event">
            <DeleteIcon />
          </button>
          <button aria-label="Edit event (from X AM to Y AM?)">
            <EditIcon />
          </button>
        </div>
        <div className={styles.content}>
          <p>Title</p>
          <p>Monday, April 21 ⋅ 10:45 – 11 AM</p>
        </div>
      </div>
    );
  },
);
