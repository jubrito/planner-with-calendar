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
    const currentMonthNumberOfDays = 31;
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
  describe("February", () => {
    const currentMonthNumberOfDays = 28;
    beforeEach(() => {
      const mockUseDate = getUseDateMock(
        currentYear,
        Months.FEBRUARY,
        1,
        currentMonthNumberOfDays
      );
      render(<CalendarCells dateConfig={mockUseDate} />);
    });

    it("should render days from January (previous month) to fill calendar", () => {
      const januaryDays = [27, 28, 29, 30, 31];

      januaryDays.forEach((januaryDay) => {
        const dayCell = screen.getByTitle(`${currentYear}-${1}-${januaryDay}`);
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(januaryDay.toString());
      });
    });

    it("should render days from February (current month) to fill calendar", () => {
      const februaryDays = Array.from(
        Array(currentMonthNumberOfDays).keys(),
        (day) => day + 1
      );

      februaryDays.forEach((februaryDay) => {
        const dayCell = screen.getByTitle(`${currentYear}-${2}-${februaryDay}`);
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(februaryDay.toString());
      });
    });

    it("should render days from March (next month) to fill calendar", () => {
      const marchDays = [1, 2];

      marchDays.forEach((marchDay) => {
        const dayCell = screen.getByTitle(`${currentYear}-${3}-${marchDay}`);
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(marchDay.toString());
      });
    });
  });
  describe("March", () => {
    const currentMonthNumberOfDays = 31;
    beforeEach(() => {
      const mockUseDate = getUseDateMock(
        currentYear,
        Months.MARCH,
        1,
        currentMonthNumberOfDays
      );
      render(<CalendarCells dateConfig={mockUseDate} />);
    });

    it("should render days from February (previous month) to fill calendar", () => {
      const februaryDays = [24, 25, 26, 27, 28];

      februaryDays.forEach((februaryDay) => {
        const dayCell = screen.getByTitle(`${currentYear}-${2}-${februaryDay}`);
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(februaryDay.toString());
      });
    });

    it("should render days from March (current month) to fill calendar", () => {
      const marchDays = Array.from(
        Array(currentMonthNumberOfDays).keys(),
        (day) => day + 1
      );

      marchDays.forEach((marchDay) => {
        const dayCell = screen.getByTitle(`${currentYear}-${3}-${marchDay}`);
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(marchDay.toString());
      });
    });

    it("should render days from April (next month) to fill calendar", () => {
      const aprilDays = [1, 2, 3, 4, 5, 6];

      aprilDays.forEach((aprilDay) => {
        const dayCell = screen.getByTitle(`${currentYear}-${4}-${aprilDay}`);
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(aprilDay.toString());
      });
    });
  });
  describe("April", () => {
    const currentMonthNumberOfDays = 30;
    beforeEach(() => {
      const mockUseDate = getUseDateMock(
        currentYear,
        Months.APRIL,
        1,
        currentMonthNumberOfDays
      );
      console.log("mockUseDate", mockUseDate);
      render(<CalendarCells dateConfig={mockUseDate} />);
    });

    it("should render days from March (previous month) to fill calendar", () => {
      const marchDays = [31];

      marchDays.forEach((marchDay) => {
        const dayCell = screen.getByTitle(`${currentYear}-${3}-${marchDay}`);
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(marchDay.toString());
      });
    });

    it("should render days from April (current month) to fill calendar", () => {
      const aprilDays = Array.from(
        Array(currentMonthNumberOfDays).keys(),
        (day) => day + 1
      );

      aprilDays.forEach((aprilDay) => {
        const dayCell = screen.getByTitle(`${currentYear}-${4}-${aprilDay}`);
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(aprilDay.toString());
      });
    });

    it("should render days from May (next month) to fill calendar", () => {
      const mayDays = [1, 2, 3, 4];

      mayDays.forEach((mayDay) => {
        const dayCell = screen.getByTitle(`${currentYear}-${5}-${mayDay}`);
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(mayDay.toString());
      });
    });
  });
  describe("May", () => {
    const currentMonthNumberOfDays = 31;
    beforeEach(() => {
      const mockUseDate = getUseDateMock(
        currentYear,
        Months.MAY,
        1,
        currentMonthNumberOfDays
      );
      render(<CalendarCells dateConfig={mockUseDate} />);
    });

    it("should render days from April (previous month) to fill calendar", () => {
      const aprilDays = [28, 29, 30];

      aprilDays.forEach((aprilDay) => {
        const dayCell = screen.getByTitle(`${currentYear}-${4}-${aprilDay}`);
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(aprilDay.toString());
      });
    });

    it("should render days from May (current month) to fill calendar", () => {
      const mayDays = Array.from(
        Array(currentMonthNumberOfDays).keys(),
        (day) => day + 1
      );
      mayDays.forEach((mayDay) => {
        const dayCell = screen.getByTitle(`${currentYear}-${5}-${mayDay}`);
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(mayDay.toString());
      });
    });

    it("should render days from June (next month) to fill calendar", () => {
      const juneDays = [1];

      juneDays.forEach((juneDay) => {
        const dayCell = screen.getByTitle(`${currentYear}-${6}-${juneDay}`);
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(juneDay.toString());
      });
    });
  });
  describe("June", () => {
    const currentMonthNumberOfDays = 30;
    beforeEach(() => {
      const mockUseDate = getUseDateMock(
        currentYear,
        Months.JUNE,
        1,
        currentMonthNumberOfDays
      );
      render(<CalendarCells dateConfig={mockUseDate} />);
    });

    it("should render days from May (previous month) to fill calendar", () => {
      const mayDays = [26, 27, 28, 29, 30, 31];

      mayDays.forEach((mayDay) => {
        const dayCell = screen.getByTitle(`${currentYear}-${5}-${mayDay}`);
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(mayDay.toString());
      });
    });

    it("should render days from June (current month) to fill calendar", () => {
      const juneDays = Array.from(
        Array(currentMonthNumberOfDays).keys(),
        (day) => day + 1
      );
      juneDays.forEach((juneDay) => {
        const dayCell = screen.getByTitle(`${currentYear}-${6}-${juneDay}`);
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(juneDay.toString());
      });
    });

    it("should render days from July (next month) to fill calendar", () => {
      const julyDays = [1, 2, 3, 4, 5, 6];

      julyDays.forEach((julyDay) => {
        const dayCell = screen.getByTitle(`${currentYear}-${7}-${julyDay}`);
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(julyDay.toString());
      });
    });
  });
  describe("July", () => {
    const currentMonthNumberOfDays = 31;
    beforeEach(() => {
      const mockUseDate = getUseDateMock(
        currentYear,
        Months.JULY,
        1,
        currentMonthNumberOfDays
      );
      render(<CalendarCells dateConfig={mockUseDate} />);
    });

    it("should render days from June (previous month) to fill calendar", () => {
      const juneDays = [30];

      juneDays.forEach((juneDay) => {
        const dayCell = screen.getByTitle(`${currentYear}-${6}-${juneDay}`);
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(juneDay.toString());
      });
    });

    it("should render days from July (current month) to fill calendar", () => {
      const julyDays = Array.from(
        Array(currentMonthNumberOfDays).keys(),
        (day) => day + 1
      );
      julyDays.forEach((julyDay) => {
        const dayCell = screen.getByTitle(`${currentYear}-${7}-${julyDay}`);
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(julyDay.toString());
      });
    });

    it("should render days from August (next month) to fill calendar", () => {
      const augustDays = [1, 2, 3];

      augustDays.forEach((augustDay) => {
        const dayCell = screen.getByTitle(`${currentYear}-${8}-${augustDay}`);
        expect(dayCell).toBeInTheDocument();
        expect(dayCell.textContent).toBe(augustDay.toString());
      });
    });
  });
  describe("December", () => {
    const currentMonthNumberOfDays = 31;
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
