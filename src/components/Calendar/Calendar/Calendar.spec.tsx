import { initialValue } from '../../../redux/slices/dateSlice';
import {
  getFormattedDateString,
  getMonthName,
} from '../../../utils/calendar/utils';
import { getWeekDaysNames } from '../../../utils/calendar/weeks';
import { renderWithProviders } from '../../../utils/tests/renderWithProviders';
import { Calendar } from './Calendar';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { IntlDateTimeFormatShort } from '../../../utils/constants';
import { Months } from '../../../types/calendar/enums';

describe('Calendar', () => {
  const onCellClick = jest.fn();
  const englishLocale = 'en-us';
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const ISODate = getFormattedDateString(englishLocale, date);

  it('should render weeks', () => {
    renderWithProviders(<Calendar onCellClick={onCellClick} />, {
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
    const weekDays = getWeekDaysNames(englishLocale);
    weekDays.forEach((weekDay) => {
      expect(screen.getByText(weekDay.short)).toBeInTheDocument();
    });
  });

  it('should render calendar based on year and month provided', () => {
    const defaultYear = 1999;
    const defaultMonth = Months.FEBRUARY;
    renderWithProviders(
      <Calendar
        onCellClick={onCellClick}
        defaultYear={defaultYear}
        defaultMonth={defaultMonth}
      />,
      {
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
      },
    );
    expect(screen.getAllByLabelText('Feb 13 of 1999')).toBeInTheDocument();
  });

  it('should call onCell click function when clicking on a cell', async () => {
    renderWithProviders(<Calendar onCellClick={onCellClick} />, {
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
    const cell = screen.getByLabelText(
      `${getMonthName(englishLocale, date, IntlDateTimeFormatShort)} ${day} of ${year}`,
    );
    const monthNotZeroIndexed = month + 1;
    await userEvent.click(cell);
    expect(onCellClick).toHaveBeenCalledWith(year, monthNotZeroIndexed, day);
  });
});
