import React from "react";
import SingleProduct from "components/product/SingleProduct";
import Reviews from "components/product/Reviews";

function SingleProductPage({ query }) {
  return (
    <>
      <SingleProduct id={query.id} />
      <Reviews id={query.id} />
    </>
  );
}

export default SingleProductPage;
