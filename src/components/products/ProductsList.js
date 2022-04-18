import React from "react";

import Product from "./Product";

function ProductsList({ products }) {
  return (
    <div className="container px-5 py-8 mx-auto">
      <div className="flex flex-wrap -m-4">
        {products?.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
