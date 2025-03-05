jest.mock("../../../features/Calendar/config", () => ({
  __esModule: true,
  config: {
    locale: "en-US",
    today: {
      day: 1,
      month: 0,
      year: 2025,
      time: 0,
      date: new Date(2025, 0, 1),
      monthNumberOfDays: 31,
    },
  },
}));

// it should be 0 to get december but it is getting november

import { screen } from "@testing-library/dom";
import CalendarCells from "./CalendarCells";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("CalendarCells", () => {
  /**  January, 2025
   * Note: Calendar starts on a Monday
   * Since January 1 is a Wednesday, December 30 and December 31
   * of 2024 should be displayed before January days.
   * All 31 days of January should be displayed.
   * Since January ends on a Friday, February 1 and 2 of 2025 should
   * be displayed after January days
   */

  it("should render days from previous month to fill calendar", () => {
    render(<CalendarCells />);
    const decemberDays = [30, 31];
    const januaryDays = Array.from(Array(31).keys(), (day) => day + 1);
    const februaryDays = [1, 2];
    let dayCell: HTMLElement;

    decemberDays.forEach((decemberDay) => {
      dayCell = screen.getByTitle(`${2024}-${12}-${decemberDay}`);
      expect(dayCell).toBeInTheDocument();
      expect(dayCell.textContent).toBe(decemberDay.toString());
    });

    januaryDays.forEach((januaryDay) => {
      dayCell = screen.getByTitle(`${2025}-${1}-${januaryDay}`);
      expect(dayCell).toBeInTheDocument();
      expect(dayCell.textContent).toBe(januaryDay.toString());
    });

    februaryDays.forEach((februaryDay) => {
      dayCell = screen.getByTitle(`${2025}-${2}-${februaryDay}`);
      expect(dayCell).toBeInTheDocument();
      expect(dayCell.textContent).toBe(februaryDay.toString());
    });
  });
});
