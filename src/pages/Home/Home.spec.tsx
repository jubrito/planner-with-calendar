global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  takeRecords: jest.fn(() => []),
}));

import { initialValue } from '../../redux/slices/dateSlice';
import { Months } from '../../types/calendar/enums';
import {
  getFormattedDateString,
  getMonthName,
} from '../../utils/calendar/utils';
import { getWeekDaysNames } from '../../utils/calendar/weeks';
import { renderWithProviders } from '../../utils/tests/renderWithProviders';
import Home from './Home';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';

describe('Home', () => {
  it('should render calendar', () => {
    const englishLocale = 'en-US';
    const year = 2025;
    const month = Months.FEBRUARY;
    const day = 11;
    const date = new Date(year, month, day);
    const currentMonthName = getMonthName(englishLocale, date);
    const globalISODate = getFormattedDateString(englishLocale, date);
    const weekDays = getWeekDaysNames(englishLocale);

    renderWithProviders(<Home />, {
      preloadedState: {
        dateSlice: {
          ...initialValue,
          currentState: {
            ...initialValue.currentState,
            globalISODate,
          },
        },
      },
    });
    expect(
      screen.getByText(`${currentMonthName}, ${year}`),
    ).toBeInTheDocument();
    weekDays.forEach((weekDay) => {
      expect(screen.getByText(weekDay.short)).toBeInTheDocument();
    });
  });
});
