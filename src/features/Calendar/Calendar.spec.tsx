import {
  getFormattedDateString,
  getMonthName,
} from '../../utils/calendar/utils';
import { getWeekDaysNames } from '../../utils/calendar/weeks';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { renderWithProviders } from '../../utils/tests/renderWithProviders';
import Calendar from './Calendar';
import { initialValue } from '../../redux/slices/dateSlice';

describe('Calendar', () => {
  const englishLocale = 'en-us';
  const date = new Date();
  const year = date.getFullYear();
  const ISODate = getFormattedDateString(englishLocale, date);

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
