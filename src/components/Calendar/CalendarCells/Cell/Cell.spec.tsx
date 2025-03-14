import "@testing-library/jest-dom";
import { screen, within } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { Cell } from "./Cell";
import { Months } from "../../../../types/calendar/enums";
import { firstDayOfTheMonth } from "../../../../utils/calendar/utils";

describe("Cell", () => {
  const cellYear = 2025;
  const cellDay = firstDayOfTheMonth;
  const currentMonth = Months.JANUARY;

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
    render(<TestTable cellMonth={currentMonth} />);
    const tdElement = screen.getByRole("cell");
    const timeElement = within(tdElement).getByRole("time");
    const fullDate = `${cellYear}-${currentMonth}-${cellDay}`;
    expect(tdElement).toBeInTheDocument();
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveProperty("dateTime", fullDate);
    expect(timeElement).toHaveProperty("title", fullDate);
    expect(timeElement).toHaveTextContent(cellDay.toString());
  });
  it("should render cell with correct elements when cell month is NOT equal to current month", () => {
    render(<TestTable cellMonth={Months.FEBRUARY} />);
    const tdElement = screen.getByRole("cell");
    const timeElement = within(tdElement).getByRole("time");
    const fullDate = `${cellYear}-${Months.FEBRUARY}-${cellDay}`;
    expect(tdElement).toBeInTheDocument();
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveProperty("dateTime", fullDate);
    expect(timeElement).toHaveProperty("title", fullDate);
    expect(timeElement).toHaveTextContent(cellDay.toString());
  });
});
