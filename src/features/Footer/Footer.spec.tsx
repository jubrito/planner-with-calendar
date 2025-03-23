import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import Footer from "./Footer";
import "@testing-library/jest-dom";

describe("Footer", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it("should render footer attribution text", () => {
    const designedAndDevelopedByText = "Designed and developed by";
    const designedAndDevelopedByElement = screen.getByText(
      designedAndDevelopedByText
    );
    expect(designedAndDevelopedByElement).toBeInTheDocument();
  });
});
