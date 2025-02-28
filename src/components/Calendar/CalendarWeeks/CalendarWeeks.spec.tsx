import "@testing-library/jest-dom";
import { weekDaysNames } from "../../../utils/constants";
import { render, screen } from "@testing-library/react";
import CalendarWeeks from "./CalendarWeeks";

describe("CalendarWeeks", () => {
  it("should render calendar week labels abbreviated", () => {
    render(<CalendarWeeks />);
    weekDaysNames().forEach((weekDay) => {
      expect(screen.getByText(weekDay.short)).toBeInTheDocument();
    });
  });
});
