import { screen } from "@testing-library/dom";
import CalendarCells from "./CalendarCells";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Months } from "../../../types/calendar/enums";
import { getUseDateMock } from "../../../utils/tests/mocks";

jest.mock("../../../hooks/useDate", () => ({
  __esModule: true,
  useDate: jest.fn(),
}));

describe("CalendarCells", () => {
  let currentMonthNumberOfDays = 31;
  let currentYear = 2025;

  /**  January, 2025
   * Note: Calendar starts on a Monday
   * Since January 1 is a Wednesday, December 30 and December 31
   * of 2024 should be displayed before January days.
   * All 31 days of January should be displayed.
   * Since January ends on a Friday, February 1 and 2 of 2025 should
   * be displayed after January days
   */

  describe("January", () => {
    beforeEach(() => {
      const mockUseDate = getUseDateMock(
        currentYear,
        Months.JANUARY,
        1,
        currentMonthNumberOfDays
      );
      render(<CalendarCells dateConfig={mockUseDate} />);
    });

    it("should render days from December (previous month) to fill calendar", () => {
      const decemberDays = [30, 31];

      decemberDays.forEach((decemberDay) => {
        const dayCell = screen.getByTitle(
          `${currentYear - 1}-${12}-${decemberDay}`
        );
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(decemberDay.toString());
      });
    });

    it("should render days from January (current month) to fill calendar", () => {
      const januaryDays = Array.from(
        Array(currentMonthNumberOfDays).keys(),
        (day) => day + 1
      );

      januaryDays.forEach((januaryDay) => {
        const dayCell = screen.getByTitle(`${currentYear}-${1}-${januaryDay}`);
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(januaryDay.toString());
      });
    });

    it("should render days from February (next month) to fill calendar", () => {
      const februaryDays = [1, 2];

      februaryDays.forEach((februaryDay) => {
        const dayCell = screen.getByTitle(`${currentYear}-${2}-${februaryDay}`);
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(februaryDay.toString());
      });
    });
  });
  describe("December", () => {
    beforeEach(() => {
      const mockUseDate = getUseDateMock(
        currentYear,
        Months.DECEMBER,
        1,
        currentMonthNumberOfDays
      );
      render(<CalendarCells dateConfig={mockUseDate} />);
    });

    it("should not render days from November (previous month) since December starts on a Monday (first column)", () => {
      const dayCell = screen.queryByTitle("2024-11-30");
      expect(dayCell).not.toBeInTheDocument();
    });

    it("should render days from December (current month) to fill calendar", () => {
      const decemberDays = Array.from(
        Array(currentMonthNumberOfDays).keys(),
        (day) => day + 1
      );

      decemberDays.forEach((decemberDay) => {
        const dayCell = screen.getByTitle(
          `${currentYear}-${12}-${decemberDay}`
        );
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(decemberDay.toString());
      });
    });

    it("should render days from January (next month) to fill calendar", () => {
      const januaryDays = [1, 2, 3, 4];

      januaryDays.forEach((januaryDay) => {
        const dayCell = screen.getByTitle(
          `${currentYear + 1}-${1}-${januaryDay}`
        );
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(januaryDay.toString());
      });
    });
  });
});
