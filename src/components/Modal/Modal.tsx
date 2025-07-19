import { ObjectType } from '../../types/types';
import styles from './modal.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { JSX, useEffect, useState } from 'react';
import { useFocusManager } from '../../hooks/useFocusManager';

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
  isOpen?: boolean;
};
export const Modal = ({
  children,
  style,
  dialogAccessibleName,
  closeModal,
  editModal,
  deleteModal,
  isOpen,
}: ModalProps) => {
  const [displayModal, setDisplayModal] = useState(isOpen);
  const activeElement = document.activeElement;
  const { elementRef, returnFocusToInitialElement, setupFocusTrap } =
    useFocusManager<HTMLDivElement>(activeElement);
  const whiteColor = { color: 'white' };

  useEffect(() => {
    if (!displayModal) return;
    setupFocusTrap();
  }, [setupFocusTrap, displayModal]);

  if (!displayModal) return null;

  return (
    <>
      {displayModal && (
        <div
          className={styles.modal}
          id="modal"
          role="dialog"
          aria-modal={true}
          onMouseDown={(e) => e.stopPropagation()}
          style={style}
          ref={elementRef}
          tabIndex={0}
          aria-label={dialogAccessibleName}
        >
          <div className={styles.actions}>
            {editModal && (
              <button
                onClick={editModal.handleEdit}
                aria-label={editModal.editLabel || 'Edit'}
              >
                <EditIcon style={whiteColor} />
              </button>
            )}
            {deleteModal && (
              <button
                onClick={deleteModal.handleDelete}
                aria-label={deleteModal.deleteLabel || 'Delete'}
              >
                <DeleteIcon style={whiteColor} />
              </button>
            )}
            {closeModal && (
              <button
                onClick={() => {
                  returnFocusToInitialElement();
                  closeModal.handleClose();
                  setDisplayModal(false);
                }}
                aria-label={closeModal.closeLabel || 'Close'}
              >
                <CloseIcon style={whiteColor} />
              </button>
            )}
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      )}
    </>
  );
};
