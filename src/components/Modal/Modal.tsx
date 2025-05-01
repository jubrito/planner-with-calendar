import { ObjectType } from '../../utils/constants';
import styles from './modal.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { JSX } from 'react';

type ModalProps = {
  title: string;
  content: string | JSX.Element | JSX.Element[] | React.ReactNode;
  closeModal?: {
    handleClose: () => void;
    closeLabel?: string;
  };
  deleteModal?: {
    handleDelete: () => void;
    deleteLabel?: string;
  };
  editModal?: {
    handleEdit: () => void;
    editLabel?: string;
  };
  style: ObjectType;
};
export const Modal = ({
  content,
  style,
  title,
  closeModal,
  editModal,
  deleteModal,
}: ModalProps) => {
  return (
    <div
      className={styles.modal}
      id="event-details-modal"
      onMouseDown={(e) => e.stopPropagation()}
      style={style}
    >
      <div className={styles.actions}>
        {closeModal && (
          <button
            onClick={closeModal.handleClose}
            aria-label={closeModal.closeLabel || 'Click to close modal'}
          >
            <CloseIcon />
          </button>
        )}
        {deleteModal && (
          <button
            onClick={deleteModal.handleDelete}
            aria-label={deleteModal.deleteLabel || 'Click to delete'}
          >
            <DeleteIcon />
          </button>
        )}
        {editModal && (
          <button
            onClick={editModal.handleEdit}
            aria-label={editModal.editLabel || 'Click to edit'}
          >
            <EditIcon />
          </button>
        )}
      </div>
      <div className={styles.content}>
        <p>{title}</p>
        {content}
      </div>
    </div>
  );
};
