import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../utils/tests/renderWithProviders';
import { initialValue } from '../../../../redux/slices/eventSlice';
import { getDateISOString } from '../../../../utils/calendar/utils';
import { EventModalsContainer } from './EventModalsContainer';

describe('EventModalsContainer', () => {
  const eventTitle = 'event title';
  it('should render event details modal', () => {
    renderWithProviders(<EventModalsContainer />, {
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
