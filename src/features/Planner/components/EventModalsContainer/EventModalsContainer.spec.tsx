import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EventDetailsModal } from './EventDetailsModal/EventDetailsModal';
import { renderWithProviders } from '../../../../utils/tests/renderWithProviders';
import { initialValue } from '../../../../redux/slices/eventSlice';
import { getDateISOString } from '../../../../utils/calendar/utils';

describe('EventModalsContainer', () => {
  const refMock = { current: null };
  const eventTitle = 'eventTitle';
  it('should not render modal if selected event is not defined', () => {
    renderWithProviders(
      <EventDetailsModal
        editModal={jest.fn()}
        closeModal={jest.fn()}
        viewEventModalRef={refMock}
      />,
    );
    const event = screen.queryByText(eventTitle);
    expect(event).not.toBeInTheDocument();
  });
  it('should render modal if selected event is defined', () => {
    renderWithProviders(
      <EventDetailsModal
        editModal={jest.fn()}
        closeModal={jest.fn()}
        viewEventModalRef={refMock}
      />,
      {
        preloadedState: {
          eventSlice: {
            ...initialValue,
            currentState: {
              ...initialValue.currentState,
              eventOnViewMode: {
                event: {
                  endDate: getDateISOString(new Date()),
                  startDate: getDateISOString(new Date()),
                  id: 'id',
                  title: eventTitle,
                },
                top: 0,
              },
            },
          },
        },
      },
    );
    const event = screen.getByText(eventTitle);
    expect(event).toBeInTheDocument();
  });
});
