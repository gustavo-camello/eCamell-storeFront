import React from "react";

import ProductsList from "components/cart/ProductsList";
import Summary from "components/cart/Summary";

function Cart() {
  return (
    <>
      <h2>Your Cart</h2>
      <div className="container mx-auto md:px-20 flex">
        <section className="border w-3/4">
          <ProductsList />
        </section>
        <section className="border border-green-500 w-1/4">
          <Summary />
        </section>
      </div>
    </>
  );
}

export default Cart;
