import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { EventUpdateModal } from './EventUpdateModal';
import { renderWithProviders } from '../../../../../utils/tests/renderWithProviders';
import { EventOnDayView } from '../../../../../types/event';
import { getDateISOString } from '../../../../../utils/calendar/utils';
import { Months } from '../../../../../types/calendar/enums';
import { initialValue } from '../../../../../redux/slices/eventSlice';

describe('EventUpdateModal', () => {
  const eventTitle = 'title';
  const year = 2025;
  const month = Months.FEBRUARY;
  const day = 11;
  const startHour = 1;
  const startMinutes = 59;
  const endHour = 11;
  const endMinutes = 59;
  const startDate = getDateISOString(
    new Date(year, month, day, startHour, startMinutes),
  );
  const endDate = getDateISOString(
    new Date(year, month, day, endHour, endMinutes),
  );
  const initialSelectedEvent: EventOnDayView = {
    event: {
      endDate,
      startDate,
      id: 'id',
      title: eventTitle,
    },
    top: 0,
  };

  it('should render modal if eventOnViewMode properties is defined', () => {
    renderWithProviders(<EventUpdateModal />, {
      preloadedState: {
        eventSlice: {
          ...initialValue,
          currentState: {
            ...initialValue.currentState,
            eventOnUpdate: {
              event: initialSelectedEvent.event,
              top: initialSelectedEvent.top,
            },
          },
        },
      },
    });
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });

  it('should render title input and allow updates', async () => {
    renderWithProviders(<EventUpdateModal />, {
      preloadedState: {
        eventSlice: {
          ...initialValue,
          currentState: {
            ...initialValue.currentState,
            eventOnUpdate: initialSelectedEvent, // opens modal
          },
        },
      },
    });
    const addTitleInput = screen.getByPlaceholderText('Add title');
    expect(addTitleInput).toBeInTheDocument();
    const newEventTitle = 'updated';
    await userEvent.click(addTitleInput);
    await userEvent.type(addTitleInput, newEventTitle);
    expect(
      screen.getByDisplayValue(eventTitle + newEventTitle),
    ).toBeInTheDocument();
  });

  it('should render close button', async () => {
    renderWithProviders(<EventUpdateModal />, {
      preloadedState: {
        eventSlice: {
          ...initialValue,
          currentState: {
            ...initialValue.currentState,
            eventOnUpdate: initialSelectedEvent, // opens modal
          },
        },
      },
    });
    const closeButton = screen.getByLabelText('Close');
    expect(closeButton).toBeInTheDocument();
  });

  it('should not display Update Event modal if event on update is not defined', () => {
    renderWithProviders(<EventUpdateModal />);
    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();
  });

  it('should not display modal if event on update selected event is not defined', () => {
    renderWithProviders(<EventUpdateModal />, {
      preloadedState: {
        eventSlice: {
          ...initialValue,
          currentState: {
            ...initialValue.currentState,
            eventOnUpdate: {
              event: undefined,
            }, // opens modal
          },
        },
      },
    });
    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();
  });

  it.todo('should render date input');
  it.todo('should render hour range inputs');
  it.todo('should render date checkbox');
  it.todo('should render recurrence dropdown');
  it.todo('should render description input');
  it.todo('should render alerts');
});
