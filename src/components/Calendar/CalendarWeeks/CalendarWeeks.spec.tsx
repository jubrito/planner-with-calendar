import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CalendarWeeks from "./CalendarWeeks";
import { getWeekDaysNames } from "../../../utils/week";

describe("CalendarWeeks", () => {
  it("should render calendar week labels abbreviated", () => {
    render(<CalendarWeeks />);
    getWeekDaysNames("en-US").forEach((weekDay) => {
      expect(
        screen.getByRole("columnheader", { name: weekDay.long })
      ).toBeInTheDocument();
    });
  });
});
