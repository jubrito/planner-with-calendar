import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import Footer from "./Footer";
import "@testing-library/jest-dom";

describe("Footer", () => {
  it("should render footer attribution with link", () => {
    render(<Footer />);
    const designedAndDevelopedByText = "Designed and developed by";
    const attributionLinkLabel =
      "Go to Juliana Witzke de Brito's LinkedIn page";
    const designedAndDevelopedByElement = screen.getByText(
      designedAndDevelopedByText
    );
    const attributionLinkElement = screen.getByRole("link", {
      name: attributionLinkLabel,
    });
    expect(designedAndDevelopedByElement).toBeInTheDocument();
    expect(attributionLinkElement).toBeInTheDocument();
  });
});
