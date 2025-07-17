import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../utils/tests/renderWithProviders';
import { initialValue } from '../../../../redux/slices/eventSlice';
import { getDateISOString } from '../../../../utils/calendar/utils';
import { EventModalsContainer } from './EventModalsContainer';

describe('EventModalsContainer', () => {
  const eventTitle = 'event title';

  it('should render Event Details modal', () => {
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

  it('should render Event Update modal', () => {
    renderWithProviders(<EventModalsContainer />, {
      preloadedState: {
        eventSlice: {
          ...initialValue,
          currentState: {
            ...initialValue.currentState,
            eventOnUpdate: {
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
    const eventTitleInput = screen.getByPlaceholderText('Add title');
    expect(eventTitleInput).toBeInTheDocument();
  });
});
