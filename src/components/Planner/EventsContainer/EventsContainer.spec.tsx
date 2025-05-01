import '@testing-library/jest-dom';
import { act, waitFor, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/tests/renderWithProviders';
import { EventContainer } from './EventsContainer';
import { initialValue } from '../../../redux/slices/eventSlice';
import { EventOnSave, SelectedEventOnDayView } from '../../../types/event';
import { Months } from '../../../types/calendar/enums';

const title = 'title';
const year = 2025;
const month = Months.FEBRUARY;
const day = 11;
const startDate = new Date(year, month, day);
const endDate = new Date(year, month, day);
const initialSelectedEvent: SelectedEventOnDayView = {
  event: {
    dayViewPosition: {
      endY: 0,
      startY: 0,
    },
    endDate,
    startDate,
    id: 'id',
    title,
  },
  top: 0,
};

const renderEventDetailsModal = (
  selectedDayViewEvent?: SelectedEventOnDayView,
) => {
  return renderWithProviders(<EventContainer />, {
    preloadedState: {
      eventSlice: {
        ...initialValue,
        currentState: {
          ...initialValue.currentState,
          selectedDayViewEvent,
        },
      },
    },
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
        const mouseDownEvent = new MouseEvent('mousedown', {
          clientY: positionY,
          bubbles: true,
        });
        const mouseMoveEvent = new MouseEvent('mousemove', {
          clientY: 49,
          bubbles: true,
        });
        const mouseUpEvent = new MouseEvent('mouseup', {
          clientY: 49,
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
        const eventDefaultTitle = '(No title)';
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
        const mouseDownEvent = new MouseEvent('mousedown', {
          clientY: positionY + 525,
          bubbles: true,
        });
        const mouseMoveEvent = new MouseEvent('mousemove', {
          clientY: positionY + 625,
          bubbles: true,
        });
        const mouseUpEvent = new MouseEvent('mouseup', {
          clientY: positionY + 625,
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
        const eventDefaultTitle = '(No title)';
        const eventTime = '10:30 AM – 12:45 PM';
        await waitFor(() => {
          expect(screen.getByText(eventDefaultTitle)).toBeInTheDocument();
          expect(screen.getByText(eventTime)).toBeInTheDocument();
        });
      }
    });
  });
  describe('When opening modal', () => {
    it('should not render modal if selected day view event is not defined', () => {
      renderEventDetailsModal();
      const event = screen.queryByText(title);
      expect(event).not.toBeInTheDocument();
    });
    it('should not render modal if selected event is not defined', () => {
      renderEventDetailsModal({
        ...initialSelectedEvent,
        event: undefined,
      });
      const event = screen.queryByText(title);
      expect(event).not.toBeInTheDocument();
    });
  });
});
