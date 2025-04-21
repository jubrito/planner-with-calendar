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

  describe('Current hour display', () => {
    describe('When is 12-clock system', () => {
      it('should correctly display current hour (11:59) for hour 11', () => {
        const hour = 11;
        const minutes = 11;
        renderWithProviders(<Planner />, {
          preloadedState: {
            dateSlice: {
              ...initialDateValue,
              currentState: {
                ...initialDateValue.currentState,
                dayViewISODate: new Date(
                  currentYear,
                  currentMonth,
                  currentDay,
                  hour,
                  minutes,
                ).toISOString(),
                globalISODate: new Date(
                  currentYear,
                  currentMonth,
                  currentDay,
                  hour,
                  minutes,
                ).toISOString(),
              },
            },
          },
        });
        const time = '11:11';
        const timeElement = screen.getByText(time);
        expect(timeElement).toBeInTheDocument();
        expect(timeElement).toHaveRole('time');
        expect(timeElement).toHaveProperty('dateTime', time);
      });
      it('should correctly display current hour (11:23) for hour 23', () => {
        const hour = 23;
        const minutes = 23;
        renderWithProviders(<Planner />, {
          preloadedState: {
            dateSlice: {
              ...initialDateValue,
              currentState: {
                ...initialDateValue.currentState,
                dayViewISODate: new Date(
                  currentYear,
                  currentMonth,
                  currentDay,
                  hour,
                  minutes,
                ).toISOString(),
                globalISODate: new Date(
                  currentYear,
                  currentMonth,
                  currentDay,
                  hour,
                  minutes,
                ).toISOString(),
              },
            },
          },
        });
        const time = '11:23';
        const timeElement = screen.getByText(time);
        expect(timeElement).toBeInTheDocument();
        expect(timeElement).toHaveRole('time');
        expect(timeElement).toHaveProperty('dateTime', time);
      });
      it('should correctly display current hour (12:12) for hour 12', () => {
        const hour = 12;
        const minutes = 12;
        renderWithProviders(<Planner />, {
          preloadedState: {
            dateSlice: {
              ...initialDateValue,
              currentState: {
                ...initialDateValue.currentState,
                dayViewISODate: new Date(
                  currentYear,
                  currentMonth,
                  currentDay,
                  hour,
                  minutes,
                ).toISOString(),
                globalISODate: new Date(
                  currentYear,
                  currentMonth,
                  currentDay,
                  hour,
                  minutes,
                ).toISOString(),
              },
            },
          },
        });
        const time = '12:12';
        const timeElement = screen.getByText(time);
        expect(timeElement).toBeInTheDocument();
        expect(timeElement).toHaveRole('time');
        expect(timeElement).toHaveProperty('dateTime', time);
      });
      it('should correctly display current hour (12:24) for hour 24', () => {
        const hour = 24;
        const minutes = 24;
        renderWithProviders(<Planner />, {
          preloadedState: {
            dateSlice: {
              ...initialDateValue,
              currentState: {
                ...initialDateValue.currentState,
                dayViewISODate: new Date(
                  currentYear,
                  currentMonth,
                  currentDay,
                  hour,
                  minutes,
                ).toISOString(),
                globalISODate: new Date(
                  currentYear,
                  currentMonth,
                  currentDay,
                  hour,
                  minutes,
                ).toISOString(),
              },
            },
          },
        });
        const time = '12:24';
        const timeElement = screen.getByText(time);
        expect(timeElement).toBeInTheDocument();
        expect(timeElement).toHaveRole('time');
        expect(timeElement).toHaveProperty('dateTime', time);
      });
      it('should correctly display current hour (12:00) for hour 0', () => {
        const hour = 0;
        const minutes = 0;
        renderWithProviders(<Planner />, {
          preloadedState: {
            dateSlice: {
              ...initialDateValue,
              currentState: {
                ...initialDateValue.currentState,
                dayViewISODate: new Date(
                  currentYear,
                  currentMonth,
                  currentDay,
                  hour,
                  minutes,
                ).toISOString(),
                globalISODate: new Date(
                  currentYear,
                  currentMonth,
                  currentDay,
                  hour,
                  minutes,
                ).toISOString(),
              },
            },
          },
        });
        const time = '12:00';
        const timeElement = screen.getByText(time);
        expect(timeElement).toBeInTheDocument();
        expect(timeElement).toHaveRole('time');
        expect(timeElement).toHaveProperty('dateTime', time);
      });
    });
    describe('When is 24-clock system', () => {
      const ptBrLang = 'pt-BR';
      it('should correctly display current hour (11:59) for hour 11', () => {
        const hour = 11;
        const minutes = 11;
        renderWithProviders(<Planner />, {
          preloadedState: {
            dateSlice: {
              ...initialDateValue,
              currentState: {
                ...initialDateValue.currentState,
                dayViewISODate: new Date(
                  currentYear,
                  currentMonth,
                  currentDay,
                  hour,
                  minutes,
                ).toISOString(),
                globalISODate: new Date(
                  currentYear,
                  currentMonth,
                  currentDay,
                  hour,
                  minutes,
                ).toISOString(),
              },
            },
            localeSlice: {
              ...initialLocaleValue,
              currentState: {
                ...initialLocaleValue.currentState,
                locale: {
                  lang: ptBrLang,
                },
              },
            },
          },
        });
        const time = '11:11';
        const timeElement = screen.getByText(time);
        expect(timeElement).toBeInTheDocument();
        expect(timeElement).toHaveRole('time');
        expect(timeElement).toHaveProperty('dateTime', time);
      });
      it('should correctly display current hour (23:23) for hour 23', () => {
        const hour = 23;
        const minutes = 23;
        renderWithProviders(<Planner />, {
          preloadedState: {
            dateSlice: {
              ...initialDateValue,
              currentState: {
                ...initialDateValue.currentState,
                dayViewISODate: new Date(
                  currentYear,
                  currentMonth,
                  currentDay,
                  hour,
                  minutes,
                ).toISOString(),
                globalISODate: new Date(
                  currentYear,
                  currentMonth,
                  currentDay,
                  hour,
                  minutes,
                ).toISOString(),
              },
            },
            localeSlice: {
              ...initialLocaleValue,
              currentState: {
                ...initialLocaleValue.currentState,
                locale: {
                  lang: ptBrLang,
                },
              },
            },
          },
        });
        const time = '23:23';
        const timeElement = screen.getByText(time);
        expect(timeElement).toBeInTheDocument();
        expect(timeElement).toHaveRole('time');
        expect(timeElement).toHaveProperty('dateTime', time);
      });
      it('should correctly display current hour (12:12) for hour 12', () => {
        const hour = 12;
        const minutes = 12;
        renderWithProviders(<Planner />, {
          preloadedState: {
            dateSlice: {
              ...initialDateValue,
              currentState: {
                ...initialDateValue.currentState,
                dayViewISODate: new Date(
                  currentYear,
                  currentMonth,
                  currentDay,
                  hour,
                  minutes,
                ).toISOString(),
                globalISODate: new Date(
                  currentYear,
                  currentMonth,
                  currentDay,
                  hour,
                  minutes,
                ).toISOString(),
              },
            },
            localeSlice: {
              ...initialLocaleValue,
              currentState: {
                ...initialLocaleValue.currentState,
                locale: {
                  lang: ptBrLang,
                },
              },
            },
          },
        });
        const time = '12:12';
        const timeElement = screen.getByText(time);
        expect(timeElement).toBeInTheDocument();
        expect(timeElement).toHaveRole('time');
        expect(timeElement).toHaveProperty('dateTime', time);
      });
      it('should correctly display current hour (00:24) for hour 24', () => {
        const hour = 24;
        const minutes = 24;
        renderWithProviders(<Planner />, {
          preloadedState: {
            dateSlice: {
              ...initialDateValue,
              currentState: {
                ...initialDateValue.currentState,
                dayViewISODate: new Date(
                  currentYear,
                  currentMonth,
                  currentDay,
                  hour,
                  minutes,
                ).toISOString(),
                globalISODate: new Date(
                  currentYear,
                  currentMonth,
                  currentDay,
                  hour,
                  minutes,
                ).toISOString(),
              },
            },
            localeSlice: {
              ...initialLocaleValue,
              currentState: {
                ...initialLocaleValue.currentState,
                locale: {
                  lang: ptBrLang,
                },
              },
            },
          },
        });
        const time = '00:24';
        const timeElement = screen.getByText(time);
        expect(timeElement).toBeInTheDocument();
        expect(timeElement).toHaveRole('time');
        expect(timeElement).toHaveProperty('dateTime', time);
      });
    });
  });
});
