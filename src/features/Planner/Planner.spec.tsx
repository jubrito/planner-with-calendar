import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { initialValue as initialDateValue } from '../../redux/slices/dateSlice';
import { initialValue as initialLocaleValue } from '../../redux/slices/localeSlice';
import { Months } from '../../types/calendar/enums';
import { renderWithProviders } from '../../utils/tests/renderWithProviders';
import Planner from './Planner';
import {
  getDateISOString,
  getDayOfWeek,
  getMonthName,
} from '../../utils/calendar/utils';
import { IntlDateTimeFormatShort } from '../../utils/constants';
import { LocaleLanguage } from '../../types/locale/types';

describe('Planner', () => {
  const currentYear = 2025;
  const currentMonth = Months.MARCH;
  const currentDay = 1;

  const renderPlanner = ({
    hour,
    minutes,
    locale,
  }: {
    hour: number;
    minutes: number;
    locale?: LocaleLanguage;
  }) => {
    return renderWithProviders(<Planner />, {
      preloadedState: {
        dateSlice: {
          ...initialDateValue,
          currentState: {
            ...initialDateValue.currentState,
            dayViewISODate: getDateISOString(
              new Date(currentYear, currentMonth, currentDay, hour, minutes),
            ),
            globalISODate: getDateISOString(
              new Date(currentYear, currentMonth, currentDay, hour, minutes),
            ),
          },
        },
        localeSlice: {
          ...initialLocaleValue,
          currentState: {
            ...initialLocaleValue.currentState,
            locale: {
              ...initialLocaleValue.currentState.locale,
              lang: locale || 'en-US',
            },
          },
        },
      },
    });
  };

  const brLocale = 'pt-BR';
  const enEsLocale = 'en-US';

  describe('Header', () => {
    it('should render header initial date text in English', () => {
      renderPlanner({ hour: 1, minutes: 1 });
      const date = new Date(currentYear, currentMonth, currentDay);
      const dayOfWeek = getDayOfWeek(enEsLocale, date);
      const monthName = getMonthName(enEsLocale, date, IntlDateTimeFormatShort);
      const plannerDateLabel = `${monthName} ${currentDay}, ${dayOfWeek}`;
      const plannerDateLabelElement = screen.getByText(plannerDateLabel);
      expect(plannerDateLabelElement).toBeInTheDocument();
      expect(screen.getByText('Mar 1, Saturday')).toBeInTheDocument();
    });
    it('should render header initial date text in Portuguese', () => {
      renderPlanner({ hour: 1, minutes: 1, locale: brLocale });
      const date = new Date(currentYear, currentMonth, currentDay);
      const dayOfWeek = getDayOfWeek(brLocale, date);
      const monthName = getMonthName(brLocale, date, IntlDateTimeFormatShort);
      const plannerDateLabel = `${monthName} ${currentDay}, ${dayOfWeek}`;
      const plannerDateLabelElement = screen.getByText(plannerDateLabel);
      expect(plannerDateLabelElement).toBeInTheDocument();
      expect(screen.getByText('Mar 1, Sábado')).toBeInTheDocument();
    });
  });

  describe('Current hour display', () => {
    describe('When is 12-clock system', () => {
      it('should correctly display current hour (11:59) for hour 11', () => {
        const hour = 11;
        const minutes = 11;
        renderPlanner({ hour, minutes });
        const time = '11:11';
        const timeElement = screen.getByText(time);
        expect(timeElement).toBeInTheDocument();
        expect(timeElement).toHaveRole('time');
        expect(timeElement).toHaveProperty('dateTime', time);
      });
      it('should correctly display current hour (11:23) for hour 23', () => {
        const hour = 23;
        const minutes = 23;
        renderPlanner({ hour, minutes });
        const time = '11:23';
        const timeElement = screen.getByText(time);
        expect(timeElement).toBeInTheDocument();
        expect(timeElement).toHaveRole('time');
        expect(timeElement).toHaveProperty('dateTime', time);
      });
      it('should correctly display current hour (12:12) for hour 12', () => {
        const hour = 12;
        const minutes = 12;
        renderPlanner({ hour, minutes });
        const time = '12:12';
        const timeElement = screen.getByText(time);
        expect(timeElement).toBeInTheDocument();
        expect(timeElement).toHaveRole('time');
        expect(timeElement).toHaveProperty('dateTime', time);
      });
      it('should correctly display current hour (12:24) for hour 24', () => {
        const hour = 24;
        const minutes = 24;
        renderPlanner({ hour, minutes });
        const time = '12:24';
        const timeElement = screen.getByText(time);
        expect(timeElement).toBeInTheDocument();
        expect(timeElement).toHaveRole('time');
        expect(timeElement).toHaveProperty('dateTime', time);
      });
      it('should correctly display current hour (12:00) for hour 0', () => {
        const hour = 0;
        const minutes = 0;
        renderPlanner({ hour, minutes });
        const time = '12:00';
        const timeElement = screen.getByText(time);
        expect(timeElement).toBeInTheDocument();
        expect(timeElement).toHaveRole('time');
        expect(timeElement).toHaveProperty('dateTime', time);
      });
    });
    describe('When is 24-clock system', () => {
      it('should correctly display current hour (11:59) for hour 11', () => {
        const hour = 11;
        const minutes = 11;
        renderPlanner({ hour, minutes, locale: brLocale });
        const time = '11:11';
        const timeElement = screen.getByText(time);
        expect(timeElement).toBeInTheDocument();
        expect(timeElement).toHaveRole('time');
        expect(timeElement).toHaveProperty('dateTime', time);
      });
      it('should correctly display current hour (23:23) for hour 23', () => {
        const hour = 23;
        const minutes = 23;
        renderPlanner({ hour, minutes, locale: brLocale });
        const time = '23:23';
        const timeElement = screen.getByText(time);
        expect(timeElement).toBeInTheDocument();
        expect(timeElement).toHaveRole('time');
        expect(timeElement).toHaveProperty('dateTime', time);
      });
      it('should correctly display current hour (12:12) for hour 12', () => {
        const hour = 12;
        const minutes = 12;
        renderPlanner({ hour, minutes });
        const time = '12:12';
        const timeElement = screen.getByText(time);
        expect(timeElement).toBeInTheDocument();
        expect(timeElement).toHaveRole('time');
        expect(timeElement).toHaveProperty('dateTime', time);
      });
      it('should correctly display current hour (00:24) for hour 24', () => {
        const hour = 24;
        const minutes = 24;
        renderPlanner({ hour, minutes, locale: brLocale });
        const time = '00:24';
        const timeElement = screen.getByText(time);
        expect(timeElement).toBeInTheDocument();
        expect(timeElement).toHaveRole('time');
        expect(timeElement).toHaveProperty('dateTime', time);
      });
      it('should correctly display current hour (00:00) for hour 0', () => {
        const hour = 0;
        const minutes = 0;
        renderPlanner({ hour, minutes, locale: brLocale });
        const time = '00:00';
        const id = 'currentTime';
        const timeElement = screen.getByTestId(id);
        expect(timeElement).toBeInTheDocument();
        expect(timeElement).toHaveRole('time');
        expect(timeElement).toHaveProperty('dateTime', time);
        expect(timeElement).toHaveProperty('id', id);
      });
    });
  });
});
