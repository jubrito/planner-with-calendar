import { renderWithProviders } from '../../../../utils/tests/renderWithProviders';
import { initialValue as initialDateValue } from '../../../../redux/slices/dateSlice';
import { initialValue as initialLocaleValue } from '../../../../redux/slices/localeSlice';
import { Months } from '../../../../types/calendar/enums';
import {
  getDateISOString,
  getDayOfWeek,
  getMonthName,
} from '../../../../utils/calendar/utils';
import { LocaleLanguage } from '../../../../types/locale/types';
import { IntlDateTimeFormatShort } from '../../../../utils/constants';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { Header } from './Header';

describe('Header', () => {
  const currentYear = 2025;
  const currentMonth = Months.DECEMBER;
  const currentDay = 1;
  const brLocale = 'pt-BR';
  const enEsLocale = 'en-US';

  const renderHeader = ({ locale }: { locale?: LocaleLanguage }) => {
    return renderWithProviders(<Header />, {
      preloadedState: {
        dateSlice: {
          ...initialDateValue,
          currentState: {
            ...initialDateValue.currentState,
            dayViewISODate: getDateISOString(
              new Date(currentYear, currentMonth, currentDay),
            ),
            globalISODate: getDateISOString(
              new Date(currentYear, currentMonth, currentDay),
            ),
          },
        },
        localeSlice: {
          ...initialLocaleValue,
          currentState: {
            ...initialLocaleValue.currentState,
            locale: {
              ...initialLocaleValue.currentState.locale,
              lang: locale || enEsLocale,
            },
          },
        },
      },
    });
  };

  it('should render header initial date text in English', () => {
    renderHeader({});
    const date = new Date(currentYear, currentMonth, currentDay);
    const dayOfWeek = getDayOfWeek(enEsLocale, date);
    const monthName = getMonthName(enEsLocale, date, IntlDateTimeFormatShort);
    const plannerDateLabel = `${monthName} ${currentDay}, ${dayOfWeek}`;
    const plannerDateLabelElement = screen.getByText(plannerDateLabel);
    expect(plannerDateLabelElement).toBeInTheDocument();
    expect(screen.getByText('Dec 1, Monday')).toBeInTheDocument();
  });
  it('should render header initial date text in Portuguese', () => {
    renderHeader({ locale: brLocale });
    const date = new Date(currentYear, currentMonth, currentDay);
    const dayOfWeek = getDayOfWeek(brLocale, date);
    const monthName = getMonthName(brLocale, date, IntlDateTimeFormatShort);
    const plannerDateLabel = `${monthName} ${currentDay}, ${dayOfWeek}`;
    const plannerDateLabelElement = screen.getByText(plannerDateLabel);
    expect(plannerDateLabelElement).toBeInTheDocument();
    expect(screen.getByText('Dez 1, Segunda-feira')).toBeInTheDocument();
  });

  it('should render button to create calendar', () => {
    renderHeader({});
    screen.debug();
    expect(
      screen.getByRole('button', { name: 'Create event' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Create event')).toBeInTheDocument();
  });
});
