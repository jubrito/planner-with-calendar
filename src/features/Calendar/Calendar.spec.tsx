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
import Calendar from './Calendar';
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
      renderWithProviders(<Calendar />, {
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
      expect(screen.getByLabelText('Go to previous year')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to previous month')).toBeInTheDocument();
      expect(screen.getByText('Today'));
      expect(screen.getByLabelText('Go to next month')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to next year')).toBeInTheDocument();
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
      const { store } = renderWithProviders(<Calendar />, {
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
        `Open Feb ${cellDay} of ${cellYear} day view`,
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
  });
});
