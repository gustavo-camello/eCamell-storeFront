import React from "react";
import SingleProduct from "components/product/SingleProduct";

function SingleProductPage({ query }) {
  return <SingleProduct id={query.id} />;
}

export default SingleProductPage;
