import "@testing-library/jest-dom";
import { screen, within } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { Cell } from "./Cell";
import { Months } from "../../../../types/calendar/enums";
import {
  firstDayOfTheMonth,
  getFullDateTitle,
} from "../../../../utils/calendar/utils";
import { useDate } from "../../../../hooks/useDate";

const cellYear = 2025;
const cellDay = firstDayOfTheMonth;
const currentMonth = Months.JANUARY;
const localeMock = "en-US";

jest.mock("../../../../hooks/useDate", () => ({
  _esModule: true,
  useDate: jest.fn(),
}));

describe("Cell", () => {
  interface TestTableProps {
    cellMonth: Months;
  }
  const TestTable = ({ cellMonth }: TestTableProps) => (
    <table>
      <tbody>
        <tr>
          <Cell
            cellYear={cellYear}
            cellMonth={cellMonth}
            cellDay={cellDay}
            currentMonth={currentMonth}
          />
        </tr>
      </tbody>
    </table>
  );

  it("should render cell with correct elements when cell month equals current month", () => {
    (useDate as jest.Mock).mockReturnValue({
      date: new Date(cellYear, currentMonth, cellDay), // January 1, 2025
      updateDate: jest.fn(),
      day: cellDay,
      month: currentMonth, // January (zero-indexed)
      year: cellYear,
      time: 1,
      monthNumberOfDays: 31, // January has 31 days
    });
    render(<TestTable cellMonth={currentMonth} />);
    const tdElement = screen.getByRole("cell");
    const timeElement = within(tdElement).getByRole("time");
    const fullDate = `${cellYear}-${currentMonth}-${cellDay}`;
    const fullDateTitle = getFullDateTitle(
      cellYear,
      currentMonth - 1,
      cellDay,
      localeMock
    );

    screen.debug();
    expect(tdElement).toBeInTheDocument();
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveProperty("dateTime", fullDate);
    expect(timeElement).toHaveProperty("title", fullDateTitle);
    expect(timeElement).toHaveTextContent(cellDay.toString());
  });
  it("should render cell with correct elements when cell month is NOT equal to current month", () => {
    const nextMonth = Months.FEBRUARY;
    (useDate as jest.Mock).mockReturnValue({
      date: new Date(cellYear, currentMonth, cellDay),
      updateDate: jest.fn(),
      day: cellDay,
      month: currentMonth,
      year: cellYear,
      time: 1,
      monthNumberOfDays: 31,
    });
    render(<TestTable cellMonth={nextMonth} />);

    const tdElement = screen.getByRole("cell");
    const timeElement = within(tdElement).getByRole("time");
    const fullDate = `${cellYear}-${nextMonth}-${cellDay}`;
    const fullDateTitle = getFullDateTitle(
      cellYear,
      nextMonth - 1,
      cellDay,
      localeMock
    );

    expect(tdElement).toBeInTheDocument();
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveProperty("dateTime", fullDate);
    expect(timeElement).toHaveProperty("title", fullDateTitle);
    expect(timeElement).toHaveTextContent(cellDay.toString());
  });
});
