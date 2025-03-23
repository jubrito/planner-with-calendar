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

  it("should render attribution link with security attributes", () => {
    const attributionLinkLabel =
      "Go to Juliana Witzke de Brito's LinkedIn page";
    const attributionLinkElement = screen.getByRole("link", {
      name: attributionLinkLabel,
    });
    expect(attributionLinkElement).toBeInTheDocument();
    expect(attributionLinkElement).toHaveProperty("rel", "noopener noreferrer");
  });
});
