import { renderWithProviders } from '../../utils/tests/renderWithProviders';
import { Modal } from './Modal';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('Modal', () => {
  const eventStyle = {};
  const eventTitle = 'Title';
  const content = 'Content';
  const closeModalMock = jest.fn();
  const editModalMock = jest.fn();
  const deleteModalMock = jest.fn();
  const closeLabel = 'Close';
  const editLabel = 'Edit';
  const deleteLabel = 'Delete';
  let rerenderModal: (ui: React.ReactNode) => void;
  const useRefMock = {
    current: null,
  };
  beforeEach(() => {
    const { rerender } = renderWithProviders(
      <Modal
        content={<p>{content}</p>}
        style={eventStyle}
        title={<p>{eventTitle}</p>}
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
        ref={useRefMock}
      />,
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
        content={<></>}
        style={{}}
        title={''}
        closeModal={{
          handleClose: closeModalMock,
        }}
        editModal={{
          handleEdit: editModalMock,
        }}
        deleteModal={{
          handleDelete: deleteModalMock,
        }}
        ref={useRefMock}
      />,
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
  it('should call actions functions when clicking on buttons', async () => {
    const closeButton = screen.getByLabelText(closeLabel);
    const editButton = screen.getByLabelText(editLabel);
    const deleteButton = screen.getByLabelText(deleteLabel);

    await userEvent.click(closeButton);
    await userEvent.click(editButton);
    await userEvent.click(deleteButton);

    expect(closeModalMock).toHaveBeenCalledTimes(1);
    expect(editModalMock).toHaveBeenCalledTimes(1);
    expect(deleteModalMock).toHaveBeenCalledTimes(1);
  });
  it('should focus modal when component is displayed', () => {
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveFocus();
  });
  it('should set modal aria modal attribute to true', () => {
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
  });
});
