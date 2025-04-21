import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { initialValue as initialDateValue } from '../../redux/slices/dateSlice';
import { initialValue as initialLocaleValue } from '../../redux/slices/localeSlice';
import { Months } from '../../types/calendar/enums';
import { renderWithProviders } from '../../utils/tests/renderWithProviders';
import Planner from './Planner';
import { getDayOfWeek, getMonthName } from '../../utils/calendar/utils';
import { IntlDateTimeFormatShort } from '../../utils/constants';

describe('Planner', () => {
  const currentYear = 2025;
  const currentMonth = Months.MARCH;
  const currentDay = 1;

  describe('Header', () => {
    it('should render header initial date text in English', () => {
      const enEsLocale = 'en-US';
      renderWithProviders(<Planner />, {
        preloadedState: {
          dateSlice: {
            initialState: {
              ...initialDateValue.initialState,
            },
            currentState: {
              ...initialDateValue.currentState,
              dayViewISODate: new Date(
                currentYear,
                currentMonth,
                1,
              ).toDateString(),
            },
          },
        },
      });
      const date = new Date(currentYear, currentMonth, currentDay);
      const dayOfWeek = getDayOfWeek(enEsLocale, date);
      const monthName = getMonthName(enEsLocale, date, IntlDateTimeFormatShort);
      const plannerDateLabel = `${monthName} ${currentDay}, ${dayOfWeek}`;
      const plannerDateLabelElement = screen.getByText(plannerDateLabel);
      expect(plannerDateLabelElement).toBeInTheDocument();
      expect(screen.getByText('Mar 1, Saturday')).toBeInTheDocument();
    });
    it('should render header initial date text in Portuguese', () => {
      const brLocale = 'pt-BR';
      renderWithProviders(<Planner />, {
        preloadedState: {
          dateSlice: {
            initialState: {
              ...initialDateValue.initialState,
            },
            currentState: {
              ...initialDateValue.currentState,
              dayViewISODate: new Date(
                currentYear,
                Months.MARCH,
                1,
              ).toDateString(),
            },
          },
          localeSlice: {
            ...initialLocaleValue,
            currentState: {
              locale: {
                lang: brLocale,
              },
            },
          },
        },
      });
      const date = new Date(currentYear, currentMonth, currentDay);
      const dayOfWeek = getDayOfWeek(brLocale, date);
      const monthName = getMonthName(brLocale, date, IntlDateTimeFormatShort);
      const plannerDateLabel = `${monthName} ${currentDay}, ${dayOfWeek}`;
      const plannerDateLabelElement = screen.getByText(plannerDateLabel);
      expect(plannerDateLabelElement).toBeInTheDocument();
      expect(screen.getByText('Mar. 1, Sábado')).toBeInTheDocument();
    });
  });
});
