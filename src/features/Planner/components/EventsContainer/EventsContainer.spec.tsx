import '@testing-library/jest-dom';
import { act, waitFor, screen, within } from '@testing-library/react';
import { EventContainer } from './EventsContainer';
import userEvent from '@testing-library/user-event';
import { EventsByDates, SelectedEventOnDayView } from '../../../../types/event';
import { Months } from '../../../../types/calendar/enums';
import { renderWithProviders } from '../../../../utils/tests/renderWithProviders';
import { initialValue } from '../../../../redux/slices/eventSlice';
import { InitialState as InitialLocaleState } from '../../../../redux/slices/localeSlice';
import { InitialState as InitialEventState } from '../../../../redux/slices/eventSlice';
import {
  initialValue as initialDateValue,
  InitialState as InitialDateState,
} from '../../../../redux/slices/dateSlice';
import { defaultEventTitle } from '../../../../utils/events/dayView/constants';
import { getDateISOString } from '../../../../utils/calendar/utils';
import { formatDateIDFromDate } from '../../../../utils/events/utils';
import {
  numberOfHoursInADay,
  sizeOfEach15MinBlock,
} from '../../../../utils/calendar/constants';

const title = 'title';
const year = 2025;
const month = Months.FEBRUARY;
const day = 11;
const startDate = getDateISOString(new Date(year, month, day));
const endDate = getDateISOString(new Date(year, month, day));
const initialSelectedEvent = {
  event: {
    endDate,
    startDate,
    id: 'id',
    title,
  },
  top: 0,
};

type renderEventsContainerProps = {
  selectedDayViewEvent?: SelectedEventOnDayView;
  dayViewISODate?: string;
  eventsByDates?: EventsByDates;
};
type PreloadedState =
  | Partial<{
      dateSlice: InitialDateState;
      localeSlice: InitialLocaleState;
      eventSlice: InitialEventState;
    }>
  | undefined;

const renderEventsContainer = ({
  selectedDayViewEvent,
  eventsByDates,
  dayViewISODate,
}: renderEventsContainerProps) => {
  const preloadedState: PreloadedState = {
    eventSlice: {
      ...initialValue,
      currentState: {
        ...initialValue.currentState,
        selectedDayViewEvent,
        eventsByDates: eventsByDates || {},
      },
    },
  };
  if (dayViewISODate) {
    preloadedState.dateSlice = {
      ...initialDateValue,
      currentState: {
        ...initialDateValue.currentState,
        dayViewISODate: dayViewISODate || '',
      },
    };
  }
  return renderWithProviders(<EventContainer />, { preloadedState });
};

const createEvent = ({
  targetElement,
  mouseDownY,
  mouseMoveY,
  mouseUpY,
}: {
  targetElement: Element;
  mouseDownY?: number;
  mouseMoveY?: number;
  mouseUpY?: number;
}) => {
  const rect = targetElement.getBoundingClientRect();
  const positionY = rect.top;
  const mouseDownEvent = new MouseEvent('mousedown', {
    clientY: mouseDownY || positionY || 0,
    bubbles: true,
  });
  const mouseMoveEvent = new MouseEvent('mousemove', {
    clientY: mouseMoveY || 0,
    bubbles: true,
  });
  const mouseUpEvent = new MouseEvent('mouseup', {
    clientY: mouseUpY || 0,
    bubbles: true,
  });
  act(() => {
    targetElement.dispatchEvent(mouseDownEvent);
  });
  act(() => {
    targetElement.dispatchEvent(mouseMoveEvent);
  });
  act(() => {
    targetElement.dispatchEvent(mouseUpEvent);
  });
};

describe('EventContainer', () => {
  describe('When creating an event', () => {
    it('should create event and display event details', async () => {
      const { container } = renderWithProviders(<EventContainer />);
      const targetElement = container.firstElementChild;
      expect(targetElement).not.toBe(null);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const positionY = rect.top;
        createEvent({
          targetElement,
          mouseDownY: positionY,
          mouseMoveY: 49,
          mouseUpY: 49,
        });
        const eventDefaultTitle = defaultEventTitle;
        const eventTime = '12:00 – 01:00 AM';
        await waitFor(() => {
          expect(screen.getByText(eventDefaultTitle)).toBeInTheDocument();
          expect(screen.getByText(eventTime)).toBeInTheDocument();
        });
      }
    });
    it('should create event ending on 12 am and display event details', async () => {
      const { container } = renderWithProviders(<EventContainer />);
      const targetElement = container.firstElementChild;
      expect(targetElement).not.toBe(null);
      if (targetElement) {
        const sizeOfHourBlockDisplayed = sizeOfEach15MinBlock * 4;
        const sizeOfAllBlocks = sizeOfHourBlockDisplayed * numberOfHoursInADay;
        const secondLastCell = sizeOfAllBlocks - sizeOfEach15MinBlock * 2;
        const lastCell = sizeOfAllBlocks - 1;
        createEvent({
          targetElement,
          mouseDownY: secondLastCell,
          mouseMoveY: lastCell,
          mouseUpY: lastCell,
        });
        const eventDefaultTitle = defaultEventTitle;
        const eventTime = '11:30 PM – 12:00 AM';
        await waitFor(() => {
          expect(screen.getByText(eventDefaultTitle)).toBeInTheDocument();
          expect(screen.getByText(eventTime)).toBeInTheDocument();
        });
      }
    });
    it('should create and display multiple events', async () => {
      const { container } = renderWithProviders(<EventContainer />);
      const targetElement = container.firstElementChild;
      expect(targetElement).not.toBe(null);
      if (targetElement) {
        createEvent({
          targetElement,
        });
        createEvent({
          targetElement,
        });
        createEvent({
          targetElement,
        });
        const eventDefaultTitle = defaultEventTitle;
        await waitFor(() => {
          expect(screen.getAllByText(eventDefaultTitle).length).toBe(3);
        });
      }
    });
    it('should display event details when interacting with the not visible portion of the container', async () => {
      const { container } = renderWithProviders(<EventContainer />);
      const targetElement = container.firstElementChild;
      expect(targetElement).not.toBe(null);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const positionY = rect.top;
        createEvent({
          targetElement,
          mouseDownY: positionY + 525,
          mouseMoveY: positionY + 625,
          mouseUpY: positionY + 625,
        });
        const eventDefaultTitle = defaultEventTitle;
        const eventTime = '10:30 AM – 12:45 PM';
        await waitFor(() => {
          expect(screen.getByText(eventDefaultTitle)).toBeInTheDocument();
          expect(screen.getByText(eventTime)).toBeInTheDocument();
        });
      }
    });
  });
  describe('When opening modal', () => {
    it('should not display modal if selected day view event is not defined', () => {
      renderEventsContainer({});
      const event = screen.queryByText(title);
      expect(event).not.toBeInTheDocument();
    });
    it('should not display modal if selected event is not defined', () => {
      renderEventsContainer({
        selectedDayViewEvent: {
          ...initialSelectedEvent,
          event: undefined,
        },
      });
      const event = screen.queryByText(title);
      expect(event).not.toBeInTheDocument();
    });
  });
  it('should hide modal when clicking on container (on mouse down)', async () => {
    const date = getDateISOString(new Date(year, month, day));
    const { container, store } = renderEventsContainer({
      selectedDayViewEvent: {
        ...initialSelectedEvent,
        event: initialSelectedEvent.event,
      },
      dayViewISODate: date,
      eventsByDates: {
        [formatDateIDFromDate(date)]: {
          events: [initialSelectedEvent.event],
        },
      },
    });
    const dayViewContainer = container.firstElementChild;
    expect(dayViewContainer).not.toBe(null);
    if (dayViewContainer) {
      const eventWrapper = screen.getByTitle(
        'Click on the event to view details and actions',
      );
      const modal = screen.getByRole('dialog');
      const modalTitle = within(modal).getByText(
        initialSelectedEvent.event.title,
      );
      const event = within(eventWrapper).getByText(
        initialSelectedEvent.event.title,
      );
      const initialSelectedDayViewEvent =
        store.getState().eventSlice.currentState.selectedDayViewEvent;
      expect(initialSelectedDayViewEvent?.event).toBe(
        initialSelectedEvent.event,
      );

      await userEvent.click(event);

      expect(modalTitle).toBeInTheDocument();

      createEvent({ targetElement: dayViewContainer });

      const currentSelectedDayViewEvent =
        store.getState().eventSlice.currentState.selectedDayViewEvent;

      await waitFor(() => {
        expect(currentSelectedDayViewEvent).toBeUndefined();
        expect(modalTitle).not.toBeInTheDocument();
      });
    }
  });

  it('should close the modal when clicking on close button', async () => {
    const { container } = renderEventsContainer({
      selectedDayViewEvent: {
        ...initialSelectedEvent,
        event: initialSelectedEvent.event,
      },
    });
    const targetElement = container.firstElementChild;
    expect(targetElement).not.toBe(null);
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const positionY = rect.top;
      createEvent({
        targetElement,
        mouseDownY: positionY + 525,
        mouseMoveY: positionY + 625,
        mouseUpY: positionY + 625,
      });
      const event = screen.getByTitle(
        'Click on the event to view details and actions',
      );

      await userEvent.click(event);

      const modal = screen.getByRole('dialog');
      const closeButton = screen.getByLabelText('Click to close modal');

      await userEvent.click(closeButton);

      expect(modal).not.toBeInTheDocument();
    }
  });

  it('should only render events day opened', () => {
    const dayOnDayViewContainer = 1;
    const monthOnDayViewContainer = 1;
    const yearOnDayViewContainer = 2025;
    const day1Mock = {
      key: `${dayOnDayViewContainer}/${monthOnDayViewContainer}/25`,
      events: [
        {
          id: 'event-1746404701734',
          title: 'First event from day 1',
          startDate: '2025-01-01T03:15:00.000Z',
          endDate: '2025-01-01T04:00:00.000Z',
        },
        {
          id: 'event-1746404702252',
          title: 'Second event from day 1',
          startDate: '2025-01-01T04:45:00.000Z',
          endDate: '2025-01-01T05:15:00.000Z',
        },
      ],
    };
    const day2Mock = {
      key: '1/2/25',
      events: [
        {
          id: 'event-1746405007716',
          title: 'First event from day 2',
          startDate: '2025-01-02T04:15:00.000Z',
          endDate: '2025-01-02T04:30:00.000Z',
        },
        {
          id: 'event-1746405090400',
          title: 'Second event from day 2',
          startDate: '2025-01-02T05:30:00.000Z',
          endDate: '2025-01-02T06:00:00.000Z',
        },
      ],
    };
    const day3Mock = {
      key: '1/3/25',
      events: [
        {
          id: 'event-1746405144092',
          title: 'Event from day 3',
          startDate: '2025-01-03T04:30:00.000Z',
          endDate: '2025-01-03T05:00:00.000Z',
        },
      ],
    };
    const eventsByDatesMock = {
      [day1Mock.key]: {
        events: day1Mock.events,
      },
      [day2Mock.key]: {
        events: day2Mock.events,
      },
      [day3Mock.key]: {
        events: day3Mock.events,
      },
    };
    const monthZeroIndexed = monthOnDayViewContainer - 1;
    const date = new Date(
      yearOnDayViewContainer,
      monthZeroIndexed,
      dayOnDayViewContainer,
    );
    renderEventsContainer({
      dayViewISODate: getDateISOString(date),
      eventsByDates: eventsByDatesMock,
    });
    day1Mock.events.forEach((day1MockEvent) => {
      const event = screen.getByText(day1MockEvent.title);
      expect(event).toBeInTheDocument();
    });
    day2Mock.events.forEach((day2MockEvent) => {
      const event = screen.queryByText(day2MockEvent.title);
      expect(event).not.toBeInTheDocument();
    });
    day3Mock.events.forEach((day3MockEvent) => {
      const event = screen.queryByText(day3MockEvent.title);
      expect(event).not.toBeInTheDocument();
    });
  });
});
