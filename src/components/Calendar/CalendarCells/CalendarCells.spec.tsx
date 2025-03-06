import { screen } from "@testing-library/dom";
import CalendarCells from "./CalendarCells";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Months } from "../../../utils/enums";
import { getUseDateMock } from "../../../utils/tests/mocks";

jest.mock("../../../hooks/useDate", () => ({
  __esModule: true,
  useDate: jest.fn(),
}));

describe("CalendarCells", () => {
  /**  January, 2025
   * Note: Calendar starts on a Monday
   * Since January 1 is a Wednesday, December 30 and December 31
   * of 2024 should be displayed before January days.
   * All 31 days of January should be displayed.
   * Since January ends on a Friday, February 1 and 2 of 2025 should
   * be displayed after January days
   */

  describe("First month of the year", () => {
    beforeEach(() => {
      const mockUseDate = getUseDateMock(2025, Months.JANUARY, 1, 31);

      render(<CalendarCells dateConfig={mockUseDate} />);
    });

    it("should render days from previous month to fill calendar", () => {
      const decemberDays = [30, 31];

      decemberDays.forEach((decemberDay) => {
        const dayCell = screen.getByTitle(`${2024}-${12}-${decemberDay}`);
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(decemberDay.toString());
      });
    });

    it("should render days from current month to fill calendar", () => {
      const januaryDays = Array.from(Array(31).keys(), (day) => day + 1);

      januaryDays.forEach((januaryDay) => {
        const dayCell = screen.getByTitle(`${2025}-${1}-${januaryDay}`);
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(januaryDay.toString());
      });
    });

    it("should render days from next month to fill calendar", () => {
      const februaryDays = [1, 2];

      februaryDays.forEach((februaryDay) => {
        const dayCell = screen.getByTitle(`${2025}-${2}-${februaryDay}`);
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(februaryDay.toString());
      });
    });
  });
});
