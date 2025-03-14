import "@testing-library/jest-dom";

import { screen, within } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { Cell } from "./Cell";
import { Months } from "../../../../types/calendar/enums";
import { firstDayOfTheMonth } from "../../../../utils/calendar/current";

describe("Cell", () => {
  const cellYear = 2025;
  const cellMonth = Months.JANUARY;
  const cellDay = firstDayOfTheMonth;

  beforeEach(() => {
    const TestTable = () => (
      <table>
        <tbody>
          <tr>
            <Cell
              cellYear={cellYear}
              cellMonth={cellMonth}
              cellDay={cellDay}
              currentMonth={Months.JANUARY}
            />
          </tr>
        </tbody>
      </table>
    );
    const { rerender } = render(<TestTable />);
  });

  it("should render cell with correct elements", () => {
    const tdElement = screen.getByRole("cell");
    const timeElement = within(tdElement).getByRole("time");
    const fullDate = `${cellYear}-${cellMonth}-${cellDay}`;
    expect(tdElement).toBeInTheDocument();
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveProperty("dateTime", fullDate);
    expect(timeElement).toHaveProperty("title", fullDate);
    expect(timeElement).toHaveTextContent(cellDay.toString());
  });
});
