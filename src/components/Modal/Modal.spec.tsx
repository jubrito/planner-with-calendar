import { Modal } from './Modal';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import * as useFocusManagerModule from '../../hooks/useFocusManager';

describe('Modal', () => {
  const eventStyle = {};
  const eventTitle = 'Title';
  const content = 'Content';
  const dialogAccessibleName = 'Modal purpose';
  const closeModalMock = jest.fn();
  const editModalMock = jest.fn();
  const deleteModalMock = jest.fn();
  const closeLabel = 'Close';
  const editLabel = 'Edit';
  const deleteLabel = 'Delete';
  let rerenderModal: (ui: React.ReactNode) => void;
  const returnFocusMock = jest.fn();

  it('should not render modal if is open is false', () => {
    render(
      <Modal
        dialogAccessibleName={dialogAccessibleName}
        style={eventStyle}
        closeModal={{
          closeLabel,
          handleClose: closeModalMock,
        }}
        editModal={{
          editLabel,
          handleEdit: editModalMock,
        }}
        deleteModal={{
          deleteLabel,
          handleDelete: deleteModalMock,
        }}
        isOpen={false}
      >
        <p>Content</p>
      </Modal>,
    );
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });
  describe('When modal is displayed', () => {
    beforeEach(() => {
      const { rerender } = render(
        <Modal
          dialogAccessibleName={dialogAccessibleName}
          style={eventStyle}
          closeModal={{
            closeLabel,
            handleClose: closeModalMock,
          }}
          editModal={{
            editLabel,
            handleEdit: editModalMock,
          }}
          deleteModal={{
            deleteLabel,
            handleDelete: deleteModalMock,
          }}
          isOpen={true}
        >
          <>
            <p>{eventTitle}</p>
            <p>{content}</p>
          </>
        </Modal>,
      );
      rerenderModal = rerender;
    });
    it('should render modal title', () => {
      expect(screen.getByText(eventTitle)).toBeInTheDocument();
    });
    it('should render modal content', () => {
      expect(screen.getByText(content)).toBeInTheDocument();
    });
    it('should render actions labels as aria labels', () => {
      expect(screen.getByLabelText(closeLabel)).toBeInTheDocument();
      expect(screen.getByLabelText(editLabel)).toBeInTheDocument();
      expect(screen.getByLabelText(deleteLabel)).toBeInTheDocument();
    });
    it('should render default aria-label if no label is provided', () => {
      rerenderModal(
        <Modal
          style={{}}
          dialogAccessibleName={dialogAccessibleName}
          closeModal={{
            handleClose: closeModalMock,
          }}
          editModal={{
            handleEdit: editModalMock,
          }}
          deleteModal={{
            handleDelete: deleteModalMock,
          }}
          isOpen={true}
        >
          {content}
        </Modal>,
      );
      const closeDefaultLabel = 'Click to close modal';
      const editDefaultLabel = 'Click to edit';
      const deleteDefaultLabel = 'Click to delete';

      expect(screen.getByLabelText(closeDefaultLabel)).toBeInTheDocument();
      expect(screen.getByLabelText(editDefaultLabel)).toBeInTheDocument();
      expect(screen.getByLabelText(deleteDefaultLabel)).toBeInTheDocument();
    });
    it('should render actions as buttons', () => {
      const closeButton = screen.getByLabelText(closeLabel);
      const editButton = screen.getByLabelText(editLabel);
      const deleteButton = screen.getByLabelText(deleteLabel);
      expect(closeButton).toHaveRole('button');
      expect(editButton).toHaveRole('button');
      expect(deleteButton).toHaveRole('button');
    });
    it('should focus modal first focusable element when component is displayed and open', () => {
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea',
      );
      const [firstFocusableElement] = focusableElements;
      expect(firstFocusableElement).toHaveFocus();
    });
    it('should set modal aria modal attribute to true', () => {
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
    });
    it('should render modal with accessible name', () => {
      const modal = screen.getByLabelText(dialogAccessibleName);
      expect(modal).toBeInTheDocument();
    });
  });
  describe('When running actions', () => {
    beforeEach(() => {
      jest
        .spyOn(useFocusManagerModule, 'useFocusManager')
        .mockImplementation(() => ({
          elementRef: { current: null },
          setupFocusTrap: jest.fn(),
          returnFocusToInitialElement: returnFocusMock,
        }));
      render(
        <Modal
          dialogAccessibleName={dialogAccessibleName}
          style={eventStyle}
          closeModal={{
            closeLabel,
            handleClose: closeModalMock,
          }}
          editModal={{
            editLabel,
            handleEdit: editModalMock,
          }}
          deleteModal={{
            deleteLabel,
            handleDelete: deleteModalMock,
          }}
          isOpen={true}
        >
          <>
            <p>{eventTitle}</p>
            <p>{content}</p>
          </>
        </Modal>,
      );
    });
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should call actions functions when clicking on buttons', async () => {
      const closeButton = screen.getByLabelText(closeLabel);
      const editButton = screen.getByLabelText(editLabel);
      const deleteButton = screen.getByLabelText(deleteLabel);

      await userEvent.click(editButton);
      await userEvent.click(deleteButton);
      await userEvent.click(closeButton);

      expect(closeModalMock).toHaveBeenCalledTimes(1);
      expect(editModalMock).toHaveBeenCalledTimes(1);
      expect(deleteModalMock).toHaveBeenCalledTimes(1);
    });

    it('should call function to return focus to initial element on closing modal', async () => {
      const closeButton = screen.getByLabelText(closeLabel);

      await act(async () => {
        await userEvent.click(closeButton);
      });

      expect(returnFocusMock).toHaveBeenCalledTimes(1);
    });
  });
});
