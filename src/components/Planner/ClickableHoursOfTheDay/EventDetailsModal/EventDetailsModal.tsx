import styles from './event-details-modal.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type EventDetailsModalProps = {
  top?: number;
};

export const EventDetailsModal = ({ top = 0 }: EventDetailsModalProps) => {
  return (
    <div
      className={styles.modal}
      id="event-details-modal"
      onMouseDown={(e) => e.stopPropagation()}
      style={{ top }}
    >
      <div className={styles.actions}>
        <button className="closeTODO" aria-label="Close">
          <CloseIcon />
        </button>
        <button className="deletTODO" aria-label="Delete event">
          <DeleteIcon />
        </button>
        <button
          className="editTODO"
          aria-label="Edit event (from X AM to Y AM?)"
        >
          <EditIcon />
        </button>
      </div>
      <div className={styles.content}>
        <p>Title</p>
        <p>Monday, April 21 ⋅ 10:45 – 11 AM</p>
      </div>
    </div>
  );
};
