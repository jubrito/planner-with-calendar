import { render, screen, within } from "@testing-library/react";
import { UpdateCalendarButton } from "./UpdateCalendarButton";
import "@testing-library/jest-dom";

describe("UpdateCalendarButton", () => {
  const updateDateMock = jest.fn();
  const labelMock = "label-mock";
  const symbolMock = "symbol-mock";
  render(
    <UpdateCalendarButton
      label={labelMock}
      symbol={symbolMock}
      updateDate={updateDateMock}
    />
  );
  it("should display symbol wrapped on button with label provided", () => {
    const buttonWithLabel = screen.getByRole("button", { name: labelMock });
    const symbol = within(buttonWithLabel).getByText(symbolMock);
    expect(buttonWithLabel).toBeInTheDocument();
    expect(symbol).toBeInTheDocument();
  });
});
