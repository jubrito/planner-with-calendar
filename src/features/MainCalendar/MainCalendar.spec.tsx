import {
  getDateISOString,
  getFormattedDateString,
  getMonthName,
} from '../../utils/calendar/utils';
import { initialValue as initialEventValue } from '../../redux/slices/eventSlice';
import { getWeekDaysNames } from '../../utils/calendar/weeks';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { renderWithProviders } from '../../utils/tests/renderWithProviders';
import MainCalendar from './MainCalendar';
import { initialValue } from '../../redux/slices/dateSlice';
import { Months } from '../../types/calendar/enums';
import { EventStored } from '../../types/event';
import userEvent from '@testing-library/user-event';

describe('Calendar', () => {
  const englishLocale = 'en-us';
  const date = new Date();
  const year = date.getFullYear();
  const ISODate = getFormattedDateString(englishLocale, date);

  describe('Rendering', () => {
    beforeEach(() => {
      renderWithProviders(<MainCalendar />, {
        preloadedState: {
          dateSlice: {
            ...initialValue,
            currentState: {
              ...initialValue.currentState,
              globalISODate: ISODate,
              dayViewISODate: ISODate,
            },
          },
        },
      });
    });

    it('should render calendar header', () => {
      const currentMonthName = getMonthName(englishLocale, date);
      const weekDays = getWeekDaysNames(englishLocale);

      expect(
        screen.getByText(`${currentMonthName}, ${year}`),
      ).toBeInTheDocument();
      weekDays.forEach((weekDay) => {
        expect(screen.getByText(weekDay.short)).toBeInTheDocument();
      });
    });

    it('should render weeks', () => {
      const weekDays = getWeekDaysNames(englishLocale);
      weekDays.forEach((weekDay) => {
        expect(screen.getByText(weekDay.short)).toBeInTheDocument();
      });
    });

    it('should render calendar actions', () => {
      expect(screen.getByLabelText('Previous year')).toBeInTheDocument();
      expect(screen.getByLabelText('Previous month')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to today'));
      expect(screen.getByLabelText('Next month')).toBeInTheDocument();
      expect(screen.getByLabelText('Next year')).toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    const cellYear = 2025;
    const cellDay = 1;
    const currentMonth = Months.JANUARY;

    it('should hide modal with event details when selecting a different date by clicking on a cell', async () => {
      const initialEvent: EventStored = {
        id: '',
        title: '',
        endDate: '',
        startDate: '',
      };
      const initialEventOnViewMode = {
        event: initialEvent,
        top: 101,
      };
      const { store } = renderWithProviders(<MainCalendar />, {
        preloadedState: {
          dateSlice: {
            ...initialValue,
            currentState: {
              ...initialValue.currentState,
              globalISODate: getDateISOString(
                new Date(cellYear, currentMonth, cellDay),
              ),
            },
          },
          eventSlice: {
            ...initialEventValue,
            currentState: {
              ...initialEventValue.currentState,
              eventOnViewMode: initialEventOnViewMode,
            },
          },
        },
      });
      const buttonElement = screen.getByLabelText(
        `Feb ${cellDay} of ${cellYear}`,
      );
      let eventOnViewMode =
        store.getState().eventSlice.currentState.eventOnViewMode;

      expect(eventOnViewMode?.top).toBe(initialEventOnViewMode.top);
      expect(eventOnViewMode?.event).toBe(initialEventOnViewMode.event);

      await userEvent.click(buttonElement);

      eventOnViewMode =
        store.getState().eventSlice.currentState.eventOnViewMode;

      expect(eventOnViewMode).toBeUndefined();
    });

    it('should change day view date when to update planner by clicking on cell', async () => {
      const initialDayViewISODate = getDateISOString(
        new Date(2025, Months.DECEMBER, 17),
      );
      const cellDate = getDateISOString(
        new Date(cellYear, currentMonth, cellDay),
      );
      const { store } = renderWithProviders(<MainCalendar />, {
        preloadedState: {
          dateSlice: {
            ...initialValue,
            currentState: {
              ...initialValue.currentState,
              globalISODate: cellDate,
              dayViewISODate: initialDayViewISODate,
            },
          },
        },
      });
      const buttonElement = screen.getByLabelText(
        `Jan ${cellDay} of ${cellYear}`,
      );
      const cellDateStored =
        store.getState().dateSlice.currentState.globalISODate;

      let dayViewISODate =
        store.getState().dateSlice.currentState.dayViewISODate;
      expect(dayViewISODate).toBe(initialDayViewISODate);

      await userEvent.click(buttonElement);

      dayViewISODate = store.getState().dateSlice.currentState.dayViewISODate;

      expect(dayViewISODate).toBe(cellDateStored);
    });
  });
});
