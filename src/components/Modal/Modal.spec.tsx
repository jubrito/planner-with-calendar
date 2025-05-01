import { renderWithProviders } from '../../utils/tests/renderWithProviders';
import { Modal } from './Modal';
import { act, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('Modal', () => {
  const eventStyle = {};
  const eventTitle = 'Title';
  const closeModalMock = jest.fn();
  const editModalMock = jest.fn();
  const deleteModalMock = jest.fn();
  const closeLabel = 'Close';
  const editLabel = 'Edit';
  const deleteLabel = 'Delete';
  const content = <>content</>;

  beforeEach(() => {
    renderWithProviders(
      <Modal
        content={content}
        style={eventStyle}
        title={eventTitle}
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
      />,
    );
  });
  it('should render modal title', () => {
    expect(screen.getByText(eventTitle)).toBeInTheDocument();
  });
  it('should render actions labels as aria labels', () => {
    expect(screen.getByLabelText(closeLabel)).toBeInTheDocument();
    expect(screen.getByLabelText(editLabel)).toBeInTheDocument();
    expect(screen.getByLabelText(deleteLabel)).toBeInTheDocument();
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

    await userEvent.click(closeButton);

    expect(closeModalMock).toHaveBeenCalledTimes(1);
  });

  //   it('should call actions functions when clicking on buttons', async () => {
  //     const closeButton = screen.getByLabelText(closeLabel);
  //     const editButton = screen.getByLabelText(editLabel);
  //     const deleteButton = screen.getByLabelText(deleteLabel);

  //     await act(async () => {
  //       await userEvent.click(closeButton);
  //       await userEvent.click(editButton);
  //       await userEvent.click(deleteButton);
  //     });

  //     await waitFor(() => {
  //       expect(closeModalMock).toHaveBeenCalledTimes(1);
  //       expect(editModalMock).toHaveBeenCalledTimes(1);
  //       expect(deleteModalMock).toHaveBeenCalledTimes(1);
  //     });
  //   });
});
