import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import "@testing-library/jest-dom";

import Product from "../src/components/products/Product";
import { fakeItem } from "../src/lib/testUtils";

const product = fakeItem();

describe("<Product/>", () => {
  it("renders out the price tag and title", () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );

    expect(screen.getByText("5000")).toBeInTheDocument();

    const link = container.querySelector("a");
    debug(link);
    expect(container).toHaveTextContent(product?.name);
  });

  it("renders and match the snapshot", () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it("renders the image properly", () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );

    const img = screen.getByAltText("ecommerce");
    expect(img).toBeInTheDocument();
  });
});
