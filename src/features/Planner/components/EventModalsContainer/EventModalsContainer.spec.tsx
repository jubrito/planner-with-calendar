import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EventDetailsModal } from './EventDetailsModal/EventDetailsModal';
import { renderWithProviders } from '../../../../utils/tests/renderWithProviders';
import { initialValue } from '../../../../redux/slices/eventSlice';
import { getDateISOString } from '../../../../utils/calendar/utils';

describe('EventModalsContainer', () => {
  const eventTitle = 'eventTitle';
  it('should render event details modal', () => {
    renderWithProviders(<EventDetailsModal />, {
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
    });
    const event = screen.getByText(eventTitle);
    expect(event).toBeInTheDocument();
  });
});
