import '@testing-library/jest-dom';
import { act, waitFor, screen } from '@testing-library/react';
import { EventContainer } from './EventsContainer';
import userEvent from '@testing-library/user-event';
import { SelectedEventOnDayView } from '../../../../types/event';
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

const title = 'title';
const year = 2025;
const month = Months.FEBRUARY;
const day = 11;
const startDate = new Date(year, month, day).toISOString();
const endDate = new Date(year, month, day).toISOString();
const initialSelectedEvent: SelectedEventOnDayView = {
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
  dayViewISODate,
}: renderEventsContainerProps) => {
  const preloadedState: PreloadedState = {
    eventSlice: {
      ...initialValue,
      currentState: {
        ...initialValue.currentState,
        selectedDayViewEvent,
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
  mouseDownY: number;
  mouseMoveY: number;
  mouseUpY: number;
}) => {
  const rect = targetElement.getBoundingClientRect();
  const positionY = rect.top;
  const mouseDownEvent = new MouseEvent('mousedown', {
    clientY: mouseDownY || positionY,
    bubbles: true,
  });
  const mouseMoveEvent = new MouseEvent('mousemove', {
    clientY: mouseMoveY,
    bubbles: true,
  });
  const mouseUpEvent = new MouseEvent('mouseup', {
    clientY: mouseUpY,
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
    it('should display event details when interacting with the visible portion of the container', async () => {
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
  it('should display modal when clicking on event', async () => {
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
      expect(modal).toBeInTheDocument();
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
});
