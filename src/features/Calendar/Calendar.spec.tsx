import { screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import Calendar from "./Calendar";
import "@testing-library/jest-dom";
import { Months, MonthsNames } from "../../types/calendar/enums";
import { getFullDateTitle } from "../../utils/calendar/utils";
import { renderWithProviders } from "../../utils/tests/renderWithProviders";
import { initialValue } from "../../redux/slices/dateSlice";
import { AppStore } from "../../redux/store";

describe("Calendar", () => {
  const localeMock = "en-US";
  /**  January, 2025
   * Note: Calendar starts on a Monday
   * Since January 1 is a Wednesday, December 30 and December 31
   * of 2024 should be displayed before January days.
   * All 31 days of January should be displayed.
   * Since January ends on a Friday, February 1 and 2 of 2025 should
   * be displayed after January days
   */
  describe("January 2025", () => {
    const year = 2025;
    beforeEach(() => {
      renderWithProviders(<Calendar />, {
        preloadedState: {
          dateSlice: {
            currentState: {
              ...initialValue.currentState,
              date: new Date(year, Months.JANUARY, 1),
            },
            initialState: {
              ...initialValue.initialState,
            },
          },
        },
      });
    });

    it("should render January title with year 2025", () => {
      expect(screen.getByText(`${MonthsNames.JANUARY}, ${year}`));
    });

    it("should render January calendar with filled months from December and February", () => {
      const decemberDays = [30, 31];
      const januaryDays = Array.from(Array(31).keys(), (day) => day + 1);
      const februaryDays = [1, 2];

      decemberDays.forEach((decemberDay) => {
        const dayCell = screen.getByTitle(
          getFullDateTitle(year - 1, Months.DECEMBER, decemberDay, localeMock)
        );
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(decemberDay.toString());
      });

      januaryDays.forEach((januaryDay) => {
        const dayCell = screen.getByTitle(
          getFullDateTitle(year, Months.JANUARY, januaryDay, localeMock)
        );
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(januaryDay.toString());
      });

      februaryDays.forEach((februaryDay) => {
        const dayCell = screen.getByTitle(
          getFullDateTitle(year, Months.FEBRUARY, februaryDay, localeMock)
        );
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(februaryDay.toString());
      });
    });
  });

  describe("Changing calendar dates", () => {
    let reduxStore: AppStore;
    const year = 2025;
    const goToPreviousYearLabel = "Go to previous year";
    const goToPreviousMonthLabel = "Go to previous month";
    const goToNextMonthLabel = "Go to next month";
    const goToNextYearLabel = "Go to next year";

    describe("January", () => {
      beforeEach(() => {
        const { store } = renderWithProviders(<Calendar />, {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                date: new Date(year, Months.JANUARY, 1),
              },
              initialState: {
                ...initialValue.initialState,
                date: new Date(year, Months.JANUARY, 1),
              },
            },
          },
        });
        reduxStore = store;
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      it("should render buttons to enable changing calendar dates", () => {
        const goToPreviousYearButton = screen.getByRole("button", {
          name: goToPreviousYearLabel,
        });
        const goToPreviousMonthButton = screen.getByRole("button", {
          name: goToPreviousMonthLabel,
        });
        const goToNextMonthButton = screen.getByRole("button", {
          name: goToNextMonthLabel,
        });
        const goToNextYearButton = screen.getByRole("button", {
          name: goToNextYearLabel,
        });
        expect(goToPreviousYearButton).toBeInTheDocument();
        expect(goToPreviousMonthButton).toBeInTheDocument();
        expect(goToNextMonthButton).toBeInTheDocument();
        expect(goToNextYearButton).toBeInTheDocument();
      });

      it("should go to previous month (December) when in January after clicking on button", async () => {
        let reduxCurrentState = reduxStore.getState().dateSlice.currentState;
        expect(reduxCurrentState.date.getMonth()).toBe(Months.JANUARY);
        const goToPreviousMonthButton = screen.getByRole("button", {
          name: goToPreviousMonthLabel,
        });
        await userEvent.click(goToPreviousMonthButton);
        reduxCurrentState = reduxStore.getState().dateSlice.currentState;
        await waitFor(() => {
          expect(reduxCurrentState.date.getMonth()).toBe(Months.DECEMBER);
        });
      });

      it("should go to next month (February) when in January after clicking on button", async () => {
        let reduxCurrentState = reduxStore.getState().dateSlice.currentState;
        expect(reduxCurrentState.date.getMonth()).toBe(Months.JANUARY);
        const goToNextMonthButton = screen.getByRole("button", {
          name: goToNextMonthLabel,
        });
        await userEvent.click(goToNextMonthButton);
        reduxCurrentState = reduxStore.getState().dateSlice.currentState;
        await waitFor(() => {
          expect(reduxCurrentState.date.getMonth()).toBe(Months.FEBRUARY);
        });
      });

      it("should go to previous year (2024) when in 2025 after clicking on button", async () => {
        let reduxCurrentState = reduxStore.getState().dateSlice.currentState;
        expect(reduxCurrentState.date.getFullYear()).toBe(year);
        const goToPreviousYearButton = screen.getByRole("button", {
          name: goToPreviousYearLabel,
        });
        await userEvent.click(goToPreviousYearButton);
        reduxCurrentState = reduxStore.getState().dateSlice.currentState;
        await waitFor(() => {
          expect(reduxCurrentState.date.getFullYear()).toBe(year - 1);
        });
      });

      it("should go to next year (2026) when in 2025 after clicking on button", async () => {
        let reduxCurrentState = reduxStore.getState().dateSlice.currentState;
        expect(reduxCurrentState.date.getFullYear()).toBe(year);
        const goToNextYearButton = screen.getByRole("button", {
          name: goToNextYearLabel,
        });
        await userEvent.click(goToNextYearButton);
        reduxCurrentState = reduxStore.getState().dateSlice.currentState;
        await waitFor(() => {
          expect(reduxCurrentState.date.getFullYear()).toBe(year + 1);
        });
      });
    });

    describe("December", () => {
      beforeEach(() => {
        const { store } = renderWithProviders(<Calendar />, {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                date: new Date(year, Months.DECEMBER, 1),
              },
              initialState: {
                ...initialValue.initialState,
                date: new Date(year, Months.DECEMBER, 1),
              },
            },
          },
        });
        reduxStore = store;
      });
      it("should go to next month (January) when in December after clicking on button", async () => {
        let reduxCurrentState = reduxStore.getState().dateSlice.currentState;
        expect(reduxCurrentState.date.getMonth()).toBe(Months.DECEMBER);
        const goToNextMonthButton = screen.getByRole("button", {
          name: goToNextMonthLabel,
        });
        await userEvent.click(goToNextMonthButton);
        reduxCurrentState = reduxStore.getState().dateSlice.currentState;
        await waitFor(() => {
          expect(reduxCurrentState.date.getMonth()).toBe(Months.JANUARY);
        });
      });
    });
  });
});
