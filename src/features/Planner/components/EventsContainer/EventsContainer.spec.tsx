import '@testing-library/jest-dom';
import { act, waitFor, screen, within } from '@testing-library/react';
import { EventContainer } from './EventsContainer';
import { EventsByDates, EventTargeted } from '../../../../types/event';
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
  eventModes?: {
    eventOnViewMode?: EventTargeted;
    eventOnUpdateMode?: EventTargeted;
  };
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
  eventModes,
  eventsByDates,
  dayViewISODate,
}: renderEventsContainerProps) => {
  const eventSlice = {
    ...initialValue,
    currentState: {
      ...initialValue.currentState,
      eventsByDates: eventsByDates || {},
    },
  };
  if (eventModes?.eventOnViewMode) {
    eventSlice.currentState.eventOnViewMode = eventModes?.eventOnViewMode;
  }
  if (eventModes?.eventOnUpdateMode) {
    eventSlice.currentState.eventOnUpdateMode = eventModes?.eventOnUpdateMode;
  }
  const preloadedState: PreloadedState = {
    eventSlice,
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
    it('should create event 12 am of the same day and display event details', async () => {
      const { container } = renderWithProviders(<EventContainer />);
      const targetElement = container.firstElementChild;
      expect(targetElement).not.toBe(null);
      if (targetElement) {
        const lastCellOfFirstHour = 49;
        createEvent({
          targetElement,
          mouseDownY: 0,
          mouseMoveY: lastCellOfFirstHour,
          mouseUpY: lastCellOfFirstHour,
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
  describe('WHEN hiding modals', () => {
    it('should hide View Event Details modal when clicking on container (on mouse down)', async () => {
      const date = getDateISOString(new Date(year, month, day));
      const { container, store } = renderEventsContainer({
        eventModes: {
          eventOnViewMode: {
            // now Event Details modal is open
            ...initialSelectedEvent,
            event: initialSelectedEvent.event,
          },
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
        const modal = screen.getByRole('dialog');
        const modalTitle = within(modal).getByText(
          initialSelectedEvent.event.title,
        );
        const initialEventOnViewMode =
          store.getState().eventSlice.currentState.eventOnViewMode;
        expect(initialEventOnViewMode?.event).toBe(initialSelectedEvent.event);

        expect(modalTitle).toBeInTheDocument();

        createEvent({ targetElement: dayViewContainer });

        const currentEventOnViewMode =
          store.getState().eventSlice.currentState.eventOnViewMode;

        await waitFor(() => {
          expect(currentEventOnViewMode).toBeUndefined();
          expect(modalTitle).not.toBeInTheDocument();
        });
      }
    });
    it('should hide Update Event modal when clicking on container (on mouse down)', async () => {
      const date = getDateISOString(new Date(year, month, day));
      const { container, store } = renderEventsContainer({
        eventModes: {
          eventOnUpdateMode: {
            // now Event Details modal is open
            ...initialSelectedEvent,
            event: initialSelectedEvent.event,
            top: initialSelectedEvent.top,
          },
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
        const modal = screen.getByRole('dialog');
        const modalTitleInput = within(modal).getByPlaceholderText('Add title');
        const initialEventOnUpdateMode =
          store.getState().eventSlice.currentState.eventOnUpdateMode;
        expect(initialEventOnUpdateMode?.event).toBe(
          initialSelectedEvent.event,
        );

        expect(modalTitleInput).toBeInTheDocument();

        createEvent({ targetElement: dayViewContainer });

        const currentEventOnUpdateMode =
          store.getState().eventSlice.currentState.eventOnUpdateMode;

        await waitFor(() => {
          expect(currentEventOnUpdateMode).toBeUndefined();
          expect(modalTitleInput).not.toBeInTheDocument();
        });
      }
    });
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
  it('should sort events being rendered by start date to display events in cronological order allow using tab key to navigate', () => {
    const dayOnDayViewContainer = 1;
    const monthOnDayViewContainer = 1;
    const yearOnDayViewContainer = 2025;
    const dayViewMock = {
      key: `${dayOnDayViewContainer}/${monthOnDayViewContainer}/25`,
      events: [
        {
          id: 'event-1746404701734',
          title: 'Early event',
          startDate: getDateISOString(
            new Date(
              yearOnDayViewContainer,
              monthOnDayViewContainer,
              dayOnDayViewContainer,
              1, // startHour
            ),
          ),
          endDate: getDateISOString(
            new Date(
              yearOnDayViewContainer,
              monthOnDayViewContainer,
              dayOnDayViewContainer,
              2, // endHour
            ),
          ),
        },
        {
          id: 'event-1746404702252',
          title: 'Middle event',
          startDate: getDateISOString(
            new Date(
              yearOnDayViewContainer,
              monthOnDayViewContainer,
              dayOnDayViewContainer,
              2, // startHour
            ),
          ),
          endDate: getDateISOString(
            new Date(
              yearOnDayViewContainer,
              monthOnDayViewContainer,
              dayOnDayViewContainer,
              3, // endHour
            ),
          ),
        },
        {
          id: 'event-1746404702252',
          title: 'Late event',
          startDate: getDateISOString(
            new Date(
              yearOnDayViewContainer,
              monthOnDayViewContainer,
              dayOnDayViewContainer,
              3, // startHour
            ),
          ),
          endDate: getDateISOString(
            new Date(
              yearOnDayViewContainer,
              monthOnDayViewContainer,
              dayOnDayViewContainer,
              4, // endHour
            ),
          ),
        },
      ],
    };
    const eventsByDatesMock = {
      [dayViewMock.key]: {
        events: dayViewMock.events,
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
    const eventsRendered = screen.getAllByTitle(
      'Click on the event to view details and actions',
    );
    expect(eventsRendered.length).toBe(dayViewMock.events.length);
    const [event1, event2, event3] = eventsRendered;
    const [event1Mock, event2Mock, event3Mock] = dayViewMock.events;
    expect(within(event1).getByText(event1Mock.title)).toBeInTheDocument();
    expect(within(event2).getByText(event2Mock.title)).toBeInTheDocument();
    expect(within(event3).getByText(event3Mock.title)).toBeInTheDocument();
  });
});
