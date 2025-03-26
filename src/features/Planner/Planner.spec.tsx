import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { initialValue } from '../../redux/slices/dateSlice';
import { Months } from '../../types/calendar/enums';
import { renderWithProviders } from '../../utils/tests/renderWithProviders';
import Planner from './Planner';

describe('Planner', () => {
  const currentYear = 2025;
  describe('Header', () => {
    it('should render header initial date text', () => {
      renderWithProviders(<Planner />, {
        preloadedState: {
          dateSlice: {
            initialState: {
              ...initialValue.initialState,
              date: new Date(currentYear, Months.MARCH, 1).toDateString(),
            },
            currentState: {
              ...initialValue.currentState,
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
              ...initialValue.initialState,
              date: new Date(currentYear, Months.MARCH, 1).toDateString(),
            },
            currentState: {
              ...initialValue.currentState,
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
      hours.forEach((hour) => {
        expect(screen.getByText(hour)).toBeInTheDocument();
      });
      expect(screen.getAllByText('12 AM').length).toBe(2);
    });
  });
});
