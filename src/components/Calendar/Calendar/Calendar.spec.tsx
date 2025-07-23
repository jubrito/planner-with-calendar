import { initialValue } from '../../../redux/slices/dateSlice';
import {
  getDateISOString,
  getFormattedDateString,
  getMonthName,
} from '../../../utils/calendar/utils';
import { getWeekDaysNames } from '../../../utils/calendar/weeks';
import { renderWithProviders } from '../../../utils/tests/renderWithProviders';
import { Calendar } from './Calendar';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { Months } from '../../../types/calendar/enums';
import { EventStored } from '../../../types/event';
import userEvent from '@testing-library/user-event';
import { initialValue as initialEventValue } from '../../../redux/slices/eventSlice';

describe('Calendar', () => {
  const onCellClick = jest.fn();
  describe('Rendering', () => {
    const englishLocale = 'en-us';
    const date = new Date();
    const year = date.getFullYear();
    const ISODate = getFormattedDateString(englishLocale, date);

    beforeEach(() => {
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
    });

    it('should render weeks', () => {
      const weekDays = getWeekDaysNames(englishLocale);
      weekDays.forEach((weekDay) => {
        expect(screen.getByText(weekDay.short)).toBeInTheDocument();
      });
    });
  });
});
