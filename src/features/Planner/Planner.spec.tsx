global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  takeRecords: jest.fn(() => []),
}));

import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { initialValue as initialDateValue } from '../../redux/slices/dateSlice';
import { initialValue as initialLocaleValue } from '../../redux/slices/localeSlice';
import { initialValue as initialEventValue } from '../../redux/slices/eventSlice';
import { Months } from '../../types/calendar/enums';
import { renderWithProviders } from '../../utils/tests/renderWithProviders';
import Planner from './Planner';
import {
  getDateISOString,
  getDayOfWeek,
  getFormattedDateString,
  getMonthName,
} from '../../utils/calendar/utils';
import { IntlDateTimeFormatShort } from '../../utils/constants';
import { LocaleLanguage } from '../../types/locale/types';
import { formatDateIDFromDate } from '../../utils/events/utils';
import { EventStored } from '../../types/event';

describe('Planner', () => {
  const currentYear = 2025;
  const currentMonth = Months.MARCH;
  const currentDay = 1;
  const brLocale = 'pt-BR';
  const enEsLocale = 'en-US';

  const renderPlanner = ({
    hour,
    minutes,
    locale,
    storeEvents,
  }: {
    hour: number;
    minutes: number;
    locale?: LocaleLanguage;
    storeEvents?: {
      ISODate: string;
      events: EventStored[];
    };
  }) => {
    const lang = locale || 'en-US';
    const date = new Date();
    const ISODate = storeEvents?.ISODate || getFormattedDateString(lang, date);

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
              lang,
            },
          },
        },
        eventSlice: {
          ...initialEventValue,
          currentState: {
            ...(initialEventValue.currentState.eventsByDates = {}),
            eventsByDates: {
              [formatDateIDFromDate(ISODate)]: {
                events: storeEvents?.events || [],
              },
            },
          },
        },
      },
    });
  };

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
  });

  describe('Rendering', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('should display current hour if it is today', () => {
      const hour = 12;
      const minutes = 12;
      jest.setSystemTime(
        new Date(currentYear, currentMonth, currentDay, hour, minutes),
      );
      renderPlanner({ hour, minutes });
      const time = '12:12';
      const timeElement = screen.getByText(time);
      expect(timeElement).toBeInTheDocument();
    });

    it('should not display current hour if it is not today', () => {
      const hour = 12;
      const minutes = 12;
      jest.setSystemTime(
        new Date(2011, currentMonth, currentDay, hour, minutes),
      );
      renderPlanner({ hour, minutes });
      const time = '12:12';
      const timeElement = screen.queryByText(time);
      expect(timeElement).not.toBeInTheDocument();
    });
  });

  describe('Current hour display', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    describe('When is 12-clock system', () => {
      it('should correctly display current hour (11:59) for hour 11', () => {
        const hour = 11;
        const minutes = 11;
        jest.setSystemTime(
          new Date(currentYear, currentMonth, currentDay, hour, minutes),
        );
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
        jest.setSystemTime(
          new Date(currentYear, currentMonth, currentDay, hour, minutes),
        );
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
        jest.setSystemTime(
          new Date(currentYear, currentMonth, currentDay, hour, minutes),
        );
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
        jest.setSystemTime(
          new Date(currentYear, currentMonth, currentDay, hour, minutes),
        );
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
        jest.setSystemTime(
          new Date(currentYear, currentMonth, currentDay, hour, minutes),
        );
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
        jest.setSystemTime(
          new Date(currentYear, currentMonth, currentDay, hour, minutes),
        );
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
        jest.setSystemTime(
          new Date(currentYear, currentMonth, currentDay, hour, minutes),
        );
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
        jest.setSystemTime(
          new Date(currentYear, currentMonth, currentDay, hour, minutes),
        );
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
        jest.setSystemTime(
          new Date(currentYear, currentMonth, currentDay, hour, minutes),
        );
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
        jest.setSystemTime(
          new Date(currentYear, currentMonth, currentDay, hour, minutes),
        );
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
    describe('should only display events of selected day on planner', () => {
      const hour = 0;
      const minutes = 0;
      const someOtherDate = new Date(0);
      renderPlanner({ hour, minutes });
      jest.setSystemTime(someOtherDate);
      expect(screen.queryByText);
      jest.setSystemTime(
        new Date(currentYear, currentMonth, currentDay, hour, minutes),
      );
    });
  });
});
