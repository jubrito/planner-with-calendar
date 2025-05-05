import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Months } from '../../../../types/calendar/enums';
import { renderWithProviders } from '../../../../utils/tests/renderWithProviders';
import { initialValue } from '../../../../redux/slices/dateSlice';
import { AppStore } from '../../../../redux/store';
import { CalendarMenu } from './CalendarMenu';
import { getDateISOString } from '../../../../utils/calendar/utils';

describe('CalendarMenu', () => {
  describe('Changing calendar dates', () => {
    let reduxStore: AppStore;
    const year = 2025;
    const goToPreviousYearLabel = 'Go to previous year';
    const goToPreviousMonthLabel = 'Go to previous month';
    const goToNextMonthLabel = 'Go to next month';
    const goToNextYearLabel = 'Go to next year';
    const goToTodayLabel = 'Go to today';

    describe('January', () => {
      beforeEach(() => {
        const { store } = renderWithProviders(<CalendarMenu />, {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalISODate: getDateISOString(
                  new Date(year, Months.JANUARY, 1),
                ),
              },
              initialState: {
                ...initialValue.initialState,
                globalISODate: getDateISOString(
                  new Date(year, Months.JANUARY, 1),
                ),
              },
            },
          },
        });
        reduxStore = store;
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      it('should render buttons to enable changing calendar dates', () => {
        const goToPreviousYearButton = screen.getByRole('button', {
          name: goToPreviousYearLabel,
        });
        const goToPreviousMonthButton = screen.getByRole('button', {
          name: goToPreviousMonthLabel,
        });
        const goToNextMonthButton = screen.getByRole('button', {
          name: goToNextMonthLabel,
        });
        const goToNextYearButton = screen.getByRole('button', {
          name: goToNextYearLabel,
        });

        expect(goToPreviousYearButton).toBeInTheDocument();
        expect(goToPreviousMonthButton).toBeInTheDocument();
        expect(goToNextMonthButton).toBeInTheDocument();
        expect(goToNextYearButton).toBeInTheDocument();
      });

      it('should go to previous month (December) when in January after clicking on button', async () => {
        const goToPreviousMonthButton = screen.getByRole('button', {
          name: goToPreviousMonthLabel,
        });
        let reduxCurrentState = reduxStore.getState().dateSlice.currentState;

        expect(new Date(reduxCurrentState.globalISODate).getMonth()).toBe(
          Months.JANUARY,
        );

        await userEvent.click(goToPreviousMonthButton);
        reduxCurrentState = reduxStore.getState().dateSlice.currentState;

        await waitFor(() => {
          expect(new Date(reduxCurrentState.globalISODate).getMonth()).toBe(
            Months.DECEMBER,
          );
        });
      });

      it('should go to next month (February) when in January after clicking on button', async () => {
        const goToNextMonthButton = screen.getByRole('button', {
          name: goToNextMonthLabel,
        });
        let reduxCurrentState = reduxStore.getState().dateSlice.currentState;

        expect(new Date(reduxCurrentState.globalISODate).getMonth()).toBe(
          Months.JANUARY,
        );

        await userEvent.click(goToNextMonthButton);
        reduxCurrentState = reduxStore.getState().dateSlice.currentState;

        await waitFor(() => {
          expect(new Date(reduxCurrentState.globalISODate).getMonth()).toBe(
            Months.FEBRUARY,
          );
        });
      });

      it('should go to previous year (2024) when in 2025 after clicking on button', async () => {
        const goToPreviousYearButton = screen.getByRole('button', {
          name: goToPreviousYearLabel,
        });
        let reduxCurrentState = reduxStore.getState().dateSlice.currentState;

        expect(new Date(reduxCurrentState.globalISODate).getFullYear()).toBe(
          year,
        );

        await userEvent.click(goToPreviousYearButton);
        reduxCurrentState = reduxStore.getState().dateSlice.currentState;

        await waitFor(() => {
          expect(new Date(reduxCurrentState.globalISODate).getFullYear()).toBe(
            year - 1,
          );
        });
      });

      it('should go to next year (2026) when in 2025 after clicking on button', async () => {
        const goToNextYearButton = screen.getByRole('button', {
          name: goToNextYearLabel,
        });
        let reduxCurrentState = reduxStore.getState().dateSlice.currentState;

        expect(new Date(reduxCurrentState.globalISODate).getFullYear()).toBe(
          year,
        );

        await userEvent.click(goToNextYearButton);
        reduxCurrentState = reduxStore.getState().dateSlice.currentState;

        await waitFor(() => {
          expect(new Date(reduxCurrentState.globalISODate).getFullYear()).toBe(
            year + 1,
          );
        });
      });

      it("should go back to today's date after clicking on 'today' button", async () => {
        const goToNextYearButton = screen.getByRole('button', {
          name: goToNextYearLabel,
        });
        const goToTodayButton = screen.getByRole('button', {
          name: goToTodayLabel,
        });
        let reduxCurrentState = reduxStore.getState().dateSlice.currentState;

        expect(new Date(reduxCurrentState.globalISODate).getFullYear()).toBe(
          year,
        );

        await userEvent.click(goToNextYearButton);
        reduxCurrentState = reduxStore.getState().dateSlice.currentState;

        await waitFor(() => {
          expect(new Date(reduxCurrentState.globalISODate).getFullYear()).toBe(
            year + 1,
          );
        });

        await userEvent.click(goToTodayButton);
        reduxCurrentState = reduxStore.getState().dateSlice.currentState;

        await waitFor(() => {
          expect(new Date(reduxCurrentState.globalISODate).getFullYear()).toBe(
            year,
          );
        });
      });
    });

    describe('December', () => {
      beforeEach(() => {
        const { store } = renderWithProviders(<CalendarMenu />, {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalISODate: getDateISOString(
                  new Date(year, Months.DECEMBER, 1),
                ),
              },
              initialState: {
                ...initialValue.initialState,
                globalISODate: getDateISOString(
                  new Date(year, Months.DECEMBER, 1),
                ),
              },
            },
          },
        });
        reduxStore = store;
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('should go to next month (January) when in December after clicking on button', async () => {
        let reduxCurrentState = reduxStore.getState().dateSlice.currentState;
        expect(new Date(reduxCurrentState.globalISODate).getMonth()).toBe(
          Months.DECEMBER,
        );
        const goToNextMonthButton = screen.getByRole('button', {
          name: goToNextMonthLabel,
        });
        await userEvent.click(goToNextMonthButton);
        reduxCurrentState = reduxStore.getState().dateSlice.currentState;
        await waitFor(() => {
          expect(new Date(reduxCurrentState.globalISODate).getMonth()).toBe(
            Months.JANUARY,
          );
        });
      });
      it("should go back to today's date after clicking on 'today' button", async () => {
        const goToNextMonthButton = screen.getByRole('button', {
          name: goToNextMonthLabel,
        });
        const goToTodayButton = screen.getByRole('button', {
          name: goToTodayLabel,
        });
        let reduxCurrentState = reduxStore.getState().dateSlice.currentState;

        expect(new Date(reduxCurrentState.globalISODate).getMonth()).toBe(
          Months.DECEMBER,
        );

        await userEvent.click(goToNextMonthButton);
        reduxCurrentState = reduxStore.getState().dateSlice.currentState;

        await waitFor(() => {
          expect(new Date(reduxCurrentState.globalISODate).getMonth()).toBe(
            Months.JANUARY,
          );
        });

        await userEvent.click(goToTodayButton);
        reduxCurrentState = reduxStore.getState().dateSlice.currentState;

        await waitFor(() => {
          expect(new Date(reduxCurrentState.globalISODate).getMonth()).toBe(
            new Date().getMonth(),
          );
        });
      });
    });
  });
});
