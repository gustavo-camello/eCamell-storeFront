import React from "react";

import { useCart } from "hooks/useCart";
import { useCurrentUser } from "hooks/useCurrentUser";
import ProductsList from "./ProductsList";
import Summary from "./Summary";

function Cart() {
  const currentUser = useCurrentUser();

  const { cartProducts } = useCart(currentUser?.id);

  return (
    <div className="container mx-auto xl:px-20 flex flex-col md:flex-row mt-8 ">
      <section className="w-full md:w-3/4 border border-gray-100 bg-gray-50 rounded-md md:mr-2 shadow-full md:w-sm">
        <ProductsList cartItems={cartProducts} />
      </section>
      <section className="w-full md:w-1/4 border border-gray-100 bg-gray-50 rounded-md h-72 md:h-96 mt-8 md:mt-0 md:ml-2 shadow-sm">
        <Summary cartProducts={cartProducts} />
      </section>
    </div>
  );
}

export default Cart;
