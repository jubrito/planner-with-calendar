import "@testing-library/jest-dom";
import { screen, within } from "@testing-library/dom";
import { Cell } from "./Cell";
import { Months } from "../../../../types/calendar/enums";
import { getFullDateTitle } from "../../../../utils/calendar/utils";
import { firstDayOfTheMonth } from "../../../../utils/calendar/constants";
import { renderWithProviders } from "../../../../utils/tests/renderWithProviders";
import { initialValue } from "../../../../redux/slices/dateSlice";

const cellYear = 2025;
const cellDay = firstDayOfTheMonth;
const currentMonth = Months.JANUARY;
const localeMock = "en-US";

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
    renderWithProviders(<TestTable cellMonth={currentMonth} />, {
      preloadedState: {
        dateSlice: {
          currentState: {
            ...initialValue.currentState,
            date: new Date(cellYear, currentMonth, cellDay).toDateString(),
          },
          initialState: {
            ...initialValue.initialState,
          },
        },
      },
    });
    const tdElement = screen.getByRole("cell");
    const timeElement = within(tdElement).getByRole("time");
    const fullDate = `${cellYear}-${currentMonth}-${cellDay}`;
    const fullDateTitle = getFullDateTitle(
      cellYear,
      currentMonth - 1,
      cellDay,
      localeMock
    );

    expect(tdElement).toBeInTheDocument();
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveProperty("dateTime", fullDate);
    expect(timeElement).toHaveProperty("title", fullDateTitle);
    expect(timeElement).toHaveTextContent(cellDay.toString());
  });
  it("should render cell with correct elements when cell month is NOT equal to current month", () => {
    const nextMonth = Months.FEBRUARY;
    renderWithProviders(<TestTable cellMonth={nextMonth} />, {
      preloadedState: {
        dateSlice: {
          currentState: {
            ...initialValue.currentState,
            date: new Date(cellYear, currentMonth, cellDay).toDateString(),
          },
          initialState: {
            ...initialValue.initialState,
          },
        },
      },
    });

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
