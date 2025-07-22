const initialGlobalIntersectionObserver = global.IntersectionObserver;
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  takeRecords: jest.fn(() => []),
}));

import { initialValue } from '../../redux/slices/dateSlice';
import {
  getDayOfWeek,
  getFormattedDateString,
  getMonthName,
} from '../../utils/calendar/utils';
import { getWeekDaysNames } from '../../utils/calendar/weeks';
import { renderWithProviders } from '../../utils/tests/renderWithProviders';
import Home from './Home';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { IntlDateTimeFormatShort } from '../../utils/constants';

describe('Home', () => {
  const englishLocale = 'en-US';
  const date = new Date();
  const year = date.getFullYear();
  const day = date.getDate();
  const ISODate = getFormattedDateString(englishLocale, date);

  beforeEach(() => {
    renderWithProviders(<Home />, {
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

  afterAll(() => {
    global.IntersectionObserver = initialGlobalIntersectionObserver;
  });

  it('should render calendar', () => {
    const currentMonthName = getMonthName(englishLocale, date);
    const weekDays = getWeekDaysNames(englishLocale);

    expect(
      screen.getByText(`${currentMonthName}, ${year}`),
    ).toBeInTheDocument();
    weekDays.forEach((weekDay) => {
      expect(screen.getByText(weekDay.short)).toBeInTheDocument();
    });
    expect(screen.getByLabelText('Go to today')).toBeInTheDocument();
  });

  it('should render planner', () => {
    const monthName = getMonthName(
      englishLocale,
      date,
      IntlDateTimeFormatShort,
    );
    const currentDayOfTheWeek = getDayOfWeek(englishLocale, date);
    expect(
      screen.getByText(`${monthName} ${day}, ${currentDayOfTheWeek}`),
    ).toBeInTheDocument();
  });
});
