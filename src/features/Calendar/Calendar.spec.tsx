import { render } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import Calendar from "./Calendar";
import { useDate } from "../../hooks/useDate";
import "@testing-library/jest-dom";
import { Months, MonthsNames } from "../../types/calendar/enums";
import { getFullDateTitle } from "../../utils/calendar/utils";

jest.mock("../../hooks/useDate", () => ({
  __esModule: true,
  useDate: jest.fn(),
}));
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
      (useDate as jest.Mock).mockReturnValue({
        date: new Date(year, Months.JANUARY, 1), // January 1, 2025
        updateDate: jest.fn(),
        day: 1,
        month: Months.JANUARY, // January (zero-indexed)
        year: year,
        time: new Date(year, Months.JANUARY, 1).getTime(),
        monthNumberOfDays: 31, // January has 31 days
      });
      render(<Calendar />);
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
    const year = 2025;
    const goToPreviousYearLabel = "Go to previous year";
    const goToPreviousMonthLabel = "Go to previous month";
    const goToNextMonthLabel = "Go to next month";
    const goToNextYearLabel = "Go to next year";
    const updateDateMock = jest.fn();
    beforeEach(() => {
      (useDate as jest.Mock).mockReturnValue({
        date: new Date(year, Months.JANUARY, 1),
        updateDate: updateDateMock,
        day: 1,
        month: Months.JANUARY,
        year: year,
        time: new Date(year, Months.JANUARY, 1).getTime(),
        monthNumberOfDays: 31,
      });
      render(<Calendar />);
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

    it("should move to previous month (December) when in January after clicking on button", async () => {
      const goToPreviousMonthButton = screen.getByRole("button", {
        name: goToPreviousMonthLabel,
      });
      await userEvent.click(goToPreviousMonthButton);
      expect(updateDateMock).toHaveBeenCalledTimes(1);
      expect(updateDateMock).toHaveBeenCalledWith(year - 1, Months.DECEMBER, 1);
    });
  });
});
