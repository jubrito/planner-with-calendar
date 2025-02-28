import "@testing-library/jest-dom";
import { weekDaysWithAbbreviation } from "../../../utils/constants";
import { render, screen } from "@testing-library/react";
import CalendarWeeks from "./CalendarWeeks";

describe("CalendarWeeks", () => {
  it("should render calendar week labels abbreviated", () => {
    render(<CalendarWeeks />);
    weekDaysWithAbbreviation.forEach((weekDay) => {
      expect(screen.getByText(weekDay)).toBeInTheDocument();
    });
  });
});
