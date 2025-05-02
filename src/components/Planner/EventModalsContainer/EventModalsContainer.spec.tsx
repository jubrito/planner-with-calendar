import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../utils/tests/renderWithProviders';
import { EventDetailsModal } from './EventDetailsModal/EventDetailsModal';
import { initialValue } from '../../../redux/slices/eventSlice';

describe('EventModalsContainer', () => {
  const refMock = { current: null };
  const eventTitle = 'eventTitle';
  it('should not render modal if selected event is not defined', () => {
    renderWithProviders(
      <EventDetailsModal closeModal={jest.fn()} viewEventModalRef={refMock} />,
    );
    const event = screen.queryByText(eventTitle);
    expect(event).not.toBeInTheDocument();
  });
  it('should render modal if selected event is defined', () => {
    renderWithProviders(
      <EventDetailsModal closeModal={jest.fn()} viewEventModalRef={refMock} />,
      {
        preloadedState: {
          eventSlice: {
            ...initialValue,
            currentState: {
              ...initialValue.currentState,
              selectedDayViewEvent: {
                event: {
                  dayViewPosition: {
                    endY: 0,
                    startY: 0,
                  },
                  endDate: new Date().toISOString(),
                  startDate: new Date().toISOString(),
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
