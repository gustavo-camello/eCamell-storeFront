import { MockedProvider } from "@apollo/react-testing";
import { render, screen } from "@testing-library/react";

import Cart from "../src/components/Cart/index";

describe("<Cart/>", () => {
  it("renders", () => {
    render(<Cart />);
  });

  it("matches snapshot", () => {
    const { container } = render(<Cart />);
    expect(container).toMatchSnapshot();
  });

  it("update", () => {
    const { container, debug } = render(<Cart />);
    debug();
    expect(container.textContent).toBe("11");

    // rerender(<Cart />);
  });
});
