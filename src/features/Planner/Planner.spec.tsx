import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { initialValue as initialDateValue } from '../../redux/slices/dateSlice';
import { initialValue as initialLocaleValue } from '../../redux/slices/localeSlice';
import { Months } from '../../types/calendar/enums';
import { renderWithProviders } from '../../utils/tests/renderWithProviders';
import Planner from './Planner';
import { getFullDateTitle } from '../../utils/calendar/utils';

describe('Planner', () => {
  const currentYear = 2025;
  const currentMonth = Months.MARCH;
  const currentDay = 1;

  describe('Header', () => {
    it('should render header initial date text', () => {
      renderWithProviders(<Planner />, {
        preloadedState: {
          dateSlice: {
            initialState: {
              ...initialDateValue.initialState,
              dateISO: new Date(currentYear, Months.MARCH, 1).toDateString(),
            },
            currentState: {
              ...initialDateValue.currentState,
            },
          },
        },
      });
      expect(screen.getByText('Mar 1, Saturday')).toBeInTheDocument();
    });
    it('should display AM/PM hours of the day when locale is english', () => {
      renderWithProviders(<Planner />, {
        preloadedState: {
          dateSlice: {
            initialState: {
              ...initialDateValue.initialState,
              dateISO: new Date(
                currentYear,
                currentMonth,
                currentDay,
              ).toDateString(),
            },
            currentState: {
              ...initialDateValue.currentState,
            },
          },
        },
      });
      const hours = [
        '01 AM',
        '02 AM',
        '03 AM',
        '04 AM',
        '05 AM',
        '06 AM',
        '07 AM',
        '08 AM',
        '09 AM',
        '10 AM',
        '11 AM',
        '12 PM',
        '01 PM',
        '02 PM',
        '03 PM',
        '04 PM',
        '05 PM',
        '06 PM',
        '07 PM',
        '08 PM',
        '09 PM',
        '10 PM',
        '11 PM',
      ];
      const midnight = '12 AM';
      hours.forEach((hour) => {
        expect(screen.getByText(hour)).toBeInTheDocument();
        expect(
          screen.getByLabelText(
            `${getFullDateTitle(currentYear, currentMonth, currentDay, 'en-ES')} ${hour}`,
          ),
        ).toBeInTheDocument();
      });
      expect(screen.getAllByText(midnight).length).toBe(2);
      expect(
        screen.getAllByLabelText(
          `${getFullDateTitle(currentYear, currentMonth, currentDay, 'en-ES')} ${midnight}`,
        ).length,
      ).toBe(2);
    });
    it('should display hours of the day using 24-hour notation when locale is portuguese', () => {
      renderWithProviders(<Planner />, {
        preloadedState: {
          dateSlice: {
            initialState: {
              ...initialDateValue.initialState,
              dateISO: new Date(
                currentYear,
                currentMonth,
                currentDay,
              ).toISOString(),
            },
            currentState: {
              ...initialDateValue.currentState,
            },
          },
          localeSlice: {
            currentState: {
              ...initialLocaleValue.currentState,
              locale: {
                lang: 'pt-BR',
              },
            },
            initialState: {
              ...initialLocaleValue.initialState,
            },
          },
        },
      });
      const hours = [
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
      ];
      const midnight = '00:00';
      hours.forEach((hour) => {
        expect(screen.getByText(hour)).toBeInTheDocument();
        expect(
          screen.getByLabelText(
            `${getFullDateTitle(currentYear, currentMonth, currentDay, 'pt-BR')} ${hour}`,
          ),
        ).toBeInTheDocument();
      });
      expect(screen.getAllByText(midnight).length).toBe(2);
      expect(
        screen.getAllByLabelText(
          `${getFullDateTitle(currentYear, currentMonth, currentDay, 'pt-BR')} ${midnight}`,
        ).length,
      ).toBe(2);
    });
  });
});
