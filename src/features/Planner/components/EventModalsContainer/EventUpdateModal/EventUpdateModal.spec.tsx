import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { EventUpdateModal } from './EventUpdateModal';
import { renderWithProviders } from '../../../../../utils/tests/renderWithProviders';
import { EventTargeted } from '../../../../../types/event';
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
  const initialSelectedEvent: EventTargeted = {
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
            eventOnUpdateMode: {
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
            eventOnUpdateMode: initialSelectedEvent, // opens modal
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
            eventOnUpdateMode: initialSelectedEvent, // opens modal
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
            eventOnUpdateMode: {
              event: undefined,
            }, // opens modal
          },
        },
      },
    });
    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();
  });

  it('should close other modals when opens by setting event modes to undefined', () => {
    const { store } = renderWithProviders(<EventUpdateModal />, {
      preloadedState: {
        eventSlice: {
          ...initialValue,
          currentState: {
            ...initialValue.currentState,
            eventOnUpdateMode: {
              event: undefined,
            }, // opens modal
          },
        },
      },
    });
    const updateViewEventDetailsModalIsClosed =
      store.getState().eventSlice.currentState.eventOnViewMode;
    expect(updateViewEventDetailsModalIsClosed).toBeUndefined();
  });
  it.todo('should render start date input');
  it.todo('should update start date calendar when clicking on calendar cells');
  it.todo('should update end date calendar when clicking on calendar cells');
  it.todo('should close end date calendar when opening start date calendar');
  it.todo('should close start date calendar when opening end date calendar');
  it.todo('should display fields errors');

  it.todo('should render start initial hour input');
  it.todo('should render start end hour input');
  it.todo('should render end date input');
  it.todo('should render end initial hour input');
  it.todo('should render end end hour input');
  it.todo('should open calendar when clicking on start hour');
  it.todo('should set start hour when selecting calendar day');
  it.todo('should open calendar when clicking on end hour');
  it.todo('should set end hour when selecting calendar day');
  it.todo('should render recurrence dropdown');
  it.todo('should render description input');
  it.todo('should render alerts');
});
