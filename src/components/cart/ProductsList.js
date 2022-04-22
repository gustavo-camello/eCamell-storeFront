import React from "react";

import Product from "./Product";

function ProductsList({ cartItems }) {
  return (
    <div className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
      <div className="flow-root">
        <ul className="-my-4 divide-y divide-gray-100">
          {cartItems?.map((item) => (
            <Product productDetails={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductsList;
