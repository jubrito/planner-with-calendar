import { ObjectType } from '../../types/types';
import styles from './modal.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { JSX, RefObject, useEffect } from 'react';

type ModalProps = {
  dialogAccessibleName: string;
  children: string | JSX.Element | JSX.Element[] | React.ReactNode;
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
  ref: RefObject<HTMLDivElement | null>;
};
export const Modal = ({
  children,
  style,
  dialogAccessibleName,
  closeModal,
  editModal,
  deleteModal,
  ref,
}: ModalProps) => {
  useEffect(() => {
    const modalRef = ref.current;
    if (modalRef !== null) modalRef.focus();
  }, [ref]);

  return (
    <div
      className={styles.modal}
      id="modal"
      role="dialog"
      aria-modal={true}
      onMouseDown={(e) => e.stopPropagation()}
      style={style}
      ref={ref}
      tabIndex={0}
      aria-label={dialogAccessibleName}
    >
      <div className={styles.actions}>
        {closeModal && (
          <button
            onClick={closeModal.handleClose}
            aria-label={closeModal.closeLabel || 'Click to close modal'}
            tabIndex={0}
          >
            <CloseIcon />
          </button>
        )}
        {deleteModal && (
          <button
            onClick={deleteModal.handleDelete}
            aria-label={deleteModal.deleteLabel || 'Click to delete'}
            tabIndex={0}
          >
            <DeleteIcon />
          </button>
        )}
        {editModal && (
          <button
            onClick={editModal.handleEdit}
            aria-label={editModal.editLabel || 'Click to edit'}
            tabIndex={0}
          >
            <EditIcon />
          </button>
        )}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
