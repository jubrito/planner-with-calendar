import "@testing-library/jest-dom";
import { screen } from "@testing-library/dom";
import { initialValue } from "../../redux/slices/dateSlice";
import { Months } from "../../types/calendar/enums";
import { renderWithProviders } from "../../utils/tests/renderWithProviders";
import Planner from "./Planner";

describe("Planner", () => {
  const currentYear = 2025;
  describe("Header", () => {
    it("should render header initial date text", () => {
      renderWithProviders(<Planner />, {
        preloadedState: {
          dateSlice: {
            initialState: {
              ...initialValue.initialState,
              date: new Date(currentYear, Months.MARCH, 1).toDateString(),
            },
            currentState: {
              ...initialValue.currentState,
            },
          },
        },
      });
      expect(screen.getByText("Mar 1, Saturday")).toBeInTheDocument();
    });
  });
});
