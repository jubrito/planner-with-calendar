import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../utils/tests/renderWithProviders';
import { ViewEventDetailsModal } from './ViewEventDetailsModal/ViewEventDetailsModal';
import { initialValue } from '../../../redux/slices/eventSlice';

describe('EventModalsContainer', () => {
  const eventTitle = 'eventTitle';
  it('should render modal if selected event is defined', () => {
    renderWithProviders(<ViewEventDetailsModal closeModal={jest.fn()} />, {
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
                endDate: new Date(),
                startDate: new Date(),
                id: 'id',
                title: eventTitle,
              },
              top: 0,
            },
          },
        },
      },
    });
    const event = screen.getByText(eventTitle);
    expect(event).toBeInTheDocument();
  });
});
